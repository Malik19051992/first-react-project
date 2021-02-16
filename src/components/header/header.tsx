import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import './header.scss';
import store from '../../redux/store';
import logoIcon from '../../assets/images/logo.png';
import searchIcon from '../../assets/images/search.svg';
import userIcon from '../../assets/images/user.png';
import { getCartItems } from '../../redux/actions';

class HeaderComponent extends React.Component<{ history: any }, { searchInputValue: string, cartItemsCount: number }> {
  private user: any;

  constructor(props: any) {
    super(props);

    this.user = { name: 'User Name' };
  }

  componentDidMount() {
    this.setState({
      searchInputValue: new URLSearchParams(this.props.history.location.search).get('filter') || '',
      cartItemsCount: (getCartItems() || []).length
    });

    store.subscribe(() => {
      this.setState({ cartItemsCount: (getCartItems() || []).length });
    })
  }

  componentWillReceiveProps(newProps) {
    if (!new URLSearchParams(newProps.location.search).get('filter')) {
      this.setState({ searchInputValue: '' });
    }
  }

  render() {
    const cartItemsCountElement = this.state?.cartItemsCount ? (<div className="header-right-part-help-account-cart-count">
      {this.state?.cartItemsCount}
    </div>) : null;

    return (
      <div className="header-wrapper">
        <div className="header-left-part">
          <Link to="/">
            <img className="header-left-part-logo-image" src={logoIcon}/>
          </Link>
          <div>
            <div className="header-left-part-info">
              <div className="header-left-part-info-phone-number-and-operators">
                <strong className="header-left-part-info-phone-number">123-45-67</strong>
                <span className="header-left-part-info-operators">MTC, A1, life:)</span>
              </div>
              <div className="header-left-part-info-help">
                <a href="#"> Закажите звонок</a>&#8194;или&#8194;<a href="#">напишите нам</a>
              </div>
            </div>
            <div className="header-left-part-search-input-wrapper">
              <input type="text" value={this.state?.searchInputValue}
                     onChange={this.handleSearchInputChange.bind(this)}
                     onKeyUp={(event) => {this.searchProducts(event)}}/>
              <button onClick={this.searchProducts.bind(this)}>
                <img src={searchIcon}/>
              </button>
            </div>
          </div>
        </div>
        <div className="header-right-part">
          <div className="header-right-part-help-info">
            <Link to="/help" className="header-right-part-help-info-item">Помощь</Link>
            <Link to="/delivery" className="header-right-part-help-info-item">Доставка</Link>
            <Link to="/payment-info" className="header-right-part-help-info-item">Оплата</Link>
          </div>
          <div className="header-right-part-help-account-info">
            <div className="header-right-part-help-account-user-info">
              <img src={userIcon}/> {this.user?.name}
            </div>
            <Link to="/cart" className="header-right-part-help-account-basket">
              Корзина&#8194;
              {cartItemsCountElement}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  public handleSearchInputChange(event) {
    this.setState({ searchInputValue: event.target.value });
  }

  private searchProducts(event?: any) {
    if (event && event.key !== 'Enter') {
      return;
    }

    this.props.history.push({
      pathname: this.props.history.pathname,
      search: `?filter=${this.state.searchInputValue}`
    });
  }
}

export const Header = withRouter(HeaderComponent as any);