import React, { Component } from 'react';
import './ThemeButton.css';

class ThemeButton extends Component {
    handleClick() {
        if (this.props.updateColorClass && typeof this.props.updateColorClass === "function") {
            this.props.updateColorClass(this.props.themeName);
        }
    }

    render() {
        return (
            <div className="theme-button" style={{backgroundColor: this.props.secondaryColor}} onClick={this.handleClick.bind(this)}>
                <div className="primary-circle" style={{backgroundColor: this.props.primaryColor}}></div>
                <div className="accent-shape-1" style={{backgroundColor: this.props.accentColor}}></div>
                <div className="accent-shape-2" style={{backgroundColor: this.props.accentColor}}></div>
            </div>
        );
    }
}

export default ThemeButton;
