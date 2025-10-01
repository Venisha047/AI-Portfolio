import React from 'react';
import { ClipboardListIcon } from './icons';

type View = 'home' | 'main' | 'myBrews' | 'myQueue';

interface HeaderProps {
  onNavigate: (view: View) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="flex justify-between items-center py-6 md:py-8 border-b-2 border-subtle-border mb-12">
       <div className="text-left">
        <h1 className="font-serif text-4xl md:text-5xl text-brown-dark cursor-pointer flex items-center gap-3" onClick={() => onNavigate('home')}>
          BrewMuse <span className="text-3xl md:text-4xl" role="img" aria-label="coffee cup emoji">☕</span>
        </h1>
      </div>
      
       <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={() => onNavigate('myQueue')}
          className="text-brown font-semibold py-2 px-3 rounded-lg hover:bg-brown/10 transition-colors text-sm md:text-base flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-cream"
          aria-label="View your to-try list"
        >
          <ClipboardListIcon className="h-5 w-5 text-gold"/>
          <span className="hidden md:inline">To-Try List</span>
        </button>
        <button 
          onClick={() => onNavigate('myBrews')}
          className="text-brown font-semibold py-2 px-3 rounded-lg hover:bg-brown/10 transition-colors text-sm md:text-base flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-cream"
          aria-label="View your favorite brews"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="hidden md:inline">My Brews</span>
        </button>
      </div>
    </header>
  );
};