import * as _ from 'lodash';
import { Reducer } from 'redux';

import { CartActionType } from '../actions';
import { initialState } from '../initial-state';
import { CartItem } from '../../entries/cart-item';

export const cartReducer: Reducer = (state = initialState.cartItems, action) => {
  switch (action.type) {
    case CartActionType.SET_CART_ITEMS:
      return action.payload.cartItems;
    case CartActionType.ADD_CART_ITEM:
      return [...state, action.payload.cartItem];
    case CartActionType.UPDATE_CART_ITEM:
      const currentCartItemIndex: number = _.findIndex(state, { id: action.payload.cartItem.id });
      let newState = [...state];

      if (currentCartItemIndex !== -1) {
        newState[currentCartItemIndex] = action.payload.cartItem;
      }

      return [...newState];
    case CartActionType.DELETE_CART_ITEM:
      return [..._.filter(state, (cartItem: CartItem) => cartItem.id !== action.payload.cartItemId)];
    case CartActionType.DELETE_CART_ITEMS:
      return [..._.filter(state, (cartItem: CartItem) => !_.includes(action.payload.cartItemIds, cartItem.id) )];
    default:
      return state;
  }
};