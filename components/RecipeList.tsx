

import React from 'react';
import { RecipeCard } from './RecipeCard';
import { Recipe } from '../types';
import { LoadingSpinner } from './icons';
import { RecipeCardSkeleton } from './RecipeCardSkeleton';

interface RecipeListProps {
  title: string;
  recipes: Recipe[];
  isLoading: boolean;
  onSelectRecipe: (recipe: Recipe) => void;
  showClearButton?: boolean;
  onClear?: () => void;
  isFiltered?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  loadingText?: string;
}

export const RecipeList: React.FC<RecipeListProps> = ({ title, recipes, isLoading, onSelectRecipe, showClearButton, onClear, isFiltered, onLoadMore, isLoadingMore, loadingText }) => {
  return (
    <section className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-3xl text-brown-dark">{title}</h2>
        {showClearButton && (
          <button onClick={onClear} className="text-sm text-secondary-text hover:text-brown underline rounded-md focus:outline-none focus:ring-2 focus:ring-gold">
            &times; Back to BuzzBoard
          </button>
        )}
      </div>
      
      {isLoading && (
        <div>
            <div className="text-center text-brown py-4 mb-4">
                <LoadingSpinner className="mx-auto h-8 w-8" />
                <span className="mt-2 block font-semibold">{loadingText || 'Brewing up ideas...'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(4)].map((_, index) => (
                    <RecipeCardSkeleton key={index} />
                ))}
            </div>
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
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {recipes.map((recipe, index) => (
              <div key={recipe.id} className="recipe-card-wrapper" style={{ animationDelay: `${index * 80}ms` }}>
                <RecipeCard recipe={recipe} onSelect={() => onSelectRecipe(recipe)} />
              </div>
            ))}
          </div>
          
          {onLoadMore && (
            <div className="text-center mt-10">
              <button
                onClick={onLoadMore}
                disabled={isLoadingMore}
                className="bg-brown text-white font-bold py-3 px-8 rounded-lg hover:bg-brown-dark transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 active:scale-100 shadow-lg disabled:bg-brown/40 disabled:cursor-wait flex items-center justify-center gap-2 mx-auto"
              >
                {isLoadingMore ? (
                  <>
                    <LoadingSpinner />
                    Loading...
                  </>
                ) : (
                  'Show Me More Trends'
                )}
              </button>
            </div>
          )}
        </>
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