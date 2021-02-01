import { Reducer } from 'redux';

import { ProductActionType } from '../actions/product-actions';
import { initialState } from '../initial-state';

export const productReducer: Reducer = (state = initialState.products, action) => {
  switch (action.type) {
    case ProductActionType.SET_PRODUCTS:
      return action.payload.products;
    default:
      return state;
  }
};