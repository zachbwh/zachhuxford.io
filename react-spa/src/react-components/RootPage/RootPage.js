import React, { Component } from 'react';
import './RootPage.css';

import HomePage from './HomePage/HomePage';
import Projects from './Projects/Projects';
import Startpage from './Projects/Startpage/Startpage';
import LastFmCreep from './Projects/LastFmCreep/LastFmCreep';
import Rice from './Rice/Rice';
import TechTastes from './TechTastes/TechTastes';
import Music from './Music/Music';
import Profiles from './Profiles/Profiles';
import Mates from './Mates/Mates';
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
const duration = 1500;

class RootPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            body: props.body,
            childPages: props.childPages,
            location: props.location,
            atTop: true
        }
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
            <div className="rootpage">
                <div className="background"></div>
                <div className="container" onScroll={this.handleBodyScroll}>
                    <TransitionGroup>
                        <CSSTransition duration={duration} key={this.props.location.key} classNames="anim-fade">
                            <Switch location={this.props.location}>
                                <Route exact path="/" component={HomePage} />
                                <Route exact path="/projects" component={Projects} />
                                <Route path="/projects/startpage" component={Startpage} />
                                <Route path="/projects/lastfmcreep" component={LastFmCreep} />
                                <Route path="/rice" component={Rice} />
                                <Route path="/tech-tastes" component={TechTastes} />
                                <Route path="/music" component={Music} />
                                <Route path="/profiles" component={Profiles} />
                                <Route path="/mates" component={Mates} />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            </div>
        );
    }
}

export const RootPageWithRouter = withRouter(RootPage);
export default withRouter(RootPage);
