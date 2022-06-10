import React, { useEffect, useState } from "react";
import { Artist, Track, User } from "../../../Api/types";
import {
  getArtists,
  getTopGenres,
  getTracks,
  getUser,
} from "../../../Api/utils";
import ItemText from "../../ItemText/ItemText";
import "./Summary.sass";

function Summary() {
  const [longTermArtists, setLongTermArtists] = useState([] as Artist[]);
  const [shortTermArtist, setShortTermArtist] = useState([] as Artist[]);
  const [mediumTermTracks, setMediumTermTracks] = useState([] as Track[]);
  const [longTermTracks, setLongTermTracks] = useState([] as Track[]);
  const [shortTermTracks, setShortTermTracks] = useState([] as Track[]);
  const [topGenres, setTopGenres] = useState([] as string[]);
  const [user, setUser] = useState({} as User);

  const getData = async () => {
    setLongTermArtists(await getArtists("long_term"));
    setMediumTermTracks(await getTracks("medium_term"));
    setShortTermArtist(await getArtists("short_term"));
    setLongTermTracks(await getTracks("long_term"));
    setShortTermTracks(await getTracks("short_term"));
    setTopGenres(await getTopGenres());
    setUser(await getUser());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="summary">
        {longTermArtists.length > 0 &&
          shortTermArtist.length > 0 &&
          longTermTracks.length > 0 &&
          shortTermTracks.length > 0 && (
            <>
              <p>
                I'm <ItemText text={user.display_name} />. I listen to{" "}
                {topGenres[0]}, {topGenres[1]} and {topGenres[2]}. But also like{" "}
                {topGenres[3]}, {topGenres[4]} and {topGenres[5]}.
              </p>
              <p>
                My favorite artists are{" "}
                <ItemText
                  text={longTermArtists[0].name}
                  imageUrl={longTermArtists[0].images[0].url}
                />{" "}
                {longTermArtists[0].name}, {longTermArtists[1].name} and{" "}
                {longTermArtists[2].name}. My most listened songs are{" "}
                {mediumTermTracks[0].name} by{" "}
                {longTermTracks[0].artists[0].name},{longTermTracks[1].name} by{" "}
                {longTermTracks[1].artists[0].name} and {longTermTracks[2].name}{" "}
                by {longTermTracks[2].artists[0].name}.
              </p>
              <p>
                Recently I'm listening to {shortTermArtist[0].name},{" "}
                {shortTermArtist[1].name} and {shortTermArtist[2].name} and
                right now I'm obsessed with {shortTermTracks[0].name} by{" "}
                {shortTermTracks[0].artists[0].name}.
              </p>
            </>
          )}
      </div>
    </>
  );
}

export default Summary;
