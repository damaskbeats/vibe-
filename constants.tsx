
import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Vanilla Bean Oat Latte',
    description: 'Double shot of espresso, house-made vanilla bean syrup, and steamed oat milk.',
    price: 6.50,
    discountPrice: 4.50,
    isHappyHour: true,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    name: 'Matcha Forest Whisk',
    description: 'Ceremonial grade matcha whisked with hint of honey and creamy milk.',
    price: 7.00,
    category: 'specialty',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    name: 'Rainy Day Cocoa',
    description: '70% dark chocolate with toasted marshmallow and a dash of sea salt.',
    price: 5.50,
    category: 'specialty',
    image: 'https://images.unsplash.com/photo-1544787210-2213d84ad282?auto=format&fit=crop&w=400&q=80',
    seasonal: true,
  },
  {
    id: '4',
    name: 'Espresso Macchiato',
    description: 'A classic double shot stained with a dollop of micro-foam.',
    price: 4.25,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '5',
    name: 'Almond Butter Croissant',
    description: 'Flaky, buttery layers with roasted almond cream and toasted slivers.',
    price: 5.75,
    discountPrice: 3.50,
    isHappyHour: true,
    category: 'pastry',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '6',
    name: 'Lavender Earl Grey',
    description: 'Floral notes blended with bergamot and a spray of dried lavender.',
    price: 5.00,
    category: 'tea',
    image: 'https://images.unsplash.com/photo-1544787210-2213d84ad282?auto=format&fit=crop&w=400&q=80',
  },
];
