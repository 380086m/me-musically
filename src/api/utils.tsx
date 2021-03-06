import { getAlbum, getTopArtists, getTopTracks, getUserData } from "./Api";
import { Album, Artist, Genre, Track, User } from "./types";

const saveDataOnLocalStorage = (name: string, data: any) => {
  localStorage.setItem("mm_" + name, JSON.stringify(data));
};

export const requestResources = async () => {
  await getUser().then((user) => {
    saveDataOnLocalStorage("user", user);
    window.dispatchEvent(new CustomEvent("mm_user_ready"));
  });
  await getTopTracks(20, "long_term").then((tracks) => {
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
  await getTopArtists(20, "medium_term").then((artists) => {
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

export const getUser = async (): Promise<User> => {
  const user = localStorage.getItem("mm_user");
  if (user) {
    return JSON.parse(user);
  }
  return await getUserData();
};

export const getTracks = (term: string): Track[] => {
  const tracks = JSON.parse(
    localStorage.getItem("mm_" + term + "_tracks") || "[]"
  );
  return tracks;
};

export const getArtists = (term: string): Artist[] => {
  const artists = JSON.parse(
    localStorage.getItem("mm_" + term + "_artists") || "[]"
  );
  return artists;
};

export const getAlbums = (limit: number): Album[] => {
  const albums = JSON.parse(localStorage.getItem("mm_albums") || "[]");
  return albums;
};

export const getGenres = async (limit: number): Promise<Genre[]> => {
  const genres: string[] = JSON.parse(localStorage.getItem("mm_genres")!);
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

export const getAlbumsAndArtistsImages = async (
  limit: number = 10
): Promise<string[]> => {
  let images = [] as string[];
  const albums = getAlbums(limit);
  const artists = getArtists("medium_term").slice(0, limit);
  albums.forEach((album: Album) => {
    images.push(album.images[0].url);
  });
  artists.forEach((artist: any) => {
    images.push(artist.images[0].url);
  });
  return images;
};

const requestGenres = async (): Promise<string[]> => {
  const artists: Artist[] = getArtists("medium_term");
  const genres = [] as string[];
  artists.forEach((artist: Artist) => {
    if (artist.genres.length > 0) {
      genres.push(artist.genres[0]);
    }
  });
  return genres;
};

export const requestAlbums = async (limit: number): Promise<Album[]> => {
  const topTracks: Track[] = JSON.parse(
    localStorage.getItem("mm_long_term_tracks")!
  );
  const albumsCount = topTracks.reduce((acc, track) => {
    if (acc[track.album.name]) {
      acc[track.album.name].count!++;
    } else {
      acc[track.album.name] = {
        count: 1,
        id: track.album.id,
      };
    }
    return acc;
  }, {} as { [key: string]: { count: number; id: string } });
  const mappedAlbums = Object.keys(albumsCount).map((album) => {
    return albumsCount[album];
  });
  mappedAlbums.sort((a, b) => {
    return b.count - a.count;
  });
  const albums = [] as Album[];
  for (let i = 0; i < mappedAlbums.length; i++) {
    const element = mappedAlbums[i];
    const album = await getAlbum(element.id);
    albums.push(album);
  }
  return albums.slice(0, limit);
};
