import React from "react";
import { Auth } from "../../auth/Auth";
import spotifyBrand from "../../assets/spotify.png";
import { getText } from "../../texts/texts";

function Start() {
  const auth = Auth.getInstance();

  return (
    <div className="start">
      <div className="container">
        <div className="description">{getText("startDescription")}</div>
        <button className="primary-button" onClick={() => auth.requestAuth()}>
          {getText("startButton")}
          <img src={spotifyBrand} width="70px" alt="Spotify logo" />
        </button>
        <div className="disclaimer">{getText("startDisclaimer")}</div>
      </div>
    </div>
  );
}

export default Start;
