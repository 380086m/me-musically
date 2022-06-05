import { apiBaseUrl, auth } from "./ApiConstants";

export const getTopArtists = async (limit: number = 30): Promise<any[]> => {
  const accessToken = await auth.getAccessToken();
  const response = await fetch(`${apiBaseUrl}/me/top/artists?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data.items;
};
