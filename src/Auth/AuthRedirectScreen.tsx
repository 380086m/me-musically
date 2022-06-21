import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { requestResources } from "../api/utils";
import Loader from "../components/Loader/Loader";
import { getText } from "../translate/texts";
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
    setLoaderMessage(getText("loaderText1"));
    window.addEventListener("mm_tracks_ready", () => {
      setLoaderMessage(getText("loaderText2"));
      setTimeout(() => {
        setLoaderMessage(getText("loaderText3"));
      }, 1500);
    });
    window.addEventListener("mm_artists_ready", () => {
      setLoaderMessage(getText("loaderText4"));
      setTimeout(() => {
        setLoaderMessage(getText("loaderText5"));
        setTimeout(() => {
          setLoaderMessage(getText("loaderText6"));
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
