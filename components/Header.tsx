import React from 'react';

type View = 'main' | 'myBrews';

interface HeaderProps {
  onNavigate: (view: View) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="text-center py-8 md:py-12 relative">
       {/* My Brews Button */}
       <button 
        onClick={() => onNavigate('myBrews')}
        className="absolute top-1/2 right-0 -translate-y-1/2 bg-white text-brown font-bold py-2 px-4 rounded-full hover:bg-brown/10 transition-colors shadow-md text-sm flex items-center gap-2"
        aria-label="View your favorite brews"
      >
        My Brews 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>

      <h1 className="font-serif text-5xl md:text-7xl text-brown-dark mb-2 cursor-pointer" onClick={() => onNavigate('main')}>
        BrewMuse <span className="inline-block transform translate-y-1">☕</span>
      </h1>
      <p className="text-secondary-text text-lg">
        Discover your next favorite coffee
      </p>
    </header>
  );
};