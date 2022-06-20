import React, { useEffect, useState } from "react";
import { Track } from "../../api/types";
import { getTracks } from "../../api/utils";
import DownloadButton from "../../components/DownloadButton/DownloadButton";
import List from "../../components/List/List";
import { Item } from "../../components/List/types";
import ScreenshotFooter from "../../components/ScreenshotFooter/ScreenshotFooter";
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
        <h3
          className="hide display-on-screenshot block"
          style={{ textAlign: "center" }}
        >
          My most listened songs
        </h3>
        <span className="time-header">
          Recently
          <small> last 4 weeks aprox</small>
          <DownloadButton selector=".short" />
        </span>
        <List items={tracks.shortTerm} />
        <ScreenshotFooter />
      </div>
      <div className="medium">
        <h3
          className="hide display-on-screenshot block"
          style={{ textAlign: "center" }}
        >
          My most listened songs
        </h3>
        <span className="time-header">
          For a while now<small> last 6 months aprox</small>
          <DownloadButton selector=".medium" />
        </span>
        <List items={tracks.mediumTerms} />
        <ScreenshotFooter />
      </div>
      <div className="long">
        <h3
          className="hide display-on-screenshot block"
          style={{ textAlign: "center" }}
        >
          My most listened songs
        </h3>
        <span className="time-header">
          Of all time
          <DownloadButton selector=".long" />
        </span>
        <List items={tracks.longTerm} />
        <ScreenshotFooter />
      </div>
    </>
  );
}

export default Songs;
