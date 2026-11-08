"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  Timer,
  Lock,
  Unlock,
  Sparkles,
  Star,
} from "lucide-react";
import { eventConfig } from "@/config/event";
import { useMemoryGame, CardState } from "@/hooks/useMemoryGame";
import { FallbackFace } from "@/components/FallbackFace";
import { soundEffects } from "@/utils/audio";

function MemoryCard({
  card,
  isMismatch,
  onFlip,
}: {
  card: CardState;
  isMismatch: boolean;
  onFlip: (id: number) => void;
}) {
  const face = eventConfig.faces[card.pairId];
  const [imgError, setImgError] = useState(false);
  const isVisible = card.isFlipped || card.isMatched;

  // Neon colours per pair
  const pairGlow = ["#00F0FF", "#FF2BD6", "#B6FF00", "#FFE600"];
  const glow = pairGlow[card.pairId];

  return (
    <motion.div
      animate={
        isMismatch
          ? { x: [0, -6, 6, -6, 6, 0] }
          : {}
      }
      transition={{ duration: 0.4 }}
      className="relative"
      style={{ perspective: "600px" }}
    >
      <button
        type="button"
        onClick={() => {
          if (!isVisible) soundEffects.playTap();
          onFlip(card.id);
        }}
        disabled={card.isMatched}
        aria-label={
          isVisible
            ? `${face?.label ?? `Face ${card.pairId + 1}`} — ${card.isMatched ? "matched" : "flipped"}`
            : "Hidden card"
        }
        className="w-full aspect-square relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 rounded-xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Inner wrapper — the 3-D flip */}
        <motion.div
          animate={{ rotateY: isVisible ? 180 : 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Back face */}
          <div
            className="absolute inset-0 rounded-xl bg-black/70 border-2 border-yellow-500/40 flex items-center justify-center overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400/60" />
          </div>

          {/* Front face */}
          <div
            className={`absolute inset-0 rounded-xl overflow-hidden flex items-center justify-center ${
              card.isMatched
                ? "border-2"
                : "border border-white/10"
            }`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderColor: card.isMatched ? glow : undefined,
              boxShadow: card.isMatched ? `0 0 16px ${glow}60` : undefined,
              background: "linear-gradient(135deg, #0a0a1a 0%, #12122a 100%)",
            }}
          >
            {!imgError ? (
              <Image
                src={face?.src ?? ""}
                alt={face?.label ?? `Face ${card.pairId + 1}`}
                fill
                className="object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <FallbackFace index={card.pairId} />
            )}
            {/* Matched sparkle overlay */}
            {card.isMatched && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Sparkles
                  className="w-5 h-5 animate-spin"
                  style={{ color: glow, animationDuration: "3s" }}
                />
              </div>
            )}
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}

export function GameSection({ onWinCelebration }: { onWinCelebration?: () => void }) {
  const {
    cards,
    moves,
    isWon,
    elapsedMs,
    bestScore,
    mismatchIds,
    handleFlip,
    replay,
    formatTime,
  } = useMemoryGame();

  const [celebrationFired, setCelebrationFired] = React.useState(false);

  React.useEffect(() => {
    if (isWon && !celebrationFired) {
      setCelebrationFired(true);
      soundEffects.playVictory();
      if (onWinCelebration) onWinCelebration();
    }
  }, [isWon, celebrationFired, onWinCelebration]);

  const handleReplay = () => {
    soundEffects.playTap();
    setCelebrationFired(false);
    replay();
  };

  const mismatchSet = new Set(mismatchIds ?? []);

  return (
    <section
      id="game"
      aria-label="Memory Match Game Section"
      className="scroll-mt-20 flex flex-col"
    >
      <div className="glass-panel glass-panel-yellow p-6 flex flex-col relative overflow-hidden border-yellow-500/30">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-2 text-yellow-400 text-xs font-semibold uppercase tracking-wider">
            <Gamepad2 className="w-4 h-4 text-yellow-400" />
            <span>Memory Match</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-fuchsia-500/15 border border-fuchsia-400/30 text-fuchsia-300 text-[10px] font-mono">
            {isWon ? (
              <Unlock className="w-3 h-3 text-lime-400" />
            ) : (
              <Lock className="w-3 h-3 text-fuchsia-400" />
            )}
            <span>4 Pairs</span>
          </div>
        </div>

        <h2 className="font-heading text-xl font-black uppercase tracking-tight text-white mb-1">
          Match Angad&apos;s <span className="neon-text-yellow">Faces</span>
        </h2>
        <p className="text-gray-400 text-xs mb-5">
          Flip cards to find all 4 matching pairs and unlock a secret message!
        </p>

        {/* HUD — moves + timer */}
        <div className="w-full flex items-center justify-between p-3 rounded-xl bg-black/60 border border-yellow-500/20 mb-4">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-mono text-gray-300">Moves:</span>
            <span className="font-heading text-base font-black neon-text-yellow">{moves}</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <Timer className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-gray-400">Time:</span>
            <span className="text-yellow-300 font-bold">{formatTime(elapsedMs)}</span>
          </div>
          {bestScore && (
            <div className="flex items-center gap-1 text-[10px] font-mono text-fuchsia-300">
              <Trophy className="w-3 h-3 text-fuchsia-400" />
              <span>Best: {bestScore.moves} moves · {formatTime(bestScore.timeMs)}</span>
            </div>
          )}
        </div>

        {/* 4×2 Card Grid — aria-live for screen readers */}
        <div
          role="region"
          aria-label="Memory match grid"
          aria-live="polite"
          className="grid grid-cols-4 gap-2 w-full"
        >
          {cards.map((card) => (
            <MemoryCard
              key={card.id}
              card={card}
              isMismatch={mismatchSet.has(card.id)}
              onFlip={handleFlip}
            />
          ))}
        </div>

        {/* Win State */}
        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mt-5 p-5 rounded-2xl bg-black/70 border border-yellow-400/40 text-center flex flex-col items-center shadow-[0_0_30px_rgba(255,230,0,0.2)]"
              role="status"
              aria-live="assertive"
            >
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 border border-yellow-400 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(255,230,0,0.4)]">
                <Trophy className="w-8 h-8 text-yellow-400 animate-bounce" />
              </div>

              <span className="text-[10px] font-mono uppercase tracking-widest text-fuchsia-400 font-bold mb-1">
                All 4 pairs matched!
              </span>
              <h3 className="font-heading text-base font-black text-white uppercase mb-1">
                You Won!
              </h3>
              <p className="text-xs text-gray-300 mb-4">
                {moves} moves · {formatTime(elapsedMs)}
              </p>

              {/* Secret message unlock */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="p-3.5 rounded-xl bg-yellow-500/10 border border-yellow-400/30 text-xs text-yellow-200 leading-relaxed mb-4 font-medium text-left"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-fuchsia-400 block mb-1">
                  🔓 Secret Message Unlocked
                </span>
                &ldquo;{eventConfig.secretMessage}&rdquo;
              </motion.div>

              <button
                type="button"
                onClick={handleReplay}
                className="tap-target py-2.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs text-white font-mono flex items-center gap-2 active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Play Again</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Replay button (while playing) */}
        {!isWon && moves > 0 && (
          <button
            type="button"
            onClick={handleReplay}
            className="mt-4 self-center tap-target py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-gray-400 font-mono flex items-center gap-1.5 active:scale-95"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </section>
  );
}
