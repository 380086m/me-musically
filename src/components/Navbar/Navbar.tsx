import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Navbar.sass";

function Navbar() {
  const [routeIndex, setRouteIndex] = React.useState(0);
  const [location, setLocation] = React.useState(useLocation());

  const handleArrowClick = (index: number) => {
    if (index >= 0 && index < routes.length) {
      setRouteIndex(index);
      window.location.replace(routes[index].path);
    }
  };

  useEffect(() => {
    routes.forEach((route, index) => {
      if (location.pathname === route.path) {
        setRouteIndex(index);
      }
    });
  }, []);

  const routes = [
    {
      path: "/me",
      name: "Me",
    },
    {
      path: "/albums",
      name: "Albums",
    },
    {
      path: "/albums2",
      name: "Albums",
    },
    {
      path: "/albums3",
      name: "Albums",
    },
    {
      path: "/albums",
      name: "Albums",
    },
    {
      path: "/albums",
      name: "Albums",
    },
  ];

  return (
    <>
      <div className="navbar">
        {!["/", "/redirect"].includes(location.pathname) ? (
          <div
            className="left-arrow"
            onClick={() => {
              handleArrowClick(routeIndex - 1);
            }}
          >
            {"<-"}
          </div>
        ) : (
          <div></div>
        )}
        <div className="github">gh</div>

        <div className="github">gh</div>
        {!["/", "/redirect"].includes(location.pathname) ? (
          <div
            className="right-arrow"
            onClick={() => {
              handleArrowClick(routeIndex + 1);
            }}
          >
            {"->"}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default Navbar;
