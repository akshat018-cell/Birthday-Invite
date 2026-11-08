"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { eventConfig } from "@/config/event";
import { soundEffects } from "@/utils/audio";

export function PhotosSection() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  // Lightbox swipe support
  const touchStartX = useRef<number>(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const nextPhoto = () => {
    soundEffects.playTap();
    setActivePhotoIndex((prev) => (prev + 1) % eventConfig.photos.length);
  };

  const prevPhoto = () => {
    soundEffects.playTap();
    setActivePhotoIndex((prev) => (prev - 1 + eventConfig.photos.length) % eventConfig.photos.length);
  };

  const openLightbox = useCallback((idx: number) => {
    soundEffects.playTap();
    setSelectedPhoto(idx);
    // Lock scroll
    document.body.style.overflow = "hidden";
    setTimeout(() => closeButtonRef.current?.focus(), 50);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedPhoto(null);
    document.body.style.overflow = "";
  }, []);

  const lightboxNext = () => {
    setSelectedPhoto((prev) =>
      prev === null ? 0 : (prev + 1) % eventConfig.photos.length
    );
  };
  const lightboxPrev = () => {
    setSelectedPhoto((prev) =>
      prev === null ? 0 : (prev - 1 + eventConfig.photos.length) % eventConfig.photos.length
    );
  };

  const handleLightboxKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") lightboxNext();
    if (e.key === "ArrowLeft") lightboxPrev();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) lightboxNext();
      else lightboxPrev();
    }
  };

  const currentPhoto = eventConfig.photos[activePhotoIndex];

  return (
    <section
      id="photos"
      aria-label="Photo Gallery Section"
      className="scroll-mt-20 flex flex-col relative"
    >
      <div className="glass-panel glass-panel-violet p-6 flex flex-col relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Camera className="w-4 h-4 text-purple-400" />
            <span>Photo Gallery</span>
          </div>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
            {activePhotoIndex + 1} / {eventConfig.photos.length}
          </span>
        </div>

        <h2 className="font-heading text-xl font-black uppercase tracking-tight text-white mb-1">
          Angad Through <span className="neon-text-violet">The Years</span>
        </h2>
        <p className="text-gray-400 text-xs mb-5">
          Tap a photo to enlarge. Swipe in the lightbox to navigate.
        </p>

        {/* Carousel Container */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black/60 border border-purple-500/30 group shadow-[0_0_20px_rgba(168,85,255,0.15)]">
          {!imgErrors[activePhotoIndex] ? (
            <Image
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              fill
              className="object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
              onClick={() => openLightbox(activePhotoIndex)}
              onError={() =>
                setImgErrors((prev) => ({ ...prev, [activePhotoIndex]: true }))
              }
            />
          ) : (
            /* Tasteful placeholder — no broken image icon */
            <button
              type="button"
              onClick={() => openLightbox(activePhotoIndex)}
              className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-purple-950/40 to-black cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-purple-500/15 border border-purple-400/40 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(168,85,255,0.3)]">
                <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
              </div>
              <span className="text-xs font-heading font-bold text-white uppercase tracking-wider">
                Photo {activePhotoIndex + 1}
              </span>
              <span className="text-[10px] font-mono text-purple-300/80 mt-1">
                Image loading…
              </span>
            </button>
          )}

          {/* Floating Caption Overlay — only when caption exists */}
          {currentPhoto.caption && (
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none">
              <span className="text-white text-xs font-semibold">
                {currentPhoto.caption}
              </span>
            </div>
          )}

          {/* Nav Arrows */}
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
              aria-label={`View photo ${idx + 1}`}
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
      </div>

      {/* Lightbox Modal — focus-trapped, scroll-locked, swipeable */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onKeyDown={handleLightboxKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-xl"
            onClick={closeLightbox}
            tabIndex={-1}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="tap-target absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center border border-white/20 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev / Next inside lightbox */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
              aria-label="Previous photo"
              className="tap-target absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-purple-400/40 text-purple-300 flex items-center justify-center z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
              aria-label="Next photo"
              className="tap-target absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-purple-400/40 text-purple-300 flex items-center justify-center z-10"
            >
              <ChevronRight className="w-5 h-5" />
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
                  onError={() =>
                    setImgErrors((prev) => ({ ...prev, [selectedPhoto]: true }))
                  }
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <Sparkles className="w-12 h-12 text-purple-400 mb-2" />
                  <p className="font-heading text-sm text-white font-bold">
                    Photo {selectedPhoto + 1}
                  </p>
                </div>
              )}
            </div>

            {/* Caption under lightbox — only when present */}
            {eventConfig.photos[selectedPhoto]?.caption && (
              <p className="text-gray-300 text-xs mt-4 text-center font-mono">
                {eventConfig.photos[selectedPhoto].caption}
              </p>
            )}

            <p className="text-gray-600 text-[10px] mt-2 font-mono">
              Tap outside or press Esc to close · Swipe to navigate
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
