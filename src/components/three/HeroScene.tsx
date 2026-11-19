"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { setupSceneLighting } from "./SceneLighting";
import { createPlanetaryAssembly } from "./CADGeometries";
import { RotateCw, Layers, Eye, RefreshCw, Sparkles } from "lucide-react";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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
    const modelGroup = createPlanetaryAssembly(materialMode, wireframe, 0);
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
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Lerp mouse parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Lerp explode transition
      const targetExplode = exploded ? 1.0 : 0.0;
      explodeProgressRef.current +=
        (targetExplode - explodeProgressRef.current) * 0.08;

      if (modelGroupRef.current) {
        if (autoRotate) {
          modelGroupRef.current.rotation.y += delta * 0.45;
        }

        // Apply mouse tilt
        modelGroupRef.current.rotation.x =
          mouseRef.current.y * 0.6 + 0.35;
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

  // Update assembly when state changes
  useEffect(() => {
    if (!sceneRef.current) return;
    if (modelGroupRef.current) {
      sceneRef.current.remove(modelGroupRef.current);
    }
    const newGroup = createPlanetaryAssembly(
      materialMode,
      wireframe,
      exploded ? 1.0 : 0.0
    );
    sceneRef.current.add(newGroup);
    modelGroupRef.current = newGroup;
  }, [wireframe, exploded, materialMode]);

  return (
    <div className="relative w-full h-[550px] sm:h-[650px] lg:h-[720px] overflow-hidden select-none">
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        data-cursor="CAD"
      />

      {/* Engineering HUD Overlays */}
      <div className="absolute top-6 left-6 pointer-events-none hidden sm:flex flex-col gap-1.5 font-mono text-[10px] text-[#A1A1AA]/80">
        <div className="flex items-center gap-2">
          <TechnicalLabel variant="lime" size="sm">
            REAL-TIME CAD
          </TechnicalLabel>
          <span className="text-[#A3E635]">● 60 FPS</span>
        </div>
        <div>MODEL: PLANETARY_HUB_ASSY_v4.STEP</div>
        <div>
          ORIENTATION: X:{coords.x} Y:{coords.y} Z:{coords.z}
        </div>
        <div>DATUM: ISO 1101 TOLERANCE AP242</div>
      </div>

      {/* Floating Interactive 3D Controls Panel */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-20 flex items-center gap-2 p-1.5 glass-panel bg-[#111411]/85 backdrop-blur-md border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
        {/* Exploded View Toggle */}
        <button
          onClick={() => setExploded(!exploded)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase transition-colors ${
            exploded
              ? "bg-[#A3E635] text-[#050505] font-semibold"
              : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
          }`}
          title="Toggle Exploded Assembly View"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{exploded ? "Exploded" : "Assemble"}</span>
        </button>

        {/* Wireframe Toggle */}
        <button
          onClick={() => setWireframe(!wireframe)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase transition-colors ${
            wireframe
              ? "bg-[#A3E635] text-[#050505] font-semibold"
              : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
          }`}
          title="Toggle Wireframe Mesh"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Wireframe</span>
        </button>

        {/* Auto Rotate Toggle */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 text-xs font-mono transition-colors ${
            autoRotate
              ? "text-[#A3E635] bg-[#A3E635]/10"
              : "text-[#A1A1AA] hover:text-white"
          }`}
          title="Toggle Auto Rotation"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
        </button>

        {/* Material Cycle */}
        <button
          onClick={() => {
            const modes: ("titanium" | "graphite" | "brass" | "chrome")[] = [
              "titanium",
              "graphite",
              "brass",
              "chrome",
            ];
            const nextIdx = (modes.indexOf(materialMode) + 1) % modes.length;
            setMaterialMode(modes[nextIdx]);
          }}
          className="flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-mono text-[#A1A1AA] hover:text-[#A3E635] hover:bg-white/5 uppercase"
          title="Change Alloy Finish"
        >
          <Sparkles className="w-3 h-3 text-[#A3E635]" />
          <span>{materialMode}</span>
        </button>
      </div>
    </div>
  );
};
