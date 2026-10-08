import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Plus, 
  Star, 
  ExternalLink, 
  Trophy,
  Folder,
  FolderPlus,
  Trash2,
  ArrowUpDown,
  BookOpen,
  FolderHeart,
  Search,
  X,
  Sparkles,
  GripHorizontal,
  Volume2,
  VolumeX
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCollection } from '../context/CollectionContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { SETS, CARDTRADER_BASE_URL, RARITIES, COLORS } from '../data/mockCards';
import { 
  playPageFlipSound, 
  playCardSnapSound, 
  isSoundEnabled, 
  toggleSound 
} from '../utils/audioEffects';

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
    setBinderPageSize,
    customBinders,
    activeBinderId,
    setActiveBinderId,
    createCustomBinder,
    deleteCustomBinder,
    addPageToBinder,
    deletePageFromBinder,
    setSlotCard,
    removeSlotCard,
    swapSlots
  } = useCollection();

  const { t } = useLanguage();
  const { isDark } = useTheme();

  // Mode: 'official' (Official Checklist by Expansion/All) | 'custom' (Free Custom Binders)
  const [binderMode, setBinderMode] = useState('official');
  const [soundActive, setSoundActive] = useState(isSoundEnabled);

  // Official Mode States
  const [selectedSet, setSelectedSet] = useState('ALL');
  const [sortBy, setSortBy] = useState('id'); // 'id' | 'category' | 'rarity' | 'color' | 'cost_desc' | 'cost_asc' | 'power_desc'
  const [currentPage, setCurrentPage] = useState(1);

  // Custom Mode States
  const [customPage, setCustomPage] = useState(1);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderSize, setNewFolderSize] = useState(12);

  // Card Picker Modal for Slot Assignment
  const [cardPickerSlot, setCardPickerSlot] = useState(null); // { pageNumber, slotIndex }
  const [pickerSearch, setPickerSearch] = useState('');
  const [pickerCategoryFilter, setPickerCategoryFilter] = useState('ALL');
  const [pickerOwnedOnly, setPickerOwnedOnly] = useState(false);

  // Drag and Drop state
  const [draggedSlotIndex, setDraggedSlotIndex] = useState(null);

  // Current custom binder object
  const currentCustomBinder = useMemo(() => {
    return customBinders.find(b => b.id === activeBinderId) || customBinders[0] || null;
  }, [customBinders, activeBinderId]);

  // Current custom page object
  const currentCustomPageData = useMemo(() => {
    if (!currentCustomBinder) return null;
    return currentCustomBinder.pages?.find(p => p.pageNumber === customPage) || currentCustomBinder.pages?.[0] || null;
  }, [currentCustomBinder, customPage]);

  // Filter & Sort cards for Official Mode
  const sortedAndFilteredCards = useMemo(() => {
    let list = [...cards];
    if (selectedSet !== 'ALL') {
      list = list.filter((card) => card.set === selectedSet);
    }

    list.sort((a, b) => {
      if (sortBy === 'category') {
        const catOrder = { 'Leader': 1, 'Character': 2, 'Event': 3, 'Stage': 4, 'DON!!': 5 };
        const orderA = catOrder[a.category] || 99;
        const orderB = catOrder[b.category] || 99;
        if (orderA !== orderB) return orderA - orderB;
        return a.id.localeCompare(b.id);
      }
      if (sortBy === 'rarity') {
        const rarOrder = { 'SP': 1, 'SEC': 2, 'SR': 3, 'R': 4, 'UC': 5, 'C': 6, 'L': 7 };
        const orderA = rarOrder[a.rarity] || 99;
        const orderB = rarOrder[b.rarity] || 99;
        if (orderA !== orderB) return orderA - orderB;
        return a.id.localeCompare(b.id);
      }
      if (sortBy === 'color') {
        const colA = a.color || '';
        const colB = b.color || '';
        if (colA !== colB) return colA.localeCompare(colB);
        return a.id.localeCompare(b.id);
      }
      if (sortBy === 'cost_desc') {
        return (b.cost || 0) - (a.cost || 0);
      }
      if (sortBy === 'cost_asc') {
        return (a.cost || 0) - (b.cost || 0);
      }
      if (sortBy === 'power_desc') {
        return (b.power || 0) - (a.power || 0);
      }
      // Default: sort by id
      return a.id.localeCompare(b.id);
    });

    return list;
  }, [cards, selectedSet, sortBy]);

  // Official Mode Pagination
  const officialTotalPages = Math.max(1, Math.ceil(sortedAndFilteredCards.length / binderPageSize));

  const officialPageCards = useMemo(() => {
    const start = (currentPage - 1) * binderPageSize;
    return sortedAndFilteredCards.slice(start, start + binderPageSize);
  }, [sortedAndFilteredCards, currentPage, binderPageSize]);

  // Official Mode Pockets array
  const officialPockets = useMemo(() => {
    const result = [...officialPageCards];
    while (result.length < binderPageSize) {
      result.push(null);
    }
    return result;
  }, [officialPageCards, binderPageSize]);

  // Collection Stats for progress bar in Official Mode
  const setTotalCards = sortedAndFilteredCards.length;
  const setOwnedCards = sortedAndFilteredCards.filter((c) => isCardOwned(c.id)).length;
  const progressPercent = setTotalCards > 0 ? Math.round((setOwnedCards / setTotalCards) * 100) : 0;

  // Custom Mode Pockets array
  const customPockets = useMemo(() => {
    if (!currentCustomBinder || !currentCustomPageData) return [];
    const size = currentCustomBinder.pageSize || binderPageSize || 12;
    const slots = currentCustomPageData.slots || [];
    const result = [];
    for (let i = 0; i < size; i++) {
      const cardId = slots[i];
      if (cardId) {
        const found = cards.find(c => c.id === cardId);
        result.push(found || null);
      } else {
        result.push(null);
      }
    }
    return result;
  }, [currentCustomBinder, currentCustomPageData, cards, binderPageSize]);

  const customTotalPages = currentCustomBinder?.pages?.length || 1;

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6']
    });
  };

  // Drag and drop handlers for custom binder
  const handleDragStart = (e, index) => {
    setDraggedSlotIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedSlotIndex !== null && draggedSlotIndex !== targetIndex && currentCustomBinder) {
      swapSlots(currentCustomBinder.id, customPage, draggedSlotIndex, targetIndex);
      playCardSnapSound();
    }
    setDraggedSlotIndex(null);
  };

  // Filtered cards for CardPickerModal
  const pickerCards = useMemo(() => {
    return cards.filter(c => {
      if (pickerOwnedOnly && !isCardOwned(c.id)) return false;
      if (pickerCategoryFilter !== 'ALL' && c.category !== pickerCategoryFilter) return false;
      if (pickerSearch) {
        const query = pickerSearch.toLowerCase();
        const matchesName = c.name?.toLowerCase().includes(query);
        const matchesId = c.id?.toLowerCase().includes(query);
        const matchesEffect = c.effect?.toLowerCase().includes(query);
        if (!matchesName && !matchesId && !matchesEffect) return false;
      }
      return true;
    });
  }, [cards, pickerSearch, pickerCategoryFilter, pickerOwnedOnly, isCardOwned]);

  // Handle new folder creation
  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    createCustomBinder(newFolderName.trim(), newFolderSize);
    setNewFolderName('');
    setIsNewFolderModalOpen(false);
    setCustomPage(1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-6">
      {/* ========================================================= */}
      {/* 1. MODO DE ARCHIVADOR: OFICIAL VS MIS CARPETAS            */}
      {/* ========================================================= */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div className={`p-1 rounded-2xl border flex items-center gap-1.5 ${
          isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
        }`}>
          <button
            type="button"
            onClick={() => setBinderMode('official')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              binderMode === 'official'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : isDark 
                  ? 'text-neutral-400 hover:text-white' 
                  : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t('binderModeOfficial')}</span>
          </button>

          <button
            type="button"
            onClick={() => setBinderMode('custom')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              binderMode === 'custom'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : isDark 
                  ? 'text-neutral-400 hover:text-white' 
                  : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <FolderHeart className="w-4 h-4" />
            <span>{t('binderModeCustom')}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-mono bg-neutral-800 text-amber-400 border border-neutral-700">
              {customBinders.length}
            </span>
          </button>
        </div>

        {/* Pocket Size Toggle (9 vs 12) */}
        <div className={`flex items-center border rounded-xl p-1 text-xs shrink-0 whitespace-nowrap ${
          isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
        }`}>
          <span className="text-neutral-500 px-2 font-medium whitespace-nowrap text-[11px] sm:text-xs shrink-0">
            {t('binderPockets')}
          </span>
          <button
            type="button"
            onClick={() => { setBinderPageSize(9); setCurrentPage(1); }}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer whitespace-nowrap ${
              binderPageSize === 9 
                ? 'bg-amber-500 text-neutral-950 shadow' 
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            9 (3x3)
          </button>
          <button
            type="button"
            onClick={() => { setBinderPageSize(12); setCurrentPage(1); }}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer whitespace-nowrap ${
              binderPageSize === 12 
                ? 'bg-amber-500 text-neutral-950 shadow' 
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            12 (4x3)
          </button>
        </div>

        {/* Botón de Sonidos Inmersivos (Web Audio API) */}
        <button
          type="button"
          onClick={() => {
            const next = toggleSound();
            setSoundActive(next);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer shrink-0 ${
            soundActive
              ? isDark 
                ? 'bg-neutral-900 border-neutral-800 text-amber-400 hover:bg-neutral-800' 
                : 'bg-white border-neutral-200 text-amber-600 hover:bg-neutral-50 shadow-xs'
              : isDark
                ? 'bg-neutral-950 border-neutral-800 text-neutral-500 hover:text-neutral-300'
                : 'bg-neutral-100 border-neutral-300 text-neutral-400 hover:text-neutral-600'
          }`}
          title={soundActive ? 'Silenciar sonidos del archivador' : 'Activar sonidos del archivador'}
        >
          {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline text-[11px] font-medium">
            {soundActive ? 'Sonido ON' : 'Sonido OFF'}
          </span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* 2. BARRA DE CONTROLES SEGÚN EL MODO                       */}
      {/* ========================================================= */}
      {binderMode === 'official' ? (
        /* MODO OFICIAL: SELECTOR DE EXPANSIÓN (CON 'TODAS') Y ORDENACIÓN */
        <div className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4 mb-6 p-3.5 sm:p-4 rounded-2xl backdrop-blur-md border ${
          isDark ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white/90 border-neutral-200 shadow-md'
        }`}>
          {/* Expansiones (Incluye 'TODAS') */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-xs uppercase font-bold text-neutral-400 mr-0.5 sm:mr-1 flex items-center gap-1.5 whitespace-nowrap shrink-0">
              <Layers className="w-4 h-4 text-amber-500" />
              {t('binderExpansion')}
            </span>

            {/* Botón TODAS LAS EXPANSIONES */}
            <button
              type="button"
              onClick={() => { setSelectedSet('ALL'); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                selectedSet === 'ALL'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : isDark 
                    ? 'bg-neutral-950 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                    : 'bg-neutral-100 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200 border border-neutral-300'
              }`}
            >
              TODAS <span className="opacity-75 font-normal">({cards.length})</span>
            </button>

            {/* Expansiones Individuales */}
            {SETS.filter(s => s.id !== 'ALL').map((set) => (
              <button
                key={set.id}
                type="button"
                onClick={() => {
                  setSelectedSet(set.id);
                  setCurrentPage(1);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
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

          {/* Ordenación & Paginación (Fijo en una sola línea horizontal) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-nowrap">
            {/* Selector de Ordenación */}
            <div className={`flex items-center gap-1.5 border rounded-xl px-2.5 py-1 text-xs shrink-0 whitespace-nowrap ${
              isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-100 border-neutral-300'
            }`}>
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                className={`bg-transparent text-xs font-semibold focus:outline-none cursor-pointer ${
                  isDark ? 'text-neutral-200' : 'text-neutral-800'
                }`}
              >
                <option value="id" className={isDark ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'}>{t('binderSortId')}</option>
                <option value="category" className={isDark ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'}>{t('binderSortCategory')}</option>
                <option value="rarity" className={isDark ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'}>{t('binderSortRarity')}</option>
                <option value="color" className={isDark ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'}>{t('binderSortColor')}</option>
                <option value="cost_desc" className={isDark ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'}>{t('binderSortCost')} (Max ↓)</option>
                <option value="cost_asc" className={isDark ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'}>{t('binderSortCost')} (Min ↑)</option>
                <option value="power_desc" className={isDark ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'}>{t('binderSortPower')} (Max ↓)</option>
              </select>
            </div>

            {/* Quick Page Nav Buttons */}
            <div className={`flex items-center gap-1 sm:gap-1.5 border rounded-xl px-2 py-1 shrink-0 whitespace-nowrap ${
              isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-100 border-neutral-300'
            }`}>
              <button
                type="button"
                onClick={() => {
                  setCurrentPage(p => Math.max(1, p - 1));
                  playPageFlipSound();
                }}
                disabled={currentPage === 1}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 disabled:opacity-30 transition cursor-pointer"
                title={t('binderPrevPage')}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <span className={`text-xs font-mono font-bold px-1.5 whitespace-nowrap shrink-0 min-w-[72px] text-center select-none ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                {t('binderPage')} {currentPage} / {officialTotalPages}
              </span>
              <button
                type="button"
                onClick={() => {
                  setCurrentPage(p => Math.min(officialTotalPages, p + 1));
                  playPageFlipSound();
                }}
                disabled={currentPage === officialTotalPages}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 disabled:opacity-30 transition cursor-pointer"
                title={t('binderNextPage')}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* MODO CARPETAS PERSONALIZADAS: GESTIÓN DE CARPETAS & PÁGINAS */
        <div className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4 mb-6 p-3.5 sm:p-4 rounded-2xl backdrop-blur-md border ${
          isDark ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white/90 border-neutral-200 shadow-md'
        }`}>
          {/* Selector de Carpetas y Botón Nueva Carpeta */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase font-bold text-neutral-400 mr-1 flex items-center gap-1.5">
              <Folder className="w-4 h-4 text-amber-500" />
              Carpeta:
            </span>

            {/* Pestañas de Carpetas */}
            {customBinders.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  setActiveBinderId(b.id);
                  setCustomPage(1);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  activeBinderId === b.id
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                    : isDark
                      ? 'bg-neutral-950 text-neutral-300 hover:text-white border border-neutral-800'
                      : 'bg-neutral-100 text-neutral-700 hover:text-neutral-900 border border-neutral-300'
                }`}
              >
                <span>{b.name}</span>
                <span className="opacity-75 font-mono text-[11px]">({b.pages?.length || 1} pág.)</span>
              </button>
            ))}

            {/* Botón Crear Nueva Carpeta */}
            <button
              type="button"
              onClick={() => setIsNewFolderModalOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border border-dashed border-amber-500/60 text-amber-500 hover:bg-amber-500/10 transition cursor-pointer"
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>{t('binderNewFolder')}</span>
            </button>

            {/* Eliminar carpeta actual (si hay más de 1) */}
            {customBinders.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`¿Seguro que deseas eliminar la carpeta "${currentCustomBinder?.name}"?`)) {
                    deleteCustomBinder(currentCustomBinder.id);
                    setCustomPage(1);
                  }
                }}
                className="p-1.5 rounded-xl border border-neutral-800 hover:bg-rose-950/30 text-rose-400 transition cursor-pointer"
                title={t('binderDeleteFolder')}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Gestión de Páginas en la Carpeta Actual (Fijo en una sola línea horizontal) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-nowrap">
            {/* Botón Añadir Página a la Carpeta */}
            <button
              type="button"
              onClick={() => {
                addPageToBinder(currentCustomBinder.id);
                setCustomPage(customTotalPages + 1);
                playPageFlipSound();
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-amber-400 border border-neutral-700 transition cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t('binderAddPage')}</span>
            </button>

            {/* Botón Eliminar Página actual si tiene más de 1 */}
            {customTotalPages > 1 && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`¿Eliminar la página ${customPage} de este álbum?`)) {
                    deletePageFromBinder(currentCustomBinder.id, customPage);
                    setCustomPage(p => Math.max(1, p - 1));
                    playPageFlipSound();
                  }
                }}
                className="p-1.5 rounded-xl border border-neutral-800 hover:bg-rose-950/30 text-rose-400 transition cursor-pointer"
                title={t('binderDeletePage')}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Paginador de Carpeta Personalizada */}
            <div className={`flex items-center gap-1 sm:gap-1.5 border rounded-xl px-2 py-1 shrink-0 whitespace-nowrap ${
              isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-100 border-neutral-300'
            }`}>
              <button
                type="button"
                onClick={() => {
                  setCustomPage(p => Math.max(1, p - 1));
                  playPageFlipSound();
                }}
                disabled={customPage === 1}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 disabled:opacity-30 transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <span className={`text-xs font-mono font-bold px-1.5 whitespace-nowrap shrink-0 min-w-[72px] text-center select-none ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                {t('binderPage')} {customPage} / {customTotalPages}
              </span>
              <button
                type="button"
                onClick={() => {
                  setCustomPage(p => Math.min(customTotalPages, p + 1));
                  playPageFlipSound();
                }}
                disabled={customPage === customTotalPages}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 disabled:opacity-30 transition cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar (Visible en Modo Oficial) */}
      {binderMode === 'official' && (
        <div className={`mb-6 p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg ${
          isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {t('binderProgressTitle')} — {selectedSet === 'ALL' ? 'Todas las Expansiones' : SETS.find(s => s.id === selectedSet)?.name || selectedSet}
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
      )}

      {/* ========================================================= */}
      {/* 3. EL ARCHIVADOR VAULT X (PIEL, PESPUNTES & PÁGINAS)       */}
      {/* ========================================================= */}
      <div className={`relative rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl border-4 ${
        isDark 
          ? 'binder-leather border-neutral-900' 
          : 'binder-leather-light border-neutral-300 shadow-neutral-400/30'
      }`}>
        {/* Pespuntes Dorados (Vault X signature) */}
        <div className={`absolute inset-2 sm:inset-4 rounded-2xl pointer-events-none ${
          isDark ? 'binder-stitching' : 'binder-stitching-light'
        }`} />

        {/* Lomo Central del Archivador */}
        <div className={`hidden lg:block absolute top-6 bottom-6 left-1/2 w-3 -translate-x-1/2 rounded-sm pointer-events-none opacity-40 ${
          isDark ? 'binder-spine' : 'binder-spine-light'
        }`} />

        {/* BINDER HEADER PLATE (Limpio: sin "official portfolio" ni "acid-free") */}
        <div className="relative z-10 flex items-center justify-between mb-6 pb-4 border-b border-neutral-800/80">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500" />
            <span className={`font-mono text-xs uppercase tracking-widest font-black ${
              isDark ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              VAULT X • ONE PIECE
            </span>
          </div>

          <div className="text-xs text-neutral-400 font-mono flex items-center gap-2">
            <span className="font-bold text-amber-500">
              {binderMode === 'official' ? (selectedSet === 'ALL' ? 'Todas' : selectedSet) : currentCustomBinder?.name}
            </span>
            <span>•</span>
            <span>{binderPageSize} {t('binderPockets')}</span>
            <span>•</span>
            <span>Pág. {binderMode === 'official' ? currentPage : customPage} de {binderMode === 'official' ? officialTotalPages : customTotalPages}</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. GRILLA DE BOLSILLOS (POCKETS GRID)                     */}
        {/* ========================================================= */}
        <div 
          className={`relative z-10 grid gap-3 sm:gap-4 md:gap-5 ${
            binderPageSize === 9 
              ? 'grid-cols-2 sm:grid-cols-3' 
              : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
          }`}
        >
          {/* MODO OFICIAL: RENDER DE POCKETS POR CHECKLIST */}
          {binderMode === 'official' && officialPockets.map((card, index) => {
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
            const isFoil = card.rarity === 'SEC' || card.rarity === 'SP' || card.isAltArt;

            return (
              <div
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className={`group relative aspect-[2.5/3.5] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:z-20 ${
                  isDark ? 'card-sleeve' : 'card-sleeve-light'
                }`}
              >
                {/* Holographic foil shine */}
                {owned && isFoil && <div className="holo-shine pointer-events-none" />}

                {/* Card Artwork */}
                <img
                  src={card.image}
                  alt={card.name}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover rounded-lg transition-all duration-300 ${
                    owned 
                      ? 'filter drop-shadow-md' 
                      : 'grayscale opacity-30 contrast-75 brightness-75'
                  }`}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/400x560/1a1a24/ffffff?text=${encodeURIComponent(card.id + '\n' + card.name)}`;
                  }}
                />

                {/* Copies badge */}
                {owned && count > 1 && (
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-amber-500 text-neutral-950 font-bold text-[11px] shadow">
                    x{count}
                  </div>
                )}

                {/* Missing Stamp */}
                {!owned && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center pointer-events-none">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-950/80 text-rose-300 border border-rose-800 shadow-lg">
                      {t('binderMissing')}
                    </span>
                    <span className="text-xs font-bold text-white mt-2 drop-shadow">
                      {card.name}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {card.id}
                    </span>
                  </div>
                )}

                {/* Quick Hover Controls */}
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addCard(card.id);
                    }}
                    className="p-1 rounded-md bg-amber-500 hover:bg-amber-400 text-neutral-950 transition cursor-pointer"
                    title={t('binderAddOwned')}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(card.id);
                    }}
                    className={`p-1 rounded-md transition cursor-pointer ${
                      wishlisted 
                        ? 'bg-amber-500 text-neutral-950' 
                        : 'bg-neutral-800 text-neutral-300 hover:text-white'
                    }`}
                    title={t('binderToggleWishlist')}
                  >
                    <Star className={`w-3.5 h-3.5 ${wishlisted ? 'fill-neutral-950' : ''}`} />
                  </button>

                  <a
                    href={`${CARDTRADER_BASE_URL}${encodeURIComponent(card.cardtraderSearch || card.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded-md bg-neutral-800 hover:bg-blue-600 text-neutral-300 hover:text-white transition"
                    title={t('binderCheckCardTrader')}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}

          {/* MODO CARPETAS PERSONALIZADAS: CADA BOLSILLO ES LIBRE Y EDITABLE */}
          {binderMode === 'custom' && customPockets.map((card, index) => {
            // Bolsillo vacío en la carpeta personalizada
            if (!card) {
              return (
                <div
                  key={`custom-slot-${index}`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`aspect-[2.5/3.5] rounded-xl border border-dashed flex flex-col items-center justify-center p-3 text-center transition select-none group ${
                    isDark 
                      ? 'card-sleeve border-neutral-800/80 hover:border-amber-500/60 bg-neutral-950/40' 
                      : 'card-sleeve-light border-neutral-300 hover:border-amber-500/60 bg-white/40'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full border border-dashed border-neutral-500 flex items-center justify-center text-xs font-mono text-neutral-400 mb-2">
                    {index + 1}
                  </div>
                  <button
                    type="button"
                    onClick={() => setCardPickerSlot({ pageNumber: customPage, slotIndex: index })}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-neutral-950 border border-amber-500/30 transition shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t('binderPlaceCard')}</span>
                  </button>
                </div>
              );
            }

            // Bolsillo con carta colocada por el usuario
            const isFoil = card.rarity === 'SEC' || card.rarity === 'SP' || card.isAltArt;

            return (
              <div
                key={`custom-slot-${index}-${card.id}`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onClick={() => setSelectedCard(card)}
                className={`group relative aspect-[2.5/3.5] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:z-20 ${
                  isDark ? 'card-sleeve' : 'card-sleeve-light'
                }`}
              >
                {/* Holographic foil shine */}
                {isFoil && <div className="holo-shine pointer-events-none" />}

                {/* Card Artwork */}
                <img
                  src={card.image}
                  alt={card.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-lg filter drop-shadow-md"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/400x560/1a1a24/ffffff?text=${encodeURIComponent(card.id + '\n' + card.name)}`;
                  }}
                />

                {/* Slot Number Badge */}
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-black/70 text-amber-400 font-mono text-[10px] font-bold flex items-center gap-1 backdrop-blur-sm">
                  <GripHorizontal className="w-3 h-3 text-neutral-400" />
                  #{index + 1}
                </div>

                {/* Hover Actions: Cambiar carta o Quitar del bolsillo */}
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCardPickerSlot({ pageNumber: customPage, slotIndex: index });
                    }}
                    className="px-2 py-1 rounded-md text-[10px] font-bold bg-amber-500 text-neutral-950 hover:bg-amber-400 transition cursor-pointer"
                  >
                    Cambiar
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSlotCard(currentCustomBinder.id, customPage, index);
                    }}
                    className="p-1 rounded-md bg-rose-950/80 hover:bg-rose-600 text-rose-300 hover:text-white transition cursor-pointer"
                    title={t('binderRemoveFromSlot')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. MODAL: CREAR NUEVA CARPETA                             */}
      {/* ========================================================= */}
      {isNewFolderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-md rounded-2xl border p-5 shadow-2xl ${
            isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <FolderPlus className="w-4 h-4 text-amber-500" />
                {t('binderCreateFolder')}
              </h3>
              <button
                type="button"
                onClick={() => setIsNewFolderModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateFolder} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5">
                  {t('binderFolderName')}
                </label>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Ej: Mis Luffys & Zoros / Yonkos / Cartas DON!!"
                  maxLength={40}
                  autoFocus
                  required
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none ${
                    isDark 
                      ? 'bg-neutral-950 border-neutral-700 text-white focus:border-amber-500' 
                      : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-amber-500'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">
                  Tamaño de Bolsillos por Página:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewFolderSize(9)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      newFolderSize === 9 
                        ? 'bg-amber-500 text-neutral-950 border-amber-500' 
                        : isDark ? 'border-neutral-800 text-neutral-400' : 'border-neutral-300 text-neutral-600'
                    }`}
                  >
                    9 Bolsillos (3x3)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewFolderSize(12)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      newFolderSize === 12 
                        ? 'bg-amber-500 text-neutral-950 border-amber-500' 
                        : isDark ? 'border-neutral-800 text-neutral-400' : 'border-neutral-300 text-neutral-600'
                    }`}
                  >
                    12 Bolsillos (4x3)
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewFolderModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-neutral-700 text-neutral-300 hover:bg-neutral-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 text-neutral-950 hover:bg-amber-400 transition cursor-pointer shadow-md"
                >
                  {t('binderCreateFolder')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. MODAL: SELECCIONAR CARTA PARA EL BOLSILLO              */}
      {/* ========================================================= */}
      {cardPickerSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className={`w-full max-w-3xl max-h-[85vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
            isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
          }`}>
            {/* Header del Modal */}
            <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  {t('binderSelectCardModal')} (Bolsillo #{cardPickerSlot.slotIndex + 1})
                </h3>
                <p className="text-xs text-neutral-400">
                  Haz clic en cualquier carta para colocarla en este bolsillo de tu álbum
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCardPickerSlot(null)}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filtros y Buscador */}
            <div className={`p-3 sm:p-4 border-b space-y-2.5 ${isDark ? 'border-neutral-800 bg-neutral-950/40' : 'border-neutral-200 bg-neutral-50'}`}>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={pickerSearch}
                    onChange={(e) => setPickerSearch(e.target.value)}
                    placeholder={t('binderSearchCardsModal')}
                    className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs focus:outline-none ${
                      isDark ? 'bg-neutral-900 border-neutral-700 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                    }`}
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setPickerOwnedOnly(!pickerOwnedOnly)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                      pickerOwnedOnly
                        ? 'bg-amber-500 text-neutral-950'
                        : isDark ? 'bg-neutral-900 border border-neutral-700 text-neutral-400' : 'bg-white border border-neutral-300 text-neutral-700'
                    }`}
                  >
                    Solo en Colección
                  </button>

                  <select
                    value={pickerCategoryFilter}
                    onChange={(e) => setPickerCategoryFilter(e.target.value)}
                    className={`px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none cursor-pointer ${
                      isDark ? 'bg-neutral-900 border-neutral-700 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                    }`}
                  >
                    <option value="ALL">Todas las Categorías</option>
                    <option value="Leader">Leader</option>
                    <option value="Character">Character</option>
                    <option value="Event">Event</option>
                    <option value="DON!!">DON!! Card</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Cuadrícula de Cartas para Elegir */}
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {pickerCards.map((card) => (
                <div
                  key={`picker-card-${card.id}`}
                  onClick={() => {
                    setSlotCard(currentCustomBinder.id, cardPickerSlot.pageNumber, cardPickerSlot.slotIndex, card.id);
                    playCardSnapSound();
                    setCardPickerSlot(null);
                  }}
                  className={`group relative aspect-[2.5/3.5] rounded-xl overflow-hidden border cursor-pointer transition-all duration-200 hover:scale-105 hover:border-amber-500 shadow-md ${
                    isDark ? 'border-neutral-800 bg-neutral-950' : 'border-neutral-200 bg-white'
                  }`}
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/400x560/1a1a24/ffffff?text=${encodeURIComponent(card.id + '\n' + card.name)}`;
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-1.5 bg-black/80 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold text-amber-400 block truncate">
                      {card.name}
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400">
                      {card.id}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer con opción de Vaciar */}
            <div className={`p-3.5 border-t flex items-center justify-between ${
              isDark ? 'border-neutral-800 bg-neutral-950/60' : 'border-neutral-200 bg-neutral-50'
            }`}>
              <button
                type="button"
                onClick={() => {
                  removeSlotCard(currentCustomBinder.id, cardPickerSlot.pageNumber, cardPickerSlot.slotIndex);
                  setCardPickerSlot(null);
                }}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Dejar este bolsillo vacío</span>
              </button>

              <button
                type="button"
                onClick={() => setCardPickerSlot(null)}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold border border-neutral-700 text-neutral-300 hover:bg-neutral-800 cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
