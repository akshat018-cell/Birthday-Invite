"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timer, Bell, CalendarPlus, Sparkles } from "lucide-react";
import { eventConfig, formatEventDate } from "@/config/event";
import { soundEffects } from "@/utils/audio";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      // Event date: 2026-11-11 in Asia/Kolkata (UTC+5:30)
      const target = new Date("2026-11-11T18:00:00+05:30").getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCalendar = () => {
    soundEffects.playTap();
    // Google Calendar direct intent link
    const title = encodeURIComponent("Angad's 14th Birthday Bash 🎉");
    const details = encodeURIComponent(
      "You're invited to Angad Khandelwal's 14th Birthday!"
    );
    const location = encodeURIComponent(eventConfig.venue.name || "To be confirmed");
    const dates = "20261111T123000Z/20261111T173000Z"; // 18:00 - 23:00 IST in UTC
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;

    window.open(googleCalendarUrl, "_blank", "noopener,noreferrer");
  };

  const timeUnits = [
    { label: "DAYS", value: mounted ? timeLeft.days : 0 },
    { label: "HOURS", value: mounted ? timeLeft.hours : 0 },
    { label: "MINS", value: mounted ? timeLeft.minutes : 0 },
    { label: "SECS", value: mounted ? timeLeft.seconds : 0 },
  ];

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
        {timeLeft.isPast ? (
          <div className="p-5 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-400/40 text-center">
            <p className="font-heading text-lg font-black text-fuchsia-300 uppercase">
              🎉 Party Is Live Right Now! 🎉
            </p>
            <p className="text-xs text-gray-300 mt-1">
              Join the dance floor and celebrate with Angad!
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

        {/* Action Button: Add to Calendar */}
        <button
          type="button"
          onClick={handleAddToCalendar}
          className="tap-target w-full py-2.5 px-4 rounded-xl bg-fuchsia-500/10 hover:bg-fuchsia-500/20 border border-fuchsia-400/30 text-fuchsia-300 text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <CalendarPlus className="w-4 h-4 text-fuchsia-400" />
          <span>Add To Google Calendar</span>
        </button>

        {/* Milestone Footer Tag */}
        <div className="mt-4 pt-3 border-t border-fuchsia-500/15 flex items-center justify-between text-[11px] text-fuchsia-300/70 font-mono">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-fuchsia-400" />
            Milestone: 14 Years
          </span>
          <span className="flex items-center gap-1">
            <Bell className="w-3 h-3 text-fuchsia-400" />
            Don&apos;t Be Late
          </span>
        </div>
      </div>
    </section>
  );
}

