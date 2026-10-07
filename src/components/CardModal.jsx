import React from 'react';
import { X, ExternalLink, Plus, Minus, Star, Shield, Zap, Heart, Swords, Sparkles } from 'lucide-react';
import { useCollection } from '../context/CollectionContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { RARITIES, COLORS, CARDTRADER_BASE_URL } from '../data/mockCards';
import { playCardSnapSound } from '../utils/audioEffects';

export default function CardModal() {
  const { selectedCard, setSelectedCard, addCard, removeCard, toggleWishlist, getCardCount, isCardWishlisted } = useCollection();
  const { t } = useLanguage();
  const { isDark } = useTheme();

  if (!selectedCard) return null;

  const count = getCardCount(selectedCard.id);
  const isWishlist = isCardWishlisted(selectedCard.id);
  const rarityObj = RARITIES.find((r) => r.id === selectedCard.rarity) || { name: selectedCard.rarity, badgeColor: 'bg-neutral-800 text-white' };
  const colorObj = COLORS.find((c) => c.id === selectedCard.color || selectedCard.color.includes(c.id)) || { hex: '#eab308' };

  const cardtraderUrl = `${CARDTRADER_BASE_URL}${encodeURIComponent(selectedCard.cardtraderSearch || `${selectedCard.name} ${selectedCard.id}`)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className={`relative w-full max-w-4xl border rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh] ${
          isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedCard(null)}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full border transition ${
            isDark ? 'bg-neutral-950/70 hover:bg-neutral-800 text-neutral-400 hover:text-white border-neutral-700/50' : 'bg-white/80 hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 border-neutral-300'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Card Visual Display */}
        <div className={`md:w-5/12 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r relative group ${
          isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
        }`}>
          {/* Subtle backlight glow */}
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
                <Sparkles className="w-3 h-3" /> {t('cardAltArtBadge')}
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Details & Stats & Actions */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header / ID & Set */}
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <span className="font-mono font-bold tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {selectedCard.id}
              </span>
              <span className="text-neutral-400 font-medium">
                Set: <strong className={isDark ? 'text-neutral-200' : 'text-neutral-700'}>{selectedCard.set}</strong>
              </span>
            </div>

            {/* Card Name & Subtitle */}
            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              {selectedCard.name}
            </h1>
            {selectedCard.title && (
              <p className="text-sm text-neutral-400 italic mb-4">
                "{selectedCard.title}"
              </p>
            )}

            {/* Quick Meta Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${isDark ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-700 border border-neutral-200'}`}>
                {t('cardCategory')}: <strong className={isDark ? 'text-white' : 'text-neutral-900'}>{selectedCard.category}</strong>
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${isDark ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-700 border border-neutral-200'}`}>
                {t('cardColor')}: <strong className={isDark ? 'text-white' : 'text-neutral-900'}>{selectedCard.color}</strong>
              </span>
              {selectedCard.type && (
                <span className={`text-xs px-2.5 py-1 rounded-full ${isDark ? 'bg-neutral-800/80 text-neutral-400' : 'bg-neutral-100 text-neutral-500'}`}>
                  {selectedCard.type}
                </span>
              )}
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {selectedCard.cost !== null && (
                <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-neutral-400 font-semibold">{t('cardCost')}</div>
                    <div className={`text-lg font-bold font-mono ${isDark ? 'text-white' : 'text-neutral-900'}`}>{selectedCard.cost}</div>
                  </div>
                </div>
              )}

              {selectedCard.life !== null && (
                <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                  <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-neutral-400 font-semibold">{t('cardLife')}</div>
                    <div className={`text-lg font-bold font-mono ${isDark ? 'text-white' : 'text-neutral-900'}`}>{selectedCard.life}</div>
                  </div>
                </div>
              )}

              {selectedCard.power !== null && (
                <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                    <Swords className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-neutral-400 font-semibold">{t('cardPower')}</div>
                    <div className={`text-lg font-bold font-mono ${isDark ? 'text-white' : 'text-neutral-900'}`}>{selectedCard.power}</div>
                  </div>
                </div>
              )}

              {selectedCard.counter !== null && (
                <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-neutral-400 font-semibold">{t('cardCounter')}</div>
                    <div className={`text-lg font-bold font-mono ${isDark ? 'text-white' : 'text-neutral-900'}`}>+{selectedCard.counter}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Effect Text */}
            <div className={`p-4 rounded-xl border mb-6 ${isDark ? 'bg-neutral-950/80 border-neutral-800 text-neutral-200' : 'bg-neutral-50 border-neutral-200 text-neutral-800'}`}>
              <div className="text-xs uppercase font-bold text-amber-500 tracking-wider mb-1.5">
                {t('cardEffectTitle')}
              </div>
              <p className="text-sm leading-relaxed font-sans whitespace-pre-line">
                {selectedCard.effect || t('cardNoEffect')}
              </p>
            </div>
          </div>

          {/* Bottom Actions & Controls */}
          <div className="pt-4 border-t border-neutral-800/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{t('cardInCollection')}</span>
                <div className={`flex items-center gap-2 border rounded-xl p-1 ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-100 border-neutral-300'}`}>
                  <button
                    onClick={() => {
                      removeCard(selectedCard.id);
                      playCardSnapSound();
                    }}
                    disabled={count === 0}
                    className="p-1.5 rounded-lg disabled:opacity-30 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className={`w-8 text-center font-mono font-bold text-lg ${count > 0 ? 'text-amber-500' : 'text-neutral-400'}`}>
                    {count}
                  </span>
                  <button
                    onClick={() => {
                      addCard(selectedCard.id);
                      playCardSnapSound();
                    }}
                    className="p-1.5 rounded-lg text-amber-500 hover:text-amber-400 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {count > 0 && (
                  <span className="text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">
                    {t('cardOwnedBadge')}
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => {
                  toggleWishlist(selectedCard.id);
                  playCardSnapSound();
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                  isWishlist
                    ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                    : isDark ? 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white' : 'bg-neutral-100 border-neutral-300 text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Star className={`w-4 h-4 ${isWishlist ? 'fill-amber-500 text-amber-500' : ''}`} />
                {isWishlist ? t('cardWishlistIn') : t('cardWishlistAdd')}
              </button>
            </div>

            {/* Marketplace CardTrader Connection */}
            <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl border ${
              isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <div>
                <span className="text-[11px] text-neutral-400 uppercase font-semibold">{t('cardMarketPrice')}</span>
                <div className="text-lg font-bold text-emerald-500 font-mono">
                  ~{selectedCard.marketPriceEstimated?.toFixed(2)} €
                </div>
              </div>

              <a
                href={cardtraderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
              >
                <span>{t('cardViewOnCardTrader')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
