import * as _ from 'lodash';
import React from 'react';
import './app.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import categoriesData from '../assets/data/categories.json';
import productsData from '../assets/data/products.json';
import { Header } from './header/header';
import { Help } from './help/help';
import { Product } from '../entries/product';
import { Category } from '../entries/category';
import { ProductTree } from './products-tree/products-tree';
import { ProductsContainer } from './products-container/products-container';
import { setCategories, setProducts } from '../redux/actions';

export class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const categories: Category[] = _.cloneDeep(categoriesData);
    setCategories(categories);
    const products: Product[] = _.cloneDeep(productsData);
    setProducts(_.map(products, (product: Product) => {
      product.category = _.find(categories, { id: product.categoryId });

      return product;
    }));
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
