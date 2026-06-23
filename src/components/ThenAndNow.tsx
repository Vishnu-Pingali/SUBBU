"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PHOTOS } from "@/config/memories";
import { Clock, Sparkles } from "lucide-react";
import StarField from "./StarField";

const THEN_NOW_TEXTS = [
  "We changed.",
  "Time changed.",
  "Distance tested us.",
  "But somehow...",
  "We still found our way back to each other.",
];

export default function ThenAndNow() {
  const [thenPhotoError, setThenPhotoError] = useState(false);
  const [nowPhotoError, setNowPhotoError] = useState(false);

  const PhotoPlaceholder = ({ label }: { label: string }) => (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at center, #23123d 0%, #0d0d2b 100%)",
      }}
    >
      <div className="text-center p-4">
        <Sparkles className="w-8 h-8 text-pink-400/40 mx-auto mb-2 animate-pulse" />
        <p className="font-cinzel text-xs text-slate-400 tracking-wider font-semibold">{label}</p>
        <p className="font-lora text-[10px] text-slate-500 italic mt-1">
          Drop photo to public/photos/
        </p>
      </div>
    </div>
  );

  return (
    <section
      id="then-now"
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d0d2b 0%, #080718 50%, #0a0a1e 100%)" }}
    >
      <StarField count={120} />

      {/* Atmospheric space orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-pink-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Chapter Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-xs font-semibold uppercase tracking-[0.3em] text-pink-300 backdrop-blur-md mb-6">
            <Clock className="w-3.5 h-3.5 text-pink-400" />
            <span>Chapter Six</span>
          </div>

          <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-white text-glow-pink mb-4">
            Then &amp; Now
          </h2>
          <p className="font-lora text-slate-300 italic text-lg">
            Time moves on, faces change, but our story remains constant.
          </p>
        </motion.div>

        {/* Photos & Timeline Flow */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">
          {/* "Then" Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full max-w-[340px] text-center"
          >
            <div className="glass-card-neon p-[3px] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="bg-[#0b0a1a] rounded-[21px] p-3">
                <div className="relative w-full rounded-xl overflow-hidden shadow-inner bg-black/20" style={{ paddingTop: "125%" }}>
                  <div className="absolute inset-0">
                    {!thenPhotoError ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={PHOTOS.PHOTO_2}
                        alt="Then - First Meet"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        onError={() => setThenPhotoError(true)}
                        loading="lazy"
                      />
                    ) : (
                      <PhotoPlaceholder label="photo2.png (First Meeting)" />
                    )}
                  </div>
                </div>
                
                <h4 className="font-cinzel text-pink-400 text-lg font-black tracking-widest mt-5 text-glow-pink">
                  Then ❤️
                </h4>
                <p className="font-lora text-slate-400 italic text-sm mt-1">
                  Our first day together
                </p>
              </div>
            </div>
          </motion.div>

          {/* Center Timeline Column */}
          <div className="flex flex-col items-center py-4 px-2 max-w-sm lg:flex-1">
            <div className="flex flex-col items-center gap-4 relative">
              {/* Glowing vertical connector line */}
              <div className="absolute top-4 bottom-4 w-[2px] bg-gradient-to-b from-pink-500 via-purple-500 to-pink-500 opacity-20 pointer-events-none" />

              {THEN_NOW_TEXTS.map((text, i) => {
                const isLast = i === THEN_NOW_TEXTS.length - 1;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className="relative text-center z-10 py-1"
                  >
                    {/* Glowing Timeline Dot */}
                    <div className={`w-3 h-3 rounded-full mx-auto mb-3 flex items-center justify-center ${
                      isLast 
                        ? "bg-pink-400 shadow-[0_0_12px_#ec4899] border-2 border-white animate-pulse" 
                        : "bg-purple-600 shadow-[0_0_8px_#7c3aed]"
                    }`} />

                    <p className={`font-lora text-sm italic tracking-wide px-4 ${
                      isLast
                        ? "text-pink-300 text-base md:text-lg font-bold text-glow-pink"
                        : "text-slate-300 font-light"
                    }`}>
                      {text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* "Now" Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full max-w-[340px] text-center"
          >
            <div className="glass-card-neon p-[3px] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="bg-[#0b0a1a] rounded-[21px] p-3">
                <div className="relative w-full rounded-xl overflow-hidden shadow-inner bg-black/20" style={{ paddingTop: "125%" }}>
                  <div className="absolute inset-0">
                    {!nowPhotoError ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={PHOTOS.PHOTO_3}
                        alt="Now - Current"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        onError={() => setNowPhotoError(true)}
                        loading="lazy"
                      />
                    ) : (
                      <PhotoPlaceholder label="photo3.png (Current / Now)" />
                    )}
                  </div>
                </div>

                <h4 className="font-cinzel text-pink-400 text-lg font-black tracking-widest mt-5 text-glow-pink">
                  Now ❤️
                </h4>
                <p className="font-lora text-slate-400 italic text-sm mt-1">
                  365 days of holding close
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
