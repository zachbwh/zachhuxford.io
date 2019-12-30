import React, { Component } from 'react';
import './OperatingSystemCarouselTile.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class OperatingSystemCarouselTile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            osName: props.osName,
            osIconClassName: props.osName.toLowerCase().replace(/ /g, "-"),
            osIconFilePath: "/assets/tech-tastes/" + (props.osName.toLowerCase().replace(/ /g, "-")) + ".svg",
            osIconAltText: props.osName + " Logo",
            url: props.url,
            usageIcons: props.usageIcons
        };
    }

    render() {
        var usageIcons;
        if (this.state.usageIcons.length > 0) {
            usageIcons = this.state.usageIcons.map((usageIcon, index) => (
                <p key={index} ><FontAwesomeIcon icon={usageIcon.icon} /> {usageIcon.description}</p>
            ));
        } else {
            usageIcons = <p></p>
        }
        return (
            <div className="operating-system-carousel-tile">
                <div className="os-name">
                    <img className={this.state.osIconClassName + " tech-svg"} src={this.state.osIconFilePath} alt={this.state.osIconAltText}></img>
                    <a href={this.state.url} target="_blank" rel="noopener noreferrer" >{this.state.osName}</a>
                </div>
                <div className="os-usage">
                    {usageIcons}
                </div>
            </div>
        );
    }
}

export default OperatingSystemCarouselTile;
