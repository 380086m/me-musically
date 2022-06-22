import React, { useEffect, useState } from "react";
import { Artist } from "../../api/types";
import { getArtists } from "../../api/utils";
import List from "../../components/List/List";
import { Item } from "../../components/List/types";
import Showcase from "../../components/Showcase/Showcase";
import { getText } from "../../translate/texts";
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
  }, []);

  return (
    <>
      <h3 style={{ textAlign: "center" }}> {getText("artistsHeader")}</h3>
      <div className="short">
        <Showcase
          list={<List items={artists.shortTerm} />}
          header={getText("shortTermText")}
          smallHeader={getText("shortTermDescription")}
          selectorToDownload=".short"
          screenshotHeader={getText("artistsHeader")}
        />
      </div>
      <div className="medium">
        <Showcase
          list={<List items={artists.shortTerm} />}
          header={getText("mediumTermText")}
          smallHeader={getText("mediumTermDescription")}
          selectorToDownload=".medium"
          screenshotHeader={getText("artistsHeader")}
        />
      </div>
      <div className="long">
        <Showcase
          list={<List items={artists.longTerm} />}
          header={getText("longTermText")}
          selectorToDownload=".long"
          screenshotHeader={getText("artistsHeader")}
        />
      </div>
    </>
  );
}

export default Artists;
