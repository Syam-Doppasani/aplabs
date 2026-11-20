"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { setupSceneLighting } from "./SceneLighting";
import {
  createWatchAssembly,
  createGunSlideAssembly,
  createBatmanBladeAssembly,
  createDamSpillwayAssembly,
} from "./CADGeometries";
import { RotateCw, Layers, Eye, Sparkles, Image as ImageIcon, Box } from "lucide-react";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

type HeroModelKey = "watch" | "gun" | "blade" | "dam";

interface HeroModelInfo {
  name: string;
  tag: string;
  file: string;
  cadCapture: string;
  desc: string;
}

const HERO_MODELS: Record<HeroModelKey, HeroModelInfo> = {
  watch: {
    name: "Luxury Watch",
    tag: "CREO PARAMETRIC 12",
    file: "ASM0001.PRT // NANI DIAL",
    cadCapture: "/media/watch-cad.png",
    desc: "Fluted 60-notch gold bezel with royal blue sunburst dial",
  },
  gun: {
    name: "Tactical Slide",
    tag: "5-AXIS CNC MILLING",
    file: "SLIDE_TACTICAL_416R.SLDPRT",
    cadCapture: "/media/gun-slide.png",
    desc: "8-port compensator slide with reverse angled racking serrations",
  },
  blade: {
    name: "Batman Blade",
    tag: "SOLIDWORKS 2025 SP1.2",
    file: "BATMAN_BLADE.SLDPRT",
    cadCapture: "/media/batman-blade-cad.jpg",
    desc: "Zoltek Panex 33 carbon-fiber aerodynamic batarang",
  },
  dam: {
    name: "Hydraulic Dam",
    tag: "SOLIDWORKS ASSEMBLY",
    file: "DAM_BARRAGE_MAIN.SLDASM",
    cadCapture: "/media/dam-structure.png",
    desc: "Multi-pier radial sluice gate barrage with curved ogee spillway",
  },
};

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeModel, setActiveModel] = useState<HeroModelKey>("watch");
  const [viewMode, setViewMode] = useState<"3d" | "cad-proof">("3d");
  const [wireframe, setWireframe] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [materialMode, setMaterialMode] = useState<
    "titanium" | "graphite" | "brass" | "chrome"
  >("titanium");
  const [autoRotate, setAutoRotate] = useState(true);
  const [coords, setCoords] = useState({ x: 0, y: 0, z: 0 });

  // Refs for animation loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const explodeProgressRef = useRef(0);

  const getModelMesh = (key: HeroModelKey, wf: boolean, exp: boolean) => {
    const expVal = exp ? 1.0 : 0.0;
    switch (key) {
      case "watch":
        return createWatchAssembly(wf, expVal);
      case "gun":
        return createGunSlideAssembly(wf, expVal);
      case "blade":
        return createBatmanBladeAssembly(wf, expVal);
      case "dam":
        return createDamSpillwayAssembly(wf, expVal);
      default:
        return createWatchAssembly(wf, expVal);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x050505, 0.05);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 5.8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio Lighting
    setupSceneLighting(scene);

    // 5. Grid helper (subtle green floor)
    const grid = new THREE.GridHelper(14, 28, 0xa3e635, 0x171a17);
    grid.position.y = -2.2;
    scene.add(grid);

    // 6. Build Initial Model
    const modelGroup = getModelMesh(activeModel, wireframe, exploded);
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Mouse listener
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = normX * 0.45;
      mouseRef.current.targetY = normY * 0.35;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Resize listener
    const onResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Lerp mouse parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (modelGroupRef.current) {
        if (autoRotate) {
          modelGroupRef.current.rotation.y += delta * 0.45;
        }

        // Apply mouse tilt
        modelGroupRef.current.rotation.x = mouseRef.current.y * 0.6 + 0.35;
        modelGroupRef.current.rotation.z = -mouseRef.current.x * 0.3;

        // Coordinate HUD tracking
        setCoords({
          x: Number(modelGroupRef.current.rotation.x.toFixed(2)),
          y: Number(modelGroupRef.current.rotation.y.toFixed(2)),
          z: Number(modelGroupRef.current.rotation.z.toFixed(2)),
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  // Update assembly when model, wireframe, or exploded changes
  useEffect(() => {
    if (!sceneRef.current) return;
    if (modelGroupRef.current) {
      sceneRef.current.remove(modelGroupRef.current);
    }
    const newGroup = getModelMesh(activeModel, wireframe, exploded);
    sceneRef.current.add(newGroup);
    modelGroupRef.current = newGroup;
  }, [activeModel, wireframe, exploded, materialMode]);

  const currentInfo = HERO_MODELS[activeModel];

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[680px] overflow-hidden select-none bg-[#050505] crosshair-corner">
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing ${
          viewMode === "cad-proof" ? "hidden" : "block"
        }`}
      />

      {/* Alternative View: Native CAD Proof Image from Studio Archives */}
      {viewMode === "cad-proof" && (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-[#070907] animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />
          <img
            src={currentInfo.cadCapture}
            alt={currentInfo.name}
            className="max-h-[82%] max-w-[92%] object-contain filter drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]"
          />
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between font-mono text-[10px] text-[#A1A1AA] border-t border-white/10 pt-2">
            <span className="text-[#A3E635] uppercase font-semibold">
              ✦ {currentInfo.tag}
            </span>
            <span>{currentInfo.desc}</span>
          </div>
        </div>
      )}

      {/* Top Bar: Model Selector Tabs */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        {/* Model Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#111411]/90 backdrop-blur-md border border-white/10 text-[10px] font-mono">
          {(Object.keys(HERO_MODELS) as HeroModelKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveModel(key)}
              className={`px-2.5 py-1 uppercase transition-colors ${
                activeModel === key
                  ? "bg-[#A3E635] text-[#050505] font-bold"
                  : "text-[#A1A1AA] hover:text-white"
              }`}
            >
              {HERO_MODELS[key].name}
            </button>
          ))}
        </div>

        {/* View Switcher: 3D WebGL vs Native CAD Screenshot */}
        <button
          onClick={() => setViewMode(viewMode === "3d" ? "cad-proof" : "3d")}
          className="flex items-center gap-1.5 px-3 py-1 bg-[#111411]/90 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#A3E635] hover:border-[#A3E635] transition-colors"
          title="Toggle between 3D WebGL Render and Native CAD Capture"
        >
          {viewMode === "3d" ? (
            <>
              <ImageIcon className="w-3 h-3" />
              <span>Native CAD Image</span>
            </>
          ) : (
            <>
              <Box className="w-3 h-3" />
              <span>3D Orbit View</span>
            </>
          )}
        </button>
      </div>

      {/* Engineering HUD Telemetry Overlays (visible in 3D mode) */}
      {viewMode === "3d" && (
        <div className="absolute top-16 left-6 pointer-events-none hidden sm:flex flex-col gap-1 font-mono text-[9px] text-[#A1A1AA]/80">
          <div className="flex items-center gap-2">
            <TechnicalLabel variant="lime" size="sm">
              {currentInfo.tag}
            </TechnicalLabel>
            <span className="text-[#A3E635]">● 60 FPS</span>
          </div>
          <div className="text-white font-medium">{currentInfo.file}</div>
          <div>
            ORIENTATION: X:{coords.x} Y:{coords.y} Z:{coords.z}
          </div>
          <div>DATUM: ASME Y14.5 / ISO 1101</div>
        </div>
      )}

      {/* Floating Interactive 3D Controls Panel (visible in 3D mode) */}
      {viewMode === "3d" && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-20 flex items-center gap-1.5 p-1.5 glass-panel bg-[#111411]/90 backdrop-blur-md border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
          {/* Exploded View Toggle */}
          <button
            onClick={() => setExploded(!exploded)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase transition-colors ${
              exploded
                ? "bg-[#A3E635] text-[#050505] font-semibold"
                : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
            }`}
            title="Toggle Exploded Assembly View"
          >
            <Layers className="w-3 h-3" />
            <span>{exploded ? "Assembled" : "Explode"}</span>
          </button>

          {/* Wireframe Toggle */}
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase transition-colors ${
              wireframe
                ? "bg-[#A3E635] text-[#050505] font-semibold"
                : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
            }`}
            title="Toggle Wireframe Mesh"
          >
            <Eye className="w-3 h-3" />
            <span>Wireframe</span>
          </button>

          {/* Auto Rotate Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 text-xs font-mono transition-colors ${
              autoRotate
                ? "text-[#A3E635] bg-[#A3E635]/10"
                : "text-[#A1A1AA] hover:text-white"
            }`}
            title="Toggle Auto Rotation"
          >
            <RotateCw className={`w-3 h-3 ${autoRotate ? "animate-spin" : ""}`} />
          </button>
        </div>
      )}
    </div>
  );
};
