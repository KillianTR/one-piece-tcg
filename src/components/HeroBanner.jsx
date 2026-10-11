import React from 'react';
import { 
  Compass, 
  Grid, 
  Repeat, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function HeroBanner({ onNavigateTab }) {
  const { language } = useLanguage();
  const { isDark } = useTheme();

  const isEs = language !== 'en';

  return (
    <div className="w-full mb-6">
      <div 
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border shadow-2xl transition-all duration-300 ${
          isDark 
            ? 'border-amber-500/25 bg-[#0d1322] shadow-black/60' 
            : 'border-[#dfd3be] bg-[#fdfbf7] shadow-[#382b14]/10'
        }`}
        style={{
          backgroundImage: `url('/grand-line-map-banner.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      >
        {/* Deep Nautical Gradient Overlay for Contrast */}
        <div 
          className={`absolute inset-0 transition-colors ${
            isDark 
              ? 'bg-gradient-to-r from-[#0a0e1a]/95 via-[#0d1425]/90 to-[#121c33]/75' 
              : 'bg-gradient-to-r from-[#fbf8f0]/95 via-[#f8f3e5]/90 to-[#f3ebd7]/75'
          }`} 
        />

        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

        {/* Banner Content (Streamlined & Clean without side card) */}
        <div className="relative z-10 p-5 sm:p-7 md:p-9">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-3 sm:mb-4 backdrop-blur-md shadow-xs transition ${
              isDark 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                : 'bg-[#ede3cf]/90 border-[#c7b693] text-[#8a5d13]'
            }`}>
              <Compass className="w-4 h-4 text-amber-500 animate-spin-slow" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider font-mono">
                {isEs ? 'Grand Line Vault • Archivador & Tracker Oficial' : 'Grand Line Vault • Official Binder & Tracker'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Main Headline */}
            <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-[#162238]'
            }`}>
              {isEs ? (
                <>
                  Tu Colección en Alta Mar.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 italic">
                    Cada carta. Cada expansión.
                  </span>
                </>
              ) : (
                <>
                  Your Collection on the High Seas.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 italic">
                    Every card. Every set.
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className={`mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed max-w-2xl ${
              isDark ? 'text-neutral-300' : 'text-[#3c4a63]'
            }`}>
              {isEs 
                ? 'Gestiona tu inventario con la experiencia física interactiva de álbumes Vault X de 9 y 12 bolsillos, haz seguimiento de cartas faltantes y consulta el valor en euros en CardTrader.' 
                : 'Manage your inventory with the interactive physical feel of 9 & 12-pocket Vault X binders, track missing card checklists, and verify live market prices on CardTrader.'}
            </p>

            {/* Action Buttons */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => onNavigateTab && onNavigateTab('catalog')}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 cursor-pointer"
              >
                <Grid className="w-4 h-4" />
                <span>{isEs ? 'Explorar Catálogo de Cartas' : 'Explore Card Catalog'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab && onNavigateTab('trades')}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition backdrop-blur-md cursor-pointer ${
                  isDark 
                    ? 'bg-neutral-900/80 hover:bg-neutral-800 border-neutral-700/80 text-white hover:border-amber-500/60' 
                    : 'bg-white/80 hover:bg-white border-[#d8cbaf] text-[#1a253a] hover:border-amber-600 shadow-2xs'
                }`}
              >
                <Repeat className="w-4 h-4 text-amber-500" />
                <span>{isEs ? 'Tablón de Intercambios P2P' : 'P2P Trade Board'}</span>
              </button>

              <a
                href="https://www.cardtrader.com/es-ES/one-piece"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isDark ? 'text-amber-400 hover:text-amber-300' : 'text-[#8a5d13] hover:text-[#5e3f0c]'
                }`}
              >
                <span>CardTrader</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
