"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, ChevronDown } from "lucide-react";
import { eventConfig, ScheduleItem } from "@/config/event";
import { soundEffects } from "@/utils/audio";

export function ScheduleSection() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleItem = (id: string, hasDescription: boolean) => {
    if (!hasDescription) return;
    soundEffects.playTap();
    setActiveItem((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="schedule"
      aria-label="Schedule Timeline Section"
      className="scroll-mt-20 flex flex-col"
    >
      <div className="glass-panel glass-panel-orange p-6 flex flex-col relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute -top-10 -left-10 w-36 h-36 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-2 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <CalendarDays className="w-4 h-4 text-orange-400" />
            <span>Night Protocol</span>
          </div>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-orange-500/10 text-orange-300 border border-orange-500/20">
            {eventConfig.schedule.length} Stages
          </span>
        </div>

        <h2 className="font-heading text-xl font-black uppercase tracking-tight text-white mb-1">
          Party <span className="neon-text-orange">Timeline</span>
        </h2>
        <p className="text-gray-400 text-xs mb-6">
          The night&apos;s agenda. Times to be confirmed.
        </p>

        {/* Timeline Items */}
        <div className="relative flex flex-col gap-3 pl-4 border-l-2 border-orange-500/30 ml-2">
          {eventConfig.schedule.map((item: ScheduleItem, index: number) => {
            const hasDescription = Boolean(item.description);
            const isExpanded = activeItem === item.id;

            return (
              <div key={item.id} className="relative group">
                {/* Timeline node */}
                <span
                  className={`absolute -left-[23px] top-3.5 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                    isExpanded
                      ? "bg-orange-400 border-white shadow-[0_0_10px_#FF8A00]"
                      : "bg-[#07070D] border-orange-400/60"
                  }`}
                />

                <div
                  onClick={() => toggleItem(item.id, hasDescription)}
                  className={`p-3.5 rounded-xl transition-all ${
                    hasDescription ? "cursor-pointer select-none" : "cursor-default"
                  } ${
                    isExpanded
                      ? "bg-black/60 border border-orange-500/40 shadow-[0_0_15px_rgba(255,138,0,0.15)]"
                      : "bg-black/30 border border-white/5 hover:border-orange-500/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl shrink-0" role="img" aria-label={item.title}>
                        {item.emoji}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono uppercase text-orange-400/90 font-semibold tracking-wider">
                          Phase 0{index + 1}
                          {item.time ? ` • ${item.time}` : " • Time TBC"}
                        </span>
                        <h3 className="text-white text-xs font-heading font-bold mt-0.5">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    {/* Only show chevron if there is a description to expand */}
                    {hasDescription && (
                      <ChevronDown
                        className={`w-4 h-4 text-orange-400 transition-transform duration-200 shrink-0 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>

                  <AnimatePresence>
                    {isExpanded && item.description && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-300 text-xs mt-2.5 pt-2 border-t border-orange-500/20 leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer — only factual info */}
        <div className="mt-5 pt-3 border-t border-orange-500/15 flex items-center gap-1.5 text-[11px] text-orange-300/70 font-mono">
          <Clock className="w-3.5 h-3.5 text-orange-400" />
          <span>Times to be confirmed</span>
        </div>
      </div>
    </section>
  );
}
