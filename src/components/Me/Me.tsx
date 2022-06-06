import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const [topTracksImages, setTopTracksImages] = useState([] as string[]);
  const [topArtistsImages, setTopArtistsImages] = useState([] as string[]);

  const getResources = async () => {
    await getUser().then((user) => {
      setUser(user);
    });
    await getTopTracks(4, "short_term").then((tracks) => {
      let tracksImages = tracks.map((track) => track.album.images[0].url);
      console.log(tracksImages);
      setTopTracksImages(tracksImages);
    });
    await getTopArtists(4, "short_term").then((artists) => {
      let artistsImages = artists.map((artist) => artist.images[0].url);
      setTopArtistsImages(artistsImages);
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
        <Showcase header="Songs" images={topTracksImages}></Showcase>
        <Showcase
          header="Artists and bands"
          images={topArtistsImages}
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
