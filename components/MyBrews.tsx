import React from 'react';
import { useAppStore } from '../hooks/useAppStore';
import { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';

interface MyBrewsProps {
  onSelectRecipe: (recipe: Recipe) => void;
}

const MyBrews: React.FC<MyBrewsProps> = ({ onSelectRecipe }) => {
  const { getFavoriteRecipes } = useAppStore();
  const favoriteRecipes = getFavoriteRecipes();

  return (
    <section className="animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="font-serif text-4xl text-brown-dark">My Favorite Brews</h2>
        <p className="text-secondary-text mt-1">Your hand-picked collection of coffee inspiration.</p>
      </div>

      {favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favoriteRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} onSelect={() => onSelectRecipe(recipe)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white/50 rounded-2xl">
          <span className="text-5xl mb-4 inline-block">⭐</span>
          <p className="text-xl font-bold text-brown">Your favorites list is empty!</p>
          <p className="text-secondary-text mt-2">
            Click the heart icon on any recipe to save it here for later.
          </p>
        </div>
      )}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default MyBrews;