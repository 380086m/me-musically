import React from "react";
import ReactDOM from "react-dom/client";
import "./index.sass";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRedirect from "./auth/AuthRedirectScreen";
import Me from "./screens/Me/Me";
import Navbar from "./components/Navbar/Navbar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/redirect" element={<AuthRedirect />}></Route>
      <Route path="/me" element={<Me />}></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
