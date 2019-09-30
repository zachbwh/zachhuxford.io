import React, { Component } from 'react';
import './IndexIndicator.css';

import IndexIndicatorCircle from './IndexIndicatorCircle';

class IndexIndicator extends Component {
    render() {
        var indexIndicators = this.props.hashes.map((hash, index) => (
            <IndexIndicatorCircle index={index} isActive={index === this.props.activeIndex ? true : false } setIndex={this.props.setIndex}/>
        ));
        return (
            <div className="index-indicator">
                <div className="container">{indexIndicators}</div>
            </div>
        );
    }
}

export default IndexIndicator;
