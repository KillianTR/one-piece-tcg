import React, { useEffect } from 'react';
import { X, Sparkles, ExternalLink, GitCommit, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const GITHUB_CHANGELOG_URL = 'https://github.com/KillianTR/one-piece-tcg/blob/main/CHANGELOG.md';

const RELEASES = [
  {
    version: 'v0.6.3',
    date: '08/10/2026',
    isLatest: true,
    tagType: 'minor',
    title: {
      es: 'Subpágina de Novedades OPlayTCG, Ilustraciones Reales de Cartas DON!! y Nuevos Logos One Piece',
      en: 'Dedicated OPlayTCG Changelog Subpage, Real DON!! Card Illustrations & Authentic One Piece Logos'
    },
    changes: {
      es: [
        { icon: '📜', title: 'Subpágina de Novedades', desc: 'Historial completo de versiones interactivo (/changelog) inspirado en oplaytcg.com/es/changelog con timeline y filtros.' },
        { icon: '🃏', title: 'Ilustraciones Reales de DON!!', desc: 'Corregido DON-005 con arte oficial clásico e integradas 19 cartas DON!! ilustradas auténticas (Luffy Rey de los Piratas, Marineford, Alabasta, etc.). 105 cartas en total verificadas al 100%.' },
        { icon: '🏴‍☠️', title: 'Nuevos Logos One Piece', desc: 'Diseño estilo cartel WANTED pirata con "GRAND LINE VAULT" en la cabecera y el logo "ONE PIECE CARD GAME" abajo. Retirada previsualización antigua.' }
      ],
      en: [
        { icon: '📜', title: 'Dedicated Changelog Page', desc: 'Full interactive version history subpage (/changelog) inspired by oplaytcg.com/es/changelog with timeline & filters.' },
        { icon: '🃏', title: 'Real DON!! Illustrations', desc: 'Resolved DON-005 with authentic base art and integrated 19 genuine illustrated DON!! cards (Luffy King of Pirates, Marineford, etc.). 105 total cards 100% verified.' },
        { icon: '🏴‍☠️', title: 'Authentic One Piece Logos', desc: 'WANTED pirate aesthetic with "GRAND LINE VAULT" on top and "ONE PIECE CARD GAME" below. Cleaned up legacy preview assets.' }
      ]
    }
  },
  {
    version: 'v0.6.2',
    date: '08/10/2026',
    isLatest: false,
    tagType: 'patch',
    title: {
      es: 'Scans CDN TCGPlayer en Alta Definición, Fix Botón Cerrar Modal & Logos Oficiales GLV',
      en: 'High-Definition TCGPlayer CDN Scans, Modal Close Button Fix & Official GLV Logos'
    },
    changes: {
      es: [
        { icon: '🖼️', title: 'Scans de Cartas en Alta Definición', desc: 'Solucionado el bloqueo de imágenes (CORP) de Bandai con proxy Cloudflare R2 / TCGPlayer. 100% de cartas y scans nítidos en todas las expansiones, cartas Manga y cartas DON!!.' },
        { icon: '🪟', title: 'Fix Botón de Cierre en Modal', desc: 'Corregido el solapamiento del botón (X) con la etiqueta del set en la ficha detallada de la carta (CardModal).' },
        { icon: '🏴‍☠️', title: 'Identidad Visual Oficial', desc: 'Nuevos logotipos oficiales de Grand Line Vault en versión cuadrada (Navbar/Footer) y banner 16:9 con Open Graph para previsualización al compartir en redes.' },
        { icon: '☕', title: 'Donaciones Comunitarias', desc: 'Conectado el enlace oficial de Buy Me a Coffee (buymeacoffee.com/grandlinevault).' }
      ],
      en: [
        { icon: '🖼️', title: 'High-Def Card Scans', desc: 'Fixed Bandai CORP image blockage with Cloudflare R2 / TCGPlayer proxy. 100% of cards and crisp scans across all expansions, Manga, and DON!! cards.' },
        { icon: '🪟', title: 'Modal Close Button Fix', desc: 'Eliminated overlap between close button (X) and set badge in card details view (CardModal).' },
        { icon: '🏴‍☠️', title: 'Official Visual Branding', desc: 'New official Grand Line Vault logos in square format (Navbar/Footer) and 16:9 banner with Open Graph for social sharing previews.' },
        { icon: '☕', title: 'Community Donations', desc: 'Connected official Buy Me a Coffee link (buymeacoffee.com/grandlinevault).' }
      ]
    }
  },
  {
    version: 'v0.6.1',
    date: '07/10/2026',
    isLatest: false,
    tagType: 'patch',
    title: {
      es: 'Buy Me a Coffee (Donaciones), Layout Simétrico ES/EN & Ajuste Legal Disclaimer',
      en: 'Buy Me a Coffee Donations, Symmetric ES/EN Layout & Legal Disclaimer Polish'
    },
    changes: {
      es: [
        { icon: '☕', title: 'Botón Buy Me a Coffee', desc: 'Añadido botón de donaciones con el color dorado oficial y tooltip de apoyo comunitario en el footer.' },
        { icon: '⚖️', title: 'Layout Simétrico del Álbum', desc: 'Corrección de saltos de línea y desajustes verticales en la barra de controles entre español e inglés.' },
        { icon: '📜', title: 'Ajuste Legal del Disclaimer', desc: 'Clarificación del carácter fan-made no comercial mantenido con apoyo voluntario de la comunidad.' }
      ],
      en: [
        { icon: '☕', title: 'Buy Me a Coffee Button', desc: 'Added donation button with official brand styling and community support tooltip in footer.' },
        { icon: '⚖️', title: 'Symmetric Binder Toolbar', desc: 'Resolved line breaks and vertical misalignment in pagination toolbar across ES/EN languages.' },
        { icon: '📜', title: 'Legal Disclaimer Polish', desc: 'Clarified non-commercial fan-made project status supported by voluntary community contributions.' }
      ]
    }
  },
  {
    version: 'v0.6.0',
    date: '07/10/2026',
    isLatest: false,
    tagType: 'minor',
    title: {
      es: 'Ingestión Masiva de Cartas Oficiales OP-01 a OP-09 y Barajas ST, Audio & Backups',
      en: 'Massive Official Card Ingestion OP-01 to OP-09 & Starter Decks, Audio & Backups'
    },
    changes: {
      es: [
        { icon: '🃏', title: 'Catálogo Masivo Oficial', desc: 'Cerca de 100 cartas auténticas de Bandai cubriendo OP-01 hasta OP-09 y barajas ST-01, ST-02 y ST-10.' },
        { icon: '🔊', title: 'Efectos de Sonido Hápticos', desc: 'Audio háptico inmersivo con Web Audio API (paso de página del archivador y clicks).' },
        { icon: '💾', title: 'Copias de Seguridad & Exportación', desc: 'Descarga e importación en formato JSON y texto compatible con OPTCG Sim.' },
        { icon: '📊', title: 'Estadísticas Financieras', desc: 'Cálculo de valoración monetaria estimada de la colección en € según precios de CardTrader.' }
      ],
      en: [
        { icon: '🃏', title: 'Massive Official Catalog', desc: '~100 authentic Bandai cards covering OP-01 through OP-09 and Starter Decks ST-01, ST-02, and ST-10.' },
        { icon: '🔊', title: 'Haptic Sound Effects', desc: 'Procedural Web Audio API sound effects for page turns and UI interactions.' },
        { icon: '💾', title: 'Backup & Export Suite', desc: 'Full JSON backup and text export compatible with OPTCG Sim.' },
        { icon: '📊', title: 'Financial Valuation', desc: 'Estimated collection market valuation in € powered by CardTrader metrics.' }
      ]
    }
  },
  {
    version: 'v0.5.0',
    date: '06/10/2026',
    isLatest: false,
    tagType: 'minor',
    title: {
      es: 'Carpetas Personalizadas en el Archivador (Álbum Libre) & Drag and Drop',
      en: 'Custom Binder Folders (Free-form Binder) & Drag and Drop'
    },
    changes: {
      es: [
        { icon: '📂', title: 'Mis Carpetas', desc: 'Crea tantas carpetas como quieras con páginas ilimitadas y coloca cualquier carta en el bolsillo exacto que prefieras.' },
        { icon: '🔄', title: 'Drag & Drop', desc: 'Arrastra y reordena cartas entre bolsillos libremente.' },
        { icon: '☁️', title: 'Sincronización Cloud', desc: 'Almacenamiento y sincronización en la nube con Supabase.' }
      ],
      en: [
        { icon: '📂', title: 'My Custom Folders', desc: 'Create unlimited custom folders with dynamic pages and free placement across binder pockets.' },
        { icon: '🔄', title: 'Drag & Drop', desc: 'Freely drag and drop cards across binder pockets.' },
        { icon: '☁️', title: 'Cloud Sync', desc: 'Persistent cloud storage synced with Supabase.' }
      ]
    }
  },
  {
    version: 'v0.4.0',
    date: '05/10/2026',
    isLatest: false,
    tagType: 'minor',
    title: {
      es: 'Perfil de Usuario, Personalización de Avatar & Cuentas de Desarrollador',
      en: 'User Profile, Avatar Customization & Developer Accounts'
    },
    changes: {
      es: [
        { icon: '👤', title: 'Perfil y Avatar', desc: 'Subida de imagen recortada a 300x300 px con compresión optimizada y nombres de usuario únicos.' },
        { icon: '🎖️', title: 'Rango Pirata', desc: 'Insignias de condecoración y rangos coleccionables en el Grand Line.' },
        { icon: '🛡️', title: 'Admin Bypass', desc: 'Whitelist de cuentas desarrollador con bypass del cooldown de 30 días.' }
      ],
      en: [
        { icon: '👤', title: 'Profile & Avatar', desc: '300x300 px cropped image uploads with optimized compression and unique usernames.' },
        { icon: '🎖️', title: 'Pirate Rank', desc: 'Collectible rank badges and Grand Line titles.' },
        { icon: '🛡️', title: 'Admin Bypass', desc: 'Developer whitelist bypassing 30-day username cooldown for test accounts.' }
      ]
    }
  }
];

export default function VersionModal({ isOpen, onClose }) {
  const { language, t } = useLanguage();
  const { isDark } = useTheme();

  // Handle ESC key press to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentLang = language === 'en' ? 'en' : 'es';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-3xl border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-rose-500 to-yellow-400 z-10" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 pb-4 border-b border-neutral-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {t('versionModalTitle')}
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                {t('versionModalSubtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className={`p-2 rounded-xl transition cursor-pointer ${
              isDark ? 'text-neutral-400 hover:text-white hover:bg-neutral-800' : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status & GitHub Action Bar */}
        <div className={`px-5 sm:px-6 py-3 border-b flex flex-wrap items-center justify-between gap-3 shrink-0 ${
          isDark ? 'bg-neutral-950/80 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
        }`}>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-neutral-400">{t('versionCurrentBadge')}:</span>
            <span className="font-mono text-xs font-extrabold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
              v0.6.3
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t('versionActiveStatus')}
            </span>
          </div>

          <a
            href={GITHUB_CHANGELOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition group ${
              isDark 
                ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-800' 
                : 'bg-white border-neutral-300 text-neutral-700 hover:text-neutral-950 hover:border-neutral-400 hover:bg-neutral-50 shadow-xs'
            }`}
          >
            <span>{t('versionViewOnGithub')}</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-500 transition" />
          </a>
        </div>

        {/* Scrollable Changelog List */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
          {RELEASES.map((rel) => {
            const isPatch = rel.tagType === 'patch';
            const tagLabel = isPatch 
              ? (currentLang === 'es' ? 'Parche / Hotfix' : 'Patch / Hotfix')
              : (currentLang === 'es' ? 'Actualización / Feature' : 'Minor / Feature');

            return (
              <div
                key={rel.version}
                className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                  rel.isLatest
                    ? isDark 
                      ? 'bg-neutral-950/90 border-amber-500/30 shadow-lg shadow-amber-500/5' 
                      : 'bg-gradient-to-br from-amber-50/40 via-white to-white border-amber-300 shadow-sm'
                    : isDark 
                      ? 'bg-neutral-950/40 border-neutral-800/80 hover:border-neutral-700' 
                      : 'bg-neutral-50/60 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {/* Release Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-neutral-800/60">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-base sm:text-lg font-black text-amber-500">
                      {rel.version}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      • {rel.date}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${
                      isPatch
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    }`}>
                      {tagLabel}
                    </span>
                  </div>

                  {rel.isLatest && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {t('versionLatestBadge')}
                    </span>
                  )}
                </div>

                {/* Release Title */}
                <h3 className={`text-sm sm:text-base font-bold mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  {rel.title[currentLang]}
                </h3>

                {/* Change items */}
                <div className="space-y-2.5">
                  {rel.changes[currentLang].map((change, idx) => (
                    <div 
                      key={idx} 
                      className={`p-2.5 rounded-xl text-xs flex items-start gap-3 transition ${
                        isDark ? 'bg-neutral-900/60 hover:bg-neutral-900' : 'bg-white hover:bg-neutral-100/70 border border-neutral-100 shadow-2xs'
                      }`}
                    >
                      <span className="text-base shrink-0 select-none mt-0.5">{change.icon}</span>
                      <div className="leading-relaxed">
                        <span className={`font-semibold mr-1.5 ${isDark ? 'text-neutral-200' : 'text-neutral-900'}`}>
                          {change.title}:
                        </span>
                        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
                          {change.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className={`p-4 sm:p-5 border-t flex items-center justify-between gap-3 shrink-0 ${
          isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
        }`}>
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <GitCommit className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Grand Line Vault — SemVer Standard</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm transition cursor-pointer shadow-sm hover:shadow-md"
          >
            {t('versionCloseBtn')}
          </button>
        </div>
      </div>
    </div>
  );
}
