import React, { Component } from 'react';
import './RootPage.css';

import HomePage from './HomePage/HomePage';
import Projects from './Projects/Projects';
import Startpage from './Projects/Startpage/Startpage';
import Rice from './Rice/Rice';
import TechTastes from './TechTastes/TechTastes';
import Music from './Music/Music';
import Profiles from './Profiles/Profiles';
import Mates from './Mates/Mates';
import ImageModalView from './ImageModalView/ImageModalView';
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
const duration = {
    enter: 1500,
    exit: 0,
   };

class RootPage extends Component {
    render() {
        return (
            <div className="rootpage">
                <div className="background"></div>
                <div className="container">
                    <TransitionGroup className="transition-group">
                        <CSSTransition timeout={duration} key={this.props.location.key} classNames="anim-fade">
                            <Switch location={this.props.location}>
                                <Route exact path="/" component={HomePage} />
                                <Route exact path="/projects" component={Projects} />
                                <Route path="/projects/startpage" component={Startpage} />
                                <Route path="/rice" component={Rice} />
                                <Route path="/tech-tastes" component={TechTastes} />
                                <Route path="/music" component={Music} />
                                <Route path="/profiles" component={Profiles} />
                                <Route path="/mates" component={Mates} />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
                <ImageModalView />
            </div>
        );
    }
}

export const RootPageWithRouter = withRouter(RootPage);
export default withRouter(RootPage);
