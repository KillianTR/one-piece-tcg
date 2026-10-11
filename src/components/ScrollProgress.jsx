import React, { useEffect, useState } from 'react';

/**
 * ScrollProgress — Barra de carga de navegación interactiva (Grand Line Golden Log Tracker)
 * Muestra el progreso de lectura/desplazamiento de arriba a abajo a medida que el usuario baja por la web.
 * Cumple los estándares de Modern Web Guidance con @supports(animation-timeline: scroll()) y fallback nativo.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Si el navegador soporta scroll-timeline de forma nativa en CSS, la clase .scroll-progress-driven lo maneja
    const supportsScrollTimeline = 
      typeof CSS !== 'undefined' && 
      CSS.supports && 
      CSS.supports('animation-timeline', 'scroll()');

    const updateScrollProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) {
        setProgress(0);
        return;
      }
      const currentScroll = window.scrollY || window.pageYOffset;
      const ratio = Math.min(1, Math.max(0, currentScroll / scrollableHeight));
      setProgress(ratio);
    };

    // Actualizar inmediatamente y escuchar con passive: true para rendimiento a 60-120fps
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  return (
    <aside aria-hidden="true" className="fixed top-0 left-0 right-0 z-[70] pointer-events-none">
      {/* Barra de progreso con resplandor ámbar/dorado de One Piece */}
      <div
        className="h-[3.5px] w-full origin-left bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 shadow-[0_0_12px_rgba(245,158,11,0.85)] transition-transform duration-75 scroll-progress-driven"
        style={{ transform: `scaleX(${progress})` }}
      />
      
      {/* Destello de punta dorada que avanza con el scroll */}
      {progress > 0.01 && (
        <div
          className="absolute top-[-1px] w-3 h-[5px] rounded-full bg-white shadow-[0_0_10px_#fde047] -translate-x-1/2 pointer-events-none transition-all duration-75"
          style={{ left: `${progress * 100}%` }}
        />
      )}
    </aside>
  );
}
