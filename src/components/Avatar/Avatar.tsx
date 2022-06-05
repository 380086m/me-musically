import React from "react";
import "./Avatar.sass";
import { AvatarProps } from "./types";

function Avatar(props: AvatarProps) {
  return (
    <>
      <img className="avatar" src={props.source} />
    </>
  );
}

export default Avatar;
