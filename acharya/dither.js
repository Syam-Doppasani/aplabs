/**
 * Acharya N Co — SectionDots Dither Canvas Engine (Plain JS, Framework-Free)
 * Re-implemented from reference SectionDots (2adcddaeef8be74c.js).
 */
(function (global) {
  "use strict";

  const MIN_FLIP_MS = 2200;
  const MAX_FLIP_MS = 6000;
  const HOVER_RADIUS_PX = 42;
  const HOVER_TRAIL_TTL_MS = 600;
  const HOVER_TRAIL_SAMPLE_MS = 16;
  const HOVER_TRAIL_MAX_POINTS = 60;
  const PULSE_TRAVEL_MS_PER_PIXEL = 1.4;
  const PULSE_DURATION_MS = 160;
  const MAX_PULSE_WINDOWS = 8;

  const RESTING_LIGHT = [0, 0, 0];
  const RESTING_DARK = [72, 76, 84];
  const GRAD_START_DARK = [24, 226, 153]; // #18e299
  const GRAD_END_DARK = [186, 255, 36];   // #baff24
  const GRAD_START_LIGHT = [12, 140, 94]; // #0c8c5e
  const GRAD_END_LIGHT = [115, 158, 22];  // #739e16

  function isDarkTheme() {
    return document.documentElement.classList.contains("dark");
  }

  function hash2d(ix, iy) {
    let h = Math.imul(ix, 0x165667b1) + Math.imul(iy, 0x27d4eb2f);
    h = Math.imul(h ^ (h >>> 13), 0x4bf19f61);
    return ((h ^ (h >>> 16)) >>> 0) / 0xffffffff;
  }

  function smoothstep(t) {
    return t * t * (3 - 2 * t);
  }

  function clamp01(v) {
    return v < 0 ? 0 : v > 1 ? 1 : v;
  }

  function valueNoise(x, y) {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = smoothstep(x - ix);
    const fy = smoothstep(y - iy);
    const n00 = hash2d(ix, iy);
    const n10 = hash2d(ix + 1, iy);
    const n01 = hash2d(ix, iy + 1);
    const n11 = hash2d(ix + 1, iy + 1);
    const nx0 = n00 + (n10 - n00) * fx;
    const nx1 = n01 + (n11 - n01) * fx;
    return nx0 + (nx1 - nx0) * fy;
  }

  /**
   * Mounts a dither dot field on a <canvas> element.
   * @param {HTMLCanvasElement} canvas
   * @param {Object} options
   */
  function mountDither(canvas, options) {
    if (!canvas || !canvas.parentElement) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const opts = Object.assign(
      {
        pitch: 14,
        dotSize: 2,
        feather: 0.2,
        scale: 110,
        threshold: 0.54,
        symmetric: false,
        fullViewport: false,
        bandEl: null,
        occluders: [],
        fadeInOnView: false
      },
      options || {}
    );

    const parent = canvas.parentElement;
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = mqReduced.matches;
    let dark = isDarkTheme();

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots = [];
    let trail = [];
    let lastTrailSample = 0;
    let rafId = 0;
    let isVisible = false;
    let hasRevealed = false;

    // Cached geometry (updated ONLY on resize, zero DOM reads inside rAF)
    let bandLeft = 0;
    let bandRight = 0;
    let occluderRects = [];
    let canvasViewportLeft = 0;
    let canvasViewportTop = 0;

    function updateCachedRects() {
      const cRect = canvas.getBoundingClientRect();
      canvasViewportLeft = cRect.left;
      canvasViewportTop = cRect.top;

      if (opts.symmetric && opts.bandEl) {
        const bRect = opts.bandEl.getBoundingClientRect();
        bandLeft = bRect.left - cRect.left;
        bandRight = bRect.right - cRect.left;
      } else {
        bandLeft = 0;
        bandRight = width;
      }

      if (opts.occluders && opts.occluders.length) {
        occluderRects = [];
        for (let i = 0; i < opts.occluders.length; i++) {
          const el = opts.occluders[i];
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.width <= 0 || r.height <= 0) continue;
          occluderRects.push({
            left: r.left - cRect.left - 8,
            right: r.right - cRect.left + 8,
            top: r.top - cRect.top - 6,
            bottom: r.bottom - cRect.top + 6
          });
        }
      } else {
        occluderRects = [];
      }
    }

    function isOccluded(x, y) {
      for (let i = 0; i < occluderRects.length; i++) {
        const r = occluderRects[i];
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
          return true;
        }
      }
      return false;
    }

    function verticalEdgeAlpha(y) {
      const f = Math.min(opts.feather * window.innerHeight, height / 2);
      if (f <= 0) return 1;
      return clamp01(Math.min(y / f, (height - y) / f));
    }

    function horizontalEdgeAlpha(x) {
      if (opts.symmetric) {
        const center = (bandLeft + bandRight) / 2;
        const edgeDist = Math.min(
          x < center ? x : width - x,
          x < bandLeft ? bandLeft - x : x - bandRight
        );
        return smoothstep(clamp01(edgeDist / 72));
      }
      const f = Math.min(opts.feather * window.innerWidth, width / 2);
      if (f <= 0) return 1;
      return clamp01(Math.min(x / f, (width - x) / f));
    }

    function gradientColor(x) {
      const t = clamp01(width > 0 ? x / width : 0);
      const start = dark ? GRAD_START_DARK : GRAD_START_LIGHT;
      const end = dark ? GRAD_END_DARK : GRAD_END_LIGHT;
      return [
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
        start[2] + (end[2] - start[2]) * t
      ];
    }

    function buildDots(now) {
      const nextDots = [];
      const pitch = opts.pitch;
      const half = pitch / 2;
      const scale = opts.scale;
      const threshold = opts.threshold;
      const halfDot = opts.dotSize / 2;

      for (let x = half; x < width; x += pitch) {
        for (let y = half; y < height; y += pitch) {
          if (opts.symmetric && x >= bandLeft && x <= bandRight) {
            continue;
          }
          if (isOccluded(x, y)) {
            continue;
          }

          const nx = (opts.symmetric ? Math.min(x, width - x) : x) / scale;
          const ny = y / scale;
          const field =
            0.65 * valueNoise(nx, ny) +
            0.35 * valueNoise(2.3 * nx + 11.7, 2.3 * ny + 5.1);

          if (field < threshold) continue;

          const edgeAlpha = verticalEdgeAlpha(y) * horizontalEdgeAlpha(x);
          if (edgeAlpha <= 0.005) continue;

          nextDots.push({
            x: x,
            y: y,
            px: Math.round((x - halfDot) * dpr) / dpr,
            py: Math.round((y - halfDot) * dpr) / dpr,
            edgeAlpha: edgeAlpha,
            isLit: Math.random() < 0.1,
            nextFlipAt: now + Math.random() * MAX_FLIP_MS,
            pulseWindows: []
          });
        }
      }
      dots = nextDots;
    }

    function resize() {
      const pRect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (opts.fullViewport) {
        width = window.innerWidth;
        height = parent.clientHeight;
        canvas.style.left = -pRect.left + "px";
        canvas.style.top = "0px";
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
      } else {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
      }

      if (width <= 0 || height <= 0) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      updateCachedRects();
      const now = performance.now();
      buildDots(now);
      draw(now);
    }

    function draw(now) {
      if (width <= 0 || height <= 0) return;
      ctx.clearRect(0, 0, width, height);

      // Prune expired hover trail points
      if (trail.length) {
        let write = 0;
        for (let i = 0; i < trail.length; i++) {
          if (now - trail[i].time <= HOVER_TRAIL_TTL_MS) {
            trail[write++] = trail[i];
          }
        }
        trail.length = write;
      }

      const baseRgb = dark ? RESTING_DARK : RESTING_LIGHT;
      const baseAlpha = dark ? 0.9 : 0.12;
      const baseColorStr = "rgb(" + baseRgb[0] + "," + baseRgb[1] + "," + baseRgb[2] + ")";
      const dotPx = Math.max(1 / dpr, Math.round(opts.dotSize * dpr) / dpr);
      const hasTrail = !reducedMotion && trail.length > 0;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        let isPulsing = false;
        if (!reducedMotion && dot.pulseWindows.length) {
          for (let p = 0; p < dot.pulseWindows.length; p++) {
            const win = dot.pulseWindows[p];
            if (now >= win.startAt && now <= win.endAt) {
              isPulsing = true;
              break;
            }
          }
        }

        let hoverStrength = 0;
        if (hasTrail) {
          for (let t = 0; t < trail.length; t++) {
            const pt = trail[t];
            const dist = Math.hypot(dot.x - pt.x, dot.y - pt.y);
            if (dist < HOVER_RADIUS_PX) {
              const s = smoothstep(1 - dist / HOVER_RADIUS_PX);
              if (s > hoverStrength) hoverStrength = s;
            }
          }
        }

        const c = Math.max(dot.isLit ? 1 : 0, isPulsing ? 1 : 0, hoverStrength);
        if (c <= 0) {
          ctx.fillStyle = baseColorStr;
          ctx.globalAlpha = baseAlpha * dot.edgeAlpha;
          ctx.fillRect(dot.px, dot.py, dotPx, dotPx);
        } else {
          const grad = gradientColor(dot.x);
          const r = Math.round(baseRgb[0] + (grad[0] - baseRgb[0]) * c);
          const g = Math.round(baseRgb[1] + (grad[1] - baseRgb[1]) * c);
          const b = Math.round(baseRgb[2] + (grad[2] - baseRgb[2]) * c);
          ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
          ctx.globalAlpha = (baseAlpha + (0.85 - baseAlpha) * c) * dot.edgeAlpha;
          ctx.fillRect(dot.px, dot.py, dotPx, dotPx);
        }
      }

      ctx.globalAlpha = 1;
    }

    function step(now) {
      if (document.hidden || !isVisible || reducedMotion) {
        rafId = 0;
        return;
      }

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        if (dot.pulseWindows.length) {
          let w = 0;
          for (let p = 0; p < dot.pulseWindows.length; p++) {
            if (dot.pulseWindows[p].endAt >= now) {
              dot.pulseWindows[w++] = dot.pulseWindows[p];
            }
          }
          dot.pulseWindows.length = w;
        }
        if (now >= dot.nextFlipAt) {
          dot.isLit = Math.random() < 0.1;
          dot.nextFlipAt = now + MIN_FLIP_MS + Math.random() * (MAX_FLIP_MS - MIN_FLIP_MS);
        }
      }

      draw(now);
      rafId = requestAnimationFrame(step);
    }

    function startLoop() {
      if (rafId || reducedMotion || !isVisible || document.hidden) return;
      rafId = requestAnimationFrame(step);
    }

    function stopLoop() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    function toCanvasCoords(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function onPointerMove(e) {
      if (reducedMotion || !isVisible || document.hidden) return;
      const now = performance.now();
      const pt = toCanvasCoords(e.clientX, e.clientY);
      if (
        pt.x < -HOVER_RADIUS_PX ||
        pt.x > width + HOVER_RADIUS_PX ||
        pt.y < -HOVER_RADIUS_PX ||
        pt.y > height + HOVER_RADIUS_PX
      ) {
        return;
      }

      if (now - lastTrailSample >= HOVER_TRAIL_SAMPLE_MS || trail.length === 0) {
        trail.push({ x: pt.x, y: pt.y, time: now });
        if (trail.length > HOVER_TRAIL_MAX_POINTS) trail.shift();
        lastTrailSample = now;
      } else {
        trail[trail.length - 1] = { x: pt.x, y: pt.y, time: now };
      }
    }

    function onClick(e) {
      if (reducedMotion || !isVisible || document.hidden) return;
      if (
        e.target instanceof Element &&
        e.target.closest('a, button, input, select, textarea, label, [role="button"], [role="link"]')
      ) {
        return;
      }

      const pt = toCanvasCoords(e.clientX, e.clientY);
      if (pt.x < 0 || pt.x > width || pt.y < 0 || pt.y > height) return;
      if (opts.symmetric && pt.x >= bandLeft && pt.x <= bandRight) return;

      const now = performance.now();
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dist = Math.hypot(dot.x - pt.x, dot.y - pt.y);
        const startAt = now + dist * PULSE_TRAVEL_MS_PER_PIXEL;
        dot.pulseWindows.push({ startAt: startAt, endAt: startAt + PULSE_DURATION_MS });
        if (dot.pulseWindows.length > MAX_PULSE_WINDOWS) {
          dot.pulseWindows.shift();
        }
      }
    }

    function onVisibilityChange() {
      if (document.hidden) {
        stopLoop();
      } else if (isVisible && !reducedMotion) {
        startLoop();
      }
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(parent);

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = Boolean(entry && entry.isIntersecting);
        if (isVisible) {
          if (opts.fadeInOnView && !hasRevealed) {
            hasRevealed = true;
            canvas.classList.add("is-visible");
          }
          startLoop();
        } else {
          stopLoop();
        }
      },
      { rootMargin: "20% 0px" }
    );
    io.observe(canvas);

    const mo = new MutationObserver(() => {
      dark = isDarkTheme();
      draw(performance.now());
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    function onReducedChange(e) {
      reducedMotion = e.matches;
      if (reducedMotion) {
        stopLoop();
        trail = [];
        draw(performance.now());
      } else if (isVisible) {
        startLoop();
      }
    }

    if (mqReduced.addEventListener) {
      mqReduced.addEventListener("change", onReducedChange);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("click", onClick);
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    resize();
    if (opts.fadeInOnView && reducedMotion) {
      canvas.classList.add("is-visible");
    }

    return {
      destroy: function () {
        stopLoop();
        ro.disconnect();
        io.disconnect();
        mo.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("click", onClick);
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVisibilityChange);
      }
    };
  }

  global.AcharyaDither = { mount: mountDither };
})(window);
