import React, { useEffect, useState } from "react";
import "./ItemText.sass";
import { ItemTextProps } from "./types";

function ItemText(props: ItemTextProps) {
  useEffect(() => {}, []);

  const colors = ["#FEF9A7", "#FAC213", "#F77E21", "#D61C4E"];

  return (
    <>
      <span
        className="item-text"
        style={{
          color:
            props.color ||
            colors[Math.floor(1 + Math.random() * (colors.length - 1 + 1))],
        }}
      >
        {props.text}
        {""}
        {props.imageUrl && <img src={props.imageUrl} />}
      </span>
    </>
  );
}

export default ItemText;
