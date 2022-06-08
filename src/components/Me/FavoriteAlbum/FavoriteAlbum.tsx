import React, { useEffect, useState } from "react";
import { getAlbum, getTopTracks, getUser } from "../../../Api/Api";
import { Album, Artist, Track, User } from "../../../Api/types";
import { getMostRepitedAlbum } from "../utils";
import "./FavoriteAlbum.sass";

function FavoriteAlbum() {
  const [user, setUser] = useState({} as User);

  const [album, setAlbum] = useState({} as Album);

  const getResources = async () => {
    getUser().then((user) => {
      setUser(user);
    });
    setAlbum(await getMostRepitedAlbum());
  };

  useEffect(() => {
    getResources();
  }, []);

  return (
    <>
      <div className="favorite-album">
        <p className="header">My favorite album is</p>
        <img src={album.images[0].url} alt="" />
        <p className="name">{album.name}</p>
        <p className="artist">{album.artists[0].name || ""}</p>
      </div>
    </>
  );
}

export default FavoriteAlbum;
