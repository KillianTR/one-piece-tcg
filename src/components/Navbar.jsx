import React from 'react';
import { 
  BookOpen, 
  Grid, 
  Repeat, 
  Star, 
  Compass, 
  Info,
  User,
  LogOut,
  Cloud,
  HardDrive
} from 'lucide-react';
import { useCollection } from '../context/CollectionContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ activeTab, setActiveTab, onOpenVersionModal, onOpenAuthModal }) {
  const { uniqueCardsOwned, totalWishlisted, isCloudSynced } = useCollection();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/85 backdrop-blur-xl border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('binder')}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center text-amber-400">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5 font-sans">
                GRAND LINE <span className="text-amber-400">VAULT</span>
              </span>
              {/* Clickable Version Badge */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenVersionModal();
                }}
                className="group flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-700/80 hover:border-amber-500 text-[10px] font-mono font-bold text-amber-400 transition"
                title="Ver detalles del sistema de versiones"
              >
                <span>v0.2.0</span>
                <Info className="w-3 h-3 text-neutral-400 group-hover:text-amber-400" />
              </button>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">
              One Piece TCG • Vault X Virtual Binder
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-900/90 p-1.5 rounded-2xl border border-neutral-800">
          <button
            onClick={() => setActiveTab('binder')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'binder'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Álbum Virtual (Vault X)
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'catalog'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Grid className="w-4 h-4" />
            Catálogo & Cartas
          </button>

          <button
            onClick={() => setActiveTab('trades')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'trades'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Repeat className="w-4 h-4" />
            Intercambios P2P
          </button>
        </nav>

        {/* Right Action Bar: Quick Stats & Auth */}
        <div className="flex items-center gap-2.5">
          {/* Quick Stats Pill */}
          <div className="hidden sm:flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-2xl text-xs">
            <div className="flex items-center gap-1.5" title="Cartas únicas conseguidas">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-neutral-400 text-[11px]">Colección:</span>
              <strong className="text-white font-mono">{uniqueCardsOwned}</strong>
            </div>

            <div className="w-px h-3.5 bg-neutral-800" />

            <div className="flex items-center gap-1.5" title="Cartas en Wishlist">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-neutral-400 text-[11px]">Wishlist:</span>
              <strong className="text-amber-400 font-mono">{totalWishlisted}</strong>
            </div>
          </div>

          {/* User Auth Button */}
          {user ? (
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 p-1.5 rounded-2xl">
              <div className="flex items-center gap-1.5 px-2 text-xs">
                <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-neutral-300 font-medium max-w-[120px] truncate" title={user.email}>
                  {user.email?.split('@')[0]}
                </span>
              </div>
              <button
                onClick={() => signOut()}
                className="p-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-rose-400 rounded-xl transition"
                title="Cerrar Sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/70 text-xs font-bold text-amber-400 hover:text-amber-300 transition shadow-sm"
            >
              <User className="w-3.5 h-3.5" />
              <span>Entrar / Registro</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around p-2 bg-neutral-900 border-t border-neutral-800 text-xs">
        <button
          onClick={() => setActiveTab('binder')}
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-bold ${
            activeTab === 'binder' ? 'text-amber-400 bg-neutral-950' : 'text-neutral-400'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Álbum
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-bold ${
            activeTab === 'catalog' ? 'text-amber-400 bg-neutral-950' : 'text-neutral-400'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          Catálogo
        </button>
        <button
          onClick={() => setActiveTab('trades')}
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-bold ${
            activeTab === 'trades' ? 'text-amber-400 bg-neutral-950' : 'text-neutral-400'
          }`}
        >
          <Repeat className="w-3.5 h-3.5" />
          Cambios
        </button>
        {!user && (
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20"
          >
            <User className="w-3.5 h-3.5" />
            Login
          </button>
        )}
      </div>
    </header>
  );
}
