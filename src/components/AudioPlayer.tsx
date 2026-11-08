"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { eventConfig } from "@/config/event";
import { soundEffects } from "@/utils/audio";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true); // assume available until proven otherwise
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Create audio element once after mount
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "none"; // don't auto-fetch

    // Probe whether the file is reachable
    audio.addEventListener("error", () => setIsAvailable(false), { once: true });

    audio.src = eventConfig.audio.src;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
      if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    };
  }, []);

  // Pause when tab is hidden, resume if was playing
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        audio.pause();
      } else if (isPlaying) {
        audio.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isPlaying]);

  const fadeTo = useCallback((targetVol: number, onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);

    const step = targetVol > audio.volume ? 0.03 : -0.03;
    fadeTimerRef.current = setInterval(() => {
      if (!audioRef.current) return;
      const next = Math.max(0, Math.min(1, audioRef.current.volume + step));
      audioRef.current.volume = next;
      if (
        (step > 0 && next >= targetVol) ||
        (step < 0 && next <= targetVol)
      ) {
        audioRef.current.volume = targetVol;
        if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
        if (onDone) onDone();
      }
    }, 40);
  }, []);

  const toggle = async () => {
    soundEffects.playTap();
    const audio = audioRef.current;
    if (!audio || !isAvailable) return;

    if (isPlaying) {
      // Fade out then pause
      fadeTo(0, () => audio.pause());
      soundEffects.setMuted(true);
      setIsPlaying(false);
    } else {
      try {
        audio.volume = 0;
        await audio.play();
        fadeTo(0.7);
        soundEffects.setMuted(false);
        setIsPlaying(true);
      } catch {
        // Autoplay blocked or file missing — hide the button
        setIsAvailable(false);
      }
    }
  };

  // Hide entirely if the audio file isn't available
  if (!isAvailable) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? "Mute party audio" : "Play party audio"}
      className="tap-target px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 flex items-center gap-2 transition-all active:scale-95"
    >
      {isPlaying ? (
        <>
          <div className="flex items-end gap-0.5 h-3" aria-hidden="true">
            <span className="w-0.5 h-2 bg-cyan-400 animate-pulse" />
            <span className="w-0.5 h-3 bg-cyan-300 animate-pulse [animation-delay:75ms]" />
            <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse [animation-delay:150ms]" />
          </div>
          <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] font-mono text-cyan-300">Sound On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[11px] font-mono text-gray-400">Muted</span>
        </>
      )}
    </button>
  );
}
