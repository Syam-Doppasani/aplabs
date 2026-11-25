/**
 * Acharya N Co — Hero Animations
 * 1. Hero Dither Canvas with H1/subhead/CTA occluders
 * 2. Tolerance Badge Odometer (±0.005 mm, 700ms ease-out-soft, 80ms stagger, hover re-roll)
 * 3. Subtle Entrance Choreography (12px -> 0, 0 -> 1 opacity, 700ms, 80ms stagger, non-blocking)
 * 4. Split Plummer Block Orthographic SVG Self-Draw Sequence (< 3.5s)
 */
(function () {
  "use strict";

  const prefersReduced = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initHeroDither() {
    const canvas = document.getElementById("hero-dither-canvas");
    if (!canvas || !window.AcharyaDither) return;

    const occluders = [
      document.getElementById("hero-badge"),
      document.getElementById("hero-h1"),
      document.getElementById("hero-subhead"),
      document.getElementById("hero-cta-row")
    ].filter(Boolean);

    window.AcharyaDither.mount(canvas, {
      pitch: 14,
      dotSize: 2,
      feather: 0.2,
      scale: 110,
      threshold: 0.54,
      symmetric: false,
      fullViewport: false,
      occluders: occluders
    });
  }

  function initBadgeOdometer() {
    const badge = document.getElementById("hero-badge");
    const reels = Array.from(document.querySelectorAll("[data-tolerance-reel]"));
    if (!badge || !reels.length) return;

    function roll(instant) {
      reels.forEach((reel, idx) => {
        const target = parseInt(reel.dataset.targetDigit || "0", 10);
        if (instant || prefersReduced()) {
          reel.style.transitionDuration = "0ms";
          reel.style.transitionDelay = "0ms";
          reel.style.transform = "translateY(-" + target + "em) translateZ(0)";
          return;
        }

        // Pick a random start digit distinct from target
        let start = Math.floor(Math.random() * 10);
        if (start === target) start = (target + 3) % 10;

        reel.style.transitionDuration = "0ms";
        reel.style.transitionDelay = "0ms";
        reel.style.transform = "translateY(-" + start + "em) translateZ(0)";
        void reel.offsetHeight;

        reel.style.transitionDuration = "700ms";
        reel.style.transitionDelay = idx * 80 + "ms";
        reel.style.transform = "translateY(-" + target + "em) translateZ(0)";
      });
    }

    roll(false);

    let rolling = false;
    badge.addEventListener("mouseenter", () => {
      if (rolling || prefersReduced()) return;
      rolling = true;
      roll(false);
      setTimeout(() => {
        rolling = false;
      }, 1050);
    });
  }

  function initEntranceChoreography() {
    if (prefersReduced()) return;

    const items = [
      document.getElementById("hero-badge"),
      document.getElementById("hero-h1"),
      document.getElementById("hero-subhead"),
      document.getElementById("hero-cta-row"),
      document.getElementById("hero-drawing-wrap")
    ].filter(Boolean);

    items.forEach((el, idx) => {
      if (typeof el.animate !== "function") return;
      el.animate(
        [
          { opacity: 0, transform: "translateY(12px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        {
          duration: 700,
          delay: idx * 80,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "both"
        }
      );
    });
  }

  function initHeroDrawing() {
    const svg = document.getElementById("hero-plummer-svg");
    if (!svg) return;

    const outlines = Array.from(svg.querySelectorAll(".draw-outline"));
    const centerlines = Array.from(svg.querySelectorAll(".draw-centerline"));
    const dimensions = Array.from(svg.querySelectorAll(".draw-dimension"));
    const gdtItems = Array.from(svg.querySelectorAll(".draw-gdt"));
    const datumPulse = svg.querySelector(".draw-datum-pulse");

    function prepareStroke(el) {
      if (typeof el.getTotalLength !== "function") return 120;
      const len = Math.ceil(el.getTotalLength());
      el.style.strokeDasharray = String(len);
      el.style.strokeDashoffset = String(len);
      return len;
    }

    if (prefersReduced()) {
      svg.classList.add("is-drawn-static");
      return;
    }

    // Prepare all stroke paths synchronously before first draw frame
    const outlineLens = outlines.map((el) => ({ el, len: prepareStroke(el) }));
    const centerLens = centerlines.map((el) => ({ el, len: prepareStroke(el) }));
    const dimLens = dimensions.map((el) => ({ el, len: prepareStroke(el) }));
    gdtItems.forEach((el) => {
      el.style.opacity = "0";
    });

    requestAnimationFrame(() => {
      // Phase 1: Outlines (0.0s -> 1.2s)
      outlineLens.forEach(({ el }) => {
        el.style.transition = "stroke-dashoffset 1200ms cubic-bezier(0.22, 1, 0.36, 1) 0ms";
        el.style.strokeDashoffset = "0";
      });

      // Phase 2: Dash-dot centerlines (1.2s -> 1.8s)
      centerLens.forEach(({ el }) => {
        el.style.transition = "stroke-dashoffset 600ms cubic-bezier(0.22, 1, 0.36, 1) 1200ms";
        el.style.strokeDashoffset = "0";
        // Restore dash-dot pattern right after draw finishes
        setTimeout(() => {
          el.style.strokeDasharray = "16 5 3 5";
        }, 1820);
      });

      // Phase 3: Dimension lines & arrowheads (1.8s -> 2.6s)
      dimLens.forEach(({ el }) => {
        el.style.transition = "stroke-dashoffset 800ms cubic-bezier(0.22, 1, 0.36, 1) 1800ms";
        el.style.strokeDashoffset = "0";
      });

      // Phase 4: GD&T frames & values fade in (2.6s -> 3.2s)
      gdtItems.forEach((el) => {
        el.style.transition = "opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) 2600ms";
        el.style.opacity = "1";
      });

      // Phase 5: Datum marker slow 4s breathing pulse (starts at 3.2s)
      if (datumPulse) {
        setTimeout(() => {
          datumPulse.classList.add("is-pulsing");
        }, 3200);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHeroDither();
    initBadgeOdometer();
    initEntranceChoreography();
    initHeroDrawing();
  });
})();
