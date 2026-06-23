"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/config/memories";

const FINAL_LINES = [
  "Some people search a lifetime for what I found in you.",
  "Thank you for every call.",
  "Every laugh.",
  "Every memory.",
  "From strangers...",
  "To best friends...",
  "To home.",
];

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
}

interface Firefly {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export default function FinalSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [exploded, setExploded] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [fireflies, setFireflies] = useState<Firefly[]>([]);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    // Init fireflies
    setFireflies(
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        duration: Math.random() * 4 + 4,
      }))
    );
  }, []);

  // Canvas starfield + heart gather
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    interface CStar {
      x: number; y: number;
      vx: number; vy: number;
      tx: number; ty: number;
      size: number; alpha: number;
      isGathering: boolean;
    }

    const count = 220;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2 - 20;
    const scale = Math.min(canvas.width, canvas.height) * 0.18;

    const stars: CStar[] = Array.from({ length: count }, (_, i) => {
      const t = (i / count) * 2 * Math.PI;
      const tx = cx + scale * 16 * Math.pow(Math.sin(t), 3) / 16;
      const ty = cy - scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        tx, ty,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        isGathering: false,
      };
    });

    let animId: number;
    let gathering = false;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        if (gathering) {
          s.x += (s.tx - s.x) * 0.04;
          s.y += (s.ty - s.y) * 0.04;
          s.alpha = Math.min(1, s.alpha + 0.02);
        } else {
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < 0 || s.x > canvas.width) s.vx *= -1;
          if (s.y < 0 || s.y > canvas.height) s.vy *= -1;
          s.alpha = 0.3 + 0.4 * Math.sin(time * 0.001 + s.x);
        }

        const color = gathering
          ? `rgba(236,72,153,${s.alpha})`
          : `rgba(255,255,255,${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        if (gathering) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#ec4899";
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    // Trigger gathering after 1.8s
    const timer = setTimeout(() => {
      gathering = true;
      setTimeout(() => setShowFinal(true), 2200);
    }, 1800);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timer);
    };
  }, []);

  const handleContinue = () => {
    setExploded(true);
    const colors = ["#ec4899", "#f43f5e", "#a855f7", "#ffffff", "#fbbf24"];
    const ps: Particle[] = Array.from({ length: 90 }, (_, i) => ({
      id: i,
      x: 50,
      y: 50,
      vx: (Math.random() - 0.5) * 28,
      vy: (Math.random() - 0.5) * 28,
      size: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
    }));
    setParticles(ps);

    setTimeout(() => {
      setParticles([]);
      setExploded(false);
    }, 3000);
  };

  return (
    <section
      id="final"
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center, #15092a 0%, #060614 60%, #030308 100%)" }}
    >
      {/* Background canvas for starry heart */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-pink-500/[0.02] blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/[0.02] blur-[150px] pointer-events-none animate-pulse" />

      {/* Fireflies floating */}
      {fireflies.map((f) => (
        <div
          key={f.id}
          className="firefly"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
          }}
        />
      ))}

      {/* Explosion particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
          animate={{
            x: `${p.vx}vw`,
            y: `${p.vy}vh`,
            opacity: [1, 1, 0],
            scale: [1, 1.6, 0],
          }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        />
      ))}

      {/* Content wrapper */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        
        {/* Cinematic line sequence */}
        <div className="space-y-4 mb-16">
          {FINAL_LINES.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.35 }}
              className={`font-lora text-center ${
                i === 0
                  ? "text-lg md:text-2xl text-slate-200 italic"
                  : i >= 4
                  ? "text-xl md:text-2xl text-pink-300 font-bold tracking-wide"
                  : "text-base md:text-xl text-slate-400 italic"
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Climax declaration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5, type: "spring" }}
          className="mb-14"
        >
          <h2
            className="font-cinzel font-black tracking-widest text-glow-pink mb-4"
            style={{
              fontSize: "clamp(2rem, 6.5vw, 4.8rem)",
              background: "linear-gradient(135deg, #ec4899, #f43f5e, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            I Love You, {SITE_CONFIG.partnerName} ❤️
          </h2>
        </motion.div>

        {/* CTA Heart trigger */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          onClick={handleContinue}
          id="continue-journey-btn"
          className="relative inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-inter font-bold text-base md:text-lg cursor-pointer bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] mb-20 transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart size={20} className="fill-white animate-pulse" />
          <span>❤️ Continue Our Journey</span>
        </motion.button>

        {/* Final reveal signature block in neon frame */}
        {showFinal && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="glass-card-neon p-[2px] max-w-md mx-auto"
          >
            <div className="bg-[#0b0a1a] rounded-[22px] p-8">
              <p className="font-cinzel text-xl md:text-2xl text-white text-glow-white mb-2">
                &ldquo;Forever isn&apos;t a place.&rdquo;
              </p>
              <p className="font-cinzel text-2xl md:text-3xl font-black text-pink-300 text-glow-pink">
                &ldquo;It&apos;s you.&rdquo;
              </p>
              
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6 text-2xl flex justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-pink-400" />
                <Sparkles className="w-4 h-4 text-purple-400 mt-1" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
