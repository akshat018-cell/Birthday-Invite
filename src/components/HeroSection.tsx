"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, MapPin, ChevronDown, Zap } from "lucide-react";
import { eventConfig, formatEventDate } from "@/config/event";
import { soundEffects } from "@/utils/audio";

/** Format "18:00" → "6:00 PM", "09:30" → "9:30 AM" */
function formatStartTime(t: string): string {
  const [hStr, mStr] = t.split(":");
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function HeroSection({ onRsvpClick }: { onRsvpClick?: () => void }) {
  const scrollToRsvp = () => {
    soundEffects.playTap();
    if (onRsvpClick) {
      onRsvpClick();
    } else {
      const el = document.getElementById("rsvp");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSchedule = () => {
    soundEffects.playTap();
    const el = document.getElementById("schedule");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="scroll-mt-20 flex flex-col items-center text-center relative pt-4 pb-2"
    >
      {/* Background Neon Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* VIP Access Pass Pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
      >
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "6s" }} />
        <span>Official VIP Access Pass</span>
      </motion.div>

      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col items-center"
      >
        <span className="font-heading text-xs tracking-[0.3em] uppercase text-cyan-400/90 font-bold mb-1">
          Get Hyped For
        </span>
        <h1 className="font-heading text-3xl font-black uppercase tracking-tight text-white leading-tight">
          {eventConfig.guestOfHonour}
          <span className="block text-4xl sm:text-5xl font-black neon-text-cyan mt-1 tracking-tight">
            Level {eventConfig.turningAge}
          </span>
        </h1>
        <p className="text-gray-300 text-sm mt-3 max-w-[320px] leading-relaxed">
          An exclusive celebration for the big {eventConfig.turningAge}. Food, cake and good vibes.
        </p>
      </motion.div>

      {/* Event Details Quick Chips */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full grid grid-cols-1 gap-2.5 my-6"
      >
        {/* Date Card */}
        <div className="glass-panel glass-panel-cyan p-3.5 rounded-2xl flex items-center gap-3.5 text-left">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
            <Calendar className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] uppercase tracking-wider text-cyan-300/80 font-mono font-semibold">
              Mission Date
            </span>
            <span className="text-white text-sm font-semibold truncate">
              {formatEventDate(eventConfig.date)}
            </span>
          </div>
        </div>

        {/* Time / Location Dual Chip */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Time Chip */}
          <div className="glass-panel glass-panel-cyan p-3 rounded-2xl flex items-center gap-2.5 text-left">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] uppercase tracking-wider text-cyan-300/80 font-mono">
                Start Time
              </span>
              <span className="text-white text-xs font-semibold truncate">
                {eventConfig.startTime
                  ? formatStartTime(eventConfig.startTime)
                  : eventConfig.tbaLabel}
              </span>
            </div>
          </div>

          {/* Venue Chip */}
          <div className="glass-panel glass-panel-cyan p-3 rounded-2xl flex items-center gap-2.5 text-left">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0">
              <MapPin className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] uppercase tracking-wider text-cyan-300/80 font-mono">
                Location
              </span>
              <span className="text-white text-xs font-semibold truncate">
                {eventConfig.venue.name ?? eventConfig.tbaLabel}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full flex flex-col gap-2.5"
      >
        <button
          type="button"
          onClick={scrollToRsvp}
          className="tap-target w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-[#07070D] font-heading text-sm font-black uppercase tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.45)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Claim VIP Wristband</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={scrollToSchedule}
          className="tap-target w-full py-3 px-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
        >
          <span>Check Night Protocol</span>
        </button>
      </motion.div>
    </section>
  );
}

