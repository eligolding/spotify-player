import { Song } from "./currentSong";
import { useEffect, useState } from "react";

export type Playlist = {
  title: string;
  songs: Song[];
};

export function usePlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const getPlaylists = (): Playlist[] => {
    return JSON.parse(localStorage.getItem("playlists") || "[]");
  };

  useEffect(() => {
    setPlaylists(getPlaylists());
  }, []);

  const createNewPlaylist = (title: string) => {
    const currentPlaylists = getPlaylists();
    const updatedPlaylists = [...currentPlaylists, { title, songs: [] }];
    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
    setPlaylists(updatedPlaylists);
  };

  const addSongToPlaylist = (song: Song, title: string) => {
    const currentPlaylists = getPlaylists();
    const playlistIdx = currentPlaylists.findIndex(
      (list) => list.title === title
    );
    const playlist = currentPlaylists[playlistIdx];
    const songExists = playlist.songs.some((item) => item.name === song.name);
    if (songExists) {
      return { error: "song_already_added" };
    }
    playlist.songs = [song, ...playlist.songs];
    currentPlaylists[playlistIdx] = playlist;
    localStorage.setItem("playlists", JSON.stringify(currentPlaylists));
    setPlaylists(currentPlaylists);
    return { success: true };
  };

  return { playlists, createNewPlaylist, addSongToPlaylist };
}
