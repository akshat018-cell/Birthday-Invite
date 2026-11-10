"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Bell, CalendarPlus, Sparkles, X, Download, ExternalLink, CalendarCheck } from "lucide-react";
import { eventConfig, formatEventDate } from "@/config/event";
import { soundEffects } from "@/utils/audio";
import { getGoogleCalendarUrl, downloadIcsFile } from "@/utils/calendar";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** true once start time (18:00 IST) has passed */
  isStarted: boolean;
  /** true once end time (21:00 IST) has passed */
  isEnded: boolean;
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isStarted: false,
    isEnded: false,
  });

  const [mounted, setMounted] = useState(false);
  const [showCalendarSheet, setShowCalendarSheet] = useState(false);
  const [icsDownloaded, setIcsDownloaded] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      // Party: 2026-11-11, 18:00 – 21:00 Asia/Kolkata (UTC+5:30)
      const start = new Date("2026-11-11T18:00:00+05:30").getTime();
      const end   = new Date("2026-11-11T21:00:00+05:30").getTime();
      const now   = new Date().getTime();

      if (now >= end) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isStarted: true, isEnded: true });
        return;
      }
      if (now >= start) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isStarted: true, isEnded: false });
        return;
      }

      const difference = start - now;
      const days    = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours   = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isStarted: false, isEnded: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenGoogle = () => {
    soundEffects.playTap();
    const url = getGoogleCalendarUrl();
    window.open(url, "_blank", "noopener,noreferrer");
    setShowCalendarSheet(false);
  };

  const handleDownloadIcs = () => {
    soundEffects.playTap();
    const success = downloadIcsFile();
    if (success) {
      setIcsDownloaded(true);
      setTimeout(() => {
        setIcsDownloaded(false);
        setShowCalendarSheet(false);
      }, 1500);
    }
  };

  const timeUnits = [
    { label: "DAYS",  value: mounted ? timeLeft.days    : 0 },
    { label: "HOURS", value: mounted ? timeLeft.hours   : 0 },
    { label: "MINS",  value: mounted ? timeLeft.minutes : 0 },
    { label: "SECS",  value: mounted ? timeLeft.seconds : 0 },
  ];

  /** True once countdown target has passed */
  const isStarted = mounted && timeLeft.isStarted;
  const isEnded   = mounted && timeLeft.isEnded;

  return (
    <section
      id="countdown"
      aria-label="Countdown Section"
      className="scroll-mt-20 flex flex-col"
    >
      <div className="glass-panel glass-panel-magenta p-6 flex flex-col relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 text-fuchsia-400 text-xs font-semibold uppercase tracking-wider">
            <Timer className="w-4 h-4 text-fuchsia-400" />
            <span>Mission Countdown</span>
          </div>
          <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/30">
            {eventConfig.timezone}
          </span>
        </div>

        <h2 className="font-heading text-xl font-black uppercase tracking-tight text-white mb-1">
          Lock In <span className="neon-text-magenta">The Date</span>
        </h2>
        <p className="text-gray-400 text-xs mb-5">
          {formatEventDate(eventConfig.date)}
        </p>

        {/* HUD Countdown Grid */}
        {isEnded ? (
          <div className="p-5 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-400/40 text-center">
            <p className="font-heading text-lg font-black text-fuchsia-300 uppercase">
              💙 Thanks for celebrating with Angad!
            </p>
            <p className="text-xs text-gray-300 mt-1">
              What a night — hope you had a blast!
            </p>
          </div>
        ) : isStarted ? (
          <div className="p-5 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-400/40 text-center">
            <p className="font-heading text-lg font-black text-fuchsia-300 uppercase">
              🎉 It&apos;s Party Time!
            </p>
            <p className="text-xs text-gray-300 mt-1">
              Angad&apos;s birthday party is live right now — come join!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 mb-5">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-black/40 border border-fuchsia-500/25 shadow-[0_0_15px_rgba(255,43,214,0.15)]"
              >
                <span className="font-heading text-2xl font-black neon-text-magenta tracking-tight">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[9px] font-mono font-semibold tracking-widest text-fuchsia-300/80 mt-1 uppercase">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Single Action Button: Add to calendar */}
        <button
          type="button"
          onClick={() => {
            soundEffects.playTap();
            setShowCalendarSheet(true);
          }}
          className="tap-target w-full py-2.5 px-4 rounded-xl bg-fuchsia-500/10 hover:bg-fuchsia-500/20 border border-fuchsia-400/30 text-fuchsia-300 text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <CalendarPlus className="w-4 h-4 text-fuchsia-400" />
          <span>Add to calendar</span>
        </button>

        {/* Milestone Footer Tag */}
        <div className="mt-4 pt-3 border-t border-fuchsia-500/15 flex items-center justify-between text-[11px] text-fuchsia-300/70 font-mono">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-fuchsia-400" />
            Milestone: {eventConfig.turningAge} Years
          </span>
          <span className="flex items-center gap-1">
            <Bell className="w-3 h-3 text-fuchsia-400" />
            Don&apos;t Be Late
          </span>
        </div>
      </div>

      {/* Neon Bottom Sheet for Calendar Choice */}
      <AnimatePresence>
        {showCalendarSheet && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowCalendarSheet(false)}
            />

            {/* Bottom Sheet Modal */}
            <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 pb-safe pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="pointer-events-auto w-full max-w-[390px] glass-panel glass-panel-magenta p-5 rounded-3xl bg-[#0e0c18]/95 border border-fuchsia-400/40 shadow-[0_0_40px_rgba(255,43,214,0.3)] flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarPlus className="w-4 h-4 text-fuchsia-400" />
                    <h3 className="font-heading text-xs font-black uppercase text-white tracking-wider">
                      Add to calendar
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCalendarSheet(false)}
                    aria-label="Close calendar options"
                    className="tap-target -mr-2 -mt-1 w-7 h-7 rounded-lg text-gray-400 hover:text-white flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-[11px] text-gray-400 leading-snug">
                  Choose your preferred calendar service:
                </p>

                <div className="flex flex-col gap-2 pt-1">
                  {/* Google Calendar Option */}
                  <button
                    type="button"
                    onClick={handleOpenGoogle}
                    className="tap-target w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-fuchsia-400/25 text-left flex items-center justify-between group active:scale-[0.98] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-fuchsia-500/10 border border-fuchsia-400/30 flex items-center justify-center text-fuchsia-300">
                        <ExternalLink className="w-4 h-4 text-fuchsia-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-heading font-bold text-white group-hover:text-fuchsia-300 transition-colors">
                          Google Calendar
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          Open in browser / Google Calendar app
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Apple / Outlook (.ics) Option */}
                  <button
                    type="button"
                    onClick={handleDownloadIcs}
                    className="tap-target w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-fuchsia-400/25 text-left flex items-center justify-between group active:scale-[0.98] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-fuchsia-500/10 border border-fuchsia-400/30 flex items-center justify-center text-fuchsia-300">
                        {icsDownloaded ? (
                          <CalendarCheck className="w-4 h-4 text-lime-400" />
                        ) : (
                          <Download className="w-4 h-4 text-fuchsia-400" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-heading font-bold text-white group-hover:text-fuchsia-300 transition-colors">
                          Apple / Outlook (.ics)
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {icsDownloaded ? "File downloaded!" : "Universal .ics file for iOS Safari & Android"}
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
