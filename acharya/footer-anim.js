/**
 * Acharya N Co — Footer Animations
 * 1. Symmetric Dither Canvas (mirrored X, scale 70, threshold 0.62, 72px smoothstep band clear, 600ms scroll fade-in)
 * 2. Live Local Clock: "Hyderabad · HH:MM IST" (Asia/Kolkata) updated every minute
 */
(function () {
  "use strict";

  function initFooterDither() {
    const canvas = document.getElementById("footer-dither-canvas");
    const bandEl = document.getElementById("footer-links-band");
    if (!canvas || !window.AcharyaDither) return;

    window.AcharyaDither.mount(canvas, {
      pitch: 14,
      dotSize: 2,
      feather: 0.2,
      scale: 70,
      threshold: 0.62,
      symmetric: true,
      fullViewport: true,
      bandEl: bandEl,
      fadeInOnView: true
    });
  }

  function initHyderabadClock() {
    const clockEl = document.getElementById("hyderabad-clock");
    if (!clockEl) return;

    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });

    function renderTime() {
      clockEl.textContent = "Hyderabad · " + formatter.format(new Date()) + " IST";
    }

    renderTime();

    // Align next tick to top of the minute, then update every 60s
    const msToNextMinute = (60 - new Date().getSeconds()) * 1000;
    setTimeout(() => {
      renderTime();
      setInterval(renderTime, 60000);
    }, msToNextMinute);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initFooterDither();
    initHyderabadClock();
  });
})();
