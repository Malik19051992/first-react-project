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

export const getProducts = ()=> store.getState().products;