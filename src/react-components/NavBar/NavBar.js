import React, { Component } from 'react';
import './NavBar.css';
import { NavLink } from "react-router-dom";
import classnames from "classnames";

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            atTop: true
        };
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const atTop = 0 === currentScrollPos;
        this.setState({
            atTop
        });
    };

    render() {
        return (
            <div className={classnames("navBar", {"hidden-navbar": !this.state.atTop})}>
                <div className="gradient-wrapper">
                    <div className="gradient-1"></div>
                </div>
                <div className="desktop">
                    <div className="links">
                        <NavLink to="/">HOME</NavLink>
                        <NavLink to="/projects">PROJECTS</NavLink>
                        <NavLink to="/rice">RICE</NavLink>
                        <NavLink to="/tech-tastes">TECH TASTES</NavLink>
                        <NavLink to="/music">MUSIC</NavLink>
                        <NavLink to="/profiles">PROFILES</NavLink>
                        <NavLink to="/mates">MATES</NavLink>
                        <a target="_blank" rel="noopener noreferrer" href="https://blog.zachhuxford.io">BLOG</a>
                    </div>
                </div>
                <div className="mobile">
                    <div className="row-1 links">
                        <NavLink to="/">HOME</NavLink>
                        <NavLink to="/projects">PROJECTS</NavLink>
                        <NavLink to="/rice">RICE</NavLink>
                        <NavLink to="/tech-tastes">TECH TASTES</NavLink>
                    </div>
                    <div className="row-2 links">
                        <NavLink to="/music">MUSIC</NavLink>
                        <NavLink to="/profiles">PROFILES</NavLink>
                        <NavLink to="/mates">MATES</NavLink>
                        <a href="https://blog.zachhuxford.io">BLOG</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;
