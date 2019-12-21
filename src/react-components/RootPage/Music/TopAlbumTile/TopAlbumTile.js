import React, { Component } from 'react';
import './TopAlbumTile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';

class TopAlbumTile extends Component {
    clickHandler() {
        this.props.clickHandler(this.props.topAlbum);
    }

    render() {
            var albumArt = <img className="album-art" style={{height: this.props.albumArtSize, width:this.props.albumArtSize }} alt={this.props.name + "album art"} src={this.props.albumArt} />
            
            return(
                <div className="top-album" onClick={this.clickHandler.bind(this)} style={{height: this.props.albumArtSize, width:this.props.albumArtSize }}>
                    <div className="filter" style={{height: this.props.albumArtSize, width:this.props.albumArtSize }}></div>
                    {albumArt}
                </div>
            );
    }
}

export default TopAlbumTile;
