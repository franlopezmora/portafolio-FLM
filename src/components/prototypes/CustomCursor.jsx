import { useEffect, useRef, useState } from "react";

export default function CustomCursor({ seed }) {
  const cursorRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  const mouseX = useRef(seed?.x ?? 0);
  const mouseY = useRef(seed?.y ?? 0);
  const currentX = useRef(seed?.x ?? 0);
  const currentY = useRef(seed?.y ?? 0);

  useEffect(() => {
    // Si cambia la seed (nuevo enter), reposicioná inmediatamente
    if (seed && cursorRef.current) {
      mouseX.current = seed.x;
      mouseY.current = seed.y;
      currentX.current = seed.x;
      currentY.current = seed.y;
      cursorRef.current.style.transform =
        `translate(${seed.x}px, ${seed.y}px) translate(-50%, -50%)`;
    }
  }, [seed]);

  useEffect(() => {
    const cursor = cursorRef.current;
    let rafId;

    const animate = () => {
      currentX.current += (mouseX.current - currentX.current) * 0.18;
      currentY.current += (mouseY.current - currentY.current) * 0.18;
      cursor.style.transform =
        `translate(${currentX.current}px, ${currentY.current}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const handleMouseOver = (e) => {
      const t = e.target;
      if (
        t.tagName === "A" ||
        t.tagName === "BUTTON" ||
        t.dataset.hover === "true" ||
        t.classList.contains("hover-target")
      ) {
        setHovering(true);
      }
    };

    const handleMouseOut = () => setHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    animate();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: hovering ? "40px" : "30px",
        height: hovering ? "40px" : "30px",
        borderRadius: "9999px",
        pointerEvents: "none",
        zIndex: 9999,
        backgroundColor: "#fff",
        mixBlendMode: "difference",
        transition: "width 0.2s ease, height 0.2s ease",
      }}
    />
  );
}
