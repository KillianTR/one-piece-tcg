import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CARDS } from '../data/mockCards';

const CollectionContext = createContext();

const STORAGE_KEY = 'one_piece_vault_collection_v0.1.0';

export function CollectionProvider({ children }) {
  // Preload a starter sample collection if empty
  const [collection, setCollection] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading saved collection', e);
    }
    // Default starter collection for demo:
    return {
      'OP01-001': { count: 1, isWishlist: false }, // Zoro Leader
      'OP01-016': { count: 4, isWishlist: false }, // Nami (playset)
      'OP01-025': { count: 2, isWishlist: false }, // Zoro Rush
      'OP05-060': { count: 1, isWishlist: false }, // Gear 5 Luffy
      'ST01-012': { count: 4, isWishlist: false }, // Chopper
      'OP05-060-MANGA': { count: 0, isWishlist: true }, // Wanted Manga Luffy!
      'OP09-118': { count: 0, isWishlist: true }, // Wanted Roger!
    };
  });

  const [cards, setCards] = useState(INITIAL_CARDS);
  const [selectedCard, setSelectedCard] = useState(null);
  const [binderPageSize, setBinderPageSize] = useState(9); // 9 for 3x3 (Vault X standard), 12 for 4x3

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
    } catch (e) {
      console.error('Error saving collection', e);
    }
  }, [collection]);

  // Actions
  const addCard = (cardId, amount = 1) => {
    setCollection((prev) => {
      const current = prev[cardId] || { count: 0, isWishlist: false };
      return {
        ...prev,
        [cardId]: {
          ...current,
          count: current.count + amount,
          // If owned, we can auto-remove from wishlist if desired
          isWishlist: current.count + amount > 0 ? false : current.isWishlist,
        },
      };
    });
  };

  const removeCard = (cardId, amount = 1) => {
    setCollection((prev) => {
      const current = prev[cardId];
      if (!current || current.count <= 0) return prev;
      const newCount = Math.max(0, current.count - amount);
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
      return {
        ...prev,
        [cardId]: {
          ...current,
          isWishlist: !current.isWishlist,
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
