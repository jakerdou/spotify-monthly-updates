import React from 'react';
import './ArtistList.css';
import $ from "jquery";
import Spotify from 'spotify-web-api-js';

import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Table from 'react-bootstrap/Table'

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
      imgs: [],
      links: [],
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
          url: 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10',
          headers: {
            'Authorization': 'Bearer ' + accessToken
          },
          success: function(response) {
            var imageArray = [];
            var linkArray = [];

            for (var i = 0; i < response.items.length; i++) {
              const art = response.items[i];
              imageArray.push(art.images[0].url)
              linkArray.push(art.external_urls.spotify)
            }

            self.setState({
              topArtists: {
                items: response.items,
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

  makeArtTable() {
    var table = [];
    var children = [];
    var artists = this.state.topArtists.items
    var imgs = this.state.imgs
    var lnks = this.state.links

    if (artists.length > 1) {
      for (var i = 0; i < this.state.topArtists.items.length; i++) {
        children.push(<tr>
          <td>
            <div><img class="artistImage" src={imgs[i]} /></div>
            <div class="artistName"><a href={lnks[i]}>{artists[i].name}</a></div>
          </td>
          </tr>);
      }

      table.push(<Table striped borderless hover size="sm" variant="dark">
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
    var artists = this.state.topArtists.items
    var imgs = this.state.imgs

    //go back and look at ListGroup for more info
    return (
      <div className="ArtistList">
        <div id="alrt">{this.state.alert}</div>

        <Button variant="outline-dark" onClick = {() => this.getMyTopArtistsMonthly()} id="topArtBut">
          Get Top Artists For Last Month
        </Button>

        <h3 id="TopArts">Your Top Artists:</h3>
        <div>
          {this.makeArtTable()}
        </div>
      </div>
    );
  }
}

export default ArtistList;
