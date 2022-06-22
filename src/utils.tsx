import { getAlbumsAndArtistsImages } from "./api/utils";
import * as htmlToImage from "html-to-image";

export const getRandomBackground = async () => {
  const images = await getAlbumsAndArtistsImages(3);
  return images[Math.floor(Math.random() * images.length)];
};

export const setDocumentBackground = async () => {
  document.body.style.backgroundImage = `url(${await getRandomBackground()})`;
  document.body.style.backgroundBlendMode = "overlay";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundSize = "cover";
};

export const takeScreenshot = async (node: HTMLElement, name: string) => {
  node.classList.add("screenshot");
  node.style.backgroundImage = `url(${await getRandomBackground()})`;
  node.style.backgroundBlendMode = "multiply";
  const dataUrl = await htmlToImage.toPng(node!);
  const img = new Image();
  img.src = dataUrl;
  //download image
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = name;
  a.click();
  a.remove();
  node.style.backgroundImage = "unset";
  node.style.backgroundBlendMode = "unset";
  node.classList.remove("screenshot");

  return dataUrl;
};

export const showLoader = () => {
  const loader = document.getElementById("loader") as HTMLElement;
  loader.classList.remove("hidden");
};

export const hideLoader = () => {
  const loader = document.getElementById("loader") as HTMLElement;
  loader.classList.add("hidden");
};
