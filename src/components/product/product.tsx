import * as _ from 'lodash';
import React from 'react';
import { Unsubscribe } from 'redux';

import './product.scss';
import { getStoreSubscription } from '../../redux/store';
import { getProduct, addCartItem, getCartItems } from '../../redux/actions';
import { Product as ProductEntry } from '../../entries/product';
import { ProductRating } from '../product-rating/product-rating';
import { CartItem } from '../../entries/cart-item';

export class Product extends React.Component<{ match: any }, { product: ProductEntry, inCart: boolean }> {
  private unsubscribe: Unsubscribe;

  constructor(props: any) {
    super(props);

  }

  componentDidMount() {
    this.setState({ product: null, inCart: false }, (() => {
      this.setProduct(+this.props.match.params.productId);

      this.unsubscribe = getStoreSubscription(() => {
        this.setState({ inCart: this.checkIsInCart() });
      });
    }).bind(this));
  }

  componentWillReceiveProps(newProps) {
    this.setProduct(+newProps.match.params.productId);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const addToCartElement = this.state?.inCart?
    (<div className="product-data-in-cart"> &#10004; Уже в корзине </div>) :
    (<button onClick={this.addInCartClickHandler.bind(this)}> Добавить в корзину</button>);

    return (
      <div className="product-wrapper">
        <div className="product-src">
          <img src={this.state?.product?.src}/>
        </div>
        <div className="product-data">
          <h1 className="product-data-title">{this.state?.product?.title}</h1>
          <div className="product-data-rating">
            <ProductRating rating={this.state?.product?.rating}></ProductRating>
          </div>
          <h1 className="product-data-price">{this.state?.product?.price} руб.</h1>
          <div className="product-data-add-to-cart">
            {addToCartElement}
          </div>
          <div className="product-data-description">{this.state?.product?.description}</div>
        </div>
      </div>
    );
  }

  private addInCartClickHandler() {
    const cartItem: CartItem = {
      id: (+_.max(_.map(getCartItems(), 'id')) + 1) || 1,
      productId: this.state.product.id,
      product: this.state.product,
      count: 1
    };
    addCartItem(cartItem);
  }

  private setProduct(productId: number, innerCall: boolean = false) {
    if (productId) {
      this.setState({ product: getProduct(productId) }, () => {

        // kostyl for case when we start from product page
        if (!this.state.product && !innerCall) {
          this.setProduct(productId, true);
        }

        this.setState({ inCart: this.checkIsInCart() });
      });
    }
  }

  private checkIsInCart() {
    return _.find(getCartItems(), { productId: this.state?.product?.id });
  }
}