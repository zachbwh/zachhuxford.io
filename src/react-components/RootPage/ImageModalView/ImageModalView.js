import React, { Component } from 'react';
import './ImageModalView.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faExpand, faSearchMinus, faSearchPlus, faCompress, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';



class ImageModalView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: true,
            overlayHidden: false,
            fullScreen: false,
            zoom: 1,
            deltaX: 0,
            deltaY: 0,
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth
        };

        this.zoom = 1;
        this.deltaX = 0;
        this.deltaY = 0;
        this.maxZoom = 3;
        this.minZoom = 1;
        this.zoomIncrement = 0.2;

        this.imageModalViewRef = React.createRef();
        this.imageRef = React.createRef();

        ImageModalView.__singletonRef = this;

        this.handleFullScreenChange = this.handleFullScreenChange.bind(this);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleHashChange = this.handleHashChange.bind(this);

        this.handleImageMouseMove = this.handleImageMouseMove.bind(this);
        this.handleImageMouseDown = this.handleImageMouseDown.bind(this);
        this.handleImageMouseUp = this.handleImageMouseUp.bind(this);
        this.registerImageTouchStart = this.registerImageTouchStart.bind(this);
        this.handleImageTouchEnd = this.handleImageTouchEnd.bind(this);
        this.handleImageTouchMove = this.handleImageTouchMove.bind(this);

        this.handlePreviousImageClick = this.handlePreviousImageClick.bind(this);
        this.handleNextImageClick = this.handleNextImageClick.bind(this);
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
        document.addEventListener("fullscreenchange", this.handleFullScreenChange, false);
        window.addEventListener("resize", this.handleWindowResize);
        window.addEventListener("hashchange", this.handleHashChange);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown, false);
        document.removeEventListener("fullscreenchange", this.handleFullScreenChange, false);
        window.removeEventListener("resize", this.handleWindowResize);
        window.removeEventListener("hashchange", this.handleHashChange);
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

        this.setDefaultTransformPropertyValues(true);
    }

    __setContent(newContent) {
        this.setState(newContent)
    }

    setDefaultTransformPropertyValues(setState) {
        this.zoom = 1;
        this.deltaX = 0;
        this.deltaY = 0;

        if (setState) {
            this.setState({
                zoom: this.zoom,
                deltaX: this.deltaX,
                deltaY: this.deltaY
            })
        }
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

    handleWindowResize() {
        var that = this;
        if ( !this.eventTimeout ) {
            this.eventTimeout = setTimeout(function() {
                that.eventTimeout = null;
                console.log("resize event handled");
                that.setState({
                    windowHeight: window.innerHeight,
                    windowWidth: window.innerWidth
                });
             }, 66);
        }
    }

    handleHashChange() {
        ImageModalView.hide();
    }

    handleZoomInClick() {
        var currentZoomValue = this.state.zoom,
            newZoomValue = currentZoomValue + this.zoomIncrement;

        if (newZoomValue > this.maxZoom) {
            newZoomValue = this.maxZoom;
        }
        
        this.zoomTo(newZoomValue);
    }

    handleZoomOutClick() {
        var currentZoomValue = this.state.zoom,
            newZoomValue = currentZoomValue - this.zoomIncrement;

        if (newZoomValue < this.minZoom) {
            newZoomValue = this.minZoom;
        }

        var deltaX = this.deltaX,
            deltaY = this.deltaY;

        var element = this.imageRef.current;

        var maxTranslationValues = this.getMaxTranslationValues(element.width, element.height, newZoomValue),
            maxDeltaX = maxTranslationValues.maxDeltaX,
            maxDeltaY = maxTranslationValues.maxDeltaY;

        this.ensureMaxTranslationRespected(maxDeltaX, maxDeltaY, deltaX, deltaY);
        
        this.zoomTo(newZoomValue);
    }

    handlePreviousImageClick() {
        if (this.state.imageIndex > 0) {
            var nextIndex = this.state.imageIndex - 1,
                nextImage = this.state.imageList[nextIndex]
            this.setState({
                imageIndex: nextIndex,
                imageFilePath: nextImage.filePath,
                imageCaption: nextImage.caption,
                imageClassName: nextImage.className
            })
        }
    }

    handleNextImageClick() {
        if (this.state.imageIndex < this.state.imageList.length - 1) {
            var nextIndex = this.state.imageIndex + 1,
                nextImage = this.state.imageList[nextIndex];

            this.setState({
                imageIndex: nextIndex,
                imageFilePath: nextImage.filePath,
                imageCaption: nextImage.caption,
                imageClassName: nextImage.className
            })
        }
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

            var maxTranslationValues = this.getMaxTranslationValues(event.target.width, event.target.height, zoomValue),
                maxDeltaX = maxTranslationValues.maxDeltaX,
                maxDeltaY = maxTranslationValues.maxDeltaY;

            this.ensureMaxTranslationRespected(maxDeltaX, maxDeltaY, deltaX, deltaY);
        }
    }

    getMaxTranslationValues(elementWidth, elementHeight, zoomValue) {
        var maxDeltaX,
            maxDeltaY;

        var scaleWidth = zoomValue * elementWidth,
            scaleHeight = zoomValue * elementHeight;

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
        return {
            maxDeltaX: maxDeltaX,
            maxDeltaY: maxDeltaY
        };
    }

    ensureMaxTranslationRespected(maxDeltaX, maxDeltaY, deltaX, deltaY) {
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

    calculateDistanceBetweenPoints(pointA, pointB) {
        var deltaX = Math.abs(pointA.xCoordinate - pointB.xCoordinate),
            deltaY = Math.abs(pointA.yCoordinate - pointB.yCoordinate);

        return Math.sqrt((deltaX ^ 2) + (deltaY ^ 2))
    }

    registerImageTouchStart(event) {
        event.preventDefault();
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

    handleImageTouchEnd(event) {
        if (this.zoom < this.minZoom) {
            this.setDefaultTransformPropertyValues(true);
        } else if (this.zoom > this.maxZoom) {
            this.zoomTo(this.maxZoom);
        }
    }

    handleImageTouchMove(event) {
        var zoomValue = this.zoom,
            deltaX,
            deltaY;
        
        if (event.touches.length === 1) {
            var newTouch = {
                touchStartPosY: event.changedTouches[0].pageY,
                touchStartPosX: event.changedTouches[0].pageX
            }
            deltaX = this.deltaX - ((this.referenceTouch.touchStartPosX - newTouch.touchStartPosX) / zoomValue);
            deltaY = this.deltaY - ((this.referenceTouch.touchStartPosY - newTouch.touchStartPosY) / zoomValue);

            this.referenceTouch = newTouch;
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
            
            // Adjust new zoom value to decrease user effort when zooming
            if (newZoomValue > zoomValue) {
                newZoomValue = newZoomValue * 1.03;
            } else if (newZoomValue < zoomValue) {
                newZoomValue = newZoomValue * 0.97;
            }

            this.zoomTo(newZoomValue);
            zoomValue = newZoomValue;
            deltaX = this.deltaX;
            deltaY = this.deltaY;

            this.currentPinchDistance = newPinchDistance;
        }

        var maxTranslationValues = this.getMaxTranslationValues(event.target.width, event.target.height, zoomValue),
                maxDeltaX = maxTranslationValues.maxDeltaX,
                maxDeltaY = maxTranslationValues.maxDeltaY;

        this.ensureMaxTranslationRespected(maxDeltaX, maxDeltaY, deltaX, deltaY);
    }

    zoomTo(newZoomValue) {
        var minZoomTemporary = this.minZoom - this.zoomIncrement,
            maxZoomTemporary = this.maxZoom + (this.zoomIncrement * 3);

        if (newZoomValue < minZoomTemporary) {
            newZoomValue = minZoomTemporary;
        } else if (newZoomValue > maxZoomTemporary) {
            newZoomValue = maxZoomTemporary;
        }

        this.setState({
            zoom: newZoomValue
        });
        this.zoom = newZoomValue;
    }

    render() {
        var content;
        if (this.state.imageFilePath) {
            content = (
                <div className="image-modal-view" style={{ display: this.state.hidden ? "none" : "", maxHeight: this.state.windowHeight }} ref={this.imageModalViewRef}>
                    <div className="image-controls" style={{ opacity: this.state.overlayHidden ? "0" : "1" }}>
                        <div className="left">
                            <FontAwesomeIcon icon={this.state.fullScreen ? faCompress : faExpand} onClick={this.toggleFullScreen.bind(this)}></FontAwesomeIcon>
                        </div>
                        <FontAwesomeIcon icon={faSearchMinus} onClick={this.handleZoomOutClick.bind(this)}></FontAwesomeIcon>
                        <span className="zoom-level">{Math.round((this.state.zoom < this.minZoom ? this.minZoom : this.state.zoom > this.maxZoom ? this.maxZoom : this.state.zoom) * 100)}%</span>
                        <FontAwesomeIcon icon={faSearchPlus} onClick={this.handleZoomInClick.bind(this)}></FontAwesomeIcon>    
                        <div className="right">
                            <FontAwesomeIcon icon={faTimesCircle} onClick={ImageModalView.hide}></FontAwesomeIcon>
                        </div>
                    </div>

                    <img
                        className={this.state.imageClassName}
                        src={this.state.imageFilePath}
                        alt={this.state.imageCaption}
                        onClick={this.toggleHideOverlay.bind(this)}
                        style={{transform: "scale(" + this.state.zoom + ") translate(" + this.state.deltaX + "px, " + this.state.deltaY + "px)"}}
                        onMouseMove={this.handleImageMouseMove}
                        onMouseDown={this.handleImageMouseDown}
                        onMouseUp={this.handleImageMouseUp}
                        onMouseOut={this.handleImageMouseUp}
                        onTouchStart={this.registerImageTouchStart}
                        onTouchEnd={this.handleImageTouchEnd}
                        onTouchMove={this.handleImageTouchMove}
                        ref={this.imageRef}
                    />
                    <div className="image-controls-bottom" style={{ opacity: this.state.overlayHidden ? "0" : "1" }}>
                        <div className="left" style={{ opacity: this.state.imageIndex === 0 ? "0.5" : "1" }}>
                            <FontAwesomeIcon icon={faChevronLeft} onClick={this.handlePreviousImageClick}></FontAwesomeIcon>
                        </div>
                        <span className="image-caption">
                            {this.state.imageCaption}
                        </span>
                        <div className="right" style={{ opacity: this.state.imageIndex < this.state.imageList.length - 1 ? "1" : "0.5" }}>
                            <FontAwesomeIcon icon={faChevronRight} onClick={this.handleNextImageClick}></FontAwesomeIcon>
                        </div>
                    </div>
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
