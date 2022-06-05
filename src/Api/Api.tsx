import { Album, Artist } from "./types";
import { Auth } from "../Auth/Auth";

export const apiBaseUrl = "https://api.spotify.com/v1";
export const auth = Auth.getInstance();

export const get = async (url: string) => {
  const accessToken = await auth.getAccessToken();
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.json();
};

export const getTopArtists = async (
  limit: number = 30,
  time_range: string = "long_term"
): Promise<Artist[]> => {
  const url = `${apiBaseUrl}/me/top/artists?limit=${limit}&time_range=${time_range}`;
  const data = await get(url);
  return data.items;
};

export const getTopTracks = async (
  limit: number = 30,
  time_range: string = "long_term"
): Promise<Album[]> => {
  const url = `${apiBaseUrl}/me/top/tracks?limit=${limit}&time_range=${time_range}`;
  const data = await get(url);
  return data.items;
};

export const getTrack = async (id: string): Promise<Album> => {
  const url = `${apiBaseUrl}/tracks/${id}`;
  const data = await get(url);
  return data;
};

export const getAlbum = async (id: string): Promise<Album> => {
  const url = `${apiBaseUrl}/albums/${id}`;
  const data = await get(url);
  return data;
};

export const getArtist = async (id: string): Promise<Artist> => {
  const url = `${apiBaseUrl}/artists/${id}`;
  const data = await get(url);
  return data;
};

export const getUser = async (): Promise<any> => {
  const url = `${apiBaseUrl}/me`;
  const data = await get(url);
  return data;
};
