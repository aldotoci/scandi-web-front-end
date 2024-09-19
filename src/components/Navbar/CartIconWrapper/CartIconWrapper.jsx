import React from 'react';
import PropTypes from 'prop-types';
import { CartIcon } from '../../../images/Images';
import Styles from './CartIconWrapper.module.css';

const CartIconWrapper = ({ cartLength }) => {
  return (
    <div data-testid="cart-overlay" className={Styles.cartIconWrapper}>
      <CartIcon />
      {cartLength >= 1 && (
        <div className={Styles.cartCount}>
          {cartLength}
        </div>
      )}
    </div>
  );
};

CartIconWrapper.propTypes = {
  cartLength: PropTypes.number.isRequired,
};

export default CartIconWrapper;