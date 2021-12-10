import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

// These are the types of the Spotify api.
// It would be lovely if we can like automate the
// generation of these types using some sort of reflection.
// In the meantime, we will manually maintain them
export type Song = {
  name: string;
  album: Album;
  artists: Artist[];
};

type Artist = {
  name: string;
};

type Album = {
  name: string;
  images: { url: string }[];
};

type Device = {
  name: string;
};
// end api types

export type CurrentSong = { item: Song; device: Device };

export function useCurrentSong() {
  const [currentSong, setCurrentSong] = useState<CurrentSong | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const userContext = useContext(UserContext);
  const token = userContext.token;

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://api.spotify.com/v1/me/player", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 204) {
          // nothing is playing. throw error
          setError(true);
          throw new Error("nothing is playing");
        }
        return res.json();
      })
      .then((res) => {
        if (res.error) {
          // assuming here that the token expired
          // delete token and update the context
          // this will force the app to rerender and user will see login screen
          localStorage.removeItem("access_token");
          userContext.setToken("");
          return;
        }
        setCurrentSong(res);
        setLoading(false);
      })
      .catch((e) => {
        setCurrentSong(null);
        setError(true);
        setLoading(false);
      });
  }, [token, userContext]);

  return { currentSong, loading, error };
}
