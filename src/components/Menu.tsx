import React from "react";
import { Playlist } from "../data/playlists";
import "./Menu.css";

export default function Menu({
  items,
  active,
  onItemClick,
}: {
  items: ({ title: string } | Playlist)[];
  active: string;
  onItemClick: (title: string) => void;
}) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li
            key={item.title}
            className={`menu_item${item.title === active ? " active" : ""}`}
            onClick={() => onItemClick(item.title)}
          >
            {item.title}
          </li>
        );
      })}
    </ul>
  );
}
