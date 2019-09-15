import React, { Component } from 'react';
import './Startpage.css';

const bangToWebsite = [{
    bang: "g",
    displayName: "google",
    searchUrl: "https://www.google.co.nz/search?q="
},
{
    bang: "i",
    displayName: "google images",
    searchUrl: "https://www.google.com/search?tbm=isch&q="
},
{
    bang: "y",
    displayName: "youtube",
    searchUrl: "https://www.youtube.com/results?search_query="
},
{
    bang: "d",
    displayName: "duck duck go",
    searchUrl: "https://duckduckgo.com/?q="
},
{
    bang: "aw",
    displayName: "arch wiki",
    searchUrl: "https://wiki.archlinux.org/index.php?title=Special%3ASearch&search="
},
{
    bang: "au",
    displayName: "arch user repository",
    searchUrl: "https://aur.archlinux.org/packages/?O=0&K="
},
{
    bang: "u",
    displayName: "urban dictionary",
    searchUrl: "http://www.urbandictionary.com/define.php?term="
},
{
    bang: "m",
    displayName: "imdb",
    searchUrl: "http://www.imdb.com/find?ref_=nv_sr_fn&q="
},
{
    bang: "gh",
    displayName: "github",
    searchUrl: "https://github.com/search?utf8=✓&q="
},
{
    bang: "ge",
    displayName: "genius",
    searchUrl: "https://genius.com/search?q="
},
{
    bang: "r",
    displayName: "reddit",
    searchUrl: "http://www.reddit.com/r/"
},
{
    bang: "w",
    displayName: "wikipedia",
    searchUrl: "https://en.wikipedia.org/w/index.php?search="
}];

const listItems = bangToWebsite.map((website) =>
  <li><span className="bang">!{website.bang}</span><span className="display-name">{website.displayName}</span></li>
);

class Startpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false
        };
    }

    togglePopup() {
        this.setState({showPopup: this.state.showPopup ? false : true});
    }

    search(bangToWebsite, searchTerm) {
        window.location.href = bangToWebsite.searchUrl + searchTerm;
    }

    onKeyPress(event) {
        var searchString = event.target.value;
        console.log(event.which);
        if (event.which == 13) {
            var bangIndex = searchString.indexOf("!");
            if(bangIndex > -1) {
                var searchSite = searchString.slice(bangIndex + 1),
                    searchTerm = searchString.substring(0, bangIndex),
                    matchedSite;

                bangToWebsite.forEach(function(element) {
                    if (searchSite === element.bang) {
                        matchedSite = element;
                    }
                });

                if (matchedSite) {
                    this.search(matchedSite, searchTerm)
                } else {
                    this.search(bangToWebsite[0], searchTerm)
                }
                
            } else {
                this.search(bangToWebsite[0], searchString)
            }
        }
    }

    render() {
        return (
            <div className="startpage">
                <div className="body">
                    <div>
                        <input placeholder="Search..." className="search"  autocomplete="off" autofocus="on" type="text" onKeyPress={this.onKeyPress.bind(this)}></input>
                        <div className="toggle-popup" onMouseEnter={this.togglePopup.bind(this)} onMouseLeave={this.togglePopup.bind(this)} >{this.state.showPopup ? "-" : "+"}</div>
                        <div className="popup-container" style={{opacity: this.state.showPopup ? 1 : 0 }}>
                            <ul>
                                {listItems}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Startpage;
