import React, { Component } from 'react';
import './TechTastes.css';

class TechTastes extends Component {
  render() {
    return (
        <div className="tech-tastes">
            <div className="body">
                <div>
                    <h1>My Tech Tastes<span className="highlight-full-stop">.</span></h1>
                    <p>
                        A graphical list of all the technologies I prefer to use and/or am familiar with.
                    </p>
                </div>
            </div>
        </div>
    );
  }
}

export default TechTastes;
