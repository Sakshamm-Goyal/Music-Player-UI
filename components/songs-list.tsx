"use client"

import type React from "react"
import type { Song } from "@/types/song"
import { Dropdown } from "react-bootstrap"
import { formatTime } from "@/utils/format-utils"

interface SongsListProps {
  songs: Song[]
  currentSong: Song | null
  isPlaying: boolean
  onPlaySong: (song: Song) => void
  onToggleFavorite: (song: Song) => void
  favorites: Song[]
  activeTab: string
}

const SongsList: React.FC<SongsListProps> = ({
  songs,
  currentSong,
  isPlaying,
  onPlaySong,
  onToggleFavorite,
  favorites,
  activeTab,
}) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case "favorites":
        return "Favourites"
      case "recentlyPlayed":
        return "Recently Played"
      case "topTracks":
        return "Top Tracks"
      default:
        return "For You"
    }
  }

  return (
    <div className="songs-list">
      <h2 className="section-title">{getTabTitle()}</h2>

      {songs.length === 0 ? (
        <div className="empty-state">
          <p>
            {activeTab === "favorites"
              ? "No favorite songs yet. Mark songs as favorite to see them here."
              : activeTab === "recentlyPlayed"
                ? "No recently played songs. Start playing some music!"
                : "No songs found."}
          </p>
        </div>
      ) : (
        <div className="songs-container">
          {songs.map((song) => (
            <div key={song.id} className={`song-item ${currentSong?.id === song.id ? "active" : ""}`}>
              <div className="song-thumbnail" onClick={() => onPlaySong(song)}>
                <img src={song.thumbnail || "/placeholder.svg"} alt={song.title} />
                <div className="play-overlay">
                  <i className={`fas ${currentSong?.id === song.id && isPlaying ? "fa-pause" : "fa-play"}`}></i>
                </div>
              </div>

              <div className="song-info" onClick={() => onPlaySong(song)}>
                <div className="title">{song.title}</div>
                <div className="artist">{song.artistName}</div>
              </div>

              <div className="song-duration">{formatTime(song.duration)}</div>

              <div className="song-actions">
                {/* <Dropdown>
                  <Dropdown.Toggle>
                    <i className="fas fa-ellipsis-h"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    <Dropdown.Item onClick={() => onToggleFavorite(song)}>
                      {favorites.some((fav) => fav.id === song.id) ? (
                        <>
                          <i className="fas fa-heart"></i> Remove from Favorites
                        </>
                      ) : (
                        <>
                          <i className="far fa-heart"></i> Add to Favorites
                        </>
                      )}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SongsList

