interface Texts {
  meRouteName: string;
  artistsRouteName: string;
  songsRouteName: string;
  albumsRouteName: string;
  genresRouteName: string;
  navbarDisconnect: string;
  navbarDisconnectConfirm: string;
  albumsHeader: string;
  artistsHeader: string;
  genresHeader: string;
  meText1: string;
  meText2: string;
  meText3: string;
  meText4: string;
  meText5: string;
  meText6: string;
  meText7: string;
  meText8: string;
  meText9: string;
  meText10: string;
  meText11: string;
  meText12: string;
  songsHeader: string;
  startDescription: string;
  startButton: string;
  startDisclaimer: string;
  shortTermText: string;
  mediumTermText: string;
  longTermText: string;
  shortTermDescription: string;
  mediumTermDescription: string;
}

const texts = {
  es: {
    meRouteName: "yo",
    artistsRouteName: "mis artistas",
    songsRouteName: "mis canciones",
    albumsRouteName: "mis álbumes",
    genresRouteName: "mis géneros",
    navbarDisconnect: "Desconectar",
    navbarDisconnectConfirm: "¿Estás seguro de que quieres desconectar?",
    albumsHeader: "Mis álbumes más escuchados",
    artistsHeader: "Mis artistas favoritos",
    genresHeader: "Mis géneros favoritos",
    meText1: "Esto soy",
    meText2: "yo",
    meText3: "musicalmente",
    meText4: "más o menos",
    meText5: "Me gusta escuchar",
    meText6: "Aunque también me gusta escuchar",
    meText7: "Mis artistas favoritos son",
    meText8: "Algunos de mis álbumes favoritos son",
    meText9: "Recientemente he estado escuchando",
    meText10: "y ahora mismo me encanta",
    meText11: "de",
    meText12: "y",
    songsHeader: "Mis canciones más escuchadas",
    startDescription:
      "me-musically te muestra lo que escuchas en Spotify para que puedas compartirlo.",
    startButton: "Vamos!",
    startDisclaimer:
      "Cuando accedes con Spotify, compartes con la aplicación tu nombre de usuario y tus canciones y artistas más escuchados. Esta información no se guardará en ningún lugar excepto en tu dispositivo ni será enviada a ninguna parte ;)",
    shortTermText: "Recientemente",
    mediumTermText: "Desde hace un tiempo",
    longTermText: "Desde siempre",
    shortTermDescription: "últimas 4 semanas",
    mediumTermDescription: "últimos 6 meses",
  } as Texts,
  en: {
    navbarDisconnect: "Disconnect",
    navbarDisconnectConfirm: "Are you sure you want to disconnect?",
    albumsHeader: "My most listened albums",
    artistsHeader: "My favorite artists",
    genresHeader: "My favorite genres",
    meText1: "This is",
    meText2: "me",
    meText3: "musically",
    meText4: "sort of",
    meText5: "I listen to",
    meText6: "But also like to listen to",
    meText7: "My favorite artists are",
    meText8: "Some of my favorite albums are",
    meText9: "Recently I'm listening to",
    meText10: "and right now I'm obsessed with",
    meText11: "by",
    meText12: "and",
    songsHeader: "My most listened songs",
    startDescription:
      "me-musically display what you listen to the most on Spotify so you can share it with your friends.",
    startButton: "Start with",
    startDisclaimer:
      "When accessing with Spotify, your username, artists and most listened songs will be read. This data will not be stored anywhere other than on your device or sent anywhere ;)",
    shortTermText: "Recently",
    mediumTermText: "From a while ago",
    longTermText: "From forever",
    shortTermDescription: "last 4 weeks",
    mediumTermDescription: "last 6 months",
  } as Texts,
};

const language = "es";

export const getText = (key: keyof Texts): string => {
  return texts[language][key];
};
