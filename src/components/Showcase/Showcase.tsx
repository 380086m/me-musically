import React, { useEffect, useState } from "react";
import { ShowcaseProps } from "./types";
import "./Showcase.sass";
import logo from "../../assets/logo.png";

function Showcase(props: ShowcaseProps) {
  useEffect(() => {}, []);

  return (
    <>
      <div
        className={
          "showcase " +
          "background-" +
          Math.floor(1 + Math.random() * (9 - 1 + 1))
        }
      >
        <h3 className="head-text">{props.header}</h3>
        <div className="showcase-images">
          {props.images ? (
            props.images.map((image) => <img key={image} src={image} />)
          ) : (
            <img style={{ opacity: 0 }} src={logo} />
          )}
        </div>
      </div>
    </>
  );
}

export default Showcase;
