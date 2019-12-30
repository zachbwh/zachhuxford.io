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
                    name: toolIcon.name
                }
            }),
        };
    }

    render() {
        var toolIcons;
        if (this.state.toolIcons.length > 0) {
            toolIcons = this.state.toolIcons.map((toolIcon, index) => (
                <div className="tool" key={index} style={{width: (100 / this.state.toolIcons.length) + "%"}} >
                    <img className={toolIcon.toolIconClassName + " tech-svg"} src={toolIcon.toolIconFilePath} alt={toolIcon.toolIconAltText}></img>
                    <h3 className="tool-name">{toolIcon.name}</h3>
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
