import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { requestResources } from "../components/Me/utils";
import { Auth } from "./Auth";

function AuthRedirect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const auth = Auth.getInstance();

  const getResources = async () => {
    await requestResources();
    auth.requestAccessToken(searchParams.get("code")!).then(() => {
      getResources();
      window.location.replace("/me");
    });
  };

  useEffect(() => {
    getResources();
  });
  return <>redirected</>;
}

export default AuthRedirect;
