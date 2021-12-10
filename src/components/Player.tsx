import React, { useCallback, useRef } from "react";
import "./Player.css";
import { CurrentSong, Song } from "../data/currentSong";
import { Playlist } from "../data/playlists";

export function Player({ currentSong }: { currentSong: CurrentSong }) {
  const { item, device } = currentSong;
  return (
    <div className="player_wrapper">
      <img className="album_image" src={item.album.images[1].url} alt="" />
      <div className="player_info">
        <h2>{item.name}</h2>
        <p>
          {item.artists[0].name} ● {item.album.name}
        </p>
        <p>Listening on {device.name}</p>
      </div>
    </div>
  );
}

export function AddToPlaylist({
  currentSong,
  playlists,
  createNewPlaylist,
  addSongToPlaylist,
}: {
  currentSong: CurrentSong;
  playlists: Playlist[];
  createNewPlaylist: (title: string) => void;
  addSongToPlaylist: (
    song: Song,
    playlist: string
  ) => { error?: string; success?: boolean };
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const addPlaylist = useCallback(
    (e) => {
      e.preventDefault();
      if (!inputRef.current?.value) {
        alert("Please enter a name for the playlist.");
        return;
      }
      createNewPlaylist(inputRef.current.value);
      addSongToPlaylist(currentSong.item, inputRef.current.value);
      alert(`Song added to new playlist ${inputRef.current.value}`);
    },
    [createNewPlaylist, addSongToPlaylist, currentSong.item]
  );

  const addToPlaylist = useCallback(
    (title) => {
      const result = addSongToPlaylist(currentSong.item, title);
      // Ideally these would be modals as to not block the thread
      if (result.error) {
        alert("Song is already in that playlist.");
      } else {
        alert("Song added to playlist.");
      }
    },
    [currentSong.item, addSongToPlaylist]
  );

  return (
    <>
      <h3>Add to Playlist</h3>
      <form className="create_playlist_form" onSubmit={addPlaylist}>
        <label>
          Create new playlist <input ref={inputRef} type="text" />
        </label>
        <button>Add</button>
      </form>
      <div className="existing_playlists">
        <p>Existing playlist:</p>
        {playlists.length === 0 ? (
          <p>You haven't create any playlists yet</p>
        ) : (
          <ul>
            {playlists.map((playlist) => (
              <li
                key={playlist.title}
                className="playlist_list_item"
                onClick={() => addToPlaylist(playlist.title)}
              >
                {playlist.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
