import { Category } from '../entries/category';
import { Product } from '../entries/product';

interface InitialState {
  categories: Category[],
  products: Product[]
}

export const initialState: InitialState = {
  categories: [],
  products: []
};