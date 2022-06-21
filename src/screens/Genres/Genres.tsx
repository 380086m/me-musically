import React, { useEffect, useState } from "react";
import { getGenres } from "../../api/utils";
import List from "../../components/List/List";
import { Item } from "../../components/List/types";
import Showcase from "../../components/Showcase/Showcase";
import { getText } from "../../translate/texts";
import { setRandomBackground } from "../../utils";
import "../Screens.sass";

function Genres() {
  const [genres, setGenres] = useState([] as Item[]);

  const getData = async () => {
    const genres = await getGenres(20);
    setGenres(
      genres.map((genre) => ({
        text: genre.text,
        small: `${genre.percentage!.toFixed(2)}%`,
        href: `https://open.spotify.com/search/${genre.text}`,
      }))
    );
  };

  useEffect(() => {
    getData();
    setRandomBackground();
  }, []);

  return (
    <>
      <div className="genres">
        <Showcase
          list={<List items={genres} ordened={true} />}
          selectorToDownload=".genres"
          header={getText("genresHeader")}
        />
      </div>
    </>
  );
}

export default Genres;
