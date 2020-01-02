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

        this.zoom = 1;
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
        this.zoom = newZoomValue;
    }

    handleZoomOutClick() {
        var currentZoomValue = this.state.zoom,
            newZoomValue = currentZoomValue - 0.2;
        if (newZoomValue < 1) {
            newZoomValue = 1
        }
        this.setState({zoom: newZoomValue});
        this.zoom = newZoomValue;
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

            var maxDeltaX,
                maxDeltaY;

            var scaleWidth = zoomValue * event.target.width,
                scaleHeight = zoomValue * event.target.height;

            if (scaleWidth < window.innerWidth) {
                maxDeltaX = 0;
            } else {
                maxDeltaX = (Math.abs((window.innerWidth - scaleWidth)) / 2) / zoomValue;
            }

            if (scaleHeight < window.innerHeight) {
                maxDeltaY = 0;
            } else {
                maxDeltaY = (Math.abs((window.innerHeight - scaleHeight)) / 2) / zoomValue;
            }

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

    calculateDistanceBetweenPoints(pointA, pointB) {
        var deltaX = Math.abs(pointA.xCoordinate - pointB.xCoordinate),
            deltaY = Math.abs(pointA.yCoordinate - pointB.yCoordinate);

        return Math.sqrt((deltaX ^ 2) + (deltaY ^ 2))
    }

    registerImageTouchStart(event) {
        event.preventDefault();
        debugger;
        if (event.targetTouches.length === 1) {
            this.referenceTouch = {
                touchStartPosY: event.targetTouches[0].pageY,
                touchStartPosX: event.targetTouches[0].pageX
            };
        } else if (event.targetTouches.length === 2) {
            var points = [{
                xCoordinate: event.targetTouches[0].pageX,
                yCoordinate: event.targetTouches[0].pageY
            },
            {
                xCoordinate: event.targetTouches[1].pageX,
                yCoordinate: event.targetTouches[1].pageY
            }];

            this.currentPinchDistance = this.calculateDistanceBetweenPoints(...points)
        }
        
    }

    handleImageTouchMove(event) {
        var zoomValue = this.zoom;
        if (event.touches.length === 1) {
            var newTouch = {
                touchStartPosY: event.changedTouches[0].pageY,
                touchStartPosX: event.changedTouches[0].pageX
            }
            var deltaX = this.deltaX - ((this.referenceTouch.touchStartPosX - newTouch.touchStartPosX) / zoomValue),
                deltaY = this.deltaY - ((this.referenceTouch.touchStartPosY - newTouch.touchStartPosY) / zoomValue);


            var maxDeltaX,
                maxDeltaY;

            var scaleWidth = zoomValue * event.target.width,
                scaleHeight = zoomValue * event.target.height;

            if (scaleWidth < window.innerWidth) {
                maxDeltaX = 0;
            } else {
                maxDeltaX = (Math.abs((window.innerWidth - scaleWidth)) / 2) / zoomValue;
            }

            if (scaleHeight < window.innerHeight) {
                maxDeltaY = 0;
            } else {
                maxDeltaY = (Math.abs((window.innerHeight - scaleHeight)) / 2) / zoomValue;
            }

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
            this.referenceTouch = newTouch;

            this.setState({
                deltaX: deltaX,
                deltaY: deltaY
            });
        } else if (event.targetTouches.length === 2) {
            var points = [{
                xCoordinate: event.targetTouches[0].pageX,
                yCoordinate: event.targetTouches[0].pageY
            },
            {
                xCoordinate: event.targetTouches[1].pageX,
                yCoordinate: event.targetTouches[1].pageY
            }];

            var newPinchDistance = this.calculateDistanceBetweenPoints(...points),
                newZoomValue = (newPinchDistance / this.currentPinchDistance) * zoomValue;
            
            if (newZoomValue < 1) {
                newZoomValue = 1;
            } else if (newZoomValue > 2) {
                newZoomValue = 2;
            }

            this.setState({
                zoom: newZoomValue
            });
            this.zoom = newZoomValue;

            this.currentPinchDistance = newPinchDistance;
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
                    <img className={this.state.imageClassName} src={this.state.imageFilePath} alt={this.state.imageCaption} onClick={this.toggleHideOverlay.bind(this)} style={{transform: "scale(" + this.state.zoom + ") translate(" + this.state.deltaX + "px, " + this.state.deltaY + "px)"}} onMouseMove={this.handleImageMouseMove.bind(this)} onMouseDown={this.handleImageMouseDown.bind(this)}  onMouseUp={this.handleImageMouseUp.bind(this)} onMouseOut={this.handleImageMouseUp.bind(this)} onTouchStart={this.registerImageTouchStart.bind(this)} onTouchMove={this.handleImageTouchMove.bind(this)}></img>
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
