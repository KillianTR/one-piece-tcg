import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Sparkles, 
  Plus, 
  Star, 
  ExternalLink, 
  CheckCircle2, 
  HelpCircle,
  Eye,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCollection } from '../context/CollectionContext';
import { SETS, CARDTRADER_BASE_URL, RARITIES } from '../data/mockCards';

export default function VirtualBinder() {
  const { 
    cards, 
    isCardOwned, 
    getCardCount, 
    isCardWishlisted, 
    addCard, 
    toggleWishlist, 
    setSelectedCard,
    binderPageSize,
    setBinderPageSize
  } = useCollection();

  const [selectedSet, setSelectedSet] = useState('OP-01');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter cards by set
  const filteredCards = useMemo(() => {
    if (selectedSet === 'ALL') return cards;
    return cards.filter((card) => card.set === selectedSet);
  }, [cards, selectedSet]);

  const totalPages = Math.max(1, Math.ceil(filteredCards.length / binderPageSize));

  // Current page cards
  const currentPageCards = useMemo(() => {
    const start = (currentPage - 1) * binderPageSize;
    return filteredCards.slice(start, start + binderPageSize);
  }, [filteredCards, currentPage, binderPageSize]);

  // Fill up empty slots if page has less than binderPageSize
  const pockets = useMemo(() => {
    const list = [...currentPageCards];
    while (list.length < binderPageSize) {
      list.push(null); // Empty slot placeholder
    }
    return list;
  }, [currentPageCards, binderPageSize]);

  // Set collection progress
  const setTotalCards = filteredCards.length;
  const setOwnedCards = filteredCards.filter((c) => isCardOwned(c.id)).length;
  const progressPercent = setTotalCards > 0 ? Math.round((setOwnedCards / setTotalCards) * 100) : 0;

  // Page navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  };

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6']
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6 bg-neutral-900/90 border border-neutral-800 p-4 rounded-2xl backdrop-blur-md">
        {/* Set Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase font-bold text-neutral-400 mr-1 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-400" />
            Expansión:
          </span>
          {SETS.filter(s => s.id !== 'ALL').map((set) => (
            <button
              key={set.id}
              onClick={() => {
                setSelectedSet(set.id);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedSet === set.id
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'bg-neutral-950 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {set.id} <span className="opacity-75 font-normal">({set.name.split(':')[1] || set.name})</span>
            </button>
          ))}
        </div>

        {/* Pocket Layout Toggle (9 vs 12) & Progress */}
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-xl p-1 text-xs">
            <span className="text-neutral-500 px-2 font-medium">Bolsillos:</span>
            <button
              onClick={() => { setBinderPageSize(9); setCurrentPage(1); }}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                binderPageSize === 9 ? 'bg-neutral-800 text-amber-400 shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              9 (3x3)
            </button>
            <button
              onClick={() => { setBinderPageSize(12); setCurrentPage(1); }}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                binderPageSize === 12 ? 'bg-neutral-800 text-amber-400 shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              12 (4x3)
            </button>
          </div>

          {/* Quick Page Nav Buttons */}
          <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-800 rounded-xl px-2 py-1">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-300 disabled:opacity-30 disabled:hover:bg-transparent transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono font-bold text-neutral-200 px-1">
              Pág. {currentPage} / {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-300 disabled:opacity-30 disabled:hover:bg-transparent transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Set Progress Bar */}
      <div className="mb-6 p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Progreso del Álbum — {SETS.find(s => s.id === selectedSet)?.name || selectedSet}
            </h3>
            <p className="text-xs text-neutral-400">
              {setOwnedCards} de {setTotalCards} cartas conseguidas ({progressPercent}%)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:w-1/3">
          <div className="w-full bg-neutral-950 rounded-full h-3 overflow-hidden border border-neutral-800">
            <div 
              className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-amber-400 w-10 text-right">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* THE VAULT X BINDER (Outer Leather Cover & Pages) */}
      <div className="relative rounded-3xl binder-leather p-4 sm:p-8 lg:p-10 shadow-2xl border-4 border-neutral-900">
        {/* Decorative Gold Stitching (Vault X signature) */}
        <div className="absolute inset-2 sm:inset-4 rounded-2xl binder-stitching pointer-events-none" />

        {/* Binder Spine simulated line in the center if wide */}
        <div className="hidden lg:block absolute top-6 bottom-6 left-1/2 w-3 -translate-x-1/2 binder-spine rounded-sm pointer-events-none opacity-40" />

        {/* Binder Header Plate */}
        <div className="relative z-10 flex items-center justify-between mb-6 pb-4 border-b border-neutral-800/80">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500" />
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold">
              VAULT X • ONE PIECE OFFICIAL PORTFOLIO
            </span>
          </div>

          <div className="text-xs text-neutral-500 font-medium">
            Hojas protectoras anti-ácido de 9 bolsillos con carga lateral
          </div>
        </div>

        {/* POCKETS GRID */}
        <div 
          className={`relative z-10 grid gap-3 sm:gap-4 md:gap-5 ${
            binderPageSize === 9 
              ? 'grid-cols-2 sm:grid-cols-3' 
              : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
          }`}
        >
          {pockets.map((card, index) => {
            // Case 1: Empty pocket slot (at the end of set)
            if (!card) {
              return (
                <div
                  key={`empty-${index}`}
                  className="card-sleeve aspect-[2.5/3.5] rounded-xl border border-neutral-800/40 flex flex-col items-center justify-center p-4 text-neutral-700 select-none"
                >
                  <div className="w-8 h-8 rounded-full border border-dashed border-neutral-800 flex items-center justify-center text-xs">
                    {index + 1}
                  </div>
                  <span className="text-[11px] font-mono mt-2 text-neutral-600">Bolsillo Vacío</span>
                </div>
              );
            }

            const owned = isCardOwned(card.id);
            const count = getCardCount(card.id);
            const wishlisted = isCardWishlisted(card.id);
            const rarity = RARITIES.find((r) => r.id === card.rarity);

            // Case 2: Card Slot (Owned or Missing)
            return (
              <div
                key={card.id}
                className="group relative aspect-[2.5/3.5] rounded-xl card-sleeve p-1 sm:p-1.5 transition-all duration-300 hover:scale-[1.02] hover:z-20 cursor-pointer"
                onClick={() => setSelectedCard(card)}
              >
                {/* The Card Pocket Sleeve / Window */}
                <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-neutral-950">
                  
                  {/* Card Image */}
                  <img
                    src={card.image}
                    alt={card.name}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      owned
                        ? 'opacity-100 filter-none group-hover:brightness-105'
                        : 'opacity-25 grayscale hover:opacity-40 transition-opacity'
                    }`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/300x420/121316/888888?text=${encodeURIComponent(card.id)}`;
                    }}
                  />

                  {/* Holographic reflection for owned foil/rare cards */}
                  {owned && (card.rarity === 'SEC' || card.rarity === 'SR' || card.rarity === 'SP' || card.isAltArt) && (
                    <div className="absolute inset-0 holo-shine pointer-events-none" />
                  )}

                  {/* IF OWNED: Owned Badge (e.g. x1, x4) */}
                  {owned && (
                    <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-md bg-amber-500/90 text-neutral-950 font-black font-mono text-xs shadow-md backdrop-blur-sm">
                      x{count}
                    </div>
                  )}

                  {/* IF MISSING: Missing Indicator / Ghost overlay */}
                  {!owned && (
                    <div className="absolute inset-0 flex flex-col items-center justify-between p-2.5 bg-neutral-950/60 backdrop-blur-[1px]">
                      <div className="w-full flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-neutral-400 bg-neutral-900/80 px-1.5 py-0.5 rounded border border-neutral-800">
                          {card.id}
                        </span>
                        {wishlisted && (
                          <span className="p-1 rounded-full bg-amber-500/20 text-amber-400">
                            <Star className="w-3 h-3 fill-amber-400" />
                          </span>
                        )}
                      </div>

                      {/* Missing Tag */}
                      <div className="text-center">
                        <div className="text-xs font-bold uppercase tracking-wider text-rose-400/90 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                          FALTA
                        </div>
                        <div className="text-[11px] font-semibold text-neutral-300 mt-1 line-clamp-1 px-1">
                          {card.name}
                        </div>
                      </div>

                      {/* Quick Action Buttons on Missing Card Hover */}
                      <div 
                        className="w-full flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-950/90 p-1 rounded-lg border border-neutral-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            addCard(card.id);
                            triggerConfetti();
                          }}
                          title="Marcar como conseguida (+1)"
                          className="p-1 rounded bg-amber-500 text-neutral-950 hover:bg-amber-400 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleWishlist(card.id)}
                          title="Alternar Wishlist"
                          className={`p-1 rounded transition ${
                            wishlisted ? 'bg-amber-500/20 text-amber-400' : 'bg-neutral-800 text-neutral-300 hover:text-white'
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${wishlisted ? 'fill-amber-400' : ''}`} />
                        </button>
                        <a
                          href={`${CARDTRADER_BASE_URL}${encodeURIComponent(card.cardtraderSearch || card.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Ver en CardTrader"
                          className="p-1 rounded bg-neutral-800 text-neutral-300 hover:text-white transition"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Card ID footer badge */}
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-neutral-950/80 backdrop-blur-sm text-[9px] font-mono text-neutral-400 border border-neutral-800 pointer-events-none">
                    {card.id}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Binder Bottom Footer with Pagination */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-neutral-800/80">
          <div className="text-xs text-neutral-400 flex items-center gap-2">
            <span>💡 <strong>Tip de coleccionista:</strong> Haz clic en cualquier carta para ver sus detalles, habilidades y comparador de precios en CardTrader.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-neutral-900 text-xs font-bold text-neutral-200 border border-neutral-800 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Página Anterior
            </button>
            <div className="text-xs font-mono font-bold text-amber-400 px-2">
              {currentPage} / {totalPages}
            </div>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-neutral-900 text-xs font-bold text-neutral-200 border border-neutral-800 transition"
            >
              Siguiente Página
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
