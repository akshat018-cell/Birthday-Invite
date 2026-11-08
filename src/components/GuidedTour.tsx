"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, X } from "lucide-react";

interface TourStep {
  targetId: string;
  title: string;
  body: string;
}

const STEPS: TourStep[] = [
  {
    targetId: "hero",
    title: "Welcome! 🎉",
    body: "This is Angad's birthday invite. Scroll down to explore the party details.",
  },
  {
    targetId: "countdown",
    title: "Countdown ⏱️",
    body: "Watch the live countdown to the big day — and add it to your calendar!",
  },
  {
    targetId: "rsvp",
    title: "RSVP 💬",
    body: "Tell Angad if you're coming. It only takes 10 seconds via WhatsApp.",
  },
  {
    targetId: "game",
    title: "Mini-Game 🎮",
    body: "Flip cards to match Angad's faces. Win to unlock a secret message!",
  },
];

const STORAGE_KEY = "angad14-tour-done";

function getOverlayRect(id: string): DOMRect | null {
  const el = document.getElementById(id);
  return el ? el.getBoundingClientRect() : null;
}

export function GuidedTour() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const isLastStep = step === STEPS.length - 1;
  const currentStep = STEPS[step];

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    // Remove scroll lock
    document.body.style.overflow = "";
  }, []);

  const updateRect = useCallback(() => {
    if (!visible) return;
    const r = getOverlayRect(STEPS[step].targetId);
    setRect(r);
  }, [visible, step]);

  useEffect(() => {
    // First visit only
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // ignore storage errors
    }
    // Small delay to let page settle
    const t = setTimeout(() => {
      setVisible(true);
      document.body.style.overflow = "hidden";
    }, 800);
    return () => clearTimeout(t);
  }, []);

  // Scroll target into view and update rect
  useEffect(() => {
    if (!visible) return;
    const el = document.getElementById(currentStep.targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      const t = setTimeout(updateRect, 400);
      return () => clearTimeout(t);
    }
  }, [visible, step, currentStep.targetId, updateRect]);

  useEffect(() => {
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, [updateRect]);

  const next = () => {
    if (isLastStep) {
      dismiss();
    } else {
      setStep((s) => s + 1);
    }
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  if (!visible) {
    return (
      /* Replay "?" button — always present for returning visitors */
      <button
        type="button"
        aria-label="Replay guided tour"
        onClick={() => {
          setStep(0);
          setVisible(true);
          document.body.style.overflow = "hidden";
        }}
        className="fixed bottom-6 left-4 z-30 tap-target w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold flex items-center justify-center hover:bg-white/20 active:scale-90 transition-all"
      >
        ?
      </button>
    );
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Dark backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px]"
            onClick={dismiss}
          />

          {/* Spotlight — highlights the target element */}
          {rect && (
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed z-40 rounded-2xl ring-4 ring-cyan-400 ring-offset-2 ring-offset-transparent pointer-events-none"
              style={{
                top: rect.top - 6,
                left: rect.left - 6,
                width: rect.width + 12,
                height: rect.height + 12,
                boxShadow: "0 0 0 9999px rgba(0,0,0,0.6)",
              }}
            />
          )}

          {/* Tooltip card — centred, stays in mobile column */}
          <motion.div
            key={`card-${step}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-[390px]"
          >
            <div className="glass-panel glass-panel-cyan p-5 rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.25)]">
              <div className="flex items-start justify-between mb-2">
                <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider font-bold">
                  Step {step + 1} of {STEPS.length}
                </span>
                <button
                  type="button"
                  onClick={dismiss}
                  aria-label="Skip tour"
                  className="tap-target -mt-1 -mr-1 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-heading text-base font-black text-white mb-1">
                {currentStep.title}
              </h3>
              <p className="text-gray-300 text-xs leading-relaxed mb-4">
                {currentStep.body}
              </p>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="tap-target px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-white disabled:opacity-30 flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                {/* Dot indicators */}
                <div className="flex items-center gap-1.5">
                  {STEPS.map((_, i) => (
                    <span
                      key={i}
                      className={`rounded-full transition-all ${
                        i === step
                          ? "w-4 h-1.5 bg-cyan-400 shadow-[0_0_6px_#00F0FF]"
                          : "w-1.5 h-1.5 bg-gray-600"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={next}
                  className="tap-target px-3 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-xs text-cyan-300 font-semibold flex items-center gap-1 transition-colors active:scale-95"
                >
                  <span>{isLastStep ? "Done" : "Next"}</span>
                  {!isLastStep && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
