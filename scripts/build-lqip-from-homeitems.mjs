// scripts/build-lqip-from-homeitems.mjs
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { fetch } from "undici";
import { spawn } from "node:child_process";

// Ajusta si tu archivo está en otra ruta
const HOME_ITEMS_PATH = path.resolve("src/content/homeItems.js");
const OUT_DIR = "public/lqip";
const MANIFEST = "public/media-manifest.json";

// Config
const LQIP_WIDTH = 30;
const INLINE_LQIP = false;

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function toTinyPng(input) {
  return sharp(input)
    .resize({ width: LQIP_WIDTH, withoutEnlargement: true })
    .blur(0.8)
    .png({ palette: true, compressionLevel: 9, effort: 10 })
    .toBuffer();
}

async function fetchBuffer(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

async function ffmpegFrameFromUrl(url, ss = "0.1") {
  return new Promise((resolve, reject) => {
    const args = ["-ss", ss, "-i", url, "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-"];
    const ff = spawn("ffmpeg", args, { stdio: ["ignore", "pipe", "inherit"] });
    const chunks = [];
    ff.stdout.on("data", (d) => chunks.push(d));
    ff.on("error", reject);
    ff.on("close", (code) => {
      if (code === 0) resolve(Buffer.concat(chunks));
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
  });
}

async function writeLqipFileOrInline(id, tiny) {
  if (INLINE_LQIP) {
    return `data:image/png;base64,${tiny.toString("base64")}`;
  }
  await ensureDir(OUT_DIR);
  const outRel = `lqip/${id}.png`;
  await fs.writeFile(path.join("public", outRel), tiny);
  return `/${outRel}`;
}

async function processLocalImage(absPublicPath, id, src) {
  const buf = await fs.readFile(absPublicPath);
  const meta = await sharp(buf).metadata();
  const tiny = await toTinyPng(buf);
  const lqip = await writeLqipFileOrInline(id, tiny);
  return { id, kind: "image", src, w: meta.width ?? 0, h: meta.height ?? 0, lqip };
}

async function processVideoWithPoster(id, videoSrc, posterUrl) {
  const buf = await fetchBuffer(posterUrl);
  const meta = await sharp(buf).metadata();
  const tiny = await toTinyPng(buf);
  const lqip = await writeLqipFileOrInline(id, tiny);
  return { id, kind: "video", src: videoSrc, w: meta.width ?? 0, h: meta.height ?? 0, lqip, poster: posterUrl };
}

async function processVideoWithoutPoster(id, videoSrc) {
  let frame = null;
  try {
    frame = await ffmpegFrameFromUrl(videoSrc, "0.1");
  } catch {
    frame = await ffmpegFrameFromUrl(videoSrc, "0.5");
  }
  const meta = await sharp(frame).metadata();
  const tiny = await toTinyPng(frame);
  const lqip = await writeLqipFileOrInline(id, tiny);
  return { id, kind: "video", src: videoSrc, w: meta.width ?? 0, h: meta.height ?? 0, lqip, poster: lqip };
}

function pathToFileUrl(p) {
  let u = path.resolve(p).replace(/\\/g, "/");
  if (!u.startsWith("/")) u = `/${u}`;
  return `file://${u}`;
}

async function main() {
  const mod = await import(pathToFileUrl(HOME_ITEMS_PATH));
  const homeItems = (mod.homeItems || mod.default || []);

  const entries = [];

  for (const item of homeItems) {
    // Handle translated titles - use Spanish version for slug generation
    const titulo = typeof item.titulo === 'string' ? item.titulo : (item.titulo?.ES || item.titulo?.EN || 'untitled');
    const id = slugify(titulo);

    const isWebm = item.webm && /\.webm$/i.test(item.webm);
    const isMp4  = item.gif  && /\.mp4$/i.test(item.gif ?? "");
    if (isWebm || isMp4) {
      const src = isWebm ? item.webm : item.gif;
      if (item.poster) entries.push(await processVideoWithPoster(id, src, item.poster));
      else entries.push(await processVideoWithoutPoster(id, src));
      continue;
    }

    if (item.gif && item.gif.startsWith("/")) {
      const abs = path.resolve("public", item.gif.replace(/^\//, ""));
      try {
        entries.push(await processLocalImage(abs, id, item.gif));
      } catch (err) {
        console.warn(`[LQIP] No pude procesar ${item.gif}:`, err);
      }
    }
  }

  await ensureDir(path.dirname(MANIFEST));
  await fs.writeFile(MANIFEST, JSON.stringify(entries, null, 2));
  console.log(`✔ LQIP manifest -> ${MANIFEST} (${entries.length} entradas)`);
}

main().catch((e) => { console.error(e); process.exit(1); });


