import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "../styles/prism.css";

const TEMPLATE = ({ html = "", css = "", js = "" }) => `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>
  :root { color-scheme: light dark; }
  html,body { margin:0; padding:0; height:100%; }
  body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Inter, sans-serif; }
  .board {
    width: 360px;
    height: 360px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 4px;
    border: 2px solid #3b3b3b;
    margin: 20px auto;
  }
  .board > div {
    border: 1px solid #3b3b3b;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    opacity: 0.9;
  }
  ${css || ""}
</style>
</head>
<body>
<div class="board"></div>
${html || ""}
<script>
try {
${js || ""}
} catch (err) {
  const pre = document.createElement('pre');
  pre.style.cssText = 'position:fixed;left:0;right:0;bottom:0;margin:0;padding:8px;background:#ffebeb;color:#b00020;font:12px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;white-space:pre-wrap;';
  pre.textContent = err && (err.stack || err.message || String(err));
  document.body.appendChild(pre);
}
</script>
</body>
</html>`;

export default function EditableCode({
  initialHtml = "<div class='board'></div>",
  initialCss = ".board { width: 360px; height: 360px; display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr); gap: 4px; border: 2px solid #3b3b3b; margin: 20px auto; } .board > div { border: 1px solid #3b3b3b; position: relative; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; opacity: 0.9; }",
  initialJs = "const board = document.querySelector('.board'); board.innerHTML = ''; for (let i = 0; i < 16; i++) { const cell = document.createElement('div'); cell.textContent = '+'; board.appendChild(cell); }",
  height = 340,
  className = "",
  filename = "demo.html",
  autoRunDelay = 400, // ms
  showHeader = true,
}) {
  const [tab, setTab] = useState("js"); // Solo JavaScript
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [dirty, setDirty] = useState(false);
  const [_, forceTick] = useState(0);

  const iframeRef = useRef(null);
  const timerRef = useRef(0);

  const run = () => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write(TEMPLATE({ html, css, js }));
    doc.close();
    setDirty(false);
  };

  const reset = () => {
    setHtml(initialHtml);
    setCss(initialCss);
    setJs(initialJs);
    setDirty(false);
    forceTick((n) => n + 1); // rehace iframe
  };

  // auto-run con debounce
  useEffect(() => {
    setDirty(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(run, autoRunDelay);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html, css, js]);

  // primer render
  useEffect(() => { run(); /* eslint-disable-next-line */ }, []);

  const editorValue = useMemo(
    () => (tab === "html" ? html : tab === "css" ? css : js),
    [tab, html, css, js]
  );

  const setEditorValue = (v) => {
    if (tab === "html") setHtml(v);
    else if (tab === "css") setCss(v);
    else setJs(v);
  };


  return (
    <div
      className={clsx(
        "rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900",
        className
      )}
    >
      {/* Header - solo si showHeader es true */}
      {showHeader && (
        <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 dark:text-neutral-400">{filename}</span>
            {dirty && (
              <span className="px-1.5 py-[2px] rounded bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                modificado
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              className="text-xs px-2 py-1 rounded bg-neutral-200/60 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
            >
              Reset
            </button>
            <button
              onClick={run}
              className="text-xs px-2 py-1 rounded bg-black text-white dark:bg-white dark:text-black"
            >
              Run
            </button>
          </div>
        </div>
      )}

      {/* Editor + Preview */}
      <div className="grid md:grid-cols-2">
        {/* editor */}
        <div className="border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800">
          <div className="relative">
            <textarea
              value={editorValue}
              onChange={(e) => setEditorValue(e.target.value)}
              className="w-full h-[260px] md:h-[calc(100%_-_34px)] px-4 py-2 font-mono text-sm bg-transparent outline-none resize-none overflow-auto"
              placeholder="Escribí JavaScript..."
              spellCheck={false}
              style={{ 
                minHeight: '260px',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap'
              }}
            />
          </div>
        </div>

        {/* preview */}
        <div className="bg-white dark:bg-neutral-950" style={{ height }}>
          <iframe
            key={_}
            ref={iframeRef}
            title="preview"
            sandbox="allow-scripts allow-forms allow-pointer-lock allow-same-origin"
            className="w-full h-full block"
          />
        </div>
      </div>
    </div>
  );
}
