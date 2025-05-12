import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter } from "react-router-dom";
import RouteList from "./RouteLists/RouteList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <RouteList />
      </BrowserRouter>
    </>
  );
}

export default App;