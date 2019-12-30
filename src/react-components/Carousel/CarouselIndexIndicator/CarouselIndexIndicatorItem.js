import React, { Component } from 'react';
import './CarouselIndexIndicatorItem.css';

class CarouselIndexIndicatorItem extends Component {
    handleClick() {
        if (this.props.setIndex && typeof this.props.setIndex === "function") {
            this.props.setIndex(this.props.index);
        }
    }

    render() {
        return (
            <div className={"carousel-index-indicator-item " + (this.props.isActive === true ? "active" : "")} onClick={this.handleClick.bind(this)}>
            </div>
        );
    }
}

export default CarouselIndexIndicatorItem;
