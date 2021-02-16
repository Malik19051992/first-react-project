import * as _ from 'lodash';
import React from 'react';
import './app.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import categoriesData from '../assets/data/categories.json';
import productsData from '../assets/data/products.json';
import { Header } from './header/header';
import { Help } from './help/help';
import { Product } from '../entries/product';
import { Category } from '../entries/category';
import { CartItem } from '../entries/cart-item';
import { ProductTree } from './products-tree/products-tree';
import { ProductsContainer } from './products-container/products-container';
import { Product as ProductComponent } from './product/product';
import { Cart } from './cart/cart';
import { setCategories, setProducts, setCartItems } from '../redux/actions';
import { LocalStorageItem, LocalStorageUtils } from '../utils/local-storage.utils';

export class App extends React.Component<{ location?: any }, any> {
  private customHistory;

  constructor(props: any) {
    super(props);
    this.customHistory = createBrowserHistory();
  }

  componentDidMount() {
    this.setReduxState();
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
                  <Route path="/products/:productId" component={ProductComponent}></Route>
                  <Route path="/cart" component={Cart}></Route>
                  <Route path="/help" component={Help}></Route>

                </Switch>
              </div>
            </div>
          </BrowserRouter>
        </div>
      </div>
    );
  }

  private setReduxState() {
    const categories: Category[] = _.cloneDeep(categoriesData);
    const products: Product[] = _.cloneDeep(productsData);
    const cartItems: CartItem[] = LocalStorageUtils.get(LocalStorageItem.CART) || [];

    _.forEach(cartItems, (cartItem: CartItem) => {
      cartItem.product = _.find(products, { id: cartItem.productId });
    });

    setCategories(categories);
    setProducts(_.map(products, (product: Product) => {
      product.category = _.find(categories, { id: product.categoryId });

      return product;
    }));

    setCartItems(cartItems);
  }
}
