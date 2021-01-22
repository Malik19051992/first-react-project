import React from 'react';

import './Product-grid-item.scss';
import { Product } from '../../entries/Product';
import { ProductRating } from '../product-rating/Product-rating';

export class ProductGridItem extends React.Component<{ product: Product }, { product: Product }> {
  private product: Product = {
    id: 1,
    title: 'test',
    price: 100,
    src: 'https://picsum.photos/241/325?random=8',
    rating: 3.5,
    category: { id: 1, title: 'category' }
  }

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="product-grid-item-wrapper">
        <a>
          <div className="product-grid-item-src-wrapper">
            <img className="product-grid-item-src" src={this.product.src}/>
          </div>
          <div className="product-grid-item-product-data">
            <div className="product-grid-item-product-title">{this.product.title}</div>
            <div className="product-grid-item-product-category">{this.product.category?.title}</div>
            <div className="product-grid-item-product-rating">
              <ProductRating rating={this.product.rating}></ProductRating>
            </div>
            <div className="product-grid-item-product-price">{this.product.price} руб.</div>
          </div>
        </a>
      </div>
    );
  }
}