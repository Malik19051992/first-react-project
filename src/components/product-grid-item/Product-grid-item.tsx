import React from 'react';

import './Product-grid-item.scss';
import { Product } from '../../entries/Product';
import { ProductRating } from '../product-rating/Product-rating';

export class ProductGridItem extends React.Component<{ product: Product }, { product: Product }> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="product-grid-item-wrapper">
        <a>
          <div className="product-grid-item-src-wrapper">
            <img className="product-grid-item-src" src={this.props.product.src}/>
          </div>
          <div className="product-grid-item-product-data">
            <div className="product-grid-item-product-title">{this.props.product.title}</div>
            <div className="product-grid-item-product-category">{this.props.product.category?.title}</div>
            <div className="product-grid-item-product-rating">
              <ProductRating rating={this.props.product.rating}></ProductRating>
            </div>
            <div className="product-grid-item-product-price">{this.props.product.price} руб.</div>
          </div>
        </a>
      </div>
    );
  }
}