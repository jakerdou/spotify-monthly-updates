//TODO: get shell script to run all necessary things
import React from 'react';
import logo from './logo.svg';
import './App.css';
import $ from "jquery";
import Spotify from 'spotify-web-api-js';

import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

const spot = new Spotify();

class App extends React.Component {
  constructor(){
    super();
    const params = this.getHashParams();

    this.state = {
      loggedIn: params.access_token ? true : false
    }

    if (params.access_token) {
      spot.setAccessToken(params.access_token);
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    return hashParams;
  }

  render(){

    return (
      <div className="App">
        <a href = "http://localhost:8888">
          <Button variant="outline-secondary">Login With Spotify</Button>
        </a>
      </div>
    );
  }
}

export default App;
