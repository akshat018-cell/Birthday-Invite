import React from "react";
import { eventConfig, formatEventDate } from "@/config/event";
import {
  Sparkles,
  Timer,
  MapPin,
  CalendarDays,
  Camera,
  Send,
  Gamepad2,
  Lock,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="w-full flex flex-col gap-6 py-6 pb-24">
      {/* Top Floating App Bar / Brand Pill */}
      <header className="sticky top-2 z-40 px-2">
        <div className="glass-panel glass-panel-cyan px-4 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-heading text-xs font-bold tracking-widest text-white uppercase">
              {eventConfig.guestOfHonour}
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[10px] font-semibold tracking-wider uppercase">
            Turning {eventConfig.turningAge}
          </span>
        </div>
      </header>

      {/* 1. HERO SECTION ANCHOR (Cyan #00F0FF) */}
      <section
        id="hero"
        aria-label="Hero Section"
        className="scroll-mt-20 flex flex-col"
      >
        <div className="glass-panel glass-panel-cyan p-6 flex flex-col items-center text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>VIP Birthday Experience</span>
          </div>

          <h1 className="font-heading text-3xl font-black uppercase tracking-tight text-white mb-2">
            {eventConfig.guestOfHonour}
            <span className="block neon-text-cyan text-4xl mt-1">
              Level {eventConfig.turningAge}
            </span>
          </h1>

          <p className="text-gray-400 text-sm max-w-xs mt-1">
            {formatEventDate(eventConfig.date)}
          </p>

          <div className="mt-6 w-full pt-4 border-t border-cyan-500/15 flex items-center justify-between text-xs text-cyan-300/80 font-mono">
            <span>#HERO_STAGE</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Ready
            </span>
          </div>
        </div>
      </section>

      {/* 2. COUNTDOWN SECTION ANCHOR (Magenta #FF2BD6) */}
      <section
        id="countdown"
        aria-label="Countdown Section"
        className="scroll-mt-20 flex flex-col"
      >
        <div className="glass-panel glass-panel-magenta p-6 flex flex-col relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2 text-fuchsia-400 text-xs font-semibold uppercase tracking-wider">
              <Timer className="w-4 h-4 text-fuchsia-400" />
              <span>Countdown Timer</span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20">
              {eventConfig.timezone}
            </span>
          </div>

          <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-white mb-1">
            The Clock Is <span className="neon-text-magenta">Ticking</span>
          </h2>
          <p className="text-gray-400 text-xs">
            Target Date: {formatEventDate(eventConfig.date)}
          </p>

          <div className="mt-5 w-full pt-4 border-t border-fuchsia-500/15 flex items-center justify-between text-xs text-fuchsia-300/80 font-mono">
            <span>#COUNTDOWN_STAGE</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
              Ready
            </span>
          </div>
        </div>
      </section>

      {/* 3. DETAILS SECTION ANCHOR (Lime #B6FF00) */}
      <section
        id="details"
        aria-label="Event Details Section"
        className="scroll-mt-20 flex flex-col"
      >
        <div className="glass-panel glass-panel-lime p-6 flex flex-col relative overflow-hidden">
          <div className="inline-flex items-center gap-2 text-lime-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <MapPin className="w-4 h-4 text-lime-400" />
            <span>Mission Intel & Venue</span>
          </div>

          <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-white mb-1">
            Party <span className="neon-text-lime">Details</span>
          </h2>
          <p className="text-gray-400 text-xs">
            {eventConfig.venue.name ?? "Venue announcement coming soon"}
          </p>

          <div className="mt-5 w-full pt-4 border-t border-lime-500/15 flex items-center justify-between text-xs text-lime-300/80 font-mono">
            <span>#DETAILS_STAGE</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
              {eventConfig.venue.name ? "Configured" : "Awaiting Venue"}
            </span>
          </div>
        </div>
      </section>

      {/* 4. SCHEDULE SECTION ANCHOR (Orange #FF8A00) */}
      <section
        id="schedule"
        aria-label="Schedule Timeline Section"
        className="scroll-mt-20 flex flex-col"
      >
        <div className="glass-panel glass-panel-orange p-6 flex flex-col relative overflow-hidden">
          <div className="inline-flex items-center gap-2 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <CalendarDays className="w-4 h-4 text-orange-400" />
            <span>Night Protocol</span>
          </div>

          <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-white mb-1">
            Party <span className="neon-text-orange">Schedule</span>
          </h2>
          <p className="text-gray-400 text-xs">
            {eventConfig.schedule.length} curated events scheduled for the night.
          </p>

          <div className="mt-5 w-full pt-4 border-t border-orange-500/15 flex items-center justify-between text-xs text-orange-300/80 font-mono">
            <span>#SCHEDULE_STAGE</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              {eventConfig.schedule.length} Activities
            </span>
          </div>
        </div>
      </section>

      {/* 5. PHOTOS SECTION ANCHOR (Violet #A855FF) */}
      <section
        id="photos"
        aria-label="Photo Gallery Section"
        className="scroll-mt-20 flex flex-col"
      >
        <div className="glass-panel glass-panel-violet p-6 flex flex-col relative overflow-hidden">
          <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Camera className="w-4 h-4 text-purple-400" />
            <span>Visual Archive</span>
          </div>

          <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-white mb-1">
            Angad Through <span className="neon-text-violet">The Years</span>
          </h2>
          <p className="text-gray-400 text-xs">
            Curated memories & hype snapshots.
          </p>

          <div className="mt-5 w-full pt-4 border-t border-purple-500/15 flex items-center justify-between text-xs text-purple-300/80 font-mono">
            <span>#PHOTOS_STAGE</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              3 Slots Ready
            </span>
          </div>
        </div>
      </section>

      {/* 6. RSVP SECTION ANCHOR (Green #39FF14) */}
      <section
        id="rsvp"
        aria-label="RSVP Form Section"
        className="scroll-mt-20 flex flex-col"
      >
        <div className="glass-panel glass-panel-green p-6 flex flex-col relative overflow-hidden">
          <div className="inline-flex items-center gap-2 text-green-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Send className="w-4 h-4 text-green-400" />
            <span>Guestlist Access</span>
          </div>

          <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-white mb-1">
            Secure Your <span className="neon-text-green">Spot</span>
          </h2>
          <p className="text-gray-400 text-xs">
            Instant WhatsApp confirmation direct to host.
          </p>

          <div className="mt-5 w-full pt-4 border-t border-green-500/15 flex items-center justify-between text-xs text-green-300/80 font-mono">
            <span>#RSVP_STAGE</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              {eventConfig.whatsappNumber ? "WhatsApp Ready" : "Awaiting Number"}
            </span>
          </div>
        </div>
      </section>

      {/* 7. GAME SECTION ANCHOR (Yellow #FFE600 with Pink #FF2BD6) */}
      <section
        id="game"
        aria-label="Arcade Mini-Game Section"
        className="scroll-mt-20 flex flex-col"
      >
        <div className="glass-panel glass-panel-yellow p-6 flex flex-col relative overflow-hidden border-yellow-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2 text-yellow-400 text-xs font-semibold uppercase tracking-wider">
              <Gamepad2 className="w-4 h-4 text-yellow-400" />
              <span>Arcade Mini-Game</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-fuchsia-400 bg-fuchsia-500/10 px-2 py-0.5 rounded border border-fuchsia-500/30">
              <Lock className="w-3 h-3 text-fuchsia-400" />
              <span>Secret Prize</span>
            </div>
          </div>

          <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-white mb-1">
            Beat The Score, <span className="neon-text-yellow">Unlock VIP</span>
          </h2>
          <p className="text-gray-400 text-xs">
            Reflex challenge with secret easter egg reward.
          </p>

          <div className="mt-5 w-full pt-4 border-t border-yellow-500/15 flex items-center justify-between text-xs text-yellow-300/80 font-mono">
            <span>#GAME_STAGE</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              Minigame Shell
            </span>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="pt-4 pb-8 text-center flex flex-col items-center gap-2">
        <p className="font-heading text-xs uppercase tracking-widest text-gray-500">
          Angad Khandelwal • 14th Birthday
        </p>
        <p className="text-[10px] text-gray-600 font-mono">
          11.11.2026 • Exclusive Invitation
        </p>
      </footer>
    </main>
  );
}

