import React from 'react';
import { NavLink } from "react-router-dom";
import './Projects.css';
import ViewportPaginationView from '../ViewportPaginationView/ViewportPaginationView';
import '../ViewportPaginationView/ViewportPaginationView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import IndexIndicator from '../ViewportPaginationView/IndexIndicator/IndexIndicator';

class Projects extends ViewportPaginationView {
    hashes = ["", "tatai", "util", "lastfm"]

    render() {
        return (
            <div className="viewport-pagination-view projects" onWheel={this.handleScroll.bind(this)} onTouchMove={this.handleTouchMove.bind(this)} onTouchStart={this.registerTouchStart.bind(this)}>
                <IndexIndicator hashes={this.hashes} activeIndex={this.state.currentIndex} setIndex={this.setIndex.bind(this)}></IndexIndicator>
                <div style={{transform: "translateY(-" + this.state.currentIndex + "00vh)"}}>
                    <div className="viewport">
                        <div>
                            <h1>My Projects<span className="highlight-full-stop">.</span></h1>
                            {/* <p>
                                The character of my personal projects tends to be self driven, centered around web development and well, personal in nature.
                                Each project I do I try to extend my set of skills and improve the ones that I have. Most recently I have been trying to
                                    get a good grasp of Client/Server Software Architecture, JavaScript Frameworks, and Visual Design.<br /><br />
                                I'd say that currently the languages I am the strongest with would probably be JavaScript, followed by C# and Java.<br /><br />
                                I want my next challenge to be related to an open source or monetizeable product BUT fundamentally something that other
                                    people will use because it is both useful and well marketed.<br /><br />
                                In other words I'm sick of doing seemingly pointless personal and uni projects (but please have a look at them).
                            </p> */}
                            <div className="scroll-down">
                                <p>SCROLL DOWN</p>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                        </div>
                    </div>
    
                    <div className="viewport">
                        <div>
                            <h1>Tatai</h1>
                            {/* <p>
                                Tatai is an award winning, open source Te Reo Maori number pronunciation aid targeted both at people
                                who want to learn Maori for the first time and for people who simply want to improve. Tatai runs on
                                    Linux and Windows and any other operating system that supports Java 8, JavaFX 8 and the voice recognition software HTK.<br /><br />
                                The "brains" behind Tatai's voice recognition is a combination of HTK (Hidden Markov Toolkit) and the
                                    Te Reo Maori dictionary files provided by Dr Catherine Watson from The University of Auckland.<br /><br />
                                This application was developed for the course SOFTENG 206 at The University of Auckland as a part of
                                the major project in the paper. As a consequence, an online search will show many projects of the same name,
                                    however our project won both First Place and the People's Choice awards.<br /><br />
                                COMPLETE
                            </p> */}
                        </div>
                    </div>
    
                    <div className="viewport">
                        <div>
                            <h1>Utilities</h1>
                            <p>
                                Some small web utilities I've made for my personal use.
    
                                <NavLink to="/projects/startpage">/startpage</NavLink>
                                
                                <NavLink to="/projects/lastfmcreep">/lastfmcreep</NavLink>
    
                            </p>
                        </div>
                    </div>
    
                    <div className="viewport">
                        <div>
                            <h1>last.fm creeper</h1>
                            {/* <p>
                                An emulation of the spotify "creeper" or socializer bar but for last.fm which shows what your
                                    friends are listening to in real time or what they listened to most recently.<br /><br />
                                Goals for the future are to implement animations to change the order of users as what they are
                                    listening to changes in a similar fashion to the spotify creeper bar.<br /><br />
                                WIP
                            </p> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Projects;
