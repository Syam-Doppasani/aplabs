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
  RotateCw,
  Image as ImageIcon,
  Box,
  Play,
  Info,
  ZoomIn,
  X,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ShowcaseMode {
  id: string;
  number: string;
  name: string;
  cadSoftware: string;
  realAssetImage: string;
  realAssetVideo?: string;
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
    name: "Parametric Surface to Solid",
    cadSoftware: "Creo Parametric 12",
    realAssetImage: "/media/watch-cad.png",
    realAssetVideo: "/media/watch.mp4",
    description:
      "Parametric surface boundary evaluation in Creo Parametric 12 showing curvature continuity and edge tessellation transitioning into metallic PBR shading.",
    engineeringNote:
      "Evaluates mesh polygon density and surface normal accuracy before machining toolpath generation.",
    hasSlider: true,
    sliderLabel: "Mesh Density / Shading Blend",
  },
  {
    id: "exploded-assembly",
    number: "02",
    name: "Exploded Horological Assembly",
    cadSoftware: "Creo Parametric 12",
    realAssetImage: "/media/watch-detail.png",
    realAssetVideo: "/media/watch.mp4",
    description:
      "Axial part separation visualization revealing sapphire crystal, 60-flute gold bezel, deep cobalt dial with custom 'NaNi' script, and internal caliber case.",
    engineeringNote:
      "Verifies 0.05mm hand clearance and internal movement retention ring geometry under shock loads.",
    defaultExploded: true,
    hasSlider: true,
    sliderLabel: "Assembly Separation Distance",
  },
  {
    id: "gun-tolerancing",
    number: "03",
    name: "Tactical Slide CNC Tolerancing",
    cadSoftware: "Creo & SolidWorks",
    realAssetImage: "/media/gun-slide.png",
    description:
      "Precision multi-axis CNC slide geometry displaying 8 compensator ports, 22° rear racking serrations, and gold TiN top accent plate.",
    engineeringNote:
      "Inspects internal slide rail tolerances (±0.005mm ISO Grade 5) and barrel lockup geometry.",
    defaultExploded: false,
    hasSlider: true,
    sliderLabel: "Slide Reciprocation Separation",
  },
  {
    id: "cross-section",
    number: "04",
    name: "Mechanical Cross-Section Analysis",
    cadSoftware: "SolidWorks Mechanical",
    realAssetImage: "/media/gun-optic.png",
    description:
      "Dynamic cutting plane passing through component walls and optics mount to verify internal bore concentricity, wall thickness, and clearance fits.",
    engineeringNote:
      "Ensures zero internal interference between reciprocating assemblies and stationary frames.",
    hasSlider: true,
    sliderLabel: "Cutting Plane Offset",
  },
  {
    id: "sheet-metal",
    number: "05",
    name: "Batman Aerodynamic Blade",
    cadSoftware: "SolidWorks 2025 SP1.2",
    realAssetImage: "/media/batman-blade-cad.jpg",
    realAssetVideo: "/media/batman-blade.mp4",
    description:
      "Abrasive CNC waterjet profile with 3.2mm Zoltek Panex 33 carbon-composite thickness, reflex cambered wingtips, and balanced central hub.",
    engineeringNote:
      "Symmetrical aerofoil profile provides gyroscopic flight stabilization and flat-pattern nesting optimization.",
  },
  {
    id: "orbit-inspection",
    number: "06",
    name: "Plummer Block Bearing Housing",
    cadSoftware: "SolidWorks Assembly",
    realAssetImage: "/media/plummer-block.png",
    description:
      "Heavy-duty cast iron split plummer block pedestal bearing featuring stepped phosphor bronze bushings, cap bolts, and grease lubrication port.",
    engineeringNote:
      "Achieves uniform clamping pressure across split brass journal shells without inducing bore ovality.",
  },
  {
    id: "dam-hydraulics",
    number: "07",
    name: "Hydroelectric Spillway Dynamics",
    cadSoftware: "SolidWorks Professional",
    realAssetImage: "/media/dam-structure.png",
    description:
      "Parametric civil-mechanical spillway dam featuring radial sluice gate bays, ogee discharge apron, and sub-surface penstock conduit.",
    engineeringNote:
      "WES ogee crest geometry prevents sub-atmospheric cavitation erosion during peak hydrodynamic discharge.",
    hasSlider: true,
    sliderLabel: "Sluice Gate Vertical Lift",
  },
  {
    id: "topology-opt",
    number: "08",
    name: "Motorsport Forged Racing Piston",
    cadSoftware: "SolidWorks Aerospace",
    realAssetImage: "/media/engine-piston.png",
    description:
      "Metallic red hard-anodized forged racing piston with 3-ring pack, thermal crown profile, and asymmetrical skirt mass-relief pockets.",
    engineeringNote:
      "Thermal expansion profiling eliminates cold slap while preventing high-RPM cylinder bore scuffing.",
  },
];

export const TechnicalShowcase: React.FC = () => {
  const [activeMode, setActiveMode] = useState<string>("wireframe-solid");
  const [viewMode, setViewMode] = useState<"cad-proof" | "3d">("cad-proof");
  const [sliderValue, setSliderValue] = useState<number>(0.5);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [selectedZoomImage, setSelectedZoomImage] = useState<string | null>(null);

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
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (modelGroupRef.current) {
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
          description="A professional digital laboratory exhibiting our primary mechanical design processes — featuring native CAD workproof captures, 60 FPS turnaround simulations, and real-time 3D parametric geometry."
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
                  "p-2.5 text-left border flex flex-col justify-between transition-all duration-200 select-none group",
                  isSelected
                    ? "bg-[#111411] border-[#A3E635] shadow-[0_0_20px_rgba(163,230,53,0.18)]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/30 text-[#A1A1AA]"
                )}
              >
                {/* Mini Image Preview */}
                <div className="relative h-12 w-full mb-2 bg-[#050505] border border-white/5 flex items-center justify-center overflow-hidden">
                  <img
                    src={mode.realAssetImage}
                    alt={mode.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  {mode.realAssetVideo && (
                    <div className="absolute bottom-1 right-1 px-1 py-0.2 bg-black/80 text-[8px] font-mono text-[#A3E635]">
                      ▶
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span
                    className={cn(
                      "font-mono text-[9px] font-bold",
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
                    "font-heading text-[11px] uppercase leading-tight font-semibold line-clamp-2",
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/15 bg-[#0B0D0B] crosshair-corner shadow-[0_20px_70px_rgba(0,0,0,0.85)]">
          {/* Left: Viewport Stage (8 cols) */}
          <div className="lg:col-span-8 relative min-h-[440px] sm:min-h-[520px] border-b lg:border-b-0 lg:border-r border-white/15 bg-[#050505] flex items-center justify-center overflow-hidden">
            {/* View Switcher Pill (Top Right) */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1 p-1 bg-[#111411]/90 backdrop-blur-md border border-white/15 text-[10px] font-mono">
              <button
                onClick={() => setViewMode("cad-proof")}
                className={cn(
                  "px-2.5 py-1 flex items-center gap-1.5 transition-colors uppercase font-medium",
                  viewMode === "cad-proof"
                    ? "bg-[#A3E635] text-[#050505] font-bold"
                    : "text-[#A1A1AA] hover:text-white"
                )}
              >
                <ImageIcon className="w-3 h-3" />
                <span>Native CAD Proof</span>
              </button>

              <button
                onClick={() => setViewMode("3d")}
                className={cn(
                  "px-2.5 py-1 flex items-center gap-1.5 transition-colors uppercase font-medium",
                  viewMode === "3d"
                    ? "bg-[#A3E635] text-[#050505] font-bold"
                    : "text-[#A1A1AA] hover:text-white"
                )}
              >
                <Box className="w-3 h-3" />
                <span>3D WebGL Lab</span>
              </button>
            </div>

            {/* View 1: Native CAD Proof Image / Video from Studio Archives */}
            {viewMode === "cad-proof" && (
              <div className="relative w-full h-full min-h-[440px] sm:min-h-[520px] flex items-center justify-center bg-[#070907] p-6 group">
                <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />

                {currentModeData.realAssetVideo ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <video
                      src={currentModeData.realAssetVideo}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="max-h-[380px] max-w-full object-contain filter drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]"
                    />
                    <div className="absolute top-4 left-4 px-2 py-0.5 bg-[#111411]/90 border border-white/10 text-[9px] font-mono text-[#A3E635] flex items-center gap-1">
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>60 FPS DYNAMIC SIMULATION</span>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setSelectedZoomImage(currentModeData.realAssetImage)}
                    className="relative w-full h-full flex items-center justify-center cursor-zoom-in"
                  >
                    <img
                      src={currentModeData.realAssetImage}
                      alt={currentModeData.name}
                      className="max-h-[380px] max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105 filter drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]"
                    />
                    <div className="absolute top-4 left-4 px-2.5 py-0.5 bg-[#111411]/90 border border-white/10 text-[9px] font-mono text-[#A3E635] flex items-center gap-1.5">
                      <ZoomIn className="w-3 h-3" />
                      <span>✦ NATIVE CAD CAPTURE • CLICK TO ZOOM</span>
                    </div>
                  </div>
                )}

                {/* Bottom CAD Metadata Footnote */}
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between font-mono text-[9px] text-[#A1A1AA] border-t border-white/10 pt-2 pointer-events-none">
                  <span className="text-[#A3E635] uppercase font-semibold">
                    {currentModeData.cadSoftware}
                  </span>
                  <span>VERIFIED AP LABS CAD IP // TOL ±0.005mm</span>
                </div>
              </div>
            )}

            {/* View 2: Interactive 3D WebGL Canvas */}
            <div
              className={`w-full h-full min-h-[440px] sm:min-h-[520px] ${
                viewMode === "3d" ? "block" : "hidden"
              }`}
            >
              <div
                ref={containerRef}
                className="w-full h-full cursor-grab active:cursor-grabbing"
              />

              {/* Corner CAD Status */}
              <div className="absolute top-4 left-4 font-mono text-[10px] text-[#A1A1AA] flex items-center gap-2 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
                <span>3D GEOMETRY SIMULATOR</span> // {currentModeData.name.toUpperCase()}
              </div>

              {/* Interactive Parameter Slider (when in 3D mode) */}
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
          </div>

          {/* Right: Technical Explanation & Engineering Notes (4 cols) */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-[#0B0D0B] space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TechnicalLabel variant="lime" size="sm">
                  PROCESS {currentModeData.number}
                </TechnicalLabel>
                <span className="px-2 py-0.5 bg-white/5 border border-white/10 font-mono text-[10px] text-[#A3E635] uppercase font-semibold">
                  {currentModeData.cadSoftware}
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

              {/* Verification Telemetry */}
              <div className="p-3 bg-white/[0.02] border border-white/10 font-mono text-[10px] text-[#A1A1AA] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-white/40">TOLERANCING:</span>
                  <span className="text-white font-semibold">ASME Y14.5 / ISO 1101</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">COMPLIANCE:</span>
                  <span className="text-[#A3E635] font-semibold">PRODUCTION READY</span>
                </div>
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

      {/* High-Resolution Zoom Lightbox */}
      {selectedZoomImage && (
        <div
          onClick={() => setSelectedZoomImage(null)}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-150"
        >
          <div className="absolute top-4 right-4 z-10 flex items-center gap-3">
            <span className="font-mono text-xs text-[#A3E635] uppercase">
              ESC TO CLOSE
            </span>
            <button
              onClick={() => setSelectedZoomImage(null)}
              className="w-10 h-10 border border-white/20 bg-black/60 flex items-center justify-center text-white hover:border-[#A3E635] hover:text-[#A3E635] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative max-w-6xl max-h-[85vh] p-2 border border-white/15 bg-[#050505] shadow-[0_0_100px_rgba(0,0,0,0.9)]">
            <img
              src={selectedZoomImage}
              alt="High resolution CAD view"
              className="max-w-full max-h-[80vh] object-contain select-none"
            />
            <div className="p-3 bg-[#111411] border-t border-white/10 flex items-center justify-between font-mono text-xs text-[#A1A1AA]">
              <span className="text-[#A3E635] font-semibold uppercase">
                {currentModeData.name} // {currentModeData.cadSoftware}
              </span>
              <span>{selectedZoomImage}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
