import React from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

import LogInBar from './components/LogInBar'
import ArtistList from './components/ArtistList'
import TrackList from './components/TrackList'

const spot = new Spotify();

class App extends React.Component {
  constructor(){
    super();

    this.state = {
    }

  }

  render(){

    return (
      <div className="App">
        <LogInBar />
        <ArtistList />
        <TrackList />
      </div>
    );
  }
}

export default App;
