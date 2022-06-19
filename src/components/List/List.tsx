import React, { useEffect } from "react";
import "./List.sass";
import { ListProps } from "./types";
import spotifyIso from "../../assets/spotify-iso.png";

function List(props: ListProps) {
  useEffect(() => {}, []);

  return (
    <>
      <div className="list">
        {props.items.map((item, index) => {
          return (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="list__item"
              key={index}
            >
              <div className="item" key={index}>
                <div className="item-content">
                  <div className="item-image">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.text}
                        // style={
                        //   props.shape === "square"
                        //     ? { borderRadius: "4px" }
                        //     : { borderRadius: "50%" }
                        // }
                      />
                    ) : (
                      <div>
                        {props.ordened ? (
                          <span>{index + 1}</span>
                        ) : (
                          <span>{""}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="item-text">
                    <span>{item.text}</span>
                    {item.small && <small>{item.small}</small>}
                  </div>
                </div>
                <div className="spotify-logo">
                  <img src={spotifyIso} alt="Spotify" width={25} />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}

export default List;
