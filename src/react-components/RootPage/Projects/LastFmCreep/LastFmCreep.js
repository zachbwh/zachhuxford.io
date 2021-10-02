import React, { Component } from 'react';
import './LastFmCreep.css';
import RecentTrackTile from '../../Music/RecentTrackTile/RecentTrackTile';
import io from 'socket.io-client';


class LastFmCreep extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var that = this;

        this.socket = io(`${process.env.REACT_APP_WEBSOCKET_API_DOMAIN}/lastfmcreep`);

        this.socket.on("load-friend-recent-tracks", function(message) {
            console.log("loaded fresh friends list");
            var friends = JSON.parse(message);
            friends = that.sortResultsAndAssignIndices(friends);
            that.setState({ friends: friends });
        });

        this.socket.on("recent-track-update", function(message) {
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
        });

        this.socket.on("connected", function(msg) {
            console.log(msg);
        });
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
        friendsList = friendsList.map(function(friend, index) {
            friend.index = index;
            return  friend;
        });
        return friendsList;
    }

    render() {
        var friendsRecentTracks;
        if (this.state.friends) {
            friendsRecentTracks = this.state.friends.sort((a, b) => { return a.name > b.name ? 1 : b.name > a.name ? -1 : 0; }).map((friendRecentTrack, index) => (
            <div className="recent-track-tile-container" key={friendRecentTrack.name} style={{top: (friendRecentTrack.index - index) * 252.8 + "px", zIndex: 100 - friendRecentTrack.index}}>
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
                <div className="list-container">
                    {friendsRecentTracks}
                </div>
            </div>
        );
    }
}

export default LastFmCreep;
