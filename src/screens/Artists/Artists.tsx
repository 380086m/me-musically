import React, { useEffect, useState } from "react";
import { Artist } from "../../api/types";
import { getArtists } from "../../api/utils";
import DownloadButton from "../../components/DownloadButton/DownloadButton";
import List from "../../components/List/List";
import { Item } from "../../components/List/types";
import ScreenshotFooter from "../../components/ScreenshotFooter/ScreenshotFooter";
import Showcase from "../../components/Showcase/Showcase";
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
      <div className="short">
        <Showcase
          list={<List items={artists.shortTerm} />}
          header="Recently"
          smallHeader="last 4 weeks"
          selectorToDownload=".short"
          screenshotHeader="My most listened artists"
        />
      </div>
      <div className="medium">
        <Showcase
          list={<List items={artists.shortTerm} />}
          header="For a while now"
          smallHeader="last 6 months"
          selectorToDownload=".medium"
          screenshotHeader="My most listened artists"
        />
      </div>
      <div className="long">
        <Showcase
          list={<List items={artists.longTerm} />}
          header="Since ever"
          selectorToDownload=".long"
          screenshotHeader="My most listened artists"
        />
      </div>
    </>
  );
}

export default Artists;
