import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getText } from "../../texts/texts";
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
        <button className="disconnect-button" onClick={disconnect}>
          {getText("navbarDisconnect")}
        </button>
      );
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
        {!["/", "/redirect"].includes(location.pathname) && (
          <>
            {routes.map((route, index) => (
              <button
                key={index}
                className={`navbar-button ${
                  index === routeIndex ? "active" : ""
                }`}
                onClick={() => window.location.replace(route.path)}
              >
                {route.name}
              </button>
            ))}
            {disconnectButton()}
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
