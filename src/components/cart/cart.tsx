import * as _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import './cart.scss';
import store from '../../redux/store';
import { CartItem as CartItemComponent } from '../cart-item/cart-item';
import { CartItem } from '../../entries/cart-item';
import { getCartItems, updateCartItem } from '../../redux/actions';

export class Cart extends React.Component<any, { cartItems: CartItem[] }> {
  constructor(props: any) {
    super(props);
    this.setState({ cartItems: [] });
  }

  componentDidMount() {
    this.setState({ cartItems: getCartItems() });

    store.subscribe(() => {
      this.setState({ cartItems: getCartItems() });
    });
  }

  componentWillReceiveProps(newProps) {
  }

  render() {
    return (
      <div className="cart-wrapper">
        {_.map(this.state?.cartItems, (cartItem: CartItem, index: number) => {
          return (<CartItemComponent key={index} cartItem={cartItem} cartItemSelectedChangeHandler={this.cartItemSelectedChangeHandler.bind(this)}></CartItemComponent>);
        })}
      </div>);
  }

  public cartItemSelectedChangeHandler(itemId: number, value: boolean) {
    if (!this.state) {
      return;
    }

    const cartItem: CartItem = _.find(this.state.cartItems, { id: itemId });

    if (cartItem) {
      cartItem.selected = value;
    }

    updateCartItem(cartItem);
  }
}