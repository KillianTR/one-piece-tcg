import React, { useState, useEffect, useRef } from 'react';
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
  Languages,
  ChevronDown,
  Award,
  TrendingUp,
  Coins,
  Database
} from 'lucide-react';
import { useCollection } from '../context/CollectionContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { getUserProfile } from '../services/profileService';
import CollectionStatsModal from './CollectionStatsModal';
import BackupModal from './BackupModal';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenVersionModal, 
  onOpenAuthModal, 
  onOpenProfileModal 
}) {
  const { uniqueCardsOwned, totalWishlisted, estimatedCollectionValue } = useCollection();
  const { user, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { toggleTheme, isDark } = useTheme();

  // Dropdown, Stats & User profile state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const dropdownRef = useRef(null);

  // Load user profile from Supabase when user logs in
  useEffect(() => {
    if (user) {
      getUserProfile(user).then((prof) => {
        if (prof) setProfileData(prof);
      });
    } else {
      setProfileData(null);
    }
  }, [user]);

  // Listen to profile updates from ProfileModal
  useEffect(() => {
    const handleProfileUpdate = (e) => {
      if (e.detail) {
        setProfileData(e.detail);
      }
    };
    window.addEventListener('profile-updated', handleProfileUpdate);
    return () => window.removeEventListener('profile-updated', handleProfileUpdate);
  }, []);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDropdownOpen]);

  // Derived user details
  const displayAvatar = profileData?.avatar_url || user?.user_metadata?.avatar_url || user?.user_metadata?.picture || '';
  const displayName = profileData?.username || user?.user_metadata?.username || user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'Coleccionista';
  const displayRank = profileData?.pirate_title || user?.user_metadata?.pirate_title || 'Novato del East Blue';

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors duration-200 ${
      isDark 
        ? 'bg-neutral-950/90 border-neutral-800' 
        : 'bg-white/95 border-neutral-200 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* ========================================================= */}
        {/* 1. BRAND / LOGO                                           */}
        {/* ========================================================= */}
        <div 
          className="flex items-center gap-3 cursor-pointer shrink-0 select-none group" 
          onClick={() => setActiveTab('binder')}
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center transition group-hover:scale-105">
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
            </div>
            <p className={`text-[10px] uppercase tracking-widest font-semibold hidden sm:block ${
              isDark ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              {t('brandTagline')}
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. NAVIGATION TABS (DESKTOP)                             */}
        {/* ========================================================= */}
        <nav className={`hidden lg:flex items-center gap-1 p-1.5 rounded-2xl border transition ${
          isDark 
            ? 'bg-neutral-900/90 border-neutral-800' 
            : 'bg-neutral-100 border-neutral-200'
        }`}>
          <button
            type="button"
            onClick={() => setActiveTab('binder')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
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
            type="button"
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
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
            type="button"
            onClick={() => setActiveTab('trades')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
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

        {/* ========================================================= */}
        {/* 3. RIGHT CONTROLS: STATS & USER DROPDOWN (OR GUEST BAR)  */}
        {/* ========================================================= */}
        <div className="flex items-center gap-3">
          {/* Quick Stats Pill (Desktop) - Clic para ver Estadísticas y Valor */}
          <button
            type="button"
            onClick={() => setIsStatsModalOpen(true)}
            className={`hidden md:flex items-center gap-3 border px-3.5 py-2 rounded-2xl text-xs transition cursor-pointer group ${
              isDark 
                ? 'bg-neutral-900 border-neutral-800 hover:border-amber-500/50 hover:bg-neutral-800/70' 
                : 'bg-neutral-100 border-neutral-200 hover:border-amber-400 hover:bg-white shadow-xs'
            }`}
            title="Ver estadísticas y valor estimado de la colección"
          >
            <div className="flex items-center gap-1.5" title={t('navCollection')}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition" />
              <span className={`text-[11px] font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {t('navCollection')}:
              </span>
              <strong className={`font-mono font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {uniqueCardsOwned}
              </strong>
            </div>

            <div className={`w-px h-3.5 ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}`} />

            <div className="flex items-center gap-1.5" title={t('navWishlist')}>
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className={`text-[11px] font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {t('navWishlist')}:
              </span>
              <strong className="text-amber-500 dark:text-amber-400 font-mono font-bold">
                {totalWishlisted}
              </strong>
            </div>

            {estimatedCollectionValue > 0 && (
              <>
                <div className={`w-px h-3.5 ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}`} />
                <div className="flex items-center gap-1.5 text-emerald-500 font-mono font-bold text-xs">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>~{estimatedCollectionValue.toFixed(0)}€</span>
                </div>
              </>
            )}
          </button>

          {/* Divisor vertical sutil entre Stats y Usuario */}
          <div className={`hidden md:block w-px h-6 ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}`} />

          {/* SI EL USUARIO HA INICIADO SESIÓN -> MENÚ DESPLEGABLE EN EL AVATAR */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-2xl border transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.02] ${
                  isDropdownOpen
                    ? isDark 
                      ? 'bg-neutral-800 border-amber-500/60 ring-2 ring-amber-500/20' 
                      : 'bg-neutral-200/90 border-amber-500/60 ring-2 ring-amber-500/20'
                    : isDark
                      ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/80'
                      : 'bg-neutral-100 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-200/60'
                }`}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                {/* Avatar circular con borde degradado dorado */}
                <div className="w-7 h-7 rounded-full p-0.5 bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 shrink-0">
                  <div className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center ${
                    isDark ? 'bg-neutral-950' : 'bg-neutral-100'
                  }`}>
                    {displayAvatar ? (
                      <img
                        src={displayAvatar}
                        alt="Avatar"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-3.5 h-3.5 text-neutral-400" />
                    )}
                  </div>
                </div>

                {/* Nombre de usuario + Estado en línea */}
                <div className="flex items-center gap-1.5 text-left">
                  <span className={`text-xs font-bold max-w-[100px] sm:max-w-[130px] truncate ${
                    isDark ? 'text-neutral-200' : 'text-neutral-800'
                  }`}>
                    {displayName}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" title={t('navCloudSynced')} />
                </div>

                {/* Flecha Chevron animada */}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                } ${isDropdownOpen ? 'rotate-180 text-amber-500' : ''}`} />
              </button>

              {/* FLOATING DROPDOWN CARD */}
              {isDropdownOpen && (
                <div className={`absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-3xl border shadow-2xl p-2.5 z-50 animate-fade-in backdrop-blur-xl ${
                  isDark 
                    ? 'bg-neutral-900/95 border-neutral-800 text-neutral-100 shadow-black/80' 
                    : 'bg-white/95 border-neutral-200 text-neutral-900 shadow-xl shadow-neutral-400/25'
                }`}>
                  {/* Tarjeta de Identidad de Usuario */}
                  <div className={`p-3 rounded-2xl mb-1.5 border flex items-center gap-3 ${
                    isDark ? 'bg-neutral-950/60 border-neutral-800/80' : 'bg-neutral-50 border-neutral-200/80'
                  }`}>
                    <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 shrink-0 shadow-md shadow-amber-500/10">
                      <div className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center ${
                        isDark ? 'bg-neutral-900' : 'bg-neutral-100'
                      }`}>
                        {displayAvatar ? (
                          <img
                            src={displayAvatar}
                            alt="Avatar"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-5 h-5 text-neutral-400" />
                        )}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs truncate flex items-center gap-1.5">
                        <span className={isDark ? 'text-white' : 'text-neutral-900'}>
                          {displayName}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" title={t('navCloudSynced')} />
                      </div>
                      <p className={`text-[11px] truncate font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        {user.email}
                      </p>
                      <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-amber-500 dark:text-amber-400">
                        <Award className="w-3 h-3 shrink-0" />
                        <span className="truncate">{displayRank}</span>
                      </div>
                    </div>
                  </div>

                  {/* Resumen de Colección en móvil o acceso rápido */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsStatsModalOpen(true);
                    }}
                    className={`w-full grid grid-cols-2 gap-2 p-2 rounded-xl mb-1.5 border text-xs md:hidden cursor-pointer transition text-left ${
                      isDark ? 'bg-neutral-950/40 border-neutral-800/50 hover:border-amber-500/40' : 'bg-neutral-50/70 border-neutral-200/60 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <div className="leading-tight">
                        <span className={`text-[10px] block ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{t('navCollection')}</span>
                        <strong className="font-mono text-xs">{uniqueCardsOwned}</strong>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                      <div className="leading-tight">
                        <span className={`text-[10px] block ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{t('navWishlist')}</span>
                        <strong className="font-mono text-xs text-amber-500 dark:text-amber-400">{totalWishlisted}</strong>
                      </div>
                    </div>
                  </button>

                  {/* Botón: Mi Perfil y Personalización */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onOpenProfileModal();
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      isDark 
                        ? 'hover:bg-neutral-800 text-neutral-200 hover:text-white' 
                        : 'hover:bg-neutral-100 text-neutral-800 hover:text-neutral-950'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <User className="w-4 h-4 text-amber-500" />
                      <span>{t('navMyProfile')}</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-500 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                      {t('navEditProfile')} →
                    </span>
                  </button>

                  {/* Botón: Estadísticas de Colección */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsStatsModalOpen(true);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      isDark 
                        ? 'hover:bg-neutral-800 text-neutral-200 hover:text-white' 
                        : 'hover:bg-neutral-100 text-neutral-800 hover:text-neutral-950'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span>{t('navStatsDropdown')}</span>
                    </div>
                    {estimatedCollectionValue > 0 && (
                      <span className="text-[11px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                        ~{estimatedCollectionValue.toFixed(0)}€
                      </span>
                    )}
                  </button>

                  {/* Botón: Copia de Seguridad & Exportar */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsBackupModalOpen(true);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      isDark 
                        ? 'hover:bg-neutral-800 text-neutral-200 hover:text-white' 
                        : 'hover:bg-neutral-100 text-neutral-800 hover:text-neutral-950'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Database className="w-4 h-4 text-amber-500" />
                      <span>{t('navBackupDropdown')}</span>
                    </div>
                    <span className="text-[10px] font-bold text-neutral-400 bg-neutral-800/40 px-2 py-0.5 rounded-lg border border-neutral-700/50">
                      JSON / TXT
                    </span>
                  </button>

                  <div className={`my-1 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`} />

                  {/* Preferencias: Idioma & Modo Claro/Oscuro */}
                  <div className="p-2 space-y-2.5">
                    {/* Selector de Idioma */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium flex items-center gap-2 ${
                        isDark ? 'text-neutral-300' : 'text-neutral-700'
                      }`}>
                        <Languages className="w-3.5 h-3.5 text-neutral-400" />
                        {t('navLanguage')}
                      </span>
                      <div className={`flex items-center border p-0.5 rounded-xl text-xs font-bold ${
                        isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
                      }`}>
                        <button
                          type="button"
                          onClick={() => setLanguage('es')}
                          className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${
                            language === 'es'
                              ? 'bg-amber-500 text-neutral-950 shadow-sm'
                              : isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                          }`}
                        >
                          ES
                        </button>
                        <button
                          type="button"
                          onClick={() => setLanguage('en')}
                          className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${
                            language === 'en'
                              ? 'bg-amber-500 text-neutral-950 shadow-sm'
                              : isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                          }`}
                        >
                          EN
                        </button>
                      </div>
                    </div>

                    {/* Selector de Tema */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium flex items-center gap-2 ${
                        isDark ? 'text-neutral-300' : 'text-neutral-700'
                      }`}>
                        {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-neutral-600" />}
                        {t('navTheme')}
                      </span>
                      <button
                        type="button"
                        onClick={toggleTheme}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                          isDark 
                            ? 'bg-neutral-950 border-neutral-800 text-neutral-200 hover:border-amber-500/50' 
                            : 'bg-neutral-100 border-neutral-200 text-neutral-800 hover:border-neutral-300'
                        }`}
                      >
                        {isDark ? (
                          <>
                            <Sun className="w-3 h-3 text-amber-400" />
                            <span>{t('themeLight')}</span>
                          </>
                        ) : (
                          <>
                            <Moon className="w-3 h-3 text-neutral-700" />
                            <span>{t('themeDark')}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className={`my-1 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`} />

                  {/* Versión y Notas SemVer */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onOpenVersionModal();
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      isDark ? 'hover:bg-neutral-800 text-neutral-400 hover:text-white' : 'hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Info className="w-3.5 h-3.5 text-amber-500" />
                      <span>{t('versionModalTitle') || 'Sistema SemVer'}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-amber-500/90">v0.5.0 →</span>
                  </button>

                  <div className={`my-1 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`} />

                  {/* Cerrar Sesión */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      signOut();
                    }}
                    className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold transition cursor-pointer text-rose-500 ${
                      isDark ? 'hover:bg-rose-950/30' : 'hover:bg-rose-50'
                    }`}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('navSignOut')}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* SI ES UN VISITANTE NO REGISTRADO */
            <div className="flex items-center gap-2">
              {/* Idioma rápido para invitados */}
              <div className={`flex items-center border p-0.5 rounded-xl text-xs font-bold ${
                isDark 
                  ? 'bg-neutral-900 border-neutral-800' 
                  : 'bg-neutral-100 border-neutral-200'
              }`}>
                <button
                  type="button"
                  onClick={() => setLanguage('es')}
                  className={`px-2 py-1 rounded-lg transition cursor-pointer ${
                    language === 'es'
                      ? 'bg-amber-500 text-neutral-950 shadow-sm'
                      : isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  title="Español"
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded-lg transition cursor-pointer ${
                    language === 'en'
                      ? 'bg-amber-500 text-neutral-950 shadow-sm'
                      : isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  title="English"
                >
                  EN
                </button>
              </div>

              {/* Tema rápido para invitados */}
              <button
                type="button"
                onClick={toggleTheme}
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  isDark 
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-amber-400' 
                    : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-amber-600'
                }`}
                title={isDark ? t('themeLight') : t('themeDark')}
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-800" />}
              </button>

              {/* Botón Entrar / Registro */}
              <button
                type="button"
                onClick={onOpenAuthModal}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border text-xs font-bold transition shadow-sm whitespace-nowrap cursor-pointer ${
                  isDark 
                    ? 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700/70 text-amber-400' 
                    : 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-amber-700'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>{t('navSignIn')}</span>
              </button>
            </div>
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
          type="button"
          onClick={() => setActiveTab('binder')}
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-bold cursor-pointer transition ${
            activeTab === 'binder' 
              ? isDark ? 'text-amber-400 bg-neutral-950 shadow-sm' : 'text-amber-700 bg-amber-50 shadow-sm'
              : isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          {t('navBinder')}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('catalog')}
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-bold cursor-pointer transition ${
            activeTab === 'catalog' 
              ? isDark ? 'text-amber-400 bg-neutral-950 shadow-sm' : 'text-amber-700 bg-amber-50 shadow-sm'
              : isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          {t('navCatalog')}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('trades')}
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-bold cursor-pointer transition ${
            activeTab === 'trades' 
              ? isDark ? 'text-amber-400 bg-neutral-950 shadow-sm' : 'text-amber-700 bg-amber-50 shadow-sm'
              : isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}
        >
          <Repeat className="w-3.5 h-3.5" />
          {t('navTrades')}
        </button>
      </div>

      {/* Modal de Estadísticas del Coleccionista y Valor Financiero */}
      <CollectionStatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
      />

      {/* Modal de Copia de Seguridad y Exportación */}
      <BackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
      />
    </header>
  );
}
