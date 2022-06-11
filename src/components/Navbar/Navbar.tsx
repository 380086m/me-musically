import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import githubLogo from "../../assets/github.png";
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
      path: "/artists",
      name: "My artists",
    },
    {
      path: "/songs",
      name: "My songs",
    },
    {
      path: "/albums",
      name: "My albums",
    },
    {
      path: "/genres",
      name: "My genres",
    },
  ];

  return (
    <>
      <div className="navbar">
        {!["/", "/redirect"].includes(location.pathname) &&
        routes[routeIndex - 1] ? (
          <div
            className="arrow left"
            onClick={() => {
              handleArrowClick(routeIndex - 1);
            }}
          >
            {"< " + routes[routeIndex - 1].name}
          </div>
        ) : (
          <div></div>
        )}
        <div className="github">
          <a href="https://github.com/380086m/me-musically">
            <img src={githubLogo} style={{ width: "35px" }} />
          </a>
        </div>
        {!["/", "/redirect"].includes(location.pathname) &&
        routes[routeIndex + 1] ? (
          <div
            className="arrow right"
            onClick={() => {
              handleArrowClick(routeIndex + 1);
            }}
          >
            {routes[routeIndex + 1]?.name + " >"}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default Navbar;