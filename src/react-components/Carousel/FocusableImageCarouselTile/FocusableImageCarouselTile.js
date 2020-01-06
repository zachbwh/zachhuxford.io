import React, { Component } from 'react';
import './FocusableImageCarouselTile.css';

import ImageModalView from '../../RootPage/ImageModalView/ImageModalView';

class FocusableImageCarouselTile extends Component {
    constructor(props) {
        super(props);

        this.onImageLoad = this.onImageLoad.bind(this);
        this.onImageError = this.onImageError.bind(this);
    }

    onImageLoad() {
        this.props.loadNext(this.props.carouselName, this.props.tileIndex);
    }

    onImageError() {
        this.props.loadNext(this.props.carouselName, this.props.tileIndex);
    }

    showImageModalView() {
        ImageModalView.setContent({
            imageFilePath: this.props.imageFilePath,
            imageCaption: this.props.imageCaption,
            imageClassName: this.props.imageClassName,
            imageList: this.props.imageList,
            imageIndex: this.props.carouselIndex
        });
        ImageModalView.show();
    }

    render() {
        var imageOrPlaceholder;
        if (this.props.canLoadImage) {
            imageOrPlaceholder = (
                <img
                    className={this.props.imageClassName}
                    src={this.props.imageFilePath}
                    alt={this.props.imageCaption}
                    onClick={this.showImageModalView.bind(this)}
                    style={{maxWidth: this.props.maxWidth}}
                    onLoad={this.onImageLoad}
                    onError={this.onImageError}
                />
            );
        } else {
            imageOrPlaceholder = (<div></div>);
        }
        return (
            <div className="focusable-image-carousel-tile">
                {imageOrPlaceholder}
                <p style={{maxWidth: this.props.maxWidth}}>{this.props.imageCaption}</p>
            </div>
        );
    }
}

export default FocusableImageCarouselTile;
