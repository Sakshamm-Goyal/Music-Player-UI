"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import type { Song } from "@/types/song"
import { getAverageColor } from "@/utils/color-utils"
import { Dropdown } from "react-bootstrap"
import { toast } from "sonner"

interface MusicPlayerProps {
  song: Song
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  onNext: () => void
  onPrevious: () => void
  onToggleFavorite: () => void
  isFavorite: boolean
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  song,
  isPlaying,
  setIsPlaying,
  onNext,
  onPrevious,
  onToggleFavorite,
  isFavorite,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const progressRef = useRef<HTMLDivElement>(null)
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    // Extract dominant color from the album art and set background gradient
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = song.thumbnail
    img.onload = () => {
      const color = getAverageColor(img)
      const mainContent = document.querySelector(".main-wrapper") as HTMLElement
      if (mainContent) {
        mainContent.style.background = `linear-gradient(to bottom, ${color}, var(--background-darker))`
        // Add transition for smooth color change
        mainContent.style.transition = "background 0.5s ease-in-out"
      }
    }

    // Reset audio player when song changes
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)

      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error)
          setIsPlaying(false)
        })
      }
    }
  }, [song, isPlaying, setIsPlaying])

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error)
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, setIsPlaying])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const clickPosition = e.clientX - rect.left
      const percentage = clickPosition / rect.width
      const seekTime = percentage * duration

      audioRef.current.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }

  const handleEnded = () => {
    onNext()
  }

  const handleFavoriteClick = () => {
    onToggleFavorite()
    // Show toast notification
    toast(isFavorite ? "Removed from favorites" : "Added to favorites", {
      description: `"${song.title}" by ${song.artistName}`,
      duration: 3000,
      position: "bottom-right",
      icon: isFavorite ? "💔" : "❤️",
    })
  }

  return (
    <div className="now-playing-section">
      <div className="song-details">
        <h2>{song.title}</h2>
        <p>{song.artistName}</p>
      </div>

      <div className="album-art">
        <img src={song.thumbnail || "/placeholder.svg"} alt={`${song.title} album art`} />
      </div>

      <div className="player-controls">
        <div className="progress-container">
          <div className="progress-bar" ref={progressRef} onClick={handleProgressClick}>
            <div className="progress" style={{ width: `${(currentTime / duration) * 100 || 0}%` }}></div>
          </div>
        </div>

        <div className="main-controls">
          <Dropdown>
            <Dropdown.Toggle className="options-btn" style={{ color: '#FFFFFF' }}>
              <i className="fas fa-ellipsis-h" style={{ color: '#FFFFFF' }}></i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item onClick={handleFavoriteClick}>
                <i className={`${isFavorite ? "fas" : "far"} fa-heart`}></i>
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fas fa-share-alt"></i> Share
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fas fa-info-circle"></i> View Details
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <button onClick={onPrevious} className="control-btn" style={{ color: '#FFFFFF' }}>
            <i className="fas fa-step-backward" style={{ color: '#FFFFFF' }}></i>
          </button>

          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="play-pause-btn" 
            style={{ backgroundColor: '#1DB954', color: '#FFFFFF' }}
          >
            <i 
              className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`} 
              style={{ color: '#FFFFFF' }}
            ></i>
          </button>

          <button onClick={onNext} className="control-btn" style={{ color: '#FFFFFF' }}>
            <i className="fas fa-step-forward" style={{ color: '#FFFFFF' }}></i>
          </button>

          <div className="volume-control">
            <i 
              className={`fas fa-volume-${volume === 0 ? 'mute' : volume < 0.5 ? 'down' : 'up'}`}
              style={{ color: '#FFFFFF' }}
            ></i>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => {
                const newVolume = parseFloat(e.target.value)
                setVolume(newVolume)
                if (audioRef.current) {
                  audioRef.current.volume = newVolume
                }
              }}
              className="volume-slider"
            />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={song.musicUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
    </div>
  )
}

export default MusicPlayer

