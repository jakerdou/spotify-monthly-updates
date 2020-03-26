import React from 'react';
import './LogInBar.css';

import Jumbotron from 'react-bootstrap/Jumbotron'

class LogInBar extends React.Component {
  constructor(){
    super();

    this.state = {
      loginMessage: "Click Here To Login With Spotify!"
    }
  }

  loginClick() {
    this.setState({
      loginMessage: "You can now view your monthly statistics!"
    })
  }

  render(){

    return (
      <div className="LogInBar">
        <a href="http://localhost:8888" id="loginLink">
          <Jumbotron id="loginJTron" onClick = {() => this.loginClick()}>
            <h1>{this.state.loginMessage}</h1>
          </Jumbotron>
        </a>
      </div>
    );
  }
}

export default LogInBar;
