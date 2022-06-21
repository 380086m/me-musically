import React, { useEffect, useState } from "react";
import { Track } from "../../api/types";
import { getTracks } from "../../api/utils";
import DownloadButton from "../../components/DownloadButton/DownloadButton";
import List from "../../components/List/List";
import { Item } from "../../components/List/types";
import ScreenshotFooter from "../../components/ScreenshotFooter/ScreenshotFooter";
import Showcase from "../../components/Showcase/Showcase";
import { setRandomBackground, takeScreenshot } from "../../utils";
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
    setRandomBackground();
  }, []);

  return (
    <>
      <h3 style={{ textAlign: "center" }}>My most listened songs</h3>
      <div className="short">
        <Showcase
          list={<List items={tracks.shortTerm} />}
          header="Recently"
          smallHeader="last 4 weeks"
          selectorToDownload=".short"
          screenshotHeader="My most listened songs"
        />
      </div>
      <div className="medium">
        <Showcase
          list={<List items={tracks.mediumTerms} />}
          header="For a while now"
          smallHeader="last 6 months"
          selectorToDownload=".medium"
          screenshotHeader="My most listened songs"
        />
      </div>
      <div className="long">
        <Showcase
          list={<List items={tracks.longTerm} />}
          header="Since ever"
          selectorToDownload=".long"
          screenshotHeader="My most listened songs"
        />
      </div>
    </>
  );
}

export default Songs;
