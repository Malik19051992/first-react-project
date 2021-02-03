import * as _ from 'lodash';
import React from 'react';

import './Products-tree.scss';
import { TreeBranch } from './tree-branch/Tree-branch';
import { Category } from '../../entries/Category';
import store from '../../redux/store';
import { getCategories } from '../../redux/actions/category-actions';
import { CategoryUtils } from '../../utils/category.utils';


export class ProductTree extends React.Component<any, { categories: Category[] }> {
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
          return (<TreeBranch key={category.id} category={category}></TreeBranch>);
        })}
      </div>
    )
  }
}