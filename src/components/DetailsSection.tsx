"use client";

import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Shirt,
  Compass,
  MapPinOff,
  Download,
  Check,
  Sparkles,
  CalendarCheck,
} from "lucide-react";
import { eventConfig, formatEventDate } from "@/config/event";
import { soundEffects } from "@/utils/audio";

export function DetailsSection() {
  const [downloadedIcs, setDownloadedIcs] = useState(false);

  const downloadIcsFile = () => {
    soundEffects.playTap();

    // Build the DTSTART/DTEND correctly:
    // If startTime is null → use an all-day event (DATE value type, no time zone)
    // If startTime is set → use a UTC timed event
    let dtStart: string;
    let dtEnd: string;

    if (eventConfig.startTime) {
      // We have a start time — encode as UTC (IST = UTC+5:30)
      dtStart = "DTSTART:20261111T123000Z"; // placeholder; replace with real time
      dtEnd = "DTEND:20261111T173000Z";
    } else {
      // All-day event — DATE format (no TZID, no time), works on iOS Safari & Android
      dtStart = "DTSTART;VALUE=DATE:20261111";
      dtEnd = "DTEND;VALUE=DATE:20261112";
    }

    const locationLine = eventConfig.venue.name
      ? `LOCATION:${eventConfig.venue.name}${eventConfig.venue.address ? `, ${eventConfig.venue.address}` : ""}`
      : "LOCATION:To be confirmed";

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Angad 14th Birthday//Invite//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "SUMMARY:Angad's 14th Birthday Bash 🎉",
      "DESCRIPTION:You're invited to Angad Khandelwal's 14th Birthday!",
      locationLine,
      dtStart,
      dtEnd,
      "STATUS:CONFIRMED",
      `UID:angad14bday-${Date.now()}@birthday-invite`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "angad-14th-birthday.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedIcs(true);
    setTimeout(() => setDownloadedIcs(false), 2500);
  };

  return (
    <section
      id="details"
      aria-label="Event Details Section"
      className="scroll-mt-20 flex flex-col gap-3"
    >
      <div className="glass-panel glass-panel-lime p-6 flex flex-col relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-lime-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="inline-flex items-center gap-2 text-lime-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <MapPin className="w-4 h-4 text-lime-400" />
          <span>Event Details</span>
        </div>

        <h2 className="font-heading text-xl font-black uppercase tracking-tight text-white mb-1">
          Party <span className="neon-text-lime">Coordinates</span>
        </h2>
        <p className="text-gray-400 text-xs mb-5">
          Everything you need before the big day.
        </p>

        {/* Date & Time Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          <div className="p-3.5 rounded-xl bg-black/40 border border-lime-500/20 flex flex-col">
            <div className="flex items-center gap-1.5 text-lime-400 mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">
                Timing
              </span>
            </div>
            <span className="text-white text-xs font-bold">
              {eventConfig.startTime ?? "Time coming soon"}
            </span>
            <span className="text-[10px] text-gray-400 mt-0.5">
              {eventConfig.timezone}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-lime-500/20 flex flex-col">
            <div className="flex items-center gap-1.5 text-lime-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">
                Date
              </span>
            </div>
            <span className="text-white text-xs font-bold">
              {formatEventDate(eventConfig.date).split(",")[0].trim()}{" "}
              {formatEventDate(eventConfig.date).split(",").slice(1).join(",").trim()}
            </span>
          </div>
        </div>

        {/* Venue Card */}
        <div className="p-4 rounded-xl bg-black/50 border border-lime-500/30 mb-3 relative overflow-hidden">
          {eventConfig.venue.name ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono tracking-wider text-lime-400 font-bold">
                  Confirmed Venue
                </span>
                <span className="px-2 py-0.5 rounded-full bg-lime-500/15 text-lime-300 text-[10px] font-mono border border-lime-500/30">
                  Confirmed
                </span>
              </div>
              <h3 className="text-white font-heading text-sm font-bold">
                {eventConfig.venue.name}
              </h3>
              {eventConfig.venue.address && (
                <p className="text-gray-300 text-xs leading-relaxed">
                  {eventConfig.venue.address}
                </p>
              )}
              {eventConfig.venue.mapLink && (
                <a
                  href={eventConfig.venue.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-lime-300 hover:text-lime-200 underline underline-offset-4"
                >
                  <Compass className="w-3.5 h-3.5 text-lime-400" />
                  <span>Open in Maps</span>
                </a>
              )}
            </div>
          ) : (
            /* Generic "coming soon" — no place names or claims */
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-lime-500/10 border border-lime-400/30 flex items-center justify-center shrink-0">
                <MapPinOff className="w-4 h-4 text-lime-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-wider text-lime-400 font-bold">
                  Venue
                </span>
                <h3 className="text-white font-heading text-xs font-bold mt-0.5">
                  Venue reveal, coming soon
                </h3>
              </div>
            </div>
          )}
        </div>

        {/* Dress Code — only shown when dressCode is set */}
        {eventConfig.dressCode && (
          <div className="p-3.5 rounded-xl bg-black/40 border border-lime-500/20 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-lime-400">
                <Shirt className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">
                  Dress Code
                </span>
              </div>
              <span className="text-[10px] text-gray-300 font-mono">
                {eventConfig.dressCode}
              </span>
            </div>
          </div>
        )}

        {/* iCal Download — works on iOS Safari & Android Chrome */}
        <button
          type="button"
          onClick={downloadIcsFile}
          className="tap-target w-full py-2.5 px-4 rounded-xl bg-lime-500/10 hover:bg-lime-500/20 border border-lime-400/30 text-lime-300 text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          {downloadedIcs ? (
            <>
              <Check className="w-4 h-4 text-lime-400" />
              <span>Saved to Calendar!</span>
            </>
          ) : (
            <>
              <CalendarCheck className="w-4 h-4 text-lime-400" />
              <span>Add to Calendar (.ics)</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
