import React from 'react';
import './TechTastes.css';

import ViewportPaginationView from '../ViewportPaginationView/ViewportPaginationView';
import '../ViewportPaginationView/ViewportPaginationView.css';
import Carousel from '../../Carousel/Carousel';
import OperatingSystemCarouselTile from './OperatingSystemCarouselTile/OperatingSystemCarouselTile';
import ToolCarouselTile from './ToolCarouselTile/ToolCarouselTile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faHome, faBriefcase, faServer, faMobileAlt, faLaptopCode, faGamepad } from '@fortawesome/free-solid-svg-icons';


import IndexIndicator from '../ViewportPaginationView/IndexIndicator/IndexIndicator';

class TechTastes extends ViewportPaginationView {

    hashes = ["", "operating-systems", "programming-languages", "dev-ops"]

    operatingSystemsList = [
        {
            osName: "Arch Linux",
            usageIcons: [
                {
                    icon: faHome,
                    description: "OS for Personal Use"
                },
                {
                    icon: faGamepad,
                    description: "OS used for Gaming"
                },
                {
                    icon: faLaptopCode,
                    description: "OS used on my Laptop"
                }
            ]
        },
        {
            osName: "Windows",
            usageIcons: [
                {
                    icon: faBriefcase,
                    description: "OS for Work Use"
                },
                {
                    icon: faGamepad,
                    description: "OS used for Gaming"
                },
                {
                    icon: faLaptopCode,
                    description: "OS used on my Laptop"
                }
            ]
        },
        {
            osName: "Ubuntu",
            usageIcons: [
                {
                    icon: faServer,
                    description: "OS for Server Use"
                },
                {
                    icon: faLaptopCode,
                    description: "OS used on my Laptop"
                }
            ]
        },
        {
            osName: "Android",
            usageIcons: [
                {
                    icon: faHome,
                    description: "OS for Personal Use"
                },
                {
                    icon: faMobileAlt,
                    description: "OS used on my Phone"
                }
            ]
        },
        {
            osName: "Raspbian",
            usageIcons: [
                {
                    icon: faServer,
                    description: "OS for Raspberry Pi Server Use"
                }
            ]
        },
        {
            osName: "EC2 AMI",
            usageIcons: [
                {
                    icon: faServer,
                    description: "OS for Server Use"
                }
            ]
        }
    ];

    toolList = [
        {
            title: "CI/CD Tools",
            toolIcons: [
                {
                    name: "Travis CI",
                    toolIconFilePath: "/assets/tech-tastes/travis-ci.png"
                },
                {
                    name: "Team City"
                }
            ]
        },
        {
            title: "Version Control",
            toolIcons: [
                {
                    name: "Github"
                },
                {
                    name: "Bitbucket"
                }
            ]
        }
    ]


    render() {
        var operatingSystemCarouselTiles = this.operatingSystemsList.map(operatingSystem => (
            <OperatingSystemCarouselTile osName={operatingSystem.osName} usageIcons={operatingSystem.usageIcons} />
        ))
        var toolCarouselTiles = this.toolList.map(tool => (
            <ToolCarouselTile title={tool.title} toolIcons={tool.toolIcons} />
        ))
        return (
            <div className="viewport-pagination-view tech-tastes" onWheel={this.handleScroll.bind(this)} onTouchMove={this.handleTouchMove.bind(this)} onTouchStart={this.registerTouchStart.bind(this)}>
                <IndexIndicator hashes={this.hashes} activeIndex={this.state.currentIndex} setIndex={this.setIndex.bind(this)}></IndexIndicator>
                <div className="viewport-container" style={{transform: "translateY(-" + this.state.currentIndex * this.state.windowHeight + "px)"}}>
                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div>
                            <h1>My Tech Tastes<span className="highlight-full-stop">.</span></h1>
                            <div className="scroll-down">
                                <p>SCROLL DOWN</p>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                        </div>
                    </div>
    
                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div>
                            <h1>OSes</h1>
                            <Carousel carouselItems={operatingSystemCarouselTiles} />
                        </div>
                    </div>

                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div>
                            <h1>Programming Languages</h1>
                            <div className="os-grid"></div>
                        </div>
                    </div>

                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div>
                            <h1>Dev Ops</h1>
                            <Carousel carouselItems={toolCarouselTiles} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TechTastes;
