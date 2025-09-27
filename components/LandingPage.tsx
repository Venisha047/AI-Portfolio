import React, { useState, useEffect } from 'react';
import { View, Recipe } from '../types';
import { TRENDING_RECIPES } from '../constants';
// FIX: Changed to named import for RecipeModal
import { RecipeModal } from './RecipeModal';
import { generateImage } from '../services/geminiService';
import { useAppStore } from '../hooks/useAppStore';

interface LandingPageProps {
  setCurrentView: (view: View) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setCurrentView }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [trendingSubset, setTrendingSubset] = useState<Recipe[]>(TRENDING_RECIPES.slice(0, 3));
  const { addRecipes, updateRecipe } = useAppStore();
  
  const triggerHapticFeedback = () => {
    if (navigator.vibrate) navigator.vibrate(50);
  };
  
  // Generate images for the carousel on mount
  useEffect(() => {
    addRecipes(trendingSubset);
    trendingSubset.forEach(async (recipe) => {
      if (!recipe.imageUrl) {
        try {
          const imageUrl = await generateImage(recipe.imagePrompt);
          const updatedRecipe = { ...recipe, imageUrl };
          setTrendingSubset(prev => prev.map(r => r.id === recipe.id ? updatedRecipe : r));
          updateRecipe(updatedRecipe);
        } catch (imgErr) {
          // FIX: Changed recipe.recipeName to recipe.title to match Recipe type
          console.error(`Failed to generate landing page image for ${recipe.title}`, imgErr);
        }
      }
    });
  }, [addRecipes, updateRecipe]);

  const nextSlide = () => {
    triggerHapticFeedback();
    setCurrentIndex((prevIndex) => (prevIndex === trendingSubset.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    triggerHapticFeedback();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? trendingSubset.length - 1 : prevIndex - 1));
  };

  const handleExplore = () => {
    triggerHapticFeedback();
    setCurrentView(View.BUZZBOARD);
  };

  const heroImageUrl = "https://source.unsplash.com/1600x900/?minimalist,coffee,aesthetic";

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center -z-1" style={{ backgroundImage: `url(${heroImageUrl})` }}>
           <div className="absolute inset-0 w-full h-full bg-black/20"></div>
        </div>
        
        <div className="bg-surface/30 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-primary w-11/12 max-w-2xl animate-fade-in-up">
          <h1 className="font-serif text-5xl md:text-6xl text-primary mb-4">BrewMuse</h1>
          <p className="text-secondary/90 text-lg mb-6">Your AI Coffee Sommelier & Designer ☕✨</p>
          
          <div className="my-8">
            <h2 className="text-lg font-bold text-primary/80 mb-4">Latest Trends</h2>
            <div className="relative w-full max-w-sm mx-auto overflow-hidden">
               <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {trendingSubset.map((recipe) => (
                  <div key={recipe.id} className="w-full flex-shrink-0 px-2">
                     <div 
                        className="bg-surface/50 rounded-lg p-4 cursor-pointer hover:bg-surface/70"
                        onClick={() => setSelectedRecipe(recipe)}
                      >
                       {recipe.imageUrl ? (
                          <img 
                            src={recipe.imageUrl}
                            // FIX: Changed recipe.recipeName to recipe.title to match Recipe type
                            alt={recipe.title}
                            className="w-full h-32 object-cover rounded mb-2"
                          />
                        ) : (
                          <div className="w-full h-32 object-cover rounded mb-2 bg-secondary/20 animate-pulse"></div>
                        )}
                       {/* // FIX: Changed recipe.recipeName to recipe.title to match Recipe type */}
                       <h3 className="font-semibold truncate">{recipe.title}</h3>
                     </div>
                  </div>
                ))}
               </div>
               <button onClick={prevSlide} className="absolute top-1/2 -left-2 transform -translate-y-1/2 bg-white/50 p-1 rounded-full text-primary hover:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-transform active:scale-90">&lt;</button>
               <button onClick={nextSlide} className="absolute top-1/2 -right-2 transform -translate-y-1/2 bg-white/50 p-1 rounded-full text-primary hover:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-transform active:scale-90">&gt;</button>
            </div>
          </div>

          <button
            onClick={handleExplore}
            className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-all duration-250 ease-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface active:scale-100"
          >
            Explore Trends &rarr;
          </button>
        </div>
      </div>
      {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}</style>
    </>
  );
};

export default LandingPage;