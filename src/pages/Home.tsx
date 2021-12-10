import Menu from "../components/Menu";
import { Player, AddToPlaylist } from "../components/Player";
import React, { useState } from "react";
import PlaylistDisplay from "../components/PlaylistDisplay";
import { useCurrentSong } from "../data/currentSong";
import { usePlaylists } from "../data/playlists";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("Currently Playing");
  const { playlists, createNewPlaylist, addSongToPlaylist } = usePlaylists();
  const { currentSong, loading, error } = useCurrentSong();

  const selectedPlaylist = playlists.find(
    (playlist) => playlist.title === activeSection
  );

  return (
    <div className="main">
      <div className="sidebar">
        <Menu
          onItemClick={(title) => {
            setActiveSection(title);
          }}
          items={[{ title: "Currently Playing" }, ...playlists]}
          active={activeSection}
        />
      </div>
      <div className="content">
        {activeSection === "Currently Playing" ? (
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>
                You don't currently have any music playing. Have you no heart?
              </div>
            ) : currentSong ? (
              <div>
                <Player currentSong={currentSong} />
                <div className="add_to_playlist_section">
                  <AddToPlaylist
                    playlists={playlists}
                    createNewPlaylist={createNewPlaylist}
                    addSongToPlaylist={addSongToPlaylist}
                    currentSong={currentSong}
                  />
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
        {selectedPlaylist ? (
          <PlaylistDisplay playlist={selectedPlaylist} />
        ) : null}
      </div>
    </div>
  );
}
