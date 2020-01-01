import React, { Component } from 'react';
import './ImageModalView.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faExpand, faSearchMinus, faSearchPlus, faCompress } from '@fortawesome/free-solid-svg-icons';



class ImageModalView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: true,
            overlayHidden: false,
            fullScreen: false
        };

        this.imageModalViewRef = React.createRef()

        ImageModalView.__singletonRef = this;
    }

    static show() {
        ImageModalView.__singletonRef.__show();
    }

    static hide() {
        ImageModalView.__singletonRef.__hide();
    }

    static setContent(newContent) {
        ImageModalView.__singletonRef.__setContent(newContent);
    }

    handleKeyDown(event) {
        if (event.keyCode === 27) {
            ImageModalView.hide()
        }
    }

    handleFullScreenChange(event) {
        var newFullScreenState = document.fullscreenElement != null ? true : false;
        this.setState({fullScreen: newFullScreenState});
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown, false);
        document.addEventListener("fullscreenchange", this.handleFullScreenChange.bind(this), false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown, false);
        document.removeEventListener("fullscreenchange", this.handleFullScreenChange.bind(this), false);
    }

    __show() {
        this.setState({ hidden: false });
    }

    __hide() {
        if (this.state.fullScreen) {
            document.exitFullscreen()
        }
        this.setState({
            hidden: true,
            overlayHidden: false
        });
    }

    __setContent(newContent) {
        this.setState(newContent)
    }

    toggleHideOverlay() {
        this.setState({overlayHidden: !this.state.overlayHidden})
    }

    toggleFullScreen() {
        var newFullScreen = !this.state.fullScreen

        if (newFullScreen) {
            var imageModalViewElement = this.imageModalViewRef.current;
            if (imageModalViewElement) {
                imageModalViewElement.requestFullscreen();
            }
        } else {
            document.exitFullscreen()
        }
    }

    render() {
        var content;
        if (this.state.imageFilePath) {
            content = (
                <div className="image-modal-view" style={{ display: this.state.hidden ? "none" : "" }} ref={this.imageModalViewRef}>
                    <div className="image-controls" style={{ opacity: this.state.overlayHidden ? "0" : "1" }}>
                        <div className="left">
                            <FontAwesomeIcon icon={this.state.fullScreen ? faCompress : faExpand} onClick={this.toggleFullScreen.bind(this)}></FontAwesomeIcon>
                        </div>
                        <FontAwesomeIcon icon={faSearchMinus}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faSearchPlus}></FontAwesomeIcon>
                        <div className="right">
                            <FontAwesomeIcon icon={faTimesCircle} onClick={ImageModalView.hide}></FontAwesomeIcon>
                        </div>
                    </div>
                    <img className={this.state.imageClassName} src={this.state.imageFilePath} alt={this.state.imageCaption} onClick={this.toggleHideOverlay.bind(this)}></img>
                    <p className="image-caption" style={{ opacity: this.state.overlayHidden ? "0" : "1" }}>
                        {this.state.imageCaption}
                    </p>
                </div>
            );
        } else {
            content = (
                <div className="image-modal-view" style={{ display: this.state.hidden ? "none" : "" }} ref={this.imageModalViewRef}>
                </div>
            )
        }
        return (
            <div>{content}</div>
        );
    }
}

export default ImageModalView;
