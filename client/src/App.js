//TODO: get shell script to run all necessary things
import React from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

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
      </div>
    );
  }
}

export default App;
