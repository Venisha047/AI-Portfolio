import React from 'react';
import { MOODS } from '../constants';

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
  activeMood: string | null;
  isLoading: boolean;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect, activeMood, isLoading }) => {
  return (
    <section className="text-center">
      <h2 className="font-serif text-3xl text-brown-dark mb-6">How are you feeling today?</h2>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {MOODS.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => onMoodSelect(name)}
            disabled={isLoading}
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-bold text-base sm:text-lg transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-cream active:scale-95 disabled:opacity-50 disabled:cursor-wait
              ${activeMood === name
                ? 'bg-brown-dark text-white shadow-lg scale-105'
                : 'bg-white text-brown hover:bg-brown/10 shadow-md hover:scale-105'
              }`}
          >
            {name} {icon}
          </button>
        ))}
      </div>
    </section>
  );
};
