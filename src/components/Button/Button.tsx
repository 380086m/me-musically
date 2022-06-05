import React from "react";
import "./Button.sass";
import { ButtonProps } from "./types";

function Button(props: ButtonProps) {
  return (
    <>
      <button className="styled-button" onClick={props.onClick}>
        {props.text}
      </button>
    </>
  );
}

export default Button;
