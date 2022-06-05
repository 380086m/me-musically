import React, { useEffect, useState } from "react";
import { getTopArtists, getTopTracks, getUser } from "../../Api/Api";
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

  const [topTracks, setTopTracks] = useState([] as string[]);
  const [topArtists, setTopArtists] = useState([] as string[]);

  const getResources = async () => {
    await getUser().then((user) => {
      setUser(user);
    });
    await getTopTracks(4, "short_term").then((tracks) => {
      let tracksImages = tracks.map((track) => track.album.images[0].url);
      console.log(tracksImages);
      setTopTracks(tracksImages);
    });
    await getTopArtists(4, "short_term").then((artists) => {
      let artistsImages = artists.map((artist) => artist.images[0].url);
      setTopArtists(artistsImages);
    });
  };

  useEffect(() => {
    getResources();
  }, []);

  return (
    <>
      <div className="me">
        <div className="resume">
          <Avatar source={user.images[0].url}></Avatar>
          <span className="display-name">{user.display_name}</span>
        </div>

        <Showcase header="Songs" images={topTracks}></Showcase>
        <Showcase header="Artists and bands" images={topArtists}></Showcase>
        <Showcase header="Genres"></Showcase>
        <Showcase header="Recently listened"></Showcase>
        <Showcase header="Favorite album"></Showcase>
      </div>
    </>
  );
}

export default Me;
