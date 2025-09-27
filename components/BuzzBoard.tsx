

import React, { useState, useEffect, useMemo } from 'react';
// FIX: Changed to named import for RecipeCard
import { RecipeCard } from './RecipeCard';
// FIX: Changed to named import for RecipeModal
import { RecipeModal } from './RecipeModal';
import { TRENDING_RECIPES } from '../constants';
import { Recipe } from '../types';
import { useAppStore } from '../hooks/useAppStore';
import { generateImage } from '../services/geminiService';

const BuzzBoard: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>(TRENDING_RECIPES);
  const { addRecipes, updateRecipe } = useAppStore();

  useEffect(() => {
    // Add initial recipes to global store
    addRecipes(TRENDING_RECIPES);
    
    // Generate images for initial recipes
    TRENDING_RECIPES.forEach(async (recipe) => {
      // Don't regenerate if we already have an image (e.g. from hot-reload)
      if (!recipe.imageUrl) { 
        try {
          const imageUrl = await generateImage(recipe.imagePrompt);
          const updatedRecipe = { ...recipe, imageUrl };
          // Update local state for display
          setRecipes(prev => prev.map(r => r.id === recipe.id ? updatedRecipe : r));
          // Update global state for other components
          updateRecipe(updatedRecipe);
        } catch (imgErr) {
          // FIX: Changed recipe.recipeName to recipe.title to match Recipe type
          console.error(`Failed to generate image for ${recipe.title}`, imgErr);
        }
      }
    });
  }, [addRecipes, updateRecipe]);

  const filteredRecipes = useMemo(() => {
    if (!searchQuery.trim()) {
      return recipes;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return recipes.filter(recipe =>
      // FIX: Changed recipe.recipeName to recipe.title to match Recipe type
      recipe.title.toLowerCase().includes(lowercasedQuery) ||
      recipe.description.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery, recipes]);

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-primary">BuzzBoard</h2>
        <p className="text-secondary/80 mt-1">Freshly brewed trends from around the globe.</p>
      </div>

      <div className="mb-8 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search recipes by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 bg-surface/80 backdrop-blur-sm border border-surface/70 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
          aria-label="Search for recipes"
        />
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <div key={recipe.id} className="mb-8">
              <RecipeCard recipe={recipe} onSelect={() => setSelectedRecipe(recipe)} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-secondary/90">No recipes found for "{searchQuery}".</p>
            <p className="text-secondary/70">Try a different search term!</p>
          </div>
        )}
      </div>

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </>
  );
};

export default BuzzBoard;