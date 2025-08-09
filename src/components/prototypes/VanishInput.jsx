'use client';
import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VanishInput({
  placeholder = 'What do you need?',
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

  const iconSize = 24;
  const padding = 24;
  const baseLeft = iconSize + padding;
  const MAX_PARTICLES_TOTAL = 220;

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
      const totalMs = nChars <= 4 ? 600 : 700; // modo pocas letras

      const chars = trimmed.split('').map((char, i) => ({
        id: `${char}-${i}-${Math.random().toString(36).slice(2, 9)}`,
        char,
        offset: 12 * i,
        top: 0,
        i,
      }));

      if (caretOffset !== 0) setShowFakeCaret(true);
      setVanishing(true);

      // limpiar contenido editable para que “desaparezcan” las letras
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

    // Atajos opcionales (dejá o sacá según necesidad)
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
  const n = letters.length;
  const FEW = n <= 4; // modo pocas letras activo si hay pocas letras en animación
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
        className="relative z-10 bg-black text-white px-3 py-2 rounded-lg border border-neutral-800 shadow-lg overflow-hidden flex items-center"
        style={{ width: `${inputWidth}px`, transition: 'width 0.3s ease-in-out' }}
      >
        <span className="text-neutral-500 w-4 shrink-0">{icon}</span>

        <AnimatePresence>
          {value === '' && !vanishing && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute text-neutral-500"
              style={{ left: `${baseLeft - 4}px` }}
            >
              {placeholder}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative pl-4 w-full whitespace-nowrap overflow-hidden z-10">
          {!vanishing ? (
            <div
              ref={inputRef}
              contentEditable
              className="bg-transparent outline-none text-white caret-transparent"
              onFocus={() => {
                setHasFocus(true);
                updateCaretOffset();
              }}
              onBlur={() => setHasFocus(false)}
              suppressContentEditableWarning
              onInput={(e) => {
                const raw = e.currentTarget.textContent;
                const cleaned = raw.replace(/\n/g, '');
                setValue(cleaned);
                updateCaretOffset();
              }}
              onKeyDown={(e) => {
                handleKeyDown(e);
                setTimeout(updateCaretOffset, 0);
              }}
            />
          ) : (
            <div className="flex">
              <AnimatePresence mode="popLayout">
                {letters.map((item, i) => {
                  const nLoc = letters.length;
                  const norm = nLoc > 1 ? i / (nLoc - 1) : 0;
                  const STAGGER_FRACTION = FEW ? 0.2 : 0.6; // menos stagger si pocas letras
                  const LETTER_DURATION = 0.28;
                  const delay = TOTAL * STAGGER_FRACTION * norm;

                  const lift = FEW ? 6 : 0; // leve levantada para 1–4 letras
                  const rot = FEW ? (i % 2 ? 6 : -6) : 0;

                  return (
                    <motion.span
                      key={item.id}
                      initial={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                      animate={{ opacity: 0, scale: 0.5, y: -lift, rotate: rot }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: LETTER_DURATION, delay }}
                      className="relative inline-block"
                      style={{ willChange: 'transform, opacity' }}
                    >
                      {item.char}
                    </motion.span>
                  );
                })}
              </AnimatePresence>
            </div>
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
              animate={{ x: -5, opacity: 1 }}
              transition={{ duration: TOTAL, ease: [0.16, 1, 0.3, 1] }}
              className="w-[2px] h-[1.25rem] bg-white rounded"
              style={{ willChange: 'transform, opacity' }}
            />
          </div>
        )}
      </div>

      {/* Partículas */}
      {vanishing && (
        <div
          className="absolute left-[32px] flex items-center pointer-events-none whitespace-pre pl-2"
          style={{
            top: '44%',
            transform: 'translateY(-50%)',
            height: '2rem',
            zIndex: 50,
            willChange: 'transform, opacity',
          }}
        >
          <AnimatePresence>
            {letters.map((item, i) => {
              const nLoc = letters.length;
              const norm = nLoc > 1 ? i / (nLoc - 1) : 0;
              const PARTICLE_WINDOW = FEW ? 0.35 : 0.6;
              const baseDelay = TOTAL * PARTICLE_WINDOW * (1 - norm);

              // Cap total distribuido por letra + clamp por letra en pocas letras
              const perLetterRaw = Math.max(6, Math.floor(MAX_PARTICLES_TOTAL / Math.max(1, nLoc)));
              const perLetter = Math.min(perLetterRaw, FEW ? 40 : 28);

              return (
                <motion.span
                  key={item.id}
                  className="absolute"
                  style={{ left: `${item.offset + baseLeft}px`, top: `${item.top}px` }}
                >
                  {[...Array(perLetter)].map((_, j) => {
                    // Abanico angular para pocas letras; para muchas, mantenemos spread
                    const angleDeg = FEW
                      ? -110 + Math.random() * 40 // abanico definido
                      : -130 + Math.random() * 70; // un poco más amplio con muchas letras
                    const angle = (angleDeg * Math.PI) / 180;
                    const distBase = FEW ? 60 : 90;
                    const distRand = FEW ? 40 : 60;
                    const dist = distBase + Math.random() * distRand;
                    const dx = Math.cos(angle) * dist;
                    const dy = Math.sin(angle) * dist;

                    const dur = FEW ? 0.5 + Math.random() * 0.15 : 0.55 + Math.random() * 0.15;
                    const dly = baseDelay + j * (FEW ? 0.0018 : 0.0025);

                    return (
                      <motion.div
                        key={j}
                        initial={{ x: 0, y: 12, opacity: 1, scale: 1 }}
                        animate={{ x: dx, y: 12 + dy, opacity: 0, scale: 0.6 }}
                        transition={{ duration: dur, delay: dly, ease: 'easeOut' }}
                        className="absolute rounded-full bg-white"
                        style={{ width: '1px', height: '1px', willChange: 'transform, opacity' }}
                      />
                    );
                  })}
                </motion.span>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      <p className="mt-4 text-neutral-500 text-sm z-10">Type and press Enter</p>
    </div>
  );
}
