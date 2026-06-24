"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Star } from "lucide-react";
import { MEMORIES } from "@/config/memories";
import { Memory } from "@/types";
import StarField from "./StarField";
import Image from "next/image";

// Constellation connections [from index, to index]
const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 3], [1, 4],
];

function MemoryModal({ memory, onClose }: { memory: Memory; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay flex items-center justify-center p-4 z-[9999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Modal container with neon border */}
        <motion.div
          className="glass-card-neon max-w-lg w-full p-[3px] relative shadow-[0_30px_70px_rgba(0,0,0,0.8)]"
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Inner card content */}
          <div className="bg-[#0b0a1a]/95 rounded-[21px] p-6 md:p-8 relative overflow-hidden">
            {/* Ambient background glow inside the modal */}
            <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all z-10"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="text-4xl mb-4 text-center filter drop-shadow-[0_0_10px_rgba(236,72,153,0.4)]">
              {memory.emoji}
            </div>
            
            <h3 className="font-cinzel text-2xl font-bold text-white text-center text-glow-white mb-1">
              {memory.title}
            </h3>
            
            <p className="font-inter text-[10px] text-pink-400 tracking-[0.25em] text-center mb-6 uppercase font-semibold">
              ✨ {memory.date} ✨
            </p>

            {memory.image && (
              <div className="relative w-full h-56 rounded-xl overflow-hidden mb-6 border border-white/10 shadow-lg">
                <Image
                  src={memory.image}
                  alt={memory.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 512px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a1a] via-transparent to-transparent" />
              </div>
            )}

            <div className="relative px-4 py-3 rounded-xl bg-white/5 border border-white/5">
              <span className="absolute -top-2 left-4 px-2 bg-[#0b0a1a] text-pink-400 text-xs font-serif font-black">“</span>
              <p className="font-lora text-slate-300 leading-relaxed text-base italic text-center py-2">
                {memory.text}
              </p>
              <span className="absolute -bottom-4 right-4 px-2 bg-[#0b0a1a] text-pink-400 text-xs font-serif font-black">”</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function MemoryConstellation() {
  const [selected, setSelected] = useState<Memory | null>(null);

  return (
    <section
      id="constellation"
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d0d2b 0%, #080718 50%, #0a0a1e 100%)" }}
    >
      <StarField count={120} />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-pink-500/5 blur-[120px] pointer-events-none" />

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
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-xs font-semibold uppercase tracking-[0.3em] text-pink-300 backdrop-blur-md mb-6">
            <Star className="w-3.5 h-3.5 text-pink-400" />
            <span>Chapter Two</span>
          </div>

          <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-white text-glow-pink mb-4">
            Memory Constellation
          </h2>
          <p className="font-lora text-slate-300 italic text-lg max-w-lg mx-auto">
            Every star is a snapshot of our love. Click a star to unveil the memory behind it.
          </p>
        </motion.div>

        {/* SVG Constellation with glow wrapper */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="relative w-full rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{ paddingTop: "60%" }}
        >
          <svg
            viewBox="0 0 100 70"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Connection lines */}
            {CONNECTIONS.map(([from, to], i) => {
              const m1 = MEMORIES[from];
              const m2 = MEMORIES[to];
              return (
                <motion.line
                  key={i}
                  x1={m1.x}
                  y1={m1.y}
                  x2={m2.x}
                  y2={m2.y}
                  stroke="rgba(236,72,153,0.3)"
                  strokeWidth="0.3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                  className="constellation-line"
                />
              );
            })}

            {/* Stars */}
            {MEMORIES.map((memory, i) => (
              <g key={memory.id} className="cursor-pointer group" onClick={() => setSelected(memory)}>
                {/* Outer hover trigger */}
                <motion.circle
                  cx={memory.x}
                  cy={memory.y}
                  r="4"
                  fill="transparent"
                  className="cursor-pointer"
                  whileHover={{ scale: 1.5 }}
                />
                
                {/* Ripple animation ring */}
                <circle
                  cx={memory.x}
                  cy={memory.y}
                  r="2.5"
                  className="fill-none stroke-pink-500/20 stroke-[0.3]"
                  style={{
                    transformOrigin: `${memory.x}px ${memory.y}px`,
                    animation: `ripple 2.5s ease-out infinite`,
                    animationDelay: `${i * 0.4}s`
                  }}
                />

                {/* Core Star Node */}
                <motion.circle
                  cx={memory.x}
                  cy={memory.y}
                  r="1.2"
                  className="star-node cursor-pointer"
                  fill="#ffffff"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.5 + i * 0.1 }}
                  whileHover={{ r: 2.2, fill: "#ec4899" }}
                />

                {/* Star Glow Filter Overlay */}
                <circle
                  cx={memory.x}
                  cy={memory.y}
                  r="0.8"
                  className="pointer-events-none fill-pink-400 opacity-60"
                  filter="url(#starNodeGlow)"
                />

                {/* Emoji label */}
                <motion.text
                  x={memory.x}
                  y={memory.y - 3.8}
                  textAnchor="middle"
                  fontSize="2.8"
                  fill="rgba(248,250,252,0.9)"
                  className="pointer-events-none select-none font-sans"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  {memory.emoji}
                </motion.text>
                
                {/* Name label */}
                <motion.text
                  x={memory.x}
                  y={memory.y + 4.8}
                  textAnchor="middle"
                  fontSize="2"
                  fill="rgba(203,168,255,0.85)"
                  fontFamily="Inter, sans-serif"
                  fontWeight="600"
                  className="pointer-events-none select-none tracking-wider text-glow-purple font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  {memory.title}
                </motion.text>
              </g>
            ))}

            <defs>
              <filter id="starNodeGlow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </svg>
        </motion.div>

        <p className="text-center font-inter text-xs text-slate-500 mt-6 tracking-wide animate-pulse">
          ✨ Click any pulsing star above to relive the moment ✨
        </p>
      </div>

      {/* CSS animation for ripple effect */}
      <style>{`
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.8); opacity: 0; }
        }
      `}</style>

      {/* Modal */}
      {selected && (
        <MemoryModal memory={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
