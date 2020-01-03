import React, { Component } from 'react';
import './OperatingSystemCarouselTile.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class OperatingSystemCarouselTile extends Component {
    render() {
        var usageIcons;
        if (this.props.usageIcons.length > 0) {
            usageIcons = this.props.usageIcons.map((usageIcon, index) => (
                <p key={index} ><FontAwesomeIcon icon={usageIcon.icon} /> {usageIcon.description}</p>
            ));
        } else {
            usageIcons = <p></p>
        }
        return (
            <div className="operating-system-carousel-tile">
                <div className="os-name">
                    <img className={this.props.osIconClassName + " tech-svg"} src={this.props.osIconFilePath} alt={this.props.osIconAltText}></img>
                    <a href={this.props.url} target="_blank" rel="noopener noreferrer" >{this.props.osName}</a>
                </div>
                <div className="os-usage">
                    {usageIcons}
                </div>
            </div>
        );
    }
}

export default OperatingSystemCarouselTile;
