import React, { Component } from 'react';
import config from '../../../config';
import './Music.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Moment from 'moment'

const scrollCooldownMilliSeconds = 500;
const maxIndexValue = 3;
const hashes = ["one", "two"]

const handleScroll = function(event) {
    event.preventDefault();

    var currentDate = new Date(),
        lastScrollTime = this.state.lastScrollTime;

    if (typeof lastScrollTime !== "undefined" && lastScrollTime != null && new Date(lastScrollTime.getTime() + scrollCooldownMilliSeconds) < currentDate) {
        
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

const handleTouchMove = function(event) {
    event.preventDefault();

    var currentDate = new Date(),
        lastScrollTime = this.state.lastScrollTime,
        currentPageY = event.targetTouches[0].pageY;;

    if (typeof lastScrollTime !== "undefined" && lastScrollTime != null && new Date(lastScrollTime.getTime() + scrollCooldownMilliSeconds) < currentDate) {
        
        if (this.touchStartPos < currentPageY) {
            console.log("scroll up");
            this.scrollToPrevRef();

        } else if (this.touchStartPos > currentPageY) {
            console.log("scroll down");
            this.scrollToNextRef();
        }

        this.setState({
            lastScrollTime: currentDate
        });
    }
}

const registerTouchStart = function(event) {
    event.preventDefault();
    this.touchStartPos = event.targetTouches[0].pageY;
}

class Music extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 0,
			lastScrollTime: new Date()
        };
    }

    componentDidMount() {
        var that = this,
            hash = window.location.hash.slice(1);
        
        if (hash) {
            console.log(hash);
            var currentIndex = hashes.indexOf(hash);
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
        fetch(`${config.apiDomain}/lastfm/getMyRecentTrack`).then(function(response) {
            return response.json();
        }).then(function(json) {
            that.setState({"recentTrack": json});
        });
    }

    render() {
        let recentTrackElement;

        if (this.state.recentTrack) {
            recentTrackElement = 
                <div className="recent-track">
                    <div className="user-info" >
                        <img className="display-photo" src="https://s3-ap-southeast-2.amazonaws.com/zachhuxford-io/home/cropped_me.jpg" />
                        <div className="text-block">
                            <p className="string"><b>Zach Huxford</b></p>
                            <p className="string">{this.state.recentTrack["@attr"] && this.state.recentTrack["@attr"].nowplaying === "true" ? "is now listening to:" : Moment(new Date(this.state.recentTrack.date.uts * 1000)).fromNow()}</p>
                        </div>
                    </div>
                    <div className="text-block">
                        <p className="string">{this.state.recentTrack.name}</p>
                        <p className="string">{this.state.recentTrack.artist["#text"]}</p>
                        <p className="string">{this.state.recentTrack.album["#text"]}</p>
                    </div>
                </div>
        } else {
            recentTrackElement = 
            <div className="recent-track loading-shimmer">
                <div className="user-info" >
                    <div className="display-photo animate"></div>
                    <div>
                        <div className="string animate"></div>
                        <div className="string animate"></div>
                    </div>
                </div>
                <div>
                    <div className="string animate"></div>
                    <div className="string animate"></div>
                    <div className="string animate"></div>
                </div>
            </div>
        }
        return (
            <div className="music" onWheel={handleScroll.bind(this)} onTouchMove={handleTouchMove.bind(this)} onTouchStart={registerTouchStart.bind(this)}>
                <div style={{transform: "translateY(-" + this.state.currentIndex + "00vh)"}}>
                    <div className="viewport">
                        <div>
                            {recentTrackElement}
                            <div className="scroll-down">
                                <p>SCROLL DOWN</p>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                        </div>
                    </div>
    
                    <div className="viewport">
                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    scrollToNextRef = () => {
        var nextRefIndex,
            currentIndex = this.state.currentIndex,

        nextRefIndex = currentIndex < maxIndexValue ? currentIndex + 1 : maxIndexValue;
        window.location.hash = hashes[nextRefIndex];

        this.setState({currentIndex: nextRefIndex});
    }

    scrollToPrevRef = () => {
        var nextRefIndex,
            currentIndex = this.state.currentIndex,

        nextRefIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        window.location.hash = hashes[nextRefIndex];

        this.setState({currentIndex: nextRefIndex});
    }
}

export default Music;
