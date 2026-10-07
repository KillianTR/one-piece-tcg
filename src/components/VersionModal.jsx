import React from 'react';
import { X, Award, GitBranch } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function VersionModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className={`relative w-full max-w-2xl border rounded-2xl shadow-2xl p-6 overflow-hidden ${
        isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-800'
      }`}>
        {/* Header glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600" />

        <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-xl font-bold tracking-wide ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {t('versionModalTitle')}
              </h2>
              <p className="text-xs text-neutral-400">
                {t('versionModalSubtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition ${
              isDark ? 'text-neutral-400 hover:text-white hover:bg-neutral-800' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Version Badge */}
        <div className={`my-5 p-4 rounded-xl border flex items-center justify-between ${
          isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
        }`}>
          <div>
            <span className="text-xs uppercase font-semibold text-neutral-400">{t('versionCurrentBadge')}</span>
            <div className="text-2xl font-mono font-extrabold text-amber-500">
              v0.6.1 <span className="text-xs font-normal text-neutral-400 ml-2">(Patch: Buy Me a Coffee Donaciones, Layout Simétrico ES/EN & Ajuste Legal Disclaimer)</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {t('versionActiveStatus')}
          </div>
        </div>

        {/* SemVer Explanation (Blizzard / WoW Style) */}
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            {t('versionQuestion')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* MAJOR */}
            <div className={`p-4 rounded-xl border transition ${
              isDark ? 'bg-neutral-950/60 border-rose-500/20' : 'bg-neutral-50 border-rose-300'
            }`}>
              <div className="flex items-center gap-2 text-rose-500 font-bold mb-1">
                <span className="text-lg font-mono">2 . 0 . 0</span>
              </div>
              <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{t('versionMajorTitle')}</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                {t('versionMajorDesc')}
              </p>
            </div>

            {/* MINOR */}
            <div className={`p-4 rounded-xl border transition ${
              isDark ? 'bg-neutral-950/60 border-amber-500/20' : 'bg-neutral-50 border-amber-300'
            }`}>
              <div className="flex items-center gap-2 text-amber-500 font-bold mb-1">
                <span className="text-lg font-mono">0 . 4 . 0</span>
              </div>
              <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{t('versionMinorTitle')}</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                {t('versionMinorDesc')}
              </p>
            </div>

            {/* PATCH / HOTFIX */}
            <div className={`p-4 rounded-xl border transition ${
              isDark ? 'bg-neutral-950/60 border-emerald-500/20' : 'bg-neutral-50 border-emerald-300'
            }`}>
              <div className="flex items-center gap-2 text-emerald-500 font-bold mb-1">
                <span className="text-lg font-mono">0 . 0 . 1</span>
              </div>
              <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{t('versionPatchTitle')}</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                {t('versionPatchDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Git Workflow Tips */}
        <div className={`p-3.5 rounded-xl border text-xs flex items-start gap-3 ${
          isDark ? 'bg-neutral-950/90 border-neutral-800 text-neutral-300' : 'bg-neutral-50 border-neutral-200 text-neutral-700'
        }`}>
          <GitBranch className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{t('versionGitTipTitle')}</span>
            <p className="mt-0.5 text-neutral-400">
              Cada nueva feature se trabaja en su rama dedicada (ej. <code className="text-amber-400">feature/user-profiles-v0.4.0</code>) y se fusiona a main.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm transition cursor-pointer"
          >
            {t('versionUnderstood')}
          </button>
        </div>
      </div>
    </div>
  );
}
