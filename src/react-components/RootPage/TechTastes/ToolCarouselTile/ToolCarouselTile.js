import React, { Component } from 'react';
import './ToolCarouselTile.css';

class ToolCarouselTile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            toolIcons: props.toolIcons.map(toolIcon => {
                return {
                    toolIconClassName: toolIcon.name.toLowerCase().replace(/ /g, "-"),
                    toolIconFilePath: toolIcon.toolIconFilePath ? toolIcon.toolIconFilePath : "/assets/tech-tastes/" + toolIcon.name.toLowerCase().replace(/ /g, "-") + ".svg",
                    toolIconAltText: toolIcon.name + " Logo",
                    positionAdjustment: toolIcon.positionAdjustment,
                    name: toolIcon.name,
                    url: toolIcon.url,
                }
            }),
        };
    }

    render() {
        var toolIcons;
        if (this.state.toolIcons.length > 0) {
            toolIcons = this.state.toolIcons.map((toolIcon, index) => (
                <div className="tool" key={index} style={{width: (100 / this.state.toolIcons.length) + "%"}} >
                    <a target="_blank" rel="noopener noreferrer" href={toolIcon.url}><img className={toolIcon.toolIconClassName + " tech-svg"} src={toolIcon.toolIconFilePath} alt={toolIcon.toolIconAltText} style={toolIcon.positionAdjustment && toolIcon.positionAdjustment.right ? {right: toolIcon.positionAdjustment.right} : {}}></img></a>
                    <p><a href={toolIcon.url} className="tool-name" target="_blank" rel="noopener noreferrer">{toolIcon.name}</a></p>
                </div>
            ));
        } else {
            toolIcons = <div></div>
        }
        return (
            <div className="tool-carousel-tile">
                <h2>{this.state.title}</h2>
                <div className="tool-icons">
                    {toolIcons}
                </div>
            </div>
        );
    }
}

export default ToolCarouselTile;
