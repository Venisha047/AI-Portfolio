import { Recipe } from './types';

export const MOODS = [
  { name: 'Energized', icon: '⚡' },
  { name: 'Focused', icon: '🎯' },
  { name: 'Relaxed', icon: '🧘' },
  { name: 'Indulgent', icon: '🍰' },
  { name: 'Creative', icon: '🎨' },
];

export const DIETARY_TAGS = ['VEGAN', 'DAIRY_FREE', 'LOW_SUGAR'];

export const TRENDING_RECIPES: Recipe[] = [
  {
    id: 'trend-1',
    title: 'Spanish Latte',
    description: 'A sweet and creamy delight, combining strong espresso with condensed milk for a rich, velvety texture that’s popular worldwide.',
    tags: ['HOT', 'SWEET', 'STRONG', 'HIGH_CAFFEINE'],
    prepTime: '5 minutes',
    difficulty: 'Easy',
    flavorProfile: 'Intensely sweet with a robust coffee backbone and a creamy, luxurious mouthfeel.',
    brewingTips: [
      'Use a dark roast espresso for a stronger flavor to cut through the sweetness.', 
      'For a colder version, pour over ice and use cold milk instead of steamed.'
    ],
    originStory: "The Spanish Latte, or 'Café con Leche' with a sweet twist, gained global fame from cafes in the Middle East. It swaps regular sugar for condensed milk, creating a uniquely rich and velvety texture that has made it a modern classic.",
    ingredients: ['2 shots of espresso', '1 oz (30ml) sweetened condensed milk', '6 oz (180ml) steamed milk'],
    instructions: [
      'Pour the sweetened condensed milk into the bottom of your cup.',
      'Brew two shots of fresh espresso directly over the condensed milk.',
      'Stir well to combine the espresso and condensed milk.',
      'Steam your milk to a velvety microfoam.',
      'Gently pour the steamed milk over the espresso mixture.',
      'Serve immediately and enjoy the creamy sweetness.'
    ],
    imagePrompt: 'A beautiful Spanish latte in a clear glass mug, showing the distinct layers of condensed milk, espresso, and steamed milk foam. Photorealistic, cafe setting.',
    imageUrl: 'https://images.unsplash.com/photo-1572483234954-3860c0f862f9?q=80&w=800&auto=format&fit=crop',
    calories: '180 kcal',
    protein: '5g',
    sugar: '25g',
    fat: '8g',
  },
  {
    id: 'trend-2',
    title: 'Japanese Iced Coffee',
    description: 'An exceptionally clean and crisp iced coffee, made by brewing hot coffee directly over ice, instantly locking in flavor and aroma.',
    tags: ['ICED', 'CRISP', 'MEDIUM', 'MEDIUM_CAFFEINE'],
    prepTime: '10 minutes',
    difficulty: 'Medium',
    flavorProfile: 'Clean and bright, with nuanced acidity and a smooth, tea-like body. Minimal bitterness.',
    brewingTips: [
      'A medium grind size is crucial to prevent under- or over-extraction.',
      'Use filtered water for the best taste, as impurities can affect the flavor.'
    ],
    originStory: 'Pioneered by Japanese coffee masters, this "flash-chilling" method was developed to preserve the delicate, aromatic compounds of coffee that are often lost in traditional cold brewing. It results in a brighter, more complex flavor profile.',
    ingredients: ['30g medium-fine ground coffee', '200g hot water (93°C/200°F)', '200g ice cubes'],
    instructions: [
      'Place a filter in your pour-over dripper and rinse with hot water.',
      'Add the ground coffee to the filter.',
      'Place the dripper on a carafe filled with the 200g of ice.',
      'Start your timer and slowly pour 60g of hot water over the grounds to bloom for 30 seconds.',
      'Continue pouring the remaining water in slow, concentric circles.',
      'Once all water has dripped through, swirl the carafe to melt any remaining ice.',
      'Serve in a glass over fresh ice.'
    ],
    imagePrompt: 'A minimalist shot of a Japanese iced coffee being poured from a glass server into a tall glass filled with perfectly clear ice cubes. Bright, clean lighting, photorealistic.',
    imageUrl: 'https://images.unsplash.com/photo-1598421253232-282464716a4f?q=80&w=800&auto=format&fit=crop',
    calories: '5 kcal',
    protein: '0g',
    sugar: '0g',
    fat: '0g',
  },
  {
    id: 'trend-3',
    title: 'Espresso & Tonic',
    description: 'A sparkling and refreshing coffee mocktail. The bright, bitter notes of tonic water perfectly complement the rich complexity of espresso.',
    tags: ['ICED', 'REFRESHING', 'BOLD', 'HIGH_CAFFEINE'],
    prepTime: '3 minutes',
    difficulty: 'Easy',
    flavorProfile: 'A surprising symphony of bitter, sweet, and acidic. Effervescent, with citrus notes and a rich coffee finish.',
    brewingTips: [
      'Use a high-quality tonic water; its flavor profile is key to the drink.',
      'A fruity, light-roast espresso works best to complement the tonic.'
    ],
    originStory: "The Espresso Tonic originated in Helsingborg, Sweden, at a coffee shop called Koppi. After a staff party where they mixed leftover espresso and tonic water, they discovered a surprisingly delicious combination that soon became a global coffee sensation.",
    ingredients: ['1 shot of espresso (chilled)', '5 oz (150ml) high-quality tonic water', 'Lime or orange wedge for garnish', 'Ice cubes'],
    instructions: [
      'Fill a tall glass to the brim with ice cubes.',
      'Pour the tonic water over the ice.',
      'Brew a shot of espresso and let it cool slightly for a few seconds.',
      'Slowly and gently pour the espresso over the tonic water to create a layered effect.',
      'Garnish with a wedge of lime or orange.',
      'Stir just before drinking to combine the flavors.'
    ],
    imagePrompt: 'A tall, elegant glass filled with ice and tonic water, with a shot of dark espresso being poured on top, creating a beautiful cascading effect. Garnished with an orange twist. Studio lighting, photorealistic.',
    imageUrl: 'https://images.unsplash.com/photo-1621215112567-0c7f1a455215?q=80&w=800&auto=format&fit=crop',
    calories: '40 kcal',
    protein: '0g',
    sugar: '10g',
    fat: '0g',
  },
  {
    id: 'trend-4',
    title: 'Proffee (Protein Coffee)',
    description: 'The ultimate morning multi-tasker. Combine your coffee fix with a protein boost for a drink that fuels your muscles and your mind.',
    tags: ['ICED', 'HEALTHY', 'STRONG', 'HIGH_CAFFEINE', 'LOW_SUGAR'],
    prepTime: '5 minutes',
    difficulty: 'Easy',
    flavorProfile: 'Varies by protein powder, but generally creamy and thick, like a coffee-flavored milkshake.',
    brewingTips: [
      'Mix the protein powder with a small amount of milk first to create a smooth paste before adding the coffee. This prevents clumps.',
      'Use a shaker bottle or blender for the smoothest consistency.'
    ],
    originStory: "Rising from the fitness communities on social media platforms like TikTok, 'Proffee' became a viral trend for its simplicity and effectiveness. It's a bio-hack for a busy lifestyle, merging the morning caffeine ritual with post-workout recovery.",
    ingredients: ['8 oz (240ml) cold brew or chilled coffee', '1 scoop of your favorite protein powder (vanilla or chocolate)', '4 oz (120ml) unsweetened almond milk', 'Optional: ice, sweetener'],
    instructions: [
      'In a shaker bottle or blender, add the almond milk and protein powder.',
      'Shake or blend until the protein powder is completely dissolved and smooth.',
      'Add the cold brew or chilled coffee to the shaker.',
      'Shake again until everything is well combined.',
      'Pour into a glass, over ice if desired.',
      'Add any extra sweetener to taste.'
    ],
    imagePrompt: 'A dynamic action shot of protein coffee being poured from a shaker bottle into a tall glass. The drink is frothy and appealing. Gym or fitness-themed background, photorealistic.',
    imageUrl: 'https://images.unsplash.com/photo-1622826310222-247065a3db3a?q=80&w=800&auto=format&fit=crop',
    calories: '150 kcal',
    protein: '25g',
    sugar: '2g',
    fat: '3g',
  },
];