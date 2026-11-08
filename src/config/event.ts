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
  /** Optional description shown in the accordion. Hidden when null/undefined. */
  description?: string | null;
}

export interface RsvpStatus {
  value: string;
  label: string;
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
  /** Optional dress code, e.g. "Neon / Cyber / Black". Hidden when null. */
  dressCode: string | null;
  /** Label used for any unconfirmed/undecided values across cards and chips */
  tbaLabel: string;
  /** WhatsApp phone number for RSVP, international format digits only (e.g. "919876543210") */
  whatsappNumber: string | null;
  /** Intro text shown above the RSVP form */
  rsvpIntro: string;
  /** Template for WhatsApp RSVP message. Tokens: {name}, {guests}, {status}, {note} */
  rsvpMessageTemplate: string;
  /** Template for contacting the host. Tokens: {name}, {note} */
  contactMessageTemplate: string;
  /** RSVP status options shown to the guest */
  rsvpStatuses: RsvpStatus[];
  /** Event schedule timeline */
  schedule: ScheduleItem[];
  /** Easter egg message unlocked after winning the memory game */
  secretMessage: string;
  /** Music audio track metadata */
  audio: {
    src: string;
    title: string;
  };
  /** Gallery photos configuration */
  photos: {
    src: string;
    caption: string | null;
    alt: string;
  }[];
  /** Face images used in the memory match game (4 required; fallback SVGs shown when missing) */
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
    name: null,      // e.g. "The Grand Arena"
    address: null,   // e.g. "123 Main Street, City"
    mapQuery: null,  // e.g. "The Grand Arena City"
    mapLink: null,   // e.g. "https://maps.google.com/?q=..."
  },

  // Default label for unconfirmed values across cards and chips
  tbaLabel: "Coming soon",

  // TODO: Add dress code once decided, e.g. "Neon / Cyber / Black". Set null to hide the card.
  dressCode: null,

  // TODO: Enter host WhatsApp number in international format, digits only (no '+' or spaces)
  // e.g. "919876543210"
  whatsappNumber: null,

  rsvpIntro: "Confirm your spot on WhatsApp, it takes 10 seconds.",

  rsvpMessageTemplate:
    "Hey Angad! RSVP for {name}: {status}! 🚀 Party of {guests}. {note}",

  contactMessageTemplate:
    "Hey Angad! Message from {name}: {note}",

  rsvpStatuses: [
    { value: "attending",  label: "I'm in! 🎉" },
    { value: "maybe",      label: "Maybe 🤔" },
    { value: "declined",   label: "Can't make it 😢" },
  ],

  // Schedule timeline — only the five agreed items. Descriptions are optional.
  schedule: [
    {
      id: "arrival",
      time: null, // TODO: Set time e.g. "5:30 PM"
      title: "Arrival",
      emoji: "🔥",
      description: null, // TODO: Add description when decided
    },
    {
      id: "cake",
      time: null, // TODO: Set time e.g. "7:00 PM"
      title: "Cake Cutting",
      emoji: "🎂",
      description: null, // TODO: Add description when decided
    },
    {
      id: "food",
      time: null, // TODO: Set time e.g. "7:30 PM"
      title: "Food",
      emoji: "🍕",
      description: null, // TODO: Add description when decided
    },
    {
      id: "games",
      time: null, // TODO: Set time e.g. "8:15 PM"
      title: "Games",
      emoji: "🎮",
      description: null, // TODO: Add description when decided
    },
    {
      id: "dance",
      time: null, // TODO: Set time e.g. "9:00 PM"
      title: "Dance Floor",
      emoji: "🪩",
      description: null, // TODO: Add description when decided
    },
  ],

  // Easter egg revealed after beating the memory match game
  // TODO: The event host can replace this with their own custom text or prize code
  secretMessage: "You cracked it! Happy 14th, Angad! 🎉",

  // Background party music
  audio: {
    src: "/audio/party.mp3",
    title: "Angad's 14th Hype Track",
  },

  // Photo gallery (caption is optional — set null to hide)
  photos: [
    {
      src: "/photos/photo-1.jpg",
      caption: null, // TODO: Add caption e.g. "Level 14 unlocked"
      alt: "Angad at his birthday",
    },
    {
      src: "/photos/photo-2.jpg",
      caption: null, // TODO: Add caption
      alt: "Angad birthday photo",
    },
    {
      src: "/photos/photo-3.jpg",
      caption: null, // TODO: Add caption
      alt: "Angad birthday photo",
    },
  ],

  // Face images used in the memory match game
  faces: [
    { src: "/faces/face-1.png", label: "Face 1" },
    { src: "/faces/face-2.png", label: "Face 2" },
    { src: "/faces/face-3.png", label: "Face 3" },
    { src: "/faces/face-4.png", label: "Face 4" },
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
