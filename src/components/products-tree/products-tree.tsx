import * as _ from 'lodash';
import React from 'react';
import { withRouter } from 'react-router';
import { Unsubscribe } from 'redux';

import './products-tree.scss';
import { TreeBranch } from './tree-branch/tree-branch';
import { Category } from '../../entries/category';
import { getStoreSubscription } from '../../redux/store';
import { getCategories } from '../../redux/actions/category-actions';
import { CategoryUtils } from '../../utils/category.utils';


class ProductTreeComponent extends React.Component<{location: any}, { categories: Category[] }> {
  private unsubscribe: Unsubscribe;

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.unsubscribe = getStoreSubscription(() => {
      this.setState({ categories: CategoryUtils.groupCategoryData(getCategories()) });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className="product-tree-wrapper">
        {_.map(this.state?.categories, (category: Category) => {
          return (<TreeBranch key={category.id} category={category} location={this.props.location}></TreeBranch>);
        })}
      </div>
    )
  }
}

export const ProductTree = withRouter(ProductTreeComponent as any);