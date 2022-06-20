import React from "react";
import "./DownloadButton.sass";
import downloadButton from "../../assets/download.png";
import { DownloadButtonProps } from "./types";
import { takeScreenshot } from "../../utils";

const takeScreenshotOfElement = async (selector: string) => {
  const element = document.querySelector(selector) as HTMLElement;
  const screenshot = await takeScreenshot(element!);
  return screenshot;
};

function DownloadButton(props: DownloadButtonProps) {
  return (
    <button
      className="download-button hide-on-screenshot"
      onClick={() => {
        takeScreenshotOfElement(props.selector);
      }}
    >
      <img src={downloadButton} width={25} alt="" />
    </button>
  );
}

export default DownloadButton;
