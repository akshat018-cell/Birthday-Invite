"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, User, Users, MessageSquare, Copy } from "lucide-react";
import { eventConfig, RsvpStatus } from "@/config/event";
import { soundEffects } from "@/utils/audio";

export function RsvpSection({ onCelebration }: { onCelebration?: () => void }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<string>(eventConfig.rsvpStatuses[0]?.value ?? "attending");
  const [guestCount, setGuestCount] = useState(1);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [rsvpSoonToast, setRsvpSoonToast] = useState(false);

  const selectedStatus = eventConfig.rsvpStatuses.find((s) => s.value === status);
  const isAttending = status === "attending" || status === "maybe";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // If no WhatsApp number is configured → show "RSVP opens soon" toast
    if (!eventConfig.whatsappNumber) {
      setRsvpSoonToast(true);
      setTimeout(() => setRsvpSoonToast(false), 3500);
      return;
    }

    soundEffects.playVictory();
    if (onCelebration) onCelebration();

    const statusLabel = selectedStatus?.label ?? status;
    const noteText = note.trim();
    const noteLine = noteText ? `Message: ${noteText}` : "";

    const message = eventConfig.rsvpMessageTemplate
      .replace("{name}", name.trim())
      .replace("{status}", statusLabel)
      .replace("{guests}", String(guestCount))
      .replace("\n{noteLine}", noteLine ? `\n${noteLine}` : "")
      .replace("{noteLine}", noteLine);

    const whatsappUrl = `https://wa.me/${eventConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
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
            Secure Your Spot
          </span>
        </div>

        <h2 className="font-heading text-xl font-black uppercase tracking-tight text-white mb-1">
          Lock In <span className="neon-text-green">Your Spot</span>
        </h2>
        {/* rsvpIntro from config — no hardcoded "directly to Angad" copy */}
        <p className="text-gray-400 text-xs mb-5">
          {eventConfig.rsvpIntro}
        </p>

        {/* "RSVP opens soon" toast */}
        {rsvpSoonToast && (
          <div
            role="status"
            aria-live="polite"
            className="mb-4 p-3 rounded-xl bg-yellow-500/10 border border-yellow-400/30 text-[11px] text-yellow-300 flex items-center gap-2"
          >
            <Copy className="w-4 h-4 shrink-0 text-yellow-400" />
            <span>RSVP opens soon — check back closer to the date!</span>
          </div>
        )}

        {submitted ? (
          <div className="p-6 rounded-2xl bg-black/60 border border-green-400/40 text-center flex flex-col items-center">
            <div
              role="status"
              aria-live="polite"
              className="w-14 h-14 rounded-full bg-green-500/20 border border-green-400 flex items-center justify-center text-green-300 mb-3 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
            >
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="font-heading text-base font-bold text-white uppercase">
              RSVP Sent!
            </h3>
            <p className="text-gray-300 text-xs mt-1 max-w-xs">
              {status === "declined"
                ? `Thanks for letting us know, ${name}. You will be missed!`
                : `You&apos;re on the list, ${name}! See you on 11 November.`}
            </p>

            {copiedNotification && (
              <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-400/30 text-[11px] text-green-300 flex items-center gap-2">
                <Copy className="w-4 h-4 shrink-0 text-green-400" />
                <span>RSVP text copied to clipboard.</span>
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
              Update my response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="rsvp-name"
                className="text-[11px] font-mono uppercase tracking-wider text-green-300 font-semibold flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-green-400" />
                <span>Your Name</span>
              </label>
              <input
                id="rsvp-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-green-500/25 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(57,255,20,0.2)] transition-all"
              />
            </div>

            {/* Three-way Status */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-green-300 font-semibold">
                Will you be there?
              </span>
              <div className="grid grid-cols-3 gap-2">
                {eventConfig.rsvpStatuses.map((s: RsvpStatus) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => {
                      soundEffects.playTap();
                      setStatus(s.value);
                    }}
                    className={`tap-target py-2.5 px-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center text-center leading-tight ${
                      status === s.value
                        ? "bg-green-500/20 border-2 border-green-400 text-green-300 shadow-[0_0_12px_rgba(57,255,20,0.25)]"
                        : "bg-black/40 border border-white/10 text-gray-400"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Count Stepper — shown for attending / maybe */}
            {isAttending && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-green-300 font-semibold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-green-400" />
                  <span>Number of Guests</span>
                </label>
                <div className="flex items-center justify-between p-2 rounded-xl bg-black/50 border border-green-500/25">
                  <button
                    type="button"
                    aria-label="Decrease guest count"
                    onClick={() => {
                      soundEffects.playTap();
                      setGuestCount((c) => Math.max(1, c - 1));
                    }}
                    className="tap-target w-10 h-10 rounded-lg bg-green-500/10 border border-green-400/30 text-green-300 text-lg font-bold flex items-center justify-center active:scale-95"
                  >
                    −
                  </button>
                  <span className="font-heading text-lg font-bold text-white">
                    {guestCount} {guestCount === 1 ? "Person" : "People"}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase guest count"
                    onClick={() => {
                      soundEffects.playTap();
                      setGuestCount((c) => Math.min(2, c + 1));
                    }}
                    className="tap-target w-10 h-10 rounded-lg bg-green-500/10 border border-green-400/30 text-green-300 text-lg font-bold flex items-center justify-center active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Message for Angad (optional) */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="rsvp-note"
                className="text-[11px] font-mono uppercase tracking-wider text-green-300 font-semibold flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                <span>Message for Angad (optional)</span>
              </label>
              <textarea
                id="rsvp-note"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Say something to the birthday boy…"
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-green-500/25 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(57,255,20,0.2)] transition-all resize-none"
              />
            </div>

            {/* Submit */}
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
