import React from 'react';
import { ExternalLink, GitBranch } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function Footer({ onOpenVersionModal }) {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  return (
    <footer className={`mt-20 border-t py-10 px-4 text-xs transition-colors ${
      isDark ? 'border-neutral-800 bg-neutral-950/60 text-neutral-400' : 'border-neutral-200 bg-white/70 text-neutral-600'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & SemVer note */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <img 
              src="/one-piece-logo-white.webp" 
              alt="Grand Line Vault Logo" 
              className={`w-5 h-5 object-contain filter ${isDark ? '' : 'invert'}`} 
            />
            <span className={`font-bold tracking-wide ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              GRAND LINE VAULT
            </span>
          </div>
          <span className="hidden sm:inline text-neutral-400">•</span>
          <div className="flex items-center gap-2">
            <span>{t('footerVersionLabel')}</span>
            <button
              onClick={onOpenVersionModal}
              className={`font-mono text-amber-500 hover:text-amber-400 font-bold px-2 py-0.5 rounded border transition cursor-pointer ${
                isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-300'
              }`}
            >
              v0.4.0 (Minor)
            </button>
            <span className="text-[11px] text-neutral-500">{t('footerSemVerNote')}</span>
          </div>
        </div>

        {/* Center / Disclaimer */}
        <div className="text-center text-[11px] text-neutral-500 max-w-md">
          {t('footerDisclaimer')}
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.cardtrader.com/es/games/one-piece-card-game"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-amber-500 transition"
          >
            <span>CardTrader</span>
            <ExternalLink className="w-3 h-3 text-neutral-400" />
          </a>
          <button
            onClick={onOpenVersionModal}
            className="flex items-center gap-1 hover:text-amber-500 transition cursor-pointer"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>{t('footerChangelog')}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
