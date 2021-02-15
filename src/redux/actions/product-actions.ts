import * as _ from 'lodash';
import store from '../store';

export enum ProductActionType {
  SET_PRODUCTS = 'SET_PRODUCTS'
}

export const setProducts = (products) => (
  store.dispatch({
    type: ProductActionType.SET_PRODUCTS,
    payload: { products }
  })
);

export const getProducts = () => store.getState().products;

export const getProduct = (productId: number) => _.find(store.getState().products, { id: productId });