import React from "react";
import "./DownloadButton.sass";
import downloadButton from "../../assets/download.png";
import { DownloadButtonProps } from "./types";
import { hideLoader, showLoader, takeScreenshot } from "../../utils";

const takeScreenshotOfElement = async (selector: string, name: string) => {
  await showLoader();
  const element = document.querySelector(selector) as HTMLElement;
  await takeScreenshot(element!, name);
  await hideLoader();
};

function DownloadButton(props: DownloadButtonProps) {
  return (
    <button
      className="download-button hide-on-screenshot"
      onClick={() => {
        takeScreenshotOfElement(props.selector, props.name);
      }}
    >
      <img src={downloadButton} width={25} alt="" />
    </button>
  );
}

export default DownloadButton;
