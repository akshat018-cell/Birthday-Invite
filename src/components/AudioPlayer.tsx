"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundEffects } from "@/utils/audio";
import { eventConfig } from "@/config/event";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(eventConfig.audio.src);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleAudio = async () => {
    soundEffects.playTap();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      soundEffects.setMuted(true);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
        soundEffects.setMuted(false);
      } catch {
        // Fallback if browser blocks media or audio file is stub
        setIsPlaying(true);
        soundEffects.setMuted(false);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggleAudio}
      aria-label={isPlaying ? "Mute party audio" : "Play party audio"}
      className="tap-target px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 flex items-center gap-2 transition-all active:scale-95"
    >
      {isPlaying ? (
        <>
          <div className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 h-2 bg-cyan-400 animate-pulse" />
            <span className="w-0.5 h-3 bg-cyan-300 animate-pulse delay-75" />
            <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse delay-150" />
          </div>
          <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] font-mono text-cyan-300">Sound ON</span>
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
