import React from 'react';
import config from '../../../config';
import './Music.css';

import io from 'socket.io-client';
import RecentTrackTile from './RecentTrackTile/RecentTrackTile';
import ViewportPaginationView from '../ViewportPaginationView/ViewportPaginationView';
import '../ViewportPaginationView/ViewportPaginationView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import IndexIndicator from '../ViewportPaginationView/IndexIndicator/IndexIndicator';

class Music extends ViewportPaginationView {
    onComponentDidMount() {
        var that = this;
        fetch(`${config.apiDomain}/lastfm/getMyRecentTrack`).then(function(response) {
            return response.json();
        }).then(function(json) {
            that.setState({recentTrack: json});
        });

        this.socket = io(`${config.apiDomain}/lastfm`);

        this.socket.on("recent-track-update", function(message) {
            var newRecentTrack = JSON.parse(message);
            that.setState({recentTrack: newRecentTrack});
        })
        this.socket.on("connected", function(msg) {
            console.log(msg);
        })
    }

    componentWillUnmount() {
        this.socket.close();
    }

    hashes = ["one", "two"]

    render() {
        return (
            <div className="viewport-pagination-view music" onWheel={this.handleScroll.bind(this)} onTouchMove={this.handleTouchMove.bind(this)} onTouchStart={this.registerTouchStart.bind(this)}>
                <IndexIndicator hashes={this.hashes} activeIndex={this.state.currentIndex} setIndex={this.setIndex.bind(this)}></IndexIndicator>
                <div style={{transform: "translateY(-" + this.state.currentIndex * this.state.windowHeight + "px)"}}>
                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div>
                            <RecentTrackTile name="Zach Huxford" displayPhoto="/cropped_me.jpg" recentTrack={this.state.recentTrack}></RecentTrackTile>
                            <div className="scroll-down">
                                <p>SCROLL DOWN</p>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
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
}

export default Music;
