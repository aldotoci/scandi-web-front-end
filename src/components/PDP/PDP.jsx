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
            // selectedAttributes: this.props.product.attributes.reduce((acc, attribute) => {
            //     acc[attribute.id] = attribute.items[0].id;
            //     return acc;
            // }, {}),
            selectedAttributes: {},
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

    hasTheUserSelectedAllAttributes = () => {
        const { product } = this.props;
        const selectedAttributes = this.state.selectedAttributes;

        return product.attributes.every(attribute => {
            return selectedAttributes[attribute.id] !== undefined;
        });
    }

    render() {
        const { product } = this.props;

        const selecteAllAttributes = this.hasTheUserSelectedAllAttributes();

        console.log('selecteAllAttributes', selecteAllAttributes)

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
                    <AddToCartButton disabled={!selecteAllAttributes ? true : !product.inStock}  onClick={this.handleAddToCart} />
                    <div className={Styles.description} data-testid='product-description'>
                        {parse(product.description)}
                    </div>
                </div>
            </div>
        );
    }
}

export default PDP;