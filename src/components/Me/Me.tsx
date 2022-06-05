import React, { useEffect, useState } from "react";
import { getTopArtists, getTopTracks, getUser } from "../../Api/Api";
import Avatar from "../Avatar/Avatar";
import Showcase from "../Showcase/Showcase";
import "./Me.sass";

function Me() {
  const [user, setUser] = useState({
    display_name: "",
    external_urls: {
      spotify: "",
    },
    followers: {
      href: "",
      total: 0,
    },
    href: "",
    id: "",
    images: [
      {
        url: "",
      },
    ],
    type: "",
    uri: "",
  });

  const [topTracks, setTopTracks] = useState([] as string[]);
  const [topArtists, setTopArtists] = useState([] as string[]);

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });
    getTopTracks(4, "long_term").then((tracks) => {
      let tracksImages = tracks.map((track) => track.album.images[0].url);
      setTopTracks(tracksImages);
    });
    getTopArtists(4, "long_term").then((artists) => {
      let artistsImages = artists.map((artist) => artist.images[0].url);
      setTopArtists(artistsImages);
    });
  }, []);

  return (
    <>
      <div className="me">
        <Avatar source={user.images[0].url}></Avatar>
        <Showcase
          header="Favorite tracks"
          images={topTracks}
          route="/favorite-tracks"
        ></Showcase>
        <Showcase
          header="Favorite artists"
          images={topArtists}
          route="/favorite-artists"
        ></Showcase>
      </div>
    </>
  );
}

export default Me;
