import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import categoriesData from '../assets/data/categories.json';
import productsData from '../assets/data/products.json';
import { Header } from './header/Header';
import { Help } from './help/Help';
import { ProductTree } from './products-tree/Products-tree';
import { ProductsContainer } from './products-container/Products-container';
import { setCategories, setProducts } from '../redux/actions';

export class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    setCategories(categoriesData);
    setProducts(productsData);
  }

  render() {
    return (
      <div className="app-wrapper">
        <div className="app">
          <BrowserRouter>
            <Header></Header>
            <div className="app-container">
              <div className="navigation-panel">
                <ProductTree></ProductTree>
              </div>
              <div className="page-content">
                <Switch>
                  <Route exact path="/" component={ProductsContainer}></Route>
                  <Route path="/categories/:categoryId" component={ProductsContainer}></Route>
                  <Route path="/help" component={Help}></Route>
                </Switch>
              </div>
            </div>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}
