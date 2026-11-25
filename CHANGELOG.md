# Changelog — Acharya N Co Homepage Conversion

Converted the static Mintlify homepage snapshot in place into the **Acharya N Co** precision mechanical engineering design studio homepage, using `ACHARYA_N_CO_CONTEXT_AND_MEMORY.md` as the single source of truth.

## Kept
- **Design System & Compiled Tailwind v4 Stylesheets:** Retained `www-mintlify-com/_next/static/chunks/*.css` unmodified and preserved the 4/12/24-column `.grid-layout`, hairline border cadence (`--color-border-line`), light/dark CSS variables (`--color-background-main`, `--color-text-main`, `--color-brand`), and section rhythm.
- **Local Font Assets:** Retained all font files in `www-mintlify-com/_next/static/media/` (`InterVariable`, `PaperMono`, `GeistMono`, `GeistPixel_*`, and `ABCArizonaFlare_Regular` via a swappable `--font-arizona` CSS variable in `acharya/site.css`).
- **Layout & Component Patterns:** Preserved sticky desktop/mobile headers, hero split stage, 4-column chip grid + marquee ticker, multi-span discipline cards, horizontal featured case carousel, stat benchmark band, archive 3-up carousel, principle highlight cards, 3-column deliverables grid, masked CTA band, FAQ accordion, and multi-column footer with 3-way theme switcher.

## Replaced & Added
- **Step 0 De-hydration & Cleanup:**
  - Extracted the original `SectionDots` React component chunks (`2adcddaeef8be74c.js` and `c890e77b4bfc30d6.js`) from `www-mintlify-com.zip` into `acharya/reference/` for reference.
  - Removed all 187 original `<script>` tags (`__next_f` payloads, chunk loaders, and analytics/consent scripts), `<style id="c15t-theme">`, `c15t-dark` classes, `adsct` pixels, `<mintlify-assistant>`, `<next-route-announcer>`, and hidden `vector.co` iframe from `index.html`.
  - Deleted all `.js` files in `www-mintlify-com/_next/static/chunks/` and all 22 third-party vendor directories.
- **Hero & Footer Motion Engine (`acharya/dither.js`, `acharya/hero-anim.js`, `acharya/footer-anim.js`):**
  - `acharya/dither.js`: Plain Canvas 2D re-implementation of `SectionDots` (14 px pitch, 2×2 px device-pixel-snapped dots, 2-octave value noise, edge feathering, resting/lit colors and left-to-right gradient, 2200–6000 ms shimmer, 16 ms / 60-pt / 600 ms / 42 px hover trail, 1.4 ms/px / 160 ms click radial pulse, occluder rect skipping, `IntersectionObserver` + `document.hidden` lifecycle, `MutationObserver` theme sync, and `prefers-reduced-motion` static frame).
  - `acharya/hero-anim.js`: Hero dither canvas (`scale: 110`, `threshold: 0.54`, occluding `#hero-badge`, `#hero-h1`, `#hero-subhead`, `#hero-cta-row`), `±0.005 mm` rolling digit odometer (`700ms cubic-bezier(.22,1,.36,1)`, `80ms` stagger, hover re-roll, `sr-only` `"plus or minus 0.005 millimetres"`), non-blocking entrance choreography (`12px -> 0`, `700ms`, `80ms` stagger via WAAPI), and timed inline Split Plummer Block orthographic SVG self-draw (`1.2s` outlines → `0.6s` dash-dot centerlines → `0.8s` dimensions → `0.6s` GD&T frames/values → `4s` datum breathing pulse).
  - `acharya/footer-anim.js`: Symmetric mirrored dither canvas (`scale: 70`, `threshold: 0.62`, central link-band clearing with `72px` smoothstep ramp, `600ms` scroll fade-in), live `"Hyderabad · HH:MM IST"` (`Asia/Kolkata`) clock updated every minute beside the `animate-signal-ping` / `animate-signal-flicker` pulsing dot, and 200 ms left-to-right sliding brand underline on footer links.
- **Interactive Page Runtime & Audit:**
  - `acharya/DESIGN_AUDIT.md`, `acharya/site.css`, `acharya/site.js` (loaded via `defer` scripts alongside `dither.js`, `hero-anim.js`, `footer-anim.js`): Theme switcher (`localStorage`, default `dark`), marquee & counters, carousels, principles Pause button, ARIA FAQ accordion, mobile nav drawer, and accessible Project Detail Modal (`#project-01`–`#project-09`).
- **Content, Links & Media Mapping:**
  - Rewrote `<head>` metadata (`title`, `description`, `og:*`, `twitter:*`, `canonical`), replaced favicon with `acharya/img/favicon.svg`, generated local `acharya/img/og.png` (1200×630), removed `slack-app-id`, and added `ProfessionalService` JSON-LD for Hyderabad, India.
  - Replaced all 82 Mintlify links with `#anchors`, `https://wa.me/919160512832`, and `mailto:kacharya1903@gmail.com`.
  - Mapped real CAD screenshots (`assets/aplabsworkproof/*.png` — all 18 captures rendered directly in Featured Projects, Archive cards, and the clickable Section 6 Workproof Archive grid, plus multi-view modal thumbnails) and MP4 videos (`assets/watch.mp4`, `assets/Batman blade.mp4`, `assets/Home design.mp4`) into Featured Projects, Archive cards, and Project Detail Modals while keeping all original `assets/` files untouched on disk; retained `acharya/img/deliverable-*.svg` in Section 8.
- **Navbar Glassmorphism & Oversized Footer Watermark (`acharya/site.css`, `index.html`):**
  - Applied translucent frosted glassmorphism (`acharya-glass-nav`: `backdrop-filter: blur(16px) saturate(160%)` with light/dark translucent fills) to both sticky desktop and mobile headers.
  - Added a Mobbin-style full-width bottom-cropped oversized `"ACHARYA N CO"` watermark (`acharya-footer-watermark` / `acharya-footer-watermark-text`) inside `<footer>` below the copyright row.

## Deviations from Reference Parameters
- **DPR Capping & Rect Caching (`acharya/dither.js`):** Capped `devicePixelRatio` at `2` (reference `SectionDots` used raw `window.devicePixelRatio || 1`) and cached occluder/band bounding rects on resize rather than calling `getBoundingClientRect()` on every animation frame, eliminating per-frame layout thrash.
- **Classic `defer` Scripts:** Wired `acharya/dither.js`, `acharya/hero-anim.js`, `acharya/footer-anim.js`, and `acharya/site.js` with `<script defer>` in `index.html` for guaranteed execution order and local `file://` compatibility.
- **Hero Light-Theme Glow & Inline SVG:** Kept the exact `aspect-[1080/656]` frame with CSS-variable-styled inline orthographic SVG of the Split Plummer Block (`Ø50.00 H7`, `M10x1`, `Grade 8.8`, `GG-25 / SAE 660`) so light/dark switching requires zero duplicate SVG assets.

## Marked TODOs
- `TODO(media):` Capture or export dedicated still poster renders for Project 03 (`Batman blade.mp4`) if desired beyond the existing `assets/aplabsworkproof/` screenshots.
- `TODO(badges):` Add official Credly / Dassault Systèmes CSWP and PTC Creo Parametric Advanced Design Specialist verification badge graphics when available.
- `TODO(typography):` Swap `arizonaFlare` in `acharya/site.css` (`--font-display-serif`) for an open-source serif (e.g., Fraunces) before public production release.
- `TODO(qa):` Complete live Chrome DevTools desktop/mobile screenshot verification (hero load, hover/click pulse, theme toggle, footer scroll-in, reduced motion) once Chrome remote debugging (`chrome://inspect/#remote-debugging`) is active.
