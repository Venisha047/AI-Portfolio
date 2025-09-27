import React, { useState, useRef } from 'react';
import { LoadingSpinner } from './icons';

interface PantryAlchemistProps {
  onGenerate: (ingredients: string) => void;
  isLoading: boolean;
}

const SUGGESTIONS = ['Oat Milk', 'Cinnamon', 'Honey', 'Espresso', 'Maple Syrup', 'Cocoa'];

export const PantryAlchemist: React.FC<PantryAlchemistProps> = ({ onGenerate, isLoading }) => {
  const [ingredients, setIngredients] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddSuggestion = (suggestion: string) => {
    setIngredients(prev => prev ? `${prev}, ${suggestion}` : suggestion);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.trim()) {
      onGenerate(ingredients.trim());
    }
  };

  return (
    <section className="max-w-2xl mx-auto text-center">
      <h2 className="font-serif text-3xl text-brown-dark mb-2">Pantry Alchemist</h2>
      <p className="text-secondary-text mb-6">Tell us what you have, we'll create the magic.</p>
      
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-brown/10">
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., coffee, oat milk, vanilla..."
            className="w-full px-4 py-3 bg-cream/50 border-2 border-brown/20 rounded-lg shadow-inner text-lg focus:outline-none focus:ring-2 focus:ring-gold transition"
            disabled={isLoading}
            aria-label="Enter ingredients"
          />
          <button
            type="submit"
            disabled={isLoading || !ingredients.trim()}
            className="mt-4 w-full bg-brown text-white font-bold py-3 px-4 rounded-lg hover:bg-brown-dark transition-colors flex items-center justify-center gap-2 disabled:bg-brown/40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 active:scale-95"
          >
            {isLoading ? <><LoadingSpinner /> Generating...</> : 'Generate My Recipe'}
          </button>
        </form>
        <div className="mt-4">
          <p className="text-sm text-secondary-text mb-2">Quick Add:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map(item => (
              <button
                key={item}
                onClick={() => handleAddSuggestion(item)}
                className="px-3 py-1 bg-gold/20 text-brown rounded-full text-sm hover:bg-gold/40 transition-colors active:scale-95"
              >
                + {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
