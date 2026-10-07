import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Minus, 
  Star, 
  ExternalLink, 
  Sparkles, 
  Check, 
  Eye, 
  X,
  SlidersHorizontal 
} from 'lucide-react';
import { useCollection } from '../context/CollectionContext';
import { SETS, COLORS, RARITIES, CARDTRADER_BASE_URL } from '../data/mockCards';

export default function CardCatalog() {
  const { 
    cards, 
    isCardOwned, 
    getCardCount, 
    isCardWishlisted, 
    addCard, 
    removeCard, 
    toggleWishlist, 
    setSelectedCard 
  } = useCollection();

  // Search & Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSet, setSelectedSet] = useState('ALL');
  const [selectedColor, setSelectedColor] = useState('ALL');
  const [selectedRarity, setSelectedRarity] = useState('ALL');
  const [ownershipFilter, setOwnershipFilter] = useState('ALL'); // 'ALL' | 'OWNED' | 'MISSING' | 'WISHLIST'

  // Filter computation
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      // Search term filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = card.name.toLowerCase().includes(term);
        const matchesId = card.id.toLowerCase().includes(term);
        const matchesEffect = card.effect?.toLowerCase().includes(term);
        const matchesType = card.type?.toLowerCase().includes(term);
        if (!matchesName && !matchesId && !matchesEffect && !matchesType) return false;
      }

      // Set filter
      if (selectedSet !== 'ALL' && card.set !== selectedSet) return false;

      // Color filter
      if (selectedColor !== 'ALL' && !card.color.includes(selectedColor)) return false;

      // Rarity filter
      if (selectedRarity !== 'ALL' && card.rarity !== selectedRarity) return false;

      // Ownership filter
      const owned = isCardOwned(card.id);
      const wishlisted = isCardWishlisted(card.id);

      if (ownershipFilter === 'OWNED' && !owned) return false;
      if (ownershipFilter === 'MISSING' && owned) return false;
      if (ownershipFilter === 'WISHLIST' && !wishlisted) return false;

      return true;
    });
  }, [cards, searchTerm, selectedSet, selectedColor, selectedRarity, ownershipFilter, isCardOwned, isCardWishlisted]);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSet('ALL');
    setSelectedColor('ALL');
    setSelectedRarity('ALL');
    setOwnershipFilter('ALL');
  };

  const hasActiveFilters = searchTerm || selectedSet !== 'ALL' || selectedColor !== 'ALL' || selectedRarity !== 'ALL' || ownershipFilter !== 'ALL';

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-6">
      {/* Search & Filter Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-4 sm:p-6 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-5">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, ID (ej. OP05-060) o efecto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 transition"
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
          <div className="flex items-center gap-1.5 bg-neutral-950 p-1.5 rounded-xl border border-neutral-800 w-full md:w-auto overflow-x-auto">
            {[
              { id: 'ALL', label: 'Todas' },
              { id: 'OWNED', label: 'En Colección' },
              { id: 'MISSING', label: 'Faltantes' },
              { id: 'WISHLIST', label: 'Wishlist' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setOwnershipFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  ownershipFilter === tab.id
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-800/80">
          {/* Sets */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1.5">
              Expansión / Set:
            </label>
            <select
              value={selectedSet}
              onChange={(e) => setSelectedSet(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
            >
              {SETS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1.5">
              Color:
            </label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">Todos los Colores</option>
              {COLORS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Rarities */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1.5">
              Rareza:
            </label>
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">Todas las Rarezas</option>
              {RARITIES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.id})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status line */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-800 text-xs text-neutral-400">
          <span>Mostrando <strong>{filteredCards.length}</strong> cartas</span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-amber-400 hover:text-amber-300 font-medium underline text-xs"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      {filteredCards.length === 0 ? (
        <div className="p-12 text-center bg-neutral-900 border border-neutral-800 rounded-3xl">
          <p className="text-neutral-400 text-sm">No se encontraron cartas con los filtros seleccionados.</p>
          <button
            onClick={resetFilters}
            className="mt-3 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold transition"
          >
            Restablecer Filtros
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
                className="group relative bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden p-2 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/5 cursor-pointer"
                onClick={() => setSelectedCard(card)}
              >
                {/* Image & Badges */}
                <div className="relative aspect-[2.5/3.5] rounded-xl overflow-hidden bg-neutral-950 mb-2.5">
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
                    <span className="text-amber-400 font-bold">{card.id}</span>
                    <span>{card.set}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate" title={card.name}>
                    {card.name}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-1">
                    <span>{card.category}</span>
                    <span className="text-emerald-400 font-mono font-semibold">
                      ~{card.marketPriceEstimated?.toFixed(2)}€
                    </span>
                  </div>
                </div>

                {/* Quick Action Footer */}
                <div 
                  className="flex items-center justify-between pt-2 border-t border-neutral-800/80 gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center bg-neutral-950 rounded-lg border border-neutral-800 p-0.5">
                    <button
                      onClick={() => removeCard(card.id)}
                      disabled={count === 0}
                      className="p-1 hover:text-white text-neutral-400 disabled:opacity-20 transition"
                      title="Quitar 1"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-mono font-bold text-neutral-200">
                      {count}
                    </span>
                    <button
                      onClick={() => addCard(card.id)}
                      className="p-1 hover:text-amber-400 text-neutral-400 transition"
                      title="Añadir 1"
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
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                      title="Wishlist"
                    >
                      <Star className={`w-3.5 h-3.5 ${wishlisted ? 'fill-amber-400' : ''}`} />
                    </button>

                    <a
                      href={`${CARDTRADER_BASE_URL}${encodeURIComponent(card.cardtraderSearch || card.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-amber-400 transition"
                      title="Ver en CardTrader"
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
