"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Trophy, RotateCcw, Lock, Unlock, Zap, Sparkles } from "lucide-react";
import { eventConfig } from "@/config/event";
import { soundEffects } from "@/utils/audio";

export function GameSection({ onWinCelebration }: { onWinCelebration?: () => void }) {
  const [score, setScore] = useState(0);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const targetTimerRef = useRef<NodeJS.Timeout | null>(null);

  const WIN_SCORE = 14;

  const endGame = useCallback((won: boolean) => {
    setIsPlaying(false);
    setTargetIndex(null);
    if (timerRef.current) clearInterval(timerRef.current);
    if (targetTimerRef.current) clearInterval(targetTimerRef.current);

    if (won) {
      setIsWon(true);
      soundEffects.playVictory();
      if (onWinCelebration) onWinCelebration();
    }
  }, [onWinCelebration]);

  const spawnTarget = useCallback(() => {
    const nextIndex = Math.floor(Math.random() * 9);
    setTargetIndex(nextIndex);
  }, []);

  const startGame = () => {
    soundEffects.playTap();
    setScore(0);
    setTimeLeft(25);
    setIsWon(false);
    setIsPlaying(true);
    spawnTarget();
  };

  // Main countdown loop
  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, endGame]);

  // Target hopper loop
  useEffect(() => {
    if (!isPlaying) return;

    targetTimerRef.current = setInterval(() => {
      spawnTarget();
    }, 1100);

    return () => {
      if (targetTimerRef.current) clearInterval(targetTimerRef.current);
    };
  }, [isPlaying, spawnTarget]);

  const handleCellTap = (index: number) => {
    if (!isPlaying) return;

    if (index === targetIndex) {
      soundEffects.playScore();
      const nextScore = score + 1;
      setScore(nextScore);

      if (nextScore >= WIN_SCORE) {
        endGame(true);
      } else {
        spawnTarget();
      }
    }
  };

  return (
    <section
      id="game"
      aria-label="Arcade Mini-Game Section"
      className="scroll-mt-20 flex flex-col"
    >
      <div className="glass-panel glass-panel-yellow p-6 flex flex-col relative overflow-hidden border-yellow-500/30">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-2 text-yellow-400 text-xs font-semibold uppercase tracking-wider">
            <Gamepad2 className="w-4 h-4 text-yellow-400" />
            <span>Reflex Arcade Challenge</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-fuchsia-500/15 border border-fuchsia-400/30 text-fuchsia-300 text-[10px] font-mono">
            {isWon ? <Unlock className="w-3 h-3 text-lime-400" /> : <Lock className="w-3 h-3 text-fuchsia-400" />}
            <span>Target: {WIN_SCORE} Hits</span>
          </div>
        </div>

        <h2 className="font-heading text-xl font-black uppercase tracking-tight text-white mb-1">
          Angad&apos;s <span className="neon-text-yellow">Neon Rush</span>
        </h2>
        <p className="text-gray-400 text-xs mb-5">
          Tap 14 glowing power orbs before time runs out to unlock Angad&apos;s secret VIP message!
        </p>

        {/* Game Area */}
        {isWon ? (
          /* WINNER SCREEN: UNLOCK SECRET MESSAGE */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-2xl bg-black/70 border border-yellow-400/40 text-center flex flex-col items-center shadow-[0_0_30px_rgba(255,230,0,0.2)]"
          >
            <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 border border-yellow-400 flex items-center justify-center text-yellow-300 mb-3 shadow-[0_0_20px_rgba(255,230,0,0.4)]">
              <Trophy className="w-8 h-8 text-yellow-400 animate-bounce" />
            </div>

            <span className="text-[10px] font-mono uppercase tracking-widest text-fuchsia-400 font-bold mb-1">
              Secret Easter Egg Unlocked
            </span>
            <h3 className="font-heading text-base font-black text-white uppercase mb-2">
              VIP Champion Access
            </h3>

            {/* Secret Message from Config */}
            <div className="p-3.5 rounded-xl bg-yellow-500/10 border border-yellow-400/30 text-xs text-yellow-200 leading-relaxed mb-4 font-medium">
              &ldquo;{eventConfig.secretMessage}&rdquo;
            </div>

            <button
              type="button"
              onClick={startGame}
              className="tap-target py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs text-white font-mono flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Play Again</span>
            </button>
          </motion.div>
        ) : (
          /* GAME SCREEN / GRID */
          <div className="flex flex-col items-center">
            {/* Score HUD */}
            <div className="w-full flex items-center justify-between p-3 rounded-xl bg-black/60 border border-yellow-500/20 mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-mono text-gray-300">Score:</span>
                <span className="font-heading text-base font-black neon-text-yellow">
                  {score} / {WIN_SCORE}
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className="text-gray-400">Time:</span>
                <span className={`font-bold ${timeLeft <= 5 ? "text-red-400 animate-pulse" : "text-yellow-300"}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>

            {/* 3x3 Arcade Grid */}
            <div className="grid grid-cols-3 gap-2.5 w-full aspect-square max-w-[280px] p-2 rounded-2xl bg-black/50 border border-yellow-500/20">
              {Array.from({ length: 9 }).map((_, idx) => {
                const isTarget = targetIndex === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleCellTap(idx)}
                    disabled={!isPlaying}
                    className={`rounded-xl transition-all duration-150 flex items-center justify-center select-none ${
                      isTarget
                        ? "bg-gradient-to-tr from-yellow-400 to-pink-500 border-2 border-white shadow-[0_0_20px_rgba(255,230,0,0.6)] scale-105 active:scale-95"
                        : "bg-white/5 border border-white/5"
                    }`}
                  >
                    {isTarget && (
                      <Sparkles className="w-6 h-6 text-black animate-spin" style={{ animationDuration: "3s" }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Start / Retry Button */}
            {!isPlaying && (
              <button
                type="button"
                onClick={startGame}
                className="tap-target mt-4 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-pink-500 hover:from-yellow-300 hover:to-pink-400 text-[#07070D] font-heading text-xs font-black uppercase tracking-wider shadow-[0_0_25px_rgba(255,230,0,0.45)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Gamepad2 className="w-4 h-4 text-[#07070D]" />
                <span>{score > 0 ? "Retry Challenge" : "Start Reflex Challenge"}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
