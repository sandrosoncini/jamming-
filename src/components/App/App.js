import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults'
import { Playlist } from '../PlayList/PlayList';

class App extends React.Component {
  
  constructor(props){
    super(props); 
    this.state= {
      searchResults: [
        {
            name: 'Strong',
            artist: 'Britney Spears ',
            album: 'Oops!... I Did It Again',
            id: '1'
        },
        {
            name: 'Sandro',
            artist: 'Britney Spears ',
            album: 'Oops!... I Did It Again',
            id: '2'
        },
        {
            name: 'Linda',
            artist: 'Britney Spears ',
            album: 'Oops!... I Did It Again',
            id: '3'
        },
      ],

      playlistName: 'My Play List',

      playlistTracks: [
        {
          id:'1',
          name: 'playlistName1',
          artist: 'artistName1',
          album: 'albumName1'
        },
        {
          id:'2',
          name: 'playlistName2',
          artist: 'artistName2',
          album: 'albumName2'
        },
        {
          id:'3',
          name: 'playlistName3',
          artist: 'artistName3',
          album: 'albumName3'
        }

      ],
    }
  }

  
  render() {
      return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar/>
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults}/>
              <Playlist 
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
