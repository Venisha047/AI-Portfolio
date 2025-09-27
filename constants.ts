import { Recipe } from './types';

export const MOODS = [
  { name: 'Energized', icon: '⚡' },
  { name: 'Focused', icon: '🎯' },
  { name: 'Relaxed', icon: '🧘' },
  { name: 'Indulgent', icon: '🍰' },
  { name: 'Creative', icon: '🎨' },
];

export const TRENDING_RECIPES: Recipe[] = [
  {
    id: 'trend-1',
    title: 'Spanish Latte',
    description: 'A sweet and creamy delight, combining strong espresso with condensed milk for a rich, velvety texture that’s popular worldwide.',
    tags: ['HOT', 'SWEET', 'STRONG'],
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
  },
  {
    id: 'trend-2',
    title: 'Japanese Iced Coffee',
    description: 'An exceptionally clean and crisp iced coffee, made by brewing hot coffee directly over ice, instantly locking in flavor and aroma.',
    tags: ['ICED', 'CRISP', 'MEDIUM'],
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
  },
  {
    id: 'trend-3',
    title: 'Espresso & Tonic',
    description: 'A sparkling and refreshing coffee mocktail. The bright, bitter notes of tonic water perfectly complement the rich complexity of espresso.',
    tags: ['ICED', 'REFRESHING', 'BOLD'],
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
  },
  {
    id: 'trend-4',
    title: 'Proffee (Protein Coffee)',
    description: 'The ultimate morning multi-tasker. Combine your coffee fix with a protein boost for a drink that fuels your muscles and your mind.',
    tags: ['ICED', 'HEALTHY', 'STRONG'],
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
  },
];
