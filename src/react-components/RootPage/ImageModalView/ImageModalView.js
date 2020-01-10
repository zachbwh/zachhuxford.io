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
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.handleImageMouseMove = this.handleImageMouseMove.bind(this);
        this.handleImageMouseDown = this.handleImageMouseDown.bind(this);
        this.handleImageMouseUp = this.handleImageMouseUp.bind(this);
        this.handleImageScroll = this.handleImageScroll.bind(this);
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
        if (event.keyCode === 27) { // esc
            ImageModalView.hide()
        } else if (!this.state.hidden) {
            if (event.keyCode === 37) { // left
                this.handlePreviousImageClick()
            } else if (event.keyCode === 39) { // left
                this.handleNextImageClick()
            }
        }
    }

    handleFullScreenChange(event) {
        var newFullScreenState = document.fullscreenElement != null ? true : false;
        this.setState({ fullScreen: newFullScreenState });
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
                deltaY: this.deltaY,
                transformOriginX: 0,
                transformOriginY: 0
            })
        }
    }

    toggleHideOverlay() {
        this.setState({ overlayHidden: !this.state.overlayHidden })
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
        if (!this.eventTimeout) {
            this.eventTimeout = setTimeout(function () {
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
            minDeltaX = maxTranslationValues.minDeltaX,
            minDeltaY = maxTranslationValues.minDeltaY,
            maxDeltaX = maxTranslationValues.maxDeltaX,
            maxDeltaY = maxTranslationValues.maxDeltaY;

        this.ensureMaxTranslationRespected(minDeltaX, minDeltaY, maxDeltaX, maxDeltaY, deltaX, deltaY);

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
        event.preventDefault();

        this.mouseDownOnImage = true;
        this.timeDownOnImage = Date.now();
    }

    handleImageMouseUp(event) {
        event.preventDefault();

        this.mouseDownOnImage = false;
        var now = Date.now()
        if (now - this.timeDownOnImage < 250) {
            this.toggleHideOverlay();
        }
        this.timeDownOnImage = null;
    }

    handleImageMouseMove(event) {
        event.preventDefault();

        var zoomValue = this.state.zoom;
        if (this.mouseDownOnImage && zoomValue > 1) {
            var deltaX = this.deltaX + event.movementX,
                deltaY = this.deltaY + event.movementY;

            var maxTranslationValues = this.getMaxTranslationValues(event.target.width, event.target.height, zoomValue),
                minDeltaX = maxTranslationValues.minDeltaX,
                minDeltaY = maxTranslationValues.minDeltaY,
                maxDeltaX = maxTranslationValues.maxDeltaX,
                maxDeltaY = maxTranslationValues.maxDeltaY;
    
            this.ensureMaxTranslationRespected(minDeltaX, minDeltaY, maxDeltaX, maxDeltaY, deltaX, deltaY);
        }
    }

    handleImageScroll(event) {
        event.preventDefault();

        var zoomValue = this.state.zoom,
            newZoomValue = zoomValue + (event.deltaY / -30);

        if (newZoomValue < this.minZoom) {
            newZoomValue = this.minZoom;
        } else if (newZoomValue > this.maxZoom) {
            newZoomValue = this.maxZoom;
        }
        
        if (event.ctrlKey) {
            var maxTranslationValues = this.getMaxTranslationValues(event.target.width, event.target.height, newZoomValue),
                minDeltaX = maxTranslationValues.minDeltaX,
                minDeltaY = maxTranslationValues.minDeltaY,
                maxDeltaX = maxTranslationValues.maxDeltaX,
                maxDeltaY = maxTranslationValues.maxDeltaY;
            
            this.ensureMaxTranslationRespected(minDeltaX, minDeltaY, maxDeltaX, maxDeltaY, this.deltaX, this.deltaY);

            this.zoomTo(newZoomValue);
        }
    }

    getMaxTranslationValues(elementWidth, elementHeight, zoomValue) {
        var minDeltaX,
            maxDeltaX,
            minDeltaY,
            maxDeltaY;

        var scaleWidth = zoomValue * elementWidth,
            scaleHeight = zoomValue * elementHeight;


        var transformOriginDeviationX,
            transformOriginDeviationY;
        if (!this.state.transformOriginX || !this.state.transformOriginY) {
            transformOriginDeviationX = 0;
            transformOriginDeviationY = 0;
        } else {
            transformOriginDeviationX = ((zoomValue - 1) * ((elementWidth / 2) - this.state.transformOriginX)) / zoomValue;
            transformOriginDeviationY = ((zoomValue - 1) * ((elementHeight / 2) - this.state.transformOriginY)) / zoomValue;
        }

        if (scaleWidth < window.innerWidth) {
            minDeltaX = 0 - transformOriginDeviationX;
            maxDeltaX = 0 - transformOriginDeviationX;
        } else {
            minDeltaX = (((window.innerWidth - scaleWidth) / 2) / zoomValue) - transformOriginDeviationX;
            maxDeltaX = -(((window.innerWidth - scaleWidth) / 2) / zoomValue) - transformOriginDeviationX;
        }

        if (scaleHeight < window.innerHeight) {
            minDeltaY = 0 - transformOriginDeviationY;
            maxDeltaY = 0 - transformOriginDeviationY;
        } else {
            minDeltaY = (((window.innerHeight - scaleHeight) / 2) / zoomValue) - transformOriginDeviationY;
            maxDeltaY = -((window.innerHeight - scaleHeight) / 2) / zoomValue - transformOriginDeviationY;
        }
        return {
            minDeltaX: minDeltaX,
            minDeltaY: minDeltaY,
            maxDeltaX: maxDeltaX,
            maxDeltaY: maxDeltaY
        };
    }

    ensureMaxTranslationRespected(minDeltaX, minDeltaY, maxDeltaX, maxDeltaY, deltaX, deltaY) {
        if (deltaX > maxDeltaX) {
            deltaX = maxDeltaX;
        } else if (deltaX < minDeltaX) {
            deltaX = minDeltaX;
        }

        if (deltaY > maxDeltaY) {
            deltaY = maxDeltaY;
        } else if (deltaY < minDeltaY) {
            deltaY = minDeltaY;
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

    calculateMidpointBetweenPoints(pointA, pointB) {
        return {
            touchStartPosX: (pointA.xCoordinate + pointB.xCoordinate) / 2,
            touchStartPosY: (pointA.yCoordinate + pointB.yCoordinate) / 2
        };
    }

    registerImageTouchStart(event) {
        this.timeDownOnImage = Date.now();

        if (event.targetTouches.length === 1) {
            this.referenceTouch = {
                touchStartPosY: event.targetTouches[0].pageY,
                touchStartPosX: event.targetTouches[0].pageX
            };
            this.midpointReferenceTouch = null;

        } else if (event.targetTouches.length === 2) {
            var points = [{
                xCoordinate: event.targetTouches[0].pageX,
                yCoordinate: event.targetTouches[0].pageY
            },
            {
                xCoordinate: event.targetTouches[1].pageX,
                yCoordinate: event.targetTouches[1].pageY
            }];

            this.midpointReferenceTouch = this.calculateMidpointBetweenPoints(...points);
            this.referenceTouch = null;

            if (this.zoom === 1) {
                console.log("set transform origin")
                var targetLeft = (window.innerWidth - event.target.width) / 2,
                    targetTop = (window.innerHeight - event.target.height) / 2;

                this.setState({
                    transformOriginX: this.midpointReferenceTouch.touchStartPosX - targetLeft,
                    transformOriginY: this.midpointReferenceTouch.touchStartPosY - targetTop
                })
            }

            this.currentPinchDistance = this.calculateDistanceBetweenPoints(...points)
        }
    }

    handleImageTouchEnd(event) {
        if (this.zoom < this.minZoom) {
            this.setDefaultTransformPropertyValues(true);
        } else if (this.zoom > this.maxZoom) {
            var maxTranslationValues = this.getMaxTranslationValues(event.target.width, event.target.height, this.maxZoom),
                minDeltaX = maxTranslationValues.minDeltaX,
                minDeltaY = maxTranslationValues.minDeltaY,
                maxDeltaX = maxTranslationValues.maxDeltaX,
                maxDeltaY = maxTranslationValues.maxDeltaY;

            this.ensureMaxTranslationRespected(minDeltaX, minDeltaY, maxDeltaX, maxDeltaY, this.deltaX, this.deltaY);

            this.zoomTo(this.maxZoom);
        }

        if (Date.now() - this.timeDownOnImage < 100) {
            event.preventDefault();
            this.toggleHideOverlay();
        }
        this.timeDownOnImage = null;
    }

    handleImageTouchMove(event) {
        var zoomValue = this.zoom,
            deltaX,
            deltaY;

        if (event.targetTouches.length === 1) {
            var newTouch = {
                touchStartPosY: event.targetTouches[0].pageY,
                touchStartPosX: event.targetTouches[0].pageX
            }
            if (this.referenceTouch) {
                deltaX = this.deltaX - ((this.referenceTouch.touchStartPosX - newTouch.touchStartPosX) / zoomValue);
                deltaY = this.deltaY - ((this.referenceTouch.touchStartPosY - newTouch.touchStartPosY) / zoomValue);
            } else {
                deltaX = this.deltaX;
                deltaY = this.deltaY;
            }
            

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
                newMidpointReferenceTouch = this.calculateMidpointBetweenPoints(...points),
                newZoomValue = (newPinchDistance / this.currentPinchDistance) * zoomValue;

            // Adjust new zoom value to decrease user effort when zooming
            // console.log(newPinchDistance)
            if (newZoomValue > zoomValue) {
                // console.log("increased zoom")
                newZoomValue = newZoomValue * 1.03;
            } else if (newZoomValue < zoomValue) {
                // console.log("decreased zoom")
                newZoomValue = newZoomValue * 0.97;
            }

            deltaX = this.deltaX - ((this.midpointReferenceTouch.touchStartPosX - newMidpointReferenceTouch.touchStartPosX) / newZoomValue);
            deltaY = this.deltaY - ((this.midpointReferenceTouch.touchStartPosY - newMidpointReferenceTouch.touchStartPosY) / newZoomValue);

            this.midpointReferenceTouch = newMidpointReferenceTouch;

            this.currentPinchDistance = newPinchDistance;

            this.zoomTo(newZoomValue);

            zoomValue = newZoomValue;
            
        }

        var maxTranslationValues = this.getMaxTranslationValues(event.target.width, event.target.height, zoomValue),
            minDeltaX = maxTranslationValues.minDeltaX,
            minDeltaY = maxTranslationValues.minDeltaY,
            maxDeltaX = maxTranslationValues.maxDeltaX,
            maxDeltaY = maxTranslationValues.maxDeltaY;

        this.ensureMaxTranslationRespected(minDeltaX, minDeltaY, maxDeltaX, maxDeltaY, deltaX, deltaY);
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
                    <div className={"image-controls top" + (this.state.overlayHidden ? " hidden" : "")}>
                        <div className="side-control">
                            <FontAwesomeIcon
                                icon={this.state.fullScreen ? faCompress : faExpand}
                                onClick={this.toggleFullScreen.bind(this)}
                                className="button"
                            />
                        </div>
                        <div className="middle-section">
                            <FontAwesomeIcon
                                icon={faSearchMinus}
                                onClick={this.handleZoomOutClick.bind(this)}
                                className="button"
                            />
                            <span className="zoom-level">{Math.round((this.state.zoom < this.minZoom ? this.minZoom : this.state.zoom > this.maxZoom ? this.maxZoom : this.state.zoom) * 100)}%</span>
                            <FontAwesomeIcon
                                icon={faSearchPlus}
                                onClick={this.handleZoomInClick.bind(this)}
                                className="button"
                            />
                        </div>
                        <div className="side-control">
                            <FontAwesomeIcon
                                icon={faTimesCircle}
                                onClick={ImageModalView.hide}
                                className="button"
                            />
                        </div>
                    </div>

                    <img
                        className={this.state.imageClassName}
                        src={this.state.imageFilePath}
                        alt={this.state.imageCaption}
                        style={{
                            transform: "scale(" + this.state.zoom + ") translate(" + this.state.deltaX + "px, " + this.state.deltaY + "px)",
                            transformOrigin: (this.state.transformOriginX ? this.state.transformOriginX + "px " : "50% ") + (this.state.transformOriginY ? this.state.transformOriginY + "px" : "50%")
                        }}
                        onMouseMove={this.handleImageMouseMove}
                        onMouseDown={this.handleImageMouseDown}
                        onMouseUp={this.handleImageMouseUp}
                        onMouseOut={this.handleImageMouseUp}
                        onWheel={this.handleImageScroll}
                        onTouchStart={this.registerImageTouchStart}
                        onTouchEnd={this.handleImageTouchEnd}
                        onTouchMove={this.handleImageTouchMove}
                        ref={this.imageRef}
                    />
                    <div className={"image-controls bottom" + (this.state.overlayHidden ? " hidden" : "")}>
                        <div className="side-control" style={{ opacity: this.state.imageIndex === 0 ? "0.5" : "1" }}>
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                onClick={this.handlePreviousImageClick}
                                className="button"
                            />
                        </div>
                        <span className="middle-section">
                            {this.state.imageCaption}
                            <br />
                            ({this.state.imageIndex + 1}/{this.state.imageList.length})
                        </span>
                        <div className="side-control" style={{ opacity: this.state.imageIndex < this.state.imageList.length - 1 ? "1" : "0.5" }}>
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                onClick={this.handleNextImageClick}
                                className="button"
                            />
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
