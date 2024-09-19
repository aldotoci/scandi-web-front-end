import React, { Component } from 'react';
import Styles from './CategoryItem.module.css';


class CategoryItem extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            // Add state properties here
        };
    }


    render() {
        const {active} = this.props;

        return (
            <div
                data-testid={active ? 'category-link' : 'active-category-link'}
                onClick={this.props.onClick}
                className={Styles.container + ' ' + (active ? Styles.containerActive : '')}
                
                >
                <a className={`${Styles.link} ${this.props.active ? Styles.linkActive : ''}` }>
                    {this.props.category}
                </a>
        
            </div>
        );
    }
}

export default CategoryItem;