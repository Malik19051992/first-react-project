import React from 'react';

import './product-list-item.scss';
import { Product } from '../../entries/product';
import { ProductRating } from '../product-rating/product-rating';

export class ProductListItem extends React.Component<{ product: Product }, { product: Product }> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="product-list-item-wrapper">
          <div className="product-list-item-src-wrapper">
            <img className="product-list-item-src" src={this.props.product.src}/>
          </div>
          <div className="product-list-item-product-data-wrapper">
            <div className="product-list-item-product-data">
              <div className="product-list-item-product-title">{this.props.product.title}</div>
              <div className="product-list-item-product-category">{this.props.product.category ?.title}</div>
              <div className="product-list-item-product-rating">
                <ProductRating rating={this.props.product.rating}></ProductRating>
              </div>
            </div>
            <div className="product-list-item-product-price">{this.props.product.price} руб.</div>
          </div>
      </div>
    );
  }
}