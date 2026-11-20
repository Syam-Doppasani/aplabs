"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { setupSceneLighting } from "../three/SceneLighting";
import {
  createGunSlideAssembly,
  createDamSpillwayAssembly,
  createBatmanBladeAssembly,
  createWatchAssembly,
} from "../three/CADGeometries";
import { SectionHeading } from "../ui/SectionHeading";
import { TechnicalLabel } from "../ui/TechnicalLabel";
import { Button } from "../ui/Button";
import { EnquiryAction } from "../ui/EnquiryAction";
import {
  Layers,
  Eye,
  Scissors,
  RotateCw,
  Sliders,
  Maximize2,
  Cpu,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ShowcaseMode {
  id: string;
  number: string;
  name: string;
  description: string;
  engineeringNote: string;
  defaultWireframe?: boolean;
  defaultExploded?: boolean;
  hasSlider?: boolean;
  sliderLabel?: string;
}

const showcaseModes: ShowcaseMode[] = [
  {
    id: "wireframe-solid",
    number: "01",
    name: "Wireframe to Solid Transition",
    description:
      "Parametric surface boundary evaluation showing curvature continuity and edge tessellation transitioning into high-fidelity PBR metallic shading.",
    engineeringNote:
      "Evaluates mesh polygon density and surface normal accuracy before machining toolpath generation.",
    hasSlider: true,
    sliderLabel: "Mesh Density / Shading Blend",
  },
  {
    id: "exploded-assembly",
    number: "02",
    name: "Exploded Horological Assembly",
    description:
      "Axial part separation visualization revealing sapphire crystal, 60-flute gold bezel, deep cobalt dial with NANI script, and internal mechanical caliber case.",
    engineeringNote:
      "Verifies 0.05mm hand clearance and internal movement retention ring geometry under shock loads.",
    defaultExploded: true,
    hasSlider: true,
    sliderLabel: "Assembly Separation Distance",
  },
  {
    id: "gun-tolerancing",
    number: "03",
    name: "Tactical Slide Tolerancing",
    description:
      "Precision multi-axis CNC slide geometry displaying 8 compensator ports, 22° rear racking serrations, and gold TiN top accent plate.",
    engineeringNote:
      "Inspects internal slide rail tolerances (±0.008mm ISO Grade 5) and barrel lockup geometry.",
    defaultExploded: false,
    hasSlider: true,
    sliderLabel: "Slide Reciprocation Separation",
  },
  {
    id: "cross-section",
    number: "04",
    name: "Mechanical Cross-Section Analysis",
    description:
      "Dynamic cutting plane passing through component walls to verify internal bore concentricity, wall thickness uniformity, and clearance fits.",
    engineeringNote:
      "Ensures zero internal interference between reciprocating assemblies and stationary frames.",
    hasSlider: true,
    sliderLabel: "Cutting Plane Offset",
  },
  {
    id: "sheet-metal",
    number: "05",
    name: "Batman Blade Aerodynamic Sheet",
    description:
      "Abrasive CNC waterjet profile with 3.2mm Zoltek Panex 33 carbon-composite thickness, reflex cambered wingtips, and balanced bat head core.",
    engineeringNote:
      "Symmetrical aerofoil profile provides gyroscopic flight stabilization and flat-pattern nesting optimization.",
  },
  {
    id: "orbit-inspection",
    number: "06",
    name: "360° Dynamic Model Inspection",
    description:
      "Full free-axis spatial rotation allowing inspection from any angle with studio rim lighting and coordinate tracking.",
    engineeringNote:
      "Real-time 60 FPS WebGL inspection with physically-based metallic PBR shaders.",
  },
  {
    id: "dam-hydraulics",
    number: "07",
    name: "Hydroelectric Spillway Dynamics",
    description:
      "Parametric civil-mechanical spillway dam featuring 10 sluice gate bays, ogee discharge apron, and sub-surface penstock conduit.",
    engineeringNote:
      "WES ogee crest geometry prevents sub-atmospheric cavitation erosion during peak hydrodynamic discharge.",
    hasSlider: true,
    sliderLabel: "Sluice Gate Vertical Lift",
  },
  {
    id: "topology-opt",
    number: "08",
    name: "Topology Mass Optimization",
    description:
      "Generative structural refinement stripping material from low-stress zones while preserving load-bearing pivot bores.",
    engineeringNote:
      "Achieved 42.6% mass reduction (980g → 562g) while maintaining Safety Factor > 1.85.",
  },
];

export const TechnicalShowcase: React.FC = () => {
  const [activeMode, setActiveMode] = useState<string>("wireframe-solid");
  const [sliderValue, setSliderValue] = useState<number>(0.5);
  const [wireframe, setWireframe] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);

  const currentModeData =
    showcaseModes.find((m) => m.id === activeMode) || showcaseModes[0];

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2.0, 5.5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.localClippingEnabled = true;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    setupSceneLighting(scene);

    // Floor grid
    const grid = new THREE.GridHelper(12, 24, 0xa3e635, 0x1f2421);
    grid.position.y = -2.0;
    scene.add(grid);

    // Render Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (modelGroupRef.current) {
        // Slow auto spin for showcase
        modelGroupRef.current.rotation.y += delta * 0.35;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  // Update Model upon Mode or Slider change
  useEffect(() => {
    if (!sceneRef.current) return;
    if (modelGroupRef.current) {
      sceneRef.current.remove(modelGroupRef.current);
    }

    let model: THREE.Group;

    if (activeMode === "wireframe-solid") {
      const isWf = sliderValue < 0.5;
      model = createWatchAssembly(isWf, 0);
    } else if (activeMode === "exploded-assembly") {
      model = createWatchAssembly(false, sliderValue);
    } else if (activeMode === "gun-tolerancing") {
      model = createGunSlideAssembly(wireframe, sliderValue);
    } else if (activeMode === "cross-section") {
      const clipPlane = new THREE.Plane(
        new THREE.Vector3(0, -1, 0),
        (sliderValue - 0.5) * 1.5
      );
      model = createGunSlideAssembly(false, 0, [clipPlane]);
    } else if (activeMode === "sheet-metal") {
      model = createBatmanBladeAssembly(wireframe, 0);
    } else if (activeMode === "orbit-inspection") {
      model = createWatchAssembly(wireframe, 0.2);
    } else if (activeMode === "dam-hydraulics") {
      model = createDamSpillwayAssembly(wireframe, sliderValue);
    } else if (activeMode === "topology-opt") {
      model = createGunSlideAssembly(wireframe, 0);
    } else {
      model = createWatchAssembly(false, 0);
    }

    sceneRef.current.add(model);
    modelGroupRef.current = model;
  }, [activeMode, sliderValue, wireframe]);

  return (
    <section id="showcase" className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="04 // TECHNICAL EXHIBITION"
          tagline="CAD WORKFLOWS & VISUALIZATION"
          title="ENGINEERING DESIGN IN MOTION."
          description="A professional digital laboratory exhibiting our primary mechanical design processes — from wireframe topology and 3D additive architectures to FEA-informed generative structures."
        />

        {/* Mode Selector Tabs (8 modes) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
          {showcaseModes.map((mode) => {
            const isSelected = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  setActiveMode(mode.id);
                  setSliderValue(0.5);
                }}
                className={cn(
                  "p-3 text-left border flex flex-col justify-between transition-all duration-200 select-none",
                  isSelected
                    ? "bg-[#111411] border-[#A3E635] shadow-[0_0_15px_rgba(163,230,53,0.15)]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/30 text-[#A1A1AA]"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={cn(
                      "font-mono text-[10px] font-bold",
                      isSelected ? "text-[#A3E635]" : "text-white/40"
                    )}
                  >
                    {mode.number}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635]" />
                  )}
                </div>
                <span
                  className={cn(
                    "font-heading text-xs uppercase leading-tight font-semibold",
                    isSelected ? "text-white" : "text-[#A1A1AA]"
                  )}
                >
                  {mode.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Exhibition Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/15 bg-[#0B0D0B]">
          {/* Left: 3D CAD Stage (8 cols) */}
          <div className="lg:col-span-8 relative h-[420px] sm:h-[500px] border-b lg:border-b-0 lg:border-r border-white/15 bg-[#050505]">
            <div
              ref={containerRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            />

            {/* Corner CAD Status */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-[#A1A1AA] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
              <span>LIVE CAD SIMULATOR</span> // {currentModeData.name.toUpperCase()}
            </div>

            {/* Interactive Parameter Slider (when applicable) */}
            {currentModeData.hasSlider && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 p-3 glass-panel bg-[#111411]/90 border border-white/15 flex items-center gap-4">
                <span className="font-mono text-xs text-[#A3E635] whitespace-nowrap uppercase">
                  {currentModeData.sliderLabel || "Parameter"}:
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.02"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(parseFloat(e.target.value))}
                  className="w-full accent-[#A3E635] cursor-pointer"
                  aria-label={currentModeData.sliderLabel || "Parameter Slider"}
                />
                <span className="font-mono text-xs text-[#F5F5F5] w-12 text-right">
                  {Math.round(sliderValue * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* Right: Technical Explanation & Engineering Notes (4 cols) */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-[#0B0D0B] space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TechnicalLabel variant="lime" size="sm">
                  PROCESS {currentModeData.number}
                </TechnicalLabel>
                <span className="font-mono text-xs text-[#A1A1AA] uppercase">
                  // VERIFIED WORKFLOW
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold uppercase text-[#F5F5F5] leading-snug">
                {currentModeData.name}
              </h3>

              <p className="text-sm text-[#A1A1AA] leading-relaxed font-sans font-light">
                {currentModeData.description}
              </p>

              {/* Engineering Note Box */}
              <div className="p-4 bg-[#111411] border-l-2 border-[#A3E635] space-y-1">
                <span className="font-mono text-[10px] text-[#A3E635] uppercase font-bold tracking-wider block flex items-center gap-1.5">
                  <Info className="w-3 h-3" /> Engineering Consideration
                </span>
                <p className="font-mono text-xs text-[#F5F5F5] leading-relaxed">
                  {currentModeData.engineeringNote}
                </p>
              </div>

              {/* Distinguish conceptual vs simulated note */}
              <div className="font-mono text-[10px] text-[#A1A1AA]/70 pt-2 border-t border-white/5">
                Note: Geometry is parametrically constrained according to ASME/ISO mechanical standards.
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 border-t border-white/10">
              <EnquiryAction
                variant="outline"
                size="md"
                className="w-full justify-center"
                label="Discuss This Workflow"
                serviceContext={currentModeData.name}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
