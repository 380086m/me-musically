import { getAlbum, getTopArtists, getTopTracks, getUserData } from "./Api";
import { Album, Artist, Track } from "./types";

const saveDataOnLocalStorage = (name: string, data: any) => {
  localStorage.setItem("mm_" + name, JSON.stringify(data));
};

export const requestResources = async () => {
  await getUser().then((user) => {
    saveDataOnLocalStorage("user", user);
    window.dispatchEvent(new CustomEvent("mm_user_ready"));
  });
  await getTopTracks(15, "long_term").then((tracks) => {
    saveDataOnLocalStorage("long_term_tracks", tracks);
  });
  await getTopTracks(15, "medium_term").then((tracks) => {
    saveDataOnLocalStorage("medium_term_tracks", tracks);
  });
  await getTopTracks(15, "short_term").then((tracks) => {
    saveDataOnLocalStorage("short_term_tracks", tracks);
    window.dispatchEvent(new CustomEvent("mm_tracks_ready"));
  });
  await getTopArtists(15, "long_term").then((artists) => {
    saveDataOnLocalStorage("long_term_artists", artists);
  });
  await getTopArtists(30, "medium_term").then((artists) => {
    saveDataOnLocalStorage("medium_term_artists", artists);
  });
  await getTopArtists(15, "short_term").then((artists) => {
    saveDataOnLocalStorage("short_term_artists", artists);
    window.dispatchEvent(new CustomEvent("mm_artists_ready"));
  });
  await requestAlbums(10).then((albums) => {
    saveDataOnLocalStorage("albums", albums);
    window.dispatchEvent(new CustomEvent("mm_albums_ready"));
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
  const artists: Artist[] = getArtists("medium_term");
  const genres = [] as string[];
  artists.forEach((artist: Artist) => {
    if (artist.genres.length > 0) {
      genres.push(artist.genres[0]);
    }
  });
  return genres;
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
