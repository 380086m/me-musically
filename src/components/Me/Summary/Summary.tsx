import React, { useEffect, useState } from "react";
import { getTopTracks } from "../../../Api/Api";
import { Track } from "../../../Api/types";
import { getTracks } from "../utils";
import "./Summary.sass";

function Summary() {
  const [tracks, setTracks] = useState([] as Track[]);

  const getData = async () => {
    const tracks = await getTracks("long_term");
    console.log(tracks);
    setTracks(tracks);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {tracks.length > 0 && (
        <div className="summary">
          {tracks.map((track, index) => (
            <div className="track" key={index}>
              <img src={track.album.images[0].url} alt="" />
              <p className="name">{track.name}</p>
              <p className="artist">{track.artists[0].name}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Summary;
