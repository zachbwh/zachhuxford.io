import React, { Component } from 'react';
import './HomePage.css';

class HomePage extends Component {
    render() {
        return (
            <div className="homepage">
                <div className="body">
                    <div>
                        <p className="d1">It's me!</p>
                        <h1 className="d2">Zach Huxford<span className="highlight-full-stop">.</span></h1>
                        <div className="display-photo d2" >
                            <img alt="Headshot of Zach Huxford" src="/profile_photo.png" />
                        </div>
                    </div>
                    <p className="d3">
                        I'm a Software Developer from New Zealand.<br /><br />
                        I like to spend my spare time browsing wikipedia, reading, listening to podcasts and music, and cooking.<br />
                        I'm particularly interested in full stack web development, <em>graphic design</em> and Linux.<br /><br />
                        I care about my work having a positive impact on other people, which is why it is important to me that my work has a strong <em>human</em> component,
                        whether it is by creating something useful or something beautiful.<br /><br />
                    </p>
                    <div>
                        <p className="contact-me d5"><a className="" onClick={this.handleContactClick} href="mailto:me@zachhuxford.io">Contact Me</a></p>
                    </div>
                </div>
            </div>
        );
    }

    handleContactClick(e) {
        e.preventDefault();
        window.open('mailto:me@zachhuxford.io', 'Mail');
    }
}

export default HomePage;
