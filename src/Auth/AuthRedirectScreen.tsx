import React, { useEffect } from "react";
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

  useEffect(() => {
    getResources();
  });
  return (
    <>
      <Loader></Loader>
    </>
  );
}

export default AuthRedirect;
