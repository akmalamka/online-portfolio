export const PER_PAGE = 5;
export const RECIPE_SLICE = 3;

// export const baseUrl = 'http://localhost:8080';
export const baseUrl = 'https://api-biteofappetite.com';

export function validURL(str: string) {
  const url = str.slice(0, 30);
  return url === baseUrl;
}
export const filterMenu = [
  {
    type: 'Cuisine',
    choice: [
      'Indonesian',
      'Japanese',
      'Korean',
      'Italian',
      'Fusion',
      'Chinese',
      'Western',
    ],
  },
  {
    type: 'Food Type',
    choice: [
      'Condiment',
      'Appetizer',
      'Main Course',
      'Dessert',
      'Snacks',
      'Breakfast',
    ],
  },
  {
    type: 'Main Ingredient',
    choice: [
      'Poultry',
      'Meat',
      'Seafood',
      'Egg',
      'Rice',
      'Fruits',
      'Vegetables',
      'Chocolate',
      'Pasta',
    ],
  },
  { type: 'Difficulty', choice: ['Rookie', 'Easy', 'Medium', 'Hard'] },
];

export const decimalMap = [
  { decimal: '0.25', fraction: '¼' },
  { decimal: '0.33', fraction: '⅓' },
  { decimal: '0.5', fraction: '½' },
  { decimal: '0.66', fraction: '⅔' },
  { decimal: '0.75', fraction: '¾' },
];

//buat ambil desimalnya
// const decimal = n - Math.floor(n)
