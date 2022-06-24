import React, { useEffect, useState } from "react";
import { Track } from "../../api/types";
import { getTracks } from "../../api/utils";
import List from "../../components/List/List";
import { Item } from "../../components/List/types";
import Showcase from "../../components/Showcase/Showcase";
import { getText } from "../../texts/texts";
import "../Screens.sass";

function Songs() {
  const [tracks, setTracks] = useState({
    longTerm: [] as Item[],
    mediumTerms: [] as Item[],
    shortTerm: [] as Item[],
  });
  const getData = async () => {
    const shortTerm = await getTracks("short_term")
      .slice(0, 10)
      .map((song: Track) => ({
        imageUrl: song.album.images[0].url,
        text: song.name,
        small: song.artists[0].name,
        href: song.external_urls.spotify,
      }));
    const mediumTerm = await getTracks("medium_term")
      .slice(0, 10)
      .map((song: Track) => ({
        imageUrl: song.album.images[0].url,
        text: song.name,
        small: song.artists[0].name,
        href: song.external_urls.spotify,
      }));
    const longTerm = await getTracks("long_term")
      .slice(0, 10)
      .map((song: Track) => ({
        imageUrl: song.album.images[0].url,
        text: song.name,
        small: song.artists[0].name,
        href: song.external_urls.spotify,
      }));
    setTracks({
      longTerm,
      mediumTerms: mediumTerm,
      shortTerm,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h3 style={{ textAlign: "center" }}>{getText("songsHeader")}</h3>
      <div className="short">
        <Showcase
          list={<List items={tracks.shortTerm} />}
          header={getText("shortTermText")}
          smallHeader={getText("shortTermDescription")}
          selectorToDownload=".short"
          screenshotHeader={getText("songsHeader")}
        />
      </div>
      <div className="medium">
        <Showcase
          list={<List items={tracks.mediumTerms} />}
          header={getText("mediumTermText")}
          smallHeader={getText("mediumTermDescription")}
          selectorToDownload=".medium"
          screenshotHeader={getText("songsHeader")}
        />
      </div>
      <div className="long">
        <Showcase
          list={<List items={tracks.longTerm} />}
          header={getText("longTermText")}
          selectorToDownload=".long"
          screenshotHeader={getText("songsHeader")}
        />
      </div>
    </>
  );
}

export default Songs;
