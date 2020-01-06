import React from 'react';
import './Rice.css';

import ViewportPaginationView from '../ViewportPaginationView/ViewportPaginationView';
import '../ViewportPaginationView/ViewportPaginationView.css';
import Carousel from '../../Carousel/Carousel';
import FocusableImageCarouselTile from '../../Carousel/FocusableImageCarouselTile/FocusableImageCarouselTile';
import SimpleTextCarouselTile from '../../Carousel/SimpleTextCarouselTile/SimpleTextCarouselTile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


import IndexIndicator from '../ViewportPaginationView/IndexIndicator/IndexIndicator';

class Rice extends ViewportPaginationView {

    hashes = ["", "current-rice", "android-homescreen", "red-spot-rice", "bspwm-rice"]

    currentRiceImageList = [
        {
            name: "Telegram & Termite",
            filePath: "/assets/rice/current-rice-telegram-termite.png",
            caption: "Arch Linux, GNOME, Arc GTK and Gnome Shell, Dash To Dock, Termite, Telegram"
        },
        {
            name: "Spotify",
            filePath: "/assets/rice/current-rice-spotify.png",
            caption: "Arch Linux, GNOME, Arc GTK and Gnome Shell, Dash To Dock, Spotify (customized using custom oomox configuration)"
        },
    ];

    androidHomescreenImageList = [
        {
            name: "Android",
            filePath: "/assets/rice/android-homescreen-calendar.jpg",
            caption: "Nova Launcher with the Neat Calendar Google Calendar Widget"
        },
        {
            name: "Android",
            filePath: "/assets/rice/android-homescreen-bus-timetable.jpg",
            caption: "Nova Launcher with the Auckland Transit Real Time Board Widgets"
        }
    ];

    redSpotRiceImageList = [
        {
            name: "Red Spot Rice",
            filePath: "/assets/rice/red-spot-rice-clean.png",
            caption: "Arch Linux, BSPWM, Polybar"
        },
        {
            name: "Red Spot Rice",
            filePath: "/assets/rice/red-spot-rice-dmenu2.png",
            caption: "Arch Linux, BSPWM, Polybar, Dmenu2"
        },
        {
            name: "Red Spot Rice",
            filePath: "/assets/rice/red-spot-rice-instagram.png",
            caption: "Arch Linux, BSPWM, Firefox, Instagram (with custom userstyle)"
        },
        {
            name: "Red Spot Rice",
            filePath: "/assets/rice/red-spot-rice-instagram-chrome.png",
            caption: "Arch Linux, BSPWM, Polybar, Chrome, Instagram (with custom userstyle)"
        },
        {
            name: "Red Spot Rice",
            filePath: "/assets/rice/red-spot-rice-spotify.png",
            caption: "Arch Linux, BSPWM, Polybar, Spotify (with custom oomox style)"
        },
        {
            name: "Red Spot Rice",
            filePath: "/assets/rice/red-spot-rice-stallman.org.png",
            caption: "Arch Linux, BSPWM, Polybar, Firefox, Spotify"
        },
        {
            name: "Red Spot Rice",
            filePath: "/assets/rice/red-spot-rice-startpage.png",
            caption: "Arch Linux, BSPWM, Polybar, Firefox, Custom Startpage"
        },
        {
            name: "Red Spot Rice",
            filePath: "/assets/rice/red-spot-rice-telegram.png",
            caption: "Arch Linux, BSPWM, Polybar, Telegram (with custom theme)"
        },
        {
            name: "Red Spot Rice",
            filePath: "/assets/rice/red-spot-rice-termite.png",
            caption: "Arch Linux, BSPWM, Polybar, Termite"
        }
    ];

    bspwmRiceImageList = [
        {
            name: "Clean",
            filePath: "/assets/rice/bspwm-rice-clean.png",
            caption: "Arch Linux, BSPWM, Lemonbar"
        },
        {
            name: "Fake Dirty",
            filePath: "/assets/rice/bspwm-rice-fake-dirty.png",
            caption: "URXVT, screenfetch, htop, panes color script"
        },
        {
            name: "Firefox/Homepage",
            filePath: "/assets/rice/bspwm-rice-firefox-homepage.png",
            caption: "Firefox and Startpage"
        },
        {
            name: "i3lock",
            filePath: "/assets/rice/bspwm-rice-i3lock.png",
            caption: "i3lock"
        },
        {
            name: "MPD/NCMPCPP",
            filePath: "/assets/rice/bspwm-rice-mpd-ncmpcpp.png",
            caption: "mpd and ncmpcpp client"
        },
        {
            name: "Dunst Notifications",
            filePath: "/assets/rice/bspwm-rice-notifications-dunst.png",
            caption: "dunst notifcation"
        },
        {
            name: "Reddit Userstyle (Dark Naut)",
            filePath: "/assets/rice/bspwm-rice-reddit-dark-naut-userstyle.png",
            caption: "Firefox with Reddit and Dark Naut Userstyle"
        },
        {
            name: "Rofi",
            filePath: "/assets/rice/bspwm-rice-rofi.png",
            caption: "Rofi launcher"
        },
        {
            name: "Wikipedia Userstyle (Wikipedia Minimalismo)",
            filePath: "/assets/rice/bspwm-rice-wikipedia-minimalismo-userstyle.png",
            caption: "Firefox Wikipedia and Wikipedia Minimalismo Userstyle"
        },
    ];

    onComponentDidMount() {
        this.setState({
            currentRiceTileLoadIndex: 0,
            androidHomescreenTileLoadIndex: 0,
            redSpotRiceTileLoadIndex: 0,
            bspwmRiceTileLoadIndex: 0,
        })
    }

    loadNextCarouselTile(carouselName, loadedIndex) {
        console.log(`${carouselName} ${loadedIndex} loaded`);
        
        if (carouselName === "current-rice") {
            if (loadedIndex >= this.state.currentRiceTileLoadIndex) {
                this.setState({
                    currentRiceTileLoadIndex: loadedIndex + 1
                });
            }
        } else if (carouselName === "android-homescreen") {
            if (loadedIndex >= this.state.androidHomescreenTileLoadIndex) {
                this.setState({
                    androidHomescreenTileLoadIndex: loadedIndex + 1
                });
            }
        } else if (carouselName === "red-spot-rice") {
            if (loadedIndex >= this.state.redSpotRiceTileLoadIndex) {
                this.setState({
                    redSpotRiceTileLoadIndex: loadedIndex + 1
                });
            }
        } else if (carouselName === "bspwm-rice") {
            if (loadedIndex >= this.state.bspwmRiceTileLoadIndex) {
                this.setState({
                    bspwmRiceTileLoadIndex: loadedIndex + 1
                });
            }
        }
    }

    render() {
        var imageCarouselTileWidth = this.state.windowWidth < 980 ? this.state.windowWidth : 980;
        var currentRiceTiles = this.currentRiceImageList.map((image, index) => (
            <FocusableImageCarouselTile
                name={image.name}
                imageFilePath={image.filePath}
                imageCaption={image.caption}
                imageClassName={image.name.toLowerCase().replace(/ /g, "-")}
                maxWidth={imageCarouselTileWidth}
                tileIndex={index}
                carouselName="current-rice"
                canLoadImage={index <= this.state.currentRiceTileLoadIndex}
                loadNext={this.loadNextCarouselTile.bind(this)}
            />
        ));
        currentRiceTiles.unshift((
            <SimpleTextCarouselTile
                header="Current Rice"
                paragraph="The current state of my linux environment on my Dell XPS 13 (9360)"
            />
        ));

        var androidHomescreenTiles = this.androidHomescreenImageList.map((image, index) => (
            <FocusableImageCarouselTile
                name={image.name}
                imageFilePath={image.filePath}
                imageCaption={image.caption}
                imageClassName={image.name.toLowerCase().replace(/ /g, "-")}
                maxWidth={imageCarouselTileWidth}
                tileIndex={index}
                carouselName="android-homescreen"
                canLoadImage={index <= this.state.androidHomescreenTileLoadIndex}
                loadNext={this.loadNextCarouselTile.bind(this)}
            />
        ));
        androidHomescreenTiles.unshift((
            <SimpleTextCarouselTile
                header="Android Homescreen"
                paragraph="The current state of my android homescreen running on my Samsung Galaxy Note 9"
            />
        ));

        var redSpotRiceTiles = this.redSpotRiceImageList.map((image, index) => (
            <FocusableImageCarouselTile
                name={image.name}
                imageFilePath={image.filePath}
                imageCaption={image.caption}
                imageClassName={image.name.toLowerCase().replace(/ /g, "-")}
                maxWidth={imageCarouselTileWidth}
                tileIndex={index}
                carouselName="red-spot-rice"
                canLoadImage={index <= this.state.redSpotRiceTileLoadIndex}
                loadNext={this.loadNextCarouselTile.bind(this)}
            />
        ));
        redSpotRiceTiles.unshift((
            <SimpleTextCarouselTile
                header="Red Spot Rice"
                paragraph="A Martian landscape inspired rice. Very limited and bright colour pallete and yes it was difficult for me to read. The goal here was to make as many applications as possible conform to my colour scheme. Oct 2017"
            />
        ));

        var bspwmRiceTiles = this.bspwmRiceImageList.map((image, index) => (
            <FocusableImageCarouselTile
                name={image.name}
                imageFilePath={image.filePath}
                imageCaption={image.caption}
                imageClassName={image.name.toLowerCase().replace(/ /g, "-")}
                maxWidth={imageCarouselTileWidth}
                tileIndex={index}
                carouselName="bspwm-rice"
                canLoadImage={index <= this.state.bspwmRiceTileLoadIndex}
                loadNext={this.loadNextCarouselTile.bind(this)}
            />
        ));
        bspwmRiceTiles.unshift((
            <SimpleTextCarouselTile
                header="BSPWM Rice"
                paragraph="My first high effort rice using the Window Manager BSPWM. At this stage I was using terminal applications as much as possible as they were easy to customise the colours for. Nov 2015"
            />
        ));
        return (
            <div className="viewport-pagination-view rice">
                <IndexIndicator hashes={this.hashes} activeIndex={this.state.currentIndex} setIndex={this.setIndex.bind(this)}></IndexIndicator>
                <div className="viewport-container" style={{transform: "translateY(-" + this.state.currentIndex * this.state.windowHeight + "px)"}}>
                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div>
                            <h1>Rice<span className="highlight-full-stop">.</span></h1>
                            <p>
                                (v.) "Rice" is a word that is commonly used to refer to making visual improvements and customizations on one's desktop.
                                 The word is used to refer to a visually attractive desktop upgraded beyond the default.
                                <br />
                                <br />
                                <span style={{float: "right"}} >- /r/unixporn</span>
                                <br />
                            </p>
                            <div className="scroll-down">
								<p>SCROLL DOWN</p>
								<FontAwesomeIcon icon={faChevronDown} />
							</div>
                        </div>
                    </div>
    
                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div className="rice-pane">
                            <Carousel carouselItems={currentRiceTiles} />
                        </div>
                    </div>

                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div className="rice-pane">
                            <Carousel carouselItems={androidHomescreenTiles} />
                        </div>
                    </div>

                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div className="rice-pane">
                            <Carousel carouselItems={redSpotRiceTiles} />
                        </div>
                    </div>

                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div className="rice-pane">
                            <Carousel carouselItems={bspwmRiceTiles} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Rice;
