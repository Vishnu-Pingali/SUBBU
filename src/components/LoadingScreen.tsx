"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"stars" | "text1" | "text2" | "heart" | "done">("stars");
  const [opacity, setOpacity] = useState(1);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      tx: number; ty: number; size: number; alpha: number;
      isMoving: boolean;
    }

    const count = 300;
    const particles: Particle[] = [];

    // Build heart shape target points
    const heartPoints: { x: number; y: number }[] = [];
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const scale = Math.min(canvas.width, canvas.height) * 0.18;

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const hx = cx + scale * 16 * Math.pow(Math.sin(t), 3) / 16;
      const hy = cy - scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16;
      heartPoints.push({ x: hx, y: hy });
    }

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        tx: heartPoints[i].x,
        ty: heartPoints[i].y,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        isMoving: false,
      });
    }

    let animId: number;
    let gatherStarted = false;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        if (p.isMoving) {
          p.x += (p.tx - p.x) * 0.05;
          p.y += (p.ty - p.y) * 0.05;
        } else {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `rgba(255, 255, 255, ${p.alpha})`);
        grad.addColorStop(1, `rgba(236, 72, 153, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      if (gatherStarted) {
        // Draw heart glow overlay
        ctx.save();
        ctx.globalAlpha = 0.2;
        ctx.shadowBlur = 50;
        ctx.shadowColor = "#ec4899";
        ctx.fillStyle = "#ec4899";
        ctx.beginPath();
        for (let i = 0; i <= 100; i++) {
          const t = (i / 100) * Math.PI * 2;
          const hx = cx + scale * 16 * Math.pow(Math.sin(t), 3) / 16;
          const hy = cy - scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16;
          if (i === 0) ctx.moveTo(hx, hy); else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    // Progress counter animation
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 55);

    // Timeline phases
    const t1 = setTimeout(() => setPhase("text1"), 300);
    const t2 = setTimeout(() => setPhase("text2"), 1500);
    const t3 = setTimeout(() => {
      setPhase("heart");
      gatherStarted = true;
      particles.forEach((p) => { p.isMoving = true; });
    }, 2800);
    const t4 = setTimeout(() => {
      setOpacity(0);
      setTimeout(onComplete, 800);
    }, 4200);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(interval);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #110724 0%, #060614 60%, #030308 100%)",
        opacity,
        transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: opacity < 0.1 ? "none" : "all",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Background ambient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-pink-500/[0.03] blur-[150px] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-lg w-full">
        {phase === "text1" && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 0.8 }}
            className="font-cinzel text-4xl md:text-5xl font-black text-white text-glow-pink tracking-wider"
          >
            365 Constellations of Us
          </motion.div>
        )}
        
        {phase === "text2" && (
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 1, filter: "blur(0px)" }}
              className="font-cinzel text-4xl md:text-5xl font-black text-white text-glow-pink tracking-wider mb-6"
            >
              365 Constellations of Us
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full flex flex-col items-center gap-4"
            >
              <span className="font-lora text-sm md:text-base text-pink-300 italic tracking-wider animate-pulse">
                Charting our stars...
              </span>
              
              {/* Glowing progress slider bar */}
              <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full transition-all duration-100 ease-out shadow-[0_0_8px_#ec4899]"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </motion.div>
          </div>
        )}
        
        {(phase === "heart" || phase === "done") && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.7, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 120 }}
            className="text-center"
          >
            <div 
              className="text-6xl md:text-7xl filter drop-shadow-[0_0_20px_#ec4899]"
            >
              ❤️
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
