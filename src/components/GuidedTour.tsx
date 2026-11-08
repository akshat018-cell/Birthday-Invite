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
    body: "This is Angad's birthday invite. Scroll to explore the details.",
  },
  {
    targetId: "countdown",
    title: "Countdown ⏱️",
    body: "Live countdown to the milestone. Save it to your calendar!",
  },
  {
    targetId: "rsvp",
    title: "RSVP 💬",
    body: "Confirm if you're coming on WhatsApp in 10 seconds.",
  },
  {
    targetId: "game",
    title: "Mini-Game 🎮",
    body: "Match Angad's faces to unlock a secret message!",
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
    document.body.style.overflow = "";
  }, []);

  const updateRect = useCallback(() => {
    if (!visible) return;
    const r = getOverlayRect(STEPS[step].targetId);
    setRect(r);
  }, [visible, step]);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // ignore storage errors
    }
    const t = setTimeout(() => {
      setVisible(true);
      document.body.style.overflow = "hidden";
    }, 800);
    return () => clearTimeout(t);
  }, []);

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
      <button
        type="button"
        aria-label="Replay guided tour"
        onClick={() => {
          setStep(0);
          setVisible(true);
          document.body.style.overflow = "hidden";
        }}
        className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-30 tap-target w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold flex items-center justify-center hover:bg-white/20 active:scale-90 transition-all shadow-md backdrop-blur-sm"
      >
        ?
      </button>
    );
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px]"
            onClick={dismiss}
          />

          {/* Spotlight outline */}
          {rect && (
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed z-40 rounded-2xl ring-2 ring-cyan-400 ring-offset-2 ring-offset-transparent pointer-events-none"
              style={{
                top: rect.top - 6,
                left: rect.left - 6,
                width: rect.width + 12,
                height: rect.height + 12,
                boxShadow: "0 0 0 9999px rgba(0,0,0,0.65)",
              }}
            />
          )}

          {/* Compact, centered bottom dialog */}
          <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 pointer-events-none">
            <motion.div
              key={`card-${step}`}
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="pointer-events-auto w-full max-w-[310px]"
            >
              <div className="glass-panel glass-panel-cyan p-3.5 rounded-2xl shadow-[0_0_25px_rgba(0,240,255,0.25)] border border-cyan-400/40 bg-[#0c0c16]/95 backdrop-blur-md">
                {/* Header */}
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono uppercase text-cyan-400 tracking-wider font-bold">
                    Step {step + 1} of {STEPS.length}
                  </span>
                  <button
                    type="button"
                    onClick={dismiss}
                    aria-label="Skip tour"
                    className="tap-target -mr-1 -mt-1 w-6 h-6 rounded-md flex items-center justify-center text-gray-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Title & Body */}
                <h3 className="font-heading text-xs font-black text-white mb-0.5 tracking-tight">
                  {currentStep.title}
                </h3>
                <p className="text-gray-300 text-[11px] leading-snug mb-3">
                  {currentStep.body}
                </p>

                {/* Controls */}
                <div className="flex items-center justify-between pt-1 border-t border-cyan-500/15">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 0}
                    className="px-2 py-1 rounded-md text-[10px] font-mono text-gray-400 hover:text-white disabled:opacity-20 flex items-center gap-0.5 transition-colors"
                  >
                    <ChevronLeft className="w-3 h-3" />
                    <span>Back</span>
                  </button>

                  {/* Dot indicators */}
                  <div className="flex items-center gap-1">
                    {STEPS.map((_, i) => (
                      <span
                        key={i}
                        className={`rounded-full transition-all ${
                          i === step
                            ? "w-3 h-1 bg-cyan-400 shadow-[0_0_6px_#00F0FF]"
                            : "w-1 h-1 bg-gray-600"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={next}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-[10px] font-mono text-cyan-300 font-bold flex items-center gap-0.5 transition-colors active:scale-95"
                  >
                    <span>{isLastStep ? "Done" : "Next"}</span>
                    {!isLastStep && <ChevronRight className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
