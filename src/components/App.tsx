import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import categoriesData from '../assets/data/categories.json';
import productsData from '../assets/data/products.json';
import { Header } from './header/Header';
import { Help } from './help/Help';
import { ProductTree } from './products-tree/Products-tree';
import { ProductsContainer } from './products-container/Products-container';
import { setCategories, setProducts } from '../redux/actions';
import { CategoryUtils } from '../utils/category.utils';

export class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    setCategories(CategoryUtils.groupCategoryData(categoriesData));
    setProducts(productsData);
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
                  <Route exact path="/" component={ProductsContainer}></Route>
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
