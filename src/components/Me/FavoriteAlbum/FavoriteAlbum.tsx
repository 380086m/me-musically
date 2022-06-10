import React, { useEffect, useState } from "react";
import { Album, Artist, Track, User } from "../../../Api/types";
import { getTopAlbums, getUser } from "../../../Api/utils";
import "./FavoriteAlbum.sass";

function FavoriteAlbum() {
  const [user, setUser] = useState({} as User);

  const [album, setAlbum] = useState([] as Album[]);

  const getResources = async () => {
    getUser().then((user) => {
      setUser(user);
    });
    setAlbum(await getTopAlbums(1));
  };

  useEffect(() => {
    getResources();
  }, []);

  return (
    <>
      <div className="favorite-album">
        <p className="header">My favorite album is</p>
        <img src={album[0].images[0].url} alt="" />
        <p className="name">{album[0].name}</p>
        <p className="artist">{album[0].artists[0].name || ""}</p>
      </div>
    </>
  );
}

export default FavoriteAlbum;
