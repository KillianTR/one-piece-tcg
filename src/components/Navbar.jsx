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

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenVersionModal, 
  onOpenAuthModal,
  onOpenProfileModal 
}) {
  const { uniqueCardsOwned, totalWishlisted } = useCollection();
  const { user, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors duration-200 ${
      isDark 
        ? 'bg-neutral-950/90 border-neutral-800' 
        : 'bg-white/95 border-neutral-200 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab('binder')}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
            <div className={`w-full h-full rounded-[14px] flex items-center justify-center p-1.5 ${
              isDark ? 'bg-neutral-950' : 'bg-neutral-900'
            }`}>
              <img 
                src="/one-piece-logo-white.webp" 
                alt="Grand Line Vault Logo" 
                className="w-full h-full object-contain filter drop-shadow" 
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-black text-lg sm:text-xl tracking-tight flex items-center gap-1.5 font-sans ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}>
                GRAND LINE <span className="text-amber-500 dark:text-amber-400">VAULT</span>
              </span>
              {/* Clickable Version Badge */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenVersionModal();
                }}
                className={`group flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold transition ${
                  isDark 
                    ? 'bg-neutral-900 border-neutral-700/80 hover:border-amber-500 text-amber-400' 
                    : 'bg-amber-50 border-amber-200 hover:border-amber-400 text-amber-800'
                }`}
                title={t('versionCurrentBadge')}
              >
                <span>v0.4.0</span>
                <Info className={`w-3 h-3 ${isDark ? 'text-neutral-400 group-hover:text-amber-400' : 'text-amber-600'}`} />
              </button>
            </div>
            <p className={`text-[10px] uppercase tracking-widest font-semibold hidden sm:block ${
              isDark ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              {t('brandTagline')}
            </p>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className={`hidden lg:flex items-center gap-1 p-1.5 rounded-2xl border transition ${
          isDark 
            ? 'bg-neutral-900/90 border-neutral-800' 
            : 'bg-neutral-100 border-neutral-200'
        }`}>
          <button
            onClick={() => setActiveTab('binder')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'binder'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : isDark 
                  ? 'text-neutral-400 hover:text-white hover:bg-neutral-800' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/80'
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
                : isDark 
                  ? 'text-neutral-400 hover:text-white hover:bg-neutral-800' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/80'
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
                : isDark 
                  ? 'text-neutral-400 hover:text-white hover:bg-neutral-800' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/80'
            }`}
          >
            <Repeat className="w-4 h-4" />
            {t('navTrades')}
          </button>
        </nav>

        {/* Right Controls: Stats, Language, Theme & Auth */}
        <div className="flex items-center gap-2">
          {/* Quick Stats Pill (Desktop) */}
          <div className={`hidden xl:flex items-center gap-3 border px-3 py-1.5 rounded-2xl text-xs ${
            isDark 
              ? 'bg-neutral-900 border-neutral-800' 
              : 'bg-neutral-100 border-neutral-200'
          }`}>
            <div className="flex items-center gap-1.5" title={t('navCollection')}>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{t('navCollection')}:</span>
              <strong className={`font-mono ${isDark ? 'text-white' : 'text-neutral-900'}`}>{uniqueCardsOwned}</strong>
            </div>

            <div className={`w-px h-3.5 ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}`} />

            <div className="flex items-center gap-1.5" title={t('navWishlist')}>
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{t('navWishlist')}:</span>
              <strong className="text-amber-500 dark:text-amber-400 font-mono">{totalWishlisted}</strong>
            </div>
          </div>

          {/* LANGUAGE TOGGLE BUTTON (ES / EN) */}
          <div className={`flex items-center border p-0.5 rounded-xl text-xs font-bold ${
            isDark 
              ? 'bg-neutral-900 border-neutral-800' 
              : 'bg-neutral-100 border-neutral-200'
          }`}>
            <button
              onClick={() => setLanguage('es')}
              className={`px-2 py-1 rounded-lg transition ${
                language === 'es'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
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
                  : isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* THEME TOGGLE BUTTON (Dark / Light Mode) */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition ${
              isDark 
                ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-amber-400' 
                : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-amber-600'
            }`}
            title={isDark ? t('themeLight') : t('themeDark')}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-800" />}
          </button>

          {/* User Auth Button */}
          {user ? (
            <div className={`flex items-center gap-1.5 border p-1 rounded-2xl ${
              isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
            }`}>
              <button 
                onClick={onOpenProfileModal}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-xl text-xs transition cursor-pointer hover:bg-neutral-800/50 ${
                  isDark ? 'hover:bg-neutral-800 text-neutral-200' : 'hover:bg-neutral-200/60 text-neutral-800'
                }`}
                title="Configurar Perfil / Profile Settings"
              >
                {user.user_metadata?.avatar_url || user.user_metadata?.picture ? (
                  <img
                    src={user.user_metadata?.avatar_url || user.user_metadata?.picture}
                    alt="Avatar"
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-full object-cover border border-amber-500/50"
                  />
                ) : (
                  <Cloud className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                )}
                <span className="font-semibold max-w-[110px] truncate" title={user.email}>
                  {user.user_metadata?.username || user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0]}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Conectado a la nube" />
              </button>
              <button
                onClick={() => signOut()}
                className={`p-1.5 rounded-xl transition ${
                  isDark 
                    ? 'hover:bg-neutral-800 text-neutral-400 hover:text-rose-400' 
                    : 'hover:bg-neutral-200 text-neutral-500 hover:text-rose-600'
                }`}
                title={t('navSignOut')}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs font-bold transition shadow-sm whitespace-nowrap ${
                isDark 
                  ? 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700/70 text-amber-400' 
                  : 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-amber-700'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{t('navSignIn')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className={`lg:hidden flex items-center justify-around p-2 border-t text-xs ${
        isDark 
          ? 'bg-neutral-900 border-neutral-800' 
          : 'bg-white border-neutral-200'
      }`}>
        <button
          onClick={() => setActiveTab('binder')}
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-bold ${
            activeTab === 'binder' 
              ? isDark ? 'text-amber-400 bg-neutral-950 shadow-sm' : 'text-amber-700 bg-amber-50 shadow-sm'
              : isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          {t('navBinder')}
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-bold ${
            activeTab === 'catalog' 
              ? isDark ? 'text-amber-400 bg-neutral-950 shadow-sm' : 'text-amber-700 bg-amber-50 shadow-sm'
              : isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          {t('navCatalog')}
        </button>
        <button
          onClick={() => setActiveTab('trades')}
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-bold ${
            activeTab === 'trades' 
              ? isDark ? 'text-amber-400 bg-neutral-950 shadow-sm' : 'text-amber-700 bg-amber-50 shadow-sm'
              : isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}
        >
          <Repeat className="w-3.5 h-3.5" />
          {t('navTrades')}
        </button>
      </div>
    </header>
  );
}
