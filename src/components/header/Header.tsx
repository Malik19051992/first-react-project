import React from 'react';
import { Link } from 'react-router-dom';

import logoIcon from '../../assets/images/logo.png';
import searchIcon from '../../assets/images/search.svg';
import userIcon from '../../assets/images/user.png';
import './Header.scss';

export class Header extends React.Component {
  private user: any;

  constructor(props: any) {
    super(props);

    this.user = { name: 'User Name' };
  }

  render() {
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
              <input/>
              <button>
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
              <img src={userIcon}/> {this.user.name}
            </div>
            <div className="header-right-part-help-account-basket">
              Корзина&#8194;
              <div className="header-right-part-help-account-basket-count">
                10
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
