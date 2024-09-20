import React, { Component } from "react";
import parse from "html-react-parser";
import Styles from "./PDP.module.css";
import ImagesContainer from "./ImagesContainer/ImagesContainer";
import PropertySelector from "./PropertySelector/PropertySelector";
import AddToCartButton from "./AddToCartButton/AddToCartButton";

class PDP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Add state properties here if needed
            selectedAttributes: this.props.product.attributes.reduce((acc, attribute) => {
                acc[attribute.id] = attribute.items[0].id;
                return acc;
            }, {}),
        };
    }

    handleSelect = (attributeId, itemId) => {
        this.setState(prevState => ({
            selectedAttributes: {
                ...prevState.selectedAttributes,
                [attributeId]: itemId,
            },
        }));
    };

    handleAddToCart = () => {
        // Add to cart logic here
        this.props.onAddToCart({
            ...this.props.product,
            selectedAttributes: this.state.selectedAttributes
        });
    }

    render() {
        const { product } = this.props;


        return (
            <div className={Styles.container}>
                <ImagesContainer images={product.gallery} />
                <div className={Styles.infoContainer}>
                    <div className={Styles.name}>
                        {product.name}
                    </div>
                    <PropertySelector
                        selectedAttributes={this.state.selectedAttributes}
                        attributes={product.attributes}
                        handleSelect={this.handleSelect}
                    />
                    <div className={Styles.price}>
                        <div className={Styles.priceText}>
                            Price:
                        </div>
                        <div className={Styles.priceValue}>
                            {product.prices[0].currency.symbol}{product.prices[0].amount}
                        </div>
                    </div>
                    <AddToCartButton disabled={!product.inStock || product.id === 'apple-iphone-12-pro'}  onClick={this.handleAddToCart} />
                    <div className={Styles.description} data-testid='product-description'>
                        {parse(product.description)}
                    </div>
                </div>
            </div>
        );
    }
}

export default PDP;