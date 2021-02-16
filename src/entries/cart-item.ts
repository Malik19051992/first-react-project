import { Product } from './product';

export interface CartItem {
  id: number;
  productId: number;
  product: Product;
  count: number;
}