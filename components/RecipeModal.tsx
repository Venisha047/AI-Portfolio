import React, { useState, useEffect } from 'react';
import { Recipe } from '../types';
import { RecipeCharacteristics } from './RecipeCharacteristics';
import { useAppStore } from '../hooks/useAppStore';
import { HeartIcon, ShareIcon } from './icons';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [copied, setCopied] = useState(false);
  const { isFavorite, toggleFavorite } = useAppStore();
  const favorite = isFavorite(recipe.id);

  useEffect(() => {
    const timer = setTimeout(() => setIsShowing(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleShare = () => {
    const shareText = `Check out this coffee recipe from BrewMuse: ${recipe.title}\n${window.location.href}`;
    navigator.clipboard.writeText(shareText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Hide message after 2 seconds
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert("Failed to copy link."); // Fallback for browsers that don't support it
    });
  };

  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out ${isShowing ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`bg-cream rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col transition-all duration-300 ease-in-out ${isShowing ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <img 
            src={recipe.imageUrl || `https://source.unsplash.com/800x600/?coffee,${recipe.title}`} 
            alt={recipe.title} 
            className="w-full h-56 object-cover" 
          />
          <button 
            onClick={onClose} 
            className="absolute top-3 right-3 bg-white/70 rounded-full p-2 text-brown hover:bg-white focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 md:p-8 flex-grow overflow-y-auto">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="mb-4">
                <RecipeCharacteristics tags={recipe.tags} />
              </div>
              <h2 className="font-serif text-4xl text-brown-dark mb-2">{recipe.title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                  <button
                      onClick={handleShare}
                      className="p-3 rounded-full bg-brown/10 text-brown/60 hover:bg-brown/20 transition-all duration-200 active:scale-90"
                      aria-label="Share recipe"
                  >
                      <ShareIcon className="h-7 w-7" />
                  </button>
                  {copied && (
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-brown-dark text-white text-xs font-bold py-1 px-3 rounded-md shadow-lg whitespace-nowrap">
                          Link Copied!
                      </span>
                  )}
              </div>
              <button
                onClick={() => toggleFavorite(recipe.id)}
                className={`p-3 rounded-full transition-all duration-200 active:scale-90 ${
                  favorite ? 'bg-red-100 text-red-500' : 'bg-brown/10 text-brown/60 hover:bg-brown/20'
                }`}
                aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <HeartIcon filled={favorite} className="h-7 w-7" />
              </button>
            </div>
          </div>

          <p className="text-secondary-text mb-6">{recipe.description}</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg text-brown-dark mb-2 border-b-2 border-gold/50 pb-1">Ingredients</h3>
              <ul className="list-disc list-inside text-brown space-y-1 pl-1">
                {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-brown-dark mb-2 border-b-2 border-gold/50 pb-1">Instructions</h3>
              <ol className="list-decimal list-inside text-brown space-y-2 pl-2">
                {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};