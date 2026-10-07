import React from 'react';
import { Compass, ExternalLink, GitBranch, Heart } from 'lucide-react';

export default function Footer({ onOpenVersionModal }) {
  return (
    <footer className="mt-20 border-t border-neutral-800 bg-neutral-950/60 backdrop-blur-md py-10 px-4 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & SemVer note */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-white tracking-wide">GRAND LINE VAULT</span>
          </div>
          <span className="hidden sm:inline text-neutral-600">•</span>
          <div className="flex items-center gap-2">
            <span>Versión</span>
            <button
              onClick={onOpenVersionModal}
              className="font-mono text-amber-400 hover:text-amber-300 font-bold bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800 hover:border-amber-500/50 transition cursor-pointer"
            >
              v0.2.0 (Minor)
            </button>
            <span className="text-[11px] text-neutral-500">SemVer WoW Standard</span>
          </div>
        </div>

        {/* Center / Disclaimer */}
        <div className="text-center text-[11px] text-neutral-500 max-w-md">
          One Piece Card Game es propiedad de Eiichiro Oda / Shueisha, Toei Animation y Bandai. Web comunitaria sin ánimo de lucro para coleccionistas.
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.cardtrader.com/es/games/one-piece-card-game"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition"
          >
            <span>CardTrader</span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </a>
          <button
            onClick={onOpenVersionModal}
            className="flex items-center gap-1 hover:text-amber-400 transition"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Changelog</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
