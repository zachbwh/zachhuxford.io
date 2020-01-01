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
            name: "Arch Linux",
            filePath: "/assets/rice/current-rice-telegram-termite.png",
            caption: "Arch Linux, GNOME, Arc GTK and Gnome Shell, Dash To Dock, Termite, Telegram"
        }
    ];

    bspwmRiceImageList = [
        {
            name: "Clean",
            filePath: "/assets/rice/bspwm-rice-clean.png",
            caption: "Arch Linux, GNOME, Arc GTK and Gnome Shell, Dash To Dock, Termite, Telegram"
        },
        {
            name: "Fake Dirty",
            filePath: "/assets/rice/bspwm-rice-fake-dirty.png",
            caption: "Arch Linux, GNOME, Arc GTK and Gnome Shell, Dash To Dock, Termite, Telegram"
        },
        {
            name: "Firefox/Homepage",
            filePath: "/assets/rice/bspwm-rice-firefox-homepage.png",
            caption: "Arch Linux, GNOME, Arc GTK and Gnome Shell, Dash To Dock, Termite, Telegram"
        },
        {
            name: "i3lock",
            filePath: "/assets/rice/bspwm-rice-i3lock.png",
            caption: "Arch Linux, GNOME, Arc GTK and Gnome Shell, Dash To Dock, Termite, Telegram"
        },
        {
            name: "MPD/NCMPCPP",
            filePath: "/assets/rice/bspwm-rice-mpd-ncmpcpp.png",
            caption: "Arch Linux, GNOME, Arc GTK and Gnome Shell, Dash To Dock, Termite, Telegram"
        },
        {
            name: "Dunst Notifications",
            filePath: "/assets/rice/bspwm-rice-notifications-dunst.png",
            caption: "Arch Linux, GNOME, Arc GTK and Gnome Shell, Dash To Dock, Termite, Telegram"
        },
        {
            name: "Reddit Userstyle (Dark Naut)",
            filePath: "/assets/rice/bspwm-rice-reddit-dark-naut-userstyle.png",
            caption: "Arch Linux, GNOME, Arc GTK and Gnome Shell, Dash To Dock, Termite, Telegram"
        },
        {
            name: "Rofi",
            filePath: "/assets/rice/bspwm-rice-rofi.png",
            caption: "Arch Linux, GNOME, Arc GTK and Gnome Shell, Dash To Dock, Termite, Telegram"
        },
        {
            name: "Wikipedia Userstyle (Wikipedia Minimalismo)",
            filePath: "/assets/rice/bspwm-rice-wikipedia-minimalismo-userstyle.png",
            caption: "Arch Linux, GNOME, Arc GTK and Gnome Shell, Dash To Dock, Termite, Telegram"
        },
    ];


    render() {
        var currentRiceTiles = this.currentRiceImageList.map(image => (
            <FocusableImageCarouselTile name={image.name} imageFilePath={image.filePath} imageCaption={image.caption} />
        ));
        var androidHomescreenTiles = this.androidHomescreenImageList.map(image => (
            <FocusableImageCarouselTile name={image.name} imageFilePath={image.filePath} imageCaption={image.caption} />
        ));
        var redSpotRiceTiles = this.redSpotRiceImageList.map(image => (
            <FocusableImageCarouselTile name={image.name} imageFilePath={image.filePath} imageCaption={image.caption} />
        ));
        var bspwmRiceTiles = this.bspwmRiceImageList.map(image => (
            <FocusableImageCarouselTile name={image.name} imageFilePath={image.filePath} imageCaption={image.caption} />
        ));
        return (
            <div className="viewport-pagination-view rice" onWheel={this.handleScroll.bind(this)} onTouchMove={this.handleTouchMove.bind(this)} onTouchStart={this.registerTouchStart.bind(this)}>
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
                        <div>
                            <h1>Current Rice</h1>
                            <Carousel carouselItems={currentRiceTiles} />
                        </div>
                    </div>

                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div>
                            <h1>Android Homescreen</h1>
                            <Carousel carouselItems={androidHomescreenTiles} />
                        </div>
                    </div>

                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div>
                            <h1>Red Spot Rice</h1>
                            <Carousel carouselItems={redSpotRiceTiles} />
                        </div>
                    </div>

                    <div className="viewport" style={{height: this.state.windowHeight + "px"}}>
                        <div>
                            <h1>BSPWM Rice</h1>
                            <Carousel carouselItems={bspwmRiceTiles} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Rice;
