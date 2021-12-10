import React from "react";
import { Playlist } from "../data/playlists";
import "./PlaylistDisplay.css";

export default function PlaylistDisplay({ playlist }: { playlist: Playlist }) {
  return (
    <>
      <div className="playlist_display_header">
        <h2>{playlist.title}</h2>
        <span className="playlist_display_header__song_count">
          {playlist.songs.length} song
          {playlist.songs.length !== 1 ? "s" : ""}
        </span>
      </div>
      <table className="playlist_table">
        <thead>
          <tr>
            <td>Title</td>
            <td>Artist</td>
            <td>Album</td>
          </tr>
        </thead>
        <tbody>
          {playlist.songs.map((song) => {
            return (
              <tr key={song.name}>
                <td>{song.name}</td>
                <td>{song.artists[0].name}</td>
                <td>{song.album.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
