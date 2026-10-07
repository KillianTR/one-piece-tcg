import React from 'react';
import { X, ExternalLink, Plus, Minus, Star, Shield, Zap, Heart, Swords, Sparkles } from 'lucide-react';
import { useCollection } from '../context/CollectionContext';
import { RARITIES, COLORS, CARDTRADER_BASE_URL } from '../data/mockCards';

export default function CardModal() {
  const { selectedCard, setSelectedCard, addCard, removeCard, toggleWishlist, getCardCount, isCardWishlisted } = useCollection();

  if (!selectedCard) return null;

  const count = getCardCount(selectedCard.id);
  const isWishlist = isCardWishlisted(selectedCard.id);
  const rarityObj = RARITIES.find((r) => r.id === selectedCard.rarity) || { name: selectedCard.rarity, badgeColor: 'bg-neutral-800 text-white' };
  const colorObj = COLORS.find((c) => c.id === selectedCard.color || selectedCard.color.includes(c.id)) || { hex: '#eab308' };

  const cardtraderUrl = `${CARDTRADER_BASE_URL}${encodeURIComponent(selectedCard.cardtraderSearch || `${selectedCard.name} ${selectedCard.id}`)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedCard(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-950/70 hover:bg-neutral-800 text-neutral-400 hover:text-white transition border border-neutral-700/50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Card Visual Display */}
        <div className="md:w-5/12 bg-neutral-950 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-neutral-800 relative group">
          {/* Subtle atmospheric backlight glow */}
          <div 
            className="absolute inset-0 opacity-20 blur-3xl pointer-events-none"
            style={{ backgroundColor: colorObj.hex }}
          />

          <div className="relative max-w-[270px] sm:max-w-[310px] w-full transition-transform duration-300 group-hover:scale-105 holo-shine rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={selectedCard.image}
              alt={selectedCard.name}
              className="w-full h-auto object-cover rounded-2xl border border-neutral-800/80"
              onError={(e) => {
                // High-quality fallback placeholder if image network fails
                e.target.onerror = null;
                e.target.src = `https://placehold.co/400x560/1a1a24/ffffff?text=${encodeURIComponent(selectedCard.id + '\n' + selectedCard.name)}`;
              }}
            />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-md font-semibold tracking-wide ${rarityObj.badgeColor}`}>
              {rarityObj.name} ({selectedCard.rarity})
            </span>
            {selectedCard.isAltArt && (
              <span className="text-xs px-2.5 py-1 rounded-md font-bold bg-gradient-to-r from-amber-400 to-rose-500 text-neutral-950 flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3" /> Alternate Art
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Details & Stats & Actions */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header / ID & Set */}
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <span className="font-mono font-bold tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {selectedCard.id}
              </span>
              <span className="text-neutral-400 font-medium">
                Set: <strong className="text-neutral-200">{selectedCard.set}</strong>
              </span>
            </div>

            {/* Card Name & Subtitle */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              {selectedCard.name}
            </h1>
            {selectedCard.title && (
              <p className="text-sm text-neutral-400 italic mb-4">
                "{selectedCard.title}"
              </p>
            )}

            {/* Quick Meta Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 font-medium">
                Categoría: <strong className="text-white">{selectedCard.category}</strong>
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 font-medium">
                Color: <strong className="text-white">{selectedCard.color}</strong>
              </span>
              {selectedCard.type && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-800/80 text-neutral-400">
                  {selectedCard.type}
                </span>
              )}
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {/* Cost / Life */}
              {selectedCard.cost !== null && (
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-neutral-400 font-semibold">Coste</div>
                    <div className="text-lg font-bold text-white font-mono">{selectedCard.cost}</div>
                  </div>
                </div>
              )}

              {selectedCard.life !== null && (
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-neutral-400 font-semibold">Vidas</div>
                    <div className="text-lg font-bold text-white font-mono">{selectedCard.life}</div>
                  </div>
                </div>
              )}

              {/* Power */}
              {selectedCard.power !== null && (
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                    <Swords className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-neutral-400 font-semibold">Poder</div>
                    <div className="text-lg font-bold text-white font-mono">{selectedCard.power}</div>
                  </div>
                </div>
              )}

              {/* Counter */}
              {selectedCard.counter !== null && (
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-neutral-400 font-semibold">Counter</div>
                    <div className="text-lg font-bold text-white font-mono">+{selectedCard.counter}</div>
                  </div>
                </div>
              )}

              {/* Attribute */}
              {selectedCard.attribute && (
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2.5">
                  <div>
                    <div className="text-[10px] uppercase text-neutral-400 font-semibold">Atributo</div>
                    <div className="text-sm font-bold text-amber-200">{selectedCard.attribute}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Effect Text */}
            <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 mb-6">
              <div className="text-xs uppercase font-bold text-amber-400/90 tracking-wider mb-1.5">
                Texto de Habilidad / Efecto:
              </div>
              <p className="text-sm text-neutral-200 leading-relaxed font-sans whitespace-pre-line">
                {selectedCard.effect || 'Esta carta no tiene texto de habilidad adicional.'}
              </p>
            </div>
          </div>

          {/* Bottom Actions & Controls */}
          <div className="pt-4 border-t border-neutral-800 space-y-4">
            {/* Collection Quantities & Wishlist */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-neutral-300">En tu colección:</span>
                <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-800 rounded-xl p-1">
                  <button
                    onClick={() => removeCard(selectedCard.id)}
                    disabled={count === 0}
                    className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className={`w-8 text-center font-mono font-bold text-lg ${count > 0 ? 'text-amber-400' : 'text-neutral-500'}`}>
                    {count}
                  </span>
                  <button
                    onClick={() => addCard(selectedCard.id)}
                    className="p-1.5 rounded-lg hover:bg-neutral-800 text-amber-400 hover:text-amber-300 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {count > 0 && (
                  <span className="text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                    ✓ Obtenida
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(selectedCard.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                  isWishlist
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <Star className={`w-4 h-4 ${isWishlist ? 'fill-amber-400 text-amber-400' : ''}`} />
                {isWishlist ? 'En tu Wishlist' : 'Añadir a Wishlist'}
              </button>
            </div>

            {/* Marketplace CardTrader Connection */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800">
              <div>
                <span className="text-[11px] text-neutral-400 uppercase font-semibold">Precio orientativo mercado</span>
                <div className="text-lg font-bold text-emerald-400 font-mono">
                  ~{selectedCard.marketPriceEstimated?.toFixed(2)} €
                </div>
              </div>

              <a
                href={cardtraderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
              >
                <span>Ver precio en CardTrader</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
