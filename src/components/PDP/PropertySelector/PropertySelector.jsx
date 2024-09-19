import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './PropertySelector.module.css';

class PropertySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderItem = (attribute, item) => {
        const selectedAttributes = this.props.selectedAttributes;
        if(attribute.id === "Color"){
            return (
                <div className={Styles.colorItemWrapper} style={{
                    borderColor: `${selectedAttributes[attribute.id] === item.id ? "#5ECE7B" : '#ffffff'}`
                }}>
                    <div
                    key={item.id}
                    className={Styles.colorItem + " " + `${selectedAttributes[attribute.id] === item.id ? Styles.selected : ''}`}
                    onClick={() => this.props.handleSelect(attribute.id, item.id)}
                    style={{
                        backgroundColor: item.value,
                    }}
                    data-testid={`product-attribute-${attribute.id.toLowerCase()}-${item.value}`}
                >
                    </div>
                </div>
            )
        }

        return (
            <div
                key={item.id}
                className={`${Styles.item} ${selectedAttributes[attribute.id] === item.id ? Styles.selected : ''}`}
                onClick={() => this.props.handleSelect(attribute.id, item.id)}
                data-testid={`product-attribute-${attribute.id.toLowerCase()}-${item.value}`}
            >
                {item.value}
            </div>
        )
    }

    render() {
        const { attributes } = this.props;

        return (
            <div className={Styles.container}>
                {attributes.map(attribute => (
                    <div 
                    key={attribute.id} className={Styles.attribute}>
                        <div className={Styles.attributeName}>{attribute.name}:</div>
                        <div data-testid={`product-attribute-${attribute.id.toLowerCase()}`} className={Styles.items}>
                            {attribute.items.map(item => this.renderItem(attribute, item))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default PropertySelector;