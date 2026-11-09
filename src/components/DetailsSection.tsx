"use client";

import React, { useState } from "react";
import { MapPin, Compass, Navigation, Copy, Check, Clock } from "lucide-react";
import { eventConfig } from "@/config/event";

export function DetailsSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    if (!eventConfig.venue.address) return;
    try {
      await navigator.clipboard.writeText(eventConfig.venue.address);
    } catch {
      // Fallback for browsers without clipboard API
      const ta = document.createElement("textarea");
      ta.value = eventConfig.venue.address;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mapEmbedSrc = eventConfig.venue.mapQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(eventConfig.venue.mapQuery)}&output=embed`
    : null;

  const directionsUrl = eventConfig.venue.mapQuery
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(eventConfig.venue.mapQuery)}`
    : null;

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
          Venue and location information.
        </p>

        {/* Venue Card */}
        <div className="p-4 rounded-xl bg-black/50 border border-lime-500/30 relative overflow-hidden flex flex-col gap-3">
          {/* Badge + name row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-lime-400 font-bold">
                Confirmed Venue
              </span>
              <h3 className="text-white font-heading text-sm font-bold leading-snug">
                {eventConfig.venue.name}
              </h3>
            </div>
            <span className="shrink-0 px-2 py-0.5 rounded-full bg-lime-500/15 text-lime-300 text-[10px] font-mono border border-lime-500/30">
              Confirmed
            </span>
          </div>

          {/* Address + copy */}
          {eventConfig.venue.address && (
            <div className="flex items-start justify-between gap-2">
              <p className="text-gray-300 text-xs leading-relaxed flex-1">
                {eventConfig.venue.address}
              </p>
              <button
                type="button"
                onClick={handleCopyAddress}
                aria-label="Copy address"
                className="shrink-0 tap-target flex items-center gap-1 px-2 py-1 rounded-lg bg-lime-500/10 border border-lime-400/25 text-lime-300 text-[10px] font-mono hover:bg-lime-500/20 active:scale-95 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-lime-300" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-lime-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Time for this section */}
          {eventConfig.timeDisplay && (
            <div className="flex items-center gap-2 pt-1 border-t border-lime-500/15">
              <Clock className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span className="text-xs text-gray-300 font-mono">
                {eventConfig.timeDisplay}
              </span>
            </div>
          )}

          {/* Google Maps embed */}
          {mapEmbedSrc && (
            <div className="rounded-xl overflow-hidden border border-lime-500/30 aspect-[4/3] relative">
              <iframe
                src={mapEmbedSrc}
                title="Venue location map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen={false}
              />
            </div>
          )}

          {/* Map action buttons */}
          <div className="flex gap-2">
            {eventConfig.venue.mapLink && (
              <a
                href={eventConfig.venue.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 tap-target py-2.5 px-3 rounded-xl bg-lime-500/10 hover:bg-lime-500/20 border border-lime-400/30 text-lime-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
              >
                <Compass className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                <span>Open in Maps</span>
              </a>
            )}
            {directionsUrl && (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 tap-target py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-lime-400/20 text-gray-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
              >
                <Navigation className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                <span>Get Directions</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
