import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { requestResources } from "../api/utils";
import Loader from "../components/Loader/Loader";
import { Auth } from "./Auth";

function AuthRedirect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const auth = Auth.getInstance();

  const getResources = async () => {
    await requestResources();
    auth.requestAccessToken(searchParams.get("code")!).then(() => {
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
