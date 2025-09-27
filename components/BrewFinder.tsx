import React, { useState } from 'react';
import { MOODS } from '../constants';
import { LoadingSpinner, SearchIcon } from './icons';

interface BrewFinderProps {
  onMoodSelect: (mood: string) => void;
  onPantryGenerate: (ingredients: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTags: string[];
  // FIX: Updated type to allow functional updates for state, resolving a TypeScript error on line 33.
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  isLoadingMood: boolean;
  isLoadingPantry: boolean;
  activeMood: string | null;
}

const TAGS = ['HOT', 'ICED', 'SWEET', 'STRONG'];

export const BrewFinder: React.FC<BrewFinderProps> = ({
  onMoodSelect,
  onPantryGenerate,
  searchQuery,
  setSearchQuery,
  selectedTags,
  setSelectedTags,
  isLoadingMood,
  isLoadingPantry,
  activeMood,
}) => {
  const [pantryIngredients, setPantryIngredients] = useState('');

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handlePantrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pantryIngredients.trim()) {
      onPantryGenerate(pantryIngredients.trim());
      setPantryIngredients('');
    }
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  }

  const isLoading = isLoadingMood || isLoadingPantry;

  return (
    <section className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-brown/10 space-y-8">
      
      {/* Part 1: Search & Filter */}
      <div className="space-y-4">
        <h3 className="font-serif text-2xl text-brown-dark text-center">Find Your Perfect Brew</h3>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="text-brown/40" />
          </div>
          <input 
            type="text"
            placeholder="Search by name or ingredient..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-cream/50 border-2 border-brown/20 rounded-lg shadow-inner text-lg focus:outline-none focus:ring-2 focus:ring-gold transition"
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2">
          <span className="text-sm font-semibold text-secondary-text mr-2">Filter by:</span>
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 rounded-full text-sm font-bold transition-all ${
                selectedTags.includes(tag)
                  ? 'bg-brown text-white'
                  : 'bg-cream text-brown hover:bg-brown/10'
              }`}
              disabled={isLoading}
            >
              {tag.charAt(0) + tag.slice(1).toLowerCase()}
            </button>
          ))}
          {(searchQuery || selectedTags.length > 0) && (
            <button 
              onClick={clearFilters} 
              className="text-xs text-secondary-text hover:text-brown underline ml-2"
              disabled={isLoading}
            >
              &times; Clear
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-brown/10"></div>

      {/* Part 2: Generate */}
      <div className="space-y-6 text-center">
        <h3 className="font-serif text-2xl text-brown-dark">...Or Generate Something New</h3>

        <div>
          <p className="text-secondary-text mb-3">How are you feeling?</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {MOODS.map(({ name, icon }) => (
              <button
                key={name}
                onClick={() => onMoodSelect(name)}
                disabled={isLoading}
                className={`px-4 py-2 rounded-full font-bold text-base transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-white active:scale-95 disabled:opacity-50 disabled:cursor-wait
                  ${activeMood === name
                    ? 'bg-brown-dark text-white shadow-md scale-105'
                    : 'bg-white text-brown hover:bg-brown/10 shadow-sm hover:scale-105 border border-brown/10'
                  }`}
              >
                {name} {icon}
              </button>
            ))}
          </div>
        </div>
        
        <div className="pt-2">
          <p className="text-secondary-text mb-3">What's in your pantry?</p>
          <form onSubmit={handlePantrySubmit} className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
            <input
              type="text"
              value={pantryIngredients}
              onChange={(e) => setPantryIngredients(e.target.value)}
              placeholder="e.g., oat milk, vanilla..."
              className="flex-grow px-4 py-3 bg-cream/50 border-2 border-brown/20 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-gold transition"
              disabled={isLoading}
              aria-label="Enter ingredients to generate a recipe"
            />
            <button
              type="submit"
              disabled={isLoading || !pantryIngredients.trim()}
              className="bg-brown text-white font-bold py-3 px-6 rounded-lg hover:bg-brown-dark transition-colors flex items-center justify-center gap-2 disabled:bg-brown/40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 active:scale-95"
            >
              {isLoadingPantry ? <><LoadingSpinner /> Generating...</> : 'Generate'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};