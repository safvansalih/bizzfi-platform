"use client";

import { motion } from "motion/react";


export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.15) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Blue Aurora */}
      <motion.div
        className="absolute left-[10%] top-[10%] h-[450px] w-[450px] rounded-full bg-blue-600/30 blur-[120px]"
        animate={{
          x: [0, 120, -60, 0],
          y: [0, -60, 80, 0],
          scale: [1, 1.25, 0.9, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cyan Aurora */}
      <motion.div
        className="absolute right-[5%] top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-500/25 blur-[120px]"
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 80, -50, 0],
          scale: [1, 0.85, 1.2, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Purple Aurora */}
      <motion.div
        className="absolute bottom-[-15%] left-[35%] h-[500px] w-[500px] rounded-full bg-violet-600/25 blur-[140px]"
        animate={{
          x: [0, 80, -80, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.25, 0.9, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top Glow */}
      <div className="absolute left-1/2 top-[-300px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-500/15 blur-[150px]" />

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}