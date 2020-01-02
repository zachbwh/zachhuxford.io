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
            fullScreen: false,
            zoom: 1,
            deltaX: 0,
            deltaY: 0
        };

        this.deltaX = 0;
        this.deltaY = 0;

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
            overlayHidden: false,
            zoom: 1,
            deltaX: 0,
            deltaY: 0
        });

        this.deltaX = 0;
        this.deltaY = 0;
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

    handleZoomInClick() {
        var currentZoomValue = this.state.zoom,
            newZoomValue = currentZoomValue + 0.2;
        if (newZoomValue > 2) {
            newZoomValue = 2
        }
        this.setState({zoom: newZoomValue});
    }

    handleZoomOutClick() {
        var currentZoomValue = this.state.zoom,
            newZoomValue = currentZoomValue - 0.2;
        if (newZoomValue < 1) {
            newZoomValue = 1
        }
        this.setState({zoom: newZoomValue});
    }

    handleImageMouseDown(event) {
        event.preventDefault()
        this.mouseDownOnImage = true;
    }

    handleImageMouseUp(event) {
        this.mouseDownOnImage = false;
    }

    handleImageMouseMove(event) {
        var zoomValue = this.state.zoom;
        if (this.mouseDownOnImage && zoomValue > 1) {
            var deltaX = this.deltaX + event.movementX,
                deltaY = this.deltaY + event.movementY;

            var maxDeltaX = ((zoomValue - 1) * event.target.width) / 2;
            var maxDeltaY = ((zoomValue - 1) * event.target.height) / 2;

            if (Math.abs(deltaX) > maxDeltaX && deltaX > 0) {
                deltaX = maxDeltaX;
            } else if (Math.abs(deltaX) > maxDeltaX && deltaX < 0) {
                deltaX = -1 * maxDeltaX;
            }

            if (Math.abs(deltaY) > maxDeltaY && deltaY > 0) {
                deltaY = maxDeltaY;
            } else if (Math.abs(deltaY) > maxDeltaY && deltaY < 0) {
                deltaY = -1 * maxDeltaY;
            }

            this.deltaX = deltaX;
            this.deltaY = deltaY;

            this.setState({
                deltaX: deltaX,
                deltaY: deltaY
            });
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
                        <FontAwesomeIcon icon={faSearchMinus} onClick={this.handleZoomOutClick.bind(this)}></FontAwesomeIcon>
                        <span className="zoom-level">{Math.round(this.state.zoom * 100)}%</span>
                        <FontAwesomeIcon icon={faSearchPlus} onClick={this.handleZoomInClick.bind(this)}></FontAwesomeIcon>    
                        <div className="right">
                            <FontAwesomeIcon icon={faTimesCircle} onClick={ImageModalView.hide}></FontAwesomeIcon>
                        </div>
                    </div>
                    <img className={this.state.imageClassName} src={this.state.imageFilePath} alt={this.state.imageCaption} onClick={this.toggleHideOverlay.bind(this)} style={{transform: "scale(" + this.state.zoom + ") translate(" + this.state.deltaX + "px, " + this.state.deltaY + "px)"}} onMouseMove={this.handleImageMouseMove.bind(this)} onMouseDown={this.handleImageMouseDown.bind(this)}  onMouseUp={this.handleImageMouseUp.bind(this)} onMouseOut={this.handleImageMouseUp.bind(this)}></img>
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
