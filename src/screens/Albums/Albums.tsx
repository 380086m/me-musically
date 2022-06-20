import React, { useEffect, useState } from "react";
import { Album } from "../../api/types";
import { getAlbums } from "../../api/utils";
import DownloadButton from "../../components/DownloadButton/DownloadButton";
import List from "../../components/List/List";
import { Item } from "../../components/List/types";
import ScreenshotFooter from "../../components/ScreenshotFooter/ScreenshotFooter";
import { setRandomBackground } from "../../utils";
import "../Screens.sass";

function Albums() {
  const [albums, setAlbums] = useState([] as Item[]);

  const getData = async () => {
    setAlbums(
      await getAlbums(10).map((album: Album) => ({
        imageUrl: album.images[0].url,
        text: album.name,
        small: album.artists[0].name,
        href: album.external_urls.spotify,
      }))
    );
  };

  useEffect(() => {
    getData();
    setRandomBackground();
  }, []);

  return (
    <div className="albums">
      <h3 style={{ textAlign: "center" }}>My most listened albums</h3>
      <DownloadButton selector=".albums" />
      <List items={albums} shape="square" />
      <ScreenshotFooter />
    </div>
  );
}

export default Albums;
