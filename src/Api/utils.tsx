import { getAlbum, getTopArtists, getTopTracks, getUserData } from "./Api";
import { Album } from "./types";

const saveDataOnLocalStorage = (name: string, data: any) => {
  localStorage.setItem("mm_" + name, JSON.stringify(data));
};

export const requestResources = async () => {
  await getUser().then((user) => {
    saveDataOnLocalStorage("user", user);
  });
  await getTopTracks(15, "long_term").then((tracks) => {
    saveDataOnLocalStorage("long_term_tracks", tracks);
  });
  await getTopTracks(15, "medium_term").then((tracks) => {
    saveDataOnLocalStorage("medium_term_tracks", tracks);
  });
  await getTopTracks(15, "short_term").then((tracks) => {
    saveDataOnLocalStorage("short_term_tracks", tracks);
  });
  await getTopArtists(15, "long_term").then((artists) => {
    saveDataOnLocalStorage("long_term_artists", artists);
  });
  await getTopArtists(15, "medium_term").then((artists) => {
    saveDataOnLocalStorage("medium_term_artists", artists);
  });
  await getTopArtists(15, "short_term").then((artists) => {
    saveDataOnLocalStorage("short_term_artists", artists);
  });
  await requestAlbums(10).then((albums) => {
    saveDataOnLocalStorage("albums", albums);
  });
  await requestGenres().then((genres) => {
    saveDataOnLocalStorage("genres", genres);
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

export const getAlbums = (limit: number) => {
  const albums = JSON.parse(localStorage.getItem("mm_albums")!);
  return albums;
};

export const getGenres = (limit: number) => {
  const genres = JSON.parse(localStorage.getItem("mm_genres")!);
  return genres;
};

export const getAlbumsAndArtistsImages = async () => {
  let images = [] as string[];
  const albums = getAlbums(10);
  const artists = getArtists("medium_term").slice(0, 10);
  albums.forEach((album: Album) => {
    images.push(album.images[0].url);
  });
  artists.forEach((artist: any) => {
    images.push(artist.images[0].url);
  });
  return images;
};

const requestGenres = async () => {
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

const requestAlbums = async (limit: number) => {
  let topAlbums = [] as Album[];
  const tracks = getTracks("long_term").slice(0, limit);
  for (let i = 0; i < tracks.length; i++) {
    const track = tracks[i];
    const album = await getAlbum(track.album.id);
    topAlbums.push(album);
  }
  return topAlbums;
};
