"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/config/memories";
import StarField from "./StarField";
import ShootingStars from "./ShootingStars";

function AnimatedNumber({ target, duration = 2500 }: { target: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = Date.now();
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // stronger ease-out
      setDisplay(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplay(target);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return <div ref={ref}>{display.toLocaleString()}</div>;
}

function LiveSeconds() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const update = () => setSeconds(
      Math.floor((Date.now() - SITE_CONFIG.startDate.getTime()) / 1000)
    );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <>{seconds.toLocaleString()}</>;
}

const STATS = [
  { label: "Days", value: 365, emoji: "🌙", color: "from-violet-500 to-purple-600" },
  { label: "Hours", value: 8760, emoji: "⏰", color: "from-pink-500 to-rose-500" },
  { label: "Minutes", value: 525600, emoji: "💫", color: "from-fuchsia-500 to-pink-500" },
];

export default function DaysCounter() {
  return (
    <section
      id="days-counter"
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4"
      style={{ background: "linear-gradient(180deg, #04040f 0%, #0d0d2b 50%, #0a0a1e 100%)" }}
    >
      <StarField count={200} />
      <ShootingStars count={3} />

      {/* Nebula orbs */}
      <div className="orb orb-purple absolute w-[700px] h-[500px] opacity-10" style={{ top: "20%", left: "-20%" }} />
      <div className="orb orb-pink absolute w-[500px] h-[400px] opacity-8" style={{ bottom: "10%", right: "-15%" }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex justify-center mb-4">
            <span className="chapter-badge">Chapter Four</span>
          </div>
          <h2 className="font-cinzel text-3xl md:text-6xl font-black mb-4">
            <span className="gradient-text-animated">365 Days of Us</span>
          </h2>
          <p className="font-lora text-slate-400 italic text-lg md:text-xl">
            Every second, a memory. Every minute, a story.
          </p>
          <div className="glow-line max-w-xs mx-auto mt-6" />
        </motion.div>

        {/* Main counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, type: "spring", stiffness: 150 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="stat-card p-8 group"
            >
              {/* Top accent line */}
              <div className={`h-0.5 w-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${stat.color} opacity-80`} />

              <div className="text-3xl mb-3">{stat.emoji}</div>
              <div
                className="font-cinzel font-black counter-number mb-2"
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                  background: `linear-gradient(135deg, #f8fafc, #ec4899)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <AnimatedNumber target={stat.value} duration={2500} />
              </div>
              <div className="font-inter text-sm text-slate-400 tracking-[0.2em] uppercase">
                {stat.label}
              </div>

              {/* Hover glow */}
              <div className={`absolute inset-0 rounded-[20px] bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
            </motion.div>
          ))}
        </div>

        {/* Live seconds — hero card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="glass-card-neon p-10 mb-16 text-center"
        >
          <p className="font-inter text-xs text-pink-400 tracking-[0.3em] uppercase mb-4">Live Counter ✦ Ticking Right Now</p>

          <div
            className="font-cinzel font-black counter-number mb-3"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              background: "linear-gradient(135deg, #ec4899, #f43f5e, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 30px rgba(236,72,153,0.5))",
            }}
          >
            <LiveSeconds />
          </div>

          <div className="font-inter text-slate-400 tracking-[0.2em] uppercase text-sm mb-4">Seconds Together</div>

          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-1">
              {[0, 0.3, 0.6].map((d) => (
                <span key={d} className="w-1.5 h-1.5 rounded-full bg-pink-400"
                  style={{ animation: `pulse 1.5s ease-in-out ${d}s infinite` }} />
              ))}
            </div>
            <span className="font-inter text-xs text-pink-300">and every heartbeat adds one more</span>
          </div>

          <style jsx>{`
            @keyframes pulse {
              0%, 100% { opacity: 0.3; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1.4); box-shadow: 0 0 8px #ec4899; }
            }
          `}</style>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-2"
        >
          <p className="font-lora text-xl md:text-2xl text-slate-300 italic">
            &ldquo;And I&apos;d choose you again
          </p>
          <p className="font-lora text-xl md:text-2xl text-pink-300 italic font-medium">
            in every single one of them.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
