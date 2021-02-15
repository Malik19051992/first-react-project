import React from 'react';

import './product.scss';
import { getProduct } from '../../redux/actions';
import { Product as ProductEntry } from '../../entries/product';
import { ProductRating } from '../product-rating/product-rating';

export class Product extends React.Component<{ match: any }, { product: ProductEntry }> {
  constructor(props: any) {
    super(props);
    this.setState({ product: null });
  }

  componentDidMount() {
    this.setProduct(+this.props.match.params.productId);
  }

  componentWillReceiveProps(newProps) {
    this.setProduct(+newProps.match.params.productId);
  }

  render() {
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
          <div className="product-data-description">{this.state?.product?.description}</div>
        </div>
      </div>
    );
  }

  private setProduct(productId: number, innerCall: boolean = false) {
    if (productId) {
      this.setState({ product: getProduct(productId) }, () => {

        // kostyl for case when we start from product page
        if (!this.state.product && !innerCall) {
          this.setProduct(productId, true);
        }
      });
    }
  }
}