# Implementation Plan - RX ULTIMATE

Building a comprehensive sports, AI, and utility portal with a modern dark theme (ESPN/The Athletic style).

## Scope Summary
- **Target Name:** RX ULTIMATE
- **Pages (6):** Dashboard, Football, AI Hub, Downloader, Tools, Sports.
- **Tech Stack:** HTML, CSS (Grid/Flexbox), Vanilla JS (Fetch API).
- **Design:** Dark theme (#0a0a0a), Cyan accents (#00e5ff), Inter font, responsive.
- **Data Source:** GiftedTech API (giftedtech.co.ke).

## Affected Areas
- **Styling:** `css/style.css` (global styles, theme, components).
- **Configuration:** `js/config.js` (API keys, base URL).
- **Logic:** `js/main.js` (Fetch logic, DOM manipulation, routing/navigation).
- **Content:** 6 HTML files in the root directory.

## Assumptions & Risks
- **API Key:** `gifted` is assumed valid for all endpoints.
- **External Dependencies:** Font (Inter), potentially Icons (FontAwesome/Lucide via CDN), QR code library (optional or API based).
- **CORS:** Assuming the `giftedtech.co.ke` API allows client-side fetching from the sandbox environment.

## Phase 1: Foundation & Shared Assets (quick_fix_engineer)
- Create `js/config.js` with `BASE_URL` and `API_KEY`.
- Create `css/style.css` with CSS Variables, Dark Theme reset, and shared Layout (Navbar, Footer).
- Create basic `index.html` structure to verify styles.
- **Deliverable:** Global styles and configuration.

## Phase 2: Page Implementation - Part 1 (frontend_engineer)
- **index.html:** Hero section, featured cards for each section (Football, AI, etc.).
- **football.html:** 
    - Tabs for Live/Results/Standings/News.
    - Integration with `/football/*` endpoints.
    - Search functionality for teams/players.
- **Deliverable:** Working Homepage and Football page.

## Phase 3: Page Implementation - Part 2 (frontend_engineer)
- **ai.html:**
    - Chat interfaces for GPT-4o and Gemini.
    - Image/Song generator forms with download links.
- **download.html:**
    - Multi-platform downloader UI.
    - Platform-specific options (e.g., YouTube quality buttons).
- **Deliverable:** AI Hub and Downloader functionality.

## Phase 4: Page Implementation - Part 3 (frontend_engineer)
- **tools.html:**
    - QR Generator, Fancy Text, and URL Shortener.
- **sports.html:**
    - Basketball livescores and streaming match lists.
- **Deliverable:** Tools and Sports pages.

## Phase 5: Polish & Refinement (quick_fix_engineer)
- Ensure active states in the Navbar work across all pages.
- Add Loading Spinners to all fetch operations.
- Error handling (alert or UI message) for failed API calls.
- Responsive check on all 6 pages.
- **Deliverable:** Fully functional, polished site.

## Final Review
- Verify all 6 files are complete and independent as requested.
- Ensure "RX ULTIMATE" branding is consistent.
