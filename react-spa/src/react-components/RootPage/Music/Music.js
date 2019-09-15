import React, { Component } from 'react';
import './Music.css';

class Music extends Component {
  render() {
    return (
        <div className="music">
            <h1>My Projects<span className="highlight-full-stop">.</span></h1>
            <p>
                I am a Software Engineering student at the University of Auckland working part-time as a software developer.<br /><br />
                I spend my spare time working on projects, listening to music and cooking.<br />
                I'm particularly interested in full stack web development, <em>graphic design</em> and Linux<br /><br />
                I care about my work having a positive impact on other people which is why it is important to me that my work has a strong <em>human</em> component,
                whether it is by creating something useful to people or something beautiful.<br /><br />
            </p>
        </div>
    );
  }
}

export default Music;
