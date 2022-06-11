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
            <div className="item" key={index}>
              <div className="item-image">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    style={
                      props.shape === "square"
                        ? { borderRadius: "4px" }
                        : { borderRadius: "50%" }
                    }
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
                {item.small && <small>{" - " + item.small}</small>}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default List;
