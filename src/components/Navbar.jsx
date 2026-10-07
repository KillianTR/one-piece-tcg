import React from 'react';
import { 
  BookOpen, 
  Grid, 
  Repeat, 
  Star, 
  Info,
  User,
  LogOut,
  Cloud,
  Sun,
  Moon,
  Languages
} from 'lucide-react';
import { useCollection } from '../context/CollectionContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ activeTab, setActiveTab, onOpenVersionModal, onOpenAuthModal }) {
  const { uniqueCardsOwned, totalWishlisted } = useCollection();
  const { user, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/90 dark:bg-neutral-950/90 light:bg-white/90 backdrop-blur-xl border-b border-neutral-800 dark:border-neutral-800 light:border-neutral-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab('binder')}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center p-1.5">
              <img 
                src="/one-piece-logo-white.webp" 
                alt="Grand Line Vault Logo" 
                className="w-full h-full object-contain filter drop-shadow" 
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl tracking-tight text-white dark:text-white light:text-neutral-900 flex items-center gap-1.5 font-sans">
                GRAND LINE <span className="text-amber-500 dark:text-amber-400">VAULT</span>
              </span>
              {/* Clickable Version Badge */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenVersionModal();
                }}
                className="group flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 border border-neutral-700/80 dark:border-neutral-700/80 light:border-neutral-300 hover:border-amber-500 text-[10px] font-mono font-bold text-amber-500 dark:text-amber-400 transition"
                title={t('versionCurrentBadge')}
              >
                <span>v0.3.0</span>
                <Info className="w-3 h-3 text-neutral-400 group-hover:text-amber-400" />
              </button>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold hidden sm:block">
              {t('brandTagline')}
            </p>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-neutral-900/90 dark:bg-neutral-900/90 light:bg-neutral-100 p-1.5 rounded-2xl border border-neutral-800 dark:border-neutral-800 light:border-neutral-300">
          <button
            onClick={() => setActiveTab('binder')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'binder'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'text-neutral-400 dark:text-neutral-400 light:text-neutral-600 hover:text-white dark:hover:text-white light:hover:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-800 light:hover:bg-neutral-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            {t('navBinder')}
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'catalog'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'text-neutral-400 dark:text-neutral-400 light:text-neutral-600 hover:text-white dark:hover:text-white light:hover:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-800 light:hover:bg-neutral-200'
            }`}
          >
            <Grid className="w-4 h-4" />
            {t('navCatalog')}
          </button>

          <button
            onClick={() => setActiveTab('trades')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'trades'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'text-neutral-400 dark:text-neutral-400 light:text-neutral-600 hover:text-white dark:hover:text-white light:hover:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-800 light:hover:bg-neutral-200'
            }`}
          >
            <Repeat className="w-4 h-4" />
            {t('navTrades')}
          </button>
        </nav>

        {/* Right Controls: Stats, Language, Theme & Auth */}
        <div className="flex items-center gap-2">
          {/* Quick Stats Pill (Desktop) */}
          <div className="hidden xl:flex items-center gap-3 bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 px-3 py-1.5 rounded-2xl text-xs">
            <div className="flex items-center gap-1.5" title={t('navCollection')}>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-neutral-400 text-[11px]">{t('navCollection')}:</span>
              <strong className="text-white dark:text-white light:text-neutral-900 font-mono">{uniqueCardsOwned}</strong>
            </div>

            <div className="w-px h-3.5 bg-neutral-800 dark:bg-neutral-800 light:bg-neutral-300" />

            <div className="flex items-center gap-1.5" title={t('navWishlist')}>
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-neutral-400 text-[11px]">{t('navWishlist')}:</span>
              <strong className="text-amber-500 dark:text-amber-400 font-mono">{totalWishlisted}</strong>
            </div>
          </div>

          {/* LANGUAGE TOGGLE BUTTON (ES / EN) */}
          <div className="flex items-center bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 p-0.5 rounded-xl text-xs font-bold">
            <button
              onClick={() => setLanguage('es')}
              className={`px-2 py-1 rounded-lg transition ${
                language === 'es'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white dark:hover:text-white light:hover:text-neutral-900'
              }`}
              title="Español"
            >
              ES
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-lg transition ${
                language === 'en'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white dark:hover:text-white light:hover:text-neutral-900'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* THEME TOGGLE BUTTON (Dark / Light Mode) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 text-neutral-300 dark:text-neutral-300 light:text-neutral-700 hover:text-amber-400 transition"
            title={isDark ? t('themeLight') : t('themeDark')}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-800" />}
          </button>

          {/* User Auth Button */}
          {user ? (
            <div className="flex items-center gap-1.5 bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 p-1 rounded-2xl">
              <div className="flex items-center gap-1.5 px-2 text-xs">
                <Cloud className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-neutral-200 dark:text-neutral-200 light:text-neutral-800 font-medium max-w-[100px] truncate" title={user.email}>
                  {user.email?.split('@')[0]}
                </span>
              </div>
              <button
                onClick={() => signOut()}
                className="p-1.5 hover:bg-neutral-800 dark:hover:bg-neutral-800 light:hover:bg-neutral-200 text-neutral-400 hover:text-rose-400 rounded-xl transition"
                title={t('navSignOut')}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-800 light:hover:bg-neutral-200 border border-neutral-700/70 dark:border-neutral-700/70 light:border-neutral-300 text-xs font-bold text-amber-500 dark:text-amber-400 transition shadow-sm whitespace-nowrap"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t('navSignIn')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around p-2 bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 border-t border-neutral-800 dark:border-neutral-800 light:border-neutral-300 text-xs">
        <button
          onClick={() => setActiveTab('binder')}
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-bold ${
            activeTab === 'binder' 
              ? 'text-amber-500 dark:text-amber-400 bg-neutral-950 dark:bg-neutral-950 light:bg-white shadow-sm' 
              : 'text-neutral-400 light:text-neutral-600'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          {t('navBinder')}
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-bold ${
            activeTab === 'catalog' 
              ? 'text-amber-500 dark:text-amber-400 bg-neutral-950 dark:bg-neutral-950 light:bg-white shadow-sm' 
              : 'text-neutral-400 light:text-neutral-600'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          {t('navCatalog')}
        </button>
        <button
          onClick={() => setActiveTab('trades')}
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-bold ${
            activeTab === 'trades' 
              ? 'text-amber-500 dark:text-amber-400 bg-neutral-950 dark:bg-neutral-950 light:bg-white shadow-sm' 
              : 'text-neutral-400 light:text-neutral-600'
          }`}
        >
          <Repeat className="w-3.5 h-3.5" />
          {t('navTrades')}
        </button>
      </div>
    </header>
  );
}
