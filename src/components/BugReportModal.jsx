import React, { useState, useMemo } from 'react';
import { 
  Bug, 
  X, 
  Mail, 
  ExternalLink, 
  Copy, 
  Check, 
  Send, 
  Laptop, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../lib/supabase';

const SUPPORT_EMAIL = 'killiantorrell@gmail.com';
const APP_VERSION = 'v0.6.4';

const CATEGORIES = [
  { id: 'card', labelKey: 'bugCategoryCard', icon: '🃏' },
  { id: 'visual', labelKey: 'bugCategoryVisual', icon: '🖼️' },
  { id: 'binder', labelKey: 'bugCategoryBinder', icon: '📖' },
  { id: 'account', labelKey: 'bugCategoryAccount', icon: '🔐' },
  { id: 'other', labelKey: 'bugCategoryOther', icon: '💡' },
];

export default function BugReportModal({ isOpen, onClose }) {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();

  const [category, setCategory] = useState('card');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTechDetails, setShowTechDetails] = useState(false);

  // System telemetry collected automatically
  const techInfo = useMemo(() => {
    return {
      version: APP_VERSION,
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      screen: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '',
      language: language || 'es',
      timestamp: new Date().toLocaleString()
    };
  }, [language, isOpen]);

  if (!isOpen) return null;

  // Generate structured report body
  const generateReportText = () => {
    const selectedCategoryObj = CATEGORIES.find(c => c.id === category);
    const categoryName = selectedCategoryObj ? t(selectedCategoryObj.labelKey) : category;

    return `=== REPORTE DE ERROR — GRAND LINE VAULT ===
Categoría: ${categoryName}
Título: ${title || '(Sin título especificado)'}
Email de contacto: ${email || 'No proporcionado (Anónimo)'}

DESCRIPCIÓN DEL PROBLEMA:
${description || '(Sin descripción detallada)'}

--- INFORMACIÓN TÉCNICA DEL SISTEMA ---
Versión: ${techInfo.version}
Pestaña / URL: ${techInfo.url}
Navegador: ${techInfo.userAgent}
Resolución: ${techInfo.screen}
Idioma: ${techInfo.language}
Fecha y hora: ${techInfo.timestamp}
===========================================`;
  };

  const handleCopyReport = async () => {
    try {
      await navigator.clipboard.writeText(generateReportText());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      // Fallback
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const saveToSupabaseIfPossible = async () => {
    try {
      if (supabase) {
        await supabase.from('bug_reports').insert([{
          category,
          title,
          description,
          reporter_email: email || null,
          system_info: techInfo,
          status: 'pending'
        }]);
      }
    } catch {
      // Non-blocking if table not migrated yet
    }
  };

  const handleSendViaEmailClient = () => {
    if (!description.trim()) return;
    saveToSupabaseIfPossible();

    const subject = encodeURIComponent(`[Bug Report ${APP_VERSION}] ${title || 'Error en Grand Line Vault'}`);
    const body = encodeURIComponent(generateReportText());
    const mailtoUrl = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;
    setIsSubmitted(true);
  };

  const handleOpenGmailWeb = () => {
    if (!description.trim()) return;
    saveToSupabaseIfPossible();

    const subject = encodeURIComponent(`[Bug Report ${APP_VERSION}] ${title || 'Error en Grand Line Vault'}`);
    const body = encodeURIComponent(generateReportText());
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${SUPPORT_EMAIL}&su=${subject}&body=${body}`;

    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setTitle('');
    setDescription('');
    setEmail('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={handleResetAndClose}
    >
      <div 
        className={`relative w-full max-w-2xl border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ${
          isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-400 z-10" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 pb-4 border-b border-neutral-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-xs">
              <Bug className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {t('bugReportModalTitle')}
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                {t('bugReportModalSubtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            aria-label="Cerrar modal"
            className={`p-2 rounded-xl transition cursor-pointer ${
              isDark ? 'text-neutral-400 hover:text-white hover:bg-neutral-800' : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
          {isSubmitted ? (
            /* Success confirmation screen */
            <div className="py-8 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {t('bugSuccessTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                {t('bugSuccessDesc')}
              </p>

              <div className={`p-4 rounded-xl border max-w-md mx-auto text-left text-xs ${
                isDark ? 'bg-neutral-950/80 border-neutral-800 text-neutral-300' : 'bg-neutral-50 border-neutral-200 text-neutral-700'
              }`}>
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-neutral-800/60 font-semibold">
                  <span>Destinatario:</span>
                  <span className="font-mono text-amber-500">{SUPPORT_EMAIL}</span>
                </div>
                <div className="space-y-1 text-neutral-400">
                  <p><strong className="text-neutral-200">Asunto:</strong> [Bug Report {APP_VERSION}] {title || 'Error en GLV'}</p>
                  <p><strong className="text-neutral-200">Categoría:</strong> {CATEGORIES.find(c => c.id === category)?.icon} {CATEGORIES.find(c => c.id === category)?.id}</p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleCopyReport}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                    isCopied 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                      : isDark ? 'bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-white' : 'bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-800 shadow-xs'
                  }`}
                >
                  {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{isCopied ? t('bugCopiedSuccess') : t('bugCopyReportBtn')}</span>
                </button>
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm transition cursor-pointer shadow-md"
                >
                  {t('bugCloseBtn')}
                </button>
              </div>
            </div>
          ) : (
            /* Form view */
            <>
              {/* Category Pills */}
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  {t('bugCategoryLabel')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map((cat) => {
                    const isSelected = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow-xs'
                            : isDark 
                              ? 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white' 
                              : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-neutral-950'
                        }`}
                      >
                        <span className="text-sm">{cat.icon}</span>
                        <span className="truncate">{t(cat.labelKey)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                  {t('bugTitleLabel')} <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('bugTitlePlaceholder')}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition outline-none ${
                    isDark 
                      ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50' 
                      : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 shadow-2xs'
                  }`}
                />
              </div>

              {/* Description Textarea */}
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                  {t('bugDescLabel')} <span className="text-amber-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('bugDescPlaceholder')}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition outline-none resize-y min-h-[90px] ${
                    isDark 
                      ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50' 
                      : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 shadow-2xs'
                  }`}
                />
              </div>

              {/* Optional Contact Email */}
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                  {t('bugEmailLabel')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('bugEmailPlaceholder')}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition outline-none ${
                    isDark 
                      ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50' 
                      : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 shadow-2xs'
                  }`}
                />
              </div>

              {/* System Diagnostics Accordion */}
              <div className={`rounded-xl border p-3 text-xs ${
                isDark ? 'bg-neutral-950/60 border-neutral-800/80' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <button
                  type="button"
                  onClick={() => setShowTechDetails(!showTechDetails)}
                  className="w-full flex items-center justify-between text-left font-semibold text-neutral-400 hover:text-neutral-200 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Laptop className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t('bugTechInfoTitle')}</span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-500">
                    {showTechDetails ? 'Ocultar ▲' : 'Ver datos ▼'}
                  </span>
                </button>

                {showTechDetails && (
                  <div className="mt-3 pt-3 border-t border-neutral-800/60 space-y-1.5 font-mono text-[11px] text-neutral-400">
                    <p><span className="text-neutral-300">Versión:</span> {techInfo.version}</p>
                    <p className="truncate"><span className="text-neutral-300">Navegador:</span> {techInfo.userAgent}</p>
                    <p><span className="text-neutral-300">Pantalla:</span> {techInfo.screen}</p>
                    <p className="truncate"><span className="text-neutral-300">Ruta:</span> {techInfo.url}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Modal Footer / Actions */}
        {!isSubmitted && (
          <div className={`p-4 sm:p-5 border-t flex flex-wrap items-center justify-between gap-3 shrink-0 ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
          }`}>
            <button
              type="button"
              onClick={handleCopyReport}
              disabled={!description.trim()}
              className={`px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                isCopied 
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                  : isDark 
                    ? 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white' 
                    : 'bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-700 shadow-2xs'
              }`}
            >
              {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
              <span>{isCopied ? t('bugCopiedSuccess') : t('bugCopyReportBtn')}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenGmailWeb}
                disabled={!description.trim()}
                title="Abrir ventana de redacción en Gmail Web"
                className={`px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDark 
                    ? 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white' 
                    : 'bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-700 shadow-2xs'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">{t('bugSendGmailBtn')}</span>
                <span className="sm:hidden">Gmail</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </button>

              <button
                type="button"
                onClick={handleSendViaEmailClient}
                disabled={!description.trim()}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t('bugSendEmailBtn')}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
