import React, { Component } from 'react';
import './SimpleTextCarouselTile.css';

class SimpleTextCarouselTile extends Component {

    render() {
        return (
            <div className="simple-text-carousel-tile" style={{maxWidth: this.props.maxWidth}}>
                <h1 className="header">{this.props.header}</h1>
                <p className="paragraph">{this.props.paragraph}</p>
            </div>
        );
    }
}

export default SimpleTextCarouselTile;
