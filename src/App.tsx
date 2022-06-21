import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.sass";
import AuthRedirect from "./auth/AuthRedirectScreen";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import Navbar from "./components/Navbar/Navbar";
import Albums from "./screens/Albums/Albums";
import Artists from "./screens/Artists/Artists";
import Genres from "./screens/Genres/Genres";
import Me from "./screens/Me/Me";
import Songs from "./screens/Songs/Songs";
import Start from "./screens/Start/Start";

function App() {
  return (
    <BrowserRouter>
      <Loader hidden={true} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/redirect" element={<AuthRedirect />}></Route>
        <Route path="/me" element={<Me />}></Route>
        <Route path="/artists" element={<Artists />}></Route>
        <Route path="/songs" element={<Songs />}></Route>
        <Route path="/albums" element={<Albums />}></Route>
        <Route path="/genres" element={<Genres />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
