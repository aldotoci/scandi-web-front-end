import React from 'react';
import PropTypes from 'prop-types';
import { CartIcon } from '../../../images/Images';
import Styles from './CartIconWrapper.module.css';

const CartIconWrapper = ({ showCartDropdown, cartLength }) => {
  return (
    <div className={Styles.cartIconWrapper}>
      <CartIcon />
      <div 
        style={(cartLength >= 1 || showCartDropdown) ? {} : {display: 'none'}} 
        data-testid="cart-overlay" 
        className={Styles.cartCount}
        >
        {cartLength}
      </div>
    </div>
  );
};

export default CartIconWrapper;