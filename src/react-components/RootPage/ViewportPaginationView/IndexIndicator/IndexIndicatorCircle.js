import React, { Component } from 'react';
import './IndexIndicatorCircle.css';

class IndexIndicatorCircle extends Component {
    handleClick() {
        if (this.props.setIndex && typeof this.props.setIndex === "function") {
            this.props.setIndex(this.props.index);
        }
    }

    render() {
        return (
            <div className={"index-indicator-circle " + (this.props.isActive === true ? "active" : "")} onClick={this.handleClick.bind(this)}>
            </div>
        );
    }
}

export default IndexIndicatorCircle;
