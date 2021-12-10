import React from "react";
import "./Login.css";

export default function LoginPage() {
  return (
    <div className="login_section">
      <h2>
        Let's see what you are listening to, and make some playlists while we're
        at it!
      </h2>
      <button className="login_button" onClick={loginToSpotify}>
        log in with spotify
      </button>
    </div>
  );
}

function loginToSpotify() {
  // TODO: these should be env vars
  let client_id = "cdb2aa72661944f98b8dfc8a3dcae30d";
  let redirect_uri = "http://localhost:3000/callback";

  // we probably don't need all these scopes
  let scope = "user-read-private user-read-email user-read-playback-state";

  let url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += `&client_id=${encodeURIComponent(client_id)}`;
  url += `&scope=${encodeURIComponent(scope)}`;
  url += `&redirect_uri=${encodeURIComponent(redirect_uri)}`;

  // @ts-ignore
  window.location = url;
}
