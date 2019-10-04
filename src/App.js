import React, { Component } from 'react';
import './App.css';
import './Colors/Purple.css';
import './Colors/Yellow.css';
import './Colors/AllStar.css';
import './Colors/Antibes.css';

import RootPage from './react-components/RootPage/RootPage';
import NavBar from './react-components/NavBar/NavBar';
import ThemePicker from './react-components/ThemePicker/ThemePicker';
import { BrowserRouter } from "react-router-dom";

class App extends Component {
	constructor(props) {
		super(props);
		
		var initialColorClass = localStorage.getItem("colorClass");
		if (!initialColorClass) {
			initialColorClass = "purple";
		}

		this.state = {
			colorClass: initialColorClass
		};
	}
	
	updateColorClass(newColorClass) {
		localStorage.setItem("colorClass", newColorClass);
		this.setState({colorClass: newColorClass});
	}

	render() {
		return (
    		<BrowserRouter>
				<div className={"App " + this.state.colorClass}>
					<NavBar />
					<RootPage />
					<ThemePicker updateColorClass={this.updateColorClass.bind(this)}/>
				</div>
      		</BrowserRouter>
    	);
  	}
}

export default App;
