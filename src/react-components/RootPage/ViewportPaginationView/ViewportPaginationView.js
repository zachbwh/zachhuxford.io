import React, { Component } from 'react';

class Music extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 0,
            lastScrollTime: new Date(),
            windowHeight: window.innerHeight
        };
    }

    componentDidMount() {
        var hash = window.location.hash.slice(1);
        
        if (hash) {
            console.log(hash);
            var currentIndex = this.hashes.indexOf(hash);
            console.log(currentIndex);
            if (currentIndex < 0) {
                this.setState({currentIndex: 0});
                window.location.hash = ""
            } else {
                this.setState({currentIndex: currentIndex});
            }
        } else {
            this.setState({currentIndex: 0});
            window.location.hash = "";
        }

        window.addEventListener("resize", this.handleWindowResize.bind(this));

        if (this.onComponentDidMount && typeof this.onComponentDidMount === "function") {
            this.onComponentDidMount();
        }
    }

    onComponentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize.bind(this));
    }
    
    handleScroll(event) {
        event.preventDefault();
    
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
        event.preventDefault();
        this.setState({touchStartPos: event.targetTouches[0].pageY});
    }
    
    handleTouchMove(event) {
        event.preventDefault();
    
        var currentDate = new Date(),
            lastScrollTime = this.state.lastScrollTime,
            currentPageY = event.targetTouches[0].pageY;;
    
        if (typeof lastScrollTime !== "undefined" && lastScrollTime != null && new Date(lastScrollTime.getTime() + this.scrollCooldownMilliSeconds) < currentDate) {
            
            if (this.state.touchStartPos < currentPageY) {
                console.log("scroll up");
                this.scrollToPrevRef();
    
            } else if (this.state.touchStartPos > currentPageY) {
                console.log("scroll down");
                this.scrollToNextRef();
            }
    
            this.setState({
                lastScrollTime: currentDate
            });
        }
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
                that.setState({windowHeight: window.innerHeight});
             }, 66);
        }
    }

    scrollCooldownMilliSeconds = 500;

    /* Override this in child */
    hashes = ["one", "two"];

    render() {
        return (
            <div className="viewport-pagination-view" onWheel={this.handleScroll.bind(this)} onTouchMove={this.handleTouchMove.bind(this)} onTouchStart={this.registerTouchStart.bind(this)}>
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

export default Music;
