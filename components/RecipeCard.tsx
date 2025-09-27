import React from 'react';
import { Recipe } from '../types';
import { RecipeCharacteristics } from './RecipeCharacteristics';
import { useAppStore } from '../hooks/useAppStore';
import { HeartIcon } from './icons';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect }) => {
  const { isFavorite, toggleFavorite } = useAppStore();
  const favorite = isFavorite(recipe.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening when clicking the heart
    toggleFavorite(recipe.id);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-1 cursor-pointer relative"
      onClick={onSelect}
      aria-label={`View recipe for ${recipe.title}`}
    >
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-3 right-3 z-10 p-1.5 rounded-full transition-all duration-200 ${
          favorite 
            ? 'bg-red-500 text-white' 
            : 'bg-black/40 text-white/80 hover:bg-black/60 hover:scale-110'
        }`}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <HeartIcon filled={favorite} />
      </button>

      <div className="relative aspect-square">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-brown/10 animate-pulse flex items-center justify-center">
            <span className="text-brown/40 text-xs">Generating image...</span>
          </div>
        )}
         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-2xl text-brown-dark truncate" title={recipe.title}>
          {recipe.title}
        </h3>
        <p className="text-secondary-text text-sm h-10 mt-1 mb-3 line-clamp-2">{recipe.description}</p>
        <RecipeCharacteristics tags={recipe.tags} />
      </div>
    </div>
  );
};