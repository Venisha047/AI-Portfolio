import React from 'react';
import { useAppStore } from '../hooks/useAppStore';
import { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';

interface MyQueueProps {
  onSelectRecipe: (recipe: Recipe) => void;
}

const MyQueue: React.FC<MyQueueProps> = ({ onSelectRecipe }) => {
  const { getQueuedRecipes } = useAppStore();
  const queuedRecipes = getQueuedRecipes();

  return (
    <section className="animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="font-serif text-4xl text-brown-dark">My Brewing Queue</h2>
        <p className="text-secondary-text mt-1">Your list of coffee adventures to try next.</p>
      </div>

      {queuedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {queuedRecipes.map((recipe, index) => (
            <div key={recipe.id} className="recipe-card-wrapper" style={{ animationDelay: `${index * 80}ms` }}>
              <RecipeCard recipe={recipe} onSelect={() => onSelectRecipe(recipe)} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white/50 rounded-2xl">
          <span className="text-5xl mb-4 inline-block">📋</span>
          <p className="text-xl font-bold text-brown">Your queue is empty!</p>
          <p className="text-secondary-text mt-2">
            Click the plus icon on any recipe to add it to your to-try list.
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

export default MyQueue;