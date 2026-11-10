# ⚡ Angad's 13th Birthday Bash — VIP Invitation Web App

A production-grade, mobile-only digital birthday invitation for **Angad Khandelwal's 13th Birthday** on **11 November 2026** (Asia/Kolkata).

---

## 🚀 Tech Stack

- **Next.js 14** (App Router, static-export friendly)
- **TypeScript** · **Tailwind CSS** · **Framer Motion**
- **next/font**: `Unbounded` (headings) · `Outfit` (body)
- **Lucide** icons · `qrcode.react` for desktop QR code

---

## 🎨 Design System

Base: `#07070D` · animated radial mesh gradient · SVG grain overlay

| Section | Neon Accent | Hex |
| :--- | :--- | :--- |
| Hero | Cyber Cyan | `#00F0FF` |
| Countdown | Electric Magenta | `#FF2BD6` |
| Details & Venue | Acid Lime | `#B6FF00` |
| Schedule | Hyper Orange | `#FF8A00` |
| RSVP Form | Laser Green | `#39FF14` |
| Memory Match Game | Cyber Yellow + Pink | `#FFE600` / `#FF2BD6` |

---

## 🌐 Live Deployment
- **Production URL:** [https://angad-birthday.vercel.app/](https://angad-birthday.vercel.app/)

---

## 🛠️ Local Development

```bash
npm install
npm run dev        # local test server
npm run build      # production build
npm run lint       # ESLint check
```

Open in Chrome → DevTools → Toggle Device Mode → iPhone 14 (390px) or any ≥ 360px mobile viewport.

---

## 📋 BEFORE LAUNCH CHECKLIST

> All event data is configured in [`src/config/event.ts`](src/config/event.ts).

### ✅ Completed & Filled Event Details

| Detail | Configured Value | Status |
| :--- | :--- | :--- |
| **Guest of Honour** | Angad Khandelwal (Turning 13) | ✅ Configured |
| **Date & Timezone** | 11 November 2026 (Asia/Kolkata +05:30) | ✅ Configured |
| **Party Hours** | 6:00 PM – 9:00 PM (`18:00` to `21:00`) | ✅ Configured |
| **Host Contact** | Akshat (Angad's elder brother) | ✅ Configured |
| **WhatsApp Number** | `917974644795` (wa.me direct integration) | ✅ Configured |
| **Venue Name** | Solaris Hotel & Club | ✅ Configured |
| **Venue Address** | Near, Jay Nagar, Rajiv Gandhi Cir, Indore, MP 452001 | ✅ Configured |
| **Map & Directions** | Google Maps embed, direct links, and navigation | ✅ Configured |
| **Calendar Sync** | Google Calendar URL + Apple/Outlook `.ics` (Asia/Kolkata) | ✅ Configured |
| **Schedule Protocol** | 3 Stages (Arrival 6:00–6:30 PM, Food 7:00 PM, Cake Cutting 8:00–8:15 PM) | ✅ Configured |
| **RSVP Form & Copy** | Dynamic template with name, status, guests, note | ✅ Configured |
| **Memory Game Faces** | 4 custom color emoji face cards (512×512 retina optimized) | ✅ Configured |
| **Game Victory Screen** | `winTitle` & `winMessage` ("LEVEL CLEARED 🏆") | ✅ Configured |

---

### ⏳ Still Pending (Replace Before Public Distribution)

| Item | File to edit | What to change |
| :--- | :--- | :--- |
| **Party music** | `public/audio/party.mp3` | Replace with a looping MP3 track (30–90s recommended). Player is hidden if file is unreachable. |
| **OG / share image** | `public/og.png` | Replace with a 1200×630 image for WhatsApp / iMessage / social previews. |

---

## 🔒 Privacy

`noindex, nofollow` robots meta is set. The invite is not indexed by search engines.