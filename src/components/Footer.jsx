import React from 'react';
import { ExternalLink, GitBranch, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

// Enlaces de contacto y soporte de Killian Torrell
const SUPPORT_EMAIL = 'killiantorrell@gmail.com';
const BUY_ME_A_COFFEE_URL = 'https://buymeacoffee.com/killiantorrell';

function LinkedInIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.91 0-1.64.73-1.64 1.64s.73 1.64 1.64 1.64 1.64-.73 1.64-1.64-.73-1.64-1.64-1.64Z" />
    </svg>
  );
}

function GitHubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function BuyMeACoffeeIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <path d="M10 11.5a1.2 1.2 0 0 0-1.7 0 1.2 1.2 0 0 0 0 1.7L10 15l1.7-1.8a1.2 1.2 0 0 0 0-1.7 1.2 1.2 0 0 0-1.7 0Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

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
              v0.6.1
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

      {/* Bottom Row: Creator attribution + Social & Contact Bar */}
      <div className={`max-w-7xl mx-auto px-4 mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
        isDark ? 'border-neutral-800/60' : 'border-neutral-200'
      }`}>
        {/* Left: Year & Creator Portfolio Link */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
          <span className="font-semibold text-neutral-500 dark:text-neutral-400">© 2026 Grand Line Vault</span>
          <span className="text-neutral-400 hidden sm:inline">•</span>
          <span className={isDark ? 'text-neutral-400' : 'text-neutral-500'}>
            {t('footerCreatedBy')}
          </span>
          <a 
            href="https://killiantr.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-bold text-amber-500 hover:text-amber-400 transition inline-flex items-center gap-1 group"
          >
            <span className="group-hover:underline">{t('footerCreatorName')}</span>
            <ExternalLink className="w-3 h-3 text-amber-500/70 group-hover:text-amber-400" />
          </a>
        </div>

        {/* Right: Social & Contact Icon Bar (LinkedIn, GitHub, Portfolio, Contact) */}
        <div className="flex items-center gap-2">
          {/* LinkedIn Profile */}
          <a
            href="https://www.linkedin.com/in/killiantorrell"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn — Killian Torrell (/in/killiantorrell)"
            aria-label="LinkedIn"
            className={`p-2 rounded-xl border transition-all duration-200 flex items-center justify-center group ${
              isDark
                ? 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-neutral-900'
                : 'bg-neutral-100/80 border-neutral-300 text-neutral-600 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-white'
            }`}
          >
            <LinkedInIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
          </a>

          {/* GitHub Profile */}
          <a
            href="https://github.com/KillianTR"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub — @KillianTR"
            aria-label="GitHub"
            className={`p-2 rounded-xl border transition-all duration-200 flex items-center justify-center group ${
              isDark
                ? 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-900'
                : 'bg-neutral-100/80 border-neutral-300 text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 hover:bg-white'
            }`}
          >
            <GitHubIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
          </a>

          {/* Buy Me a Coffee / Donaciones */}
          <a
            href={BUY_ME_A_COFFEE_URL}
            target="_blank"
            rel="noopener noreferrer"
            title={`${t('footerBuyCoffee')} — Buy Me a Coffee`}
            aria-label="Buy Me a Coffee"
            className={`p-2 rounded-xl border transition-all duration-200 flex items-center justify-center group ${
              isDark
                ? 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-[#FFDD00] hover:border-[#FFDD00]/50 hover:bg-[#FFDD00]/10'
                : 'bg-neutral-100/80 border-neutral-300 text-neutral-600 hover:text-amber-600 hover:border-amber-400 hover:bg-amber-50'
            }`}
          >
            <BuyMeACoffeeIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
          </a>

          {/* Email / Support Contact */}
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=Grand%20Line%20Vault%20-%20Contacto%20y%20Soporte`}
            title={`${t('footerContact')} (${SUPPORT_EMAIL})`}
            aria-label="Email Contact"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all duration-200 group ${
              isDark
                ? 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-amber-400 hover:border-amber-500/40 hover:bg-neutral-900'
                : 'bg-neutral-100/80 border-neutral-300 text-neutral-600 hover:text-amber-600 hover:border-amber-400 hover:bg-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline">{t('footerContact')}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
