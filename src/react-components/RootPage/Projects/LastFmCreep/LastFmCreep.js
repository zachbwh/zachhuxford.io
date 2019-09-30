import React, { Component } from 'react';
import './LastFmCreep.css';
import config from '../../../../config';
import RecentTrackTile from '../../Music/RecentTrackTile/RecentTrackTile';
import io from 'socket.io-client';


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
            json = that.sortResultsAndAssignIndices(json);
            that.setState({ friends: json });
        });

        this.socket = io(`${config.apiDomain}/lastfmcreep`);

        this.socket.on("recent-track-update", function(message) {
            console.log(message);
            var friendRecentTrack = JSON.parse(message);
            if (that.state.friends) {
                var changedIndex = that.state.friends.findIndex(function(stateFriendRecentTrack) {
                    return stateFriendRecentTrack.name === friendRecentTrack.name;
                });
                var newFriendsList = that.state.friends;

                newFriendsList[changedIndex] = friendRecentTrack;
                newFriendsList = that.sortResultsAndAssignIndices(newFriendsList, friendRecentTrack);
                that.setState({friends: newFriendsList});
            }
        })
        this.socket.on("connected", function(msg) {
            console.log(msg);
        })
    }

    componentWillUnmount() {
        this.socket.close();
    }

    sortResultsAndAssignIndices(friendsList, favourFirst) {
        friendsList = friendsList.sort(function(a, b) {
            if (a.recenttrack['@attr'] && a.recenttrack['@attr'].nowplaying && (!b.recenttrack['@attr'] || !b.recenttrack['@attr'].nowplaying)) {
                return -1;
            } else if ((!a.recenttrack['@attr']  || !a.recenttrack['@attr'].nowplaying) && b.recenttrack['@attr'] && b.recenttrack['@attr'].nowplaying) {
                return 1;
            } else if (a.recenttrack['@attr'] && a.recenttrack['@attr'].nowplaying && b.recenttrack['@attr'] && b.recenttrack['@attr'].nowplaying) {
                if (a === favourFirst) {
                    return -1;
                } else if (b === favourFirst) {
                    return 1;
                }
                return 0;
            }
            return a.recenttrack.date.uts < b.recenttrack.date.uts ? 1 : a.recenttrack.date.uts > b.recenttrack.date.uts ? -1 : 0;
        });
        return friendsList;
    }

    render() {
        var friendsRecentTracks
        if (this.state.friends) {
            friendsRecentTracks = this.state.friends.map((friendRecentTrack, index) => (
            <div className="recent-track-tile-container" key={friendRecentTrack.name} style={{"transform": "translate(-50%," + index * 252.8 + "px)", "zIndex": 100 - index}}>
                <RecentTrackTile
                    name={friendRecentTrack.realname ? friendRecentTrack.realname : friendRecentTrack.name}
                    displayPhoto={friendRecentTrack.image["#text"]}
                    recentTrack={friendRecentTrack.recenttrack}>
                </RecentTrackTile>
            </div>
            )
            );
        } else {
            friendsRecentTracks = <div></div>
        }


        return (
            <div className="lastfm-creep">
                {friendsRecentTracks}
            </div>
        );
    }
}

export default LastFmCreep;
