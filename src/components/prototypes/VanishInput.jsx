'use client';
import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VanishInput({
  placeholder = 'What do you need?',
  icon = '🔍',
  minWidth = 100,
  onSubmit = () => {},
  // 👇 NUEVO
  size = 'lg',                // 'sm' | 'md' | 'lg' | 'xl'
  fontSize,                   // override opcional (px)
  iconSize: iconSizeProp,     // override opcional (px)
  paddingX: paddingXProp,     // override opcional (px)
  paddingY: paddingYProp,     // override opcional (px)
}) {
  // ====== Sizing ======
  const PRESETS = {
    sm: { fontSize: 14, lineHeight: 22, iconSize: 18, paddingX: 10, paddingY: 6 },
    md: { fontSize: 16, lineHeight: 24, iconSize: 20, paddingX: 12, paddingY: 8 },
    lg: { fontSize: 20, lineHeight: 28, iconSize: 24, paddingX: 16, paddingY: 12 },
    xl: { fontSize: 24, lineHeight: 32, iconSize: 28, paddingX: 20, paddingY: 14 },
  };
  const S = PRESETS[size] || PRESETS.md;

  const FS = fontSize ?? S.fontSize;
  const LH = S.lineHeight; // en px
  const ICON = iconSizeProp ?? S.iconSize;
  const PADX = paddingXProp ?? S.paddingX;
  const PADY = paddingYProp ?? S.paddingY;

  // distancia desde el borde izquierdo del contenedor hasta el texto
  const baseLeft = ICON + PADX + 10; // +4 para separar ícono del texto

  // ====== Estado y refs ======
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

  // ====== Caret tracking (corrige el -49 mágico) ======
  const updateCaretOffset = () => {
    if (typeof window === 'undefined') return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !containerRef.current) return;

    const range = selection.getRangeAt(0);
    const rect = range.getClientRects()[0];
    if (rect) {
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      // resta el padding+icono para obtener X relativa al texto
      setCaretOffset(rect.left - containerLeft - baseLeft);
    }
  };

  useLayoutEffect(() => {
    updateCaretOffset();
  }, [value, hasFocus, FS, ICON, PADX]);

  // ====== Auto ancho según contenido/placeh ======
  useLayoutEffect(() => {
    const baseEl = value ? measureRef.current : placeholderRef.current;
    const measured = baseEl?.offsetWidth || 0;
    const buffer = 6;
    // ancho = icono + paddings + texto + un pequeño buffer
    setInputWidth(Math.max(minWidth, measured + ICON + PADX * 2 + buffer));
  }, [value, placeholder, minWidth, ICON, PADX, FS]);

  // ====== Key handling + anim ======
  const handleKeyDown = (e) => {
    // Enter -> disparar efecto
    if (e.key === 'Enter' && value.trim()) {
      e.preventDefault();
      const trimmed = value.trim();
      const nChars = trimmed.length;
      const totalMs = nChars <= 4 ? 600 : 700;

      // medir por letra
      let widths = [];
      let centers = [];
      try {
        const cs = window.getComputedStyle(containerRef.current || inputRef.current);
        const font = `${cs.fontWeight || '400'} ${FS}px ${cs.fontFamily || 'sans-serif'}`;
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
  const TOTAL = (fakeCaretDuration || 700) / 1000; // seg

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] relative font-sans">
      {/* medidores invisibles */}
      <span
        ref={measureRef}
        className="invisible absolute whitespace-pre"
        style={{ fontFamily: 'inherit', fontSize: `${FS}px`, lineHeight: `${LH}px` }}
      >
        {value || '\u200B'}
      </span>
      <span
        ref={placeholderRef}
        className="invisible absolute whitespace-pre"
        style={{ fontSize: `${FS}px`, lineHeight: `${LH}px` }}
      >
        {placeholder}
      </span>

      {/* contenedor */}
      <div
        ref={containerRef}
        className="relative z-10 bg-black text-white rounded-lg border border-neutral-800 shadow-lg overflow-hidden flex items-center"
        style={{
          width: `${inputWidth}px`,
          transition: 'width 0.3s ease-in-out',
          paddingLeft: PADX,
          paddingRight: PADX,
          paddingTop: PADY,
          paddingBottom: PADY,
          fontSize: `${FS}px`,
          lineHeight: `${LH}px`,
        }}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      >
        <span
          className="text-neutral-400 shrink-0"
          style={{ width: ICON, display: 'inline-flex', justifyContent: 'center', fontSize: `${Math.max(ICON - 2, 12)}px` }}
        >
          {icon}
        </span>

        <AnimatePresence>
          {value === '' && !vanishing && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.15, duration: 1, ease: 'easeOut' } }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              className="absolute text-neutral-500"
              style={{ left: `${baseLeft - 2}px`, fontSize: `${FS}px`, lineHeight: `${LH}px` }}
            >
              {placeholder}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative w-full whitespace-nowrap overflow-hidden z-10" style={{ paddingLeft: 8 }}>
          {!vanishing ? (
            <div
              ref={inputRef}
              contentEditable
              className="bg-transparent outline-none text-white"
              style={{ minHeight: `${LH}px` }}
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
            <div className="flex relative z-10">
              <AnimatePresence mode="popLayout">
                {letters.map((item) => {
                  const TOTAL_S = (fakeCaretDuration || 700) / 1000;
                  const caretStartX = caretOffset;
                  const caretEndX = 20;
                  const letterX = item.cx;
                  const denom = (caretStartX - caretEndX) || 1;
                  const f = Math.min(1, Math.max(0, (caretStartX - letterX) / denom));
                  const tCross = f * TOTAL_S;
                  const delay = Math.max(0, tCross - 0.5);
                  const LETTER_TIME = 0.10;

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
          )}
        </div>

        {/* Caret falso */}
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
              animate={{ x: -2.2, opacity: 1 }}
              transition={{ duration: TOTAL, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '0.1px',
                height: `32px`,
                backgroundColor: 'currentColor',
                borderRadius: '1px',
                willChange: 'transform, opacity',
              }}
            />
          </div>
        )}
      </div>

      <p className="mt-4 text-neutral-500 text-sm z-10">Type and press Enter</p>
    </div>
  );
}
