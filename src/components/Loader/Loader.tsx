import React from "react";
import "./Loader.sass";
import loader from "../../assets/loader.gif";
import { LoaderProps } from "./types";

function Loader(props: LoaderProps) {
  return (
    <>
      <div
        id="loader"
        className={"loader-container" + (props.hidden ? " hidden" : "")}
      >
        <div className="loader">
          <img src={loader} alt="loader" />
          <div className="message">{props.message}</div>
        </div>
      </div>
    </>
  );
}

export default Loader;
