export const weddingConfig = {
  couple: { first: "Osama", second: "Eman", display: "Osama & Eman", monogram: "O.E" },
  event: {
    iso: "2026-10-08T20:00:00+03:00",
    dateLong: "Thursday, October 8, 2026",
    dateShort: "08.10.26",
    footerDate: "08.10.2026",
    time: "8:00 PM",
    timeShort: "8 PM",
    timezone: "Africa/Cairo",
  },
  venue: {
    name: "Royal Villa Hall",
    address: "Beginning of Kafr Saqr Road, El Senbellawein — opposite the Rice Mill",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Royal+Villa+Hall+El+Senbellawein",
  },
  music: { src: "", title: "Marry You", artist: "Bruno Mars" },
  calendar: {
    google:
      "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Osama%20%26%20Eman%27s%20Wedding&dates=20261008T170000Z%2F20261008T210000Z&details=Celebrate%20the%20wedding%20of%20Osama%20%26%20Eman&location=Royal%20Villa%20Hall%2C%20Beginning%20of%20Kafr%20Saqr%20Road%2C%20El%20Senbellawein",
  },
} as const;
