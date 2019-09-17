import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import './Projects.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const scrollCooldownMilliSeconds = 500;
const maxIndexValue = 3;
const hashes = ["", "tatai", "util", "lastfm"]

const handleScroll = function(event) {
    event.preventDefault();

    var currentDate = new Date(),
        lastScrollTime = this.state.lastScrollTime;

    if (typeof lastScrollTime !== "undefined" && lastScrollTime != null && new Date(lastScrollTime.getTime() + scrollCooldownMilliSeconds) < currentDate) {
        
        if (event.deltaY < 0) {
            console.log("scroll up");
            this.scrollToPrevRef();

        } else if (event.deltaY > 0) {
            console.log("scroll down");
            this.scrollToNextRef();
        }

        this.setState({
            lastScrollTime: currentDate
        });
    }
}

const handleTouchMove = function(event) {
    event.preventDefault();

    var currentDate = new Date(),
        lastScrollTime = this.state.lastScrollTime,
        currentPageY = event.targetTouches[0].pageY;;

    if (typeof lastScrollTime !== "undefined" && lastScrollTime != null && new Date(lastScrollTime.getTime() + scrollCooldownMilliSeconds) < currentDate) {
        
        if (this.touchStartPos < currentPageY) {
            console.log("scroll up");
            this.scrollToPrevRef();

        } else if (this.touchStartPos > currentPageY) {
            console.log("scroll down");
            this.scrollToNextRef();
        }

        this.setState({
            lastScrollTime: currentDate
        });
    }
}

const registerTouchStart = function(event) {
    event.preventDefault();
    this.touchStartPos = event.targetTouches[0].pageY;
}

class Projects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 0,
            lastScrollTime: new Date(),
        }
    }

    componentDidMount() {
        var hash = window.location.hash.slice(1);
        if (hash) {
            console.log(hash);
            var currentIndex = hashes.indexOf(hash);
            console.log(currentIndex);
            if (currentIndex < 0) {
                this.setState({currentIndex: 0});
                window.location.hash = ""
            } else {
                this.setState({currentIndex: currentIndex});
            }
        } else {
            this.setState({currentIndex: 0});
            window.location.hash = "";
        }
    }

    render() {
        return (
            <div className="projects" onWheel={handleScroll.bind(this)} onTouchMove={handleTouchMove.bind(this)} onTouchStart={registerTouchStart.bind(this)}>
                <div style={{transform: "translateY(-" + this.state.currentIndex + "00vh)"}}>
                    <div className="body">
                        <div>
                            <h1>My Projects<span className="highlight-full-stop">.</span></h1>
                            <p>
                                The character of my personal projects tends to be self driven, centered around web development and well, personal in nature.
                                Each project I do I try to extend my set of skills and improve the ones that I have. Most recently I have been trying to
                                    get a good grasp of Client/Server Software Architecture, JavaScript Frameworks, and Visual Design.<br /><br />
                                I'd say that currently the languages I am the strongest with would probably be JavaScript, followed by C# and Java.<br /><br />
                                I want my next challenge to be related to an open source or monetizeable product BUT fundamentally something that other
                                    people will use because it is both useful and well marketed.<br /><br />
                                In other words I'm sick of doing seemingly pointless personal and uni projects (but please have a look at them).
                                </p>
                            <div className="scroll-down">
                                <p>SCROLL DOWN</p>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                        </div>
                    </div>
    
                    <div className="project">
                        <div>
                            <h1>Tatai</h1>
                            <p>
                                Tatai is an award winning, open source Te Reo Maori number pronunciation aid targeted both at people
                                who want to learn Maori for the first time and for people who simply want to improve. Tatai runs on
                                    Linux and Windows and any other operating system that supports Java 8, JavaFX 8 and the voice recognition software HTK.<br /><br />
                                The "brains" behind Tatai's voice recognition is a combination of HTK (Hidden Markov Toolkit) and the
                                    Te Reo Maori dictionary files provided by Dr Catherine Watson from The University of Auckland.<br /><br />
                                This application was developed for the course SOFTENG 206 at The University of Auckland as a part of
                                the major project in the paper. As a consequence, an online search will show many projects of the same name,
                                    however our project won both First Place and the People's Choice awards.<br /><br />
                                COMPLETE
                                </p>
                        </div>
                    </div>
    
                    <div className="project">
                        <div>
                            <h1>Utilities</h1>
                            <p>
                                Some small web utilities I've made for my personal use.
    
                                <NavLink to="/projects/startpage">/startpage</NavLink>
                                
                                <NavLink to="/projects/lastfmcreep">/lastfmcreep</NavLink>
    
                            </p>
                        </div>
                    </div>
    
                    <div className="project">
                        <div>
                            <h1>last.fm creeper</h1>
                            <p>
                                An emulation of the spotify "creeper" or socializer bar but for last.fm which shows what your
                                    friends are listening to in real time or what they listened to most recently.<br /><br />
                                Goals for the future are to implement animations to change the order of users as what they are
                                    listening to changes in a similar fashion to the spotify creeper bar.<br /><br />
                                WIP
                                </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    scrollToNextRef = () => {
        var nextRefIndex,
            currentIndex = this.state.currentIndex,

        nextRefIndex = currentIndex < maxIndexValue ? currentIndex + 1 : maxIndexValue;
        window.location.hash = hashes[nextRefIndex];

        this.setState({currentIndex: nextRefIndex});
    }

    scrollToPrevRef = () => {
        var nextRefIndex,
            currentIndex = this.state.currentIndex,

        nextRefIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        window.location.hash = hashes[nextRefIndex];

        this.setState({currentIndex: nextRefIndex});
    }
}

export default Projects;
