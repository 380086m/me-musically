import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getText } from "../../translate/texts";
import "./Navbar.sass";

function Navbar() {
  const [routeIndex, setRouteIndex] = React.useState(0);
  const [location] = React.useState(useLocation());

  const disconnect = () => {
    if (window.confirm(getText("navbarDisconnectConfirm"))) {
      localStorage.clear();
      window.location.replace("/");
    }
  };

  const disconnectButton = () => {
    if (
      localStorage.getItem("refreshToken") &&
      window.location.pathname !== "/"
    ) {
      return (
        <button className="primary-button" onClick={disconnect}>
          {getText("navbarDisconnect")}
        </button>
      );
    }
  };

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
  });

  const routes = [
    {
      path: "/me",
      name: getText("meRouteName"),
    },
    {
      path: "/artists",
      name: getText("artistsRouteName"),
    },
    {
      path: "/songs",
      name: getText("songsRouteName"),
    },
    {
      path: "/albums",
      name: getText("albumsRouteName"),
    },
    {
      path: "/genres",
      name: getText("genresRouteName"),
    },
  ];

  return (
    <>
      <div className="navbar">
        {!["/", "/redirect"].includes(location.pathname) &&
        routes[routeIndex - 1] ? (
          <button
            style={{ minWidth: "100px" }}
            className="primary-button left"
            onClick={() => {
              handleArrowClick(routeIndex - 1);
            }}
          >
            {routes[routeIndex - 1].name}
          </button>
        ) : (
          <div>{disconnectButton()}</div>
        )}
        {!["/", "/redirect"].includes(location.pathname) &&
        routes[routeIndex + 1] ? (
          <button
            className="primary-button right"
            onClick={() => {
              handleArrowClick(routeIndex + 1);
            }}
          >
            {routes[routeIndex + 1]?.name}
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default Navbar;
