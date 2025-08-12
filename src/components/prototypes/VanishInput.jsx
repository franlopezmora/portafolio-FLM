'use client';
import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import lupaPng from "./lupa sin fondo.png";
import lupaPngBlanca from "./output-onlinepngtools.png"

export default function VanishInput({
  placeholder = '¿Qué necesitas?',
  icon = '🔍',
  minWidth = 100,
  onSubmit = () => {},
}) {
  const [value, setValue] = useState('');
  const [vanishing, setVanishing] = useState(false);
  const [letters, setLetters] = useState([]);
  const [inputWidth, setInputWidth] = useState(minWidth);
  const [hasFocus, setHasFocus] = useState(false);
  const [caretOffset, setCaretOffset] = useState(0);
  const [showFakeCaret, setShowFakeCaret] = useState(false);
  const [fakeCaretDuration, setFakeCaretDuration] = useState(700); // ms

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const measureRef = useRef(null);
  const placeholderRef = useRef(null);
  const charCentersRef = useRef([]);
  const charWidthsRef = useRef([]);

  const iconSize = 24;
  const padding = 24;
  const baseLeft = iconSize + padding;

  const updateCaretOffset = () => {
    if (typeof window === 'undefined') return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !containerRef.current) return;

    const range = selection.getRangeAt(0);
    const rect = range.getClientRects()[0];
    if (rect) {
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      setCaretOffset(rect.left - containerLeft - 49);
    }
  };

  useLayoutEffect(() => {
    updateCaretOffset();
  }, [value, hasFocus]);

  useLayoutEffect(() => {
    const baseEl = value ? measureRef.current : placeholderRef.current;
    const measured = baseEl?.offsetWidth || 0;
    const iconWidth = 24;
    const paddingX = 16 + 16;
    const buffer = 4;
    setInputWidth(Math.max(minWidth, measured + iconWidth + paddingX + buffer));
  }, [value, placeholder, minWidth]);

  const handleKeyDown = (e) => {
    // Enter -> disparar efecto
    if (e.key === 'Enter' && value.trim()) {
      e.preventDefault();
      const trimmed = value.trim();
      const nChars = trimmed.length;
      const totalMs = nChars <= 4 ? 600 : 700;

      // === medir centros reales por letra ===
      let widths = [];
      let centers = [];
      try {
        const cs = window.getComputedStyle(containerRef.current || inputRef.current);
        const font = `${cs.fontWeight || '400'} ${cs.fontSize || '16px'} ${cs.fontFamily || 'sans-serif'}`;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = font;

        for (let i = 0; i < nChars; i++) {
          widths.push(ctx.measureText(trimmed[i]).width);
        }

        let acc = 0;
        for (let i = 0; i < nChars; i++) {
          const w = widths[i];
          const cx = acc + w / 2;
          centers.push(cx);
          acc += w;
        }
      } catch {
        const measured = measureRef.current?.offsetWidth || 0;
        const avg = nChars ? measured / nChars : 10;
        widths = Array.from({ length: nChars }, () => avg);
        centers = widths.map((w, i) => i * avg + w / 2);
      }

      charCentersRef.current = centers;
      charWidthsRef.current = widths;

      const chars = trimmed.split('').map((char, i) => ({
        id: `${char}-${i}-${Math.random().toString(36).slice(2, 9)}`,
        char,
        i,
        cx: centers[i],
      }));

      if (caretOffset !== 0) setShowFakeCaret(true);
      setVanishing(true);

      // limpiar contenido editable
      if (inputRef.current) {
        inputRef.current.textContent = '';
        inputRef.current.focus();
      }

      setLetters(chars);
      onSubmit(trimmed);
      setFakeCaretDuration(totalMs);

      setTimeout(() => {
        setValue('');
        setLetters([]);
        setShowFakeCaret(false);

        requestAnimationFrame(() => {
          setVanishing(false);
          requestAnimationFrame(() => {
            if (inputRef.current) {
              if (!inputRef.current.childNodes.length) {
                inputRef.current.appendChild(document.createTextNode(''));
              }
              inputRef.current.focus();
              const selection = window.getSelection();
              const range = document.createRange();
              range.setStart(inputRef.current.firstChild, 0);
              range.collapse(true);
              selection.removeAllRanges();
              selection.addRange(range);
              updateCaretOffset();
            }
          });
        });
      }, totalMs - 2);
    }

    // Atajos opcionales
    const editable = inputRef.current;
    const textNode = editable?.firstChild;

    // Ctrl + ←
    if (e.key === 'ArrowLeft' && e.ctrlKey) {
      e.preventDefault();
      if (textNode) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.setStart(textNode, 0);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      return;
    }

    // Ctrl + →
    if (e.key === 'ArrowRight' && e.ctrlKey) {
      e.preventDefault();
      if (textNode) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.setStart(textNode, textNode.length);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      return;
    }

    // Ctrl + Backspace
    if (e.key === 'Backspace' && e.ctrlKey) {
      e.preventDefault();
      if (textNode) {
        const selection = window.getSelection();
        const cursorPos = selection.focusOffset;
        const currentText = textNode.textContent;
        const leftText = currentText.slice(0, cursorPos);
        const rightText = currentText.slice(cursorPos);
        const newLeft = leftText.replace(/\s*\S+$/, '');
        const newText = newLeft + rightText;
        textNode.textContent = newText;
        setValue(newText.trim());

        const range = document.createRange();
        range.setStart(textNode, newLeft.length);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  // ===== Render =====
  const TOTAL = (fakeCaretDuration || 700) / 1000; // en segundos

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] relative font-sans">
      {/* spans invisibles para medir ancho */}
      <span
        ref={measureRef}
        className="invisible absolute whitespace-pre text-base"
        style={{ fontFamily: 'inherit' }}
      >
        {value || '\u200B'}
      </span>
      <span ref={placeholderRef} className="invisible absolute whitespace-pre text-base">
        {placeholder}
      </span>

      {/* contenedor del input */}
        <div
          ref={containerRef}
          className="
            relative z-10
            bg-white text-black border border-neutral-300
            dark:bg-black dark:text-white dark:border-neutral-800
            px-3 py-2 rounded-lg shadow-lg overflow-hidden flex items-center
          "
          style={{ width: `${inputWidth}px`, transition: 'width 0.3s ease-in-out' }}
        >
        <span className="w-6 h-6 shrink-0 inline-flex items-center justify-center">
          {/* Light mode */}
          <img
            src={lupaPng}
            alt=""
            className="w-5 h-5 object-contain pointer-events-none select-none dark:hidden"
            draggable="false"
          />
          {/* Dark mode */}
          <img
            src={lupaPngBlanca}
            alt=""
            className="w-5 h-5 object-contain pointer-events-none select-none hidden dark:inline-block"
            draggable="false"
          />
        </span>


        <AnimatePresence>
          {value === '' && !vanishing && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }} // empieza invisible
              animate={{
                opacity: 1,
                transition: { delay: 0.15, duration: 1, ease: 'easeOut' } // espera 150ms antes de aparecer
              }}
              exit={{ opacity: 0, transition: { duration: 0 } }} // sale instantáneo
              className="absolute text-neutral-500 dark:text-neutral-400"

              style={{ left: `${baseLeft - 4}px` }}
            >
              {placeholder}
            </motion.div>
          )}
        </AnimatePresence>


        <div className="relative pl-2 w-full whitespace-nowrap overflow-hidden z-10">
          {!vanishing ? (
            <div
              ref={inputRef}
              contentEditable
              className="bg-transparent outline-none text-black dark:text-white caret-black dark:caret-white"
              suppressContentEditableWarning
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleKeyDown(e);
                  return;
                }
                handleKeyDown(e);
                setTimeout(updateCaretOffset, 0);
              }}
              onInput={(e) => {
                const raw = e.currentTarget.textContent;
                const cleaned = raw.replace(/\n/g, '');
                if (raw !== cleaned) {
                  e.currentTarget.textContent = cleaned;
                  const sel = window.getSelection();
                  const range = document.createRange();
                  range.setStart(e.currentTarget.firstChild || e.currentTarget, cleaned.length);
                  range.collapse(true);
                  sel.removeAllRanges();
                  sel.addRange(range);
                }
                setValue(cleaned);
                updateCaretOffset();
              }}
              onPaste={(e) => {
                e.preventDefault();
                const text = (e.clipboardData || window.clipboardData).getData('text').replace(/\n/g, '');
                document.execCommand('insertText', false, text);
              }}
            />
          ) : (
            <>
              {/* Letras que desaparecen (R -> L) sincronizadas con el fake caret */}
              <div className="flex relative z-10">
                <AnimatePresence mode="popLayout">
                  {letters.map((item) => {
                    const TOTAL_S = (fakeCaretDuration || 700) / 1000;
                    const caretStartX = caretOffset;
                    const caretEndX = -5;
                    const letterX = item.cx;
                    const denom = (caretStartX - caretEndX) || 1;
                    const f = Math.min(1, Math.max(0, (caretStartX - letterX) / denom));
                    const tCross = f * TOTAL_S;
                    const delay = Math.max(0, tCross - 0.36);
                    const LETTER_TIME = 0.04;

                    return (
                      <motion.span
                        key={item.id}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: LETTER_TIME, delay, ease: 'easeOut' }}
                        className="relative inline-block"
                        style={{ willChange: 'opacity, transform' }}
                      >
                        {item.char}
                      </motion.span>
                    );
                  })}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>

        {/* Caret falso (solo X) */}
{showFakeCaret && (
  <div
    className="absolute pointer-events-none"
    style={{
      left: `${baseLeft}px`,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 9999,
    }}
  >
    <motion.div
      initial={{ x: caretOffset, opacity: 1 }}
      animate={{ x: -4, opacity: 1 }}
      transition={{ duration: TOTAL, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '0.1px',
        height: '1.33rem',           // altura estándar (puedes ajustar)
        backgroundColor: 'currentColor', // usa el color del texto actual
        borderRadius: '1px',         // esquinas suaves como el real
        willChange: 'transform, opacity',
      }}
      className="text-black dark:text-white"
    />
  </div>
)}

      </div>

      <p className="mt-4 text-neutral-500 text-sm z-10">Escribí y presioná <kbd>Enter</kbd></p>
    </div>
  );
}
