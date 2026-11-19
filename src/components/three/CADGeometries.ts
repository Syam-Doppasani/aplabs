import * as THREE from "three";

/**
 * Material generator for engineering finishes
 */
export function getEngineeringMaterial(
  mode: "titanium" | "graphite" | "brass" | "chrome" | "wireframe" | "flow",
  wireframe = false,
  clippingPlanes: THREE.Plane[] = []
): THREE.Material {
  if (wireframe || mode === "wireframe") {
    return new THREE.MeshBasicMaterial({
      color: 0xa3e635,
      wireframe: true,
      clippingPlanes,
      clipShadows: true,
    });
  }

  switch (mode) {
    case "titanium":
      return new THREE.MeshStandardMaterial({
        color: 0x8a929a,
        roughness: 0.28,
        metalness: 0.88,
        clippingPlanes,
        clipShadows: true,
      });
    case "graphite":
      return new THREE.MeshStandardMaterial({
        color: 0x1f2421,
        roughness: 0.45,
        metalness: 0.75,
        clippingPlanes,
        clipShadows: true,
      });
    case "brass":
      return new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        roughness: 0.22,
        metalness: 0.82,
        clippingPlanes,
        clipShadows: true,
      });
    case "chrome":
      return new THREE.MeshStandardMaterial({
        color: 0xe0e0e0,
        roughness: 0.12,
        metalness: 0.96,
        clippingPlanes,
        clipShadows: true,
      });
    default:
      return new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        roughness: 0.35,
        metalness: 0.85,
        clippingPlanes,
        clipShadows: true,
      });
  }
}

/**
 * Generate gear tooth geometry with involute-like teeth
 */
export function createSpurGearMesh(
  teeth: number,
  radius: number,
  depth: number,
  boreRadius: number,
  material: THREE.Material
): THREE.Group {
  const group = new THREE.Group();

  // Central hub / cylinder
  const hubGeo = new THREE.CylinderGeometry(radius, radius, depth, 48);
  const hubMesh = new THREE.Mesh(hubGeo, material);
  group.add(hubMesh);

  // Teeth
  const toothWidth = (Math.PI * radius) / teeth;
  const toothHeight = radius * 0.18;
  const toothGeo = new THREE.BoxGeometry(toothWidth * 0.7, depth, toothHeight);

  for (let i = 0; i < teeth; i++) {
    const angle = (i / teeth) * Math.PI * 2;
    const tooth = new THREE.Mesh(toothGeo, material);
    tooth.position.x = Math.cos(angle) * (radius + toothHeight * 0.45);
    tooth.position.z = Math.sin(angle) * (radius + toothHeight * 0.45);
    tooth.rotation.y = -angle;
    group.add(tooth);
  }

  // Bore / inner hole visual ring
  if (boreRadius > 0) {
    const innerRingGeo = new THREE.RingGeometry(boreRadius, boreRadius * 1.15, 32);
    innerRingGeo.rotateX(-Math.PI / 2);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xa3e635,
      side: THREE.DoubleSide,
    });
    const ringMeshTop = new THREE.Mesh(innerRingGeo, innerRingMat);
    ringMeshTop.position.y = depth / 2 + 0.002;
    group.add(ringMeshTop);
  }

  return group;
}

/**
 * 01 / Planetary Reduction Gear Assembly with live explode support
 */
export function createPlanetaryAssembly(
  materialMode: "titanium" | "graphite" | "brass" | "chrome" | "wireframe" = "titanium",
  wireframe = false,
  explodedProgress = 0,
  clippingPlanes: THREE.Plane[] = []
): THREE.Group {
  const root = new THREE.Group();

  const matSteel = getEngineeringMaterial(materialMode, wireframe, clippingPlanes);
  const matBronze = getEngineeringMaterial(
    materialMode === "wireframe" ? "wireframe" : "brass",
    wireframe,
    clippingPlanes
  );
  const matDark = getEngineeringMaterial(
    materialMode === "wireframe" ? "wireframe" : "graphite",
    wireframe,
    clippingPlanes
  );

  // Outer Ring Gear Housing
  const ringCasingGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.8, 48, 1, true);
  const ringCasing = new THREE.Mesh(ringCasingGeo, matDark);
  root.add(ringCasing);

  // Ring gear flange with bolt holes
  const flangeGeo = new THREE.RingGeometry(2.2, 2.55, 32);
  flangeGeo.rotateX(-Math.PI / 2);
  const flangeMesh = new THREE.Mesh(flangeGeo, matSteel);
  flangeMesh.position.y = 0.4;
  root.add(flangeMesh);

  // Sun Gear (Center) - moves along +Y during explode
  const sunGear = createSpurGearMesh(14, 0.55, 0.7, 0.2, matBronze);
  sunGear.position.y = explodedProgress * 1.8;
  root.add(sunGear);

  // Planet Gears (3 distributed radially) - expand outward & downward during explode
  const numPlanets = 3;
  const orbitRadius = 1.25;

  for (let i = 0; i < numPlanets; i++) {
    const angle = (i / numPlanets) * Math.PI * 2;
    const planetGear = createSpurGearMesh(18, 0.42, 0.65, 0.15, matSteel);

    const radialOffset = explodedProgress * 0.8;
    const currentRadius = orbitRadius + radialOffset;

    planetGear.position.x = Math.cos(angle) * currentRadius;
    planetGear.position.z = Math.sin(angle) * currentRadius;
    planetGear.position.y = -explodedProgress * 0.6;
    planetGear.rotation.y = angle * 2;
    root.add(planetGear);

    // Planet Pin
    const pinGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.1, 16);
    const pinMesh = new THREE.Mesh(pinGeo, matSteel);
    pinMesh.position.copy(planetGear.position);
    pinMesh.position.y += explodedProgress * 0.4;
    root.add(pinMesh);
  }

  // Planet Carrier (Bottom plate) - moves downward during explode
  const carrierGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.25, 36);
  const carrierMesh = new THREE.Mesh(carrierGeo, matSteel);
  carrierMesh.position.y = -0.55 - explodedProgress * 1.5;
  root.add(carrierMesh);

  // Shaft on carrier
  const shaftGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.2, 24);
  const shaftMesh = new THREE.Mesh(shaftGeo, matSteel);
  shaftMesh.position.y = -1.1 - explodedProgress * 2.0;
  root.add(shaftMesh);

  return root;
}

/**
 * 02 / Injection Mould Tool Assembly
 */
export function createMouldAssembly(
  wireframe = false,
  explodedProgress = 0,
  clippingPlanes: THREE.Plane[] = []
): THREE.Group {
  const root = new THREE.Group();

  const matSteel = getEngineeringMaterial("titanium", wireframe, clippingPlanes);
  const matCavity = getEngineeringMaterial("chrome", wireframe, clippingPlanes);
  const matCore = getEngineeringMaterial("graphite", wireframe, clippingPlanes);
  const matCopper = getEngineeringMaterial("brass", wireframe, clippingPlanes);

  // A-Plate (Cavity Plate) - Top, moves upward
  const aPlateGeo = new THREE.BoxGeometry(3.2, 0.7, 3.2);
  const aPlate = new THREE.Mesh(aPlateGeo, matSteel);
  aPlate.position.y = 0.8 + explodedProgress * 1.8;
  root.add(aPlate);

  // Cavity Inserts inside A-Plate
  const cavityInsertGeo = new THREE.CylinderGeometry(0.5, 0.6, 0.3, 24);
  const cavityInsert1 = new THREE.Mesh(cavityInsertGeo, matCavity);
  cavityInsert1.position.set(-0.8, -0.25, -0.8);
  aPlate.add(cavityInsert1);

  const cavityInsert2 = new THREE.Mesh(cavityInsertGeo, matCavity);
  cavityInsert2.position.set(0.8, -0.25, 0.8);
  aPlate.add(cavityInsert2);

  // B-Plate (Core Plate) - Bottom, moves downward
  const bPlateGeo = new THREE.BoxGeometry(3.2, 0.7, 3.2);
  const bPlate = new THREE.Mesh(bPlateGeo, matSteel);
  bPlate.position.y = -0.8 - explodedProgress * 1.8;
  root.add(bPlate);

  // Core Inserts on B-Plate
  const coreInsertGeo = new THREE.CylinderGeometry(0.48, 0.55, 0.45, 24);
  const coreInsert1 = new THREE.Mesh(coreInsertGeo, matCore);
  coreInsert1.position.set(-0.8, 0.3, -0.8);
  bPlate.add(coreInsert1);

  const coreInsert2 = new THREE.Mesh(coreInsertGeo, matCore);
  coreInsert2.position.set(0.8, 0.3, 0.8);
  bPlate.add(coreInsert2);

  // Guided Leader Pins (4 corners)
  const pinGeo = new THREE.CylinderGeometry(0.14, 0.14, 2.6, 16);
  const corners = [
    [-1.3, -1.3],
    [1.3, -1.3],
    [-1.3, 1.3],
    [1.3, 1.3],
  ];

  corners.forEach(([x, z]) => {
    const pin = new THREE.Mesh(pinGeo, matSteel);
    pin.position.set(x, 0, z);
    root.add(pin);
  });

  // Cooling Line tubes (copper color)
  const tubeGeo = new THREE.TorusGeometry(1.2, 0.06, 8, 24);
  const tubeMesh = new THREE.Mesh(tubeGeo, matCopper);
  tubeMesh.rotateX(Math.PI / 2);
  tubeMesh.position.y = 0.2;
  root.add(tubeMesh);

  return root;
}

/**
 * 03 / Sheet Metal Enclosure Chassis with Flat-to-Folded state
 */
export function createSheetMetalChassis(
  wireframe = false,
  explodedProgress = 0,
  clippingPlanes: THREE.Plane[] = []
): THREE.Group {
  const root = new THREE.Group();
  const matSheet = getEngineeringMaterial("titanium", wireframe, clippingPlanes);
  const matCover = getEngineeringMaterial("graphite", wireframe, clippingPlanes);

  // Bottom Tray Base
  const baseGeo = new THREE.BoxGeometry(3.4, 0.06, 2.4);
  const baseMesh = new THREE.Mesh(baseGeo, matSheet);
  baseMesh.position.y = -0.4;
  root.add(baseMesh);

  // Side Flanges (Bends)
  const sideFlangeGeo = new THREE.BoxGeometry(0.06, 0.8, 2.4);
  const leftFlange = new THREE.Mesh(sideFlangeGeo, matSheet);
  leftFlange.position.set(-1.67, 0, 0);
  root.add(leftFlange);

  const rightFlange = new THREE.Mesh(sideFlangeGeo, matSheet);
  rightFlange.position.set(1.67, 0, 0);
  root.add(rightFlange);

  // Front Panel with Perforated Visual Array
  const frontFlangeGeo = new THREE.BoxGeometry(3.4, 0.8, 0.06);
  const frontFlange = new THREE.Mesh(frontFlangeGeo, matSheet);
  frontFlange.position.set(0, 0, 1.17);
  root.add(frontFlange);

  // Top Cover (removable / exploded)
  const coverGeo = new THREE.BoxGeometry(3.48, 0.06, 2.48);
  const coverMesh = new THREE.Mesh(coverGeo, matCover);
  coverMesh.position.y = 0.42 + explodedProgress * 1.5;
  root.add(coverMesh);

  // Internal divider baffle
  const baffleGeo = new THREE.BoxGeometry(0.06, 0.6, 1.8);
  const baffleMesh = new THREE.Mesh(baffleGeo, matSheet);
  baffleMesh.position.set(0.4, 0.1, 0);
  root.add(baffleMesh);

  return root;
}

/**
 * 04 / Handheld Diagnostic Ergonomic Housing
 */
export function createHandheldHousing(
  wireframe = false,
  explodedProgress = 0,
  clippingPlanes: THREE.Plane[] = []
): THREE.Group {
  const root = new THREE.Group();
  const matBody = getEngineeringMaterial("graphite", wireframe, clippingPlanes);
  const matGrip = getEngineeringMaterial("titanium", wireframe, clippingPlanes);
  const matGlass = getEngineeringMaterial("chrome", wireframe, clippingPlanes);

  // Top Shell - moves up
  const topShellGeo = new THREE.BoxGeometry(1.6, 0.4, 3.2);
  const topShell = new THREE.Mesh(topShellGeo, matBody);
  topShell.position.y = 0.3 + explodedProgress * 1.2;
  root.add(topShell);

  // Display Screen Bezel
  const screenGeo = new THREE.BoxGeometry(1.2, 0.05, 1.4);
  const screenMesh = new THREE.Mesh(screenGeo, matGlass);
  screenMesh.position.set(0, 0.22, 0.4);
  topShell.add(screenMesh);

  // Bottom Shell - moves down
  const bottomShellGeo = new THREE.BoxGeometry(1.6, 0.45, 3.2);
  const bottomShell = new THREE.Mesh(bottomShellGeo, matBody);
  bottomShell.position.y = -0.3 - explodedProgress * 1.2;
  root.add(bottomShell);

  // Ergonomic Overmolded Grip Ribs
  for (let z = -1.0; z <= 0.8; z += 0.3) {
    const gripGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.7, 12);
    gripGeo.rotateZ(Math.PI / 2);
    const grip = new THREE.Mesh(gripGeo, matGrip);
    grip.position.set(0, 0, z);
    bottomShell.add(grip);
  }

  // Internal PCB Plate (mid-layer)
  const pcbGeo = new THREE.BoxGeometry(1.4, 0.04, 2.9);
  const pcbMat = new THREE.MeshStandardMaterial({
    color: 0x1e3a1e,
    metalness: 0.6,
    roughness: 0.4,
    clippingPlanes,
  });
  const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
  pcbMesh.position.y = 0;
  root.add(pcbMesh);

  return root;
}

/**
 * 05 / Mould Flow Thermal / Melt Front Progression Mesh
 */
export function createMouldFlowMesh(
  wireframe = false,
  flowProgress = 0.7,
  clippingPlanes: THREE.Plane[] = []
): THREE.Group {
  const group = new THREE.Group();

  const width = 3.0;
  const height = 0.4;
  const depth = 2.0;

  const geometry = new THREE.BoxGeometry(width, height, depth, 32, 8, 24);
  const count = geometry.attributes.position.count;
  const colors = new Float32Array(count * 3);
  const pos = geometry.attributes.position;

  // Color false-gradient: blue (start) -> cyan -> green -> yellow -> red (melt front)
  for (let i = 0; i < count; i++) {
    const x = pos.getX(i);
    // Normalized distance from injection gate at x = -1.5
    const norm = (x + 1.5) / 3.0;

    const r = Math.min(1.0, Math.max(0.0, (norm - 0.5) * 2));
    const g = 1.0 - Math.abs(norm - 0.5) * 1.8;
    const b = Math.min(1.0, Math.max(0.0, (0.5 - norm) * 2));

    colors[i * 3] = r;
    colors[i * 3 + 1] = Math.max(0.2, g);
    colors[i * 3 + 2] = b;
  }

  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.MeshStandardMaterial({
    vertexColors: !wireframe,
    color: wireframe ? 0xa3e635 : 0xffffff,
    wireframe,
    roughness: 0.3,
    metalness: 0.2,
    clippingPlanes,
  });

  const mesh = new THREE.Mesh(geometry, mat);
  group.add(mesh);

  // Injection gate nozzle indicator
  const nozzleGeo = new THREE.ConeGeometry(0.18, 0.4, 16);
  nozzleGeo.rotateZ(Math.PI / 2);
  const nozzleMat = new THREE.MeshBasicMaterial({ color: 0xa3e635 });
  const nozzle = new THREE.Mesh(nozzleGeo, nozzleMat);
  nozzle.position.set(-1.6, 0, 0);
  group.add(nozzle);

  return group;
}

/**
 * 06 / Topology Optimization Bracket
 */
export function createTopologyBracket(
  wireframe = false,
  clippingPlanes: THREE.Plane[] = []
): THREE.Group {
  const root = new THREE.Group();
  const mat = getEngineeringMaterial("titanium", wireframe, clippingPlanes);

  // Pivot Eyelet (Top)
  const eyeletGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.6, 32);
  const eyelet = new THREE.Mesh(eyeletGeo, mat);
  eyelet.position.set(0, 1.2, 0);
  eyelet.rotateZ(Math.PI / 2);
  root.add(eyelet);

  // Center Bore Ring
  const ringGeo = new THREE.TorusGeometry(0.5, 0.15, 16, 32);
  const ring = new THREE.Mesh(ringGeo, mat);
  ring.position.set(0, 1.2, 0);
  root.add(ring);

  // Generative organic load-aligned strut legs
  const leg1Geo = new THREE.CylinderGeometry(0.22, 0.35, 1.8, 16);
  const leg1 = new THREE.Mesh(leg1Geo, mat);
  leg1.position.set(-0.7, 0.2, 0);
  leg1.rotation.z = 0.45;
  root.add(leg1);

  const leg2Geo = new THREE.CylinderGeometry(0.22, 0.35, 1.8, 16);
  const leg2 = new THREE.Mesh(leg2Geo, mat);
  leg2.position.set(0.7, 0.2, 0);
  leg2.rotation.z = -0.45;
  root.add(leg2);

  // Cross structural web tie
  const tieGeo = new THREE.BoxGeometry(1.6, 0.2, 0.4);
  const tie = new THREE.Mesh(tieGeo, mat);
  tie.position.set(0, 0.1, 0);
  root.add(tie);

  // Base Mounting Flange
  const baseGeo = new THREE.BoxGeometry(2.4, 0.3, 1.2);
  const base = new THREE.Mesh(baseGeo, mat);
  base.position.set(0, -0.9, 0);
  root.add(base);

  return root;
}
