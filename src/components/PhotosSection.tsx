"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart, Flame, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { eventConfig } from "@/config/event";
import { soundEffects } from "@/utils/audio";

interface FloatingReaction {
  id: number;
  emoji: string;
  x: number;
}

export function PhotosSection() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const [reactions, setReactions] = useState<FloatingReaction[]>([]);
  const [reactionCounts, setReactionCounts] = useState<Record<string, number>>({
    "🔥": 14,
    "🎉": 28,
    "👑": 19,
    "⚡": 32,
  });

  const nextPhoto = () => {
    soundEffects.playTap();
    setActivePhotoIndex((prev) => (prev + 1) % eventConfig.photos.length);
  };

  const prevPhoto = () => {
    soundEffects.playTap();
    setActivePhotoIndex((prev) => (prev - 1 + eventConfig.photos.length) % eventConfig.photos.length);
  };

  const handleReaction = (emoji: string) => {
    soundEffects.playPop();
    const id = Date.now() + Math.random();
    const x = Math.random() * 200 - 100;

    setReactions((prev) => [...prev, { id, emoji, x }]);
    setReactionCounts((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1,
    }));

    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 1800);
  };

  const currentPhoto = eventConfig.photos[activePhotoIndex];

  return (
    <section
      id="photos"
      aria-label="Photo Gallery Section"
      className="scroll-mt-20 flex flex-col relative"
    >
      {/* Floating Reaction Sprites Container */}
      <div className="absolute inset-x-0 bottom-16 h-48 pointer-events-none overflow-hidden z-30">
        <AnimatePresence>
          {reactions.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 1, y: 150, x: r.x + 150, scale: 0.6 }}
              animate={{ opacity: 0, y: -60, x: r.x + 150, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="absolute text-2xl select-none"
            >
              {r.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="glass-panel glass-panel-violet p-6 flex flex-col relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Camera className="w-4 h-4 text-purple-400" />
            <span>Visual Archive</span>
          </div>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
            {activePhotoIndex + 1} / {eventConfig.photos.length}
          </span>
        </div>

        <h2 className="font-heading text-xl font-black uppercase tracking-tight text-white mb-1">
          Angad Through <span className="neon-text-violet">The Years</span>
        </h2>
        <p className="text-gray-400 text-xs mb-5">
          Memories leading up to the 14th milestone. Tap photo to enlarge.
        </p>

        {/* Carousel Container */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black/60 border border-purple-500/30 group shadow-[0_0_20px_rgba(168,85,255,0.15)]">
          {!imgErrors[activePhotoIndex] ? (
            <Image
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              fill
              className="object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
              onClick={() => {
                soundEffects.playTap();
                setSelectedPhoto(activePhotoIndex);
              }}
              onError={() => {
                setImgErrors((prev) => ({ ...prev, [activePhotoIndex]: true }));
              }}
            />
          ) : (
            /* Tasteful Neon Placeholder Card (Zero Broken States!) */
            <div
              onClick={() => {
                soundEffects.playTap();
                setSelectedPhoto(activePhotoIndex);
              }}
              className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-purple-950/40 to-black cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-purple-500/15 border border-purple-400/40 flex items-center justify-center text-purple-300 mb-3 shadow-[0_0_15px_rgba(168,85,255,0.3)]">
                <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
              </div>
              <span className="text-xs font-heading font-bold text-white uppercase tracking-wider">
                {currentPhoto.caption}
              </span>
              <span className="text-[10px] font-mono text-purple-300/80 mt-1">
                Angad Milestone Memory #{activePhotoIndex + 1}
              </span>
            </div>
          )}

          {/* Floating Caption Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end justify-between pointer-events-none">
            <div className="flex flex-col">
              <span className="text-white text-xs font-semibold">
                {currentPhoto.caption}
              </span>
              <span className="text-[10px] text-purple-300/80 font-mono">
                Memory 0{activePhotoIndex + 1} of 0{eventConfig.photos.length}
              </span>
            </div>
          </div>

          {/* Left / Right Nav Arrows */}
          <button
            type="button"
            onClick={prevPhoto}
            aria-label="Previous photo"
            className="tap-target absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-purple-400/40 text-purple-300 flex items-center justify-center transition-transform active:scale-90"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={nextPhoto}
            aria-label="Next photo"
            className="tap-target absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-purple-400/40 text-purple-300 flex items-center justify-center transition-transform active:scale-90"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {eventConfig.photos.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                soundEffects.playTap();
                setActivePhotoIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all ${
                activePhotoIndex === idx
                  ? "w-6 bg-purple-400 shadow-[0_0_8px_#A855FF]"
                  : "w-2 bg-purple-900/60"
              }`}
            />
          ))}
        </div>

        {/* Interactive Sticker Reaction Strip */}
        <div className="mt-5 pt-4 border-t border-purple-500/15">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300/80 font-semibold">
              Drop Hype Reactions
            </span>
            <span className="text-[10px] text-gray-400 font-mono">
              Tap to cheer!
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {["🔥", "🎉", "👑", "⚡"].map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleReaction(emoji)}
                className="tap-target py-2 px-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-400/30 flex items-center justify-center gap-1.5 transition-transform active:scale-90"
              >
                <span className="text-base select-none">{emoji}</span>
                <span className="text-[10px] font-mono text-purple-300 font-bold">
                  {reactionCounts[emoji]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-xl"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="tap-target absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div
              className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border border-purple-400/50 shadow-[0_0_40px_rgba(168,85,255,0.3)] bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              {!imgErrors[selectedPhoto] ? (
                <Image
                  src={eventConfig.photos[selectedPhoto].src}
                  alt={eventConfig.photos[selectedPhoto].alt}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <Sparkles className="w-12 h-12 text-purple-400 mb-2" />
                  <p className="font-heading text-sm text-white font-bold">
                    {eventConfig.photos[selectedPhoto].caption}
                  </p>
                </div>
              )}
            </div>

            <p className="text-gray-300 text-xs mt-4 text-center font-mono">
              {eventConfig.photos[selectedPhoto].caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

