import React, { Component } from 'react';
import './FocusableImageCarouselTile.css';

import ImageModalView from '../../RootPage/ImageModalView/ImageModalView';

class FocusableImageCarouselTile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            imageFilePath: props.imageFilePath,
            imageClassName: props.name.toLowerCase().replace(/ /g, "-"),
            imageCaption: props.imageCaption,
            focused: false
        };
    }

    showImageModalView() {
        ImageModalView.setContent({
            imageFilePath: this.state.imageFilePath,
            imageCaption: this.state.imageCaption,
            imageClassName: this.state.imageCaption
        });
        ImageModalView.show();
    }

    render() {
        return (
            <div className="focusable-image-carousel-tile">
                <img className={this.state.imageClassName} src={this.state.imageFilePath} alt={this.state.imageCaption} onClick={this.showImageModalView.bind(this)}></img>
                <p>{this.state.imageCaption}</p>
            </div>
        );
    }
}

export default FocusableImageCarouselTile;
