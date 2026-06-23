"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Sparkles } from "lucide-react";
import { HEART_CARDS } from "@/config/memories";
import { HeartCard } from "@/types";
import StarField from "./StarField";

// Generate heart shape star positions
function getHeartPositions(count: number): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = [];
  const cx = 50, cy = 48, scale = 28;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * 2 * Math.PI;
    const x = cx + (scale * 16 * Math.pow(Math.sin(t), 3)) / 18;
    const y = cy - (scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))) / 18;
    positions.push({ x, y });
  }
  return positions;
}

const DECORATIVE_STARS = 60;
const INTERACTIVE_POSITIONS = [
  { x: 50, y: 25 },
  { x: 30, y: 40 },
  { x: 70, y: 40 },
  { x: 38, y: 58 },
  { x: 62, y: 58 },
];
const heartBgStars = getHeartPositions(DECORATIVE_STARS);

function CardModal({ card, onClose }: { card: HeartCard; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay flex items-center justify-center p-4 z-[9999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="glass-card-neon max-w-md w-full p-[3px] relative shadow-[0_30px_70px_rgba(0,0,0,0.8)]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 18 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-[#0b0a1a]/95 rounded-[21px] p-6 md:p-8 relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all z-10"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="text-4xl text-center mb-4 filter drop-shadow-[0_0_10px_rgba(236,72,153,0.4)]">
              {card.emoji}
            </div>

            <h3 className="font-cinzel text-xl font-bold text-white text-center text-glow-white mb-6">
              {card.title}
            </h3>

            <div className="relative px-4 py-3 rounded-xl bg-white/5 border border-white/5">
              <span className="absolute -top-2 left-4 px-2 bg-[#0b0a1a] text-pink-400 text-xs font-serif font-black">“</span>
              <p className="font-lora text-slate-300 leading-relaxed italic text-base text-center py-2">
                {card.content}
              </p>
              <span className="absolute -bottom-4 right-4 px-2 bg-[#0b0a1a] text-pink-400 text-xs font-serif font-black">”</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function HeartConstellation() {
  const [selected, setSelected] = useState<HeartCard | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="heart-constellation"
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #04040f 0%, #080718 50%, #0d0d2b 100%)" }}
    >
      <StarField count={100} />

      {/* Atmospheric glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-pink-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Chapter Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-xs font-semibold uppercase tracking-[0.3em] text-pink-300 backdrop-blur-md mb-6">
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/20" />
            <span>Chapter Seven</span>
          </div>

          <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-white text-glow-pink mb-4">
            Heart Constellation
          </h2>
          <p className="font-lora text-slate-300 italic text-lg max-w-md mx-auto">
            Five stars. Five fundamental truths. Click each star to reveal.
          </p>
        </motion.div>

        {/* Heart SVG and star canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative w-full rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{ paddingTop: "80%", maxWidth: 500, margin: "0 auto" }}
        >
          <svg
            viewBox="0 0 100 90"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Decorative heart stars (Client-only rendering to avoid hydration mismatch) */}
            {mounted && heartBgStars.map((pos, i) => (
              <motion.circle
                key={i}
                cx={pos.x}
                cy={pos.y}
                r="0.45"
                fill="#ec4899"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 0.45] }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.02 }}
                style={{
                  animation: `twinkle ${Math.random() * 2 + 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}

            {/* Heart glow outline path */}
            <motion.path
              d="M50,30 C50,30 30,10 15,22 C5,30 5,48 20,60 L50,85 L80,60 C95,48 95,30 85,22 C70,10 50,30 50,30 Z"
              fill="none"
              stroke="rgba(236,72,153,0.25)"
              strokeWidth="0.45"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            />

            {/* Interactive truth stars */}
            {HEART_CARDS.map((card, i) => {
              const pos = INTERACTIVE_POSITIONS[i];
              return (
                <g key={card.id} className="cursor-pointer" onClick={() => setSelected(card)}>
                  {/* Hover scope */}
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r="5"
                    fill="transparent"
                  />
                  
                  {/* Pulsing ring */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="3"
                    className="fill-none stroke-pink-400/20 stroke-[0.3]"
                    style={{
                      transformOrigin: `${pos.x}px ${pos.y}px`,
                      animation: `ripple 3s ease-out infinite`,
                      animationDelay: `${i * 0.6}s`
                    }}
                  />

                  {/* Star Core */}
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r="1.5"
                    fill="#ffffff"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.5 + i * 0.15 }}
                    whileHover={{ r: 2.5, fill: "#ec4899" }}
                  />

                  {/* Glow filter */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="1.2"
                    className="pointer-events-none fill-pink-400 opacity-60"
                    filter="url(#starGlow)"
                  />

                  {/* Emoji text */}
                  <motion.text
                    x={pos.x}
                    y={pos.y - 4}
                    textAnchor="middle"
                    fontSize="3"
                    fill="rgba(248,250,252,0.9)"
                    className="pointer-events-none select-none font-sans"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                  >
                    {card.emoji}
                  </motion.text>

                  {/* Star title */}
                  <motion.text
                    x={pos.x}
                    y={pos.y + 5.2}
                    textAnchor="middle"
                    fontSize="1.9"
                    fill="rgba(203,168,255,0.85)"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                    className="pointer-events-none select-none tracking-wide text-glow-purple font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + i * 0.15 }}
                  >
                    {card.title.split(" ").slice(0, 3).join(" ")}
                  </motion.text>
                </g>
              );
            })}

            <defs>
              <filter id="starGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </svg>
        </motion.div>

        <p className="text-center font-inter text-xs text-slate-500 mt-6 tracking-wide animate-pulse">
          ✨ Click any star in the heart constellation to reveal the truth ✨
        </p>
      </div>

      {/* CSS animation for ripple effect */}
      <style>{`
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.8); opacity: 0; }
        }
      `}</style>

      {selected && <CardModal card={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
