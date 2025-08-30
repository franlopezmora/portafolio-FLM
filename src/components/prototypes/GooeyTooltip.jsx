// src/components/prototypes/GooeyTooltip.jsx
"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User } from "lucide-react";

export default function GooeyTooltip({ fullScreen = false }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 flex items-center justify-center bg-black"
          : "relative h-64 w-full flex items-end justify-center pb-16"
      }
    >
      {/* Filtro Gooey SVG */}
      <svg className="absolute w-0 h-0">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>

      <div style={{ filter: "url(#goo)" }} className="relative flex flex-col items-center">
        <motion.button
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          layoutId="gooey"
          className="z-10 w-20 h-20 rounded-full bg-zinc-200 text-black font-bold text-2xl flex items-center justify-center shadow-xl"
        >
          <User className="w-8 h-8" />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              key="tooltip"
              initial={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
              animate={{ x: 65, y: -120, scale: 1, opacity: 1 }}
              exit={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
              className="absolute w-52 min-h-[100px] rounded-2xl bg-zinc-200 text-zinc-900 text-center flex flex-col items-center justify-center px-4 py-4 pointer-events-none"
            >
              <h3 className="font-semibold">Francisco</h3>
              <p className="text-sm text-gray-600">Desarrollador Fullstack</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
