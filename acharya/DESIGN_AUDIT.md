# Design Audit — Mintlify Snapshot → Acharya N Co

Generated from the de-hydrated static DOM (`index.html`, 4,165 lines) and compiled Tailwind v4 stylesheet (`www-mintlify-com/_next/static/chunks/35f87f81c1d613ab.css`, `ffb618b66f291fd3.css`, `ef29aa2a22faebc4.css`).

## 1. Grid System & Layout Architecture
- **Core Grid Class:** `.grid-layout` and `.grid-layout-inner`
  - `display: grid`
  - `max-width: var(--grid-max-width)` (`1088px`)
  - `column-gap: var(--grid-gap)` (`16px`)
  - Mobile (`< sm`): `--grid-columns: 4`, `--grid-margin: 16px`
  - Tablet (`md+`): `--grid-columns: 12`
  - Desktop (`lg+`): `--grid-columns: 24`, `--grid-margin: 32px`
- **Carousel Gutter:** `--carousel-gutter: max(calc((100vw - var(--grid-max-width)) / 2), var(--grid-margin))`
- **Vertical Rail Markers:** Sections use `data-rail="all"` / `data-rail="lg"` / `data-line="bleed"` and a `2px × 24px` vertical brand accent bar (`bg-brand-base`) aligned to the left rail of section headers.

## 2. Color & Theme Tokens
Theme state is controlled via `class="dark"` and `style="color-scheme: dark;"` on `<html>` (default `dark`).

| Token | Light Mode (`:root`) | Dark Mode (`.dark`) |
|---|---|---|
| `--color-background-main` | `#ffffff` | `#08090a` |
| `--color-background-invert` | `#08090a` | `#ffffff` |
| `--color-text-main` | `#08090a` | `#ffffff` |
| `--color-text-invert` | `#ffffff` | `#08090a` |
| `--color-text-sub` | `rgba(8, 9, 10, 0.6)` | `rgba(255, 255, 255, 0.6)` |
| `--color-text-soft` | `rgba(8, 9, 10, 0.8)` | `rgba(255, 255, 255, 0.7)` |
| `--color-border-line` | `#f1f0ee` | `#1e1f21` |
| `--color-border-sub` | `rgba(8, 9, 10, 0.07)` | `rgba(255, 255, 255, 0.07)` |
| `--color-brand` | `#0c8c5e` | `#18e299` |
| `--color-background-soft` | `rgba(8, 9, 10, 0.03)` | `rgba(255, 255, 255, 0.05)` |

## 3. Typography Scale
- **Display Serif (`.font-serif`):** `var(--font-arizona), serif` (ABC Arizona Flare for prototyping; `--font-arizona` overridden in `acharya/site.css` so an open serif such as Fraunces can be swapped without markup edits).
  - Hero `<h1>`: `2.5rem / 2.75rem` mobile (`tracking-[-0.8px]`), `3.125rem / 3.25rem` (`50px / 52px`) desktop (`tracking-[-2px]`).
  - CTA Band `<h2>`: `1.75rem / 2rem` mobile → `2.25rem / 2.5rem` desktop (`tracking-[-0.02em]`).
- **Body Sans:** `Inter` (`InterVariable`)
  - Section `<h2>`: `1.75rem / 2rem` mobile → `2.25rem / 2.5rem` desktop (`font-medium tracking-[-0.72px]`).
  - Card `<h3>`: `1rem / 1.5rem` (disciplines) or `1.75rem / 2rem` → `35px / 40px` (featured project stories).
  - Body copy: `1rem / 1.5rem` or `1.125rem / 1.5rem` (hero subhead).
- **Monospace Labels & Numbers (`.font-paper`, `.font-mono`):** `Paper Mono` (`ss03`) & `Geist Mono`, `tabular-nums`, `0.75rem / 1rem` (`12px / 16px`), `tracking-[0.02em]`.
- **Decorative Pixel Fonts:** `GeistPixelSquare`, `GeistPixelGrid`, `GeistPixelCircle`, `GeistPixelTriangle`, `GeistPixelLine`.

## 4. Section Order & Card Patterns
1. **Sticky Header (Desktop `lg:block` + Mobile `lg:hidden`):** `h-16`, hairline `border-b border-border-line`, wordmark left, centered nav items, right-side theme toggle + secondary action + primary CTA button (`rounded-[4px]`).
2. **Section 1 — Hero:** Asymmetric `grid-layout` (`col-start-1 col-end-9` text/CTAs, `col-start-10 col-end-25` clipped preview stage `aspect-[1080/656]` with bottom fade gradient). Includes top readout pill badge (`rounded-[2px]`), serif `<h1>`, highlighted-keyword subhead, primary + secondary CTAs, and lightweight technical drawing preview (`dark:hidden` / `dark:block`).
3. **Section 2 — Ecosystem & Verified Metrics:** `border-t border-border-line`. Left 1/3 column with headline + CTA; right 2/3 `grid-cols-2 sm:grid-cols-4` of `rounded-[6px]` cells (`aspect-[163/104]` / `lg:aspect-[160/155]`); followed by continuous horizontal scrolling metrics ticker (`font-paper` pill badges).
4. **Section 3 — Seven Disciplines Grid:** Section header with `2px` brand bar + `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` cards (`rounded-xl border border-border-sub bg-[#f9f6f3] dark:bg-[#0f0f12] p-8`). Card 1 spans `sm:col-span-2`, cards 2–5 span 1 col, card 6 spans `lg:col-span-3`, plus 7th discipline card (`lg:col-span-3` or balanced 3-col span) so all 7 studio disciplines are presented cleanly.
5. **Section 4 — Featured Projects Carousel (4 Case Cards):** Header with prev/next carousel buttons (`rounded-[4px] border border-border-secondary`) + CTA. Horizontal scroll-snap cards (`lg:flex-row lg:aspect-[1056/472] rounded-md overflow-hidden`), left info panel with 2-stat grid (`34px` → `44px` figures), right 49.2% media stage (`object-cover` CAD render / video).
6. **Section 5 — Standards & Precision Benchmarks:** Header + blueprint banner graphic + 3-column (extended to 4-column responsive) `divide-x divide-border-primary border-t border-border-line` stat grid (`2.25rem / 2.5rem` tabular-nums).
7. **Section 6 — Archive Grid Carousel (5 Projects):** Header + prev/next buttons + horizontal 3-up card carousel (`aspect-[350/400] rounded-md`) with light/dark local SVG technical illustrations (`acharya/img/*.svg`), summary copy, and modal trigger.
8. **Section 7 — Engineering Thesis & Principles:** Header + Pause/Resume toggle + 3-column grid of `h-[264px] rounded-[6px] border border-border-primary` principle cards auto-cycling smoothly with `aria-live="polite"` pause support.
9. **Section 8 — Deliverables ("What you receive"):** 3-column grid (`aspect-[341/324] rounded-xl`) showcasing Parametric Source Files, Neutral Exchange Formats, and 2D ASME Y14.5 Drawings + BOM with local SVGs.
10. **Section 9 — Intake CTA Band:** `border-y border-border-line` with masked radial SVG line art, serif `<h2>`, WhatsApp + Email CTAs, and accepted project inputs list.
11. **Section 10 — FAQ Accordion:** `max-w-3xl` vertical list with `border-b border-border-line`, `button[aria-expanded]` triggers, rotating chevron SVG, and expandable answer panels.
12. **Footer:** `grid-layout` with brand wordmark, Hyderabad India status pill (`animate-signal-ping`), 4 navigation columns (`Studio`, `Disciplines`, `Standards`, `Contact`), bottom hairline divider, 3-way theme switcher (`Light` / `Dark` / `System`), and direct contact links.
