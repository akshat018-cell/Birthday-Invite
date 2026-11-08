"use client";

import React from "react";

// SVG fallback faces — always looks finished even without face images
const FALLBACK_FACES: React.ReactElement[] = [
  // Face 1 — Hyped 😄
  <svg key="f1" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="40" cy="40" r="36" fill="#1a1a2e" stroke="#00F0FF" strokeWidth="2.5" />
    <circle cx="29" cy="32" r="5" fill="#00F0FF" />
    <circle cx="51" cy="32" r="5" fill="#00F0FF" />
    <path d="M25 50 Q40 65 55 50" stroke="#00F0FF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <circle cx="29" cy="30" r="2" fill="#07070D" />
    <circle cx="51" cy="30" r="2" fill="#07070D" />
  </svg>,
  // Face 2 — Cool 😎
  <svg key="f2" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="40" cy="40" r="36" fill="#1a1a2e" stroke="#FF2BD6" strokeWidth="2.5" />
    <rect x="20" y="27" width="16" height="9" rx="4" fill="#FF2BD6" />
    <rect x="44" y="27" width="16" height="9" rx="4" fill="#FF2BD6" />
    <rect x="36" y="27" width="8" height="5" rx="0" fill="#FF2BD6" />
    <path d="M27 54 Q40 62 53 54" stroke="#FF2BD6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>,
  // Face 3 — Surprised 😲
  <svg key="f3" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="40" cy="40" r="36" fill="#1a1a2e" stroke="#B6FF00" strokeWidth="2.5" />
    <circle cx="29" cy="33" r="6" fill="none" stroke="#B6FF00" strokeWidth="2" />
    <circle cx="51" cy="33" r="6" fill="none" stroke="#B6FF00" strokeWidth="2" />
    <circle cx="29" cy="33" r="2.5" fill="#B6FF00" />
    <circle cx="51" cy="33" r="2.5" fill="#B6FF00" />
    <ellipse cx="40" cy="54" rx="7" ry="8" fill="none" stroke="#B6FF00" strokeWidth="2" />
  </svg>,
  // Face 4 — Laughing 😂
  <svg key="f4" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="40" cy="40" r="36" fill="#1a1a2e" stroke="#FFE600" strokeWidth="2.5" />
    <path d="M22 32 Q29 25 36 32" stroke="#FFE600" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M44 32 Q51 25 58 32" stroke="#FFE600" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M22 50 Q40 68 58 50" stroke="#FFE600" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M22 50 Q40 68 58 50" fill="#FFE600" opacity="0.3" />
  </svg>,
];

export function FallbackFace({ index }: { index: number }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      {FALLBACK_FACES[index % FALLBACK_FACES.length]}
    </div>
  );
}
