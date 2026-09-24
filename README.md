# Eman & Osama's Wedding Tale

Build a luxury, mobile-first digital wedding invitation website (single page) for "Osama & Eman".

IMPORTANT: Do NOT use any photos of people or real photos at all. Use only illustrations, SVG ornaments, textures, gradients and typography.

Language: English only (LTR). Style: romantic, vintage-luxury — olive green (#7A8450), ivory/cream (#F3EEE3), warm taupe (#6E655C), antique gold (#B8964E), deep dark green-black (#141712) backgrounds. Decorative motifs: hand-drawn/SVG white calla lilies, hydrangea clusters, lace borders, gold line ornaments. Fonts: "Great Vibes" or "Pinyon Script" for script names and headings, "Cormorant Garamond" for body and serif text.

EXPERIENCE FLOW (in this exact order):

1) INTRO / ENVELOPE SCREEN (full screen)

- Dark elegant background with a subtle paper-grain texture and faint illustrated calla lilies in the corners.

- Title in script: "Osama & Eman".

- An ivory envelope drawn with CSS/SVG: lace-edged flap and a pearl (or gold wax) seal in the center.

- "Tap to Open" text under it with a soft pulsing glow.

- On tap: the flap opens in 3D, the envelope slides down, the background music starts (fade-in), and the page reveals the next section. Music must only start after this tap (browser autoplay rules).

2) HERO — OPENED ENVELOPE

- Olive-green background with illustrated calla lilies around the edges.

- The opened envelope with a folded ivory letter rising out of it showing "Osama & Eman" in script.

- A scalloped olive badge with a gold monogram "O.E".

- A spinning black vinyl record (CSS/SVG) with curved text "TAP THE RECORD TO PLAY" and a play/pause button in the middle. The record spins while music plays.

- A small floating music toggle button fixed in the corner for the whole page.

3) INVITATION CARD (the most important section)

- A taupe card with an ornate ivory lace border (SVG lace frame), centered on a dark background.

- Content (centered):

  "In the name of Allah, the Most Gracious, the Most Merciful"

  "And among His signs is that He created for you spouses from among yourselves, that you may find tranquility in them; and He placed between you affection and mercy." — Quran 30:21

  Together with their families

  We are honored to invite you to celebrate the wedding of

  Osama & Eman   (large, elegant script)

  decorative divider

  Thursday, October 8, 2026

  Royal Villa Hall

  Beginning of Kafr Saqr Road, El Senbellawein — opposite the Rice Mill

  8:00 PM

  (Use thin line icons for date, location and time — no emojis.)

- The card fades/slides in on scroll.

4) COUNTDOWN

- Elegant countdown to Thursday, October 8, 2026, 8:00 PM (Africa/Cairo): Days / Hours / Minutes / Seconds in gold numbers on ivory cards. After the date passes, show "Just Married ♥".

- "Add to Calendar" button (Google Calendar link + downloadable .ics).

5) DETAILS — VERTICAL TIMELINE

- Big serif heading "Details" over a dark background with illustrated florals.

- Vertical line with dots, each row with a thin white line-art icon:

  Date — 08.10.26 (calendar icon)

  Location — Royal Villa Hall (building icon)

  Time — 8 PM (bride & groom line-art icon)

- Items animate in one by one on scroll.

6) VENUE / LOCATION

- Olive card with the title "Royal Villa Hall".

- Instead of a photo: an illustrated line-art drawing of an elegant villa/hall inside a gold frame.

- Address: Beginning of Kafr Saqr Road, El Senbellawein — opposite the Rice Mill.

- An embedded Google Map + a big "Open Location" button linking to Google Maps (I will paste the exact link).

7) CONFIRM ATTENDANCE + SHARE YOUR WISHES

- An ivory rounded frame section decorated with illustrated florals and two buttons:

  • a beige pill-shaped "Confirm Attendance" button with a small gold bird

  • a round gold "Share Your Wishes" button

- Confirm Attendance opens a page/modal: Name (required), radio "Yes, I will attend" / "No, I cannot attend", optional number of guests, Submit. Below it: "Attendance Responses" with a counter badge and a scrollable grid of cards (name + "Attending ✓" / "Not attending"). Include a "← Back to Invitation" button.

- Share Your Wishes: Name + message → a wall of wish cards (newest first) with a subtle animation.

- Store RSVPs and wishes in a real database (Lovable Cloud / Supabase) so everyone sees them live. Basic spam protection (trim, length limits, one submission per device via localStorage).

8) FOOTER

- Monogram "O.E", "We can't wait to celebrate with you", date 08.10.2026.

EXTRA POLISH:

- Smooth scroll animations (Framer Motion): fade-up, gentle parallax on the floral ornaments, subtle falling petals/gold sparkles.

- Perfect on mobile (guests will open it from WhatsApp): fast load, no horizontal scroll.

- Open Graph meta tags with a designed preview image (monogram + names, no photos) and text "Osama & Eman's Wedding — October 8, 2026".

- Music: loop the song, remember mute state, pause when the tab is hidden.

- Keep all content (names, date, venue, map link, song) in one config file for easy editing.

Music: use the audio file I upload (the song 
Bruno Mars - Marry You (Official Lyric Video) as the background music.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://golden-bouquet-invites.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c331dc56-ce28-4410-a829-bf418d7d7784).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
