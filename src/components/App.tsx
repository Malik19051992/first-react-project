import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import { Header } from './header/Header';
import { Help } from './help/Help';
import { ProductTree } from './products-tree/Products-tree';
import { ProductGridItem } from './product-grid-item/Product-grid-item';

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
              <ProductTree></ProductTree>
            </div>
            <div className="page-content">
              <BrowserRouter>
                <Switch>
                  <Route exact path="/" component={ProductGridItem}></Route>
                  <Route path="/help" component={Help}></Route>
                </Switch>
              </BrowserRouter>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
