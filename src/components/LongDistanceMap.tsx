"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Heart, Compass, Globe } from "lucide-react";
import { LOCATIONS, SITE_CONFIG } from "@/config/memories";
import StarField from "./StarField";

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function useLiveSeconds(startDate: Date) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const update = () => {
      setSeconds(Math.floor((Date.now() - startDate.getTime()) / 1000));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startDate]);
  return seconds;
}

export default function LongDistanceMap() {
  const [MapComponent, setMapComponent] = useState<React.ReactNode>(null);
  const seconds = useLiveSeconds(SITE_CONFIG.startDate);
  const distance = haversineDistance(
    LOCATIONS.location1.lat, LOCATIONS.location1.lng,
    LOCATIONS.location2.lat, LOCATIONS.location2.lng
  );

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60);

  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    import("./MapInner").then((mod) => {
      setMapComponent(<mod.default />);
    });
  }, []);

  return (
    <section
      id="map-section"
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #04040f 0%, #080718 50%, #0d0d2b 100%)" }}
    >
      <StarField count={150} />

      {/* Atmospheric orbs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-purple-950/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full bg-pink-950/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Chapter Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-semibold uppercase tracking-[0.3em] text-purple-300 backdrop-blur-md mb-6">
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>Chapter One</span>
          </div>

          <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-white text-glow-pink mb-4">
            Long Distance Love
          </h2>
          <p className="font-lora text-slate-300 italic text-lg max-w-xl mx-auto">
            Two cities. Hundreds of kilometers. One heartbeat holding us together.
          </p>
        </motion.div>

        {/* Map Container inside neon spin-border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="glass-card-neon p-[3px] mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          <div className="w-full rounded-2xl overflow-hidden relative" style={{ height: "400px" }}>
            {MapComponent}
            {/* Map vignette overlay */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]" />
          </div>
        </motion.div>

        {/* Stats Grid & Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card-strong p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-pink-500/10"
        >
          {/* Counter panels */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Days Together", value: days.toLocaleString(), icon: "📅", color: "text-purple-300" },
              { label: "Hours Together", value: hours.toLocaleString(), icon: "⏰", color: "text-purple-300" },
              { label: "Minutes Together", value: minutes.toLocaleString(), icon: "⏱️", color: "text-purple-300" },
              { label: "Seconds Together", value: seconds.toLocaleString(), icon: "💖", live: true, color: "text-pink-400" },
            ].map((stat, i) => (
              <div 
                key={stat.label} 
                className="stat-card p-5 flex flex-col items-center justify-center text-center shadow-lg"
              >
                <div className="text-3xl mb-3 filter drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]">{stat.icon}</div>
                <div className={`font-cinzel text-xl md:text-2xl font-black counter-number ${stat.color} text-glow-pink`}>
                  {stat.value}
                </div>
                <div className="font-inter text-[10px] uppercase tracking-wider text-slate-400 mt-2">{stat.label}</div>
                
                {stat.live && (
                  <div className="flex items-center justify-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                    <span className="font-inter text-[9px] uppercase tracking-widest text-pink-300 font-bold">Live</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Distance Bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-3 rounded-full bg-pink-500/10 border border-pink-500/20">
                <MapPin size={22} className="text-pink-400" />
              </div>
              <span className="font-cinzel font-bold text-white tracking-wide text-base">{LOCATIONS.location1.city}</span>
              
              <div className="flex items-center px-2">
                <div className="w-8 h-[2px] bg-gradient-to-r from-pink-500/50 to-purple-500/50 relative">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <Heart size={16} className="text-pink-500 fill-pink-500 filter drop-shadow-[0_0_6px_#ec4899]" />
                  </motion.div>
                </div>
              </div>
              
              <div className="p-3 rounded-full bg-purple-500/10 border border-purple-500/20">
                <MapPin size={22} className="text-purple-400" />
              </div>
              <span className="font-cinzel font-bold text-white tracking-wide text-base">{LOCATIONS.location2.city}</span>
            </div>

            <div className="stat-card px-8 py-4 text-center min-w-[200px]">
              <span className="font-cinzel text-3xl font-black text-white text-glow-pink">{distance} km</span>
              <p className="font-inter text-[10px] uppercase tracking-widest text-slate-400 mt-1">apart in distance</p>
            </div>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center mt-14"
        >
          <p className="font-lora text-lg md:text-2xl text-slate-400 italic">
            "Distance was measured in kilometers..."
          </p>
          <p className="font-lora text-xl md:text-3xl text-pink-300 text-glow-pink italic mt-3 font-semibold">
            "But love was always measured in heartbeats."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
