import React from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import "./index.css";
import App from "./App";
import { processSpotifyCallback } from "./spotifyCallback";

processSpotifyCallback();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
