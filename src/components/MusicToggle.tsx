"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { MUSIC } from "@/config/memories";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const audio = new Audio(MUSIC.src);
    audio.loop = MUSIC.loop;
    audio.volume = 0.45;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {
        // Autoplay blocked — user gesture required
      });
      setPlaying(true);
    }
  };

  if (!mounted) return null;

  return (
    <button
      id="music-toggle"
      onClick={toggle}
      className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4.5 py-2.5 rounded-full text-xs font-semibold tracking-wider font-inter border transition-all duration-300 ${
        playing
          ? "bg-pink-500/10 border-pink-500/30 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.25)]"
          : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10"
      }`}
      aria-label={playing ? "Mute music" : "Play music"}
      title={playing ? "Mute music" : "Play music"}
    >
      {playing ? (
        <>
          <div className="flex items-end gap-[2px] w-3 h-3">
            <span className="w-[2px] bg-pink-400 rounded-full animate-eq-bar-1" />
            <span className="w-[2px] bg-pink-400 rounded-full animate-eq-bar-2" />
            <span className="w-[2px] bg-pink-400 rounded-full animate-eq-bar-3" />
          </div>
          <span>♪ PLAYING</span>
        </>
      ) : (
        <>
          <VolumeX size={13} className="text-slate-400" />
          <span>MUSIC</span>
        </>
      )}

      {/* Styled EQ keyframes */}
      <style>{`
        .animate-eq-bar-1 {
          height: 100%;
          animation: eq-bounce 1s ease-in-out infinite alternate;
        }
        .animate-eq-bar-2 {
          height: 60%;
          animation: eq-bounce 0.8s ease-in-out infinite alternate-reverse;
          animation-delay: 0.15s;
        }
        .animate-eq-bar-3 {
          height: 80%;
          animation: eq-bounce 1.2s ease-in-out infinite alternate;
          animation-delay: 0.3s;
        }
        @keyframes eq-bounce {
          0% { height: 20%; }
          100% { height: 100%; }
        }
      `}</style>
    </button>
  );
}
