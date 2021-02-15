import React from 'react';
import { Link } from 'react-router-dom';

import './product-grid-item.scss';
import { Product } from '../../entries/product';
import { ProductRating } from '../product-rating/product-rating';

export class ProductGridItem extends React.Component<{ product: Product }, { product: Product }> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Link to={"/products/" + this.props.product.id} className="product-grid-item-wrapper">
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
      </Link>
    );
  }
}