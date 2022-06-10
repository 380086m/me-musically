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
      <div className="summary-content">
        <div className="summary">
          {longTermArtists.length > 0 &&
            shortTermArtist.length > 0 &&
            longTermTracks.length > 0 &&
            shortTermTracks.length > 0 && (
              <>
                <h4>That's me, musically</h4>
                <p>
                  I'm <ItemText text={user.display_name} />. I listen to{" "}
                  <ItemText text={topGenres[0]} />,{" "}
                  <ItemText text={topGenres[1]} />,{" "}
                  <ItemText text={topGenres[2]} />, but also like to listen to{" "}
                  <ItemText text={topGenres[3]} />,{" "}
                  <ItemText text={topGenres[4]} /> and{" "}
                  <ItemText text={topGenres[5]} />.
                </p>
                <p>
                  My favorite artists are{" "}
                  <ItemText
                    text={longTermArtists[0].name}
                    imageUrl={longTermArtists[0].images[0].url}
                  />
                  ,{" "}
                  <ItemText
                    text={longTermArtists[1].name}
                    imageUrl={longTermArtists[1].images[0].url}
                  />{" "}
                  and{" "}
                  <ItemText
                    text={longTermArtists[2].name}
                    imageUrl={longTermArtists[2].images[0].url}
                  />
                  .
                </p>
                <p>
                  Recently I'm listening to{" "}
                  <ItemText
                    text={shortTermArtist[0].name}
                    imageUrl={shortTermArtist[0].images[0].url}
                  />
                  ,{" "}
                  <ItemText
                    text={shortTermArtist[1].name}
                    imageUrl={shortTermArtist[1].images[0].url}
                  />{" "}
                  and{" "}
                  <ItemText
                    text={shortTermArtist[2].name}
                    imageUrl={shortTermArtist[2].images[0].url}
                  />{" "}
                  and right now I'm obsessed with{" "}
                  <ItemText
                    text={shortTermTracks[0].name}
                    imageUrl={shortTermTracks[0].album.images[0].url}
                  />{" "}
                  by <ItemText text={shortTermTracks[0].artists[0].name} />.{" "}
                </p>
              </>
            )}
        </div>
      </div>
    </>
  );
}

export default Summary;
