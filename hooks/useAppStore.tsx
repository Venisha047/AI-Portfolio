import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
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
}

const AppContext = createContext<AppState | undefined>(undefined);

// Utility to provide haptic feedback on supported devices
const triggerHapticFeedback = () => {
  if (navigator.vibrate) {
    navigator.vibrate(50); // A short, crisp vibration for button presses
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<{ [id: string]: Recipe }>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toTryQueue, setToTryQueue] = useState<string[]>([]);

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

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);
  const isInQueue = useCallback((id: string) => toTryQueue.includes(id), [toTryQueue]);

  const getFavoriteRecipes = useCallback(() => {
    return favorites.map(id => recipes[id]).filter((r): r is Recipe => r !== undefined);
  }, [favorites, recipes]);
  
  const getQueuedRecipes = useCallback(() => {
    return toTryQueue.map(id => recipes[id]).filter((r): r is Recipe => r !== undefined);
  }, [toTryQueue, recipes]);

  const value = {
    isFavorite,
    toggleFavorite,
    isInQueue,
    toggleQueue,
    addRecipes,
    updateRecipe,
    getFavoriteRecipes,
    getQueuedRecipes,
    reorderQueue,
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
