export interface VenueConfig {
  /** Name of the party venue, or null if to be revealed */
  name: string | null;
  /** Physical street address or location description */
  address: string | null;
  /** Query parameter used for Google Maps search */
  mapQuery: string | null;
  /** Direct link to Google Maps / Apple Maps */
  mapLink: string | null;
}

export interface ScheduleItem {
  id: string;
  /** E.g. "5:30 PM" or "18:00" or null if exact timing is pending */
  time: string | null;
  title: string;
  emoji: string;
  description?: string;
}

export interface EventConfig {
  guestOfHonour: string;
  turningAge: number;
  /** ISO Date string YYYY-MM-DD */
  date: string;
  /** Timezone for countdown and event timing */
  timezone: string;
  /** Start time e.g. "17:30" or "5:30 PM", null if undecided */
  startTime: string | null;
  /** Venue details */
  venue: VenueConfig;
  /** WhatsApp phone number for RSVP, international format digits only (e.g. "919876543210") */
  whatsappNumber: string | null;
  /** Template for WhatsApp RSVP message. Tokens: {name}, {guests}, {status}, {note} */
  rsvpMessageTemplate: string;
  /** Template for contacting the host. Tokens: {name}, {note} */
  contactMessageTemplate: string;
  /** Event schedule timeline */
  schedule: ScheduleItem[];
  /** Easter egg message unlocked after winning the minigame */
  secretMessage: string;
  /** Music audio track metadata */
  audio: {
    src: string;
    title: string;
  };
  /** Gallery photos configuration */
  photos: {
    src: string;
    caption: string;
    alt: string;
  }[];
  /** Face reactions / stickers for interactive game & celebration */
  faces: {
    src: string;
    label: string;
  }[];
}

/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH EVENT CONFIGURATION
 * ============================================================================
 * Edit the values below to update the invitation.
 * Look for "TODO" markers for fields that still need to be finalized.
 */
export const eventConfig: EventConfig = {
  guestOfHonour: "Angad Khandelwal",
  turningAge: 14,
  date: "2026-11-11",
  timezone: "Asia/Kolkata",

  // TODO: Finalize party start time (e.g. "5:30 PM" or "18:00")
  startTime: null,

  // TODO: Finalize venue location details
  venue: {
    name: null,      // e.g. "Skyline Arena Club"
    address: null,   // e.g. "Level 4, High Street Mall, MG Road, Bengaluru"
    mapQuery: null,  // e.g. "Skyline Arena Club Bengaluru"
    mapLink: null,   // e.g. "https://maps.google.com/?q=..."
  },

  // TODO: Enter host WhatsApp number in international format, digits only (no '+' or spaces)
  // e.g. "919876543210"
  whatsappNumber: null,

  rsvpMessageTemplate:
    "Hey Angad! RSVP for {name}: {status}! 🚀 Party of {guests}. {note}",

  contactMessageTemplate:
    "Hey Angad! Message from {name}: {note}",

  // Schedule timeline with placeholder items
  schedule: [
    {
      id: "arrival",
      time: null, // TODO: Set time e.g. "5:30 PM"
      title: "Arrival & Red Carpet Entry",
      emoji: "🔥",
      description: "Neon wristbands, hype music, and welcome mocktails.",
    },
    {
      id: "games",
      time: null, // TODO: Set time e.g. "6:15 PM"
      title: "Arcade Battles & Laser Tag",
      emoji: "🎮",
      description: "Squad tournaments, high score showdowns, and prizes.",
    },
    {
      id: "cake",
      time: null, // TODO: Set time e.g. "7:30 PM"
      title: "Cake Cutting Ceremony",
      emoji: "🎂",
      description: "The big 14 milestone moment with sparklers and confetti.",
    },
    {
      id: "food",
      time: null, // TODO: Set time e.g. "8:00 PM"
      title: "Gourmet Feast & Bites",
      emoji: "🍕",
      description: "Pizza bar, sliders, loaded fries, and dessert station.",
    },
    {
      id: "dance",
      time: null, // TODO: Set time e.g. "8:45 PM"
      title: "DJ & Glow Dance Floor",
      emoji: "🪩",
      description: "Bass-boosted anthems, neon glow sticks, and dance circle.",
    },
  ],

  // Fun secret easter-egg unlocked upon winning the mini-game
  secretMessage:
    "🏆 CODE CRACKED: You're an absolute legend! Angad has reserved a VIP neon swag bag and DJ booth shoutout for you. See you on the floor! ⚡",

  // Background party music
  audio: {
    src: "/audio/party.mp3",
    title: "Angad's 14th Hype Track",
  },

  // Photo gallery placeholders
  photos: [
    {
      src: "/photos/photo-1.jpg",
      caption: "Leveling up to 14",
      alt: "Angad celebrating 14th birthday",
    },
    {
      src: "/photos/photo-2.jpg",
      caption: "Hype squad energy",
      alt: "Party memories and good times",
    },
    {
      src: "/photos/photo-3.jpg",
      caption: "Unstoppable vibes",
      alt: "Looking forward to 11 Nov 2026",
    },
  ],

  // Interactive face / sticker assets
  faces: [
    { src: "/faces/face-1.png", label: "Hyped" },
    { src: "/faces/face-2.png", label: "Party Mode" },
    { src: "/faces/face-3.png", label: "Legend" },
    { src: "/faces/face-4.png", label: "VIP" },
  ],
};

/**
 * Format date for display in the local timezone
 */
export function formatEventDate(dateStr: string = eventConfig.date): string {
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

