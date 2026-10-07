import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  User, 
  Upload, 
  Trash2, 
  ShieldAlert, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  KeyRound, 
  Mail, 
  Award,
  Camera,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { 
  getUserProfile, 
  checkUsernameCooldown, 
  checkUsernameAvailability, 
  validateUsernameFormat, 
  processAvatarImage, 
  saveUserProfile,
  changeUserPassword 
} from '../services/profileService';

export default function ProfileModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { isDark } = useTheme();

  const fileInputRef = useRef(null);

  // Profile Form States
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [initialUsername, setInitialUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarMeta, setAvatarMeta] = useState(null);
  const [pirateTitle, setPirateTitle] = useState('Novato del East Blue');
  const [bio, setBio] = useState('');
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);

  // Username validation & cooldown states
  const [cooldown, setCooldown] = useState({ allowed: true, daysRemaining: 0, nextAvailableDate: null });
  const [usernameStatus, setUsernameStatus] = useState('idle'); // 'idle' | 'checking' | 'available' | 'taken' | 'invalid'
  const [usernameError, setUsernameError] = useState('');

  // Password change state
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState(null);

  // Avatar processing state
  const [isProcessingAvatar, setIsProcessingAvatar] = useState(false);

  // Submit & feedback states
  const [isSaving, setIsSaving] = useState(false);
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState(null);

  // Load profile when modal opens
  useEffect(() => {
    if (!isOpen || !user) return;

    let isMounted = true;
    setLoading(true);
    setSubmitFeedback(null);
    setPasswordFeedback(null);

    getUserProfile(user).then((prof) => {
      if (!isMounted) return;
      setProfile(prof);
      setUsername(prof.username || '');
      setInitialUsername(prof.username || '');
      setFullName(prof.full_name || '');
      setAvatarUrl(prof.avatar_url || '');
      setPirateTitle(prof.pirate_title || 'Novato del East Blue');
      setBio(prof.bio || '');
      setNewsletterOptIn(Boolean(prof.newsletter_opt_in));

      // Check cooldown on existing timestamp (bypass for Killian's test emails)
      const cd = checkUsernameCooldown(prof.username_changed_at, user.email);
      setCooldown(cd);

      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [isOpen, user]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Live validation & check for username
  useEffect(() => {
    if (!username || username === initialUsername) {
      setUsernameStatus('idle');
      setUsernameError('');
      return;
    }

    const validation = validateUsernameFormat(username);
    if (!validation.valid) {
      setUsernameStatus('invalid');
      setUsernameError(t(validation.error));
      return;
    }

    setUsernameStatus('checking');
    const timer = setTimeout(async () => {
      if (!user) return;
      const res = await checkUsernameAvailability(username, user.id);
      if (!res.valid) {
        setUsernameStatus('invalid');
        setUsernameError(t(res.error));
      } else if (res.available) {
        setUsernameStatus('available');
        setUsernameError('');
      } else {
        setUsernameStatus('taken');
        setUsernameError(t('profileUsernameTaken'));
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [username, initialUsername, user, t]);

  // Handle Avatar File Upload
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingAvatar(true);
      setSubmitFeedback(null);
      const processed = await processAvatarImage(file);
      setAvatarUrl(processed.dataUrl);
      setAvatarMeta(processed);
    } catch (err) {
      setSubmitFeedback({ type: 'error', message: err.message });
    } finally {
      setIsProcessingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Remove Avatar
  const handleRemoveAvatar = () => {
    setAvatarUrl('');
    setAvatarMeta(null);
  };

  // Handle Password Update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setPasswordFeedback({ type: 'error', message: 'La contraseña debe tener al menos 6 caracteres.' });
      return;
    }

    try {
      setPasswordLoading(true);
      setPasswordFeedback(null);
      await changeUserPassword(newPassword);
      setPasswordFeedback({ type: 'success', message: t('profilePasswordSuccess') });
      setNewPassword('');
    } catch (err) {
      setPasswordFeedback({ type: 'error', message: err.message || 'Error al cambiar la contraseña' });
    } finally {
      setPasswordLoading(false);
    }
  };

  // Handle Form Submit
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!user) return;

    if (username !== initialUsername && usernameStatus === 'taken') {
      setSubmitFeedback({ type: 'error', message: t('profileUsernameTaken') });
      return;
    }

    if (username !== initialUsername && usernameStatus === 'invalid') {
      setSubmitFeedback({ type: 'error', message: t('profileUsernameInvalid') });
      return;
    }

    try {
      setIsSaving(true);
      setSubmitFeedback(null);

      const updated = await saveUserProfile(user, profile, {
        username,
        full_name: fullName,
        avatar_url: avatarUrl,
        pirate_title: pirateTitle,
        bio,
        newsletter_opt_in: newsletterOptIn
      });

      setProfile(updated);
      setInitialUsername(updated.username);
      setCooldown(checkUsernameCooldown(updated.username_changed_at, user.email));

      // Trigger celebratory mini confetti
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 }
      });

      setSubmitFeedback({ type: 'success', message: t('profileSaveSuccess') });
      setIsSavedSuccess(true);
      setTimeout(() => {
        setIsSavedSuccess(false);
      }, 5000);
    } catch (err) {
      setSubmitFeedback({ type: 'error', message: err.message || 'Error al guardar los cambios' });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className={`w-full max-w-xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-colors ${
          isDark 
            ? 'bg-neutral-900 border-neutral-800 text-neutral-100' 
            : 'bg-white border-neutral-200 text-neutral-900 shadow-neutral-300/40'
        }`}
      >
        {/* Modal Header */}
        <div className={`flex items-center justify-between p-5 border-b ${
          isDark ? 'border-neutral-800 bg-neutral-950/60' : 'border-neutral-200 bg-neutral-50/80'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-400 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
                isDark ? 'bg-neutral-900 text-amber-400' : 'bg-white text-amber-600'
              }`}>
                <User className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className={`font-black text-lg tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {t('profileModalTitle')}
              </h2>
              <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {t('profileModalSubtitle')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition cursor-pointer ${
              isDark 
                ? 'hover:bg-neutral-800 text-neutral-400 hover:text-white' 
                : 'hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900'
            }`}
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
              <p className="text-xs text-neutral-400 font-mono">Cargando perfil...</p>
            </div>
          ) : (
            <form id="profile-form" onSubmit={handleSaveProfile} className="space-y-6">
              
              {/* SECCIÓN 1: FOTO DE PERFIL (300x300) */}
              <div className={`p-4 sm:p-5 rounded-2xl border space-y-4 ${
                isDark ? 'bg-neutral-950/40 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <Camera className="w-4 h-4 text-amber-500" />
                      {t('profileAvatarTitle')}
                    </h3>
                    <p className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      {t('profileAvatarSubtitle')}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5">
                  {/* Avatar Circular Preview */}
                  <div className="relative group shrink-0">
                    <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 shadow-lg shadow-amber-500/10">
                      <div className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center ${
                        isDark ? 'bg-neutral-900' : 'bg-neutral-100'
                      }`}>
                        {avatarUrl ? (
                          <img 
                            src={avatarUrl} 
                            alt="Avatar" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <User className="w-10 h-10 text-neutral-400" />
                        )}
                      </div>
                    </div>

                    {isProcessingAvatar && (
                      <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Actions & Specs */}
                  <div className="flex-1 space-y-2.5 text-center sm:text-left">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      accept="image/png,image/jpeg,image/webp" 
                      className="hidden" 
                    />

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isProcessingAvatar}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 text-neutral-950 hover:bg-amber-400 transition shadow-sm cursor-pointer disabled:opacity-50"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        {isProcessingAvatar ? t('profileAvatarProcessing') : t('profileAvatarUploadBtn')}
                      </button>

                      {avatarUrl && (
                        <button
                          type="button"
                          onClick={handleRemoveAvatar}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                            isDark 
                              ? 'border-neutral-800 hover:bg-neutral-800 text-rose-400' 
                              : 'border-neutral-300 hover:bg-neutral-200 text-rose-600'
                          }`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          {t('profileAvatarRemoveBtn')}
                        </button>
                      )}
                    </div>

                    {avatarMeta && (
                      <p className="text-[11px] font-mono text-emerald-400 flex items-center justify-center sm:justify-start gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Optimizada a 300x300 px (~{avatarMeta.sizeKb} KB)
                      </p>
                    )}
                  </div>
                </div>

                {/* Normas de la Comunidad (Advertencia de Moderación) */}
                <div className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                  isDark 
                    ? 'bg-amber-950/20 border-amber-800/40 text-amber-200/90' 
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}>
                  <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 text-[11px] leading-relaxed">
                    <strong className="font-bold">{t('profileAvatarGuidelinesTitle')}</strong>{' '}
                    <span>{t('profileAvatarGuidelinesText')}</span>
                  </div>
                </div>
              </div>

              {/* SECCIÓN 2: NOMBRE DE USUARIO (30 DÍAS & ÚNICO) */}
              <div className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                isDark ? 'bg-neutral-950/40 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-500" />
                    {t('profileUsernameTitle')}
                  </label>
                  <span className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {t('profileUsernameCooldownInfo')}
                  </span>
                </div>

                {/* Admin / Dev Test Account Badge */}
                {cooldown.isAdmin && (
                  <div className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs ${
                    isDark 
                      ? 'bg-purple-950/30 border-purple-800/50 text-purple-300' 
                      : 'bg-purple-50 border-purple-200 text-purple-900'
                  }`}>
                    <Award className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="text-[11px] font-medium">
                      {t('profileAdminBypassBadge')}
                    </span>
                  </div>
                )}

                {/* Cooldown Lock Alert if less than 30 days and not admin */}
                {!cooldown.allowed && !cooldown.isAdmin && (
                  <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${
                    isDark 
                      ? 'bg-amber-950/30 border-amber-800/50 text-amber-300' 
                      : 'bg-amber-100/70 border-amber-300 text-amber-900'
                  }`}>
                    <Lock className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="text-[11px]">
                      {t('profileUsernameCooldownLocked')}{' '}
                      <strong>{cooldown.nextAvailableDate?.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}</strong>{' '}
                      ({cooldown.daysRemaining} días restantes).
                    </span>
                  </div>
                )}

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400 text-sm font-mono font-bold">
                    @
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    disabled={!cooldown.allowed}
                    maxLength={20}
                    placeholder="nombre_usuario"
                    className={`w-full pl-8 pr-10 py-2.5 rounded-xl border text-sm font-mono font-medium transition focus:outline-none ${
                      !cooldown.allowed 
                        ? 'opacity-60 cursor-not-allowed bg-neutral-800/30 border-neutral-800' 
                        : isDark
                          ? 'bg-neutral-900 border-neutral-700/80 focus:border-amber-500 text-white'
                          : 'bg-white border-neutral-300 focus:border-amber-500 text-neutral-900'
                    }`}
                  />

                  {/* Status Indicator inside Input */}
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    {usernameStatus === 'checking' && (
                      <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    )}
                    {usernameStatus === 'available' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                    {(usernameStatus === 'taken' || usernameStatus === 'invalid') && (
                      <AlertCircle className="w-4 h-4 text-rose-400" />
                    )}
                  </div>
                </div>

                {/* Live Feedback Message */}
                {usernameStatus === 'available' && (
                  <p className="text-[11px] text-emerald-400 font-medium">
                    ✓ {t('profileUsernameAvailable')}
                  </p>
                )}
                {usernameError && (
                  <p className="text-[11px] text-rose-400 font-medium">
                    ✕ {usernameError}
                  </p>
                )}
              </div>

              {/* SECCIÓN 3: DATOS PERSONALES & RANGO PIRATA */}
              <div className={`p-4 sm:p-5 rounded-2xl border space-y-4 ${
                isDark ? 'bg-neutral-950/40 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}>
                {/* Nombre y Apellidos (Opcional) */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-bold ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    {t('profileFullNameTitle')}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    maxLength={60}
                    placeholder={t('profileFullNamePlaceholder')}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition focus:outline-none ${
                      isDark 
                        ? 'bg-neutral-900 border-neutral-700/80 focus:border-amber-500 text-white' 
                        : 'bg-white border-neutral-300 focus:border-amber-500 text-neutral-900'
                    }`}
                  />
                </div>

                {/* Título de Coleccionista Pirata */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    {t('profilePirateTitle')}
                  </label>
                  <select
                    value={pirateTitle}
                    onChange={(e) => setPirateTitle(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition focus:outline-none cursor-pointer ${
                      isDark 
                        ? 'bg-neutral-900 border-neutral-700/80 focus:border-amber-500 text-white' 
                        : 'bg-white border-neutral-300 focus:border-amber-500 text-neutral-900'
                    }`}
                  >
                    <option value="Novato del East Blue">{t('profilePirateRankNovice')}</option>
                    <option value="Peor Generación">{t('profilePirateRankWorstGen')}</option>
                    <option value="Guerrero del Mar">{t('profilePirateRankWarlord')}</option>
                    <option value="Comandante de Yonko">{t('profilePirateRankYonkoCommander')}</option>
                    <option value="Rey de los Piratas">{t('profilePirateRankPirateKing')}</option>
                  </select>
                </div>

                {/* Biografía / Frase Pirata */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold">
                    {t('profileBioTitle')}
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    maxLength={160}
                    rows={2}
                    placeholder={t('profileBioPlaceholder')}
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs transition focus:outline-none resize-none ${
                      isDark 
                        ? 'bg-neutral-900 border-neutral-700/80 focus:border-amber-500 text-white' 
                        : 'bg-white border-neutral-300 focus:border-amber-500 text-neutral-900'
                    }`}
                  />
                </div>
              </div>

              {/* SECCIÓN 4: SEGURIDAD & CORREO VINCULADO */}
              <div className={`p-4 sm:p-5 rounded-2xl border space-y-3.5 ${
                isDark ? 'bg-neutral-950/40 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-500" />
                  {t('profileEmailSecurityTitle')}
                </h3>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-neutral-400" />
                    <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                      {user?.email}
                    </span>
                  </div>

                  {user?.app_metadata?.provider === 'google' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      {t('profileGoogleBadge')}
                    </span>
                  )}
                </div>

                {/* Cambio de Contraseña Toggle */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowPasswordSection(!showPasswordSection)}
                    className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1.5 cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    {t('profileChangePasswordBtn')}
                  </button>

                  {showPasswordSection && (
                    <div className="mt-3 p-3 rounded-xl border border-neutral-800 space-y-2.5 animate-fade-in">
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder={t('profileNewPasswordPlaceholder')}
                        className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none ${
                          isDark 
                            ? 'bg-neutral-900 border-neutral-700/80 text-white focus:border-amber-500' 
                            : 'bg-white border-neutral-300 text-neutral-900 focus:border-amber-500'
                        }`}
                      />
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={handleUpdatePassword}
                          disabled={passwordLoading || !newPassword}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-neutral-950 hover:bg-amber-400 disabled:opacity-50 cursor-pointer"
                        >
                          {passwordLoading ? 'Actualizando...' : 'Guardar Nueva Contraseña'}
                        </button>
                        {passwordFeedback && (
                          <span className={`text-[11px] font-medium ${
                            passwordFeedback.type === 'success' ? 'text-emerald-400' : 'text-rose-400'
                          }`}>
                            {passwordFeedback.message}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SECCIÓN 5: SUSCRIPCIÓN A NOVEDADES (NEWSLETTER CHECKBOX) */}
              <div className={`p-4 rounded-2xl border transition ${
                isDark ? 'bg-neutral-950/40 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={newsletterOptIn}
                    onChange={(e) => setNewsletterOptIn(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-neutral-700 text-amber-500 focus:ring-amber-500 accent-amber-500 shrink-0 cursor-pointer"
                  />
                  <div className="space-y-0.5 text-xs">
                    <strong className={`font-bold block ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      {t('profileNewsletterTitle')}
                    </strong>
                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      {t('profileNewsletterCheckbox')}
                    </p>
                  </div>
                </label>
              </div>

              {/* Status & Error Feedback */}
              {submitFeedback && submitFeedback.type === 'error' && (
                <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                  isDark ? 'bg-rose-950/30 border-rose-800/50 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}>
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{submitFeedback.message}</span>
                </div>
              )}

              {/* Casilla Verde de Guardado con Éxito */}
              {isSavedSuccess && (
                <div className={`p-4 rounded-2xl border flex items-start gap-3 transition-all animate-fade-in ${
                  isDark 
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' 
                    : 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm'
                }`}>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-emerald-500 dark:text-emerald-400">
                      {t('profileSavedNoticeTitle')}
                    </h4>
                    <p className={`text-[11px] ${isDark ? 'text-emerald-300/80' : 'text-emerald-800'}`}>
                      {t('profileSavedNoticeSubtitle')}
                    </p>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className={`flex items-center justify-end gap-3 p-4 border-t ${
          isDark ? 'border-neutral-800 bg-neutral-950/60' : 'border-neutral-200 bg-neutral-50/80'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              isDark 
                ? 'border-neutral-800 hover:bg-neutral-800 text-neutral-300' 
                : 'border-neutral-300 hover:bg-neutral-200 text-neutral-700'
            }`}
          >
            {t('profileCloseBtn')}
          </button>

          <button
            type="submit"
            form="profile-form"
            disabled={isSaving || (username !== initialUsername && usernameStatus === 'taken') || (username !== initialUsername && usernameStatus === 'invalid')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-md disabled:opacity-50 cursor-pointer ${
              isSavedSuccess
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30 ring-2 ring-emerald-400/40'
                : 'bg-amber-500 text-neutral-950 hover:bg-amber-400 shadow-amber-500/20'
            }`}
          >
            {isSavedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>{t('profileSavedSuccessBtn')}</span>
              </>
            ) : isSaving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                <span>{t('profileSaving')}</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>{t('profileSaveBtn')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
