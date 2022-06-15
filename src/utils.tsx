import { getAlbumsAndArtistsImages } from "./api/utils";

export const setRandomBackground = async () => {
  const images = await getAlbumsAndArtistsImages();
  // document.body.style.backgroundImage = `url(${
  //   images[Math.floor(Math.random() * images.length)]
  // })`;
  // document.body.style.backgroundBlendMode = "overlay";
  // document.body.style.backgroundAttachment = "fixed";
  // document.body.style.backgroundSize = "cover";
};
