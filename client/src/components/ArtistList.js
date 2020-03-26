import React from 'react';
import './ArtistList.css';
import $ from "jquery";
import Spotify from 'spotify-web-api-js';

import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

import {getHashParams} from '../functions.js'

const spot = new Spotify();

class ArtistList extends React.Component {
  constructor(){
    super();
    const params = getHashParams();

    this.state = {
      loggedIn: params.access_token ? true : false,
      topArtists: {
        items: [
          {name: "Not Checked Yet"}
        ]
      },
      alert: ""
    }

    if (params.access_token) {
      spot.setAccessToken(params.access_token);
    }
  }

  getMyTopArtistsMonthly() {

    if(this.state.loggedIn === true) {
      var accessToken = getHashParams().access_token;
      var self = this;

      $.ajax({
          type: 'GET',
          url: 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5',
          headers: {
            'Authorization': 'Bearer ' + accessToken
          },
          success: function(response) {
            self.setState({
              topArtists: {
                items: response.items
              }
            })
          }
      });
    }
    else {
      this.setState({
        alert: "You must log in before using this feature"
      })
    }
  }

  render(){
    var artists = this.state.topArtists.items

    //go back and look at ListGroup for more info
    return (
      <div className="ArtistList">
        <div id="alrt">{this.state.alert}</div>

        <Button variant="outline-dark" onClick = {() => this.getMyTopArtistsMonthly()} id="topArtBut">
          Get Top Artists For Last Month
        </Button>

        <h3 id="TopArts">Your Top Artists:</h3>
        <div>
          {artists.map(artist =>
            <ListGroup>
              <ListGroup.Item>{artist.name}</ListGroup.Item>
            </ListGroup>
          )}
        </div>
      </div>
    );
  }
}

export default ArtistList;
