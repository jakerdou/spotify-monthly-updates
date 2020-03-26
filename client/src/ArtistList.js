//TODO: add topArtists
import React from 'react';
import logo from './logo.svg';
import './ArtistList.css';
import $ from "jquery";
import Spotify from 'spotify-web-api-js';

import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

const spot = new Spotify();

class ArtistList extends React.Component {
  constructor(){
    super();
    const params = this.getHashParams();

    this.state = {
      loggedIn: params.access_token ? true : false,
      alert: ""
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

  getMyTopArtistsMonthly() {

    if(this.state.loggedIn == true) {
      var accessToken = this.getHashParams().access_token;
      var self = this;

      $.ajax({
          type: 'GET',
          url: 'https://api.spotify.com/v1/me/top/artists?time_range=short_term',
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
    else {
      this.setState({
        alert: "You must log in before using this feature"
      })
    }
  }

  render(){

    //go back and look at ListGroup for more info
    return (
      <div className="ArtistList">
        <div id="alrt">{this.state.alert}</div>

        <Button variant="outline-secondary" onClick = {() => this.getMyTopArtistsMonthly()}>
          Get Top Artists For Last Month
        </Button>

        <h3 id="TopArts">Your Top Artists:</h3>
        <ListGroup>
          <ListGroup.Item>Roddy Ricch</ListGroup.Item>
          <ListGroup.Item>artist2</ListGroup.Item>
          <ListGroup.Item>artist3</ListGroup.Item>
          <ListGroup.Item>artist4</ListGroup.Item>
          <ListGroup.Item>artist5</ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default ArtistList;
