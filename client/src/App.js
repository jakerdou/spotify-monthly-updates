import React from 'react';
import logo from './logo.svg';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spot = new Spotify();

//{tracks.map(track => track.artists.map(artist => <div>{artist.name}</div>))}


class App extends React.Component {
  constructor(){
    super();
    const params = this.getHashParams();

    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: "Not Checked Yet",
        image: ""
      },
      topTracks: {
        items: [
          {name: "Not Checked Yet"},
          {artists: [{name: ""}]}
        ]
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

  getTopTracks() {
    spot.getMyTopTracks()
      .then((response) => {
        //for some reason i cant read the artists
        this.setState({
          topTracks: {
            items: response.items
          }
        })
      })
  }

  render(){
    var tracks = this.state.topTracks.items;

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

        <div>
          <button onClick = {() => this.getTopTracks()}>
            Get Top Tracks
          </button>
          <div>My Top Tracks:</div>
          <div>
            {tracks.map(track =>
              <div>{track.name}
              </div>)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
