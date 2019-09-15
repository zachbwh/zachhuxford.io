import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './ViewportContentNavigable.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';


class ViewportContentNavigable extends Component {
    constructor(props) {
        super(props);
        this.scrollToPrevRef = props.scrollToPrevRef;
        this.scrollToNextRef = props.scrollToNextRef;
    }
    render() {
        if (this.scrollToPrevRef)
        var prevButton = (
        <div className="prevButton">
            <FontAwesomeIcon icon={ faChevronUp } onClick={ this.scrollToPrevRef } />
        </div>
        );

        var nextButton = (
        <div className="nextButton">
            <FontAwesomeIcon icon={ faChevronDown } onClick={ this.scrollToNextRef }/>
        </div>
        );

        return (
            <div className="body">
                <div>
                    { prevButton }
                    { this.props.children }
                    { nextButton }
                </div>
            </div>
        );
    }
}

export default ViewportContentNavigable;
