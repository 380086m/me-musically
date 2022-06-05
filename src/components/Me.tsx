import React from "react";
import { getTopArtists, getTopTracks } from "../Api/Api";

const get = async () => {
  const artists = await getTopTracks(10, "short_term");
  console.log(artists);
};
function Me() {
  return (
    <>
      <button
        onClick={() => {
          get();
        }}
      >
        get
      </button>
    </>
  );
}

export default Me;
