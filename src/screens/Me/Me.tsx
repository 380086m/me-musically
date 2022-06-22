import React, { useEffect, useState } from "react";
import { Album, Artist, Genre, Track, User } from "../../api/types";
import {
  getAlbums,
  getArtists,
  getGenres,
  getTracks,
  getUser,
} from "../../api/utils";
import DownloadButton from "../../components/DownloadButton/DownloadButton";
import ItemText from "../../components/ItemText/ItemText";
import ScreenshotFooter from "../../components/ScreenshotFooter/ScreenshotFooter";
import { getText } from "../../translate/texts";
import "../Screens.sass";

function Me() {
  const [data, setData] = useState({
    longTermArtists: [] as Artist[],
    shortTermArtists: [] as Artist[],
    longTermTracks: [] as Track[],
    shortTermTracks: [] as Track[],
    topAlbums: [] as Album[],
    topGenres: [] as Genre[],
    user: {} as User,
  });

  const getData = async () => {
    setData({
      longTermArtists: getArtists("long_term"),
      shortTermArtists: getArtists("short_term"),
      longTermTracks: getTracks("long_term"),
      shortTermTracks: getTracks("short_term"),
      topAlbums: getAlbums(3),
      topGenres: await getGenres(5),
      user: await getUser(),
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="summary-container">
        <div className="summary">
          {data.longTermArtists.length > 0 &&
            data.shortTermArtists.length > 0 &&
            data.longTermTracks.length > 0 &&
            data.shortTermTracks.length > 0 &&
            data.topAlbums.length > 0 && (
              <>
                <h4 className="summary-header">
                  {getText("meText1") + " "}
                  <span className="me">{getText("meText2")}</span>,
                  {" " + getText("meText3")}{" "}
                  <small>({getText("meText4")})</small>{" "}
                  <span>
                    <DownloadButton
                      selector=".summary-container"
                      name={getText("meText2") + " " + getText("meText3")}
                    />
                  </span>
                </h4>
                <div className="paragraph">
                  {getText("meText5") + " "}
                  <ItemText
                    text={data.topGenres[0].text}
                    href={`https://open.spotify.com/search/${data.topGenres[0].text}`}
                  />
                  ,{" "}
                  <ItemText
                    text={data.topGenres[1].text}
                    href={`https://open.spotify.com/search/${data.topGenres[1].text}`}
                  />{" "}
                  and{" "}
                  <ItemText
                    text={data.topGenres[2].text}
                    href={`https://open.spotify.com/search/${data.topGenres[2].text}`}
                  />
                  . {" " + getText("meText6") + " "}
                  <ItemText
                    text={data.topGenres[3].text}
                    href={`https://open.spotify.com/search/${data.topGenres[3].text}`}
                  />
                  ,{" "}
                  <ItemText
                    text={data.topGenres[4].text}
                    href={`https://open.spotify.com/search/${data.topGenres[4].text}`}
                  />
                  {" " + getText("meText12") + " "}
                  <ItemText
                    text={data.topGenres[5].text}
                    href={`https://open.spotify.com/search/${data.topGenres[5].text}`}
                  />
                  .
                </div>
                <div className="paragraph">
                  {" " + getText("meText7") + " "}
                  <ItemText
                    text={data.longTermArtists[0].name}
                    imageUrl={data.longTermArtists[0].images[0].url}
                    href={data.longTermArtists[0].external_urls.spotify}
                  />
                  ,{" "}
                  <ItemText
                    text={data.longTermArtists[1].name}
                    imageUrl={data.longTermArtists[1].images[0].url}
                    href={data.longTermArtists[1].external_urls.spotify}
                  />
                  {" " + getText("meText12") + " "}
                  <ItemText
                    text={data.longTermArtists[2].name}
                    imageUrl={data.longTermArtists[2].images[0].url}
                    href={data.longTermArtists[2].external_urls.spotify}
                  />
                  .
                </div>
                <div className="paragraph">
                  {" " + getText("meText8") + " "}
                  <ItemText
                    text={data.topAlbums[0].name}
                    imageUrl={data.topAlbums[0].images[0].url}
                    href={data.topAlbums[0].external_urls.spotify}
                  />
                  ,{" "}
                  <ItemText
                    text={data.topAlbums[1].name}
                    imageUrl={data.topAlbums[1].images[0].url}
                    href={data.topAlbums[1].external_urls.spotify}
                  />
                  {" " + getText("meText12") + " "}
                  <ItemText
                    text={data.topAlbums[2].name}
                    imageUrl={data.topAlbums[2].images[0].url}
                    href={data.topAlbums[2].external_urls.spotify}
                  />
                </div>
                <div className="paragraph">
                  {" " + getText("meText9") + " "}
                  <ItemText
                    text={data.shortTermArtists[0].name}
                    imageUrl={data.shortTermArtists[0].images[0].url}
                    href={data.shortTermArtists[0].external_urls.spotify}
                  />
                  ,{" "}
                  <ItemText
                    text={data.shortTermArtists[1].name}
                    imageUrl={data.shortTermArtists[1].images[0].url}
                    href={data.shortTermArtists[1].external_urls.spotify}
                  />
                  {" " + getText("meText12") + " "}
                  <ItemText
                    text={data.shortTermArtists[2].name}
                    imageUrl={data.shortTermArtists[2].images[0].url}
                    href={data.shortTermArtists[2].external_urls.spotify}
                  />
                  {" " + getText("meText10") + " "}
                  <ItemText
                    text={data.shortTermTracks[0].name}
                    imageUrl={data.shortTermTracks[0].album.images[0].url}
                    href={data.shortTermTracks[0].external_urls.spotify}
                  />
                  {" " + getText("meText11") + " "}
                  <ItemText
                    text={data.shortTermTracks[0].artists[0].name}
                    href={
                      data.shortTermTracks[0].artists[0].external_urls.spotify
                    }
                  />
                  .{" "}
                </div>
              </>
            )}
        </div>
        <ScreenshotFooter />
      </div>
    </>
  );
}

export default Me;
