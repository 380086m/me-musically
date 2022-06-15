import React, { useEffect, useState } from "react";
import { Album } from "../../api/types";
import { getAlbums, getGenres } from "../../api/utils";
import List from "../../components/List/List";
import { Item } from "../../components/List/types";
import { setRandomBackground } from "../../utils";
import "../Screens.sass";

function Genres() {
  const [genres, setGenres] = useState([] as Item[]);

  const countGenres = async () => {
    const genres: string[] = await getGenres(20);
    const genresCount = genres.reduce((acc, genre) => {
      if (acc[genre]) {
        acc[genre].number++;
      } else {
        acc[genre] = { number: 1 };
      }
      acc[genre].percentage = (acc[genre].number / genres.length) * 100;
      return acc;
    }, {} as { [key: string]: { number: number; percentage?: number } });
    const mappedGenres = Object.keys(genresCount).map((genre) => ({
      text: genre,
      number: genresCount[genre].number,
      percentage: genresCount[genre].percentage,
    }));
    return mappedGenres;
  };

  const getData = async () => {
    const genres = await countGenres();
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
      <h3 style={{ textAlign: "center" }}>My most listened genres</h3>
      <List items={genres} ordened={true} />
    </>
  );
}

export default Genres;
