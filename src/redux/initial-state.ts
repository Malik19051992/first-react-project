import { Category } from '../entries/Category';
import { Product } from '../entries/Product';

interface InitialState {
  categories: Category[],
  products: Product[]
}

export const initialState: InitialState = {
  categories: [],
  products: []
};