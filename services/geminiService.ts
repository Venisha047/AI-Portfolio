import { GoogleGenAI, Type } from '@google/genai';
import { Recipe } from '../types';

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
      description: "An array of 3-4 short, descriptive tags like 'ICED', 'SWEET', 'STRONG'."
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
  },
  required: ['id', 'title', 'description', 'tags', 'ingredients', 'instructions', 'imagePrompt']
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

export const generateRecipes = async (prompt: string): Promise<Recipe[]> => {
  const fullPrompt = `You are BrewMuse, an expert AI coffee sommelier. Your task is to generate coffee recipes based on user requests. ${prompt}. You must return a valid JSON array of recipe objects, adhering strictly to the provided schema. Each recipe needs a unique ID.`;

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