import { getAlbumsAndArtistsImages } from "./api/utils";
import * as htmlToImage from "html-to-image";
import Loader from "./components/Loader/Loader";

export const setRandomBackground = async () => {
  const images = await getAlbumsAndArtistsImages();
  document.body.style.backgroundImage = `url(${
    images[Math.floor(Math.random() * images.length)]
  })`;
  document.body.style.backgroundBlendMode = "overlay";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundSize = "cover";
};

export const takeScreenshot = async (node: HTMLElement, name: string) => {
  node.classList.add("screenshot");
  const dataUrl = await htmlToImage.toPng(node!);
  const img = new Image();
  img.src = dataUrl;
  //download image
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = name;
  a.click();
  a.remove();
  node.classList.remove("screenshot");

  return dataUrl;
};

export const showLoader = () => {
  console.log("s");
  const laoder = document.getElementById("loader") as HTMLElement;
  laoder.classList.remove("hidden");
  console.log("f");
};

export const hideLoader = () => {
  const laoder = document.getElementById("loader") as HTMLElement;
  laoder.classList.add("hidden");
};
