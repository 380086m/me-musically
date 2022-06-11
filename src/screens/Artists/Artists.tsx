import React, { useEffect, useState } from "react";
import { Artist } from "../../api/types";
import { getArtists } from "../../api/utils";
import List from "../../components/List/List";
import { Item } from "../../components/List/types";
import { setRandomBackground } from "../../utils";
import "./Artists.sass";

function Artists() {
  const [shortTermArtists, setShortTermArtists] = useState([] as Item[]);
  const [mediumTermArtists, setMediumTermArtists] = useState([] as Item[]);
  const [longTermArtists, setLongTermArtists] = useState([] as Item[]);

  const getData = async () => {
    setShortTermArtists(
      await getArtists("short_term")
        .slice(0, 10)
        .map((artist: Artist) => ({
          imageUrl: artist.images[0].url,
          text: artist.name,
        }))
    );
    setMediumTermArtists(
      await getArtists("medium_term")
        .slice(0, 10)
        .map((artist: Artist) => ({
          imageUrl: artist.images[0].url,
          text: artist.name,
        }))
    );
    setLongTermArtists(
      await getArtists("long_term")
        .slice(0, 10)
        .map((artist: Artist) => ({
          imageUrl: artist.images[0].url,
          text: artist.name,
        }))
    );
  };

  useEffect(() => {
    getData();
    setRandomBackground();
  }, []);

  return (
    <>
      <h3 style={{ textAlign: "center" }}>My most listened artists</h3>
      <span className="time-header">Of all time</span>
      <List items={longTermArtists} />
      <span className="time-header">
        For a while now<small> last 6 months aprox</small>
      </span>
      <List items={mediumTermArtists} />
      <span className="time-header">
        Recently
        <small> last 4 weeks aprox</small>
      </span>
      <List items={shortTermArtists} />
    </>
  );
}

export default Artists;
