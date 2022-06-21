import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { requestResources } from "../api/utils";
import Loader from "../components/Loader/Loader";
import { Auth } from "./Auth";

function AuthRedirect() {
  const [searchParams] = useSearchParams();
  const auth = Auth.getInstance();

  const getResources = async () => {
    auth.requestAccessToken(searchParams.get("code")!).then(async () => {
      await requestResources();
      window.location.replace("/me");
    });
  };

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
    getResources();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Loader message={loaderMessage}></Loader>
    </>
  );
}

export default AuthRedirect;
