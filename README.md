# ⚡ Angad's 14th Birthday Bash — VIP Invitation Web App

A production-grade, mobile-only digital birthday invitation for **Angad Khandelwal's 14th Birthday** on **11 November 2026** (Asia/Kolkata).

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
| Photo Gallery | Ultraviolet | `#A855FF` |
| RSVP Form | Laser Green | `#39FF14` |
| Memory Match Game | Cyber Yellow + Pink | `#FFE600` / `#FF2BD6` |

---

## 🛠️ Local Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # ESLint check
```

Open in Chrome → DevTools → Toggle Device Mode → iPhone 14 (390px) or any ≥ 360px mobile viewport.

---

## 📋 BEFORE LAUNCH CHECKLIST

> All event data is in one place: [`src/config/event.ts`](src/config/event.ts).
> Replace every `null` value before distributing the link to guests.

| Item | File to edit | What to change |
| :--- | :--- | :--- |
| **TBA label** | `src/config/event.ts` | `tbaLabel: "Coming soon"` → default label for any unconfirmed value in cards and chips. |
| **Party start time** | `src/config/event.ts` | `startTime: null` → e.g. `"5:30 PM"`. Used in Details card, iCal file (timed vs all-day), and Hero chip. |
| **Venue name** | `src/config/event.ts` | `venue.name: null` → e.g. `"The Grand Arena"`. Shown in Details card, Hero chip, iCal location. |
| **Venue address** | `src/config/event.ts` | `venue.address: null` → full street address string. Shown below venue name when set. |
| **Map query** | `src/config/event.ts` | `venue.mapQuery: null` → Google Maps search query (optional). |
| **Map link** | `src/config/event.ts` | `venue.mapLink: null` → direct Google Maps / Apple Maps URL. Shows "Open in Maps" link when set. |
| **WhatsApp number** | `src/config/event.ts` | `whatsappNumber: null` → international digits only, no `+` or spaces, e.g. `"919876543210"`. Enables RSVP form & floating contact button. |
| **RSVP intro text** | `src/config/event.ts` | `rsvpIntro` → one-liner shown above the RSVP form. Default: `"Confirm your spot on WhatsApp, it takes 10 seconds."` |
| **RSVP message template** | `src/config/event.ts` | `rsvpMessageTemplate` → WhatsApp pre-fill. Tokens: `{name}` `{status}` `{guests}` `{note}`. |
| **Contact message template** | `src/config/event.ts` | `contactMessageTemplate` → used by the floating WhatsApp button. Tokens: `{name}` `{note}`. |
| **RSVP status labels** | `src/config/event.ts` | `rsvpStatuses` → array of `{ value, label }`. Default: "I'm in! 🎉", "Maybe 🤔", "Can't make it 😢". |
| **Schedule: Arrival time** | `src/config/event.ts` | `schedule[0].time: null` → e.g. `"5:30 PM"`. |
| **Schedule: Arrival description** | `src/config/event.ts` | `schedule[0].description: null` → optional detail shown in accordion. Leave null to hide. |
| **Schedule: Cake Cutting time** | `src/config/event.ts` | `schedule[1].time` → set when confirmed. |
| **Schedule: Cake Cutting description** | `src/config/event.ts` | `schedule[1].description` → optional. |
| **Schedule: Food time** | `src/config/event.ts` | `schedule[2].time` → set when confirmed. |
| **Schedule: Food description** | `src/config/event.ts` | `schedule[2].description` → optional. |
| **Schedule: Games time** | `src/config/event.ts` | `schedule[3].time` → set when confirmed. |
| **Schedule: Games description** | `src/config/event.ts` | `schedule[3].description` → optional. |
| **Schedule: Dance Floor time** | `src/config/event.ts` | `schedule[4].time` → set when confirmed. |
| **Schedule: Dance Floor description** | `src/config/event.ts` | `schedule[4].description` → optional. |
| **Dress code** | `src/config/event.ts` | `dressCode: null` → e.g. `"Neon / Cyber / Black"`. Leave null to hide the card entirely. |
| **Secret game message** | `src/config/event.ts` | `secretMessage` → shown after winning the memory match. |
| **Photo 1 image** | `public/photos/photo-1.jpg` | Replace placeholder with a real photo (any aspect ratio; displayed 4:5). |
| **Photo 1 caption** | `src/config/event.ts` | `photos[0].caption: null` → e.g. `"Level 14 unlocked"`. Leave null to show no caption. |
| **Photo 2 image** | `public/photos/photo-2.jpg` | Replace placeholder. |
| **Photo 2 caption** | `src/config/event.ts` | `photos[1].caption: null`. |
| **Photo 3 image** | `public/photos/photo-3.jpg` | Replace placeholder. |
| **Photo 3 caption** | `src/config/event.ts` | `photos[2].caption: null`. |
| **Face image 1** | `public/faces/face-1.png` | Replace with Angad face/sticker PNG (square, transparent bg). SVG fallback shown if missing. |
| **Face image 2** | `public/faces/face-2.png` | Same as above. |
| **Face image 3** | `public/faces/face-3.png` | Same as above. |
| **Face image 4** | `public/faces/face-4.png` | Same as above. |
| **Party music** | `public/audio/party.mp3` | Replace with a looping MP3 track (30–90s recommended). Player is hidden if file is unreachable. |
| **OG / share image** | `public/og.png` | Replace with a 1200×630 image for WhatsApp / iMessage / social previews. |

---

## 🔒 Privacy

`noindex, nofollow` robots meta is set. The invite is not indexed by search engines.
