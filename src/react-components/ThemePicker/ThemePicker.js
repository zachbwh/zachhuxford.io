import React, { Component } from 'react';
import './ThemePicker.css';

import ThemeButton from './ThemeButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class ThemePicker extends Component {
    render() {
        return (
            <div className="theme-picker">
                <div className="show-arrow"><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></div>
                {/* All Star Colors */}
                <ThemeButton primaryColor="#2E5DFF" secondaryColor="#F0F0F0" accentColor="#FF2E38" themeName="all-star" updateColorClass={this.props.updateColorClass} />
                {/* Purple Colors */}
                <ThemeButton primaryColor="#584C5C" secondaryColor="#FFFFFF" accentColor="#0D7D55" themeName="purple" updateColorClass={this.props.updateColorClass} />
                {/* Yellow Colors */}
                <ThemeButton primaryColor="#FFFF50" secondaryColor="#222222" accentColor="#616BFF" themeName="yellow" updateColorClass={this.props.updateColorClass} />
            </div>
        );
    }
}

export default ThemePicker;
