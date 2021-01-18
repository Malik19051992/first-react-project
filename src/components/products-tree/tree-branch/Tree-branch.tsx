import * as _ from 'lodash';
import React from 'react';

import './Tree-branch.scss';
import plusIcon from '../../../assets/images/plus.svg';
import minusIcon from '../../../assets/images/minus.svg';

import { TreeBranch as ITreeBranch } from '../../../entries/Tree-branch';

interface TreeBranchState {
  treeExpanded: boolean;
}

export class TreeBranch extends React.Component<{ data: ITreeBranch }, TreeBranchState> {
  constructor(props: any) {
    super(props);

    this.state = { treeExpanded: false };
  }

  onIconClick() {
    this.setState({ treeExpanded: !this.state.treeExpanded });
  }

  render() {
    if (this.props.data.children && this.props.data.children.length) {
      if (this.state.treeExpanded) {
        return (
          <div className="tree-branch-wrapper">
            <div className="tree-branch-header">
              <img src={minusIcon} onClick={this.onIconClick.bind(this)}/>
              <a href="#">{this.props.data.title}</a>
            </div>
            {_.map(this.props.data.children, (treeBranch: ITreeBranch) => {
              return (<TreeBranch key={treeBranch.title} data={treeBranch}></TreeBranch>);
            })}
          </div>
        );
      } else {
        return (
          <div className="tree-branch-wrapper">
            <div className="tree-branch-header">
              <img src={plusIcon} onClick={this.onIconClick.bind(this)}/>
              <a href="#">{this.props.data.title}</a>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="tree-branch-wrapper">
          <div className="tree-branch-header">
            <a href="#">{this.props.data.title}</a>
          </div>
        </div>
      );
    }
  }
}