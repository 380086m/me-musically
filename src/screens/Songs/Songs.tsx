import React, { useEffect, useState } from "react";
import { Track } from "../../api/types";
import { getTracks } from "../../api/utils";
import List from "../../components/List/List";
import { Item } from "../../components/List/types";
import { setRandomBackground } from "../../utils";
import "../Screens.sass";

function Songs() {
  const [shortTermSongs, setShortTermSongs] = useState([] as Item[]);
  const [mediumTermSongs, setMediumTermSongs] = useState([] as Item[]);
  const [longTermSongs, setLongTermSongs] = useState([] as Item[]);

  const getData = async () => {
    setShortTermSongs(
      await getTracks("short_term")
        .slice(0, 10)
        .map((song: Track) => ({
          imageUrl: song.album.images[0].url,
          text: song.name,
          small: song.artists[0].name,
        }))
    );
    setMediumTermSongs(
      await getTracks("medium_term")
        .slice(0, 10)
        .map((song: Track) => ({
          imageUrl: song.album.images[0].url,
          text: song.name,
          small: song.artists[0].name,
        }))
    );
    setLongTermSongs(
      await getTracks("long_term")
        .slice(0, 10)
        .map((song: Track) => ({
          imageUrl: song.album.images[0].url,
          text: song.name,
          small: song.artists[0].name,
        }))
    );
  };

  useEffect(() => {
    getData();
    setRandomBackground();
  }, []);

  return (
    <>
      <h3 style={{ textAlign: "center" }}>My most listened songs</h3>
      <span className="time-header">
        Recently
        <small> last 4 weeks aprox</small>
      </span>
      <List items={shortTermSongs} />
      <span className="time-header">
        For a while now<small> last 6 months aprox</small>
      </span>
      <List items={mediumTermSongs} />
      <span className="time-header">Of all time</span>
      <List items={longTermSongs} />
    </>
  );
}

export default Songs;
