import React from 'react';
import Styles from './CartDropdown.module.css';
import ItemContainer from '../ItemContainer/ItemContainer';

class CartDropdown extends React.Component {


    getCartTotal = () => {
        const { cart } = this.props;
        return cart.reduce((acc, product) => {
            return acc + product.prices[0].amount;
        }, 0);
    }

    getFilteredCart = () => {
        const { cart } = this.props;
        
        const FilteredCart = []

        cart.forEach((product) => {
            const index = FilteredCart.findIndex((item) => item.id === product.id);
         

            const hasTheSameAttributes = (index !== -1) && Object.keys(product.selectedAttributes).every((key) => {
                console.log('product.selectedAttributes[key] === FilteredCart[index].selectedAttributes[key]', product.selectedAttributes[key], FilteredCart[index].selectedAttributes[key])
                
                return product.selectedAttributes[key] === FilteredCart[index].selectedAttributes[key];
            });

            // ((attribute) => {
            //     return FilteredCart[index].selectedAttributes.some((item) => item.id === attribute.id);
            // });

            if(index === -1 || !hasTheSameAttributes)
                FilteredCart.push({...product, quantity: 1});
            else
                FilteredCart[index].quantity++;
            
        })
        return FilteredCart
    }

    render() {
        const { cart, onClose, onRemoveFromCart, onAddToCart, onPlaceHolder } = this.props;

        const total = this.getCartTotal();

        const filteredCart = this.getFilteredCart();

        console.log('filteredCart', filteredCart)

        const buttonDisabled = filteredCart.length === 0

        return (
            <div className={Styles.overlay} onClick={onClose}>
                <div className={Styles.cartDropdown} onClick={(e) => e.stopPropagation()}>
                    <div className={Styles.header}>
                        <div className={Styles.title}>
                            My Bag
                        </div>
                        <div className={Styles.itemCounter}>
                            , {cart.length} {cart.length === 1 ? 'item' : 'items'}
                        </div>
                    </div>
                    <div className={Styles.cartContainer} >
                        {filteredCart.map((product, i) => <ItemContainer {...{
                            product: product,
                            key: i,
                            onAddToCart,
                            onRemoveFromCart
                        }}
                        />)}
                    </div>
                    <div className={Styles.total}>
                        <div className={Styles.totalText}>
                            Total
                        </div>
                        <div className={Styles.totalAmount} data-testid='cart-total'>
                            ${total}
                        </div>
                    </div>
                    <button 
                        disabled={buttonDisabled} 
                        style={buttonDisabled ? {
                            cursor: 'not-allowed',
                            backgroundColor: '#E0E0E0',
                        } : {}} 
                        className={Styles.placeOrderButton}
                        onClick={onPlaceHolder}
                    >
                    
                        Place Order
                    </button>
                </div>
            </div>
        );
    }
}

export default CartDropdown;