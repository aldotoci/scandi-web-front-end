import React, { Component } from "react";
import ClientService from './../../services/ClientService';
import Products from './../Products/Products';
import PDP from './../PDP/PDP';
import Navbar from './../Navbar/Navbar';
import "./Home.css";

class Home extends Component {
    constructor(props) {
        super(props);

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        this.state = {
            // Add state properties here
            categories: [],
            activeCategory: '',
            products: [],
            cart,
            selectedProduct: null
        };

        /**
         * Populate state with categories and products
         */
        ClientService.getCategories().then((response) => {
            const activeCategory = response[0].name;
            const categories = response.map((category) => category.name);
            this.setState({ categories, activeCategory });
            // this.updateProducts(activeCategory);      
        })

    }

    /**
     * 
     * @param {string} category
     * Update the products based on the category 
     */
    updateProducts = (category) => {
        ClientService.getProductsForGrid(category).then((products) => {
            this.setState({
                products
            });
        })
    }

    componentDidMount() {
        console.log(console.log(this.state));
    }

    setActiveCategory = (category) => {
        this.setState({
            activeCategory: category,
            selectedProduct: null
        });
    }

    componentDidUpdate(prevProps, prevState) {
        /*
          Update the products when the active category changes
        */
        if (prevState.activeCategory !== this.state.activeCategory) {
            this.updateProducts(this.state.activeCategory);
        }

        const cart = this.state.cart;

        // Store cart in local storage
        localStorage.setItem('cart', JSON.stringify(cart));

    }

    onSelectProduct = async (selectedProduct) => {
        this.setState({
            selectedProduct: await ClientService.getProductById(selectedProduct.id)
        });
    }

    onAddToCart = (product) => {
        this.setState({
            cart: [...this.state.cart, product]
        });
    }

    //Remove product from cart only once
    onRemoveFromCart = (productId) => {
        const cart = this.state.cart;
        const index = cart.findIndex((product) => product.id === productId);
        if (index !== -1) {
            cart.splice(index, 1);
            this.setState({ cart });
        }
        console.log('cart', cart)
    }

    onPlaceHolder = () => {
        this.setState({
            cart: []
        });
    }

    render() {
        return (
            <div className="App">
                <Navbar
                    categories={this.state.categories}
                    activeCategory={this.state.activeCategory}
                    setActiveCategory={this.setActiveCategory}
                    cart={this.state.cart}
                    onAddToCart={this.onAddToCart}
                    onRemoveFromCart={this.onRemoveFromCart}
                    onPlaceHolder={this.onPlaceHolder}
                />
                {
                    this.state.selectedProduct ?
                        <PDP {...{
                            product: this.state.selectedProduct,
                            onAddToCart: this.onAddToCart
                        }} /> :
                        <Products
                            activeCategory={this.state.activeCategory}
                            products={this.state.products}
                            onSelectProduct={this.onSelectProduct}
                            onAddToCart={this.onAddToCart}
                        />
                }
            </div>
        );
    }
}


export default Home;