"use client";

import React from "react";
import {
  MapPin,
  Shirt,
  Compass,
  MapPinOff,
} from "lucide-react";
import { eventConfig } from "@/config/event";

export function DetailsSection() {
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
        <div className="p-4 rounded-xl bg-black/50 border border-lime-500/30 relative overflow-hidden">
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
            /* Generic TBA with eventConfig.tbaLabel ("Coming soon") */
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-lime-500/10 border border-lime-400/30 flex items-center justify-center shrink-0">
                <MapPinOff className="w-4 h-4 text-lime-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-wider text-lime-400 font-bold">
                  Venue
                </span>
                <h3 className="text-white font-heading text-xs font-bold mt-0.5">
                  Venue reveal — {eventConfig.tbaLabel}
                </h3>
              </div>
            </div>
          )}
        </div>

        {/* Dress Code — only shown when dressCode is set */}
        {eventConfig.dressCode && (
          <div className="p-3.5 rounded-xl bg-black/40 border border-lime-500/20 mt-3">
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
      </div>
    </section>
  );
}
