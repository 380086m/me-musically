import React, { useEffect, useState } from "react";
import { ShowcaseProps } from "./types";
import "./Showcase.sass";
import DownloadButton from "../DownloadButton/DownloadButton";
import ScreenshotFooter from "../ScreenshotFooter/ScreenshotFooter";

function Showcase(props: ShowcaseProps) {
  useEffect(() => {}, []);

  return (
    <>
      <h3
        className="hide display-on-screenshot block"
        style={{ textAlign: "center" }}
      >
        {props.screenshotHeader}
      </h3>
      <span className="time-header">
        {props.header}
        {props.smallHeader && <small>{" " + props.smallHeader}</small>}
        {props.selectorToDownload && (
          <DownloadButton selector={props.selectorToDownload} />
        )}
      </span>
      {props.list}
      <ScreenshotFooter />
    </>
  );
}

export default Showcase;
