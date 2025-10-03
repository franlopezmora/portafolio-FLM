import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "../styles/prism.css";

export default function CodeBlock({
  code = "",
  language = "tsx",
  filename,
  className = "",
  showHeader = true,
}) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef(null);

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  // Highlight code when component mounts or code changes
  useEffect(() => {
    if (preRef.current) {
      Prism.highlightElement(preRef.current);
    }
  }, [code, language]);

  return (
    <div
      className={clsx(
        "relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900",
        className
      )}
    >
      {/* Header - solo si showHeader es true */}
      {showHeader && (
        <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-200 dark:border-neutral-800">
          <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
            {filename || language.toUpperCase()}
          </div>
          <button
            onClick={doCopy}
            className="text-xs px-2 py-1 rounded bg-neutral-200/60 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          >
            {copied ? "Copiado" : "Copiar"}
          </button>
        </div>
      )}

      {/* Code */}
      <pre ref={preRef} className={`px-4 py-2 m-0 overflow-x-auto language-${language}`}>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
