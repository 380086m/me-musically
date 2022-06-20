import React, { useEffect } from "react";
import "./ItemText.sass";
import { ItemTextProps } from "./types";
import spotifyIso from "../../assets/spotify-iso.png";

function ItemText(props: ItemTextProps) {
  useEffect(() => {}, []);

  const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"];

  return (
    <>
      <a href={props.href} target="_blank" rel="noreferrer">
        <div className="item-text-container">
          <span
            className="item-text"
            style={{
              color:
                props.color ||
                colors[Math.floor(1 + Math.random() * (colors.length - 1 + 1))],
            }}
          >
            <img
              className="spotify-logo hide-on-screenshot"
              src={spotifyIso}
              alt="Spotify"
            />
            {props.text}
            {""}
            {props.imageUrl && (
              <img className="cover" src={props.imageUrl} alt={props.text} />
            )}
          </span>
        </div>
      </a>
    </>
  );
}

export default ItemText;
