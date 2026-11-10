import { eventConfig, getAgeOrdinal } from "@/config/event";

/**
 * Generate Google Calendar URL for a timed event in Asia/Kolkata (IST).
 *
 * Event: 2026-11-11 18:00–21:00 IST  = 2026-11-11T12:30:00Z / 2026-11-11T15:30:00Z
 * Title: "Angad's 13th Birthday Party"
 * Location: full venue string
 *
 * Notes on escaping:
 *  - Google Calendar `location` param: commas and semicolons are fine inside encodeURIComponent.
 *  - Dates use compact UTC format: YYYYMMDDTHHMMSSZ / YYYYMMDDTHHMMSSZ
 */
export function getGoogleCalendarUrl(): string {
  const ageOrdinal = getAgeOrdinal(eventConfig.turningAge);
  const title = encodeURIComponent(`${eventConfig.guestOfHonour}'s ${ageOrdinal} Birthday Party`);

  // IST 18:00–21:00 on 2026-11-11 → UTC 12:30–15:30
  const dates = "20261111T123000Z/20261111T153000Z";

  const location = encodeURIComponent(
    "Solaris Hotel & Club, Near Jay Nagar, Rajiv Gandhi Cir, Indore, Madhya Pradesh 452001"
  );

  const details = encodeURIComponent(
    `You're invited to celebrate ${eventConfig.guestOfHonour}'s ${ageOrdinal} Birthday!\n\nDate: Wednesday, 11 November 2026\nTime: 6:00 PM – 9:00 PM (IST)\nVenue: Solaris Hotel & Club, Indore`
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

/**
 * Generate and trigger download for .ics calendar file.
 *
 * Uses TZID=Asia/Kolkata for iOS Safari & Android Chrome compatibility.
 * RFC 5545 §3.6.1 — DTSTART/DTEND with TZID avoids all-day ambiguity.
 *
 * Commas and semicolons in LOCATION/SUMMARY must be escaped with backslash
 * per RFC 5545 §3.3.11 (TEXT escaping).
 */
export function downloadIcsFile(): boolean {
  try {
    const ageOrdinal = getAgeOrdinal(eventConfig.turningAge);
    const escapeIcsText = (s: string) =>
      s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

    const summary  = escapeIcsText(`${eventConfig.guestOfHonour}'s ${ageOrdinal} Birthday Party`);
    const location = escapeIcsText(
      "Solaris Hotel & Club, Near Jay Nagar, Rajiv Gandhi Cir, Indore, Madhya Pradesh 452001"
    );
    const description = escapeIcsText(
      `You're invited to celebrate ${eventConfig.guestOfHonour}'s ${ageOrdinal} Birthday!\nDate: Wednesday\\, 11 November 2026\nTime: 6:00 PM – 9:00 PM (IST)\nVenue: Solaris Hotel & Club\\, Indore`
    );

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      `PRODID:-//Angad ${ageOrdinal} Birthday//Invite//EN`,
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VTIMEZONE",
      "TZID:Asia/Kolkata",
      "BEGIN:STANDARD",
      "TZOFFSETFROM:+0530",
      "TZOFFSETTO:+0530",
      "TZNAME:IST",
      "DTSTART:19700101T000000",
      "END:STANDARD",
      "END:VTIMEZONE",
      "BEGIN:VEVENT",
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "DTSTART;TZID=Asia/Kolkata:20261111T180000",
      "DTEND;TZID=Asia/Kolkata:20261111T210000",
      "STATUS:CONFIRMED",
      `UID:angad${eventConfig.turningAge}bday-${Date.now()}@birthday-invite`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `angad-${ageOrdinal.toLowerCase()}-birthday.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch {
    return false;
  }
}
