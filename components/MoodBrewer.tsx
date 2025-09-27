

import React, { useState, useCallback } from 'react';
// FIX: Renamed generateRecipesForMood to generateRecipes as it is the exported function
import { generateRecipes, generateImage } from '../services/geminiService';
import { Recipe } from '../types';
// FIX: Changed to named import for RecipeCard
import { RecipeCard } from './RecipeCard';
// FIX: Changed to named import for RecipeModal
import { RecipeModal } from './RecipeModal';
import { LoadingSpinner } from './icons/Icons';
import { useAppStore } from '../hooks/useAppStore';

const MOODS = ['Cozy ☕', 'Energized 🔥', 'Adventurous ✨', 'Focused 🎯'];

const MoodBrewer: React.FC = () => {
  const [suggestedRecipes, setSuggestedRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const { addRecipes, updateRecipe } = useAppStore();

  const handleMoodSelect = useCallback(async (mood: string) => {
    if (navigator.vibrate) navigator.vibrate(50);
    setActiveMood(mood);
    setIsLoading(true);
    setError(null);
    setSuggestedRecipes([]);
    try {
      // FIX: Renamed generateRecipesForMood to generateRecipes
      const recipes = await generateRecipes(mood.split(' ')[0]);
      setSuggestedRecipes(recipes);
      addRecipes(recipes);
      
      // Generate images after recipes are fetched
      recipes.forEach(async (recipe) => {
        try {
          const imageUrl = await generateImage(recipe.imagePrompt);
          const updatedRecipe = { ...recipe, imageUrl };
          setSuggestedRecipes(prev => prev.map(r => r.id === recipe.id ? updatedRecipe : r));
          updateRecipe(updatedRecipe);
        } catch (imgErr) {
          // FIX: Changed recipe.recipeName to recipe.title to match Recipe type
          console.error(`Failed to generate image for ${recipe.title}`, imgErr);
        }
      });

    } catch (err) {
      setError('Could not brew up moods right now. Please try again!  brewing.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [addRecipes, updateRecipe]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-primary">Mood Brewer</h2>
        <p className="text-secondary/80 mt-1">How are you feeling today? Let's find your perfect match.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {MOODS.map(mood => (
          <button
            key={mood}
            onClick={() => handleMoodSelect(mood)}
            disabled={isLoading}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 ease-out disabled:opacity-50 active:scale-95
              ${activeMood === mood 
                ? 'bg-primary text-white shadow-lg scale-105'
                : 'bg-surface/60 hover:bg-primary/10 shadow-md hover:scale-105'
              }`}
          >
            {mood}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center items-center gap-2 text-primary font-semibold">
          <LoadingSpinner />
          <p>Curating vibes...</p>
        </div>
      )}

      {error && <p className="text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
      
      {suggestedRecipes.length > 0 && (
         <div className="columns-1 md:columns-2 lg:columns-3 gap-8 animate-fade-in">
            {suggestedRecipes.map(recipe => (
              <div key={recipe.id} className="mb-8">
                <RecipeCard recipe={recipe} onSelect={() => setSelectedRecipe(recipe)} />
              </div>
            ))}
        </div>
      )}

      {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default MoodBrewer;