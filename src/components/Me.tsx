import React from "react";
import { getTopArtists, getTopTracks } from "../Api/Api";

const get = async () => {
  const artists = await getTopTracks();
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
