import React, { useEffect, useState } from "react";
import { Album, Artist, Track, User } from "../../api/types";
import {
  getAlbums,
  getAlbumsAndArtistsImages,
  getArtists,
  getGenres,
  getTracks,
  getUser,
} from "../../api/utils";
import ItemText from "../../components/ItemText/ItemText";
import { setRandomBackground } from "../../utils";
import "../Screens.sass";

function Me() {
  const [data, setData] = useState({
    longTermArtists: [] as Artist[],
    shortTermArtists: [] as Artist[],
    longTermTracks: [] as Track[],
    shortTermTracks: [] as Track[],
    topAlbums: [] as Album[],
    topGenres: [] as string[],
    user: {} as User,
  });

  const getData = async () => {
    setData({
      longTermArtists: getArtists("long_term"),
      shortTermArtists: getArtists("short_term"),
      longTermTracks: getTracks("long_term"),
      shortTermTracks: getTracks("short_term"),
      topAlbums: getAlbums(3),
      topGenres: getGenres(5),
      user: await getUser(),
    });
  };

  const disconnect = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  useEffect(() => {
    getData();
    setRandomBackground();
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
                  This is <span>me</span>, musically <small>(kind of)</small>{" "}
                </h4>
                <p>
                  {/* I'm <ItemText text={data.user.display_name} />. */}I
                  listen to{" "}
                  <ItemText
                    text={data.topGenres[0]}
                    href={`https://open.spotify.com/search/${data.topGenres}`}
                  />
                  ,{" "}
                  <ItemText
                    text={data.topGenres[1]}
                    href={`https://open.spotify.com/search/${data.topGenres[1]}`}
                  />{" "}
                  and{" "}
                  <ItemText
                    text={data.topGenres[2]}
                    href={`https://open.spotify.com/search/${data.topGenres[2]}`}
                  />
                  . But also like to listen to{" "}
                  <ItemText
                    text={data.topGenres[3]}
                    href={`https://open.spotify.com/search/${data.topGenres[3]}`}
                  />
                  ,{" "}
                  <ItemText
                    text={data.topGenres[4]}
                    href={`https://open.spotify.com/search/${data.topGenres[4]}`}
                  />{" "}
                  and{" "}
                  <ItemText
                    text={data.topGenres[5]}
                    href={`https://open.spotify.com/search/${data.topGenres[5]}`}
                  />
                  .
                </p>
                <p>
                  My favorite artists are{" "}
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
                  />{" "}
                  and{" "}
                  <ItemText
                    text={data.longTermArtists[2].name}
                    imageUrl={data.longTermArtists[2].images[0].url}
                    href={data.longTermArtists[2].external_urls.spotify}
                  />
                  .
                </p>
                <p>
                  Some of my favorite albums are{" "}
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
                  />{" "}
                  and{" "}
                  <ItemText
                    text={data.topAlbums[2].name}
                    imageUrl={data.topAlbums[2].images[0].url}
                    href={data.topAlbums[2].external_urls.spotify}
                  />
                </p>
                <p>
                  Recently I'm listening to{" "}
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
                  />{" "}
                  and{" "}
                  <ItemText
                    text={data.shortTermArtists[2].name}
                    imageUrl={data.shortTermArtists[2].images[0].url}
                    href={data.shortTermArtists[2].external_urls.spotify}
                  />{" "}
                  and right now I'm obsessed with{" "}
                  <ItemText
                    text={data.shortTermTracks[0].name}
                    imageUrl={data.shortTermTracks[0].album.images[0].url}
                    href={data.shortTermTracks[0].external_urls.spotify}
                  />{" "}
                  by{" "}
                  <ItemText
                    text={data.shortTermTracks[0].artists[0].name}
                    href={
                      data.shortTermTracks[0].artists[0].external_urls.spotify
                    }
                  />
                  .{" "}
                </p>
              </>
            )}
        </div>
      </div>
    </>
  );
}

export default Me;
