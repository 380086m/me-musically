import { getAlbumsAndArtistsImages } from "./api/utils";
import * as htmlToImage from "html-to-image";

export const setRandomBackground = async () => {
  const images = await getAlbumsAndArtistsImages();
  document.body.style.backgroundImage = `url(${
    images[Math.floor(Math.random() * images.length)]
  })`;
  document.body.style.backgroundBlendMode = "overlay";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundSize = "cover";
};

export const takeScreenshot = async (node: HTMLElement) => {
  node.classList.add("screenshot");
  const dataUrl = await htmlToImage.toPng(node!);
  const img = new Image();
  img.src = dataUrl;
  document.body.appendChild(img);
  node.classList.remove("screenshot");
};
