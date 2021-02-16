import * as _ from 'lodash';
import store from '../store';
import { CartItem } from '../../entries/cart-item';
import { LocalStorageItem, LocalStorageUtils } from '../../utils/local-storage.utils';

export enum CartActionType {
  SET_CART_ITEMS = 'SET_CART_ITEMS',
  ADD_CART_ITEM = 'ADD_CART_ITEM',
  UPDATE_CART_ITEM = 'UPDATE_CART_ITEM',
  DELETE_CART_ITEM = 'DELETE_CART_ITEM'
}

export const setCartItems = (cartItems: CartItem[]) => {
  const currentCartItems: CartItem[] = _.map(cartItems, (cartItem: CartItem) => {
    const cartItemForSave: CartItem = { ...cartItem };
    delete cartItemForSave.product;

    return cartItemForSave
  });

  LocalStorageUtils.set(LocalStorageItem.CART, currentCartItems);

  store.dispatch({
    type: CartActionType.SET_CART_ITEMS,
    payload: { cartItems }
  });
}


export const addCartItem = (cartItem: CartItem) => {
  const currentCartItems: CartItem[] = LocalStorageUtils.get(LocalStorageItem.CART) || [];
  const cartItemForSave: CartItem = { ...cartItem };
  delete cartItemForSave.product;

  LocalStorageUtils.set(LocalStorageItem.CART, [...currentCartItems, cartItemForSave]);

  store.dispatch({
    type: CartActionType.ADD_CART_ITEM,
    payload: { cartItem }
  });
}

export const updateCartItem = (cartItem: CartItem) => {
  const currentCartItems: CartItem[] = LocalStorageUtils.get(LocalStorageItem.CART) || [];
  const cartItemForSave: CartItem = { ...cartItem };
  delete cartItemForSave.product;

  const currentCartItemIndex: number = _.findIndex(currentCartItems, { id: cartItem.id });

  if (currentCartItemIndex !== -1) {
    currentCartItems[currentCartItemIndex] = cartItemForSave;
  }

  LocalStorageUtils.set(LocalStorageItem.CART, currentCartItems);

  store.dispatch({
    type: CartActionType.UPDATE_CART_ITEM,
    payload: { cartItem }
  });
}

export const deleteCartItem = (cartItemId: number) => {
  const currentCartItems: CartItem[] = _.filter(LocalStorageUtils.get(LocalStorageItem.CART) || [], (cartItem: CartItem) => cartItem.id !== cartItemId);
  LocalStorageUtils.set(LocalStorageItem.CART, currentCartItems);

  store.dispatch({
    type: CartActionType.DELETE_CART_ITEM,
    payload: { cartItemId }
  });
}


export const getCartItems = () => store.getState().cartItems;