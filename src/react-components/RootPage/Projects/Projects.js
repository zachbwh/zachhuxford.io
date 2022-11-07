import React from 'react';
import './Projects.css';
import ViewportPaginationView from '../ViewportPaginationView/ViewportPaginationView';
import '../ViewportPaginationView/ViewportPaginationView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import IndexIndicator from '../ViewportPaginationView/IndexIndicator/IndexIndicator';

class Projects extends ViewportPaginationView {
    hashes = ["", "tatai", "blog"]

    render() {
        return (
            <div className="viewport-pagination-view projects">
                <IndexIndicator hashes={this.hashes} activeIndex={this.state.currentIndex} setIndex={this.setIndex.bind(this)}></IndexIndicator>
                <div className="viewport-container" style={{transform: "translateY(-" + this.state.currentIndex * this.state.windowHeight + "px)"}}>
                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div>
                            <h1>My Projects<span className="highlight-full-stop">.</span></h1>
                            <div className="scroll-down">
                                <p>SCROLL DOWN</p>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                        </div>
                    </div>
    
                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div className="project">
                            <h1>Tatai</h1>
                            <p>
                                A Te Reo Māori language pronunciation educational game written in Java.
                            </p>
                            <h3 className="project-link"><a href="https://github.com/encryptededdy/206_Tatai" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /> Repo Link</a></h3>
                        </div>
                    </div>
    
                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div className="project">
                            <h1>Personal Blog</h1>
                            <p>
                                My built from scratch personal blog site.
                            </p>
                            <br />
                            <h3 className="project-link"><a href="https://github.com/zachbwh/blog.zachhuxford.io" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /> Repo Link</a></h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Projects;
