import React, {Component} from "react";
import Styles from "./Products.module.css";
import Product from "./Product/Product";

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // Add state properties here
        };
    }

    render() {
        const { onAddToCart, onSelectProduct } = this.props;

        return (
            <div className={Styles.container} >
                <div className={Styles.titleContainer}>
                    {this.props.activeCategory}
                </div>
                <div className={Styles.productsContainer}>
                    {this.props.products.map(
                        (product) => <Product 
                            key={product.id} 
                            product={product}
                            onSelectProduct={onSelectProduct}
                            onAddToCart={onAddToCart}
                        /> 
                    )}
                </div>
            </div>
        );
    }

}

export default Products;