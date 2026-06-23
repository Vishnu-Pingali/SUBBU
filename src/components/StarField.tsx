"use client";

import { useEffect, useRef, memo } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

function StarField({ count = 200 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let stars: Star[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildStars();
    };

    const buildStars = () => {
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.2,
        opacity: Math.random() * 0.7 + 0.1,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        const osc = Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
        const alpha = s.opacity * (0.5 + 0.5 * osc);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };

    resize();
    animId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

export default memo(StarField);
