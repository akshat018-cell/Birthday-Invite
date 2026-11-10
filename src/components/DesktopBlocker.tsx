"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Smartphone, Sparkles, Copy, Check } from "lucide-react";
import { eventConfig, getAgeOrdinal } from "@/config/event";

export function DesktopBlocker() {
  const deployedUrl = eventConfig.deployedUrl;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(deployedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className="hidden md:flex fixed inset-0 z-50 flex-col items-center justify-center p-6 bg-[#07070D] text-white overflow-hidden select-none"
      aria-label="Desktop screen blocker"
    >
      {/* Background ambient neon orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main glass modal container */}
      <div className="relative z-10 max-w-md w-full glass-panel glass-panel-cyan p-8 rounded-3xl text-center flex flex-col items-center border border-cyan-500/30 shadow-[0_0_50px_-10px_rgba(0,240,255,0.25)]">
        {/* Animated Mobile Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center mb-6 text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
          <Smartphone className="w-8 h-8 animate-bounce" />
        </div>

        {/* Party Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-400/30 text-fuchsia-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
          <span>Exclusive Mobile Experience</span>
        </div>

        {/* Headings */}
        <h1 className="font-heading text-2xl font-black uppercase tracking-tight text-white mb-2">
          {eventConfig.guestOfHonour}&apos;s
          <span className="block neon-text-cyan">
            {getAgeOrdinal(eventConfig.turningAge)} Birthday Bash
          </span>
        </h1>

        <p className="text-gray-400 text-sm mb-6 max-w-xs">
          This digital invitation is designed exclusively for mobile devices with
          haptic sound, animations, and mini-games.
        </p>

        {/* QR Code Container */}
        <div className="p-4 bg-white rounded-2xl shadow-xl border-4 border-cyan-400/30 relative group mb-6">
          <QRCodeSVG
            value={deployedUrl}
            size={180}
            level="H"
            bgColor="#FFFFFF"
            fgColor="#07070D"
            includeMargin={false}
          />
        </div>

        <p className="text-xs uppercase tracking-widest text-cyan-300/80 font-medium mb-4">
          Scan with your phone camera to open
        </p>

        {/* Quick URL Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="tap-target px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white flex items-center gap-2 transition-colors active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-lime-400" />
              <span className="text-lime-300">Link Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-cyan-400" />
              <span>Copy invitation link</span>
            </>
          )}
        </button>
      </div>

      {/* Footer watermark */}
      <div className="absolute bottom-6 text-center text-xs text-gray-600 font-mono">
        11.11.2026 • {getAgeOrdinal(eventConfig.turningAge)} Milestone • Mobile Only
      </div>
    </div>
  );
}

