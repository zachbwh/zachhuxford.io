import React, { Component } from 'react';
import './CarouselIndexIndicator.css';

import CarouselIndexIndicatorItem from './CarouselIndexIndicatorItem';

class CarouselIndexIndicator extends Component {
    render() {
        var indexIndicators = this.props.carouselItems.map((hash, index) => (
            <CarouselIndexIndicatorItem key={index} index={index} isActive={index === this.props.activeIndex ? true : false } setIndex={this.props.setIndex} width={(100 / this.props.carouselItems.length) + "%"}/>
        ));
        return (
            <div className="carousel-index-indicator">
                <div className="container">{indexIndicators}</div>
            </div>
        );
    }
}

export default CarouselIndexIndicator;
