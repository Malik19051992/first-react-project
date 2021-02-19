import * as _ from 'lodash';
import React from 'react';
import { Unsubscribe } from 'redux';
import { Link } from 'react-router-dom';

import './cart.scss';
import { getStoreSubscription } from '../../redux/store';
import { CartItem as CartItemComponent } from '../cart-item/cart-item';
import { CartItem } from '../../entries/cart-item';
import { getCartItems, deleteCartItems } from '../../redux/actions';

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
    const selectedCartItems: CartItem[] = _.filter(this.state?.cartItems, {selected: true});

    return (
      <div className="cart-wrapper">
        {_.map(this.state?.cartItems, (cartItem: CartItem, index: number) => {
          return (<CartItemComponent key={index} cartItem={cartItem}></CartItemComponent>);
        })}

        <div className="cart-checkout-wrapper">
          {selectedCartItems.length ? (
            <div>
              <div>Итого товаров: {selectedCartItems.length} шт. </div>
              <div>Общая сумма {_.sum(_.map(selectedCartItems,'product.price'))} руб.</div>
              <button onClick={this.checkoutClickHandler.bind(this)}>Подтвердить и оформить заказ</button>
            </div>
          ): null}
        </div>

      </div>);
  }

  private checkoutClickHandler(){
    deleteCartItems(_.map(_.filter(this.state?.cartItems, {selected: true}),'id'));
  }
}