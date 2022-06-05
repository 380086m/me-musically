import React from "react";
import { getTopArtists } from "../Api/Artists";

function Me() {
  const getArtists = async () => {
    const artists = await getTopArtists();
    console.log(artists);
  };

  return (
    <>
      <button
        onClick={() => {
          getArtists();
        }}
      >
        get
      </button>
    </>
  );
}

export default Me;
