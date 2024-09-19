import React, { Component } from 'react';
import Styles from './CategoryItem.module.css';
import { Link } from 'react-router-dom';


class CategoryItem extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            // Add state properties here
        };
    }


    render() {
        const {active, category} = this.props;

        return (
            <div
                onClick={this.props.onClick}
                className={Styles.container + ' ' + (active ? Styles.containerActive : '')}
                
                >
                <Link data-testid={!active ? 'category-link' : 'active-category-link'} to={`/${category}`} className={`${Styles.link} ${this.props.active ? Styles.linkActive : ''}` }>
                    {category}
                </Link>
        
            </div>
        );
    }
}

export default CategoryItem;