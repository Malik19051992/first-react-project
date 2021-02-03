import * as _ from 'lodash';
import React from 'react';

import store from '../../redux/store';
import './Products-container.scss';
import { Product } from '../../entries/Product';
import { Category } from '../../entries/Category';
import { getProducts, getCategories } from '../../redux/actions';
import { ProductGridItem } from '../product-grid-item/Product-grid-item';
import { ProductOptions } from './product-options/Product-options';
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
            return <div className="product-container-list">item</div>
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
