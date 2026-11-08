"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, User, Users, MessageSquare, Copy, Sparkles } from "lucide-react";
import { eventConfig } from "@/config/event";
import { soundEffects } from "@/utils/audio";

export function RsvpSection({ onCelebration }: { onCelebration?: () => void }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"attending" | "declined">("attending");
  const [guestCount, setGuestCount] = useState(1);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    soundEffects.playVictory();
    if (onCelebration) onCelebration();

    const statusText = attending === "attending" ? "Attending 🎉" : "Cannot make it 😢";
    const noteText = note.trim() ? `Note: "${note.trim()}"` : "Can't wait!";

    // Replace tokens in template
    const message = eventConfig.rsvpMessageTemplate
      .replace("{name}", name.trim())
      .replace("{status}", statusText)
      .replace("{guests}", String(guestCount))
      .replace("{note}", noteText);

    if (eventConfig.whatsappNumber) {
      const whatsappUrl = `https://wa.me/${eventConfig.whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } else {
      // Copy to clipboard fallback
      if (navigator.clipboard) {
        navigator.clipboard.writeText(message);
        setCopiedNotification(true);
        setTimeout(() => setCopiedNotification(false), 4000);
      }
    }

    setSubmitted(true);
  };

  return (
    <section
      id="rsvp"
      aria-label="RSVP Form Section"
      className="scroll-mt-20 flex flex-col"
    >
      <div className="glass-panel glass-panel-green p-6 flex flex-col relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-green-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-2 text-green-400 text-xs font-semibold uppercase tracking-wider">
            <Send className="w-4 h-4 text-green-400" />
            <span>VIP Guestlist</span>
          </div>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-green-500/10 text-green-300 border border-green-500/20">
            Instant Access
          </span>
        </div>

        <h2 className="font-heading text-xl font-black uppercase tracking-tight text-white mb-1">
          Lock In <span className="neon-text-green">Your Spot</span>
        </h2>
        <p className="text-gray-400 text-xs mb-5">
          Send your confirmation directly to Angad via WhatsApp.
        </p>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-black/60 border border-green-400/40 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-400 flex items-center justify-center text-green-300 mb-3 shadow-[0_0_20px_rgba(57,255,20,0.3)]">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="font-heading text-base font-bold text-white uppercase">
              RSVP Registered!
            </h3>
            <p className="text-gray-300 text-xs mt-1 max-w-xs">
              {attending === "attending"
                ? `You're on the list, ${name}! Get ready for 11 November.`
                : `Thanks for letting Angad know, ${name}. You will be missed!`}
            </p>

            {copiedNotification && (
              <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-400/30 text-[11px] text-green-300 flex items-center gap-2">
                <Copy className="w-4 h-4 shrink-0 text-green-400" />
                <span>
                  Host number pending: RSVP text copied to your clipboard! Send it directly to Angad.
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                soundEffects.playTap();
                setSubmitted(false);
              }}
              className="mt-5 text-xs text-green-400 hover:text-green-300 underline font-mono"
            >
              Update or submit another response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-green-300 font-semibold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-green-400" />
                <span>Your Name</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-green-500/25 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(57,255,20,0.2)] transition-all"
              />
            </div>

            {/* Attendance Toggle */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-green-300 font-semibold">
                Will you be attending?
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap();
                    setAttending("attending");
                  }}
                  className={`tap-target py-2.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    attending === "attending"
                      ? "bg-green-500/20 border-2 border-green-400 text-green-300 shadow-[0_0_12px_rgba(57,255,20,0.25)]"
                      : "bg-black/40 border border-white/10 text-gray-400"
                  }`}
                >
                  <span>Hell Yeah! 🎉</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap();
                    setAttending("declined");
                  }}
                  className={`tap-target py-2.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    attending === "declined"
                      ? "bg-fuchsia-500/20 border-2 border-fuchsia-400 text-fuchsia-300 shadow-[0_0_12px_rgba(255,43,214,0.25)]"
                      : "bg-black/40 border border-white/10 text-gray-400"
                  }`}
                >
                  <span>Can&apos;t Make It 😢</span>
                </button>
              </div>
            </div>

            {/* Guest Count Stepper */}
            {attending === "attending" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-green-300 font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-green-400" />
                    Number of Guests
                  </span>
                  <span className="text-[10px] text-gray-400">Total Party</span>
                </label>
                <div className="flex items-center justify-between p-2 rounded-xl bg-black/50 border border-green-500/25">
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playTap();
                      setGuestCount((c) => Math.max(1, c - 1));
                    }}
                    className="tap-target w-10 h-10 rounded-lg bg-green-500/10 border border-green-400/30 text-green-300 text-lg font-bold flex items-center justify-center active:scale-95"
                  >
                    -
                  </button>
                  <span className="font-heading text-lg font-bold text-white">
                    {guestCount} {guestCount === 1 ? "Person" : "People"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playTap();
                      setGuestCount((c) => Math.min(5, c + 1));
                    }}
                    className="tap-target w-10 h-10 rounded-lg bg-green-500/10 border border-green-400/30 text-green-300 text-lg font-bold flex items-center justify-center active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Note / Song Request */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-green-300 font-semibold flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                <span>Song Request / Message for Angad</span>
              </label>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Song for the DJ or a birthday message..."
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-green-500/25 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(57,255,20,0.2)] transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="tap-target mt-2 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-300 hover:to-emerald-400 text-[#07070D] font-heading text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(57,255,20,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Confirm &amp; Send RSVP</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

