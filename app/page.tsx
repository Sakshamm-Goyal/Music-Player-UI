"use client"

import { useEffect, useState } from "react"
import MusicPlayer from "@/components/music-player"
import Sidebar from "@/components/sidebar"
import SongsList from "@/components/songs-list"
import type { Song } from "@/types/song"
import { dummyData } from "@/data/songs"
import "bootstrap/dist/css/bootstrap.min.css"

export default function Home() {
  const [songs, setSongs] = useState<Song[]>(dummyData)
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState("forYou")
  const [favorites, setFavorites] = useState<Song[]>([])
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(songs)
  const [showSidebar, setShowSidebar] = useState(true)

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }

    // Load recently played from sessionStorage
    const storedRecentlyPlayed = sessionStorage.getItem("recentlyPlayed")
    if (storedRecentlyPlayed) {
      setRecentlyPlayed(JSON.parse(storedRecentlyPlayed))
    }

    // Set initial current song
    if (dummyData.length > 0 && !currentSong) {
      // Set to Viva La Vida as shown in the screenshot
      const vivaSong = dummyData.find((song) => song.title === "Viva La Vida")
      setCurrentSong(vivaSong || dummyData[0])
    }
  }, [])

  // Filter songs based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSongs(songs)
    } else {
      const filtered = songs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.artistName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredSongs(filtered)
    }
  }, [searchTerm, songs])

  // Update localStorage when favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  // Update sessionStorage when recently played changes
  useEffect(() => {
    sessionStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed))
  }, [recentlyPlayed])

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song)
    setIsPlaying(true)

    // Add to recently played
    const updatedRecentlyPlayed = [song, ...recentlyPlayed.filter((s) => s.id !== song.id)].slice(0, 10)
    setRecentlyPlayed(updatedRecentlyPlayed)
  }

  const toggleFavorite = (song: Song) => {
    if (favorites.some((fav) => fav.id === song.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== song.id))
    } else {
      setFavorites([...favorites, song])
    }
  }

  const getDisplayedSongs = () => {
    switch (activeTab) {
      case "favorites":
        return favorites
      case "recentlyPlayed":
        return recentlyPlayed
      default:
        return filteredSongs
    }
  }

  return (
    <div className="music-app">
      <div className={`sidebar-wrapper ${showSidebar ? "show" : ""}`}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onClose={() => setShowSidebar(false)} />
      </div>

      <div className="main-wrapper">
        <div className="main-content">
          <div className="top-bar">
            <button className="menu-toggle" onClick={() => setShowSidebar(!showSidebar)}>
              <i className="fas fa-bars"></i>
            </button>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search Song, Artist"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <i className="fas fa-search search-icon"></i>
            </div>
          </div>

          <div className="content-area">
            <div className="songs-section">
              <SongsList
                songs={getDisplayedSongs()}
                currentSong={currentSong}
                isPlaying={isPlaying}
                onPlaySong={handlePlaySong}
                onToggleFavorite={toggleFavorite}
                favorites={favorites}
                activeTab={activeTab}
              />
            </div>

            {currentSong && (
              <MusicPlayer
                song={currentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                onNext={() => {
                  const currentIndex = songs.findIndex((s) => s.id === currentSong.id)
                  const nextIndex = (currentIndex + 1) % songs.length
                  handlePlaySong(songs[nextIndex])
                }}
                onPrevious={() => {
                  const currentIndex = songs.findIndex((s) => s.id === currentSong.id)
                  const prevIndex = (currentIndex - 1 + songs.length) % songs.length
                  handlePlaySong(songs[prevIndex])
                }}
                onToggleFavorite={() => toggleFavorite(currentSong)}
                isFavorite={favorites.some((fav) => fav.id === currentSong.id)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

