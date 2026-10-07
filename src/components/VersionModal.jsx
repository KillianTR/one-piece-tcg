import React from 'react';
import { X, ShieldAlert, Sparkles, Wrench, GitBranch, BookOpen } from 'lucide-react';

export default function VersionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-neutral-200 overflow-hidden">
        {/* Header glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600" />

        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                Sistema de Versiones — SemVer (Estilo WoW)
              </h2>
              <p className="text-xs text-neutral-400">
                Estructura de releases y evolución del proyecto
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Version Badge */}
        <div className="my-5 p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-semibold text-neutral-500">Versión actual en despliegue</span>
            <div className="text-2xl font-mono font-extrabold text-amber-400">
              v0.2.0 <span className="text-xs font-normal text-neutral-400 ml-2">(Minor: Supabase Auth & Cloud Database)</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Activa
          </div>
        </div>

        {/* SemVer Explanation (Blizzard / WoW Style) */}
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            ¿Cómo se interpretan las 3 cifras <code className="text-amber-300">X . Y . Z</code>?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* MAJOR */}
            <div className="p-4 rounded-xl bg-neutral-950/60 border border-rose-500/20 hover:border-rose-500/40 transition">
              <div className="flex items-center gap-2 text-rose-400 font-bold mb-1">
                <span className="text-lg font-mono">2 . 0 . 0</span>
              </div>
              <h4 className="text-sm font-semibold text-white">MAJOR (Expansión)</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Cambio global mayor (como las expansiones de Blizzard en <i>World of Warcraft</i>). Migraciones de base de datos, arquitectura nueva o rediseño total.
              </p>
            </div>

            {/* MINOR */}
            <div className="p-4 rounded-xl bg-neutral-950/60 border border-amber-500/20 hover:border-amber-500/40 transition">
              <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                <span className="text-lg font-mono">0 . 1 . 0</span>
              </div>
              <h4 className="text-sm font-semibold text-white">MINOR (Feature)</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Nueva funcionalidad o módulo completo (ej. Álbum Virtual, Tablón de Intercambios, Filtros avanzados) sin romper compatibilidad.
              </p>
            </div>

            {/* PATCH / HOTFIX */}
            <div className="p-4 rounded-xl bg-neutral-950/60 border border-emerald-500/20 hover:border-emerald-500/40 transition">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <span className="text-lg font-mono">0 . 0 . 1</span>
              </div>
              <h4 className="text-sm font-semibold text-white">PATCH (Hotfix)</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Reparación de fallos en el código, ajustes visuales, parches de seguridad o pequeñas mejoras de rendimiento.
              </p>
            </div>
          </div>
        </div>

        {/* Git Workflow Tips */}
        <div className="p-3.5 rounded-xl bg-neutral-950/90 border border-neutral-800 text-xs text-neutral-300 flex items-start gap-3">
          <GitBranch className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Flujo por Ramas de Git:</span>
            <p className="mt-0.5 text-neutral-400">
              Cada nueva feature se trabaja en su rama dedicada (ej. <code className="text-neutral-200">feature/virtual-binder</code>) y se fusiona a <code className="text-neutral-200">main</code> etiquetando la nueva versión con su correspondiente entrada en el <code className="text-neutral-200">CHANGELOG.md</code>.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-sm transition"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
