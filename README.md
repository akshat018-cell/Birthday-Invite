# ⚡ Angad's 14th Birthday Bash — VIP Invitation Web App

A production-grade, mobile-only digital birthday invitation built for **Angad Khandelwal's 14th Birthday** on **11 November 2026** (Timezone: `Asia/Kolkata`).

Crafted with a hype cyberpunk dark theme, section-specific neon glows, fluid glassmorphism, responsive micro-interactions, and a desktop QR redirection screen.

---

## 🚀 Tech Stack

- **Framework:** Next.js (App Router, Static Export Friendly)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom Neon Design System
- **Typography:** `next/font` with `Unbounded` (Headings) and `Outfit` (Body)
- **Icons:** Lucide Icons (`lucide-react`)
- **Animations:** Framer Motion
- **Desktop Detection & QR:** `qrcode.react`

---

## 🎨 Design System & Colors

Base background: `#07070D` with animated ambient gradient mesh and subtle digital grain.

| Section | Neon Accent | Hex Code |
| :--- | :--- | :--- |
| **Hero** | Cyber Cyan | `#00F0FF` |
| **Countdown** | Electric Magenta | `#FF2BD6` |
| **Details & Venue** | Acid Lime | `#B6FF00` |
| **Schedule** | Hyper Orange | `#FF8A00` |
| **Photo Gallery** | Ultraviolet | `#A855FF` |
| **RSVP Form** | Laser Green | `#39FF14` |
| **Arcade Mini-Game** | Cyber Yellow & Pink | `#FFE600` / `#FF2BD6` |

- **GPU-Friendly Glows:** Multi-layered box-shadow and text-shadow with constrained blur radii.
- **Mobile First & Safe Insets:** Built for 360px–430px screens utilizing `100dvh` and `env(safe-area-inset-*)`.
- **Desktop Interceptor:** Viewports $\ge$ 768px display an interactive QR code screen redirecting guests to their mobile device.

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node v20/v24)
- npm or pnpm

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) on your mobile browser or use Chrome DevTools Mobile Emulation (iPhone 14 / Pixel 7).

### 3. Production Build
```bash
npm run build
```
Generates an optimized production build. Compatible with Vercel and static hosting.

### 4. Code Linting
```bash
npm run lint
```

---

## 📋 BEFORE LAUNCH CHECKLIST

All core event data is centralized in [`src/config/event.ts`](file:///c:/DreamSpace/Birthday%20Invite/src/config/event.ts). Update the placeholders marked with `TODO` before distributing the link to guests.

| Item | File to edit | What to change |
| :--- | :--- | :--- |
| **Party Start Time** | `src/config/event.ts` | Change `startTime: null` to the finalized event time (e.g., `"5:30 PM"` or `"18:00"`). |
| **Venue Name** | `src/config/event.ts` | Replace `venue.name: null` with the venue title (e.g., `"Skyline Arena Club"`). |
| **Venue Address** | `src/config/event.ts` | Replace `venue.address: null` with full street address. |
| **Map Query / Link** | `src/config/event.ts` | Update `venue.mapQuery` and `venue.mapLink` with Google Maps destination URL. |
| **WhatsApp Number** | `src/config/event.ts` | Set `whatsappNumber: null` to the host's phone number in international format with digits only (e.g., `"919876543210"`). |
| **RSVP Message Template** | `src/config/event.ts` | Customize `rsvpMessageTemplate` string containing tokens `{name}`, `{guests}`, `{status}`, `{note}`. |
| **Contact Message Template** | `src/config/event.ts` | Customize `contactMessageTemplate` string containing tokens `{name}`, `{note}`. |
| **Schedule Times** | `src/config/event.ts` | Set the `time` property for each item in `schedule` (Arrival, Games, Cake Cutting, Food, Dance Floor). |
| **Secret Minigame Message** | `src/config/event.ts` | Personalize `secretMessage` revealed after winning the arcade game. |
| **Photo 1** | `public/photos/photo-1.jpg` | Replace placeholder with a high-res photo of Angad (400x500 or higher). |
| **Photo 2** | `public/photos/photo-2.jpg` | Replace placeholder with memory / squad photo. |
| **Photo 3** | `public/photos/photo-3.jpg` | Replace placeholder with party vibe / hype photo. |
| **Face Image 1** | `public/faces/face-1.png` | Replace with sticker/reaction face PNG (128x128 transparent). |
| **Face Image 2** | `public/faces/face-2.png` | Replace with sticker/reaction face PNG (128x128 transparent). |
| **Face Image 3** | `public/faces/face-3.png` | Replace with sticker/reaction face PNG (128x128 transparent). |
| **Face Image 4** | `public/faces/face-4.png` | Replace with sticker/reaction face PNG (128x128 transparent). |
| **Party Music File** | `public/audio/party.mp3` | Replace with 30-60s looping hype soundtrack/beat (MP3 format). |
| **Social Share (OG) Image** | `public/og.png` | Replace with custom 1200x630 Open Graph preview image for WhatsApp / iMessage / socials. |

---

## 🔒 SEO & Privacy
The invitation includes `noindex, nofollow` metadata to ensure the private family event is not indexed by public search engines.

