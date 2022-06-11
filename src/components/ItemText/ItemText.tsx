import React, { useEffect, useState } from "react";
import "./ItemText.sass";
import { ItemTextProps } from "./types";

function ItemText(props: ItemTextProps) {
  useEffect(() => {}, []);

  const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"];

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
