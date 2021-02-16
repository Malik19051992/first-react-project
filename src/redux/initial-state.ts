import { Category } from '../entries/category';
import { Product } from '../entries/product';
import { CartItem } from '../entries/cart-item';

interface InitialState {
  categories: Category[],
  products: Product[],
  cartItems: CartItem[]
}

export const initialState: InitialState = {
  categories: [],
  products: [],
  cartItems: []
};