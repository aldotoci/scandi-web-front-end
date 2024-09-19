import React, { Component } from "react";
import Styles from "./ItemContainer.module.css";
import { PlusIcon } from "../../../images/Images";
import { MinusIcon } from "../../../images/Images";

class ItemContainer extends Component {

    renderProperty = (attribute, item) => {
        const selectedAttributes = this.props.product.selectedAttributes;
        if(attribute.id === "Color"){
            return (
                <div className={Styles.colorItemWrapper} style={{
                    borderColor: `${selectedAttributes[attribute.id] === item.id ? "#5ECE7B" : '#ffffff'}`
                }}>
                    <div
                        key={item.id}
                        className={Styles.colorItem + " " + `${selectedAttributes[attribute.id] === item.id ? Styles.selected : ''}`}
                        style={{
                            backgroundColor: item.value,
                        }}
                    >
                    </div>
                </div>
            )
        }

        return (
            <div
                key={item.id}
                className={`${Styles.item} ${selectedAttributes[attribute.id] === item.id ? Styles.selected : ''}`}
            >
                {item.value}
            </div>
        )
    }

    render() {
        const {product, onAddToCart, onRemoveFromCart} = this.props;

        return (
             <div className={Styles.container}>
                <div className={Styles.infoContainer}>
                    <div className={Styles.name}>
                        {product.name}
                    </div>
                    <div className={Styles.price}>
                        {product.prices[0].currency.symbol}{product.prices[0].amount}
                    </div>
                    <div className={Styles.propertyContainer}>
                        {product.attributes.map(attribute => (
                            <div key={attribute.id} className={Styles.attribute}>
                                <div className={Styles.attributeName}>{attribute.name}:</div>
                                <div className={Styles.items}>
                                    {attribute.items.map(item => this.renderProperty(attribute, item))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={Styles.countContainer}>
                    <div data-testid='cart-item-amount-increase' onClick={() => onAddToCart(product)} className={Styles.countIconWrapper}>
                        <PlusIcon />
                    </div>
                    <div data-testid='cart-item-amount' className={Styles.count}>{product.quantity}</div>
                    <div data-testid='cart-item-amount-decrease' onClick={() => onRemoveFromCart(product.id)} className={Styles.countIconWrapper}>
                        <MinusIcon />
                    </div>
                </div>
                <div className={Styles.imageContainer}>
                    <img src={product.gallery[0]} alt={product.name} className={Styles.productImage} />
                </div>
            </div>
        );
    }
}

export default ItemContainer;