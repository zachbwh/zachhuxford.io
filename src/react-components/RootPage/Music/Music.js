import React from 'react';
import config from '../../../config';
import './Music.css';

import io from 'socket.io-client';
import RecentTrackTile from './RecentTrackTile/RecentTrackTile';
import TopAlbumTile from './TopAlbumTile/TopAlbumTile';
import ViewportPaginationView from '../ViewportPaginationView/ViewportPaginationView';
import '../ViewportPaginationView/ViewportPaginationView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import IndexIndicator from '../ViewportPaginationView/IndexIndicator/IndexIndicator';

class Music extends ViewportPaginationView {
    onComponentDidMount() {
        var that = this;
        this.socket = io(`${config.apiDomain}/lastfm`);

        this.socket.on("load-my-recent-track", function(message) {
            console.log("first push recent track");
            var recentTrack = JSON.parse(message);
            that.setState({ recentTrack: recentTrack });
        });

        this.socket.on("recent-track-update", function(message) {
            var newRecentTrack = JSON.parse(message);
            that.setState({recentTrack: newRecentTrack});
        })
        this.socket.on("connected", function(msg) {
            console.log(msg);
        })

        this.onHandleWindowResize();

        fetch(`${config.apiDomain}/topAlbums`).then(response => {
            response.json().then(responseJson => this.setState({topAlbums: responseJson}))
        })
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize.bind(this));

        this.socket.close();
    }

    onHandleWindowResize() {
        if (window.innerWidth < 601) {
            this.setState({
                height: window.innerHeight - 290,
                width: window.innerWidth - 80,
                albumArtSize: 116
            });
        } else {
            this.setState({
                height: window.innerHeight - 230,
                width: window.innerWidth - 80,
                albumArtSize: 174
            });
        }
    }

    handleAlbumArtClicked(topAlbum) {
        this.setState({
            albumName: topAlbum.name,
            artistName: topAlbum.artist,
            playcount: topAlbum.playcount
        })
    }

    hashes = ["recent-track", "top-albums"]

    render() {
        var albumArtSize = this.state.albumArtSize,
            width = Math.min(Math.floor(this.state.width / albumArtSize), 5),
            height = Math.floor(this.state.height / albumArtSize),
            topAlbumTiles;
        if (this.state.topAlbums) {
            topAlbumTiles = this.state.topAlbums.map((topAlbum, index) => {
                if (index < width * height) {
                    return <TopAlbumTile clickHandler={this.handleAlbumArtClicked.bind(this)} topAlbum={topAlbum} albumArt={topAlbum.image[0]["#text"]} albumArtSize={this.state.albumArtSize} key={`${topAlbum.artist} - ${topAlbum.name}`}></TopAlbumTile>
                } else {
                    return null;
                }
            }
            );
        } else {
            topAlbumTiles = <div></div>
        }

        var selectedAlbum;
        if (this.state.albumName) {
            selectedAlbum = (<p className="album-text">{this.state.albumName}
            <br/>
            {this.state.artistName}
            <br/>
            {this.state.playcount} plays in the past 3 months
            </p>)
        } else {
            selectedAlbum = <p className="album-text-placeholder">Tap an album to see my listening details from the past three months</p>
        }
        return (
            <div className="viewport-pagination-view music" onWheel={this.handleScroll.bind(this)} onTouchMove={this.handleTouchMove.bind(this)} onTouchStart={this.registerTouchStart.bind(this)}>
                <IndexIndicator hashes={this.hashes} activeIndex={this.state.currentIndex} setIndex={this.setIndex.bind(this)}></IndexIndicator>
                <div className="viewport-container" style={{transform: "translateY(-" + this.state.currentIndex * this.state.windowHeight + "px)"}}>
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
                            <div style={{marginLeft: "auto", marginRight: "auto", paddingTop: window.innerWidth < 601 ?  "120px" :  "60px" , paddingBottom: "60px"}}>
                                <div className="albums-pane" style={{width: (width * albumArtSize) + "px", height: (height * albumArtSize) + "px"}}>
                                    {topAlbumTiles}
                                </div>
                            </div>
                            <div>{selectedAlbum}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Music;
