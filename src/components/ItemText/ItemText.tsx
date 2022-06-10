import React, { useEffect, useState } from "react";
import "./ItemText.sass";
import { ItemTextProps } from "./types";

function ItemText(props: ItemTextProps) {
  useEffect(() => {}, []);

  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#9e9e9e",
    "#607d8b",
  ];

  return (
    <>
      <span
        className="item-text"
        style={{
          color:
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
