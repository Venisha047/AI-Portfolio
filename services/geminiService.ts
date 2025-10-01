
import { GoogleGenAI, Type } from '@google/genai';
import { Recipe, GroundingSource } from '../types';

// Use a lazy-initialized variable for the AI client to handle missing API keys gracefully.
let ai: GoogleGenAI | null = null;

/**
 * Initializes and returns the GoogleGenAI client instance on-demand.
 * Throws a specific error if the API key is not configured.
 */
const getAiClient = (): GoogleGenAI => {
  if (ai) {
    return ai;
  }
  
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    // This custom error message will be caught and displayed in the UI.
    throw new Error("API Key is missing.");
  }

  ai = new GoogleGenAI({ apiKey });
  return ai;
};

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING, description: "A unique identifier string for the recipe, e.g., 'mood-123'" },
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    tags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "An array of 3-5 short, descriptive tags like 'ICED', 'SWEET', 'STRONG'. Crucially, it MUST include one caffeine level tag from this list: 'HIGH_CAFFEINE', 'MEDIUM_CAFFEINE', 'LOW_CAFFEINE', 'DECAF'. It can also include dietary tags like 'VEGAN', 'DAIRY_FREE', 'LOW_SUGAR'."
    },
    ingredients: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of ingredients with quantities, e.g., '2 shots of espresso'."
    },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of step-by-step instructions."
    },
    imagePrompt: { 
      type: Type.STRING,
      description: "A detailed, vibrant, and photorealistic prompt for an image generation model. Do not include people. Focus on the coffee."
    },
    prepTime: {
        type: Type.STRING,
        description: "An estimated preparation time, e.g., '5 minutes'."
    },
    difficulty: {
        type: Type.STRING,
        description: "The difficulty level, which must be one of: 'Easy', 'Medium', or 'Hard'."
    },
    flavorProfile: {
      type: Type.STRING,
      description: "A short, enticing description of the coffee's taste, aroma, and texture."
    },
    brewingTips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 2-3 helpful, actionable tips for brewing this specific recipe."
    },
    originStory: {
        type: Type.STRING,
        description: "A brief, engaging story (2-3 sentences) about the recipe's origin, cultural significance, or a fun fact."
    },
    calories: { type: Type.STRING, description: "Estimated calories, e.g., '150 kcal'." },
    protein: { type: Type.STRING, description: "Estimated protein in grams, e.g., '5g'." },
    sugar: { type: Type.STRING, description: "Estimated sugar in grams, e.g., '20g'." },
    fat: { type: Type.STRING, description: "Estimated fat in grams, e.g., '8g'." },
  },
  required: ['id', 'title', 'description', 'tags', 'ingredients', 'instructions', 'imagePrompt', 'prepTime', 'difficulty', 'flavorProfile', 'brewingTips', 'originStory']
};

export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const client = getAiClient(); // This can throw if API key is missing
    const response = await client.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    throw new Error('Image generation failed to produce an image.');
  } catch (error) {
    console.error('Error generating image:', error);
    throw error; // Re-throw the original error to be handled by the UI
  }
};

export const findTrendingRecipes = async (prompt: string): Promise<Recipe[]> => {
  const fullPrompt = `You are BrewMuse, an expert AI coffee sommelier and trend researcher. Your task is to find unique coffee recipes based on the user request: "${prompt}". You MUST use your search tool to find real, currently trending recipes.

  Format your entire response as a single, valid JSON array of recipe objects, returned inside a \`\`\`json markdown block. Do not include any text before or after the JSON block.

  The JSON objects must strictly adhere to the following TypeScript interface:
  
  interface Recipe {
    id: string; // A unique identifier string for the recipe, e.g., 'trend-abc-123'
    title: string;
    description: string;
    tags: string[]; // An array of 3-5 short, descriptive tags. MUST include one caffeine level tag: 'HIGH_CAFFEINE', 'MEDIUM_CAFFEINE', 'LOW_CAFFEINE', or 'DECAF'.
    ingredients: string[];
    instructions: string[];
    imagePrompt: string; // A detailed, photorealistic prompt for an image generation model.
    prepTime: string; // e.g., '5 minutes'
    difficulty: 'Easy' | 'Medium' | 'Hard';
    flavorProfile: string;
    brewingTips: string[];
    originStory: string; // A brief, engaging story (2-3 sentences) about the recipe's origin or cultural significance.
    calories?: string;
    protein?: string;
    sugar?: string;
    fat?: string;
  }
  `;

  try {
    const client = getAiClient();
    const response = await client.models.generateContent({
       model: "gemini-2.5-flash",
       contents: fullPrompt,
       config: {
         tools: [{googleSearch: {}}],
       },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources: GroundingSource[] = groundingChunks
      ?.map(chunk => ({
        uri: chunk.web.uri,
        title: chunk.web.title,
      }))
      .filter(source => source.uri) || [];
    
    const jsonTextMatch = response.text.match(/```json\n([\s\S]*?)\n```/);
    if (!jsonTextMatch || !jsonTextMatch[1]) {
        console.warn("AI response did not contain a valid JSON block, attempting to parse entire response.", response.text);
        try {
            const recipes = JSON.parse(response.text);
             if (Array.isArray(recipes)) {
                return recipes.map(recipe => ({ ...recipe, sources })) as Recipe[];
             }
        } catch (e) {
             throw new Error("AI response could not be parsed as JSON.");
        }
        return [];
    }
    
    const recipes = JSON.parse(jsonTextMatch[1]);

    if (Array.isArray(recipes)) {
      return recipes.map(recipe => ({ ...recipe, sources })) as Recipe[];
    }
    
    return [];

  } catch (e) {
    console.error("Failed to find trending recipes:", e);
    throw e;
  }
};

export const generateRecipes = async (prompt: string): Promise<Recipe[]> => {
  const fullPrompt = `You are BrewMuse, an expert AI coffee sommelier. Your task is to generate 3 unique coffee recipes based on user requests. ${prompt}. You must return a valid JSON array of recipe objects, adhering strictly to the provided schema. Each recipe needs a unique ID. Ensure every recipe includes a valid 'prepTime', 'difficulty', a caffeine level tag, 'flavorProfile', 'brewingTips', and a short 'originStory'. Also, provide an estimated nutritional profile (calories, protein, sugar, fat) where possible. If the user provides dietary preferences, the recipes MUST conform to them.`;

  try {
    const client = getAiClient(); // This can throw if API key is missing
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: recipeSchema
        }
      }
    });

    const recipes = JSON.parse(response.text);
    if (Array.isArray(recipes) && recipes.length > 0) {
      return recipes as Recipe[];
    }
    return []; // Return empty array if AI gives nothing back
  } catch (e) {
    console.error("Failed to generate or parse recipes:", e);
    throw e; // Re-throw the original error to be handled by the UI
  }
};