import { Album, Artist } from "./types";
import { Auth } from "../Auth/Auth";

export const apiBaseUrl = "https://api.spotify.com/v1";
export const auth = Auth.getInstance();

export const getTopArtists = async (
  limit: number = 30,
  time_range: string = "long_term"
): Promise<Artist[]> => {
  const accessToken = await auth.getAccessToken();
  console.log(accessToken);
  const response = await fetch(
    `${apiBaseUrl}/me/top/artists?limit=${limit}&time_range=${time_range}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();
  return data.items;
};

export const getTopTracks = async (
  limit: number = 30,
  time_range: string = "long_term"
): Promise<Album[]> => {
  const accessToken = await auth.getAccessToken();
  console.log(accessToken);
  const response = await fetch(
    `${apiBaseUrl}/me/top/tracks?limit=${limit}&time_range=${time_range}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();
  return data.items;
};
