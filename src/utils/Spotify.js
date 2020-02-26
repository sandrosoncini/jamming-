

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
           
           accessToken = accessTokenMatch[1];
           const expiresIn = Number(expiresInMatch[1]);

           window.setTimeout(()=> accessToken= "", expiresIn * 1000 );
           window.history.pushState('Access Token', null, '/')
           return accessToken
       }else {
           console.log('hello danile')
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
                name: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        })
    },

    savePlaylist(playlistName, trackUris){
        if(!playlistName || !trackUris){
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(res => res.json()
        ).then(data => {
            userId = data.id
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
            {
                headers: headers,
                method: "POST",
                body: JSON.stringify({name: playlistName})
            }).then(res => res.json()
            ).then(data => {
                const playlistId = data.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                })
            })
        })

    }
}

export default Spotify;