/**
 * @file calendar.js
 * @description Generates Google Calendar and ICS calendar links
 * @date Created on: 14.06.2026
 * @author C.Feng
 */

let calendarEventData = null;

/* ==================================================
   EVENT CONFIGURATION
   ================================================== */
/* Load shared event configuration from:
   config/event.json

   Used by:
   - Countdown timer
   - Google Calendar link
   - Apple Calendar (.ics) */
fetch("config/event.json")
    .then((response) => response.json())
    .then((calendarEvent) => {
        calendarEventData = calendarEvent;
        initializeCalendarLinks(calendarEventData);
    });

/* ==================================================
   GOOGLE CALENDAR
   ================================================== */

/* Convert ISO date format to calendar timestamp format */
function toCalendarTimestamp(dateString) {
    return dateString.replace(/[-:]/g, "").replace(".000", "");
}

/* Get localized calendar text based on the selected language */
function getLocalizedValue(value) {
    const currentLanguage = localStorage.getItem("lang") || "en";

    if (value && typeof value === "object") {
        return value[currentLanguage] || value.en || Object.values(value)[0] || "";
    }

    return value || "";
}

function createGoogleCalendarLink(event) {
    const params = new URLSearchParams({
        action: "TEMPLATE",
        text: getLocalizedValue(event.title),
        dates: `${toCalendarTimestamp(event.start)}/${toCalendarTimestamp(event.end)}`,
        details: getLocalizedValue(event.details),
        location: getLocalizedValue(event.location),
        ctz: event.timezone,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/* ==================================================
   ICS CALENDAR
   ================================================== */

function createIcsCalendarLink(event) {
    const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Simone and Chin-I event//EN",
        "BEGIN:VEVENT",
        `SUMMARY:${getLocalizedValue(event.title)}`,
        `DTSTART:${toCalendarTimestamp(event.start)}`,
        `DTEND:${toCalendarTimestamp(event.end)}`,
        `DESCRIPTION:${getLocalizedValue(event.details)}`,
        `LOCATION:${getLocalizedValue(event.location)}`,

        /* Calendar reminder */
        "BEGIN:VALARM",
        `TRIGGER:-PT${event.reminderMinutes}M`,
        "ACTION:DISPLAY",
        "DESCRIPTION:event Reminder",
        "END:VALARM",

        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], {
        type: "text/calendar;charset=utf-8",
    });

    return URL.createObjectURL(blob);
}

/* ==================================================
   INITIALIZATION
   ================================================== */

function initializeCalendarLinks(calendarEvent) {
    const googleCalendarLink = document.getElementById("google-calendar-link");

    if (googleCalendarLink) {
        googleCalendarLink.href = createGoogleCalendarLink(calendarEvent);
    }

    const appleCalendarLink = document.getElementById("apple-calendar-link");

    if (appleCalendarLink) {
        appleCalendarLink.href = createIcsCalendarLink(calendarEvent);
    }
}

/* Refresh calendar links after language changes */
function refreshCalendarLinks() {
    if (calendarEventData) {
        initializeCalendarLinks(calendarEventData);
    }
}
