import React, { useEffect, useState } from "react";
import { getAlbum, getTopTracks, getUser } from "../../../Api/Api";
import { Artist, Track } from "../../../Api/types";
import "./FavoriteAlbum.sass";

function FavoriteAlbum() {
  const [user, setUser] = useState({
    display_name: "",
    images: [
      {
        url: "",
      },
    ],
  });

  const [album, setAlbum] = useState({
    artists: [{}] as Artist[],
    name: "",
    images: [
      {
        url: "",
      },
    ],
  });

  const getMostRepitedAlbum = async () => {
    await getTopTracks(100, "long_term").then((tracks: Track[]) => {
      let albums = tracks.map((track) => track.album.id);
      let mostRepitedAlbum = albums.reduce((a, b) => {
        return albums.filter((album) => album === a).length >
          albums.filter((album) => album === b).length
          ? a
          : b;
      }, "");
      getAlbum(mostRepitedAlbum).then((album) => {
        setAlbum(album);
      });
    });
  };

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });
    getMostRepitedAlbum();
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
