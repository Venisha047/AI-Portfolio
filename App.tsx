

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { RecipeList } from './components/RecipeList';
import { RecipeModal } from './components/RecipeModal';
import MyBrews from './components/MyBrews';
import MyQueue from './components/MyQueue';
import { TRENDING_RECIPES, MOODS } from './constants';
import { generateRecipes, generateImage, findTrendingRecipes } from './services/geminiService';
import { Recipe } from './types';
import { BrewFinder } from './components/BrewFinder';
import { useAppStore } from './hooks/useAppStore';
import { LoadingSpinner } from './components/icons';
import { AboutModal } from './components/AboutModal';

type View = 'home' | 'main' | 'creator' | 'myBrews' | 'myQueue';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const HomePage = ({ onNavigate, onSelectRecipe, trendingRecipes, onLoadMore, isLoadingMore, isLoadingTrends }: { 
  onNavigate: (view: View) => void, 
  onSelectRecipe: (recipe: Recipe) => void, 
  trendingRecipes: Recipe[],
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  isLoadingTrends: boolean;
}) => (
  <div className="space-y-16 animate-fade-in">
    <section className="text-center py-16 md:py-20 bg-cover bg-center rounded-2xl shadow-lg border border-subtle-border" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234A2C2A' fill-opacity='0.04'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E"), linear-gradient(to top, rgba(253, 251, 247, 1), rgba(253, 251, 247, 0.8))`}}>
      <h2 className="font-serif text-5xl md:text-6xl text-brown-dark mb-4">Discover Your Perfect Cup</h2>
      <p className="text-secondary-text text-lg max-w-2xl mx-auto mb-8">
        Explore viral trends, find a brew for any mood, or craft a recipe from your own pantry.
      </p>
      <button 
        onClick={() => onNavigate('creator')} 
        className="bg-brown-dark text-white font-bold py-3 px-8 rounded-lg hover:bg-brown-dark/90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gold/50 active:scale-100 shadow-xl"
      >
        Create a Custom Brew &rarr;
      </button>
    </section>
    <RecipeList
      title="The BuzzBoard: Dive Into Taste Trends"
      recipes={trendingRecipes}
      isLoading={isLoadingTrends}
      loadingText="Discovering the latest taste trends..."
      onSelectRecipe={onSelectRecipe}
      onLoadMore={onLoadMore}
      isLoadingMore={isLoadingMore}
    />
    <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
  </div>
);

const RecipeCreator = ({
  onMoodSelect,
  onPantryGenerate,
  isLoadingMood,
  isLoadingPantry,
  activeMood,
}: {
  onMoodSelect: (mood: string) => void;
  onPantryGenerate: (ingredients: string) => void;
  isLoadingMood: boolean;
  isLoadingPantry: boolean;
  activeMood: string | null;
}) => {
  const [pantryIngredients, setPantryIngredients] = useState('');
  const [customMood, setCustomMood] = useState('');

  const handlePantrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pantryIngredients.trim()) {
      onPantryGenerate(pantryIngredients.trim());
    }
  };

  const handleMoodButtonClick = (mood: string) => {
    onMoodSelect(mood);
    setCustomMood('');
  };

  const handleCustomMoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customMood.trim()) {
      onMoodSelect(customMood.trim());
    }
  };

  const isLoading = isLoadingMood || isLoadingPantry;
  const cardBaseClass = "bg-surface p-8 rounded-2xl shadow-lg border border-subtle-border";

  return (
    <section className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="font-serif text-4xl text-brown-dark">Create Something New</h2>
        <p className="text-secondary-text mt-1">Let our AI craft a personalized coffee recipe just for you.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 pt-4">
        <div className={`${cardBaseClass} space-y-4`}>
            <h3 className="font-serif text-2xl text-brown-dark text-center">Mood Matcher</h3>
            <p className="text-center text-secondary-text -mt-3">How are you feeling today?</p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {MOODS.map(({ name, icon }) => (
                <button
                  key={name}
                  onClick={() => handleMoodButtonClick(name)}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-full font-bold text-base transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-white active:scale-95 disabled:opacity-50 disabled:cursor-wait
                    ${activeMood === name
                      ? 'bg-brown-dark text-white shadow-md scale-105'
                      : 'bg-cream text-brown hover:bg-brown/20 border border-subtle-border shadow-sm'
                    }`}
                >
                  {name} {icon}
                </button>
              ))}
            </div>
            <form onSubmit={handleCustomMoodSubmit} className="flex gap-2 pt-2">
              <input
                  type="text"
                  value={customMood}
                  onChange={(e) => setCustomMood(e.target.value)}
                  placeholder="Or, type your own mood..."
                  className="flex-grow px-4 py-2 bg-cream/50 border-2 border-brown/20 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-gold transition"
                  disabled={isLoading}
                />
                <button type="submit" className="font-bold text-secondary-text hover:text-brown-dark transition-colors" disabled={isLoading || !customMood.trim()}>&rarr;</button>
            </form>
        </div>
        
        <div className={`${cardBaseClass} space-y-4`}>
          <h3 className="font-serif text-2xl text-brown-dark text-center">Pantry Alchemist</h3>
          <p className="text-center text-secondary-text -mt-3">Generate a recipe from ingredients you have on hand.</p>
           <form onSubmit={handlePantrySubmit} className="flex flex-col gap-3 pt-2">
            <textarea
              value={pantryIngredients}
              onChange={(e) => setPantryIngredients(e.target.value)}
              placeholder="e.g., oat milk, instant coffee, cinnamon, vanilla extract..."
              rows={3}
              className="w-full px-4 py-2 bg-cream/50 border-2 border-brown/20 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-gold transition"
              disabled={isLoading}
              aria-label="Enter ingredients to generate a recipe"
            />
            <button
              type="submit"
              disabled={isLoading || !pantryIngredients.trim()}
              className="bg-brown text-white font-bold py-3 px-6 rounded-lg hover:bg-brown/90 transition-colors flex items-center justify-center gap-2 disabled:bg-brown/40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 active:scale-95 shadow-lg"
            >
              {isLoadingPantry ? <><LoadingSpinner /> Alchemizing...</> : 'Create My Brew'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
};

const App: React.FC = () => {
  const [staticTrendingRecipes, setStaticTrendingRecipes] = useState<Recipe[]>(TRENDING_RECIPES);
  const [webTrendingRecipes, setWebTrendingRecipes] = useState<Recipe[]>([]);
  
  const [moodRecipes, setMoodRecipes] = useState<Recipe[]>([]);
  const [pantryRecipes, setPantryRecipes] = useState<Recipe[]>([]);
  const [activeMood, setActiveMood] = useState<string | null>(null);

  const [isLoadingTrends, setIsLoadingTrends] = useState(true);
  const [isLoadingMood, setIsLoadingMood] = useState(false);
  const [isLoadingPantry, setIsLoadingPantry] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [view, setView] = useState<View>('home');
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  
  const { 
    addRecipes,
    searchQuery,
    selectedTags,
    selectedCaffeine,
    selectedDiets,
  } = useAppStore();

  const generateImagesForRecipes = useCallback(async (recipes: Recipe[], setter: React.Dispatch<React.SetStateAction<Recipe[]>>) => {
    for (const recipe of recipes) {
      if (recipe.imageUrl) continue;

      let cachedUrl = null;
      try {
        cachedUrl = localStorage.getItem(`image_${recipe.id}`);
      } catch (e) {
        console.warn('localStorage is not available:', e);
      }
      
      if (cachedUrl) {
        setter(prev => prev.map(r => r.id === recipe.id ? { ...r, imageUrl: cachedUrl } : r));
        continue;
      }

      try {
        await sleep(5000);
        
        const imageUrl = await generateImage(recipe.imagePrompt);
        
        try {
            localStorage.setItem(`image_${recipe.id}`, imageUrl);
        } catch (e) {
            console.warn('localStorage is not available:', e);
        }
        
        setter(prev => prev.map(r => r.id === recipe.id ? { ...r, imageUrl } : r));
      } catch (imgErr: any) {
        console.error(`Failed to generate image for ${recipe.title}`, imgErr);
        const errorMessage = String(imgErr?.message || '');

        if (errorMessage.includes("API Key is missing")) {
          setError("Failed to connect to the API. Please ensure the API key is configured correctly.");
          break;
        }
        
        if (errorMessage.includes("429") || errorMessage.includes("RESOURCE_EXHAUSTED")) {
          setError("The image generator is cooling down due to high demand. Some images may not load immediately. Please try again later.");
          break;
        }
      }
    }
  }, [setError]);


  useEffect(() => {
    const loadInitialData = async () => {
      setError(null);
      // Immediately prepare static recipes with cached images as a fallback
      const recipesWithCache = staticTrendingRecipes.map(recipe => {
        let cachedUrl = null;
        try {
            cachedUrl = localStorage.getItem(`image_${recipe.id}`);
        } catch (e) {
            console.warn('localStorage is not available:', e);
        }
        return cachedUrl ? { ...recipe, imageUrl: cachedUrl } : recipe;
      });
      setStaticTrendingRecipes(recipesWithCache);
      addRecipes(recipesWithCache);
      // Disabling image generation for static recipes to save API quota.
      // generateImagesForRecipes(recipesWithCache, setStaticTrendingRecipes);
      
      // Fetch real-time trends from the web
      try {
        const prompt = "Find 4 of the latest coffee recipes trending on social media in the last 24 hours.";
        const newRecipes = await findTrendingRecipes(prompt);
        setWebTrendingRecipes(newRecipes);
        addRecipes(newRecipes);
        // Disabling image generation for web recipes to save API quota. Fallback to Unsplash will be used.
        // await generateImagesForRecipes(newRecipes, setWebTrendingRecipes);
      } catch (err) {
        console.error("Failed to load initial trends:", err);
        if (err instanceof Error && err.message.includes("API Key is missing")) {
           setError("Failed to connect to the API. Please ensure the API key is configured correctly.");
        } else {
           setError("Could not fetch the latest trends. Showing some of our favorites instead.");
        }
      } finally {
        setIsLoadingTrends(false);
      }
    };

    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleMoodSelect = async (mood: string) => {
    setView('main');
    setActiveMood(mood);
    setIsLoadingMood(true);
    setError(null);
    setMoodRecipes([]);
    setPantryRecipes([]);

    try {
      let prompt = `Generate 3 unique coffee recipes for someone feeling ${mood}.`;
      if (selectedCaffeine !== 'ANY') {
        prompt += ` The recipes should have a ${selectedCaffeine.toLowerCase()} caffeine level.`
      }
      if (selectedDiets.length > 0) {
        prompt += ` They must adhere to these dietary styles: ${selectedDiets.join(', ')}.`
      }
      const newRecipes = await generateRecipes(prompt);
      setMoodRecipes(newRecipes);
      addRecipes(newRecipes);
      await generateImagesForRecipes(newRecipes, setMoodRecipes);
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message.includes("API Key is missing")) {
        setError("Failed to connect to the API. Please ensure the API key is configured correctly.");
      } else {
        setError('Sorry, we couldn\'t brew up any recipes for that mood. Please try another!');
      }
    } finally {
      setIsLoadingMood(false);
    }
  };

  const handlePantryGenerate = async (ingredients: string) => {
    setView('main');
    setIsLoadingPantry(true);
    setError(null);
    setPantryRecipes([]);
    setMoodRecipes([]);
    setActiveMood(null);

    try {
      let prompt = `Generate 3 unique coffee recipes using the following ingredients: ${ingredients}.`;
      if (selectedCaffeine !== 'ANY') {
        prompt += ` The recipes should have a ${selectedCaffeine.toLowerCase()} caffeine level.`
      }
       if (selectedDiets.length > 0) {
        prompt += ` They must adhere to these dietary styles: ${selectedDiets.join(', ')}.`
      }
      const newRecipes = await generateRecipes(prompt);
      setPantryRecipes(newRecipes);
      addRecipes(newRecipes);
      await generateImagesForRecipes(newRecipes, setPantryRecipes);
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message.includes("API Key is missing")) {
        setError("Failed to connect to the API. Please ensure the API key is configured correctly.");
      } else {
        setError('Sorry, we couldn\'t alchemize those ingredients. Please try a different mix!');
      }
    } finally {
      setIsLoadingPantry(false);
    }
  };

  const handleLoadMoreTrendingRecipes = async () => {
    setIsLoadingMore(true);
    setError(null);
  
    try {
      const existingTitles = [...webTrendingRecipes, ...staticTrendingRecipes].map(r => r.title).join(', ');
      const prompt = `Generate 4 more unique and viral coffee recipes from the web that are not these: ${existingTitles}. Think historic viral hits or popular recipes from the last year.`;
      const newRecipes = await findTrendingRecipes(prompt);
      
      setWebTrendingRecipes(prev => [...prev, ...newRecipes]);
      addRecipes(newRecipes);
      
      // Disabling image generation to preserve API quota.
      // await generateImagesForRecipes(newRecipes, setWebTrendingRecipes);
  
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message.includes("API Key is missing")) {
        setError("Failed to connect to the API. Please ensure the API key is configured correctly.");
      } else {
        setError('Could not fetch more trends at the moment. Please try again later.');
      }
    } finally {
      setIsLoadingMore(false);
    }
  };
  
  const clearAllGenerations = () => {
    setActiveMood(null);
    setMoodRecipes([]);
    setPantryRecipes([]);
    setView('home'); // Go back to home when clearing
  }

  const baseRecipes = useMemo(() => (
    moodRecipes.length > 0 ? moodRecipes :
    pantryRecipes.length > 0 ? pantryRecipes :
    webTrendingRecipes.length > 0 ? webTrendingRecipes :
    staticTrendingRecipes
  ), [moodRecipes, pantryRecipes, webTrendingRecipes, staticTrendingRecipes]);
  
  const filteredRecipes = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();

    return baseRecipes.filter(recipe => {
      const queryMatch = searchQuery ?
        recipe.title.toLowerCase().includes(lowercasedQuery) ||
        recipe.description.toLowerCase().includes(lowercasedQuery) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(lowercasedQuery))
        : true;

      const tagsMatch = selectedTags.length > 0 ?
        selectedTags.every(tag => recipe.tags.some(rt => rt.toUpperCase() === tag.toUpperCase()))
        : true;
      
      const caffeineMatch = selectedCaffeine !== 'ANY' ? 
        recipe.tags.some(rt => rt.toUpperCase() === `${selectedCaffeine}_CAFFEINE`)
        : true;
      
      const dietMatch = selectedDiets.length > 0 ?
        selectedDiets.every(diet => recipe.tags.some(rt => rt.toUpperCase() === diet.toUpperCase()))
        : true;

      return queryMatch && tagsMatch && caffeineMatch && dietMatch;
    });
  }, [baseRecipes, searchQuery, selectedTags, selectedCaffeine, selectedDiets]);

  const title = activeMood ? `Brews for feeling ${activeMood}` : pantryRecipes.length > 0 ? 'Your Pantry Creations' : 'Dive Into Taste Trends';
  const showClearButton = !!activeMood || pantryRecipes.length > 0;
  const showLoadMoreButton = !activeMood && pantryRecipes.length === 0;
  const filtersAreActive = searchQuery.length > 0 || selectedTags.length > 0 || selectedCaffeine !== 'ANY' || selectedDiets.length > 0;
  const isBuzzBoard = !activeMood && pantryRecipes.length === 0;
  const currentTrendingRecipes = webTrendingRecipes.length > 0 ? webTrendingRecipes : staticTrendingRecipes;

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <HomePage
            onNavigate={setView}
            onSelectRecipe={setSelectedRecipe}
            trendingRecipes={currentTrendingRecipes}
            onLoadMore={handleLoadMoreTrendingRecipes}
            isLoadingMore={isLoadingMore}
            isLoadingTrends={isLoadingTrends}
          />
        );
      case 'creator':
        return (
          <RecipeCreator 
            onMoodSelect={handleMoodSelect}
            onPantryGenerate={handlePantryGenerate}
            isLoadingMood={isLoadingMood}
            isLoadingPantry={isLoadingPantry}
            activeMood={activeMood}
          />
        );
      case 'main':
        const loadingText = isLoadingMood
            ? `Crafting brews for feeling ${activeMood}...`
            : isLoadingPantry
            ? 'Alchemizing your pantry ingredients...'
            : isBuzzBoard && isLoadingTrends
            ? 'Discovering the latest taste trends...'
            : 'Brewing up ideas...';

        return (
          <>
            <BrewFinder />

            {error && <p className="text-center text-red-600 bg-red-100 p-3 rounded-lg my-4 font-bold">{error}</p>}
            
            <RecipeList
              key={title} 
              title={title}
              recipes={filteredRecipes}
              isLoading={isLoadingMood || isLoadingPantry || (isBuzzBoard && isLoadingTrends)}
              loadingText={loadingText}
              onSelectRecipe={setSelectedRecipe}
              showClearButton={showClearButton}
              onClear={clearAllGenerations}
              isFiltered={filtersAreActive}
              onLoadMore={showLoadMoreButton ? handleLoadMoreTrendingRecipes : undefined}
              isLoadingMore={isLoadingMore}
            />
          </>
        );
      case 'myBrews':
        return <MyBrews onSelectRecipe={setSelectedRecipe} />;
      case 'myQueue':
        return <MyQueue onSelectRecipe={setSelectedRecipe} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream text-brown-dark font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header onNavigate={setView} />
        <main className="space-y-12">
          {renderContent()}
        </main>
        <footer className="text-center py-10 text-brown/60 text-sm mt-16">
          <p>&copy; {new Date().getFullYear()} BrewMuse. Crafted with ☕.</p>
          <button 
            onClick={() => setIsAboutModalOpen(true)} 
            className="mt-2 text-brown/80 hover:text-brown underline rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-cream"
          >
            About BrewMuse
          </button>
        </footer>
      </div>
      {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
      {isAboutModalOpen && <AboutModal onClose={() => setIsAboutModalOpen(false)} />}
    </div>
  );
};

export default App;
