import React, { useEffect } from "react";
import "./App.css";
import { Auth } from "./Auth/Auth";

function App() {
  const auth = Auth.getInstance();

  return (
    <>
      <button
        onClick={() => {
          auth.requestAuth();
        }}
      >
        log in
      </button>
    </>
  );
}

export default App;
