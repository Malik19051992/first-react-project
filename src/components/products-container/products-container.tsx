import * as _ from 'lodash';
import React from 'react';

import store from '../../redux/store';
import './products-container.scss';
import { Product } from '../../entries/product';
import { Category } from '../../entries/category';
import { getProducts, getCategories } from '../../redux/actions';
import { ProductGridItem } from '../product-grid-item/product-grid-item';
import { ProductListItem } from '../product-list-item/product-list-item';
import { ProductOptions } from './product-options/product-options';
import { ViewMode, ViewModeUtils } from '../../utils/view-mode.utils';

export class ProductsContainer extends React.Component<{ match: any }, { products: Product[], viewMode: ViewMode }> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.setCategoryProducts(+this.props.match.params.categoryId);
    this.setState({ viewMode: ViewModeUtils.getViewMode() })

    store.subscribe(() => {
      this.setCategoryProducts(+this.props.match.params.categoryId);
    });
  }

  componentWillReceiveProps(newProps) {
    this.setCategoryProducts(+newProps.match.params.categoryId);
  }

  render() {
    return (
      <div className='product-container-wrapper'>
        <ProductOptions viewModeChanged={this.viewModeChanged.bind(this)}></ProductOptions>
        <div className={this.state ?.viewMode === ViewMode.GRID ? 'product-container-grid' : 'product-container-list'}>
          {_.map(this.state ?.products, (product: Product) => {
            if(this.state?.viewMode === ViewMode.GRID){
            return (<ProductGridItem product={product} key={product.id}></ProductGridItem>);
          } else {
            return (<ProductListItem product={product} key={product.id}></ProductListItem>);
          }
          })}
        </div>
      </div>);
  }

  private setCategoryProducts(categoryId: number) {
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

  private viewModeChanged(value: ViewMode) {
    this.setState({ viewMode: value })

  }
}
