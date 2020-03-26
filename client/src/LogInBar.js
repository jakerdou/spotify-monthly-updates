//TODO: get shell script to run all necessary things
import React from 'react';
import logo from './logo.svg';
import './LogInBar.css';

import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'

class LogInBar extends React.Component {
  constructor(){
    super();
  }

  render(){

    return (
      <div className="LogInBar">
        <a href="http://localhost:8888" id="loginLink">
          <Jumbotron id="loginJTron">
            <h1>Click Here To Login With Spotify!</h1>
          </Jumbotron>
        </a>
      </div>
    );
  }
}

export default LogInBar;
