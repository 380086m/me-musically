import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopArtists, getTopTracks, getUser } from "../../Api/Api";
import { Artist, Track } from "../../Api/types";
import Avatar from "../Avatar/Avatar";
import Showcase from "../Showcase/Showcase";
import "./Me.sass";

function Me() {
  const [user, setUser] = useState({
    display_name: "",
    images: [
      {
        url: "",
      },
    ],
  });

  const [topTracks, setTopTracks] = useState([] as Track[]);
  const [topArtists, setTopArtists] = useState([] as Artist[]);

  const getResources = async () => {
    await getUser().then((user) => {
      setUser(user);
    });
    await getTopTracks(4, "long_term").then((tracks) => {
      setTopTracks(tracks);
    });
    await getTopArtists(4, "long_term").then((artists) => {
      setTopArtists(artists);
    });
  };

  useEffect(() => {
    getResources();
  }, []);

  return (
    <>
      <div className="me">
        <Link to="/me/summary" style={{ display: "contents" }}>
          <div className="summary">
            <Avatar source={user.images[0].url}></Avatar>
            <span className="display-name">{user.display_name}</span>
          </div>
        </Link>
        <Showcase
          header="Songs"
          images={topTracks.map((track) => track.album.images[0].url)}
        ></Showcase>
        <Showcase
          header="Artists and bands"
          images={topArtists.map((artist) => artist.images[0].url)}
        ></Showcase>
        <Showcase header="Genres"></Showcase>
        <Showcase header="Recently listened"></Showcase>
        <Link to="/me/favorite-album">
          <Showcase header="Favorite album"></Showcase>
        </Link>
      </div>
    </>
  );
}

export default Me;
