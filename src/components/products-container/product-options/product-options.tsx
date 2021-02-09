import React from 'react';

import './product-options.scss';
import gridIcon from '../../../assets/images/grid.svg';
import listIcon from '../../../assets/images/list.svg';
import { ViewMode, ViewModeUtils } from '../../../utils/view-mode.utils';

export enum SortOption {
  TITLE = 'title',
  RATING = 'rating',
  FROM_CHEEP_TO_EXPENSIVE = 'fromCheepToExpensive',
  FROM_EXPENSIVE_TO_CHEEP = 'fromExpensiveToCheep'
}

export class ProductOptions extends React.Component<{ viewModeChanged: (value: ViewMode) => void, sortOptionChanged: (optin: SortOption) => void },
  { viewMode: ViewMode, sortOption: SortOption }> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.setState({ viewMode: ViewModeUtils.getViewMode(), sortOption: SortOption.TITLE })
  }

  render() {
    return (<div className='product-options-container'>
      <div className="sorting-container">
        <select onChange={(event) => {this.sortOptionChangeHandler(event.target.value as SortOption)}}>
          <option selected value={SortOption.TITLE}>По названию</option>
          <option value={SortOption.RATING}>По рейтингу</option>
          <option value={SortOption.FROM_CHEEP_TO_EXPENSIVE}>Сначала дешовые</option>
          <option value={SortOption.FROM_EXPENSIVE_TO_CHEEP}>Сначала дорогие</option>
        </select>
      </div>
      <div className="view-switcher">
        <img src={gridIcon} className={this.state?.viewMode === ViewMode.GRID ? 'active' : ''}
             onClick={() => this.viewModeChanged(ViewMode.GRID)}/>
        <img src={listIcon} className={this.state?.viewMode === ViewMode.LIST ? 'active' : ''}
             onClick={() => this.viewModeChanged(ViewMode.LIST)}/>
      </div>
    </div>);
  }

  private viewModeChanged(value: ViewMode) {
    ViewModeUtils.setViewMode(value);
    this.setState({ viewMode: value });
    this.props.viewModeChanged(value);
  }

  private sortOptionChangeHandler(value: SortOption) {
    this.props.sortOptionChanged(value);
  }
}
