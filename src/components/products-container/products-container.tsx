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

export class ProductsContainer extends React.Component<{ match: any, location: any }, { products: Product[], viewMode: ViewMode }> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.setCategoryProducts();
    this.setState({ viewMode: ViewModeUtils.getViewMode() });

    store.subscribe(() => {
      this.setCategoryProducts();
    });
  }

  componentWillReceiveProps(newProps) {
    // need to update after url update. kostyl
    setTimeout(()=>{
      this.setCategoryProducts();
    });
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

  private setCategoryProducts() {
    const categoryId: number = +this.props.match.params.categoryId;

    if (!categoryId) {
      this.setState({ products: this.filterProducts(getProducts()) });

      return;
    }

    const categories: Category[] = getCategories();
    const categoryProducts: Product[] = this.getCategoryProducts(categoryId, categories, getProducts());

    this.setState({ products: this.filterProducts(categoryProducts) });
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

  private filterProducts(products: Product[]) {
    const filter: string = new URLSearchParams(this.props.location.search).get("filter");

    if (!filter) {
      return products;
    }

    return _.filter(products, (product: Product) => product.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }
}
