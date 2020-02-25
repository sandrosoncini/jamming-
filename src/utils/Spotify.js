import { SearchBar } from "../components/SearchBar/SearchBar";

const clientId ='6adff5412f1a4d2bbc35115d2898c941';
const redirectUri = 'http://localhost:3000'
let accessToken;

const Spotify ={
   getAccessToken(){
       if(accessToken){
           return accessToken
       }

       const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
       const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

       if(accessTokenMatch && expiresInMatch){
           accessToken = accessToken[1];
           const expiresIn = Number(expiresInMatch[1]);

           window.setTimeout(()=> accessToken= "", expiresIn* 1000 );
           window.history.pushState('Access Token', null, '/')
           return accessToken
       }else {
           const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
           window.location = accessUrl;
       }

   },

   search(term){
      const accessToken = Spotify.getAccessToken();
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
          headers: {
          Authorization: `Bearer ${accessToken}`
          }
      })
      .then(res => res.json())
      .then(data => {
          if(!data.tracks){
              return [];
          }
          return data.tracks.items.map(track =>({
              id: track.id,
              name: track.artist[0].name,
              album: track.album.name,
              uri: track.uri
          }))
      })



   }
}

export default Spotify;