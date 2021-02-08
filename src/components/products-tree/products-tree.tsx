import * as _ from 'lodash';
import React from 'react';
import { withRouter } from 'react-router';

import './products-tree.scss';
import { TreeBranch } from './tree-branch/tree-branch';
import { Category } from '../../entries/category';
import store from '../../redux/store';
import { getCategories } from '../../redux/actions/category-actions';
import { CategoryUtils } from '../../utils/category.utils';


class ProductTreeComponent extends React.Component<{location: any}, { categories: Category[] }> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({ categories: CategoryUtils.groupCategoryData(getCategories()) });
    });
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