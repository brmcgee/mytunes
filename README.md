# Music Player App

A simple web-based music player with playlist support.

## Features

- Play local audio files and remote URLs (via embedded defaultPlaylist)
- Load playlists from JSON files
- Upload custom playlists
- Minimal Android Auto/CarPlay connections
- Responsive design with frosted glass theme

## File Structure

```
music-player/
├── index.html              # Main player interface (contains embedded defaultPlaylist)
├── README.md               # This file
├── assets/
│   ├── audio/              # Audio files
│   ├── thumb/              # Album artwork thumbnails
│   └── data/               # Playlist JSON files
│       ├── mytunes.json    # Example playlist
│       ├── simple.json     # Simple example playlist
│       └── tunes.json      # Additional playlist
```

## Usage

### Accessing Playlists

- **Default Playlist**: `http://localhost/music-player/index.html`
  - Loads the embedded `defaultPlaylist` in `index.html` (contains curated tracks)

- **Specific Playlist**: `http://localhost/music-player/index.html?playlist-name`
  - Replace `playlist-name` with the JSON filename (without .json extension)
  - Example: `http://localhost/music-player/index.html?simple` loads `assets/data/simple.json`
  - Available playlists: `mytunes`, `simple`, `tunes`

### Uploading Playlists

1. Click the load button (📁) in the top-left corner of the playlist header
2. Choose "Upload JSON Playlist"
3. Select a JSON file with the following structure:

```json
{
  "id": "unique-id",
  "name": "Playlist Name",
  "songs": [
    {
      "id": 1,
      "title": "Song Title",
      "artist": "Artist Name",
      "album": "Album Name",
      "img": "assets/thumb/image.jpg",
      "path": "assets/audio/song.mp3"
    }
  ]
}
```

### Controls

- **Play/Pause**: Central button
- **Previous/Next**: Arrow buttons
- **Shuffle**: Shuffle button
- **Volume**: Volume button (reveals slider)
- **Load Playlist**: Top-left button for uploading or restoring default

### Playlist Management

- Tracks are displayed below the player
- Click any track to play it
- Expand/collapse playlist view with the toggle button

## Setup

1. Place audio files in `assets/audio/`
2. Place thumbnails in `assets/thumb/`
3. Create JSON playlists in `assets/data/`
4. Serve the `music-player/` directory via a web server (e.g., XAMPP, Apache)
5. Access via `http://localhost/music-player/index.html`

## Notes

- Audio and image paths should be relative to the HTML file location
- Supported audio formats depend on browser capabilities
- Thumbnails are automatically processed (removal of `/small` suffix if present)
- Default playlist is embedded in `index.html` as `defaultPlaylist` - modify the constant directly for changes
- Additional playlists can be added to `assets/data/` and accessed via query string</content>
<parameter name="filePath">c:\xampp\htdocs\music-player\README.md