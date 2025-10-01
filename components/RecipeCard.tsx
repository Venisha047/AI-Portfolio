
import React from 'react';
import { Recipe } from '../types';
import { RecipeCharacteristics } from './RecipeCharacteristics';
import { useAppStore } from '../hooks/useAppStore';
import { HeartIcon, PlusIcon, CheckIcon, ClockIcon, ChartBarIcon } from './icons';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect }) => {
  const { isFavorite, toggleFavorite, isInQueue, toggleQueue } = useAppStore();
  const favorite = isFavorite(recipe.id);
  const inQueue = isInQueue(recipe.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening when clicking the heart
    toggleFavorite(recipe.id);
  };

  const handleQueueClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleQueue(recipe.id);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="bg-surface rounded-2xl shadow-md overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1.5 cursor-pointer relative border border-subtle-border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold flex flex-col"
      onClick={onSelect}
      aria-label={`View recipe for ${recipe.title}`}
    >
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button
          onClick={handleFavoriteClick}
          className={`p-2 rounded-full transition-all duration-200 backdrop-blur-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold focus:ring-offset-black/30 ${
            favorite 
              ? 'bg-red-500/80 text-white' 
              : 'bg-black/30 text-white/80 hover:bg-black/50 hover:scale-110'
          }`}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartIcon key={`heart-${favorite}`} filled={favorite} className={`h-5 w-5 ${favorite ? 'animate-pop' : ''}`} />
        </button>
        <button
          onClick={handleQueueClick}
          className={`p-2 rounded-full transition-all duration-200 backdrop-blur-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold focus:ring-offset-black/30 ${
            inQueue 
              ? 'bg-gold/90 text-brown-dark' 
              : 'bg-black/30 text-white/80 hover:bg-black/50 hover:scale-110'
          }`}
          aria-label={inQueue ? 'Remove from to-try list' : 'Add to to-try list'}
        >
          {inQueue ? <CheckIcon key="check" className="h-5 w-5 animate-pop"/> : <PlusIcon key="plus" className="h-5 w-5"/>}
        </button>
      </div>

      <div className="relative aspect-[4/3]">
        <img
          src={recipe.imageUrl || `https://source.unsplash.com/800x600/?coffee,${recipe.title.split(' ').join(',')}`}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="font-serif text-2xl font-bold text-brown-dark mb-2 line-clamp-2" title={recipe.title}>
            {recipe.title}
          </h3>
          <p className="text-secondary-text text-sm mb-4 line-clamp-2">{recipe.description}</p>
        </div>
        
        <div className="mt-auto pt-4 border-t border-subtle-border space-y-3">
           {(recipe.prepTime || recipe.difficulty) && (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-secondary-text text-sm">
                  {recipe.prepTime && (
                      <div className="flex items-center gap-1.5" title="Preparation Time">
                          <ClockIcon className="h-5 w-5 text-gold" />
                          <span className="font-semibold">{recipe.prepTime}</span>
                      </div>
                  )}
                  {recipe.difficulty && (
                      <div className="flex items-center gap-1.5" title="Difficulty">
                          <ChartBarIcon className="h-5 w-5 text-gold" />
                          <span className="font-semibold">{recipe.difficulty}</span>
                      </div>
                  )}
              </div>
          )}
          <RecipeCharacteristics tags={recipe.tags} />
        </div>
      </div>
    </div>
  );
};
