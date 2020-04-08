import React from 'react';
import './LogInBar.css';
import {getHashParams} from '../functions.js'

import Jumbotron from 'react-bootstrap/Jumbotron'

class LogInBar extends React.Component {
  constructor(){
    super();

    this.state = {

    }
  }

  getLoginMessage() {
    if (getHashParams().access_token) {
      return "You can now view your monthly Spotify statistics!"
    }
    else {
      return "Click here to login with Spotify!"
    }
  }

  render(){

    return (
      <div className="LogInBar">
        <a href="http://localhost:8888" id="loginLink">
          <Jumbotron id="loginJTron">
            <h1>{this.getLoginMessage()}</h1>
          </Jumbotron>
        </a>
      </div>
    );
  }
}

export default LogInBar;
