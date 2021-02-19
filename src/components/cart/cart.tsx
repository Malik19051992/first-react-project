import * as _ from 'lodash';
import React from 'react';
import { Unsubscribe } from 'redux';
import { Link } from 'react-router-dom';

import './cart.scss';
import { getStoreSubscription } from '../../redux/store';
import { CartItem as CartItemComponent } from '../cart-item/cart-item';
import { CartItem } from '../../entries/cart-item';
import { getCartItems } from '../../redux/actions';

export class Cart extends React.Component<any, { cartItems: CartItem[] }> {
  private unsubscribe: Unsubscribe;

  constructor(props: any) {
    super(props);
    this.setState({ cartItems: [] });
  }

  componentDidMount() {
    this.setState({ cartItems: getCartItems() });

    this.unsubscribe = getStoreSubscription(() => {
      this.setState({ cartItems: getCartItems() });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentWillReceiveProps(newProps) {
  }

  render() {
    return (
      <div className="cart-wrapper">
        {_.map(this.state?.cartItems, (cartItem: CartItem, index: number) => {
          return (<CartItemComponent key={index} cartItem={cartItem}></CartItemComponent>);
        })}
      </div>);
  }
}