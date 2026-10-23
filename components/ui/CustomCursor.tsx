'use client';

import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isHoveringCanvas, setIsHoveringCanvas] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on non-touch desktop devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('a') ||
            target.closest('button') ||
            target.closest('.cursor-pointer') ||
            target.getAttribute('role') === 'button'
        );
        setIsHoveringLink(isClickable);

        const isCanvas = Boolean(target.closest('canvas') || target.closest('[data-cursor="drag"]'));
        setIsHoveringCanvas(isCanvas);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out hidden md:block"
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
    >
      <div
        className={`rounded-full flex items-center justify-center transition-all duration-300 ${
          isHoveringCanvas
            ? 'w-16 h-16 bg-gold/90 text-[#13201A] font-bold text-[10px] tracking-widest uppercase shadow-glow-gold scale-100'
            : isHoveringLink
            ? 'w-12 h-12 bg-gold/25 border border-gold scale-110 backdrop-blur-xs'
            : 'w-3 h-3 bg-gold shadow-glow-gold scale-100'
        }`}
      >
        {isHoveringCanvas && <span>DRAG</span>}
      </div>
    </div>
  );
};
