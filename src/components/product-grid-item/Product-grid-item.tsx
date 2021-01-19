import React from 'react';

import './Product-grid-item.scss';
import { Product } from '../../entries/Product';

export class ProductGridItem extends React.Component<{ product: Product }, { product: Product }> {
  private product: Product = {
    id: 1,
    title: 'test',
    price: 100,
    src: 'https://picsum.photos/241/325?random=8',
    rating: 5,
    category: { id: 1, title: 'category' }
  }

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="product-grid-item-wrapper">
        <img className="product-grid-item-src" src={this.product.src}/>
        <div className="product-grid-item-product-data">
          <div className="product-grid-item-product-title">{this.product.title}</div>
          <div className="product-grid-item-product-category">{this.product.category.title}</div>
          <div className="product-grid-item-product-rating">{this.product.rating}</div>
          <div className="product-grid-item-product-price">{this.product.price}</div>
        </div>
      </div>
    );
  }
}