


import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Recipe } from '../types';
import { RecipeCharacteristics } from './RecipeCharacteristics';
import { useAppStore } from '../hooks/useAppStore';
import { HeartIcon, ShareIcon, ClockIcon, ChartBarIcon, DownloadIcon, LoadingSpinner, LightbulbIcon, GlobeIcon, BookOpenIcon, FlameIcon, DumbbellIcon, SugarIcon, DropletIcon, TwitterIcon, FacebookIcon, PinterestIcon, LinkIcon } from './icons';
import { generateRecipeCard } from '../services/recipeCardGenerator';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

// FIX: Specify a more specific type for the 'icon' prop to allow passing 'className' and aria attributes via React.cloneElement, resolving a TypeScript error.
const ModalSection: React.FC<{ title: string; icon: React.ReactElement<{ className?: string } & React.AriaAttributes>; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div>
    <h3 className="flex items-center gap-2 font-bold text-lg text-brown-dark mb-3 border-b-2 border-subtle-border pb-2">
      {React.cloneElement(icon, { className: 'h-5 w-5 text-gold', 'aria-hidden': true })}
      <span>{title}</span>
    </h3>
    {children}
  </div>
);


export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  const { isFavorite, toggleFavorite } = useAppStore();
  const favorite = isFavorite(recipe.id);

  const closeModal = useCallback(() => {
    setIsShowing(false);
    setTimeout(onClose, 300); // Wait for animation to finish
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setIsShareMenuOpen(false);
      }
    };

    const timer = setTimeout(() => setIsShowing(true), 10);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    if (isShareMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [closeModal, isShareMenuOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#recipe-${recipe.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
            setIsShareMenuOpen(false);
        }, 1500);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
  };

  const handleSocialShare = (platform: 'twitter' | 'facebook' | 'pinterest') => {
      const url = encodeURIComponent(`${window.location.origin}${window.location.pathname}#recipe-${recipe.id}`);
      const text = encodeURIComponent(`Check out this coffee recipe from BrewMuse: ${recipe.title}`);
      const media = encodeURIComponent(recipe.imageUrl || '');
      let shareUrl = '';

      switch (platform) {
          case 'twitter':
              shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
              break;
          case 'facebook':
              shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
              break;
          case 'pinterest':
              shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${text}`;
              break;
      }

      if (shareUrl) {
          window.open(shareUrl, '_blank', 'noopener,noreferrer');
      }
      setIsShareMenuOpen(false);
  };

  const handleDownload = async () => {
    if (!recipe.imageUrl) {
        alert("Please wait for the recipe image to load before downloading.");
        return;
    }
    setIsDownloading(true);
    try {
      await generateRecipeCard(recipe);
    } catch (error) {
      console.error("Failed to generate recipe card:", error);
      alert("Sorry, we couldn't create the recipe card. The image might not be accessible.");
    } finally {
      setIsDownloading(false);
    }
  };

  const nutritionalInfo = [
    { label: 'Calories', value: recipe.calories, Icon: FlameIcon },
    { label: 'Protein', value: recipe.protein, Icon: DumbbellIcon },
    { label: 'Sugar', value: recipe.sugar, Icon: SugarIcon },
    { label: 'Fat', value: recipe.fat, Icon: DropletIcon },
  ].filter(info => info.value);

  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out ${isShowing ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`bg-surface rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col transition-all duration-300 ease-in-out ${isShowing ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <img 
            src={recipe.imageUrl || `https://source.unsplash.com/800x600/?coffee,${recipe.title}`} 
            alt={recipe.title} 
            className="w-full h-64 object-cover" 
          />
          <button 
            onClick={closeModal} 
            className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm rounded-full p-2 text-brown-dark hover:bg-white focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 md:p-8 flex-grow overflow-y-auto">
          <div className="flex justify-between items-start gap-4 mb-4">
            <div className="flex-1">
              <h2 className="font-serif text-4xl text-brown-dark mb-2">{recipe.title}</h2>
              <RecipeCharacteristics tags={recipe.tags} />
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative" ref={shareMenuRef}>
                  <button
                      onClick={() => setIsShareMenuOpen(prev => !prev)}
                      className="p-3 rounded-full bg-cream hover:bg-brown/10 text-brown transition-all duration-200 active:scale-90 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-surface"
                      aria-label="Share recipe"
                      aria-haspopup="true"
                      aria-expanded={isShareMenuOpen}
                  >
                      <ShareIcon className="h-6 w-6" />
                  </button>
                  {isShareMenuOpen && (
                      <div className="absolute bottom-full right-0 mb-2 w-48 bg-surface rounded-lg shadow-xl border border-subtle-border z-10 animate-pop-in origin-bottom-right">
                          <div className="p-2">
                              <button onClick={() => handleSocialShare('twitter')} className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md hover:bg-cream text-brown-dark transition-colors">
                                  <TwitterIcon className="h-5 w-5" />
                                  <span>Twitter</span>
                              </button>
                              <button onClick={() => handleSocialShare('facebook')} className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md hover:bg-cream text-brown-dark transition-colors">
                                  <FacebookIcon className="h-5 w-5" />
                                  <span>Facebook</span>
                              </button>
                              <button onClick={() => handleSocialShare('pinterest')} className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md hover:bg-cream text-brown-dark transition-colors">
                                  <PinterestIcon className="h-5 w-5" />
                                  <span>Pinterest</span>
                              </button>
                              <div className="h-px bg-subtle-border my-1"></div>
                              <button onClick={handleCopyLink} className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md hover:bg-cream text-brown-dark transition-colors font-semibold">
                                  <LinkIcon className="h-5 w-5" />
                                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                              </button>
                          </div>
                      </div>
                  )}
              </div>
              <button
                onClick={() => toggleFavorite(recipe.id)}
                className={`p-3 rounded-full transition-all duration-200 active:scale-90 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-surface ${
                  favorite ? 'bg-red-100 text-red-500' : 'bg-cream hover:bg-brown/10 text-brown'
                }`}
                aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <HeartIcon filled={favorite} className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          {(recipe.prepTime || recipe.difficulty) && (
              <div className="flex items-center gap-6 text-secondary-text mb-6 border-y border-subtle-border py-3">
                  {recipe.prepTime && (
                      <div className="flex items-center gap-2">
                          <ClockIcon className="h-5 w-5 text-gold" aria-hidden="true" />
                          <span className="font-semibold">{recipe.prepTime}</span>
                      </div>
                  )}
                  {recipe.difficulty && (
                      <div className="flex items-center gap-2">
                          <ChartBarIcon className="h-5 w-5 text-gold" aria-hidden="true" />
                          <span className="font-semibold">{recipe.difficulty}</span>
                      </div>
                  )}
              </div>
          )}

          <p className="text-secondary-text text-base mb-8">{recipe.description}</p>
          
          <div className="space-y-8">
            {recipe.flavorProfile && (
              <ModalSection title="Flavor Profile" icon={<LightbulbIcon />}>
                <blockquote className="border-l-4 border-gold bg-cream p-4 my-2">
                  <p className="text-brown-dark italic">{recipe.flavorProfile}</p>
                </blockquote>
              </ModalSection>
            )}

            {nutritionalInfo.length > 0 && (
              <ModalSection title="Nutritional Info (Estimated)" icon={<ChartBarIcon />}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {nutritionalInfo.map(({ label, value, Icon }) => (
                    <div key={label} className="bg-cream p-3 rounded-lg border border-subtle-border">
                      <Icon className="h-6 w-6 text-gold mx-auto mb-1" aria-hidden="true" />
                      <p className="text-sm text-secondary-text font-bold">{label}</p>
                      <p className="font-semibold text-brown-dark text-lg">{value}</p>
                    </div>
                  ))}
                </div>
              </ModalSection>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              <ModalSection title="Ingredients" icon={<BookOpenIcon />}>
                <ul className="list-disc list-inside text-brown-dark space-y-2 pl-1">
                  {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                </ul>
              </ModalSection>
              
              <ModalSection title="Instructions" icon={<BookOpenIcon />}>
                <ol className="list-decimal list-inside text-brown-dark space-y-3 pl-2">
                  {recipe.instructions.map((step, i) => <li key={i} className="pl-1">{step}</li>)}
                </ol>
              </ModalSection>
            </div>
            
             {recipe.brewingTips && recipe.brewingTips.length > 0 && (
              <ModalSection title="Brewing Tips" icon={<LightbulbIcon />}>
                <ul className="space-y-3 text-brown-dark">
                  {recipe.brewingTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 bg-cream rounded-lg">
                      <span className="text-gold font-bold text-xl mt-[-2px]" aria-hidden="true">&bull;</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </ModalSection>
            )}

            {recipe.originStory && (
               <ModalSection title="Origin Story" icon={<GlobeIcon />}>
                <blockquote className="border-l-4 border-gold bg-cream p-4 my-2">
                  <p className="text-brown-dark italic">{recipe.originStory}</p>
                </blockquote>
              </ModalSection>
            )}
          </div>
        </div>
         <div className="p-4 bg-cream border-t border-subtle-border">
            <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full bg-brown-dark text-white font-bold py-3 px-6 rounded-lg hover:bg-brown-dark/90 transition-colors flex items-center justify-center gap-2 disabled:bg-brown/40 disabled:cursor-wait focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 active:scale-95 shadow-lg"
            >
                {isDownloading ? <><LoadingSpinner /> Downloading...</> : <><DownloadIcon className="h-5 w-5" /> Download Recipe Card</>}
            </button>
        </div>
      </div>
      <style>{`
        @keyframes pop-in {
            from { opacity: 0; transform: scale(0.95) translateY(5px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-pop-in { animation: pop-in 0.15s ease-out; }
      `}</style>
    </div>
  );
};