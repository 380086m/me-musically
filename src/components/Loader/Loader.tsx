import React, { useEffect, useState } from "react";
import "./Loader.sass";
import loader from "../../assets/loader.gif";

function Loader() {
  const [loaderMessage, setLoaderMessage] = useState("");

  const showLoadMessages = () => {
    setLoaderMessage("Checking your tracks...");
    window.addEventListener("mm_tracks_ready", () => {
      setLoaderMessage("I love that song too!");
      setTimeout(() => {
        setLoaderMessage("Looking for your favorite artists...");
      }, 1500);
    });
    window.addEventListener("mm_artists_ready", () => {
      setLoaderMessage("So these are your favorite albums");
      setTimeout(() => {
        setLoaderMessage("Nice");
        setTimeout(() => {
          setLoaderMessage("Here we go!");
        }, 2000);
      }, 1000);
    });
  };

  useEffect(() => {
    showLoadMessages();
  }, []);

  return (
    <>
      <div className="loader-container">
        <div className="loader">
          <img src={loader} alt="loader" />
        </div>
        <div className="-message">{loaderMessage}</div>
      </div>
    </>
  );
}

export default Loader;
