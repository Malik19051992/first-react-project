import * as _ from 'lodash';
import React from 'react';

import store from '../../redux/store';
import './Products-container.scss';
import { Product } from '../../entries/Product';
import { Category } from '../../entries/Category';
import { getProducts, getCategories } from '../../redux/actions';
import { ProductGridItem } from '../product-grid-item/Product-grid-item';

export class ProductsContainer extends React.Component<{ match: any }, { products: Product[] }> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.setCategoryProducts();

    store.subscribe(() => {
      this.setCategoryProducts();
    });
  }

  componentWillReceiveProps(newProps) {
    this.setCategoryProducts(+newProps.match.params.categoryId);
  }

  render() {
    return (<div className='product-container'>
      {_.map(this.state ?.products, (product: Product) => {
        return (<ProductGridItem product={product} key={product.id}></ProductGridItem>);
      })}
    </div>);
  }

  private setCategoryProducts(categoryId?: number) {
    categoryId = categoryId || +this.props.match.params.categoryId;

    if (!categoryId) {
      this.setState({ products: getProducts() });

      return;
    }

    const categories: Category[] = getCategories();
    const categoryProducts: Product[] = this.getCategoryProducts(categoryId, categories, getProducts());

    this.setState({ products: categoryProducts });
  }

  private getCategoryProducts(categoryId: number, categories: Category[], products: Product[]): Product[] {
    let productResult: Product[] = _.filter(products, { categoryId });
    const subCategories: Category[] = _.filter(categories, { parentCategoryId: categoryId });

    _.forEach(subCategories, (category) => {
      productResult = [...productResult, ...this.getCategoryProducts(category.id, categories, products)]
    });

    return productResult;
  }
}
