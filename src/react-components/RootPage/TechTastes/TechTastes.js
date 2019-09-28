import React, { Component } from 'react';
import './TechTastes.css';
import IconAmazonwebservices from 'react-devicon/amazonwebservices/original-wordmark'

class TechTastes extends Component {
  render() {
    return (
        <div className="tech-tastes">
            <div className="body">
                <div>
                    <h1>My Tech Tastes<span className="highlight-full-stop">.</span></h1>
                    <p>
                        Click to find out more
                    </p>
                    <div>
                        <IconAmazonwebservices width={100} height={100}/>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default TechTastes;
