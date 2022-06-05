import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Auth } from "./Auth";

function AuthRedirect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const auth = Auth.getInstance();

  useEffect(() => {
    auth.requestAccessToken(searchParams.get("code")!).then(() => {
      window.location.replace("/me");
    });
  });
  return <>redirected</>;
}

export default AuthRedirect;
