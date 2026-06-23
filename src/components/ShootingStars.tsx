"use client";

import { useEffect, useRef } from "react";

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export default function ShootingStars({ count = 5 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const stars: ShootingStar[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const spawnStar = (): ShootingStar => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5,
      length: Math.random() * 80 + 40,
      speed: Math.random() * 6 + 3,
      angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.3,
      opacity: 0,
      life: 0,
      maxLife: Math.random() * 60 + 60,
    });

    for (let i = 0; i < count; i++) {
      const s = spawnStar();
      s.life = Math.floor(Math.random() * s.maxLife);
      stars.push(s);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((s, i) => {
        s.life++;
        const progress = s.life / s.maxLife;
        s.opacity = progress < 0.2
          ? progress / 0.2
          : progress > 0.8
          ? (1 - progress) / 0.2
          : 1;

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;

        const grad = ctx.createLinearGradient(
          s.x, s.y,
          s.x - Math.cos(s.angle) * s.length,
          s.y - Math.sin(s.angle) * s.length
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
        grad.addColorStop(0.3, `rgba(236, 72, 153, ${s.opacity * 0.6})`);
        grad.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - Math.cos(s.angle) * s.length,
          s.y - Math.sin(s.angle) * s.length
        );
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (s.life >= s.maxLife) {
          stars[i] = spawnStar();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
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
