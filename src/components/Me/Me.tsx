import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopArtists, getTopTracks } from "../../Api/Api";
import { Artist, Track, User } from "../../Api/types";
import { getUser } from "../../Api/utils";
import Avatar from "../Avatar/Avatar";
import Showcase from "../Showcase/Showcase";
import "./Me.sass";

function Me() {
  const [user, setUser] = useState({} as User);
  const [topTracks, setTopTracks] = useState([] as Track[]);
  const [topArtists, setTopArtists] = useState([] as Artist[]);

  const getResources = async () => {
    const user = (await getUser()) as User;
    setUser(user);
    const topTracks = await getTopTracks(50, "long_term");
    setTopTracks(topTracks.slice(0, 4));
    const topArtists = await getTopArtists(50, "long_term");
    setTopArtists(topArtists.slice(0, 4));
  };

  useEffect(() => {
    getResources();
  }, []);

  return (
    <>
      {topTracks.length > 0 && topArtists.length > 0 && (
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
      )}
    </>
  );
}

export default Me;
