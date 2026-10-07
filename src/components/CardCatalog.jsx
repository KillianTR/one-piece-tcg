import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Minus, 
  Star, 
  ExternalLink, 
  X
} from 'lucide-react';
import { useCollection } from '../context/CollectionContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { SETS, COLORS, RARITIES, CARDTRADER_BASE_URL } from '../data/mockCards';

export default function CardCatalog() {
  const { 
    cards, 
    getCardCount, 
    isCardOwned, 
    isCardWishlisted, 
    addCard, 
    removeCard, 
    toggleWishlist, 
    setSelectedCard 
  } = useCollection();

  const { t } = useLanguage();
  const { isDark } = useTheme();

  // Search & Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSet, setSelectedSet] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedColor, setSelectedColor] = useState('ALL');
  const [selectedRarity, setSelectedRarity] = useState('ALL');
  const [selectedCost, setSelectedCost] = useState('ALL');
  const [sortBy, setSortBy] = useState('id-asc');
  const [ownershipFilter, setOwnershipFilter] = useState('ALL');

  // Filter computation
  const filteredCards = useMemo(() => {
    const rarityWeight = { SP: 7, SEC: 6, SR: 5, R: 4, L: 3, UC: 2, C: 1 };

    const result = cards.filter((card) => {
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = card.name.toLowerCase().includes(term);
        const matchesId = card.id.toLowerCase().includes(term);
        const matchesEffect = card.effect?.toLowerCase().includes(term);
        const matchesType = card.type?.toLowerCase().includes(term);
        if (!matchesName && !matchesId && !matchesEffect && !matchesType) return false;
      }

      if (selectedSet !== 'ALL' && card.set !== selectedSet) return false;
      if (selectedCategory !== 'ALL' && card.category !== selectedCategory) return false;
      if (selectedColor !== 'ALL' && !card.color.includes(selectedColor)) return false;
      if (selectedRarity !== 'ALL' && card.rarity !== selectedRarity) return false;

      if (selectedCost !== 'ALL') {
        if (selectedCost === '10+') {
          if ((card.cost || 0) < 10) return false;
        } else {
          if (card.cost !== Number(selectedCost)) return false;
        }
      }

      const owned = isCardOwned(card.id);
      const wishlisted = isCardWishlisted(card.id);

      if (ownershipFilter === 'OWNED' && !owned) return false;
      if (ownershipFilter === 'MISSING' && owned) return false;
      if (ownershipFilter === 'WISHLIST' && !wishlisted) return false;

      return true;
    });

    result.sort((a, b) => {
      if (sortBy === 'id-asc') return a.id.localeCompare(b.id);
      if (sortBy === 'cost-asc') return (a.cost ?? 99) - (b.cost ?? 99);
      if (sortBy === 'cost-desc') return (b.cost ?? -1) - (a.cost ?? -1);
      if (sortBy === 'power-desc') return (b.power ?? -1) - (a.power ?? -1);
      if (sortBy === 'rarity-desc') return (rarityWeight[b.rarity] || 0) - (rarityWeight[a.rarity] || 0);
      if (sortBy === 'price-desc') return (b.marketPriceEstimated || 0) - (a.marketPriceEstimated || 0);
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [
    cards, 
    searchTerm, 
    selectedSet, 
    selectedCategory, 
    selectedColor, 
    selectedRarity, 
    selectedCost, 
    sortBy, 
    ownershipFilter, 
    isCardOwned, 
    isCardWishlisted
  ]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSet('ALL');
    setSelectedCategory('ALL');
    setSelectedColor('ALL');
    setSelectedRarity('ALL');
    setSelectedCost('ALL');
    setSortBy('id-asc');
    setOwnershipFilter('ALL');
  };

  const hasActiveFilters = 
    searchTerm || 
    selectedSet !== 'ALL' || 
    selectedCategory !== 'ALL' ||
    selectedColor !== 'ALL' || 
    selectedRarity !== 'ALL' || 
    selectedCost !== 'ALL' ||
    sortBy !== 'id-asc' ||
    ownershipFilter !== 'ALL';

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-6">
      {/* Search & Filter Header */}
      <div className={`border rounded-3xl p-4 sm:p-6 mb-8 shadow-xl ${
        isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
      }`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-5">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder={t('catalogSearchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-amber-500 transition border ${
                isDark 
                  ? 'bg-neutral-950 border-neutral-800 text-neutral-100 placeholder:text-neutral-500' 
                  : 'bg-neutral-50 border-neutral-300 text-neutral-900 placeholder:text-neutral-400'
              }`}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Ownership Tabs */}
          <div className={`flex items-center gap-1.5 p-1.5 rounded-xl border w-full md:w-auto overflow-x-auto ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-100 border-neutral-300'
          }`}>
            {[
              { id: 'ALL', label: t('catalogTabAll') },
              { id: 'OWNED', label: t('catalogTabOwned') },
              { id: 'MISSING', label: t('catalogTabMissing') },
              { id: 'WISHLIST', label: t('catalogTabWishlist') },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setOwnershipFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  ownershipFilter === tab.id
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Pills Grid (6 dropdowns) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-neutral-800/80">
          {/* 1. Expansión */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1.5">
              {t('catalogFilterSet')}
            </label>
            <select
              value={selectedSet}
              onChange={(e) => setSelectedSet(e.target.value)}
              className={`w-full border text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-amber-500 cursor-pointer ${
                isDark ? 'bg-neutral-950 border-neutral-800 text-neutral-200' : 'bg-neutral-50 border-neutral-300 text-neutral-800'
              }`}
            >
              {SETS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id === 'ALL' ? t('binderAllSets') : `${s.id} (${s.name.split(':')[1] || s.name})`}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Tipo de Carta */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1.5">
              {t('catalogFilterCategory')}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full border text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-amber-500 cursor-pointer ${
                isDark ? 'bg-neutral-950 border-neutral-800 text-neutral-200' : 'bg-neutral-50 border-neutral-300 text-neutral-800'
              }`}
            >
              <option value="ALL">{t('catalogAllCategories')}</option>
              <option value="Leader">{t('catalogCategoryLeader')}</option>
              <option value="Character">{t('catalogCategoryCharacter')}</option>
              <option value="Event">{t('catalogCategoryEvent')}</option>
              <option value="Stage">{t('catalogCategoryStage')}</option>
              <option value="DON!!">{t('catalogCategoryDon')}</option>
            </select>
          </div>

          {/* 3. Color */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1.5">
              {t('catalogFilterColor')}
            </label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className={`w-full border text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-amber-500 cursor-pointer ${
                isDark ? 'bg-neutral-950 border-neutral-800 text-neutral-200' : 'bg-neutral-50 border-neutral-300 text-neutral-800'
              }`}
            >
              <option value="ALL">{t('catalogAllColors')}</option>
              {COLORS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Rareza */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1.5">
              {t('catalogFilterRarity')}
            </label>
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className={`w-full border text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-amber-500 cursor-pointer ${
                isDark ? 'bg-neutral-950 border-neutral-800 text-neutral-200' : 'bg-neutral-50 border-neutral-300 text-neutral-800'
              }`}
            >
              <option value="ALL">{t('catalogAllRarities')}</option>
              {RARITIES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.id})
                </option>
              ))}
            </select>
          </div>

          {/* 5. Coste */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1.5">
              {t('catalogFilterCost')}
            </label>
            <select
              value={selectedCost}
              onChange={(e) => setSelectedCost(e.target.value)}
              className={`w-full border text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-amber-500 cursor-pointer ${
                isDark ? 'bg-neutral-950 border-neutral-800 text-neutral-200' : 'bg-neutral-50 border-neutral-300 text-neutral-800'
              }`}
            >
              <option value="ALL">{t('catalogAllCosts')}</option>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((cost) => (
                <option key={cost} value={cost}>
                  {t('cardCost')} {cost}
                </option>
              ))}
              <option value="10+">{t('cardCost')} 10+</option>
            </select>
          </div>

          {/* 6. Ordenar por */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1.5">
              {t('catalogSortBy')}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`w-full border text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-amber-500 cursor-pointer font-medium ${
                isDark ? 'bg-neutral-950 border-neutral-800 text-amber-400' : 'bg-neutral-50 border-neutral-300 text-amber-700'
              }`}
            >
              <option value="id-asc">{t('catalogSortIdAsc')}</option>
              <option value="cost-asc">{t('catalogSortCostAsc')}</option>
              <option value="cost-desc">{t('catalogSortCostDesc')}</option>
              <option value="power-desc">{t('catalogSortPowerDesc')}</option>
              <option value="rarity-desc">{t('catalogSortRarityDesc')}</option>
              <option value="price-desc">{t('catalogSortPriceDesc')}</option>
              <option value="name-asc">{t('catalogSortNameAsc')}</option>
            </select>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-800 text-xs text-neutral-400">
          <span>{t('catalogShowing')} <strong>{filteredCards.length}</strong> {t('catalogCards')}</span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-amber-500 hover:text-amber-400 font-medium underline text-xs cursor-pointer"
            >
              {t('catalogResetFilters')}
            </button>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      {filteredCards.length === 0 ? (
        <div className={`p-12 text-center border rounded-3xl ${
          isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
        }`}>
          <p className="text-neutral-400 text-sm">{t('catalogNoCards')}</p>
          <button
            onClick={resetFilters}
            className="mt-3 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold transition"
          >
            {t('catalogResetFilters')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
          {filteredCards.map((card) => {
            const count = getCardCount(card.id);
            const owned = count > 0;
            const wishlisted = isCardWishlisted(card.id);
            const rarity = RARITIES.find((r) => r.id === card.rarity);

            return (
              <div
                key={card.id}
                className={`group relative border rounded-2xl overflow-hidden p-2 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/5 cursor-pointer ${
                  isDark ? 'bg-neutral-900/90 border-neutral-800 hover:border-neutral-700' : 'bg-white border-neutral-200 hover:border-neutral-400'
                }`}
                onClick={() => setSelectedCard(card)}
              >
                {/* Image & Badges */}
                <div className={`relative aspect-[2.5/3.5] rounded-xl overflow-hidden mb-2.5 ${isDark ? 'bg-neutral-950' : 'bg-neutral-100'}`}>
                  <img
                    src={card.image}
                    alt={card.name}
                    className={`w-full h-full object-cover transition duration-300 ${
                      owned ? 'opacity-100 group-hover:scale-105' : 'opacity-50 grayscale hover:opacity-75'
                    }`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/300x420/121316/888888?text=${encodeURIComponent(card.id)}`;
                    }}
                  />

                  {/* Rarity Badge */}
                  <div className="absolute top-1.5 left-1.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold shadow ${rarity?.badgeColor || 'bg-neutral-800'}`}>
                      {card.rarity}
                    </span>
                  </div>

                  {/* Owned Count Badge */}
                  {owned && (
                    <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-md bg-amber-500 text-neutral-950 font-black font-mono text-xs shadow-md">
                      x{count}
                    </div>
                  )}

                  {/* Wishlist Star */}
                  {wishlisted && (
                    <div className="absolute bottom-1.5 left-1.5 p-1 rounded-full bg-amber-500/20 backdrop-blur-sm text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                    </div>
                  )}
                </div>

                {/* Card Info */}
                <div className="px-1 mb-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-0.5">
                    <span className="text-amber-500 font-bold">{card.id}</span>
                    <span>{card.set}</span>
                  </div>
                  <h4 className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-neutral-900'}`} title={card.name}>
                    {card.name}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-1">
                    <span>{card.category}</span>
                    <span className="text-emerald-500 font-mono font-semibold">
                      ~{card.marketPriceEstimated?.toFixed(2)}€
                    </span>
                  </div>
                </div>

                {/* Quick Action Footer */}
                <div 
                  className="flex items-center justify-between pt-2 border-t border-neutral-800/80 gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={`flex items-center rounded-lg border p-0.5 ${
                    isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-100 border-neutral-300'
                  }`}>
                    <button
                      onClick={() => removeCard(card.id)}
                      disabled={count === 0}
                      className="p-1 hover:text-white text-neutral-400 disabled:opacity-20 transition"
                      title="Quitar"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className={`w-5 text-center text-xs font-mono font-bold ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                      {count}
                    </span>
                    <button
                      onClick={() => addCard(card.id)}
                      className="p-1 hover:text-amber-400 text-neutral-400 transition"
                      title="Añadir"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleWishlist(card.id)}
                      className={`p-1.5 rounded-lg border transition ${
                        wishlisted
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                          : isDark ? 'bg-neutral-950 border-neutral-800 text-neutral-400' : 'bg-neutral-100 border-neutral-300 text-neutral-600'
                      }`}
                      title="Wishlist"
                    >
                      <Star className={`w-3.5 h-3.5 ${wishlisted ? 'fill-amber-400' : ''}`} />
                    </button>

                    <a
                      href={`${CARDTRADER_BASE_URL}${encodeURIComponent(card.cardtraderSearch || card.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1.5 rounded-lg border transition ${
                        isDark ? 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-amber-400' : 'bg-neutral-100 border-neutral-300 text-neutral-600 hover:text-amber-600'
                      }`}
                      title={t('binderCheckCardTrader')}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
