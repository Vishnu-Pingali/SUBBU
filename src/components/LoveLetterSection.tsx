"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, MailOpen, Mail } from "lucide-react";
import { LOVE_LETTER } from "@/config/memories";
import StarField from "./StarField";

export default function LoveLetterSection() {
  const [visibleLines, setVisibleLines] = useState<Set<number>>(new Set());
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const observers: IntersectionObserver[] = [];
    lineRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleLines((prev) => new Set([...prev, i]));
            }, i * 150);
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isOpen]);

  const readLetter = () => {
    if (!("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const text = LOVE_LETTER.paragraphs.join(". ");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    utterance.lang = "en-IN";
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <section
      id="love-letter"
      className="relative py-24 px-4 overflow-hidden min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(180deg, #0a0a1e 0%, #04040f 50%, #0d0d2b 100%)" }}
    >
      <StarField count={100} />

      {/* Atmospheric auroral lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-80 opacity-20 pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(circle, #6b21a8, transparent)" }} />

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-xs font-semibold uppercase tracking-[0.3em] text-pink-300 backdrop-blur-md mb-6">
            <span>Chapter Five</span>
          </div>
          
          <h2 className="font-cinzel text-3xl md:text-5xl font-black text-white text-glow-pink mb-3">
            💌 {LOVE_LETTER.heading}
          </h2>
          <p className="font-lora text-slate-400 italic text-lg">
            {LOVE_LETTER.subtitle}
          </p>
        </motion.div>

        {/* Envelope Interaction */}
        <div className="w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Closed Sealed Envelope state */
              <motion.div
                key="closed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                className="w-full max-w-xl glass-card-strong p-8 text-center flex flex-col items-center justify-center border border-pink-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-pointer"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative mb-6 p-6 rounded-full bg-pink-500/10 border border-pink-500/20">
                  <Mail className="w-12 h-12 text-pink-400 animate-pulse" />
                  <div className="absolute top-1 right-1 w-3 h-3 bg-pink-500 rounded-full animate-ping" />
                </div>
                
                <h3 className="font-cinzel text-xl font-bold text-white tracking-wider mb-2">You have a letter from me</h3>
                <p className="font-lora text-slate-400 italic text-sm mb-6">Click envelope to break the seal and read</p>
                
                <motion.button
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-inter text-sm font-semibold tracking-wider hover:opacity-90 shadow-lg"
                  whileTap={{ scale: 0.95 }}
                >
                  ✉️ Open Letter
                </motion.button>
              </motion.div>
            ) : (
              /* Opened Scroll letter content */
              <motion.div
                key="open"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="w-full"
              >
                {/* Speech Control & Action Row */}
                <div className="flex justify-between items-center mb-6 w-full px-4">
                  <div className="flex items-center gap-2">
                    <MailOpen className="w-5 h-5 text-pink-400" />
                    <span className="font-inter text-xs text-slate-400 uppercase tracking-widest font-semibold">Seal Broken</span>
                  </div>

                  <button
                    onClick={readLetter}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 font-inter text-xs font-semibold tracking-wider hover:bg-pink-500/20 hover:text-pink-200 transition-all hover:shadow-[0_0_15px_rgba(236,72,153,0.25)]"
                    aria-label={speaking ? "Stop reading" : "Read letter aloud"}
                  >
                    {speaking ? <VolumeX size={14} className="animate-bounce" /> : <Volume2 size={14} />}
                    {speaking ? "Stop Reading" : "🔊 Listen to Letter"}
                  </button>
                </div>

                {/* Narrative Parchment Sheet */}
                <div className="glass-card-strong p-8 md:p-12 border border-pink-500/15 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
                  {/* Glowing vertical lines to suggest scroll texture */}
                  <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-pink-500/10 to-transparent" />
                  <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-pink-500/10 to-transparent" />

                  {/* Decorative seal top */}
                  <div className="flex items-center gap-4 mb-10">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />
                    <span className="text-pink-400 text-xl filter drop-shadow-[0_0_6px_#ec4899]">❤️</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />
                  </div>

                  {/* Letter paragraphs */}
                  <div className="space-y-6">
                    {LOVE_LETTER.paragraphs.map((para, i) => (
                      <div
                        key={i}
                        ref={(el) => { lineRefs.current[i] = el; }}
                        className="letter-line"
                        style={{
                          opacity: visibleLines.has(i) ? 1 : 0,
                          transform: visibleLines.has(i) ? "translateY(0)" : "translateY(12px)",
                          transition: "opacity 0.8s ease, transform 0.8s ease",
                        }}
                      >
                        <p
                          className={`font-lora leading-relaxed text-center ${
                            i === 0
                              ? "text-pink-300 text-xl font-bold italic tracking-wide mb-6"
                              : i >= LOVE_LETTER.paragraphs.length - 2
                              ? "text-pink-200 font-bold italic text-lg mt-8"
                              : "text-slate-200 text-base md:text-lg font-light leading-loose"
                          }`}
                        >
                          {para}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Decorative seal bottom */}
                  <div className="flex items-center gap-4 mt-12">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />
                    <span className="text-pink-400 text-xl filter drop-shadow-[0_0_6px_#ec4899]">🫂</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
