import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { RecipeList } from './components/RecipeList';
import { RecipeModal } from './components/RecipeModal';
import MyBrews from './components/MyBrews';
import { TRENDING_RECIPES } from './constants';
import { generateRecipes, generateImage } from './services/geminiService';
import { Recipe } from './types';
import { BrewFinder } from './components/BrewFinder';

type View = 'main' | 'myBrews';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const App: React.FC = () => {
  const [trendingRecipes, setTrendingRecipes] = useState<Recipe[]>(TRENDING_RECIPES);
  const [moodRecipes, setMoodRecipes] = useState<Recipe[]>([]);
  const [pantryRecipes, setPantryRecipes] = useState<Recipe[]>([]);
  const [activeMood, setActiveMood] = useState<string | null>(null);

  const [isLoadingMood, setIsLoadingMood] = useState(false);
  const [isLoadingPantry, setIsLoadingPantry] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [view, setView] = useState<View>('main');
  
  // New state for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const generateImagesForRecipes = useCallback(async (recipes: Recipe[], setter: React.Dispatch<React.SetStateAction<Recipe[]>>) => {
    for (const recipe of recipes) {
      if (recipe.imageUrl) continue;

      const cachedUrl = localStorage.getItem(`image_${recipe.id}`);
      if (cachedUrl) {
        setter(prev => prev.map(r => r.id === recipe.id ? { ...r, imageUrl: cachedUrl } : r));
        continue;
      }

      try {
        await sleep(5000);
        
        const imageUrl = await generateImage(recipe.imagePrompt);
        
        localStorage.setItem(`image_${recipe.id}`, imageUrl);
        
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
  }, []);


  useEffect(() => {
    const loadInitialImages = async () => {
      setError(null);
      const recipesWithCache = trendingRecipes.map(recipe => {
        const cachedUrl = localStorage.getItem(`image_${recipe.id}`);
        return cachedUrl ? { ...recipe, imageUrl: cachedUrl } : recipe;
      });
      setTrendingRecipes(recipesWithCache);

      await generateImagesForRecipes(recipesWithCache, setTrendingRecipes);
    };

    loadInitialImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleMoodSelect = async (mood: string) => {
    setActiveMood(mood);
    setIsLoadingMood(true);
    setError(null);
    setMoodRecipes([]);
    setPantryRecipes([]);
    setSearchQuery('');
    setSelectedTags([]);

    try {
      const prompt = `Generate 3 unique coffee recipes for someone feeling ${mood}.`;
      const newRecipes = await generateRecipes(prompt);
      setMoodRecipes(newRecipes);
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
    setIsLoadingPantry(true);
    setError(null);
    setPantryRecipes([]);
    setMoodRecipes([]);
    setActiveMood(null);
    setSearchQuery('');
    setSelectedTags([]);

    try {
      const prompt = `Generate 3 unique coffee recipes using the following ingredients: ${ingredients}.`;
      const newRecipes = await generateRecipes(prompt);
      setPantryRecipes(newRecipes);
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
  
  const clearAllGenerations = () => {
    setActiveMood(null);
    setMoodRecipes([]);
    setPantryRecipes([]);
  }

  const baseRecipes = moodRecipes.length > 0 ? moodRecipes : pantryRecipes.length > 0 ? pantryRecipes : trendingRecipes;
  
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

      return queryMatch && tagsMatch;
    });
  }, [baseRecipes, searchQuery, selectedTags]);

  const title = activeMood ? `Brews for feeling ${activeMood}` : pantryRecipes.length > 0 ? 'Your Pantry Creations' : 'The BuzzBoard';
  const showClearButton = !!activeMood || pantryRecipes.length > 0;
  const filtersAreActive = searchQuery.length > 0 || selectedTags.length > 0;

  return (
    <div className="min-h-screen bg-cream text-brown font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header onNavigate={setView} />
        <main className="space-y-12">
          {view === 'main' ? (
            <>
              <BrewFinder 
                onMoodSelect={handleMoodSelect}
                onPantryGenerate={handlePantryGenerate}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                isLoadingMood={isLoadingMood}
                isLoadingPantry={isLoadingPantry}
                activeMood={activeMood}
              />

              {error && <p className="text-center text-red-600 bg-red-100 p-3 rounded-lg my-4 font-bold">{error}</p>}
              
              <RecipeList
                key={title} 
                title={title}
                recipes={filteredRecipes}
                isLoading={isLoadingMood || isLoadingPantry}
                onSelectRecipe={setSelectedRecipe}
                showClearButton={showClearButton}
                onClear={clearAllGenerations}
                isFiltered={filtersAreActive}
              />
            </>
          ) : (
            <MyBrews onSelectRecipe={setSelectedRecipe} />
          )}
        </main>
        <footer className="text-center py-10 text-brown/60 text-sm mt-16">
          <p>&copy; {new Date().getFullYear()} BrewMuse. All rights reserved.</p>
        </footer>
      </div>
      {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
    </div>
  );
};

export default App;
