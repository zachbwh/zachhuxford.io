import React, { Component } from 'react';
import './App.css';
import './Colors/Purple.css';
import './Colors/Yellow.css';
import './Colors/AllStar.css';
import './Colors/Antibes.css';

import RootPage from './react-components/RootPage/RootPage';
import NavBar from './react-components/NavBar/NavBar';
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App all-star">
          <NavBar />
		      <RootPage />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
