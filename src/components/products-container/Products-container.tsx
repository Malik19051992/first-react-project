import * as _ from 'lodash';
import React from 'react';

import './Products-container.scss';
import store from '../../redux/store';
import { Product } from '../../entries/Product';
import { getProducts } from '../../redux/actions';
import { ProductGridItem } from '../product-grid-item/Product-grid-item';

export class ProductsContainer extends React.Component<{}, { products: Product[] }> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({ products: getProducts() });
    });
  }

  render() {
    return (<div className='product-container'>
      {_.map(this.state?.products, (product: Product) => {
        console.log(product)
        return (<ProductGridItem product={product} key={product.id}></ProductGridItem>);
      })}
    </div>);
  }
}
