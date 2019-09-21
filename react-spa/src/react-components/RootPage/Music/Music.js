import React, { Component } from 'react';
import config from '../../../config';
import './Music.css';
import RecentTrackTile from './RecentTrackTile/RecentTrackTile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
        return (
            <div className="music" onWheel={handleScroll.bind(this)} onTouchMove={handleTouchMove.bind(this)} onTouchStart={registerTouchStart.bind(this)}>
                <div style={{transform: "translateY(-" + this.state.currentIndex + "00vh)"}}>
                    <div className="viewport">
                        <div>
                            <RecentTrackTile name="Zach Huxford" displayPhoto="https://s3-ap-southeast-2.amazonaws.com/zachhuxford-io/home/cropped_me.jpg" recentTrack={this.state.recentTrack}></RecentTrackTile>
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
