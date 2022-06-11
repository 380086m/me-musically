import { getAlbumsAndArtistsImages } from "./api/utils";

export const setArtistOrAlbumBackground = async () => {
  const images = await getAlbumsAndArtistsImages();
  document.body.style.backgroundImage = `url(${
    images[Math.floor(Math.random() * images.length)]
  })`;
  document.body.style.backgroundBlendMode = "multiply";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundSize = "cover";
};
