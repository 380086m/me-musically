import React from "react";
import "./App.sass";
import { Auth } from "./auth/Auth";
import Button from "./components/Button/Button";

function App() {
  const auth = Auth.getInstance();

  return (
    <>
      <Button
        onClick={() => {
          auth.requestAuth();
        }}
        text="Start"
      />
    </>
  );
}

export default App;
