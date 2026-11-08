"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotate: number;
  shape: "circle" | "rect" | "ribbon";
}

const NEON_COLORS = [
  "#00F0FF", // Cyan
  "#FF2BD6", // Magenta
  "#B6FF00", // Lime
  "#FF8A00", // Orange
  "#A855FF", // Violet
  "#39FF14", // Green
  "#FFE600", // Yellow
];

export function Confetti({
  trigger,
  onComplete,
}: {
  trigger: boolean;
  onComplete?: () => void;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!trigger) return;

    const newParticles: Particle[] = Array.from({ length: 36 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 320 - 160,
      y: -Math.random() * 260 - 80,
      color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
      size: Math.floor(Math.random() * 8) + 6,
      rotate: Math.floor(Math.random() * 360),
      shape: i % 3 === 0 ? "ribbon" : i % 2 === 0 ? "circle" : "rect",
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
      if (onComplete) onComplete();
    }, 2400);

    return () => clearTimeout(timer);
  }, [trigger, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              opacity: 1,
              scale: 0.2,
              x: 0,
              y: 0,
              rotate: 0,
            }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0.2, 1.2, 0.8],
              x: p.x * 1.4,
              y: [0, p.y, p.y + 350],
              rotate: p.rotate * 2,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              position: "absolute",
              width: p.shape === "ribbon" ? p.size * 2 : p.size,
              height: p.shape === "circle" ? p.size : p.shape === "ribbon" ? p.size / 2 : p.size,
              backgroundColor: p.color,
              borderRadius: p.shape === "circle" ? "9999px" : p.shape === "ribbon" ? "2px" : "3px",
              boxShadow: `0 0 8px ${p.color}`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

