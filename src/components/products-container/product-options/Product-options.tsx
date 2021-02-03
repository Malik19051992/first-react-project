import * as _ from 'lodash';
import React from 'react';

import './Product-options.scss';
import gridIcon from '../../../assets/images/grid.svg';
import listIcon from '../../../assets/images/list.svg';
import { ViewMode, ViewModeUtils } from '../../../utils/view-mode.utils';

export class ProductOptions extends React.Component<{ viewModeChanged: any }, { viewMode: ViewMode }> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.setState({ viewMode: ViewModeUtils.getViewMode() })
  }

  render() {
    return (<div className='product-options-container'>
      <div className="sorting-container">
        <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
      <div className="view-switcher">
        <img src={gridIcon} className={this.state ?.viewMode === ViewMode.GRID ? 'active' : ''}
             onClick={() => this.viewModeChanged(ViewMode.GRID)}/>
        <img src={listIcon} className={this.state ?.viewMode === ViewMode.LIST ? 'active' : ''}
             onClick={() => this.viewModeChanged(ViewMode.LIST)}/>
      </div>
    </div>);
  }

  private viewModeChanged(value: ViewMode) {
    ViewModeUtils.setViewMode(value);
    this.setState({ viewMode: value });
    this.props.viewModeChanged(value);
  }
}
