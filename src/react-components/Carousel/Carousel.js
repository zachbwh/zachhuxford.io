import React, { Component } from 'react';
import './Carousel.css';

import CarouselIndexIndicator from './CarouselIndexIndicator/CarouselIndexIndicator'


class Carousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 0,
            lastScrollTime: new Date(),
            windowWidth: window.innerWidth
        };

        this.handleWindowResize = this.handleWindowResize.bind(this)
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleWindowResize);

    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }
    
    handleScroll(event) {
        event.preventDefault();
    
        var currentDate = new Date(),
            lastScrollTime = this.state.lastScrollTime;
    
        if (typeof lastScrollTime !== "undefined" && lastScrollTime != null && new Date(lastScrollTime.getTime() + this.scrollCooldownMilliSeconds) < currentDate) {
            
            if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) {
                if (event.deltaX < 0) {
                    console.log("scroll left");
                    this.scrollToPrevRef();
        
                } else if (event.deltaX > 0) {
                    console.log("scroll right");
                    this.scrollToNextRef();
                }
            }
    
            this.setState({
                lastScrollTime: currentDate
            });
        }
    }

    registerTouchStart(event) {
        event.preventDefault();
        this.setState({
            touchStartPosY: event.targetTouches[0].pageY,
            touchStartPosX: event.targetTouches[0].pageX
        });
    }
    
    handleTouchMove(event) {
        event.preventDefault();
    
        var currentDate = new Date(),
            lastScrollTime = this.state.lastScrollTime,
            currentPageX = event.targetTouches[0].pageX,
            currentPageY = event.targetTouches[0].pageY,
            deltaX = this.state.touchStartPosX - currentPageX,
            deltaY = this.state.touchStartPosY - currentPageY;
        
        if (typeof lastScrollTime !== "undefined" && lastScrollTime != null && new Date(lastScrollTime.getTime() + this.scrollCooldownMilliSeconds) < currentDate) {
            if (Math.abs(deltaY) < Math.abs(deltaX)) {
                if (this.state.touchStartPosX < currentPageX) {
                    console.log("scroll right");
                    this.scrollToPrevRef();
        
                } else if (this.state.touchStartPosX > currentPageX) {
                    console.log("scroll left");
                    this.scrollToNextRef();
                }
            }
    
            this.setState({
                lastScrollTime: currentDate
            });
        }
    }

    scrollToNextRef = () => {
        var currentIndex = this.state.currentIndex,
            nextRefIndex = currentIndex < this.props.carouselItems.length - 1 ? currentIndex + 1 : 0;

        this.setState({currentIndex: nextRefIndex});
    }

    scrollToPrevRef = () => {
        var currentIndex = this.state.currentIndex,
            prevRefIndex = currentIndex > 0 ? currentIndex - 1 : this.props.carouselItems.length - 1;

        this.setState({currentIndex: prevRefIndex});
    }

    setIndex(nextIndex) {
        this.setState({currentIndex: nextIndex});
    }

    handleWindowResize(event) {
        var that = this;
        if ( !this.eventTimeout ) {
            this.eventTimeout = setTimeout(function() {
                that.eventTimeout = null;
                console.log("resize event handled");
                that.setState({windowWidth: window.innerWidth});
                if (typeof that.onHandleWindowResize === "function") {
                    that.onHandleWindowResize()
                }
             }, 66);
        }
    }

    scrollCooldownMilliSeconds = 500;

    render() {
        var carouselItems = this.props.carouselItems.map((carouselItem, index) => (
            <div className="carousel-item" key={index} style={{minWidth: this.state.windowWidth + "px"}}>{carouselItem}</div>
        ))
        return (
            <div className="carousel" onWheel={this.handleScroll.bind(this)} onTouchMove={this.handleTouchMove.bind(this)} onTouchStart={this.registerTouchStart.bind(this)}>
                <div className="carousel-container" style={{width: (this.state.windowWidth * this.props.carouselItems.length) + "px",transform: "translateX(-" + this.state.currentIndex * this.state.windowWidth + "px)"}}>
                    {carouselItems}
                </div>
                <CarouselIndexIndicator setIndex={this.setIndex.bind(this)} carouselItems={carouselItems} activeIndex={this.state.currentIndex}/>
            </div>
        );
    }
}

export default Carousel;
