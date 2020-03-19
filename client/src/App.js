import React from 'react';
import logo from './logo.svg';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spot = new Spotify();

class App extends React.Component {
  constructor(){
    super();
    const params = this.getHashParams();

    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: "Not Checked",
        image: ""
      }
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

  getNowPlaying() {
    spot.getMyCurrentPlayingTrack()
      .then((response) => {
        if(response){
          this.setState({
            nowPlaying: {
              name: response.item.name,
              image: response.item.album.images[0].url
            }
          })
        }
        else{
          this.setState({
            nowPlaying: {
              name: "none",
              image: ""
            }
          })
        }
      })
  }

  render(){
    return (
      <div className="App">
        <a href = "http://localhost:8888">
          <button>Login With Spotify</button>
        </a>
        <div>Now Playing: {this.state.nowPlaying.name}</div>
        <div>
          <img src = {this.state.nowPlaying.image}/>
        </div>
        <button onClick = {() => this.getNowPlaying()}>
          Check What's Playing
        </button>
      </div>
    );
  }
}

export default App;
