import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Plus, 
  Star, 
  ExternalLink, 
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCollection } from '../context/CollectionContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
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

  const { t } = useLanguage();
  const { isDark } = useTheme();

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
      list.push(null);
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
      <div className={`flex flex-col lg:flex-row items-center justify-between gap-4 mb-6 p-4 rounded-2xl backdrop-blur-md border ${
        isDark ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white/90 border-neutral-200 shadow-md'
      }`}>
        {/* Set Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase font-bold text-neutral-400 mr-1 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-500" />
            {t('binderExpansion')}
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
                  : isDark 
                    ? 'bg-neutral-950 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                    : 'bg-neutral-100 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200 border border-neutral-300'
              }`}
            >
              {set.id} <span className="opacity-75 font-normal">({set.name.split(':')[1] || set.name})</span>
            </button>
          ))}
        </div>

        {/* Pocket Layout Toggle (9 vs 12) & Quick Page Nav */}
        <div className="flex items-center gap-4">
          <div className={`flex items-center border rounded-xl p-1 text-xs ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-100 border-neutral-300'
          }`}>
            <span className="text-neutral-500 px-2 font-medium">{t('binderPockets')}</span>
            <button
              onClick={() => { setBinderPageSize(9); setCurrentPage(1); }}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                binderPageSize === 9 
                  ? 'bg-amber-500 text-neutral-950 shadow' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              9 (3x3)
            </button>
            <button
              onClick={() => { setBinderPageSize(12); setCurrentPage(1); }}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                binderPageSize === 12 
                  ? 'bg-amber-500 text-neutral-950 shadow' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              12 (4x3)
            </button>
          </div>

          {/* Quick Page Nav Buttons */}
          <div className={`flex items-center gap-2 border rounded-xl px-2 py-1 ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-100 border-neutral-300'
          }`}>
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 disabled:opacity-30 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className={`text-xs font-mono font-bold px-1 ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
              {t('binderPage')} {currentPage} / {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 disabled:opacity-30 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Set Progress Bar */}
      <div className={`mb-6 p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg ${
        isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              {t('binderProgressTitle')} — {SETS.find(s => s.id === selectedSet)?.name || selectedSet}
            </h3>
            <p className="text-xs text-neutral-400">
              {setOwnedCards} {t('binderOf')} {setTotalCards} {t('binderProgressSub')} ({progressPercent}%)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:w-1/3">
          <div className={`w-full rounded-full h-3 overflow-hidden border ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-200 border-neutral-300'
          }`}>
            <div 
              className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-amber-500 w-10 text-right">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* THE VAULT X BINDER (Outer Leather Cover & Pages) */}
      <div className={`relative rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl border-4 ${
        isDark 
          ? 'binder-leather border-neutral-900' 
          : 'binder-leather-light border-neutral-300 shadow-neutral-400/30'
      }`}>
        {/* Decorative Gold Stitching (Vault X signature) */}
        <div className={`absolute inset-2 sm:inset-4 rounded-2xl pointer-events-none ${
          isDark ? 'binder-stitching' : 'binder-stitching-light'
        }`} />

        {/* Binder Spine simulated line in center */}
        <div className={`hidden lg:block absolute top-6 bottom-6 left-1/2 w-3 -translate-x-1/2 rounded-sm pointer-events-none opacity-40 ${
          isDark ? 'binder-spine' : 'binder-spine-light'
        }`} />

        {/* Binder Header Plate */}
        <div className="relative z-10 flex items-center justify-between mb-6 pb-4 border-b border-neutral-800/80">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500" />
            <span className={`font-mono text-xs uppercase tracking-widest font-bold ${
              isDark ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              VAULT X • ONE PIECE OFFICIAL PORTFOLIO
            </span>
          </div>

          <div className="text-xs text-neutral-400 font-medium hidden sm:block">
            {t('binderHeaderSubtitle')}
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
            // Empty slot
            if (!card) {
              return (
                <div
                  key={`empty-${index}`}
                  className={`aspect-[2.5/3.5] rounded-xl border flex flex-col items-center justify-center p-4 text-neutral-500 select-none ${
                    isDark ? 'card-sleeve border-neutral-800/40' : 'card-sleeve-light border-neutral-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full border border-dashed border-neutral-500 flex items-center justify-center text-xs">
                    {index + 1}
                  </div>
                  <span className="text-[11px] font-mono mt-2 text-neutral-400">{t('binderEmptySlot')}</span>
                </div>
              );
            }

            const owned = isCardOwned(card.id);
            const count = getCardCount(card.id);
            const wishlisted = isCardWishlisted(card.id);

            return (
              <div
                key={card.id}
                className={`group relative aspect-[2.5/3.5] rounded-xl p-1 sm:p-1.5 transition-all duration-300 hover:scale-[1.02] hover:z-20 cursor-pointer ${
                  isDark ? 'card-sleeve' : 'card-sleeve-light'
                }`}
                onClick={() => setSelectedCard(card)}
              >
                {/* The Card Pocket Sleeve Window */}
                <div className={`relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center ${
                  isDark ? 'bg-neutral-950' : 'bg-neutral-200'
                }`}>
                  
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

                  {/* IF OWNED: Owned Badge */}
                  {owned && (
                    <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-md bg-amber-500 text-neutral-950 font-black font-mono text-xs shadow-md">
                      x{count}
                    </div>
                  )}

                  {/* IF MISSING: Missing Indicator / Ghost overlay */}
                  {!owned && (
                    <div className="absolute inset-0 flex flex-col items-center justify-between p-2.5 bg-neutral-950/60 backdrop-blur-[1px]">
                      <div className="w-full flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-neutral-300 bg-neutral-900/80 px-1.5 py-0.5 rounded border border-neutral-700">
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
                          {t('binderMissing')}
                        </div>
                        <div className="text-[11px] font-semibold text-white mt-1 line-clamp-1 px-1">
                          {card.name}
                        </div>
                      </div>

                      {/* Quick Action Buttons on Hover */}
                      <div 
                        className="w-full flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-950/90 p-1 rounded-lg border border-neutral-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            addCard(card.id);
                            triggerConfetti();
                          }}
                          title={t('binderAddOwned')}
                          className="p-1 rounded bg-amber-500 text-neutral-950 hover:bg-amber-400 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleWishlist(card.id)}
                          title={t('binderToggleWishlist')}
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
                          title={t('binderCheckCardTrader')}
                          className="p-1 rounded bg-neutral-800 text-neutral-300 hover:text-white transition"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Card ID footer badge */}
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-neutral-950/80 backdrop-blur-sm text-[9px] font-mono text-neutral-300 border border-neutral-700 pointer-events-none">
                    {card.id}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Binder Bottom Footer with Pagination */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-neutral-800/80">
          <div className="text-xs text-neutral-400">
            {t('binderCollectorTip')}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition ${
                isDark 
                  ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-neutral-800 disabled:opacity-30'
                  : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-300 disabled:opacity-30'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              {t('binderPrevPage')}
            </button>
            <div className="text-xs font-mono font-bold text-amber-500 px-2">
              {currentPage} / {totalPages}
            </div>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition ${
                isDark 
                  ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-neutral-800 disabled:opacity-30'
                  : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-300 disabled:opacity-30'
              }`}
            >
              {t('binderNextPage')}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
