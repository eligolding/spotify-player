// Process Spotify's callback:
// Spotify's OAuth2 process will redirect back to the "/callback" endpoint of the app with an access token in the hash
// Since I didn't add any routing to app, I am using a global function that will read the hash off the url (if there is
// one), and then replace the url path to the root "/", just to keep it clean.
export function processSpotifyCallback() {
  if (window.location.pathname === "/callback" && window.location.hash) {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    localStorage.setItem("access_token", hash.get("access_token")!);
  }

  window.history.replaceState({}, "", "/");
}
