import React, { Component } from 'react';
import Styles from './AddToCartButton.module.css';

class AddToCartButton extends Component {
  render() {
    const { disabled, onClick } = this.props;

    return (
      <button disabled={disabled}
        data-testid="add-to-cart"
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        className={Styles.button} onClick={onClick}>
        <div className={Styles.buttonText}>
            Add to Cart
        </div>
      </button>
    );
  }
}

export default AddToCartButton;