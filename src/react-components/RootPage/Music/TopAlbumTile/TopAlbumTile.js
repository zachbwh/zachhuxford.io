import React, { Component } from 'react';
import './TopAlbumTile.css';

class TopAlbumTile extends Component {
    clickHandler() {
        this.props.clickHandler(this.props.topAlbum);
    }

    render() {
            var albumArt = <img className="album-art" style={{height: this.props.albumArtSize, width:this.props.albumArtSize }} alt={this.props.topAlbum.name + " album art"} src={this.props.albumArt} />
            
            return(
                <div className="top-album" onClick={this.clickHandler.bind(this)} style={{height: this.props.albumArtSize, width:this.props.albumArtSize }}>
                    <div className="filter" style={{height: this.props.albumArtSize, width:this.props.albumArtSize }}></div>
                    {albumArt}
                </div>
            );
    }
}

export default TopAlbumTile;
