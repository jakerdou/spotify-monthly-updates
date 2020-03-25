import React from 'react';
import logo from './logo.svg';
import './App.css';
import $ from "jquery";
import Spotify from 'spotify-web-api-js';

import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button' //TODO: get button to work to call topTracks

const spot = new Spotify();

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
          {name: "Not Checked Yet"}
        ]
      },
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

  getMyTopTracksMonthly() {
    var accessToken = this.getHashParams().access_token;
    var self = this;

    $.ajax({
        type: 'GET',
        url: 'https://dog.ceo/api/breeds/image/random',
        url: 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        success: function(response) {
          self.setState({
            topTracks: {
              items: response.items
            }
          })
        }
    });
  }

  render(){
    var tracks = this.state.topTracks.items;

    return (
      <div className="App">
        <a href = "http://localhost:8888">
          <Button variant="outline-secondary">Login With Spotify</Button>
        </a>
        <div>Now Playing: {this.state.nowPlaying.name}</div>
        <div>
          <img src = {this.state.nowPlaying.image}/>
        </div>
        <Button variant="outline-secondary" onClick = {() => this.getNowPlaying()}>
          Check What's Playing
        </Button>

        <div>
          <Button variant="outline-secondary" onClick = {() => this.getMyTopTracksMonthly()}>
            Get Top Tracks For Last Month
          </Button>
          <Badge pill variant="primary">
            New
          </Badge>
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
