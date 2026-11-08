import { eventConfig } from "@/config/event";

/**
 * Generate Google Calendar URL (all-day event if startTime is null, or timed)
 */
export function getGoogleCalendarUrl(): string {
  const title = encodeURIComponent(`${eventConfig.guestOfHonour}'s ${eventConfig.turningAge}th Birthday Bash 🎉`);
  const details = encodeURIComponent(
    `You're invited to ${eventConfig.guestOfHonour}'s ${eventConfig.turningAge}th Birthday Celebration!`
  );
  const location = encodeURIComponent(
    eventConfig.venue.name
      ? `${eventConfig.venue.name}${eventConfig.venue.address ? `, ${eventConfig.venue.address}` : ""}`
      : "To be confirmed"
  );

  // All-day event if startTime is null
  const dates = eventConfig.startTime
    ? "20261111T123000Z/20261111T173000Z"
    : "20261111/20261112";

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

/**
 * Generate and trigger download for .ics calendar file
 * Compatible with iOS Safari, macOS Calendar, Android Chrome, Google Calendar, Outlook.
 */
export function downloadIcsFile(): boolean {
  try {
    let dtStart: string;
    let dtEnd: string;

    if (eventConfig.startTime) {
      dtStart = "DTSTART:20261111T123000Z";
      dtEnd = "DTEND:20261111T173000Z";
    } else {
      // All-day event format (RFC 5545)
      dtStart = "DTSTART;VALUE=DATE:20261111";
      dtEnd = "DTEND;VALUE=DATE:20261112";
    }

    const locationLine = eventConfig.venue.name
      ? `LOCATION:${eventConfig.venue.name}${eventConfig.venue.address ? `, ${eventConfig.venue.address}` : ""}`
      : "LOCATION:To be confirmed";

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Angad 14th Birthday//Invite//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${eventConfig.guestOfHonour}'s ${eventConfig.turningAge}th Birthday Bash 🎉`,
      `DESCRIPTION:You're invited to celebrate ${eventConfig.guestOfHonour}'s ${eventConfig.turningAge}th Birthday!`,
      locationLine,
      dtStart,
      dtEnd,
      "STATUS:CONFIRMED",
      `UID:angad14bday-${Date.now()}@birthday-invite`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "angad-14th-birthday.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch {
    return false;
  }
}

