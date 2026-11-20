"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { setupSceneLighting } from "./SceneLighting";
import {
  createGunSlideAssembly,
  createDamSpillwayAssembly,
  createBatmanBladeAssembly,
  createWatchAssembly,
  createPlanetaryAssembly,
} from "./CADGeometries";
import { ModelFallback } from "./ModelFallback";
import { ProjectItem } from "@/config/projects";
import {
  RotateCcw,
  Eye,
  Layers,
  Scissors,
  MapPin,
  Image as ImageIcon,
  Box,
  Maximize2,
  X,
} from "lucide-react";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

interface ModelViewerProps {
  project: ProjectItem;
  className?: string;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({
  project,
  className,
}) => {
  const [viewMode, setViewMode] = useState<"3d" | "blueprint">("3d");
  const [wireframe, setWireframe] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [crossSection, setCrossSection] = useState(false);
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const clippingPlaneRef = useRef<THREE.Plane | null>(null);

  // Mouse & Orbit controls state
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const cameraDistance = useRef(5.5);
  const spherical = useRef({ theta: 0.8, phi: 1.1 });

  const buildModel = (
    type: ProjectItem["modelType"],
    wf: boolean,
    exp: boolean,
    cut: boolean
  ) => {
    const planes: THREE.Plane[] = [];
    if (cut) {
      const plane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.2);
      planes.push(plane);
      clippingPlaneRef.current = plane;
    }

    const expVal = exp ? 1.0 : 0.0;

    switch (type) {
      case "gun":
        return createGunSlideAssembly(wf, expVal, planes);
      case "dam":
        return createDamSpillwayAssembly(wf, expVal, planes);
      case "blade":
        return createBatmanBladeAssembly(wf, expVal, planes);
      case "watch":
        return createWatchAssembly(wf, expVal, planes);
      default:
        return createGunSlideAssembly(wf, expVal, planes);
    }
  };

  const updateCameraPosition = () => {
    if (!cameraRef.current) return;
    const r = cameraDistance.current;
    const { theta, phi } = spherical.current;

    cameraRef.current.position.x = r * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = r * Math.cos(phi);
    cameraRef.current.position.z = r * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(0, 0, 0);
  };

  const resetCamera = () => {
    spherical.current = { theta: 0.8, phi: 1.1 };
    cameraDistance.current = 5.5;
    updateCameraPosition();
    setExploded(false);
    setWireframe(false);
    setCrossSection(false);
    setActiveAnnotation(null);
  };

  useEffect(() => {
    if (viewMode !== "3d" || !containerRef.current) return;

    try {
      const container = containerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      cameraRef.current = camera;
      updateCameraPosition();

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
      const grid = new THREE.GridHelper(10, 20, 0xa3e635, 0x1f2421);
      grid.position.y = -2.0;
      scene.add(grid);

      // Model
      const model = buildModel(
        project.modelType,
        wireframe,
        exploded,
        crossSection
      );
      scene.add(model);
      modelGroupRef.current = model;

      // Event listeners for Orbit Interaction
      const handleMouseDown = (e: MouseEvent) => {
        isDragging.current = true;
        previousMousePosition.current = { x: e.clientX, y: e.clientY };
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        const deltaX = e.clientX - previousMousePosition.current.x;
        const deltaY = e.clientY - previousMousePosition.current.y;

        spherical.current.theta -= deltaX * 0.008;
        spherical.current.phi = Math.max(
          0.1,
          Math.min(Math.PI - 0.1, spherical.current.phi - deltaY * 0.008)
        );

        updateCameraPosition();
        previousMousePosition.current = { x: e.clientX, y: e.clientY };
      };

      const handleMouseUp = () => {
        isDragging.current = false;
      };

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        cameraDistance.current = Math.max(
          2.5,
          Math.min(10.0, cameraDistance.current + e.deltaY * 0.005)
        );
        updateCameraPosition();
      };

      container.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("wheel", handleWheel, { passive: false });

      // Resize
      const handleResize = () => {
        if (!containerRef.current || !renderer || !camera) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("resize", handleResize);

      // Render Loop
      let animId: number;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animId);
        container.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("wheel", handleWheel);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
      };
    } catch {
      setWebGLSupported(false);
      setViewMode("blueprint");
    }
  }, [viewMode, project.modelType]);

  // Update model upon toggle states
  useEffect(() => {
    if (!sceneRef.current || viewMode !== "3d") return;
    if (modelGroupRef.current) {
      sceneRef.current.remove(modelGroupRef.current);
    }
    const newModel = buildModel(
      project.modelType,
      wireframe,
      exploded,
      crossSection
    );
    sceneRef.current.add(newModel);
    modelGroupRef.current = newModel;
  }, [wireframe, exploded, crossSection, viewMode]);

  return (
    <div
      className={`relative w-full h-[400px] sm:h-[480px] lg:h-[540px] bg-[#050505] border border-white/10 overflow-hidden select-none ${
        className || ""
      }`}
    >
      {/* Background CAD grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-30 pointer-events-none" />

      {/* Mode Switcher: 3D View vs Static Orthogonal Blueprint */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 p-1 glass-panel bg-[#111411]/90 border border-white/10">
        <button
          onClick={() => setViewMode("3d")}
          disabled={!webGLSupported}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono uppercase transition-colors ${
            viewMode === "3d"
              ? "bg-[#A3E635] text-[#050505] font-semibold"
              : "text-[#A1A1AA] hover:text-white"
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span>Interactive 3D</span>
        </button>

        <button
          onClick={() => setViewMode("blueprint")}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono uppercase transition-colors ${
            viewMode === "blueprint"
              ? "bg-[#A3E635] text-[#050505] font-semibold"
              : "text-[#A1A1AA] hover:text-white"
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>2D Schematic</span>
        </button>
      </div>

      {/* Main View Area */}
      {viewMode === "3d" ? (
        <div
          ref={containerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        />
      ) : (
        <ModelFallback type={project.modelType} title={project.title} />
      )}

      {/* 3D Viewport Controls (Desktop & Mobile) */}
      {viewMode === "3d" && (
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          {/* Left: Engineering Model Status */}
          <div className="font-mono text-[10px] text-[#A1A1AA] hidden md:block">
            <span className="text-[#A3E635]">INTERACTIVE CAD VIEWER</span> // ROTATE:
            DRAG • ZOOM: SCROLL
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 p-1 glass-panel bg-[#111411]/90 border border-white/10 pointer-events-auto ml-auto">
            {/* Wireframe Mode */}
            {project.wireframeAvailable && (
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`p-1.5 text-xs font-mono transition-colors ${
                  wireframe
                    ? "bg-[#A3E635] text-[#050505]"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
                title="Toggle Wireframe Mesh"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Exploded View */}
            {project.explodedAvailable && (
              <button
                onClick={() => setExploded(!exploded)}
                className={`p-1.5 text-xs font-mono transition-colors ${
                  exploded
                    ? "bg-[#A3E635] text-[#050505]"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
                title="Toggle Exploded Assembly"
              >
                <Layers className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Cross Section Cutaway */}
            {project.crossSectionAvailable && (
              <button
                onClick={() => setCrossSection(!crossSection)}
                className={`p-1.5 text-xs font-mono transition-colors ${
                  crossSection
                    ? "bg-[#A3E635] text-[#050505]"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
                title="Toggle Mechanical Cross-Section"
              >
                <Scissors className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Camera Reset */}
            <button
              onClick={resetCamera}
              className="p-1.5 text-[#A1A1AA] hover:text-white transition-colors"
              title="Reset Viewpoint"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Model Annotations Hotspots Panel */}
      {project.annotations && project.annotations.length > 0 && (
        <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1.5 pointer-events-auto">
          <div className="flex items-center gap-1">
            {project.annotations.map((ann, idx) => (
              <button
                key={ann.id}
                onClick={() =>
                  setActiveAnnotation(activeAnnotation === ann.id ? null : ann.id)
                }
                className={`w-6 h-6 rounded-none flex items-center justify-center font-mono text-xs border transition-colors ${
                  activeAnnotation === ann.id
                    ? "bg-[#A3E635] text-[#050505] border-[#A3E635] font-bold"
                    : "bg-[#111411] text-[#A1A1AA] border-white/20 hover:border-[#A3E635]"
                }`}
                title={ann.title}
              >
                0{idx + 1}
              </button>
            ))}
          </div>

          {/* Active Annotation Callout Card */}
          {activeAnnotation && (
            <div className="mt-2 w-64 p-3 glass-panel bg-[#111411]/95 border border-[#A3E635]/40 shadow-xl animate-in fade-in duration-200">
              {(() => {
                const item = project.annotations.find(
                  (a) => a.id === activeAnnotation
                );
                if (!item) return null;
                return (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-heading text-xs font-bold uppercase text-[#A3E635]">
                        {item.title}
                      </span>
                      <button
                        onClick={() => setActiveAnnotation(null)}
                        className="text-[#A1A1AA] hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="font-mono text-[11px] text-[#F5F5F5] leading-relaxed">
                      {item.description}
                    </p>
                    <div className="font-mono text-[9px] text-[#A1A1AA] mt-1.5">
                      COORD: [{item.position.join(", ")}]
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
