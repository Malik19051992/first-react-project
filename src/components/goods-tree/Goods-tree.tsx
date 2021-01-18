import * as _ from 'lodash';
import React from 'react';

import './Goods-tree.scss';
import { TreeBranch } from './tree-branch/Tree-branch';
import { TreeBranch as ITreeBranch } from '../../entries/Tree-branch';

const treeBranches: ITreeBranch[] = [
  {
    title: 'Good category 1',
    children: [{
      title: 'Good subcategory 1',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }, {
      title: 'Good subcategory 2',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }, {
      title: 'Good subcategory 3',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }, {
      title: 'Good subcategory 4',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }, {
      title: 'Good subcategory 5',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }]
  }, {
    title: 'Good category 2',
    children: [{
      title: 'Good subcategory 1',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }, {
      title: 'Good subcategory 2',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }, {
      title: 'Good subcategory 3',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }, {
      title: 'Good subcategory 4',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }, {
      title: 'Good subcategory 5',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }]
  }, {
    title: 'Good category 3',
    children: [{
      title: 'Good subcategory 1',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }, {
      title: 'Good subcategory 2',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }, {
      title: 'Good subcategory 3',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }, {
      title: 'Good subcategory 4',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }, {
      title: 'Good subcategory 5',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }]
  }, {
    title: 'Good category 4',
    children: [{
      title: 'Good subcategory 1',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }, {
      title: 'Good subcategory 2',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }, {
      title: 'Good subcategory 3',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }, {
      title: 'Good subcategory 4',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }, {
      title: 'Good subcategory 5',
      children: [{ title: 'Good 1' }, { title: 'Good 2' }, { title: 'Good 3' }, { title: 'Good 4' }, { title: 'Good 5' }, { title: 'Good 6' }, { title: 'Good 7' }]
    }]
  },
];

export class GoodsTree extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="good-tree-wrapper">
        {_.map(treeBranches, (treeBranch: ITreeBranch) => {
          return (<TreeBranch key={treeBranch.title} data={treeBranch}></TreeBranch>);
        })}
      </div>
    )
  }
}