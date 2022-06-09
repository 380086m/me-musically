import {
  getAlbum,
  getTopArtists,
  getTopTracks,
  getUserData,
} from "../../Api/Api";
import { Album, Track } from "../../Api/types";

const saveDataOnLocalStorage = (name: string, data: any) => {
  localStorage.setItem("mm_" + name, JSON.stringify(data));
};

export const requestResources = async () => {
  await getUser().then((user) => {
    saveDataOnLocalStorage("user", user);
  });
  await getTopTracks(50, "long_term").then((tracks) => {
    saveDataOnLocalStorage("long_term_tracks", tracks);
  });
  await getTopTracks(50, "medium_term").then((tracks) => {
    saveDataOnLocalStorage("medium_term_tracks", tracks);
  });
  await getTopTracks(50, "short_term").then((tracks) => {
    saveDataOnLocalStorage("short_term_tracks", tracks);
  });
  await getTopArtists(50, "long_term").then((artists) => {
    saveDataOnLocalStorage("long_term_artists", artists);
  });
  await getTopArtists(50, "medium_term").then((artists) => {
    saveDataOnLocalStorage("medium_term_artists", artists);
  });
  await getTopArtists(50, "short_term").then((artists) => {
    saveDataOnLocalStorage("short_term_artists", artists);
  });
};

export const getUser = async () => {
  const user = localStorage.getItem("mm_user");
  if (user) {
    return JSON.parse(user);
  }
  return await getUserData();
};

export const getTracks = (term: string) => {
  const tracks = JSON.parse(
    localStorage.getItem("mm_" + term + "_tracks") || "[]"
  );
  return tracks;
};

export const getArtists = (term: string) => {
  const artists = JSON.parse(
    localStorage.getItem("mm_" + term + "_artists") || "[]"
  );
  return artists;
};

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
