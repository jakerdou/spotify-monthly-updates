import React from 'react';
import './TrackList.css';
import $ from "jquery";
import Spotify from 'spotify-web-api-js';

import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Table from 'react-bootstrap/Table'

import {getHashParams} from '../functions.js'

const spot = new Spotify();

class TrackList extends React.Component {
  constructor(){
    super();
    const params = getHashParams();

    this.state = {
      loggedIn: params.access_token ? true : false,
      topTracks: {
        items: [
          {name: "Not Checked Yet"}
        ]
      },
      alrt: ""
    }

    if (params.access_token) {
      spot.setAccessToken(params.access_token);
    }
  }

  getMyTopTracksMonthly() {

    if(this.state.loggedIn === true) {
      var accessToken = getHashParams().access_token;
      var self = this;

      $.ajax({
          type: 'GET',
          url: 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5',
          headers: {
            'Authorization': 'Bearer ' + accessToken
          },
          success: function(response) {
            var imageArray = [];
            var linkArray = [];

            for (var i = 0; i < response.items.length; i++) {
              const track = response.items[i];
              imageArray.push(track.album.images[0].url)
              linkArray.push(track.external_urls.spotify)
            }

            self.setState({
              topTracks: {
                items: response.items
              },
              imgs: imageArray,
              links: linkArray
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

  makeTrackTable() {
    var table = [];
    var children = [];
    var tracks = this.state.topTracks.items
    var imgs = this.state.imgs
    var lnks = this.state.links

    if (tracks.length > 1) {
      for (var i = 0; i < this.state.topTracks.items.length; i++) {
        children.push(<tr>
          <td><a href={lnks[i]}>{tracks[i].name}</a></td>
          <td><img class="trackImage" src={imgs[i]} /></td>
          </tr>);
      }

      table.push(<Table striped bordered hover size="sm">
          <tbody>
            {children}
          </tbody>
        </Table>)

      return table
    }
    else {

    }
  }

  render(){
    var tracks = this.state.topTracks.items;

    return (
      <div className="TrackList">
        <div id="alrt">{this.state.alert}</div>

        <Button variant="outline-dark" onClick = {() => this.getMyTopTracksMonthly()} id="topTrackBut">
          Get Top Tracks For Last Month
        </Button>

        <h3 id="TopArts">Your Top Tracks:</h3>
        <div>
          {this.makeTrackTable()}
        </div>
      </div>
    );
  }
}

export default TrackList;
