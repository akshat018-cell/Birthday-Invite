"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { eventConfig } from "@/config/event";
import { soundEffects } from "@/utils/audio";

export function WhatsAppFab() {
  // Don't render if no number configured
  if (!eventConfig.whatsappNumber) return null;

  const handleContact = () => {
    soundEffects.playTap();
    const message = eventConfig.contactMessageTemplate
      .replace("{name}", "")
      .replace("{note}", "");
    const url = `https://wa.me/${eventConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleContact}
      aria-label="Contact on WhatsApp"
      className="fixed bottom-6 right-4 z-30 tap-target w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.45)] bg-[#25D366] hover:bg-[#1ebe5d] active:scale-90 transition-all"
    >
      <MessageCircle className="w-7 h-7 text-white" strokeWidth={1.75} />
    </button>
  );
}
