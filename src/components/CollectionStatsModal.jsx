import React, { useEffect } from 'react';
import { 
  X, 
  Coins, 
  TrendingUp, 
  Layers, 
  Sparkles, 
  Star, 
  Award, 
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { useCollection } from '../context/CollectionContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { CARDTRADER_BASE_URL } from '../data/mockCards';

export default function CollectionStatsModal({ isOpen, onClose }) {
  const {
    totalCardsOwned,
    uniqueCardsOwned,
    totalWishlisted,
    estimatedCollectionValue,
    estimatedWishlistValue,
    rarityCounts,
    topValuedOwnedCards,
    setCompletionStats,
    setSelectedCard
  } = useCollection();

  const { t } = useLanguage();
  const { isDark } = useTheme();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className={`w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-colors ${
          isDark 
            ? 'bg-neutral-900 border-neutral-800 text-neutral-100' 
            : 'bg-white border-neutral-200 text-neutral-900 shadow-neutral-300/40'
        }`}
      >
        {/* Modal Header */}
        <div className={`flex items-center justify-between p-5 border-b shrink-0 ${
          isDark ? 'border-neutral-800 bg-neutral-950/60' : 'border-neutral-200 bg-neutral-50/80'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-emerald-500 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
                isDark ? 'bg-neutral-900 text-emerald-400' : 'bg-white text-emerald-600'
              }`}>
                <Coins className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className={`font-black text-lg tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {t('statsModalTitle')}
              </h2>
              <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {t('statsModalSubtitle')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition cursor-pointer ${
              isDark 
                ? 'hover:bg-neutral-800 text-neutral-400 hover:text-white' 
                : 'hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900'
            }`}
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* 1. Tarjetas Principales de Métricas Financieras */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Valor de la Colección */}
            <div className={`p-4 rounded-2xl border relative overflow-hidden ${
              isDark 
                ? 'bg-gradient-to-br from-neutral-950 via-emerald-950/20 to-neutral-950 border-emerald-900/40' 
                : 'bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/30 border-emerald-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[11px] uppercase font-bold tracking-wider ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  {t('statsTotalValue')}
                </span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-emerald-500">
                  {estimatedCollectionValue.toFixed(2)} €
                </span>
              </div>
              <p className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {uniqueCardsOwned} {t('statsUniqueCards').toLowerCase()} • {totalCardsOwned} {t('statsCopies')}
              </p>
            </div>

            {/* Valor de Wishlist */}
            <div className={`p-4 rounded-2xl border relative overflow-hidden ${
              isDark 
                ? 'bg-gradient-to-br from-neutral-950 via-amber-950/20 to-neutral-950 border-amber-900/40' 
                : 'bg-gradient-to-br from-amber-50/80 via-white to-amber-50/30 border-amber-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[11px] uppercase font-bold tracking-wider ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                  {t('statsWishlistValue')}
                </span>
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-amber-500">
                  {estimatedWishlistValue.toFixed(2)} €
                </span>
              </div>
              <p className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {totalWishlisted} cartas en tu lista de deseos
              </p>
            </div>
          </div>

          {/* 2. Desglose de Rarezas */}
          <div className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
            isDark ? 'bg-neutral-950/40 border-neutral-800' : 'bg-neutral-50/70 border-neutral-200'
          }`}>
            <h3 className="text-xs uppercase font-bold text-neutral-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {t('statsRarityBreakdown')}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { label: 'Manga / SP', count: rarityCounts.SP || 0, badge: 'bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white font-bold' },
                { label: 'Secret Rare (SEC)', count: rarityCounts.SEC || 0, badge: 'bg-rose-600 text-white' },
                { label: 'Super Rare (SR)', count: rarityCounts.SR || 0, badge: 'bg-purple-600 text-white' },
                { label: 'Leader (L)', count: rarityCounts.L || 0, badge: 'bg-amber-600 text-white' },
                { label: 'Rare (R)', count: rarityCounts.R || 0, badge: 'bg-blue-600 text-white' },
                { label: 'Uncommon (UC)', count: rarityCounts.UC || 0, badge: 'bg-teal-700 text-white' },
                { label: 'Common (C)', count: rarityCounts.C || 0, badge: 'bg-neutral-700 text-neutral-200' },
                { label: 'DON!! Especial', count: rarityCounts.DON || 0, badge: 'bg-gradient-to-r from-yellow-500 to-amber-600 text-neutral-950 font-black' },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className={`p-2.5 rounded-xl border flex items-center justify-between ${
                    isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-xs'
                  }`}
                >
                  <span className={`text-[10px] px-1.5 py-0.5 rounded shadow ${item.badge}`}>
                    {item.label}
                  </span>
                  <span className={`font-mono font-bold text-sm ${item.count > 0 ? (isDark ? 'text-white' : 'text-neutral-900') : 'text-neutral-500'}`}>
                    x{item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Progreso por Expansión (Set Completion Progress) */}
          <div className={`p-4 sm:p-5 rounded-2xl border space-y-3.5 ${
            isDark ? 'bg-neutral-950/40 border-neutral-800' : 'bg-neutral-50/70 border-neutral-200'
          }`}>
            <h3 className="text-xs uppercase font-bold text-neutral-400 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              {t('statsSetProgress')}
            </h3>

            <div className="space-y-3">
              {setCompletionStats.map((set) => (
                <div key={set.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold flex items-center gap-1.5">
                      <span className="font-mono text-amber-500">{set.id}</span>
                      <span className={`font-normal truncate max-w-[200px] sm:max-w-none ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                        {set.name.split(':')[1] || set.name}
                      </span>
                    </span>
                    <span className="font-mono text-[11px] text-neutral-400">
                      <strong>{set.ownedInSet}</strong> / {set.totalInSet} ({set.percentage}%)
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}`}>
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(set.percentage, 0))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Top Cartas Más Valiosas */}
          {topValuedOwnedCards.length > 0 && (
            <div className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
              isDark ? 'bg-neutral-950/40 border-neutral-800' : 'bg-neutral-50/70 border-neutral-200'
            }`}>
              <h3 className="text-xs uppercase font-bold text-neutral-400 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                {t('statsTopCards')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {topValuedOwnedCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => {
                      setSelectedCard(card);
                      onClose();
                    }}
                    className={`flex items-center gap-3 p-2 rounded-xl border transition cursor-pointer hover:scale-[1.01] ${
                      isDark 
                        ? 'bg-neutral-900 border-neutral-800 hover:border-amber-500/50' 
                        : 'bg-white border-neutral-200 hover:border-amber-400 shadow-xs'
                    }`}
                  >
                    <img 
                      src={card.image} 
                      alt={card.name}
                      className="w-10 h-14 object-cover rounded-lg shrink-0 shadow-sm"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/100x140/121316/888888?text=${encodeURIComponent(card.id)}`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                        <span className="text-amber-500 font-bold">{card.id}</span>
                        <span className="text-neutral-500">x{card.ownedCount}</span>
                      </div>
                      <p className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        {card.name}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-[11px]">
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-300 font-semibold">
                          {card.rarity}
                        </span>
                        <span className="text-emerald-500 font-mono font-bold">
                          ~{card.marketPriceEstimated?.toFixed(2)} €
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CardTrader Reference Disclaimer */}
          <div className="text-center pt-2">
            <p className="text-[11px] text-neutral-500 flex items-center justify-center gap-1.5">
              <span>{t('statsCardTraderReference')}</span>
              <a 
                href={CARDTRADER_BASE_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-500 hover:underline inline-flex items-center gap-0.5"
              >
                CardTrader <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={`p-4 border-t flex justify-end ${
          isDark ? 'border-neutral-800 bg-neutral-950/60' : 'border-neutral-200 bg-neutral-50/80'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              isDark 
                ? 'bg-neutral-800 hover:bg-neutral-700 text-white' 
                : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-900'
            }`}
          >
            {t('profileCloseBtn')}
          </button>
        </div>
      </div>
    </div>
  );
}
