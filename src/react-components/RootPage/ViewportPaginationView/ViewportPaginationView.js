import React, { Component } from 'react';

class ViewportPaginationView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 0,
            lastScrollTime: new Date(),
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth
        };

        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.onHashChange = this.onHashChange.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.registerTouchStart = this.registerTouchStart.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        this.loadCurrentPageFromHash();

        window.addEventListener("resize", this.handleWindowResize);
        window.addEventListener("hashchange", this.onHashChange);
        document.addEventListener("wheel", this.handleScroll);
        document.addEventListener("touchmove", this.handleTouchMove);
        document.addEventListener("touchstart", this.registerTouchStart);
        document.addEventListener("keydown", this.handleKeyDown);

        if (this.onComponentDidMount && typeof this.onComponentDidMount === "function") {
            this.onComponentDidMount();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
        window.removeEventListener("hashchange", this.onHashChange);
        document.removeEventListener("wheel", this.handleScroll);
        document.removeEventListener("touchmove", this.handleTouchMove);
        document.removeEventListener("touchstart", this.registerTouchStart);
        document.removeEventListener("keydown", this.handleKeyDown);

        if (this.onComponentWillUnmount && typeof this.onComponentWillUnmount === "function") {
            this.onComponentWillUnmount();
        }
    }

    onHashChange() {
        this.loadCurrentPageFromHash()
    }

    loadCurrentPageFromHash() {
        var hash = window.location.hash.slice(1);
        
        if (hash) {
            console.log(hash);
            var currentIndex = this.hashes.indexOf(hash);
            console.log(currentIndex);
            if (currentIndex < 0) {
                this.setState({currentIndex: 0});
                window.location.hash = "";
            } else {
                this.setState({currentIndex: currentIndex});
            }
        } else {
            this.setState({currentIndex: 0});
            window.location.hash = "";
        }
    }
    
    handleScroll(event) {
        if (this.ignoreTouchAndScrollEvents(event)) {
            return null;
        }

        var currentDate = new Date(),
            lastScrollTime = this.state.lastScrollTime;
    
        if (typeof lastScrollTime !== "undefined" && lastScrollTime != null && new Date(lastScrollTime.getTime() + this.scrollCooldownMilliSeconds) < currentDate) {
            
            if (event.deltaY < 0) {
                console.log("scroll up");
                this.scrollToPrevRef();
    
            } else if (event.deltaY > 0) {
                console.log("scroll down");
                this.scrollToNextRef();
            }
    
            this.setState({
                lastScrollTime: currentDate
            });
        }
    }

    registerTouchStart(event) {
        if (this.ignoreTouchAndScrollEvents(event)) {
            return null;
        }

        this.setState({
            touchStartPosY: event.targetTouches[0].pageY,
            touchStartPosX: event.targetTouches[0].pageX
        });
    }
    
    handleTouchMove(event) {
        if (this.ignoreTouchAndScrollEvents(event)) {
            return null;
        }
    
        var currentDate = new Date(),
            lastScrollTime = this.state.lastScrollTime,
            currentPageX = event.targetTouches[0].pageX,
            currentPageY = event.targetTouches[0].pageY,
            deltaX = this.state.touchStartPosX - currentPageX,
            deltaY = this.state.touchStartPosY - currentPageY;
        
        if (typeof lastScrollTime !== "undefined" && lastScrollTime != null && new Date(lastScrollTime.getTime() + this.scrollCooldownMilliSeconds) < currentDate) {
            if (Math.abs(deltaY) > Math.abs(deltaX)) {
                if (this.state.touchStartPosY < currentPageY) {
                    console.log("scroll up");
                    this.scrollToPrevRef();
        
                } else if (this.state.touchStartPosY > currentPageY) {
                    console.log("scroll down");
                    this.scrollToNextRef();
                }
            }
    
            this.setState({
                lastScrollTime: currentDate
            });
        }
    }

    handleKeyDown(event) {
        if (event.keyCode === 40 || event.keyCode === 34) { // down or page down
            this.scrollToNextRef()
        } else if (event.keyCode === 38 || event.keyCode === 33) { // up or page up
            this.scrollToPrevRef()
        }
    }

    ignoreTouchAndScrollEvents(event) {
        // ignore touch and scroll events on image modal view and nav bar
        if (event.target.closest(".image-modal-view")) {
            return true;
        } else if (event.target.closest(".navBar")) {
            return true;
        }

        return false;
    }

    scrollToNextRef = () => {
        var currentIndex = this.state.currentIndex,
            nextRefIndex = currentIndex < this.hashes.length - 1 ? currentIndex + 1 : this.hashes.length - 1;

        window.location.hash = this.hashes[nextRefIndex];

        this.setState({currentIndex: nextRefIndex});
    }

    scrollToPrevRef = () => {
        var currentIndex = this.state.currentIndex,
            prevRefIndex = currentIndex > 0 ? currentIndex - 1 : 0;

        window.location.hash = this.hashes[prevRefIndex];

        this.setState({currentIndex: prevRefIndex});
    }

    setIndex(nextIndex) {
        window.location.hash = this.hashes[nextIndex];

        this.setState({currentIndex: nextIndex});
    }

    handleWindowResize(event) {
        var that = this;
        if ( !this.eventTimeout ) {
            this.eventTimeout = setTimeout(function() {
                that.eventTimeout = null;
                console.log("resize event handled");
                that.setState({
                    windowHeight: window.innerHeight,
                    windowWidth: window.innerWidth
                });
                if (typeof that.onHandleWindowResize === "function") {
                    that.onHandleWindowResize()
                }
             }, 66);
        }
    }

    scrollCooldownMilliSeconds = 500;

    /* Override this in child */
    hashes = ["one", "two"];

    render() {
        return (
            <div className="viewport-pagination-view">
                <div className="viewport-container" style={{transform: "translateY(-" + this.state.currentIndex * this.state.windowHeight + "px)"}}>
                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div>
                        </div>
                    </div>
                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    /* End of Override this in child */ 
}

export default ViewportPaginationView;
