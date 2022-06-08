import { getAlbum, getTopArtists, getTopTracks } from "../../Api/Api";
import { Album, Track } from "../../Api/types";

export const getTopGenres = async () => {
  let mostListenedGenres = [] as string[];
  await getTopArtists(100, "long_term").then((artists) => {
    let genres = artists.reduce((acc, artist) => {
      return artist.genres.concat([...acc]);
    }, [] as string[]);
    let genresCount = genres.reduce((acc, genre) => {
      if (acc[genre]) {
        acc[genre]++;
      } else {
        acc[genre] = 1;
      }
      return acc;
    }, {} as { [key: string]: number });
    let genresCountSorted = Object.keys(genresCount)
      .sort((a, b) => genresCount[b] - genresCount[a])
      .slice(0, 10);
    mostListenedGenres = genresCountSorted;
  });
  return mostListenedGenres;
};

export const getMostRepitedAlbum = async () => {
  let album = {} as Album;
  await getTopTracks(100, "long_term").then((tracks: Track[]) => {
    let albums = tracks.map((track) => track.album.id);
    let mostRepitedAlbum = albums.reduce((a, b) => {
      return albums.filter((album) => album === a).length >
        albums.filter((album) => album === b).length
        ? a
        : b;
    }, "");
    getAlbum(mostRepitedAlbum).then((album) => {
      album = album;
    });
  });
  return album;
};
