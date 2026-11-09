"use client";

import React, { useState } from "react";
import { MessageCircle, Info } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { eventConfig } from "@/config/event";
import { soundEffects } from "@/utils/audio";

export function WhatsAppFab() {
  const [showToast, setShowToast] = useState(false);

  const handleContact = () => {
    soundEffects.playTap();

    if (!eventConfig.whatsappNumber) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const message = eventConfig.contactMessageTemplate;
    const url = `https://wa.me/${eventConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Safe-area aware floating button at bottom-right with animated pulse ring */}
      <div className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-30">
        <button
          type="button"
          onClick={handleContact}
          aria-label="Contact host on WhatsApp"
          className="relative tap-target w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.45)] bg-[#25D366] hover:bg-[#20ba5a] active:scale-90 transition-transform"
        >
          {/* Animated pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />
          <MessageCircle className="relative z-10 w-7 h-7 text-white" strokeWidth={2} />
        </button>
      </div>

      {/* Toast when whatsappNumber is null */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-[calc(max(1.5rem,env(safe-area-inset-bottom))+4.2rem)] right-[max(1rem,env(safe-area-inset-right))] z-40 max-w-[260px] pointer-events-none"
          >
            <div className="glass-panel glass-panel-green px-3.5 py-2.5 rounded-xl bg-[#0a120c]/95 border border-green-400/40 shadow-[0_0_25px_rgba(57,255,20,0.25)] flex items-center gap-2 text-xs text-green-300">
              <Info className="w-4 h-4 text-green-400 shrink-0" />
              <span className="font-mono text-[11px] font-semibold">Contact number coming soon</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
