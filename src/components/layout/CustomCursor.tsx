"use client";

import React, { useEffect, useState, useRef } from "react";

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (isTouch) {
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Inspect hover target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveElement = target.closest(
        "button, a, input, textarea, select, [data-cursor], [role='button'], .cursor-pointer"
      );

      if (interactiveElement) {
        setIsHovered(true);
        const customBadge = interactiveElement.getAttribute("data-cursor");
        setCursorText(customBadge || null);
      } else {
        setIsHovered(false);
        setCursorText(null);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    let animationFrameId: number;

    const renderLoop = () => {
      // Lerp ring position towards mouse position
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!enabled) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Central Sharp Green Dot */}
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 w-2 h-2 rounded-full bg-[#A3E635] shadow-[0_0_8px_#A3E635] transition-transform duration-75 will-change-transform ${
          isClicking ? "scale-50" : isHovered ? "scale-125" : "scale-100"
        }`}
      />

      {/* Outer Smooth Following Ring */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 rounded-full border border-[#A3E635]/40 bg-[#A3E635]/5 flex items-center justify-center transition-all duration-200 will-change-transform ${
          cursorText
            ? "w-16 h-16 border-[#A3E635] bg-[#A3E635]/20 backdrop-blur-[2px]"
            : isHovered
            ? "w-12 h-12 border-[#A3E635]/80 bg-[#A3E635]/15"
            : isClicking
            ? "w-7 h-7 border-[#A3E635]"
            : "w-8 h-8"
        }`}
      >
        {cursorText && (
          <span className="font-mono text-[9px] tracking-widest text-[#A3E635] font-bold uppercase select-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
