import React, { Component } from 'react';
import './FocusableImageCarouselTile.css';

import ImageModalView from '../../RootPage/ImageModalView/ImageModalView';

class FocusableImageCarouselTile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: false
        };
    }

    showImageModalView() {
        ImageModalView.setContent({
            imageFilePath: this.props.imageFilePath,
            imageCaption: this.props.imageCaption,
            imageClassName: this.props.imageCaption
        });
        ImageModalView.show();
    }

    render() {
        return (
            <div className="focusable-image-carousel-tile">
                <img className={this.props.imageClassName} src={this.props.imageFilePath} alt={this.props.imageCaption} onClick={this.showImageModalView.bind(this)} style={{maxWidth: this.props.maxWidth}}></img>
                <p style={{maxWidth: this.props.maxWidth}}>{this.props.imageCaption}</p>
            </div>
        );
    }
}

export default FocusableImageCarouselTile;
