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
  /** E.g. "6:00 – 6:30 PM" or null if exact timing is pending */
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
  /** Primary deployed Vercel URL */
  deployedUrl: string;
  /** ISO Date string YYYY-MM-DD */
  date: string;
  /** Timezone for countdown and event timing */
  timezone: string;
  /** Start time in 24h format e.g. "18:00", null if undecided */
  startTime: string | null;
  /** End time in 24h format e.g. "21:00", null if undecided */
  endTime: string | null;
  /** Display string for the time range e.g. "6:00 PM – 9:00 PM" */
  timeDisplay: string | null;
  /** Name of the event host (Angad's elder brother) */
  hostName: string;
  /** Venue details */
  venue: VenueConfig;
  /** Label used for any unconfirmed/undecided values across cards and chips */
  tbaLabel: string;
  /** WhatsApp phone number for RSVP, international format digits only (e.g. "919876543210") */
  whatsappNumber: string | null;
  /** Intro text shown above the RSVP form */
  rsvpIntro: string;
  /** Template for WhatsApp RSVP message. Tokens: {name}, {guests}, {status}, {noteLine} */
  rsvpMessageTemplate: string;
  /** Template for contacting the host. No tokens needed. */
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
  deployedUrl: "https://angad-birthday.vercel.app/",
  date: "2026-11-11",
  timezone: "Asia/Kolkata",

  startTime: "18:00",
  endTime: "21:00",
  timeDisplay: "6:00 PM – 9:00 PM",

  hostName: "Akshat",

  venue: {
    name: "Solaris Hotel & Club",
    address: "Near, Jay Nagar, Rajiv Gandhi Cir, Indore, Madhya Pradesh 452001",
    mapQuery: "Solaris Hotel & Club, Jay Nagar, Indore",
    mapLink: "https://maps.app.goo.gl/FBGLfBcyUuNFBH666",
  },

  // Default label for unconfirmed values across cards and chips
  tbaLabel: "Coming soon",

  // WhatsApp number in international format, digits only (no '+' or spaces)
  whatsappNumber: "917974644795",

  rsvpIntro: "Confirm your spot with Akshat on WhatsApp, it takes 10 seconds.",

  // {noteLine} = "Message: <note>" when a note is entered, or "" when empty
  rsvpMessageTemplate:
    "Hi Akshat! 🎉 RSVP for Angad's 14th birthday party (11 Nov, Solaris Hotel & Club).\n\nName: {name}\nStatus: {status}\nGuests: {guests}\n{noteLine}",

  contactMessageTemplate:
    "Hi Akshat! I have a question about Angad's 14th birthday party on 11 Nov.",

  rsvpStatuses: [
    { value: "attending",  label: "I'm in! 🎉" },
    { value: "maybe",      label: "Maybe 🤔" },
    { value: "declined",   label: "Can't make it 😢" },
  ],

  // Schedule timeline — exactly three confirmed items. Descriptions are optional.
  schedule: [
    {
      id: "arrival",
      time: "6:00 – 6:30 PM",
      title: "Arrival",
      emoji: "🔥",
      description: null,
    },
    {
      id: "food",
      time: "7:00 PM",
      title: "Food",
      emoji: "🍕",
      description: null,
    },
    {
      id: "cake",
      time: "8:00 – 8:15 PM",
      title: "Cake Cutting",
      emoji: "🎂",
      description: null,
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

  // Face images used in the memory match game (4 custom emoji face cards)
  faces: [
    { src: "/faces/face-1.png", label: "Pink Emoji Face" },
    { src: "/faces/face-2.png", label: "Violet Emoji Face" },
    { src: "/faces/face-3.png", label: "Mint Emoji Face" },
    { src: "/faces/face-4.png", label: "Sunset Emoji Face" },
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
