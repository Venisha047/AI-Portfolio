
import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Recipe } from '../types';

interface AppState {
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  isInQueue: (id: string) => boolean;
  toggleQueue: (id: string) => void;
  addRecipes: (recipes: Recipe[]) => void;
  updateRecipe: (updatedRecipe: Recipe) => void;
  getFavoriteRecipes: () => Recipe[];
  getQueuedRecipes: () => Recipe[];
  reorderQueue: (startIndex: number, endIndex: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCaffeine: string;
  setSelectedCaffeine: (caffeine: string) => void;
  selectedDiets: string[];
  setSelectedDiets: React.Dispatch<React.SetStateAction<string[]>>;
  clearFilters: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

// Utility to provide haptic feedback on supported devices
const triggerHapticFeedback = () => {
  // FIX: Add check for navigator to prevent errors in non-browser environments.
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(50); // A short, crisp vibration for button presses
  }
};

// Helper function to safely get item from localStorage
const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading from localStorage key “${key}”:`, error);
    return defaultValue;
  }
};

// Helper function to safely set item in localStorage
const setInStorage = <T,>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error setting localStorage key “${key}”:`, error);
  }
};


export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<{ [id: string]: Recipe }>({});
  
  const [favorites, setFavorites] = useState<string[]>(() => getFromStorage('brew-muse-favorites', []));
  const [toTryQueue, setToTryQueue] = useState<string[]>(() => getFromStorage('brew-muse-queue', []));
  
  const [searchQuery, setSearchQuery] = useState<string>(() => getFromStorage('brew-muse-searchQuery', ''));
  const [selectedTags, setSelectedTags] = useState<string[]>(() => getFromStorage('brew-muse-selectedTags', []));
  const [selectedCaffeine, setSelectedCaffeine] = useState<string>(() => getFromStorage('brew-muse-selectedCaffeine', 'ANY'));
  const [selectedDiets, setSelectedDiets] = useState<string[]>(() => getFromStorage('brew-muse-selectedDiets', []));

  useEffect(() => {
    setInStorage('brew-muse-favorites', favorites);
  }, [favorites]);
  
  useEffect(() => {
    setInStorage('brew-muse-queue', toTryQueue);
  }, [toTryQueue]);
  
  useEffect(() => {
    setInStorage('brew-muse-searchQuery', searchQuery);
  }, [searchQuery]);
  
  useEffect(() => {
    setInStorage('brew-muse-selectedTags', selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    setInStorage('brew-muse-selectedCaffeine', selectedCaffeine);
  }, [selectedCaffeine]);

  useEffect(() => {
    setInStorage('brew-muse-selectedDiets', selectedDiets);
  }, [selectedDiets]);


  const addRecipes = useCallback((newRecipes: Recipe[]) => {
    setRecipes(prev => {
      const updatedRecipes = { ...prev };
      newRecipes.forEach(recipe => {
        if (recipe && recipe.id && !updatedRecipes[recipe.id]) {
          updatedRecipes[recipe.id] = recipe;
        }
      });
      return updatedRecipes;
    });
  }, []);
  
  const updateRecipe = useCallback((updatedRecipe: Recipe) => {
    setRecipes(prev => {
      if (prev[updatedRecipe.id]) {
        return {
          ...prev,
          [updatedRecipe.id]: updatedRecipe
        };
      }
      return prev;
    });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    triggerHapticFeedback();
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  }, []);

  const toggleQueue = useCallback((id: string) => {
    triggerHapticFeedback();
    setToTryQueue(prev =>
      prev.includes(id) ? prev.filter(queueId => queueId !== id) : [...prev, id]
    );
  }, []);

  const reorderQueue = useCallback((startIndex: number, endIndex: number) => {
    setToTryQueue(prevQueue => {
      const result = Array.from(prevQueue);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedCaffeine('ANY');
    setSelectedDiets([]);
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);
  const isInQueue = useCallback((id: string) => toTryQueue.includes(id), [toTryQueue]);

  const getFavoriteRecipes = useCallback(() => {
    return favorites.map(id => recipes[id]).filter((r): r is Recipe => r !== undefined);
  }, [favorites, recipes]);
  
  const getQueuedRecipes = useCallback(() => {
    return toTryQueue.map(id => recipes[id]).filter((r): r is Recipe => r !== undefined);
  }, [toTryQueue, recipes]);

  const value: AppState = {
    isFavorite,
    toggleFavorite,
    isInQueue,
    toggleQueue,
    addRecipes,
    updateRecipe,
    getFavoriteRecipes,
    getQueuedRecipes,
    reorderQueue,
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    selectedCaffeine,
    setSelectedCaffeine,
    selectedDiets,
    setSelectedDiets,
    clearFilters,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppStore = (): AppState => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};
