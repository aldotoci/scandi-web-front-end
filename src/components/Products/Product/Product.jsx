import React, { Component } from "react";
import Styles from "./Product.module.css";
import { AddToCartIcon } from "../../../images/Images";

const toKebabCase = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

class Product extends Component {
  constructor(props) {
    super(props);

    const { product } = this.props;
    const price = product.prices[0];

    this.formatePrice = `${price.currency.symbol}${price.amount}`;
    this.inStock = product.inStock;
    this.selectedAttributes = product.attributes.reduce((acc, attribute) => {
      acc[attribute.id] = attribute.items[0].id;
      return acc;
    }, {});
  }

  onCartClick = (e) => {
    const { onAddToCart, product } = this.props;
    e.stopPropagation();
    onAddToCart({ ...product, selectedAttributes: this.selectedAttributes });
  };

  render() {
    const { product, onSelectProduct } = this.props;
    console.log('product', product);

    return (
      <div
        data-testid={`product-${toKebabCase(product.name)}`}
        className={Styles.container}
        onClick={() => onSelectProduct(product)}
      >
        <div className={Styles.imageWrapper}>
          <img
            className={`${Styles.image} ${!this.inStock ? Styles.imageOutOfStock : ""}`}
            src={product.gallery[0]}
          />
          {!this.inStock && (
            <div className={Styles.overlay}>
              <span className={Styles.outOfStockText}>OUT OF STOCK</span>
            </div>
          )}
        </div>

        <div className={Styles.AddToCartIcon}>
            <button data-testid="add-to-cart"
                onClick={this.onCartClick}
                style={this.inStock ? {} : { cursor: 'not-allowed' }}
                disabled={!this.inStock}
            >
                <AddToCartIcon />
            </button>
        </div>
        <div className={Styles.infoContainer}>
          <div className={Styles.name}>{product.name}</div>
          <div className={Styles.price}>{this.formatePrice}</div>
        </div>
      </div>
    );
  }
}

export default Product;