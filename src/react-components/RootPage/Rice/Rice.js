import React from 'react';
import './Rice.css';

import ViewportPaginationView from '../ViewportPaginationView/ViewportPaginationView';
import '../ViewportPaginationView/ViewportPaginationView.css';
import Carousel from '../../Carousel/Carousel';
import FocusableImageCarouselTile from '../../Carousel/FocusableImageCarouselTile/FocusableImageCarouselTile';


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


    render() {
        var imageCarouselTileWidth = this.state.windowWidth < 980 ? this.state.windowWidth : 980;
        var currentRiceTiles = this.currentRiceImageList.map(image => (
            <FocusableImageCarouselTile name={image.name} imageFilePath={image.filePath} imageCaption={image.caption} imageClassName={image.name.toLowerCase().replace(/ /g, "-")} maxWidth={imageCarouselTileWidth} />
        ));
        var androidHomescreenTiles = this.androidHomescreenImageList.map(image => (
            <FocusableImageCarouselTile name={image.name} imageFilePath={image.filePath} imageCaption={image.caption} imageClassName={image.name.toLowerCase().replace(/ /g, "-")} maxWidth={imageCarouselTileWidth} />
        ));
        var redSpotRiceTiles = this.redSpotRiceImageList.map(image => (
            <FocusableImageCarouselTile name={image.name} imageFilePath={image.filePath} imageCaption={image.caption} imageClassName={image.name.toLowerCase().replace(/ /g, "-")} maxWidth={imageCarouselTileWidth} />
        ));
        var bspwmRiceTiles = this.bspwmRiceImageList.map(image => (
            <FocusableImageCarouselTile name={image.name} imageFilePath={image.filePath} imageCaption={image.caption} imageClassName={image.name.toLowerCase().replace(/ /g, "-")} maxWidth={imageCarouselTileWidth} />
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
                            </p>
                        </div>
                    </div>
    
                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div className="rice-pane">
                            <h1 className="carousel-heading">Current Rice</h1>
                            <Carousel carouselItems={currentRiceTiles} />
                        </div>
                    </div>

                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div className="rice-pane">
                            <h1 className="carousel-heading">Android Homescreen</h1>
                            <Carousel carouselItems={androidHomescreenTiles} />
                        </div>
                    </div>

                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div className="rice-pane">
                            <h1 className="carousel-heading">Red Spot Rice</h1>
                            <Carousel carouselItems={redSpotRiceTiles} />
                        </div>
                    </div>

                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div className="rice-pane">
                            <h1 className="carousel-heading">BSPWM Rice</h1>
                            <Carousel carouselItems={bspwmRiceTiles} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Rice;
