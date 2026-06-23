"use client";

import { useState, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import GlowingCursor from "@/components/GlowingCursor";
import ScrollProgress from "@/components/ScrollProgress";
import MusicToggle from "@/components/MusicToggle";
import HeroSection from "@/components/HeroSection";
import LongDistanceMap from "@/components/LongDistanceMap";
import MemoryConstellation from "@/components/MemoryConstellation";
import FirstMeetSection from "@/components/FirstMeetSection";
import DaysCounter from "@/components/DaysCounter";
import LoveLetterSection from "@/components/LoveLetterSection";
import ThenAndNow from "@/components/ThenAndNow";
import HeartConstellation from "@/components/HeartConstellation";
import FinalSection from "@/components/FinalSection";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {/* Loading screen */}
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* Main site */}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.8s ease",
          minHeight: "100vh",
        }}
      >
        {/* Global UI */}
        <GlowingCursor />
        <ScrollProgress />
        <MusicToggle />

        {/* Page sections */}
        <main>
          <HeroSection />
          <LongDistanceMap />
          <MemoryConstellation />
          <FirstMeetSection />
          <DaysCounter />
          <LoveLetterSection />
          <ThenAndNow />
          <HeartConstellation />
          <FinalSection />
        </main>

        {/* Footer */}
        <footer
          className="relative text-center py-8 px-4"
          style={{ background: "#04040f" }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-pink-400/30 to-transparent mb-6" />
          <p className="font-lora text-slate-500 italic text-sm">
            Made with ❤️ for Subbu — 365 days of love, and counting.
          </p>
          <p className="font-inter text-slate-600 text-xs mt-2">
            ✨ 365 Constellations of Us
          </p>
        </footer>
      </div>
    </>
  );
}
