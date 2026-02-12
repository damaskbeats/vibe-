
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  isHappyHour?: boolean;
  category: 'coffee' | 'tea' | 'pastry' | 'specialty';
  image: string;
  seasonal?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type WeatherMood = 'rainy' | 'sunny' | 'foggy' | 'melancholic' | 'inspired' | 'cozy';
