import React, { Component } from 'react';
import './ToolCarouselTile.css';

class ToolCarouselTile extends Component {
    render() {
        var toolIcons;
        if (this.props.toolIcons.length > 0) {
            toolIcons = this.props.toolIcons.map((toolIcon, index) => (
                <div className="tool" key={index} style={{width: (100 / this.props.toolIcons.length) + "%"}} >
                    <a target="_blank" rel="noopener noreferrer" href={toolIcon.url}><img className={toolIcon.toolIconClassName + " tech-svg"} src={toolIcon.toolIconFilePath} alt={toolIcon.toolIconAltText} style={toolIcon.positionAdjustment && toolIcon.positionAdjustment.right ? {right: toolIcon.positionAdjustment.right} : {}}></img></a>
                    <p><a href={toolIcon.url} className="tool-name" target="_blank" rel="noopener noreferrer">{toolIcon.name}</a></p>
                </div>
            ));
        } else {
            toolIcons = <div></div>
        }
        return (
            <div className="tool-carousel-tile">
                <h2>{this.props.title}</h2>
                <div className="tool-icons">
                    {toolIcons}
                </div>
            </div>
        );
    }
}

export default ToolCarouselTile;
