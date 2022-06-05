import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ShowcaseProps } from "./types";
import "./Showcase.sass";

function Showcase(props: ShowcaseProps) {
  useEffect(() => {}, []);

  return (
    <>
      <Link to={props.route}>
        <div className="showcase">
          <h3 className="head-text">{props.header}</h3>
          <div className="showcase-images">
            {props.images.map((image) => (
              <img key={image} src={image} />
            ))}
          </div>
        </div>
      </Link>
    </>
  );
}

export default Showcase;
