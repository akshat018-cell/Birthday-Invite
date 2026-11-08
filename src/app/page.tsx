"use client";

import React, { useState } from "react";
import { eventConfig } from "@/config/event";
import { HeroSection } from "@/components/HeroSection";
import { CountdownSection } from "@/components/CountdownSection";
import { DetailsSection } from "@/components/DetailsSection";
import { ScheduleSection } from "@/components/ScheduleSection";
import { PhotosSection } from "@/components/PhotosSection";
import { RsvpSection } from "@/components/RsvpSection";
import { GameSection } from "@/components/GameSection";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Confetti } from "@/components/Confetti";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { GuidedTour } from "@/components/GuidedTour";

export default function HomePage() {
  const [triggerConfetti, setTriggerConfetti] = useState(false);

  const launchConfetti = () => setTriggerConfetti(true);

  return (
    <main className="w-full flex flex-col gap-6 py-4 pb-28">
      {/* Global Confetti Layer */}
      <Confetti
        trigger={triggerConfetti}
        onComplete={() => setTriggerConfetti(false)}
      />

      {/* Guided Tour (first-visit only; "?" replay button always visible) */}
      <GuidedTour />

      {/* WhatsApp FAB — hidden when whatsappNumber is null */}
      <WhatsAppFab />

      {/* Floating Sticky Header */}
      <header className="sticky top-2 z-40 px-1">
        <div className="glass-panel glass-panel-cyan px-4 py-2.5 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-heading text-xs font-bold tracking-wider text-white uppercase">
              {eventConfig.guestOfHonour}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[10px] font-semibold tracking-wider uppercase">
              Lvl {eventConfig.turningAge}
            </span>
            <AudioPlayer />
          </div>
        </div>
      </header>

      {/* 1. HERO (Cyan #00F0FF) */}
      <HeroSection
        onRsvpClick={() => {
          document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 2. COUNTDOWN (Magenta #FF2BD6) */}
      <CountdownSection />

      {/* 3. DETAILS & VENUE (Lime #B6FF00) */}
      <DetailsSection />

      {/* 4. SCHEDULE TIMELINE (Orange #FF8A00) */}
      <ScheduleSection />

      {/* 5. PHOTO GALLERY (Violet #A855FF) */}
      <PhotosSection />

      {/* 6. RSVP FORM (Green #39FF14) */}
      <RsvpSection onCelebration={launchConfetti} />

      {/* 7. MEMORY MATCH GAME (Yellow #FFE600 & Pink #FF2BD6) */}
      <GameSection onWinCelebration={launchConfetti} />

      {/* Footer */}
      <footer className="pt-6 pb-8 text-center flex flex-col items-center gap-2">
        <p className="font-heading text-xs uppercase tracking-widest text-gray-500">
          Angad Khandelwal • 14th Birthday
        </p>
        <p className="text-[10px] text-gray-600 font-mono">11.11.2026 • Exclusive VIP Experience</p>
      </footer>
    </main>
  );
}
