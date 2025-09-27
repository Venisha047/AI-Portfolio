import React from 'react';
import { RecipeCard } from './RecipeCard';
import { Recipe } from '../types';
import { LoadingSpinner } from './icons';

interface RecipeListProps {
  title: string;
  recipes: Recipe[];
  isLoading: boolean;
  onSelectRecipe: (recipe: Recipe) => void;
  showClearButton?: boolean;
  onClear?: () => void;
  isFiltered?: boolean;
}

export const RecipeList: React.FC<RecipeListProps> = ({ title, recipes, isLoading, onSelectRecipe, showClearButton, onClear, isFiltered }) => {
  return (
    <section className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-3xl text-brown-dark">{title}</h2>
        {showClearButton && (
          <button onClick={onClear} className="text-sm text-secondary-text hover:text-brown underline">
            &times; Back to BuzzBoard
          </button>
        )}
      </div>
      
      {isLoading && (
        <div className="flex justify-center items-center gap-3 text-brown py-10">
          <LoadingSpinner />
          <span>Brewing up ideas...</span>
        </div>
      )}

      {!isLoading && recipes.length === 0 && (
         <div className="text-center py-10 px-4 bg-white/50 rounded-2xl">
          {isFiltered ? (
            <>
              <p className="text-lg font-bold text-brown">No Brews Found</p>
              <p className="text-secondary-text mt-1">Try adjusting your search or filter criteria.</p>
            </>
          ) : (
            <>
              <p className="text-lg font-bold text-brown">No recipes to show... yet!</p>
              <p className="text-secondary-text mt-1">Try selecting a mood or entering some ingredients above.</p>
            </>
          )}
         </div>
      )}

      {!isLoading && recipes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} onSelect={() => onSelectRecipe(recipe)} />
          ))}
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
