import { Category } from './category';

export interface Product {
  id: number;
  title: string;
  price: number;
  src: string;
  rating: number;
  category?: Category;
  categoryId?: number;
  description?: string;
}