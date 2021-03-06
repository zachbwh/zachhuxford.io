import React, { Component } from 'react';
import './Profiles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faSnapchat, faTelegram, faTwitter, faGithub, faLinkedin, faLastfm, faSpotify } from '@fortawesome/free-brands-svg-icons';

class Profiles extends Component {
    render() {
        return (
            <div className="profiles">
                <div className="body">
                    <div>
                        <h1>Find Me Online<span className="highlight-full-stop">.</span></h1>
                        <div className="links d1">
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/zachbwh"><FontAwesomeIcon icon={faGithub} /></a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/zachbwh"><FontAwesomeIcon icon={faFacebook} /></a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.snapchat.com/add/zachbwh"><FontAwesomeIcon icon={faSnapchat} /></a>
                        </div>
                        <div className="links d2">
                            <a target="_blank" rel="noopener noreferrer" href="https://t.me/zachbwh"><FontAwesomeIcon icon={faTelegram} /></a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/zachbwh/"><FontAwesomeIcon icon={faInstagram} /></a>
                            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/zachbwh"><FontAwesomeIcon icon={faTwitter} /></a>
                        </div>
                        <div className="links d3">
                            <a target="_blank" rel="noopener noreferrer" href="https://www.last.fm/user/zachbwh"><FontAwesomeIcon icon={faLastfm} /></a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/zachbwh/"><FontAwesomeIcon icon={faLinkedin} /></a>
                            <a target="_blank" rel="noopener noreferrer" href="https://open.spotify.com/user/zachbwh"><FontAwesomeIcon icon={faSpotify} /></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profiles;
