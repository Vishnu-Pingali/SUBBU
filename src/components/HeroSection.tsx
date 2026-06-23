"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import StarField from "./StarField";
import ShootingStars from "./ShootingStars";
import { SITE_CONFIG } from "@/config/memories";

const TYPEWRITER_LINES = [
  "One year ago, we were strangers.",
  "Today, you're my favorite person.",
];

export default function HeroSection() {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const orb1X = useTransform(springX, [-1, 1], [-40, 40]);
  const orb1Y = useTransform(springY, [-1, 1], [-30, 30]);
  const orb2X = useTransform(springX, [-1, 1], [30, -30]);
  const orb2Y = useTransform(springY, [-1, 1], [20, -20]);
  const starsX = useTransform(springX, [-1, 1], [-10, 10]);
  const starsY = useTransform(springY, [-1, 1], [-8, 8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouseX.set((e.clientX / w) * 2 - 1);
      mouseY.set((e.clientY / h) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Typewriter
  useEffect(() => {
    if (paused) {
      const timer = setTimeout(() => {
        setPaused(false);
        if (lineIndex < TYPEWRITER_LINES.length - 1) {
          setLineIndex((i) => i + 1);
          setCharIndex(0);
          setDisplayedText("");
        }
      }, 2000);
      return () => clearTimeout(timer);
    }

    const line = TYPEWRITER_LINES[lineIndex];
    if (charIndex >= line.length) { setPaused(true); return; }

    const timer = setTimeout(() => {
      setDisplayedText(line.slice(0, charIndex + 1));
      setCharIndex((c) => c + 1);
    }, 45);
    return () => clearTimeout(timer);
  }, [charIndex, lineIndex, paused]);

  const scrollToNext = () => {
    document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 20%, #1e0a3c 0%, #0f0f2e 40%, #04040f 100%)" }}
    >
      {/* Deep nebula backdrop */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(107,33,168,0.2) 0%, transparent 100%)" }} />

      {/* Parallax star layers */}
      <motion.div style={{ x: starsX, y: starsY }} className="absolute inset-0 pointer-events-none">
        <StarField count={280} />
      </motion.div>
      <ShootingStars count={6} />

      {/* Aurora curtain */}
      <div className="aurora-curtain" />

      {/* Floating nebula orbs — parallax */}
      <motion.div
        className="orb orb-purple absolute w-[600px] h-[600px] opacity-20"
        style={{ top: "10%", left: "-10%", x: orb1X, y: orb1Y }}
      />
      <motion.div
        className="orb orb-pink absolute w-[500px] h-[500px] opacity-15"
        style={{ bottom: "5%", right: "-10%", x: orb2X, y: orb2Y }}
      />
      <motion.div
        className="orb orb-rose absolute w-[300px] h-[300px] opacity-10"
        style={{ top: "40%", right: "20%", x: orb2X, y: orb1Y }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">

        {/* Chapter badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <span className="chapter-badge">
            <span className="sparkle-spin">✦</span>
            Our Love Story
            <span className="sparkle-spin" style={{ animationDelay: "1.5s" }}>✦</span>
          </span>
        </motion.div>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-8 h-12 flex items-center justify-center"
        >
          <p className="font-lora text-lg md:text-2xl text-pink-200 italic">
            {displayedText}
            <span className="typing-cursor" />
          </p>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-cinzel font-black leading-tight mb-6 gradient-text-animated"
          style={{ fontSize: "clamp(2.2rem, 6vw, 5.5rem)" }}
        >
          {SITE_CONFIG.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="font-lora text-base md:text-xl text-slate-300 italic mb-14 max-w-2xl mx-auto leading-relaxed"
        >
          {SITE_CONFIG.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.9, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={scrollToNext}
          id="begin-journey-btn"
          className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-inter font-medium text-base md:text-lg cursor-pointer"
        >
          <Sparkles size={20} className="relative z-10" />
          <span className="relative z-10">Begin Our Journey</span>
          <Sparkles size={20} className="relative z-10" />
        </motion.button>

        {/* Stats teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-16 flex items-center justify-center gap-8 md:gap-16"
        >
          {[
            { value: "365", label: "Days" },
            { value: "❤️", label: "Forever" },
            { value: "∞", label: "Memories" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-cinzel text-2xl md:text-3xl font-bold text-pink-300 text-glow-pink">{s.value}</div>
              <div className="font-inter text-xs text-slate-500 tracking-widest uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToNext}
      >
        <span className="font-inter text-xs text-slate-500 tracking-[0.3em] uppercase">Scroll to explore</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={22} className="text-pink-400 opacity-70" />
        </motion.div>
      </motion.div>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, #04040f, transparent)" }} />
    </section>
  );
}
