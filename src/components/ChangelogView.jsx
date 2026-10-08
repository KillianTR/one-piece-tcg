import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  GitCommit, 
  CheckCircle2, 
  Layers, 
  Filter, 
  Image as ImageIcon, 
  BookOpen, 
  ShieldCheck, 
  Sparkle,
  Calendar,
  Tag
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const GITHUB_CHANGELOG_URL = 'https://github.com/KillianTR/one-piece-tcg/blob/main/CHANGELOG.md';

const CHANGELOG_DATA = [
  {
    version: 'v0.6.3',
    date: '08/10/2026',
    dateFormatted: {
      es: '8 de octubre de 2026',
      en: 'October 8, 2026'
    },
    isLatest: true,
    tagType: 'minor',
    tagLabel: {
      es: 'Función & Mejoras',
      en: 'Feature & Polish'
    },
    title: {
      es: 'Subpágina de Novedades estilo OPlayTCG, Ilustraciones Oficiales de Cartas DON!! y Nuevos Logos One Piece',
      en: 'Dedicated OPlayTCG-Style Changelog Subpage, Official DON!! Card Scans & Authentic One Piece Logos'
    },
    summary: {
      es: 'Implementada una subpágina completa de historial de versiones inspirada en oplaytcg.com/es/changelog, corregidas todas las cartas DON!! con sus ilustraciones auténticas oficiales y renovada la identidad gráfica con estética One Piece.',
      en: 'Introduced an in-depth release history page inspired by oplaytcg.com/es/changelog, verified all 19 illustrated DON!! cards with authentic manga art, and revamped visual branding in authentic One Piece style.'
    },
    sections: [
      {
        category: { es: 'Novedades & Página de Versiones', en: 'New Feature & Release Page' },
        icon: '📜',
        items: {
          es: [
            'Subpágina dedicada de Changelog (/changelog): Historial interactivo con timeline vertical, filtros por tipo de versión y diseño náutico inmersivo inspirado en OPlayTCG.',
            'Navegación fluida: Accesible directamente desde el footer y la barra de navegación con botón de retorno al archivador.',
            'Enlace directo a GitHub: Botón integrado para consultar el historial completo de commits y releases en el repositorio oficial.'
          ],
          en: [
            'Dedicated Changelog subpage (/changelog): Interactive vertical timeline with version filters and immersive pirate aesthetic inspired by OPlayTCG.',
            'Seamless navigation: Directly accessible from footer and navbar with quick one-click return to the virtual binder.',
            'Direct GitHub repository link: Instant button to inspect raw release notes and commits in the open-source repo.'
          ]
        }
      },
      {
        category: { es: 'Cartas DON!! & Catálogo Oficial', en: 'DON!! Cards & Official Catalog' },
        icon: '🃏',
        items: {
          es: [
            'Corrección de DON-005: Asignada la ilustración oficial correcta del DON!! clásico estándar de Bandai en lugar del nombre erróneo anterior.',
            '19 Cartas DON!! auténticas verificadas: Ampliación de la colección con todas las ilustraciones oficiales de Bandai (Luffy "King of the Pirates", Shanks en Marineford, Vivi en Alabasta, Crocodile, Corazon "I Love You", Red Roc Luffy vs Kaido, Zoro & Sanji Wano, Shichibukai, Los Tres Capitanes, Barbanegra y Barbablanca).',
            '105 Cartas oficiales en total: 100% de cartas comprobadas contra el CDN proxy de TCGPlayer con 0 errores de carga.'
          ],
          en: [
            'DON-005 Image Resolution: Assigned the authentic Bandai base standard DON!! card illustration instead of previous mismatched metadata.',
            '19 Verified Illustrated DON!! Cards: Full collection coverage including Luffy "King of the Pirates", Shanks Marineford, Vivi Alabasta, Crocodile, Corazon "I Love You", Red Roc Luffy vs Kaido, Zoro & Sanji Wano, Warlords Shichibukai, Three Captains Sabaody, and Whitebeard.',
            '105 Total Official Cards: 100% card catalog verified against high-definition TCGPlayer proxy with 0 broken assets.'
          ]
        }
      },
      {
        category: { es: 'Identidad Gráfica & Logos', en: 'Visual Identity & Logos' },
        icon: '🏴‍☠️',
        items: {
          es: [
            'Nuevo Logo Oficial One Piece: Diseño inspirado en carteles de Se Busca (WANTED) y madera noble de taberna pirata con "GRAND LINE VAULT" en la parte superior y el logo oficial "ONE PIECE CARD GAME" debajo.',
            'Eliminación de la imagen og-preview antigua: Retirado el asset anterior y limpiadas las etiquetas Open Graph para garantizar máxima fidelidad gráfica.'
          ],
          en: [
            'New Authentic One Piece Logo: Typography inspired by WANTED posters and pirate tavern woodblock signage, with "GRAND LINE VAULT" on top and the official "ONE PIECE CARD GAME" below.',
            'Removal of old og-preview: Completely cleaned up legacy assets and Open Graph tags for optimal branding.'
          ]
        }
      }
    ]
  },
  {
    version: 'v0.6.2',
    date: '08/10/2026',
    dateFormatted: {
      es: '8 de octubre de 2026',
      en: 'October 8, 2026'
    },
    isLatest: false,
    tagType: 'patch',
    tagLabel: {
      es: 'Parche / Hotfix',
      en: 'Patch / Hotfix'
    },
    title: {
      es: 'Scans CDN de TCGPlayer en Alta Definición, Fix Solapamiento Modal y Logos Oficiales GLV',
      en: 'High-Definition TCGPlayer CDN Scans, Modal Close Button Fix & Official GLV Logos'
    },
    summary: {
      es: 'Solución al bloqueo de imágenes de Bandai con proxy Cloudflare R2 / TCGPlayer, corrección de espaciado en CardModal y conexión definitiva de donaciones.',
      en: 'Resolved Bandai image CORS blockage with Cloudflare R2 / TCGPlayer proxy, fixed close button collision in CardModal, and connected donation links.'
    },
    sections: [
      {
        category: { es: 'Correcciones de Imágenes & Interfaz', en: 'Image Fixes & UI Polish' },
        icon: '🖼️',
        items: {
          es: [
            'Solución al bloqueo CORP: Servidores de Bandai bloqueaban dominios externos; migrado el 100% de cartas a Cloudflare R2 proxy sincronizado con TCGPlayer.',
            'Fix Botón Cerrar CardModal: Aumentado el ancho a max-w-5xl y añadido margen de seguridad para evitar solapamientos con la etiqueta del set.'
          ],
          en: [
            'Bandai CORP blockage resolved: Switched all card image paths to high-definition Cloudflare R2 proxy synced with TCGPlayer.',
            'CardModal close button overlap fix: Expanded container to max-w-5xl and added right safe padding preventing collisions.'
          ]
        }
      }
    ]
  },
  {
    version: 'v0.6.1',
    date: '07/10/2026',
    dateFormatted: {
      es: '7 de octubre de 2026',
      en: 'October 7, 2026'
    },
    isLatest: false,
    tagType: 'patch',
    tagLabel: {
      es: 'Parche / Hotfix',
      en: 'Patch / Hotfix'
    },
    title: {
      es: 'Buy Me a Coffee (Donaciones), Layout Simétrico ES/EN y Ajuste Legal Disclaimer',
      en: 'Buy Me a Coffee Donations, Symmetric ES/EN Layout & Legal Disclaimer Polish'
    },
    summary: {
      es: 'Añadido botón de donaciones voluntarias en el footer, corrección del salto de línea vertical en controles del álbum y blindaje legal fan-made.',
      en: 'Added voluntary donation button in footer, fixed bilingual pagination wrap in VirtualBinder toolbar, and polished non-commercial legal disclaimer.'
    },
    sections: [
      {
        category: { es: 'Comunidad & Diseño', en: 'Community & Layout' },
        icon: '☕',
        items: {
          es: [
            'Botón Buy Me a Coffee: Integrado con icono oficial de taza de café y color dorado oficial #FFDD00 enlazado a buymeacoffee.com/grandlinevault.',
            'Paginación Simétrica: Aplicado flex-nowrap y ancho mínimo consistente para evitar que la barra del álbum salte a dos líneas en español.',
            'Disclaimer Legal: Clarificado el carácter fan-made no comercial apoyado voluntariamente por la comunidad.'
          ],
          en: [
            'Buy Me a Coffee button: Official coffee cup icon and #FFDD00 gold branding linking to buymeacoffee.com/grandlinevault.',
            'Symmetric Pagination Toolbar: Applied flex-nowrap and minimum width preventing two-line wrapping in Spanish.',
            'Legal Disclaimer Polish: Reinforced non-commercial fan-made project status supported by voluntary server donations.'
          ]
        }
      }
    ]
  },
  {
    version: 'v0.6.0',
    date: '07/10/2026',
    dateFormatted: {
      es: '7 de octubre de 2026',
      en: 'October 7, 2026'
    },
    isLatest: false,
    tagType: 'minor',
    tagLabel: {
      es: 'Actualización / Contenido',
      en: 'Content Update'
    },
    title: {
      es: 'Ingestión Masiva de Cartas Oficiales OP-01 a OP-09 y Barajas ST, Audio Inmersivo y Backups',
      en: 'Massive Official Card Ingestion OP-01 to OP-09, Audio & Backup Suite'
    },
    summary: {
      es: 'Gran ampliación del catálogo con cartas auténticas de Bandai, efectos de sonido con Web Audio API y exportación a simuladores.',
      en: 'Massive catalog expansion with authentic Bandai cards, interactive sound effects, and deck simulator export options.'
    },
    sections: [
      {
        category: { es: 'Catálogo & Audio', en: 'Catalog & Audio' },
        icon: '📦',
        items: {
          es: [
            'Catálogo masivo con cobertura de sets OP-01 hasta OP-09 y barajas ST-01, ST-02 y ST-10.',
            'Efectos de sonido procedurales con Web Audio API (paso de página, snap de carta y clicks hápticos).',
            'Herramienta de Copias de Seguridad: Exportación e importación en formato JSON y texto compatible con OPTCG Sim.',
            'Modal de Estadísticas del Coleccionista y valoración estimada de la colección en € según precios de CardTrader.'
          ],
          en: [
            'Massive catalog covering sets OP-01 through OP-09 and Starter Decks ST-01, ST-02, and ST-10.',
            'Procedural Web Audio API sound effects for page turns, card snaps, and tactile feedback.',
            'Backup & Export Suite: Full collection JSON download and OPTCG Sim text format export.',
            'Collector Statistics Modal with real-time € valuation based on CardTrader market references.'
          ]
        }
      }
    ]
  },
  {
    version: 'v0.5.0',
    date: '06/10/2026',
    dateFormatted: {
      es: '6 de octubre de 2026',
      en: 'October 6, 2026'
    },
    isLatest: false,
    tagType: 'minor',
    tagLabel: {
      es: 'Actualización / Contenido',
      en: 'Content Update'
    },
    title: {
      es: 'Carpetas Personalizadas en el Archivador (Álbum Libre) & Drag and Drop',
      en: 'Custom Binder Folders (Free-form Binder) & Drag and Drop'
    },
    summary: {
      es: 'Permite crear carpetas temáticas ilimitadas (Yonkos, Marines, DONs) y reordenar cartas libremente en bolsillos específicos.',
      en: 'Allows creating unlimited custom themed folders (Yonkos, Marines, DONs) and freely arranging cards across binder pockets.'
    },
    sections: [
      {
        category: { es: 'Archivador Virtual', en: 'Virtual Binder' },
        icon: '📂',
        items: {
          es: [
            'Mis Carpetas: Crea, renombra y gestiona tantas carpetas como desees con páginas ilimitadas.',
            'Drag & drop interactivo para colocar cartas en el bolsillo exacto que prefieras.',
            'Persistencia automática en la nube mediante Supabase profiles.'
          ],
          en: [
            'My Custom Folders: Create, rename, and manage unlimited folders with dynamic pages.',
            'Interactive drag and drop to place cards in any specific pocket.',
            'Automatic cloud synchronization powered by Supabase profiles.'
          ]
        }
      }
    ]
  },
  {
    version: 'v0.4.0',
    date: '05/10/2026',
    dateFormatted: {
      es: '5 de octubre de 2026',
      en: 'October 5, 2026'
    },
    isLatest: false,
    tagType: 'minor',
    tagLabel: {
      es: 'Actualización / Contenido',
      en: 'Content Update'
    },
    title: {
      es: 'Perfil de Usuario, Personalización de Avatar & Cuentas de Desarrollador',
      en: 'User Profile, Avatar Customization & Developer Accounts'
    },
    summary: {
      es: 'Sistema de perfil con avatar cuadrado 300x300 px, selector de rango pirata y whitelist para testing.',
      en: 'User profile suite with 300x300 px avatar cropping, pirate ranks, and developer testing bypass.'
    },
    sections: [
      {
        category: { es: 'Perfil & Seguridad', en: 'Profile & Security' },
        icon: '👤',
        items: {
          es: [
            'Subida de fotos de avatar recortadas automáticamente con Canvas a 300x300 px.',
            'Nombres de usuario únicos con cooldown de 30 días.',
            'Whitelist de cuentas de administrador/desarrollador para pruebas ilimitadas.'
          ],
          en: [
            'Avatar photo upload with automatic 300x300 px canvas cropping and WebP compression.',
            'Unique usernames with 30-day cooldown enforcement.',
            'Developer and admin whitelist with testing cooldown bypass.'
          ]
        }
      }
    ]
  }
];

export default function ChangelogView({ onBack }) {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const [filterType, setFilterType] = useState('all'); // 'all' | 'minor' | 'patch'

  const currentLang = language === 'en' ? 'en' : 'es';

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredReleases = CHANGELOG_DATA.filter((rel) => {
    if (filterType === 'all') return true;
    return rel.tagType === filterType;
  });

  return (
    <div className="min-h-screen pb-20 animate-fadeIn">
      {/* ========================================================= */}
      {/* 1. HERO HEADER (Inspirado en OPlayTCG Changelog)          */}
      {/* ========================================================= */}
      <header className={`relative border-b overflow-hidden transition-colors ${
        isDark 
          ? 'bg-gradient-to-b from-neutral-950 via-[#0d1017] to-[#090a0f] border-neutral-800' 
          : 'bg-gradient-to-b from-amber-50/60 via-white to-neutral-50 border-neutral-200'
      }`}>
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-10">
          {/* Top navigation row */}
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={onBack}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer group ${
                isDark 
                  ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:border-amber-500/50 hover:bg-neutral-800' 
                  : 'bg-white border-neutral-300 text-neutral-700 hover:text-neutral-950 hover:border-amber-400 hover:bg-amber-50/50 shadow-xs'
              }`}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-500" />
              <span>{currentLang === 'es' ? 'Volver al Álbum' : 'Back to Binder'}</span>
            </button>

            <a
              href={GITHUB_CHANGELOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition group ${
                isDark 
                  ? 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700' 
                  : 'bg-white border-neutral-300 text-neutral-700 hover:text-neutral-950 hover:border-neutral-400 shadow-xs'
              }`}
            >
              <GitCommit className="w-3.5 h-3.5 text-amber-500" />
              <span>{currentLang === 'es' ? 'Ver en GitHub (CHANGELOG.md)' : 'View on GitHub (CHANGELOG.md)'}</span>
              <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-amber-500 transition" />
            </a>
          </div>

          {/* Brand Emblem & Titles */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <img 
                  src="/glv-logo-square.jpg" 
                  alt="Grand Line Vault" 
                  className="w-7 h-7 rounded-lg object-cover shadow-sm"
                  onError={(e) => { e.currentTarget.src = '/one-piece-logo-white.webp'; }}
                />
                <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500">
                  GRAND LINE VAULT • LOG
                </span>
              </div>
              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-sans ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}>
                {currentLang === 'es' ? 'Novedades & Versiones' : 'Changelog & Updates'}
              </h1>
              <p className={`mt-2.5 max-w-2xl text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                {currentLang === 'es' 
                  ? 'Historial de versiones, parches de cartas oficiales, mejoras continuas del archivador digital y nuevas funcionalidades de Grand Line Vault.'
                  : 'Full release history, card database updates, continuous binder enhancements, and new features in Grand Line Vault.'}
              </p>
            </div>

            {/* Live Status Pill */}
            <div className={`shrink-0 p-3.5 rounded-2xl border flex items-center gap-3 ${
              isDark ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div className="text-left">
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  {currentLang === 'es' ? 'Versión en Producción' : 'Live Production Version'}
                </span>
                <span className="font-mono text-base font-extrabold text-amber-500">
                  v0.6.3
                </span>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2 pt-6 border-t border-neutral-800/60">
            <span className="text-xs font-semibold text-neutral-400 mr-1 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-amber-500" />
              {currentLang === 'es' ? 'Filtrar por:' : 'Filter by:'}
            </span>
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                filterType === 'all'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : isDark ? 'bg-neutral-900 text-neutral-400 hover:text-white' : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {currentLang === 'es' ? 'Todas las Versiones' : 'All Releases'} ({CHANGELOG_DATA.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('minor')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                filterType === 'minor'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : isDark ? 'bg-neutral-900 text-neutral-400 hover:text-white' : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {currentLang === 'es' ? 'Actualizaciones / Features' : 'Features & Updates'}
            </button>
            <button
              type="button"
              onClick={() => setFilterType('patch')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                filterType === 'patch'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isDark ? 'bg-neutral-900 text-neutral-400 hover:text-white' : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {currentLang === 'es' ? 'Parches / Hotfixes' : 'Patches / Hotfixes'}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. TIMELINE CONTENT (Estilo OPlayTCG)                     */}
      {/* ========================================================= */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-12">
        <div className="relative border-l-2 border-neutral-800/80 dark:border-neutral-800 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-12">
          {filteredReleases.map((rel) => {
            const isPatch = rel.tagType === 'patch';

            return (
              <article key={rel.version} className="relative group">
                {/* Node on the timeline */}
                {rel.isLatest ? (
                  <div className="absolute -left-[1.95rem] sm:-left-[2.95rem] top-1.5 w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-neutral-950 shadow-md shadow-emerald-500/50 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  </div>
                ) : (
                  <div className="absolute -left-[1.85rem] sm:-left-[2.85rem] top-2 w-3.5 h-3.5 rounded-full bg-neutral-600 ring-4 ring-neutral-950 group-hover:bg-amber-500 transition-colors" />
                )}

                {/* Release Card */}
                <div className={`rounded-3xl border p-6 sm:p-8 transition-all duration-200 ${
                  rel.isLatest
                    ? isDark 
                      ? 'bg-neutral-950/90 border-amber-500/40 shadow-xl shadow-amber-500/5 ring-1 ring-amber-500/20' 
                      : 'bg-white border-amber-300 shadow-md ring-1 ring-amber-400/30'
                    : isDark 
                      ? 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 shadow-sm' 
                      : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-xs'
                }`}>
                  {/* Top Bar: Version tag, date, badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-800/60">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-2xl sm:text-3xl font-black text-amber-500 tracking-tight">
                        {rel.version}
                      </span>
                      <span className={`text-[11px] uppercase font-bold px-2.5 py-0.5 rounded-lg border ${
                        isPatch
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      }`}>
                        {rel.tagLabel[currentLang]}
                      </span>
                      {rel.isLatest && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {currentLang === 'es' ? 'Versión Actual' : 'Latest Release'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{rel.dateFormatted[currentLang]}</span>
                    </div>
                  </div>

                  {/* Main Title & Summary */}
                  <div className="mt-4 mb-6">
                    <h2 className={`text-lg sm:text-xl font-bold tracking-tight ${
                      isDark ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {rel.title[currentLang]}
                    </h2>
                    <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                      isDark ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                      {rel.summary[currentLang]}
                    </p>
                  </div>

                  {/* Sections Breakdown (OPlayTCG style) */}
                  <div className="space-y-6 pt-2">
                    {rel.sections.map((section, sIdx) => (
                      <div key={sIdx} className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-500/90 dark:text-amber-400">
                          <span className="text-sm select-none">{section.icon}</span>
                          <h3>{section.category[currentLang]}</h3>
                        </div>

                        <ul className="space-y-2.5 pl-1">
                          {section.items[currentLang].map((item, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                              <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className={`mt-16 p-6 rounded-3xl border text-center flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDark ? 'bg-neutral-950/80 border-neutral-800 text-neutral-300' : 'bg-amber-50/40 border-neutral-200 text-neutral-700'
        }`}>
          <div className="flex items-center gap-3 text-left">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {currentLang === 'es' ? '¿Tienes alguna sugerencia o encontraste un fallo?' : 'Got a suggestion or spotted a bug?'}
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                {currentLang === 'es' ? 'Grand Line Vault evoluciona gracias al feedback activo de la comunidad.' : 'Grand Line Vault evolves with continuous community feedback.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition cursor-pointer shadow-sm hover:shadow-md shrink-0"
          >
            {currentLang === 'es' ? 'Volver al Archivador' : 'Return to Binder'}
          </button>
        </div>
      </main>
    </div>
  );
}
