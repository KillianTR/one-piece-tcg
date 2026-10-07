import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INITIAL_CARDS } from '../data/mockCards';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from './AuthContext';

const CollectionContext = createContext();

const LOCAL_STORAGE_KEY = 'one_piece_vault_collection_v0.2.0';
const CUSTOM_BINDERS_STORAGE_KEY = 'one_piece_vault_custom_binders_v1';

export const DEFAULT_CUSTOM_BINDERS = [
  {
    id: 'vault-custom-1',
    name: 'Mi Álbum Vault X (480 bolsillos)',
    description: 'Organización libre por páginas y bolsillos',
    pageSize: 12,
    pages: [
      {
        pageNumber: 1,
        // Fila 1: 4 Luffys! Fila 2: 4 Zoros! Fila 3: Sanji, Jinbe, Chopper, Nami!
        slots: [
          'OP01-004', 'ST01-001', 'OP05-060', 'OP05-060-MANGA',
          'OP01-001', 'OP01-025', 'OP01-026', 'OP01-001',
          'ST01-004', 'OP01-005', 'ST01-012', 'OP01-016'
        ]
      },
      {
        pageNumber: 2,
        // Página 2: Yonkos y Marines
        slots: [
          'OP09-118', 'OP01-120', 'OP01-094', 'OP09-001',
          'OP02-099', 'OP02-114', 'OP09-051', null,
          'DON-001', 'DON-002', null, null
        ]
      }
    ]
  }
];

export function CollectionProvider({ children }) {
  const { user } = useAuth();

  // Cards catalog (starts with INITIAL_CARDS, can load from Supabase)
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [selectedCard, setSelectedCard] = useState(null);
  const [binderPageSize, setBinderPageSize] = useState(9); // 9 for 3x3, 12 for 4x3
  const [isCloudSynced, setIsCloudSynced] = useState(false);
  const [isLoadingCollection, setIsLoadingCollection] = useState(false);

  // Custom Binders System (Folders)
  const [customBinders, setCustomBinders] = useState(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_BINDERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading custom binders from localStorage', e);
    }
    return DEFAULT_CUSTOM_BINDERS;
  });

  const [activeBinderId, setActiveBinderId] = useState(() => {
    return customBinders[0]?.id || 'vault-custom-1';
  });

  // Save custom binders to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_BINDERS_STORAGE_KEY, JSON.stringify(customBinders));
    } catch (e) {
      console.error('Error saving custom binders to localStorage', e);
    }
  }, [customBinders]);

  // Custom binder helper functions
  const createCustomBinder = (name, pageSize = 12) => {
    const newBinder = {
      id: `binder-${Date.now()}`,
      name: name || 'Nueva Carpeta Vault',
      pageSize: pageSize || 12,
      pages: [
        {
          pageNumber: 1,
          slots: Array(pageSize || 12).fill(null)
        }
      ]
    };
    setCustomBinders((prev) => [...prev, newBinder]);
    setActiveBinderId(newBinder.id);
    return newBinder;
  };

  const deleteCustomBinder = (binderId) => {
    setCustomBinders((prev) => {
      const filtered = prev.filter((b) => b.id !== binderId);
      if (filtered.length === 0) return DEFAULT_CUSTOM_BINDERS;
      return filtered;
    });
    if (activeBinderId === binderId) {
      const remaining = customBinders.filter((b) => b.id !== binderId);
      setActiveBinderId(remaining[0]?.id || DEFAULT_CUSTOM_BINDERS[0].id);
    }
  };

  const addPageToBinder = (binderId) => {
    setCustomBinders((prev) =>
      prev.map((b) => {
        if (b.id !== binderId) return b;
        const newPageNum = (b.pages?.length || 0) + 1;
        const newPage = {
          pageNumber: newPageNum,
          slots: Array(b.pageSize || binderPageSize || 12).fill(null)
        };
        return {
          ...b,
          pages: [...(b.pages || []), newPage]
        };
      })
    );
  };

  const deletePageFromBinder = (binderId, pageNumber) => {
    setCustomBinders((prev) =>
      prev.map((b) => {
        if (b.id !== binderId || (b.pages?.length || 0) <= 1) return b;
        const updatedPages = b.pages
          .filter((p) => p.pageNumber !== pageNumber)
          .map((p, idx) => ({ ...p, pageNumber: idx + 1 }));
        return { ...b, pages: updatedPages };
      })
    );
  };

  const setSlotCard = (binderId, pageNumber, slotIndex, cardId) => {
    setCustomBinders((prev) =>
      prev.map((b) => {
        if (b.id !== binderId) return b;
        const updatedPages = b.pages.map((p) => {
          if (p.pageNumber !== pageNumber) return p;
          const newSlots = [...(p.slots || Array(b.pageSize || 12).fill(null))];
          newSlots[slotIndex] = cardId;
          return { ...p, slots: newSlots };
        });
        return { ...b, pages: updatedPages };
      })
    );
  };

  const removeSlotCard = (binderId, pageNumber, slotIndex) => {
    setSlotCard(binderId, pageNumber, slotIndex, null);
  };

  const swapSlots = (binderId, pageNumber, fromIndex, toIndex) => {
    setCustomBinders((prev) =>
      prev.map((b) => {
        if (b.id !== binderId) return b;
        const updatedPages = b.pages.map((p) => {
          if (p.pageNumber !== pageNumber) return p;
          const newSlots = [...(p.slots || Array(b.pageSize || 12).fill(null))];
          const temp = newSlots[fromIndex];
          newSlots[fromIndex] = newSlots[toIndex];
          newSlots[toIndex] = temp;
          return { ...p, slots: newSlots };
        });
        return { ...b, pages: updatedPages };
      })
    );
  };

  // Local guest collection state
  const [collection, setCollection] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading local storage collection', e);
    }
    return {
      'OP01-001': { count: 1, isWishlist: false },
      'OP01-016': { count: 4, isWishlist: false },
      'OP01-025': { count: 2, isWishlist: false },
      'OP05-060': { count: 1, isWishlist: false },
      'ST01-012': { count: 4, isWishlist: false },
      'OP05-060-MANGA': { count: 0, isWishlist: true },
      'OP09-118': { count: 0, isWishlist: true },
    };
  });

  // Fetch cards from Supabase cards table if available
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    const fetchCatalog = async () => {
      try {
        const { data, error } = await supabase.from('cards').select('*');
        if (!error && data && data.length > 0) {
          const mappedCards = data.map((c) => ({
            id: c.id,
            set: c.set_id,
            name: c.name,
            title: c.title,
            category: c.category,
            color: c.color,
            type: c.card_type,
            cost: c.cost,
            life: c.life,
            power: c.power,
            counter: c.counter,
            rarity: c.rarity,
            effect: c.effect,
            attribute: c.attribute,
            image: c.image_url,
            isAltArt: c.is_alt_art,
            cardtraderSearch: c.cardtrader_search,
            marketPriceEstimated: parseFloat(c.estimated_price || 0),
          }));
          setCards(mappedCards);
        }
      } catch (err) {
        console.warn('Using local cards catalog', err);
      }
    };

    fetchCatalog();
  }, []);

  // Sync user_collections when user logs in
  useEffect(() => {
    if (!user || !supabase) {
      setIsCloudSynced(false);
      return;
    }

    const loadUserCloudCollection = async () => {
      setIsLoadingCollection(true);
      try {
        const { data, error } = await supabase
          .from('user_collections')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error loading cloud collection', error);
          return;
        }

        const cloudMap = {};
        if (data && data.length > 0) {
          data.forEach((row) => {
            cloudMap[row.card_id] = {
              count: row.quantity || 0,
              isWishlist: !!row.is_wishlist,
              isFoil: !!row.is_foil,
            };
          });
          setCollection(cloudMap);
        } else {
          // If user has zero cards in cloud but has local guest cards, migrate them!
          const currentLocalCards = Object.entries(collection);
          if (currentLocalCards.length > 0) {
            const rowsToInsert = currentLocalCards.map(([cardId, item]) => ({
              user_id: user.id,
              card_id: cardId,
              quantity: item.count || 0,
              is_wishlist: !!item.isWishlist,
            }));
            await supabase.from('user_collections').upsert(rowsToInsert);
          }
        }
        setIsCloudSynced(true);
      } catch (err) {
        console.error('Failed to load or sync cloud collection', err);
      } finally {
        setIsLoadingCollection(false);
      }
    };

    loadUserCloudCollection();
  }, [user]);

  // Save to localStorage whenever collection changes (for offline/guest backup)
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(collection));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }, [collection]);

  // Sync a single card update to Supabase if authenticated
  const syncCardToCloud = useCallback(
    async (cardId, newCount, isWishlist) => {
      if (!user || !supabase) return;
      try {
        await supabase.from('user_collections').upsert({
          user_id: user.id,
          card_id: cardId,
          quantity: newCount,
          is_wishlist: isWishlist,
          updated_at: new Date().toISOString(),
        });
      } catch (e) {
        console.error('Cloud sync error for card', cardId, e);
      }
    },
    [user]
  );

  // Actions
  const addCard = (cardId, amount = 1) => {
    setCollection((prev) => {
      const current = prev[cardId] || { count: 0, isWishlist: false };
      const newCount = current.count + amount;
      const isWishlist = newCount > 0 ? false : current.isWishlist;
      syncCardToCloud(cardId, newCount, isWishlist);
      return {
        ...prev,
        [cardId]: {
          ...current,
          count: newCount,
          isWishlist,
        },
      };
    });
  };

  const removeCard = (cardId, amount = 1) => {
    setCollection((prev) => {
      const current = prev[cardId];
      if (!current || current.count <= 0) return prev;
      const newCount = Math.max(0, current.count - amount);
      syncCardToCloud(cardId, newCount, current.isWishlist);
      return {
        ...prev,
        [cardId]: {
          ...current,
          count: newCount,
        },
      };
    });
  };

  const toggleWishlist = (cardId) => {
    setCollection((prev) => {
      const current = prev[cardId] || { count: 0, isWishlist: false };
      const nextWishlist = !current.isWishlist;
      syncCardToCloud(cardId, current.count, nextWishlist);
      return {
        ...prev,
        [cardId]: {
          ...current,
          isWishlist: nextWishlist,
        },
      };
    });
  };

  const isCardOwned = (cardId) => {
    return (collection[cardId]?.count || 0) > 0;
  };

  const getCardCount = (cardId) => {
    return collection[cardId]?.count || 0;
  };

  const isCardWishlisted = (cardId) => {
    return !!collection[cardId]?.isWishlist;
  };

  // Stats calculation
  const totalCardsOwned = Object.values(collection).reduce((acc, curr) => acc + (curr.count || 0), 0);
  const uniqueCardsOwned = Object.values(collection).filter((curr) => (curr.count || 0) > 0).length;
  const totalWishlisted = Object.values(collection).filter((curr) => curr.isWishlist).length;

  return (
    <CollectionContext.Provider
      value={{
        cards,
        collection,
        selectedCard,
        setSelectedCard,
        binderPageSize,
        setBinderPageSize,
        addCard,
        removeCard,
        toggleWishlist,
        isCardOwned,
        getCardCount,
        isCardWishlisted,
        totalCardsOwned,
        uniqueCardsOwned,
        totalWishlisted,
        isCloudSynced,
        isLoadingCollection,
        customBinders,
        setCustomBinders,
        activeBinderId,
        setActiveBinderId,
        createCustomBinder,
        deleteCustomBinder,
        addPageToBinder,
        deletePageFromBinder,
        setSlotCard,
        removeSlotCard,
        swapSlots,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollection() {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollection must be used within a CollectionProvider');
  }
  return context;
}
