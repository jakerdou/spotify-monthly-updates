import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import ArtistList from './ArtistList'
import TrackList from './TrackList'
import LogInBar from './LogInBar'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<LogInBar />, document.getElementById('logInBar'));
ReactDOM.render(<ArtistList />, document.getElementById('artistList'));
ReactDOM.render(<TrackList />, document.getElementById('trackList'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
