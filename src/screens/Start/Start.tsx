import React from "react";
import { Auth } from "../../auth/Auth";
import spotifyBrand from "../../assets/spotify.png";

function Start() {
  const auth = Auth.getInstance();

  return (
    <div className="start">
      <div className="container">
        <div className="description">
          me-musically is a small service that presents what you listen to the
          most on Spotify so you can share it
        </div>
        <button className="primary-button" onClick={() => auth.requestAuth()}>
          Start with
          <img src={spotifyBrand} width="70px" />
        </button>
        <div className="disclaimer">
          When accessing with Spotify, your username, artists and most listened
          songs will be read. This data will not be stored anywhere other than
          on your device or sent anywhere ;)
        </div>
      </div>
    </div>
  );
}

export default Start;
