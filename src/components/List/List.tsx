import React, { useEffect } from "react";
import "./List.sass";
import { ListProps } from "./types";

function List(props: ListProps) {
  useEffect(() => {}, []);

  return (
    <>
      <div className="list">
        {props.items.map((item, index) => {
          return (
            <div className="item">
              <div className="item-image">
                <img src={item.imageUrl} />
              </div>
              <div className="item-text">
                <p>{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default List;
