# Music Player UI
## Overview
This repository contains the code for a Music Player UI built as a frontend assignment. The goal is to create an interactive and responsive music player interface that adheres to the design provided via Figma. This project is built using ReactJS, SCSS, and React-Bootstrap.

*

## Features
- **Responsive Design:**  
  The application is fully responsive. On smaller screens, the player component becomes the main interface with a menu button to reveal the list of songs.
  
- **Dynamic Background:**  
  The background gradient changes according to the cover image of the current song, matching the provided design.

- **Smooth Animations and Transitions:**  
  Enjoy fluid animations such as list loading effects and smooth background color transitions.

- **Continuous Music Playback:**  
  Music playback continues seamlessly even when navigating to other sections (e.g., Favourites).

- **Search Functionality:**  
  Users can search tracks by their title.

- **Recently Played Section:**  
  Displays the last 10 played tracks. This list is stored in Session Storage.

- **Favourite Tracks:**  
  Mark songs as favourites using the three-dot menu. Favourite tracks are stored in Local Storage and appear in a dedicated Favourites tab.

- **Dummy Data Implementation:**  
  A dummy JSON object is used to load track data. The expected data structure is:
  ```json
  {
    "title": "Track Title",
    "thumbnail": "Image URL",
    "musicUrl": "Audio URL",
    "duration": "Duration",
    "artistName": "Artist Name"
  }
