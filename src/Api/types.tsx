export interface Artist {
  external_urls: {
    spotify: string;
  };
  genres: string[];
  images: {
    url: string;
  }[];
  name: string;
}

export interface Track {
  album: {
    id: string;
    images: {
      url: string;
    }[];
    name: string;
  };
  artists: Artist[];
  external_urls: {
    spotify: string;
  };
  name: string;
}

export interface Album {
  artists: Artist[];
  external_urls: {
    spotify: string;
  };
  images: {
    url: string;
  }[];
  name: string;
}

export interface User {
  display_name: string;
}

export interface Genre {
  text: string;
  number: number;
  percentage: number | undefined;
}
