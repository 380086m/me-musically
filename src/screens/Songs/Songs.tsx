import React, { useEffect, useState } from "react";
import { Track } from "../../api/types";
import { getTracks } from "../../api/utils";
import List from "../../components/List/List";
import { Item } from "../../components/List/types";
import { setArtistOrAlbumBackground } from "../../utils";
import "./Songs.sass";

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
        }))
    );
    setMediumTermSongs(
      await getTracks("medium_term")
        .slice(0, 10)
        .map((song: Track) => ({
          imageUrl: song.album.images[0].url,
          text: song.name,
        }))
    );
    setLongTermSongs(
      await getTracks("long_term")
        .slice(0, 10)
        .map((song: Track) => ({
          imageUrl: song.album.images[0].url,
          text: song.name,
        }))
    );
  };

  useEffect(() => {
    getData();
    setArtistOrAlbumBackground();
  }, []);

  return (
    <>
      <h3 style={{ textAlign: "center" }}>My most listened songs</h3>
      <h5>Of all time</h5>
      <List items={longTermSongs} />
      <h5>For a while now</h5>
      <List items={mediumTermSongs} />
      <h5>Recently</h5>
      <List items={shortTermSongs} />
    </>
  );
}

export default Songs;