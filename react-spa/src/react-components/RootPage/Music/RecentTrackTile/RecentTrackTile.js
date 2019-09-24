import React, { Component } from 'react';
import './RecentTrackTile.css';
import Moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';

class RecentTrackTile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.recentTrack) {
            var displayPhoto
            if (this.props.displayPhoto) {
                displayPhoto = <img className="display-photo" src={this.props.displayPhoto} />
            } else {
                displayPhoto = <div className="display-photo fa"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></div>
            }

            return(
                <div className="recent-track">
                    <div className="user-info" >
                        {displayPhoto}
                        <div className="text-block">
                            <p className="string"><b>{this.props.name}</b></p>
                            <p className="string">{this.props.recentTrack["@attr"] && this.props.recentTrack["@attr"].nowplaying === "true" ? "is now listening to:" : Moment(new Date(this.props.recentTrack.date.uts * 1000)).fromNow()}</p>
                        </div>
                    </div>
                    <div className="text-block">
                        <p className="string">{this.props.recentTrack.name}</p>
                        <p className="string">{this.props.recentTrack.artist["#text"]}</p>
                        <p className="string">{this.props.recentTrack.album["#text"]}</p>
                    </div>
                </div>
            );
        } else {
            return(
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
            );
        }
    }
}

export default RecentTrackTile;
