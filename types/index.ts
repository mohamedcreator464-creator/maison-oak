export type Category =
  | "Living Room"
  | "Bedroom"
  | "Dining"
  | "Office"
  | "Outdoor"
  | "Kids";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  material: string;
  color: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  description: string;
  details: string[];
  dimensions: string;
  images: string[];
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  image: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  avatar: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
