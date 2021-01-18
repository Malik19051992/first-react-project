import React from 'react';
import './App.scss';
import { Header } from './header/Header';
import { GoodsTree } from './goods-tree/Goods-tree';

export class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="app-wrapper">
        <div className="app">
          <Header></Header>
          <div className="app-container">
            <div className="navigation-panel">
              <GoodsTree></GoodsTree>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
