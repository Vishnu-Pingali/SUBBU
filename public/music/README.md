# 🎵 Music

Drop your piano background music here:

- `piano.mp3` — Background music that plays when the user clicks the 🎵 button

## Supported Formats
- MP3 (recommended)
- WAV, OGG also supported — update the path in `src/config/memories.ts`

## Config
```typescript
export const MUSIC = {
  src: "/music/piano.mp3",  // ← Change this path if you rename your file
  autoplay: false,
  loop: true,
};
```
