import * as _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import './tree-branch.scss';
import plusIcon from '../../../assets/images/plus.svg';
import minusIcon from '../../../assets/images/minus.svg';
import { Category } from '../../../entries/category';

export class TreeBranch extends React.Component<{ category: Category, location: any }, {treeExpanded: boolean}> {
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
              <Link to={"/categories/" + this.props.category.id + this.props.location.search}>
                {this.props.category.title}</Link>
            </div>
            {_.map(this.props.category.subCategories, (category: Category) => {
              return (<TreeBranch key={category.id} category={category} location={this.props.location}></TreeBranch>);
            })}
          </div>
        );
      } else {
        return (
          <div className="tree-branch-wrapper">
            <div className="tree-branch-header">
              <img src={plusIcon} onClick={this.onIconClick.bind(this)}/>
              <Link to={"/categories/" + this.props.category.id + this.props.location.search}>
                {this.props.category.title}</Link>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="tree-branch-wrapper">
          <div className="tree-branch-header">
            <Link to={"/categories/" + this.props.category.id + this.props.location.search}>
              {this.props.category.title}</Link>
          </div>
        </div>
      );
    }
  }
}
