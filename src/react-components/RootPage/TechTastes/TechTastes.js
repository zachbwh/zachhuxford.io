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
            url: "https://www.archlinux.org/",
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
            url: "https://www.microsoft.com/windows/",
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
            url: "https://ubuntu.com/",
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
            url: "https://www.android.com/",
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
            url: "https://www.raspberrypi.org/downloads/raspbian/",
            usageIcons: [
                {
                    icon: faServer,
                    description: "OS for Raspberry Pi Server Use"
                }
            ]
        },
        {
            osName: "EC2 AMI",
            url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html",
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
                    url: "https://travis-ci.com/",
                    toolIconFilePath: "/assets/tech-tastes/travis-ci.png",
                    positionAdjustment: {
                        right: "3.25%"
                    }
                },
                {
                    name: "Team City",
                    url: "https://www.jetbrains.com/teamcity/"
                }
            ]
        },
        {
            title: "Version Control",
            toolIcons: [
                {
                    name: "Github",
                    url: "https://github.com/"
                },
                {
                    name: "Bitbucket",
                    url: "https://bitbucket.org/"
                }
            ]
        }
    ]
    

    render() {
        var operatingSystemCarouselTiles = this.operatingSystemsList.map(operatingSystem => (
            <OperatingSystemCarouselTile osName={operatingSystem.osName} usageIcons={operatingSystem.usageIcons} url={operatingSystem.url} osIconClassName={operatingSystem.osName.toLowerCase().replace(/ /g, "-")} osIconFilePath={"/assets/tech-tastes/" + (operatingSystem.osName.toLowerCase().replace(/ /g, "-")) + ".svg"} osIconAltText={operatingSystem.osName + " Logo"} />
        ))
        this.toolList.forEach(tool => {
            tool.toolIcons = tool.toolIcons.map(toolIcon => {
                return {
                    toolIconClassName: toolIcon.name.toLowerCase().replace(/ /g, "-"),
                    toolIconFilePath: toolIcon.toolIconFilePath ? toolIcon.toolIconFilePath : "/assets/tech-tastes/" + toolIcon.name.toLowerCase().replace(/ /g, "-") + ".svg",
                    toolIconAltText: toolIcon.name + " Logo",
                    positionAdjustment: toolIcon.positionAdjustment,
                    name: toolIcon.name,
                    url: toolIcon.url,
                }
            });
        });
        var toolCarouselTiles = this.toolList.map(tool => (
            <ToolCarouselTile title={tool.title} toolIcons={tool.toolIcons} />
        ))
        return (
            <div className="viewport-pagination-view tech-tastes">
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
