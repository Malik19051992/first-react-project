import * as _ from 'lodash';
import React from 'react';

import store from '../../redux/store';
import './products-container.scss';
import { Product } from '../../entries/product';
import { Category } from '../../entries/category';
import { getProducts, getCategories } from '../../redux/actions';
import { ProductGridItem } from '../product-grid-item/product-grid-item';
import { ProductListItem } from '../product-list-item/product-list-item';
import { ProductOptions, SortOption } from './product-options/product-options';
import { ViewMode, ViewModeUtils } from '../../utils/view-mode.utils';

export class ProductsContainer extends React.Component<{ match: any, location: any }, { products: Product[], viewMode: ViewMode, sortOption: SortOption }> {
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
    setTimeout(() => {
      this.setCategoryProducts();
    });
  }

  render() {
    return (
      <div className='product-container-wrapper'>
        <ProductOptions viewModeChanged={this.viewModeChanged.bind(this)}
                        sortOptionChanged={this.sortOptionChanged.bind(this)}></ProductOptions>
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
      this.setState({ products: this.sortProducts(this.filterProducts(getProducts()), this.state?.sortOption || SortOption.TITLE) });

      return;
    }

    const categories: Category[] = getCategories();
    const categoryProducts: Product[] = this.getCategoryProducts(categoryId, categories, getProducts());

    this.setState({ products: this.sortProducts(this.filterProducts(categoryProducts), this.state?.sortOption || SortOption.TITLE) });
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

  private sortOptionChanged(sortOption: SortOption) {
    this.setState({ products: this.sortProducts(this.state.products, sortOption), sortOption });
  }

  private filterProducts(products: Product[]) {
    const filter: string = new URLSearchParams(this.props.location.search).get("filter");

    if (!filter) {
      return products;
    }

    return _.filter(products, (product: Product) => product.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

  private sortProducts(producsts: Product[], sortOption: SortOption) {
    switch (sortOption) {
      case SortOption.TITLE:
        return _.sortBy(producsts, 'title');
      case SortOption.RATING:
        return _.sortBy(producsts, 'rating').reverse();
      case SortOption.FROM_CHEEP_TO_EXPENSIVE:
        return _.sortBy(producsts, 'price');
      case SortOption.FROM_EXPENSIVE_TO_CHEEP:
        return _.sortBy(producsts, 'price').reverse();
    }
  }
}
