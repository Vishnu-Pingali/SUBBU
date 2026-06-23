"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PHOTOS } from "@/config/memories";
import { Sparkles, Calendar } from "lucide-react";

export default function FirstMeetSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="first-meet"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      {/* Background Parallax Layer */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale, y }}
      >
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={PHOTOS.PHOTO_1}
            alt="First Meet"
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          // Premium Cinematic Starscape Placeholder
          <div
            className="w-full h-full relative"
            style={{
              background: "radial-gradient(ellipse at center, #110724 0%, #070716 60%, #03030a 100%)",
            }}
          >
            {/* Soft background glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-pink-500/10 blur-[100px] pointer-events-none" />
            
            {/* Custom glowing stars grid (Client-Only to avoid SSR mismatch) */}
            {mounted && Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.2,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                }}
              />
            ))}
            
            {/* Elegant placeholder message */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-sm px-6 py-8 rounded-2xl border border-dashed border-pink-500/20 bg-pink-950/10 backdrop-blur-sm">
                <Sparkles className="w-8 h-8 mx-auto text-pink-400 animate-bounce mb-3" />
                <p className="font-cinzel text-white text-sm font-semibold tracking-wider">Our First Meet Photo</p>
                <p className="font-lora text-xs text-slate-400 italic mt-2">
                  Drop "photo1.png" in public/photos to display here
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Cinematic dark overlay gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#0a0a1e]/40 via-[#04040f]/60 to-[#04040f]" 
        />
      </motion.div>

      {/* Floating Sparkles Overlay (Client-Only to avoid SSR mismatch) */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-300 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 4 + 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Text Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        style={{ y: textY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Chapter Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-xs font-semibold uppercase tracking-[0.3em] text-pink-300 backdrop-blur-md mb-6">
            <Calendar className="w-3.5 h-3.5 text-pink-400" />
            <span>Chapter Three</span>
          </div>

          <h2 className="font-cinzel text-5xl md:text-7xl font-black text-white text-glow-white tracking-wide mb-3">
            January
          </h2>
          <p className="font-lora text-2xl md:text-3xl text-pink-300 text-glow-pink italic mb-12">
            &ldquo;The day distance finally lost.&rdquo;
          </p>
        </motion.div>

        {/* Narrative Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="glass-card-strong p-8 md:p-10 text-left border-l-4 border-l-pink-500/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <p className="font-lora text-base md:text-lg text-slate-200 leading-relaxed font-light">
            After months of video calls, counting down days, missing each other in silence, and dreaming about
            this very moment...
          </p>
          <div className="h-px bg-gradient-to-r from-pink-500/30 to-transparent my-6" />
          <p className="font-lora text-lg md:text-xl text-pink-200 leading-relaxed italic font-medium">
            I finally got to see the beautiful smile I had only ever known through a screen. You were real, you were right there in front of me, and everything else simply faded away.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
