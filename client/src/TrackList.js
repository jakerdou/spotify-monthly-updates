import React from 'react';
import logo from './logo.svg';
import './TrackList.css';
import $ from "jquery";
import Spotify from 'spotify-web-api-js';

import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

const spot = new Spotify();

class TrackList extends React.Component {
  constructor(){
    super();
    const params = this.getHashParams();

    this.state = {
      loggedIn: params.access_token ? true : false,
      topTracks: {
        items: [
          {name: "Not Checked Yet"}
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

  getMyTopTracksMonthly() {
    var accessToken = this.getHashParams().access_token;
    var self = this;

    $.ajax({
        type: 'GET',
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
      <div className="TrackList">
        <div>
          <Button variant="outline-secondary" onClick = {() => this.getMyTopTracksMonthly()}>
            Get Top Tracks For Last Month
          </Button>

          <h3 id="TopArts">Your Top Tracks:</h3>
          <div>
            {tracks.map(track =>
              <ListGroup>
                <ListGroup.Item>{track.name}</ListGroup.Item>
              </ListGroup>
            )};
          </div>
        </div>
      </div>
    );
  }
}

export default TrackList;
