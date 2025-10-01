

import React from 'react';
import { DIETARY_TAGS } from '../constants';
import { SearchIcon } from './icons';
import { useAppStore } from '../hooks/useAppStore';

interface BrewFinderProps {}

const TAGS = ['HOT', 'ICED', 'SWEET', 'STRONG'];
const CAFFEINE_LEVELS = ['ANY', 'HIGH', 'MEDIUM', 'LOW', 'DECAF'];

const FilterChip: React.FC<{ label: string; isSelected: boolean; onClick: () => void }> = ({ label, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 border-2 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold ${
      isSelected
        ? 'bg-brown-dark text-white border-brown-dark'
        : 'bg-surface text-brown border-subtle-border hover:border-brown/50 hover:bg-cream'
    }`}
  >
    {label}
  </button>
);


export const BrewFinder: React.FC<BrewFinderProps> = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    selectedCaffeine,
    setSelectedCaffeine,
    selectedDiets,
    setSelectedDiets,
    clearFilters,
  } = useAppStore();

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleDietToggle = (diet: string) => {
    setSelectedDiets(prev =>
      prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
    );
  };
  
  const cardBaseClass = "bg-surface p-6 md:p-8 rounded-2xl shadow-lg border border-subtle-border";
  const filtersAreActive = searchQuery || selectedTags.length > 0 || selectedCaffeine !== 'ANY' || selectedDiets.length > 0;

  return (
    <section className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className={`${cardBaseClass} space-y-6`}>
        <div className="flex justify-between items-center">
            <h3 className="font-serif text-2xl text-brown-dark">Filter & Refine</h3>
            {filtersAreActive && (
              <button 
                onClick={clearFilters} 
                className="text-sm text-secondary-text hover:text-brown-dark underline rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              >
                &times; Clear All Filters
              </button>
            )}
        </div>
        
        <div className="relative">
          <label htmlFor="recipe-search" className="sr-only">Search by name or ingredient</label>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="text-brown/40" aria-hidden="true" />
          </div>
          <input 
            type="text"
            id="recipe-search"
            placeholder="Search by name or ingredient..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-cream/50 border-2 border-brown/20 rounded-lg shadow-inner-soft text-lg focus:outline-none focus:ring-2 focus:ring-gold transition text-brown-dark placeholder:text-secondary-text/70"
          />
        </div>

        <div className="space-y-4">
            <div className="space-y-3">
                <h4 className="font-semibold text-secondary-text">Caffeine Level</h4>
                <div className="flex flex-wrap items-center gap-2">
                    {CAFFEINE_LEVELS.map(level => (
                      <FilterChip 
                        key={level}
                        label={level.charAt(0) + level.slice(1).toLowerCase()}
                        isSelected={selectedCaffeine === level}
                        onClick={() => setSelectedCaffeine(level)}
                      />
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 pt-2">
              <div className="space-y-3">
                  <h4 className="font-semibold text-secondary-text">Style</h4>
                  <div className="flex flex-wrap items-center gap-2">
                      {TAGS.map(tag => (
                          <FilterChip
                            key={tag}
                            label={tag.charAt(0) + tag.slice(1).toLowerCase()}
                            isSelected={selectedTags.includes(tag)}
                            onClick={() => handleTagToggle(tag)}
                          />
                      ))}
                  </div>
              </div>
               <div className="space-y-3">
                    <h4 className="font-semibold text-secondary-text">Dietary</h4>
                    <div className="flex flex-wrap items-center gap-2">
                        {DIETARY_TAGS.map(diet => (
                          <FilterChip
                            key={diet}
                            label={diet.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                            isSelected={selectedDiets.includes(diet)}
                            onClick={() => handleDietToggle(diet)}
                          />
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
