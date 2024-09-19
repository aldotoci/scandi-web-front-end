import React, { Component } from 'react';
import CategoryItem from './CategoryItem/CategoryItem';
import { Logo } from '../../images/Images';
import Styles from './Navbar.module.css';
import CartIconWrapper from './CartIconWrapper/CartIconWrapper';
import CartDropdown from './CartDropdown/CartDropdown';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCartDropdown: false,
    };
  }

  toggleCartDropdown = () => {
    this.setState((prevState) => ({
      showCartDropdown: !prevState.showCartDropdown,
    }));
  };

  closeCartDropdown = () => {
    this.setState({ showCartDropdown: false });
  };

  render() {
    const { showCartDropdown } = this.state;
    const { onRemoveFromCart, onAddToCart, onPlaceHolder } = this.props;
    const { cart, categories, activeCategory, setActiveCategory } = this.props;

    return (
      <nav className={Styles.wrapper}>
        <div className={Styles.container}>
          <div className={Styles.categoriesContainer}>
            {categories.map((category, index) => (
              <CategoryItem
                key={index}
                active={category === activeCategory}
                category={category}
                onClick={() => setActiveCategory(category)}
              />
            ))}
          </div>
          <div className={Styles.spacer}></div>

          <div style={{ cursor: 'pointer' }}>
            <Logo />
          </div>

          <div className={Styles.spacer}></div>
          <div className={Styles.spacer}></div>

          <div 
          data-testid="cart-btn" style={{ cursor: 'pointer' }} onClick={this.toggleCartDropdown}>
            <CartIconWrapper cartLength={cart.length} />
          </div>
        </div>
        {showCartDropdown && <CartDropdown onPlaceHolder={onPlaceHolder} onRemoveFromCart={onRemoveFromCart} onAddToCart={onAddToCart} cart={cart} onClose={this.closeCartDropdown} />}
      </nav>
    );
  }
}

export default Navbar;