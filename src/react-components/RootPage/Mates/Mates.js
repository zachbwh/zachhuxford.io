import React, { Component } from 'react';
import './Mates.css';

import Twemoji from 'react-twemoji';

class Mates extends Component {
  render() {
    return (
        <div className="mates">
            <h1>My Mates<span className="highlight-full-stop">.</span></h1>
            <p>
                This page is a list of my friends who also have their own websites.
                (Please offer me work first though <Twemoji options={{ className: 'twemoji' }} noWrapper={ true }><span>💕</span></Twemoji>)<br /><br />
                
            </p>
        </div>
    );
  }
}

export default Mates;