import * as _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import './cart-item.scss';
import { CartItem as CartItemEntry } from '../../entries/cart-item';
import { deleteCartItem, updateCartItem } from '../../redux/actions';

export class CartItem extends React.Component<{ cartItem: CartItemEntry }, any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(newProps) {
  }

  render() {
    return (
      <div className="cart-item-wrapper">
        <div className="cart-item-checkbox-wrapper">
          <input type="checkbox" onChange={this.checkboxChangedHandler.bind(this)}
                 checked={this.props.cartItem.selected}/>
        </div>
        <div className="cart-item-src">
          <img src={this.props.cartItem.product.src}/>
        </div>
        <div className="cart-item-data">
          <div className="cart-item-data-title">
            {this.props.cartItem.product.title}
          </div>
          {/*other data*/}
        </div>
        <div className="cart-item-count">
          {this.props.cartItem.count}
        </div>
        <div className="cart-item-price">
          {this.props.cartItem.product.price} руб.
        </div>
        <div className="cart-item-delete">
          <div onClick={this.cartItemDeleteHandler.bind(this)}>
            +
          </div>
        </div>
      </div>);
  }

  private checkboxChangedHandler(event) {
    this.props.cartItem.selected = event.target.checked;

    updateCartItem(this.props.cartItem);
  }

  private cartItemDeleteHandler() {
    deleteCartItem(this.props.cartItem.id);
  }
}