/**
 * Acharya N Co — Static Interactive Runtime (Vanilla ES Module)
 * Replaces Next.js/React hydration behaviors without external dependencies.
 */

const STORAGE_KEY = "acharya-theme";
const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -------------------------------------------------------------------------- */
/* 1. Theme Management (Light / Dark / System, Default: Dark)                 */
/* -------------------------------------------------------------------------- */

function resolveTheme(mode) {
  if (mode === "system") {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  return mode === "light" ? "light" : "dark";
}

function applyTheme(mode) {
  const root = document.documentElement;
  const effective = resolveTheme(mode);

  if (effective === "dark") {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  } else {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  }

  // Sync footer 3-way radiogroup
  document.querySelectorAll('[role="radiogroup"][aria-label="Theme switcher"] [role="radio"]').forEach((btn) => {
    const label = (btn.getAttribute("aria-label") || "").toLowerCase();
    const active = label === mode;
    btn.setAttribute("aria-checked", String(active));
    btn.classList.toggle("border-brand-base", active);
    btn.classList.toggle("border-transparent", !active);
  });

  // Sync header quick toggle button(s)
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(effective === "dark"));
    btn.setAttribute(
      "aria-label",
      effective === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
    const sun = btn.querySelector("[data-icon-sun]");
    const moon = btn.querySelector("[data-icon-moon]");
    if (sun && moon) {
      sun.hidden = effective !== "dark";
      moon.hidden = effective === "dark";
    }
  });
}

function initTheme() {
  let saved = "dark";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      saved = stored;
    }
  } catch {
    // localStorage unavailable
  }

  applyTheme(saved);

  const setMode = (mode) => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore storage errors
    }
    applyTheme(mode);
  };

  document.querySelectorAll('[role="radiogroup"][aria-label="Theme switcher"] [role="radio"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = (btn.getAttribute("aria-label") || "dark").toLowerCase();
      setMode(mode);
    });
  });

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.contains("dark");
      setMode(isDark ? "light" : "dark");
    });
  });

  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
      try {
        if (localStorage.getItem(STORAGE_KEY) === "system") {
          applyTheme("system");
        }
      } catch {
        // ignore
      }
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 2. Mobile Navigation Drawer                                                */
/* -------------------------------------------------------------------------- */

function initMobileNav() {
  const trigger = document.querySelector("[data-mobile-nav-trigger]");
  const drawer = document.getElementById("mobile-nav-drawer");
  if (!trigger || !drawer) return;

  const setOpen = (open) => {
    trigger.setAttribute("aria-expanded", String(open));
    trigger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    drawer.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  };

  trigger.addEventListener("click", () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !drawer.hidden) {
      setOpen(false);
      trigger.focus();
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 3. Animated Counters & Hero Tolerance Readout                              */
/* -------------------------------------------------------------------------- */

function animateCounter(el) {
  if (el.dataset.counted === "true") return;
  el.dataset.counted = "true";

  const target = parseFloat(el.dataset.target || "0");
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";

  const format = (val) => `${prefix}${val.toFixed(decimals)}${suffix}`;

  if (prefersReducedMotion()) {
    el.textContent = format(target);
    return;
  }

  const duration = 900;
  const start = performance.now();

  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = format(target * eased);
    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = format(target);
    }
  }

  requestAnimationFrame(tick);
}

function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* -------------------------------------------------------------------------- */
/* 4. Carousels (Featured Projects & Archive Grid)                            */
/* -------------------------------------------------------------------------- */

function initCarousels() {
  document.querySelectorAll('[blossom-carousel="true"]').forEach((track) => {
    const id = track.id;
    const prevBtn = document.querySelector(`[blossom-prev][aria-controls="${id}"]`);
    const nextBtn = document.querySelector(`[blossom-next][aria-controls="${id}"]`);
    const pauseBtn = document.querySelector(`[data-carousel-pause="${id}"]`);
    const slides = Array.from(track.querySelectorAll('[data-blossom-slide="true"]'));

    if (!slides.length) return;

    const getStep = () => {
      const first = slides[0];
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "16");
      return first.getBoundingClientRect().width + gap;
    };

    const updateButtons = () => {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth - 4);
      if (prevBtn) prevBtn.disabled = track.scrollLeft <= 4;
      if (nextBtn) nextBtn.disabled = track.scrollLeft >= maxScroll;
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        track.scrollBy({ left: -getStep(), behavior: prefersReducedMotion() ? "auto" : "smooth" });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth - 4);
        if (track.scrollLeft >= maxScroll) {
          track.scrollTo({ left: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
        } else {
          track.scrollBy({ left: getStep(), behavior: prefersReducedMotion() ? "auto" : "smooth" });
        }
      });
    }

    track.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons, { passive: true });
    updateButtons();

    // Optional auto-advance when data-autoplay="true"
    if (track.dataset.autoplay === "true" && !prefersReducedMotion()) {
      let paused = false;
      let timer = setInterval(() => {
        if (paused) return;
        const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth - 4);
        if (track.scrollLeft >= maxScroll) {
          track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          track.scrollBy({ left: getStep(), behavior: "smooth" });
        }
      }, 6500);

      const setPaused = (next) => {
        paused = next;
        if (pauseBtn) {
          pauseBtn.setAttribute("aria-pressed", String(paused));
          pauseBtn.textContent = paused ? "Resume projects" : "Pause projects";
        }
      };

      if (pauseBtn) {
        pauseBtn.addEventListener("click", () => setPaused(!paused));
      }
      track.addEventListener("mouseenter", () => { paused = true; });
      track.addEventListener("mouseleave", () => {
        if (!pauseBtn || pauseBtn.getAttribute("aria-pressed") !== "true") paused = false;
      });
      track.addEventListener("focusin", () => { paused = true; });
      window.addEventListener("beforeunload", () => clearInterval(timer));
    } else if (pauseBtn) {
      pauseBtn.hidden = true;
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 5. Section 7 Principles Highlighter Carousel with Pause Button             */
/* -------------------------------------------------------------------------- */

function initPrinciplesCarousel() {
  const container = document.getElementById("principles-carousel");
  const pauseBtn = document.getElementById("principles-pause-btn");
  if (!container) return;

  const cards = Array.from(container.querySelectorAll("[data-principle-card]"));
  if (!cards.length) return;

  let activeIndex = 0;
  let paused = prefersReducedMotion();

  const renderActive = () => {
    cards.forEach((card, i) => {
      card.dataset.active = String(i === activeIndex);
    });
  };

  renderActive();

  if (pauseBtn) {
    if (prefersReducedMotion()) {
      pauseBtn.textContent = "Auto-cycle paused (reduced motion)";
      pauseBtn.setAttribute("aria-pressed", "true");
    }
    pauseBtn.addEventListener("click", () => {
      paused = !paused;
      pauseBtn.setAttribute("aria-pressed", String(paused));
      pauseBtn.textContent = paused ? "Resume principles" : "Pause principles";
    });
  }

  cards.forEach((card, i) => {
    card.addEventListener("mouseenter", () => {
      activeIndex = i;
      renderActive();
    });
    card.addEventListener("focusin", () => {
      activeIndex = i;
      renderActive();
    });
  });

  if (!prefersReducedMotion()) {
    setInterval(() => {
      if (paused) return;
      activeIndex = (activeIndex + 1) % cards.length;
      renderActive();
    }, 4200);
  }
}

/* -------------------------------------------------------------------------- */
/* 6. FAQ ARIA Accordion                                                      */
/* -------------------------------------------------------------------------- */

function initAccordion() {
  const items = document.querySelectorAll('[data-slot="accordion-item"]');
  items.forEach((item) => {
    const trigger = item.querySelector('[data-slot="accordion-trigger"]');
    const panel = item.querySelector('[data-slot="accordion-content"]');
    if (!trigger || !panel) return;

    trigger.addEventListener("click", () => {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      const next = !expanded;
      trigger.setAttribute("aria-expanded", String(next));
      trigger.dataset.state = next ? "open" : "closed";
      item.dataset.state = next ? "open" : "closed";
      panel.dataset.state = next ? "open" : "closed";
      panel.hidden = !next;
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 7. Accessible Project Detail Modal (#project-01 .. #project-09)            */
/* -------------------------------------------------------------------------- */

const PROJECTS = {
  "project-01": {
    code: "PRJ-01",
    title: "Tactical Modular Firearm Slide & Assembly",
    category: "Mechanical Part Design · Product Design · 3D CAD Modelling",
    cad: "PTC Creo / SolidWorks",
    mediaType: "image",
    mediaSrc: "assets/aplabsworkproof/Screenshot 2026-02-06 145909.png",
    gallery: [
      {
        src: "assets/aplabsworkproof/Screenshot 2026-02-06 145909.png",
        alt: "3D CAD model of the Tactical Modular Firearm Slide showing ventilated ports and slide geometry"
      },
      {
        src: "assets/aplabsworkproof/Screenshot 2026-02-10 155705.png",
        alt: "Side elevation CAD capture of Tactical Modular Firearm Slide with compensator ports and cocking serrations"
      },
      {
        src: "assets/aplabsworkproof/Screenshot 2026-02-10 155724.png",
        alt: "Compact slide and guide-rod CAD assembly render in dark viewport"
      }
    ],
    mediaAlt: "3D CAD model of the Tactical Modular Firearm Slide showing ventilated ports and slide geometry",
    challenge:
      "Machining deep skeletonized lightening pockets and cocking serrations while maintaining cross-sectional structural rigidity around the ejection port under extreme chamber discharge pressures.",
    approach:
      "Parametrically tuned reciprocating slide mass against standard recoil spring rates to optimize cycling velocity, prevent bolt-bounce, and eliminate muzzle flip.",
    specs: [
      ["Machining Method", "5-Axis CNC Milling"],
      ["Critical Tolerance Class", "±0.005 mm internal rail fit"],
      ["Optic Deck", "Precision RMR Footprint with M3.5 threaded holes"],
      ["Surface Treatment", "Diamond-Like Carbon (DLC) / Cerakote Black & Gold"],
      ["Materials", "416R Stainless Steel billet, 7075-T6 Aircraft Grade Aluminum"],
      ["Key Geometry", "30° reverse-incline serrations, 8 compensator ports, Ra 0.4 µm guide rails"]
    ],
    deliverables: "STEP AP242, Parasolid (.x_t), Native Creo/SolidWorks part models"
  },
  "project-02": {
    code: "PRJ-02",
    title: "Precision Luxury Mechanical Watch Assembly",
    category: "Product Design · Assembly Design · Mechanical Part Design",
    cad: "PTC Creo Parametric 12 (Full Feature Tree)",
    mediaType: "video",
    mediaSrc: "assets/watch.mp4",
    posterSrc: "assets/aplabsworkproof/Screenshot 2026-11-19 214926.png",
    mediaAlt: "Creo Parametric 12 simulation of the Ø41 mm luxury mechanical watch assembly with 120-flute bezel",
    challenge:
      "Modeling a 41 mm high-density luxury assembly with micron-level compression gasket grooves, 120 fluted bezel teeth, and moving mechanical hands without triggering feature regeneration errors in Creo.",
    approach:
      "Utilized datum-driven parametric sketches with pattern relations. Modeled the case body, screw-down caseback, bezel, dial, and crystal as discrete mated solid bodies with strict 0.05 mm hand clearance.",
    specs: [
      ["Nominal Case Diameter", "Ø 41.00 mm"],
      ["Lug-to-Lug Distance", "48.50 mm"],
      ["Strap Lug Width", "20.00 mm Standard"],
      ["Water Resistance Rating", "10 ATM (100 m) O-ring gasket retention groove"],
      ["Bezel & Dial", "120-flute radial bezel, royal blue sunburst dial"],
      ["Materials", "316L Surgical Stainless Steel, 18K Gold PVD, Sapphire Crystal"]
    ],
    deliverables: "Creo Assembly (.asm), Creo Parts (.prt), STEP AP242, Parasolid, 60 FPS simulation video"
  },
  "project-03": {
    code: "PRJ-03",
    title: "Aerodynamic Batman Tactical Batarang Blade",
    category: "3D Printer Designs (DFAM) · Product Design · Sheet Metal Design",
    cad: "SolidWorks 2025 SP1.2",
    mediaType: "video",
    mediaSrc: "assets/Batman blade.mp4",
    posterSrc: "acharya/img/archive-batarang-dark.svg",
    mediaAlt: "3D CAD turnaround of the 240 mm aerodynamic Batarang blade with neutral mass centroid",
    challenge:
      "Engineering an aggressive aerofoil shape capable of high-speed gyroscopic spin while remaining 100% printable across FDM/SLA 3D printers without overhang collapse or support scarring on blade edges.",
    approach:
      "Balanced mass centroid precisely at (0, 0, 0) around the central rotational hub. Specified 45° self-supporting transitional chamfers for FDM printability at 0.12 mm layer height, and flat-profile nesting for CNC waterjet cutting.",
    specs: [
      ["Wingspan Length", "240.00 mm Overall"],
      ["Center Core Thickness", "4.50 mm Structural Web"],
      ["Cutting Bevel Angle", "Compound 30° Slicing Bevel"],
      ["Mass Balance", "Neutral Mass Centroid (0, 0)"],
      ["DFAM Chamfers", "45° self-supporting transitions (0.12 mm layer height)"],
      ["Materials", "PLA+, PETG, Carbon Fiber Nylon, Ti-6Al-4V Grade 5, 6061-T6 Aluminum"]
    ],
    deliverables: "High-density STL mesh, STEP AP242, Native SolidWorks part, 60 FPS turnaround video"
  },
  "project-04": {
    code: "PRJ-04",
    title: "Hydraulic Dam Spillway & Barrage Structure",
    category: "Assembly Design · 3D CAD Modelling",
    cad: "SolidWorks Professional Assembly",
    mediaType: "image",
    mediaSrc: "assets/aplabsworkproof/Screenshot 2026-01-28 141106.png",
    mediaAlt: "SolidWorks 8-bay hydraulic dam spillway and gravity barrage assembly with 38 sub-assemblies",
    challenge:
      "Managing a top-level civil-mechanical assembly comprising 38 sub-assemblies and resisting massive calculated hydrostatic pressure gradients across independent sluice bays.",
    approach:
      "Adopted top-down skeletal modeling. Derived the ogee discharge curvature from empirical hydraulic grade lines to ensure laminar discharge and eliminate cavitation pitting.",
    specs: [
      ["Structure Classification", "Gravity Barrage & Crest Spillway (8 Bays)"],
      ["Discharge Curve", "Standard Ogee Curve Profile"],
      ["Flow Regulation", "Hydraulic Radial Sluice Gates with brass guide seals"],
      ["Assembly Scope", "38 Discrete Top-Level Sub-Assemblies"],
      ["Dissipation", "Foundation apron with downstream chute baffle blocks"],
      ["Materials", "Grade 50 Reinforced Concrete, A36 Structural Steel, EPDM Rubber Seals"]
    ],
    deliverables: "STEP AP214, Parasolid, Native SolidWorks Assembly (.sldasm)"
  },
  "project-05": {
    code: "PRJ-05",
    title: "Split Plummer Block Bearing Housing",
    category: "Assembly Design · Mechanical Part Design · 3D CAD Modelling",
    cad: "SolidWorks Mechanical",
    mediaType: "image",
    mediaSrc: "assets/aplabsworkproof/Screenshot 2025-12-16 220939 - Copy.png",
    mediaAlt: "SolidWorks assembly of the Ø50 mm H7 Split Plummer Block bearing housing with bronze journal bushings",
    challenge:
      "Ensuring uniform clamping pressure distribution across split bronze shells without introducing bore ovality or pinch points when torqued under dynamic shaft rotation.",
    approach:
      "Modeled with FEA-verified cast stiffening ribs, precision-ground parting relief recesses, and clearance holes accommodating foundation thermal expansion.",
    specs: [
      ["Shaft Bore", "Ø 50.00 mm H7 Precision Clearance Fit"],
      ["Housing Material", "Class 30 Gray Cast Iron (GG-25)"],
      ["Bushing Material", "SAE 660 Leaded Bearing Bronze"],
      ["Fastener Grade", "Grade 8.8 High-Tensile Metric Cap Screws"],
      ["Lubrication Port", "Central Grease Zerk Port M10x1"],
      ["Mounting", "Elongated foundation bolt slots for shaft alignment"]
    ],
    deliverables: "STEP AP242, Parasolid (.x_t), Native SolidWorks Part"
  },
  "project-06": {
    code: "PRJ-06",
    title: "High-Performance IC Engine Piston Assembly",
    category: "Mechanical Part Design · Product Design · Design Optimization",
    cad: "SolidWorks Aerospace",
    mediaType: "image",
    mediaSrc: "assets/aplabsworkproof/Screenshot 2025-12-16 220842 - Copy.png",
    mediaAlt: "SolidWorks CAD model of Ø84 mm forged IC engine piston with crimson hard anodize and 3-ring pack",
    challenge:
      "Calculating cold-to-hot thermal expansion differentials to maintain tight bore sealing under high cylinder pressures while preventing cold slap or high-RPM piston scuffing.",
    approach:
      "Built with complex lofted revolving cuts. Engineered thick structural crown trusses transitioning into lightweight strutted pin bosses to minimize reciprocating inertia.",
    specs: [
      ["Cylinder Bore", "Ø 84.00 mm Nominal"],
      ["Wrist Pin Diameter", "Ø 22.00 mm (+0.005 / -0.000 mm)"],
      ["Ring Pack Grooves", "1.2 mm compression, 1.5 mm scraper, 2.8 mm oil control"],
      ["Alloy Selection", "Forged 2618-T6 High-Silicon Aluminum Alloy"],
      ["Pin Material", "Case-Hardened 9310 Alloy Steel"],
      ["Surface Coating", "Crimson Hard Anodize (Type III Military Spec)"]
    ],
    deliverables: "STEP AP242, Parasolid, Native SolidWorks Part"
  },
  "project-07": {
    code: "PRJ-07",
    title: "Centrifugal Blower & Cooling-Fin Engine Assembly",
    category: "Assembly Design · Product Design · 3D CAD Modelling",
    cad: "SolidWorks Assembly",
    mediaType: "image",
    mediaSrc: "assets/aplabsworkproof/Screenshot 2025-12-12 170657.png",
    mediaAlt: "SolidWorks assembly of centrifugal scroll volute blower coupled to a 24-fin air-cooled engine",
    challenge:
      "Dampening high-frequency harmonic vibration transmitted from the reciprocating single-cylinder engine into the high-speed centrifugal blower volute.",
    approach:
      "Designed an integrated structural sub-frame with triangular gusset bracing. Maintained continuous aerodynamic radius transitions within the volute scroll to eliminate airflow boundary layer separation.",
    specs: [
      ["Intake Flange", "Ø 140.00 mm Multi-Bolt Circular Flange"],
      ["Discharge Dimensions", "120.00 x 60.00 mm Rectangular Chute"],
      ["Cylinder Cooling Fins", "24 Die-Cast Fins (2.0 mm taper)"],
      ["Fastener Standard", "ISO 4762 Metric Socket Head Cap Screws"],
      ["Sub-Frame", "Rigid channel-iron base with isolation gussets"],
      ["Materials", "A380 Die-Cast Aluminum, Q235 Mild Steel, Ductile Iron"]
    ],
    deliverables: "STEP AP242, Native SolidWorks Assembly, Parasolid"
  },
  "project-08": {
    code: "PRJ-08",
    title: "Formed Sheet Metal Support Bracket",
    category: "Sheet Metal Design · Mechanical Part Design",
    cad: "SolidWorks Sheet Metal Module",
    mediaType: "image",
    mediaSrc: "assets/aplabsworkproof/Screenshot 2025-12-15 161043.png",
    mediaAlt: "SolidWorks sheet metal support bracket with 90-degree flanges, joggle bends, and lightening slot",
    challenge:
      "Preventing micro-cracking and excessive strain hardening at tight 1.0x inside bend radii while holding strict center-to-center hole tolerances after multiple sequential press-brake hits.",
    approach:
      "Modeled using exact DIN 6935 bend allowance tables with K-factor 0.44. Verified flat-pattern perimeter laser nesting to minimize sheet scrap and cut mass by 34%.",
    specs: [
      ["Sheet Gauge", "2.50 mm (12 AWG Nominal)"],
      ["Inside Bend Radius", "R 2.50 mm (1.0 x Thickness)"],
      ["Forming Compensation", "K-Factor 0.44 Air Bending (DIN 6935)"],
      ["Fabrication Method", "CNC Fiber Laser Cut + CNC Multi-Axis Press Brake"],
      ["Mass Reduction", "34% mass cut via central lightening extrusion"],
      ["Materials", "5052-H32 Marine Grade Aluminum, AISI 304 Stainless Steel"]
    ],
    deliverables: "1:1 DXF Flat Pattern, STEP AP242, SolidWorks Part (.sldprt)"
  },
  "project-09": {
    code: "PRJ-09",
    title: "Modular Workstation Cubicle System",
    category: "Product Design · Assembly Design · 3D CAD Modelling",
    cad: "SolidWorks Professional Assembly (main.ass)",
    mediaType: "video",
    mediaSrc: "assets/Home design.mp4",
    posterSrc: "assets/aplabsworkproof/Screenshot 2026-09-01 172616.png",
    mediaAlt: "SolidWorks top-down assembly of the 8-person modular workstation pod cluster",
    challenge:
      "Developing a modular interconnect bracket system allowing workstations to be reconfigured from 2-person to 4-person, 6-person, or 8-person clusters using 100% standardized extrusions without field modification.",
    approach:
      "Top-down assembly design incorporating multi-configuration sub-assemblies. Standardized on hidden cam-lock fasteners and universal slot-lock extrusion profiles.",
    specs: [
      ["Pod Architecture", "8-Person Back-to-Back Pod"],
      ["Worksurface Dimensions", "1500 x 750 mm per User"],
      ["Screen Height", "1200 mm Acoustic Damping Divider"],
      ["Assembly Tree", "18 Sub-Assemblies / 42 Discrete Mated Parts"],
      ["Interconnect System", "Cam-lock fasteners & universal slot-lock extrusions"],
      ["Materials", "6063-T5 Extruded Aluminum, E1 Engineered Wood, Recycled PET Felt"]
    ],
    deliverables: "STEP AP214, Native SolidWorks Assembly, Parasolid"
  }
};

function initProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  const titleEl = document.getElementById("modal-project-title");
  const codeEl = document.getElementById("modal-project-code");
  const catEl = document.getElementById("modal-project-category");
  const cadEl = document.getElementById("modal-project-cad");
  const mediaEl = document.getElementById("modal-project-media");
  const challengeEl = document.getElementById("modal-project-challenge");
  const approachEl = document.getElementById("modal-project-approach");
  const specsEl = document.getElementById("modal-project-specs");
  const deliverablesEl = document.getElementById("modal-project-deliverables");
  const closeBtn = document.getElementById("modal-close-btn");

  let lastTrigger = null;

  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = "";
    mediaEl.innerHTML = "";
    if (window.location.hash.startsWith("#project-")) {
      history.replaceState(null, "", "#projects");
    }
    if (lastTrigger && typeof lastTrigger.focus === "function") {
      lastTrigger.focus();
    }
  };

  const openModal = (projectId, triggerEl) => {
    const data = PROJECTS[projectId];
    if (!data) return;

    lastTrigger = triggerEl || document.activeElement;
    codeEl.textContent = data.code;
    titleEl.textContent = data.title;
    catEl.textContent = data.category;
    cadEl.textContent = data.cad;
    challengeEl.textContent = data.challenge;
    approachEl.textContent = data.approach;
    deliverablesEl.textContent = data.deliverables;

    mediaEl.innerHTML = "";
    const existingThumbs = document.getElementById("modal-project-thumbs");
    if (existingThumbs) existingThumbs.remove();

    const renderMediaItem = (type, src, alt, poster) => {
      mediaEl.innerHTML = "";
      if (type === "video") {
        const video = document.createElement("video");
        video.src = src;
        if (poster) video.poster = poster;
        video.controls = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute("aria-label", alt);
        if (!prefersReducedMotion()) {
          video.autoplay = true;
        }
        mediaEl.appendChild(video);
      } else {
        const img = document.createElement("img");
        img.src = src;
        img.alt = alt;
        mediaEl.appendChild(img);
      }
    };

    renderMediaItem(data.mediaType, data.mediaSrc, data.mediaAlt, data.posterSrc);

    if (data.gallery && data.gallery.length > 1) {
      const strip = document.createElement("div");
      strip.id = "modal-project-thumbs";
      strip.className = "acharya-modal-thumbs";
      data.gallery.forEach((gItem, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "acharya-modal-thumb-btn";
        btn.setAttribute("aria-label", "View render " + (idx + 1));
        btn.setAttribute("aria-current", idx === 0 ? "true" : "false");
        const tImg = document.createElement("img");
        tImg.src = gItem.src;
        tImg.alt = gItem.alt;
        btn.appendChild(tImg);
        btn.addEventListener("click", () => {
          renderMediaItem("image", gItem.src, gItem.alt);
          strip.querySelectorAll("button").forEach((b) => b.setAttribute("aria-current", "false"));
          btn.setAttribute("aria-current", "true");
        });
        strip.appendChild(btn);
      });
      mediaEl.insertAdjacentElement("afterend", strip);
    }

    specsEl.innerHTML = "";
    data.specs.forEach(([label, value]) => {
      const item = document.createElement("div");
      item.className = "acharya-spec-item";
      const lbl = document.createElement("span");
      lbl.className = "acharya-spec-label";
      lbl.textContent = label;
      const val = document.createElement("span");
      val.className = "acharya-spec-value";
      val.textContent = value;
      item.append(lbl, val);
      specsEl.appendChild(item);
    });

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  };

  document.querySelectorAll("[data-project-trigger]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const id = el.getAttribute("data-project-trigger");
      if (id && PROJECTS[id]) {
        e.preventDefault();
        history.replaceState(null, "", `#${id}`);
        openModal(id, el);
      }
    });
  });

  // Workproof gallery lightbox triggers
  document.querySelectorAll("[data-workproof-src]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-workproof-src");
      const title = btn.getAttribute("data-workproof-title") || "CAD Workproof Capture";
      const cad = btn.getAttribute("data-workproof-cad") || "Acharya N Co · Viewport Capture";
      const alt = btn.getAttribute("data-workproof-alt") || title;
      if (!src) return;

      lastTrigger = btn;
      const existingThumbs = document.getElementById("modal-project-thumbs");
      if (existingThumbs) existingThumbs.remove();

      codeEl.textContent = "WORKPROOF";
      cadEl.textContent = cad;
      catEl.textContent = "Verified CAD Viewport Capture";
      titleEl.textContent = title;
      challengeEl.textContent = "Direct native CAD viewport capture retained in the Acharya N Co engineering workproof archive.";
      approachEl.textContent = "Engineered for parametric associativity, manufacturable clearances, and clean downstream export.";
      deliverablesEl.textContent = "Native CAD Part/Assembly, STEP AP242, Parasolid (.x_t)";
      specsEl.innerHTML = "";
      mediaEl.innerHTML = "";
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      mediaEl.appendChild(img);

      modal.hidden = false;
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.querySelector("[data-modal-backdrop]")?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });

  // Open automatically if loaded with #project-01 .. #project-09 hash
  const hashId = window.location.hash.replace("#", "");
  if (PROJECTS[hashId]) {
    openModal(hashId, null);
  }
}

/* -------------------------------------------------------------------------- */
/* Boot                                                                       */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileNav();
  initCounters();
  initCarousels();
  initPrinciplesCarousel();
  initAccordion();
  initProjectModal();
});
