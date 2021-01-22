import * as _ from 'lodash';
import React from 'react';

import './Tree-branch.scss';
import plusIcon from '../../../assets/images/plus.svg';
import minusIcon from '../../../assets/images/minus.svg';

import {Category} from '../../../entries/Category';

interface TreeBranchState {
  treeExpanded: boolean;
}

export class TreeBranch extends React.Component<{ category: Category }, TreeBranchState> {
  constructor(props: any) {
    super(props);
    this.state = { treeExpanded: false };
  }

  onIconClick() {
    this.setState({ treeExpanded: !this.state.treeExpanded });
  }

  render() {
    if (this.props.category.subCategories && this.props.category.subCategories.length) {
      if (this.state.treeExpanded) {
        return (
          <div className="tree-branch-wrapper">
            <div className="tree-branch-header">
              <img src={minusIcon} onClick={this.onIconClick.bind(this)}/>
              <a href="#">{this.props.category.title}</a>
            </div>
            {_.map(this.props.category.subCategories, (category: Category) => {
              return (<TreeBranch key={category.id} category={category}></TreeBranch>);
            })}
          </div>
        );
      } else {
        return (
          <div className="tree-branch-wrapper">
            <div className="tree-branch-header">
              <img src={plusIcon} onClick={this.onIconClick.bind(this)}/>
              <a href="#">{this.props.category.title}</a>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="tree-branch-wrapper">
          <div className="tree-branch-header">
            <a href="#">{this.props.category.title}</a>
          </div>
        </div>
      );
    }
  }
}