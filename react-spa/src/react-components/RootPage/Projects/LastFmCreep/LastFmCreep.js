import React, { Component } from 'react';
import './LastFmCreep.css';
import config from '../../../../config';
import RecentTrackTile from '../../Music/RecentTrackTile/RecentTrackTile';


class LastFmCreep extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var that = this;
        fetch(`${config.apiDomain}/lastfm/getFriends`).then(function (response) {
            return response.json();
        }).then(function (json) {
            that.setState({ friends: json });
        });
    }

    sortResultsAndAssignIndices() {
        if (this.state.friends) {

        }
    }

    render() {
        var friendsRecentTracks
        if (this.state.friends) {
            friendsRecentTracks = this.state.friends.map((friendRecentTrack) =>
                <RecentTrackTile style={{"transform": "translateY(-" + friendRecentTrack.index + "00px)"}} name={friendRecentTrack.name} displayPhoto={friendRecentTrack.image["#text"]} recentTrack={friendRecentTrack.recenttrack}></RecentTrackTile>
            );
        } else {
            friendsRecentTracks = <p>placeholder</p>
        }


        return (
            <div className="lastfm-creep">
                {friendsRecentTracks}
            </div>
        );
    }
}

export default LastFmCreep;
