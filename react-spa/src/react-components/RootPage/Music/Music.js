import React from 'react';
import config from '../../../config';
import './Music.css';
import RecentTrackTile from './RecentTrackTile/RecentTrackTile';
import ViewportPaginationView from '../ViewportPaginationView/ViewportPaginationView';
import '../ViewportPaginationView/ViewportPaginationView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

class Music extends ViewportPaginationView {
    onComponentDidMount() {
        var that = this;
        fetch(`${config.apiDomain}/lastfm/getMyRecentTrack`).then(function(response) {
            return response.json();
        }).then(function(json) {
            that.setState({"recentTrack": json});
        });
    }

    hashes = ["one", "two"]

    render() {
        return (
            <div className="viewport-pagination-view music" onWheel={this.handleScroll.bind(this)} onTouchMove={this.handleTouchMove.bind(this)} onTouchStart={this.registerTouchStart.bind(this)}>
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
}

export default Music;
