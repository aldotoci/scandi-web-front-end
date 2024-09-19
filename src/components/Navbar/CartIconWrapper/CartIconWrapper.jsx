import React from 'react';
import PropTypes from 'prop-types';
import { CartIcon } from '../../../images/Images';
import Styles from './CartIconWrapper.module.css';

const CartIconWrapper = ({ cartLength }) => {
  return (
    <div className={Styles.cartIconWrapper}>
      <CartIcon />
      <div style={cartLength >= 1 ? {} : {display: 'none'}} data-testid="cart-overlay" className={Styles.cartCount}>
        {cartLength}
      </div>
    </div>
  );
};

CartIconWrapper.propTypes = {
  cartLength: PropTypes.number.isRequired,
};

export default CartIconWrapper;