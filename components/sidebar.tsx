"use client"

import type React from "react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  onClose?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onClose }) => {
  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    if (window.innerWidth <= 768 && onClose) {
      onClose()
    }
  }

  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-icon">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <circle cx="12" cy="12" r="10" fill="#1DB954" />
            <circle cx="12" cy="12" r="3" fill="white" />
          </svg>
        </div>
        <span>Tech Music</span>
      </div>

      <div className="sidebar-section">
        <div
          className={`sidebar-item ${activeTab === "forYou" ? "active" : ""}`}
          onClick={() => handleTabClick("forYou")}
        >
          <span>For You</span>
        </div>
      </div>

      <div className="sidebar-section">
        <div
          className={`sidebar-item ${activeTab === "topTracks" ? "active" : ""}`}
          onClick={() => handleTabClick("topTracks")}
        >
          <span>Top Tracks</span>
        </div>

        <div
          className={`sidebar-item ${activeTab === "favorites" ? "active" : ""}`}
          onClick={() => handleTabClick("favorites")}
        >
          <span>Favourites</span>
        </div>

        <div
          className={`sidebar-item ${activeTab === "recentlyPlayed" ? "active" : ""}`}
          onClick={() => handleTabClick("recentlyPlayed")}
        >
          <span>Recently Played</span>
        </div>
      </div>

      {onClose && (
        <button className="close-sidebar" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  )
}

export default Sidebar

