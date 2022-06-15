import React, { useEffect, useState } from "react";
import { Artist } from "../../api/types";
import { getArtists } from "../../api/utils";
import List from "../../components/List/List";
import { Item } from "../../components/List/types";
import { setRandomBackground } from "../../utils";
import "../Screens.sass";

function Artists() {
  const [artists, setArtists] = useState({
    longTerm: [] as Item[],
    mediumTerms: [] as Item[],
    shortTerm: [] as Item[],
  });

  const getData = async () => {
    const shortTermArtists: Item[] = await getArtists("short_term")
      .slice(0, 10)
      .map((artist: Artist) => ({
        imageUrl: artist.images[0].url,
        text: artist.name,
        href: artist.external_urls.spotify,
      }));
    const mediumTermArtists: Item[] = await getArtists("medium_term")
      .slice(0, 10)
      .map((artist: Artist) => ({
        imageUrl: artist.images[0].url,
        text: artist.name,
        href: artist.external_urls.spotify,
      }));
    const longTermArtists: Item[] = await getArtists("long_term")
      .slice(0, 10)
      .map((artist: Artist) => ({
        imageUrl: artist.images[0].url,
        text: artist.name,
        href: artist.external_urls.spotify,
      }));
    setArtists({
      longTerm: longTermArtists,
      mediumTerms: mediumTermArtists,
      shortTerm: shortTermArtists,
    });
  };

  useEffect(() => {
    getData();
    setRandomBackground();
  }, []);

  return (
    <>
      <h3 style={{ textAlign: "center" }}>My most listened artists</h3>
      <span className="time-header">
        Recently
        <small> last 4 weeks aprox</small>
      </span>
      <List items={artists.shortTerm} />
      <span className="time-header">
        For a while now<small> last 6 months aprox</small>
      </span>
      <List items={artists.mediumTerms} />
      <span className="time-header">Of all time</span>
      <List items={artists.longTerm} />
    </>
  );
}

export default Artists;
