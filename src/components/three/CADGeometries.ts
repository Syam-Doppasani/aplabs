import * as THREE from "three";

/**
 * Material generator for engineering finishes
 */
export function getEngineeringMaterial(
  mode: "titanium" | "graphite" | "brass" | "chrome" | "gold" | "steel" | "wireframe" | "flow",
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
        color: 0x181a18,
        roughness: 0.42,
        metalness: 0.78,
        clippingPlanes,
        clipShadows: true,
      });
    case "gold":
    case "brass":
      return new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        roughness: 0.22,
        metalness: 0.88,
        clippingPlanes,
        clipShadows: true,
      });
    case "chrome":
      return new THREE.MeshStandardMaterial({
        color: 0xe8e8e8,
        roughness: 0.12,
        metalness: 0.96,
        clippingPlanes,
        clipShadows: true,
      });
    case "steel":
      return new THREE.MeshStandardMaterial({
        color: 0x7c858c,
        roughness: 0.3,
        metalness: 0.82,
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

// ─────────────────────────────────────────────────────────────
// 01. GUN: Precision Tactical Handgun Slide Assembly
// (Modeled after Screenshot 2026-02-10 155705.png & Screenshot 2026-02-06 145909.png)
// ─────────────────────────────────────────────────────────────
export function createGunSlideAssembly(
  wireframe = false,
  explodedVal = 0,
  clippingPlanes: THREE.Plane[] = []
): THREE.Group {
  const root = new THREE.Group();

  const bodyMat = getEngineeringMaterial("graphite", wireframe, clippingPlanes);
  const goldMat = getEngineeringMaterial("gold", wireframe, clippingPlanes);
  const barrelMat = getEngineeringMaterial("chrome", wireframe, clippingPlanes);
  const accentMat = wireframe
    ? bodyMat
    : new THREE.MeshStandardMaterial({
        color: 0xa3e635,
        roughness: 0.3,
        metalness: 0.7,
        clippingPlanes,
      });

  // Main Slide Body (Graphite Nitride finish)
  const slideGroup = new THREE.Group();
  const slideLength = 3.8;
  const slideHeight = 0.85;
  const slideWidth = 0.68;

  const mainBoxGeo = new THREE.BoxGeometry(slideLength, slideHeight, slideWidth);
  const mainBox = new THREE.Mesh(mainBoxGeo, bodyMat);
  slideGroup.add(mainBox);

  // Top Accent Plate (Gold TiN PVD top plate, matching Screenshot 2026-02-06)
  const topPlateGroup = new THREE.Group();
  topPlateGroup.position.y = (slideHeight / 2 + 0.06) + explodedVal * 0.8;
  const topPlateGeo = new THREE.BoxGeometry(slideLength * 0.96, 0.1, slideWidth * 0.92);
  const topPlate = new THREE.Mesh(topPlateGeo, goldMat);
  topPlateGroup.add(topPlate);

  // Rear Sight on top plate
  const rearSightGeo = new THREE.BoxGeometry(0.3, 0.22, 0.5);
  const rearSight = new THREE.Mesh(rearSightGeo, bodyMat);
  rearSight.position.set(-slideLength * 0.42, 0.12, 0);
  topPlateGroup.add(rearSight);

  // Front Sight post on top plate
  const frontSightGeo = new THREE.BoxGeometry(0.12, 0.16, 0.14);
  const frontSight = new THREE.Mesh(frontSightGeo, goldMat);
  frontSight.position.set(slideLength * 0.44, 0.1, 0);
  topPlateGroup.add(frontSight);

  root.add(topPlateGroup);

  // 8-Port Compensator Vent Holes (4 pairs of oval ports near the front)
  const portRadius = 0.08;
  const portDepth = 0.08;
  const portGeo = new THREE.CylinderGeometry(portRadius, portRadius, portDepth, 16);
  portGeo.rotateX(Math.PI / 2);

  for (let side = -1; side <= 1; side += 2) {
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 4; col++) {
        const portMesh = new THREE.Mesh(portGeo, goldMat);
        const xOffset = slideLength * 0.1 + col * 0.26;
        const yOffset = row === 0 ? 0.12 : -0.14;
        const zOffset = side * (slideWidth / 2 + 0.01);
        portMesh.position.set(xOffset, yOffset, zOffset);
        slideGroup.add(portMesh);
      }
    }
  }

  // Angled Rear Cocking Serrations (22° angled grooves at the back)
  const serrationGeo = new THREE.BoxGeometry(0.04, slideHeight * 0.72, 0.03);
  serrationGeo.rotateZ(0.38); // ~22 degrees

  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 7; i++) {
      const serration = new THREE.Mesh(serrationGeo, goldMat);
      serration.position.set(
        -slideLength * 0.4 + i * 0.12,
        -0.02,
        side * (slideWidth / 2 + 0.01)
      );
      slideGroup.add(serration);
    }
  }

  // Front Muzzle Ring / Bushing (Gold accent matching screenshot)
  const muzzleRingGeo = new THREE.TorusGeometry(0.18, 0.045, 16, 32);
  muzzleRingGeo.rotateY(Math.PI / 2);
  const muzzleRing = new THREE.Mesh(muzzleRingGeo, goldMat);
  muzzleRing.position.set(slideLength / 2 + 0.01, 0.08, 0);
  slideGroup.add(muzzleRing);

  // Front Muzzle Face with Barrel opening
  const muzzleFaceGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.05, 24);
  muzzleFaceGeo.rotateZ(Math.PI / 2);
  const muzzleFace = new THREE.Mesh(muzzleFaceGeo, bodyMat);
  muzzleFace.position.set(slideLength / 2 + 0.02, 0.08, 0);
  slideGroup.add(muzzleFace);

  root.add(slideGroup);

  // Precision Barrel (Separates forward on exploded view)
  const barrelGroup = new THREE.Group();
  barrelGroup.position.x = explodedVal * 1.6;
  const barrelGeo = new THREE.CylinderGeometry(0.14, 0.14, slideLength * 0.95, 24);
  barrelGeo.rotateZ(Math.PI / 2);
  const barrelMesh = new THREE.Mesh(barrelGeo, barrelMat);
  barrelMesh.position.set(0.1, 0.08, 0);
  barrelGroup.add(barrelMesh);

  // Recoil Spring Guide Rod (Drops down on exploded view)
  const guideRodGroup = new THREE.Group();
  guideRodGroup.position.y = -explodedVal * 0.7;
  guideRodGroup.position.x = explodedVal * 0.8;
  const rodGeo = new THREE.CylinderGeometry(0.06, 0.06, slideLength * 0.85, 16);
  rodGeo.rotateZ(Math.PI / 2);
  const rodMesh = new THREE.Mesh(rodGeo, accentMat);
  rodMesh.position.set(-0.1, -0.22, 0);
  guideRodGroup.add(rodMesh);

  root.add(barrelGroup);
  root.add(guideRodGroup);

  root.rotation.y = -0.45;
  root.rotation.x = 0.2;
  return root;
}

// ─────────────────────────────────────────────────────────────
// 02. DAM: Hydroelectric Spillway & Sluice Dam Structure
// (Modeled after Screenshot 2026-01-28 141106.png)
// ─────────────────────────────────────────────────────────────
export function createDamSpillwayAssembly(
  wireframe = false,
  explodedVal = 0,
  clippingPlanes: THREE.Plane[] = []
): THREE.Group {
  const root = new THREE.Group();

  const concreteMat = getEngineeringMaterial("titanium", wireframe, clippingPlanes);
  const waterApronMat = wireframe
    ? concreteMat
    : new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.15,
        metalness: 0.35,
        clippingPlanes,
      });
  const pierMat = getEngineeringMaterial("steel", wireframe, clippingPlanes);
  const gateMat = getEngineeringMaterial("gold", wireframe, clippingPlanes);

  const damWidth = 4.6;
  const baseDepth = 2.2;
  const baseHeight = 0.7;

  // 1. Concrete Foundation Block
  const baseGeo = new THREE.BoxGeometry(damWidth, baseHeight, baseDepth);
  const baseMesh = new THREE.Mesh(baseGeo, concreteMat);
  baseMesh.position.set(0, -baseHeight / 2, 0);
  root.add(baseMesh);

  // 2. High Crest Wall with Top Roadway Deck
  const crestWallGeo = new THREE.BoxGeometry(damWidth, 0.85, 0.45);
  const crestWall = new THREE.Mesh(crestWallGeo, concreteMat);
  crestWall.position.set(0, 0.42, -baseDepth / 2 + 0.22);
  root.add(crestWall);

  // 3. Sluice Gate Piers (Array of 9 vertical piers creating 8 sluice bays)
  const numPiers = 9;
  const pierSpacing = damWidth / (numPiers - 1);
  const pierHeight = 0.95;
  const pierGeo = new THREE.BoxGeometry(0.14, pierHeight, 0.55);

  const gatesGroup = new THREE.Group();
  gatesGroup.position.y = explodedVal * 0.9;

  for (let i = 0; i < numPiers; i++) {
    const xPos = -damWidth / 2 + i * pierSpacing;
    const pier = new THREE.Mesh(pierGeo, pierMat);
    pier.position.set(xPos, 0.85, -baseDepth / 2 + 0.35);
    root.add(pier);

    // Sluice Gate between piers
    if (i < numPiers - 1) {
      const gateWidth = pierSpacing - 0.16;
      const gateGeo = new THREE.BoxGeometry(gateWidth, 0.55, 0.06);
      const gate = new THREE.Mesh(gateGeo, gateMat);
      gate.position.set(xPos + pierSpacing / 2, 0.7, -baseDepth / 2 + 0.35);
      gatesGroup.add(gate);
    }
  }
  root.add(gatesGroup);

  // 4. Curved Ogee Spillway Chute (Water discharge apron)
  const apronWidth = damWidth * 0.88;
  const apronLength = 1.35;
  const apronGeo = new THREE.BoxGeometry(apronWidth, 0.08, apronLength);
  apronGeo.rotateX(0.24); // Sloped discharge angle
  const apronMesh = new THREE.Mesh(apronGeo, waterApronMat);
  apronMesh.position.set(0, 0.08, 0.2);
  root.add(apronMesh);

  // 5. Spillway Side Chute Training Walls
  const wallGeo = new THREE.BoxGeometry(0.12, 0.45, apronLength * 1.05);
  wallGeo.rotateX(0.24);
  const leftWall = new THREE.Mesh(wallGeo, concreteMat);
  leftWall.position.set(-apronWidth / 2 - 0.06, 0.25, 0.2);
  root.add(leftWall);

  const rightWall = new THREE.Mesh(wallGeo, concreteMat);
  rightWall.position.set(apronWidth / 2 + 0.06, 0.25, 0.2);
  root.add(rightWall);

  // 6. Submerged Penstock Intake Tube
  const penstockGeo = new THREE.CylinderGeometry(0.28, 0.28, 1.2, 24);
  penstockGeo.rotateX(Math.PI / 2);
  const penstockMesh = new THREE.Mesh(penstockGeo, pierMat);
  penstockMesh.position.set(-damWidth * 0.32, -baseHeight * 0.65, 0.5);
  root.add(penstockMesh);

  root.rotation.y = 0.55;
  root.rotation.x = 0.32;
  return root;
}

// ─────────────────────────────────────────────────────────────
// 03. BATMAN BLADE: Aerodynamic Batarang Tactical Blade
// (Modeled after SolidWorks part in Batman blade.mp4 & Batman_blade_frame.jpg)
// ─────────────────────────────────────────────────────────────
export function createBatmanBladeAssembly(
  wireframe = false,
  explodedVal = 0,
  clippingPlanes: THREE.Plane[] = []
): THREE.Group {
  const root = new THREE.Group();

  const carbonMat = wireframe
    ? getEngineeringMaterial("wireframe")
    : new THREE.MeshStandardMaterial({
        color: 0x1a1e1d,
        roughness: 0.38,
        metalness: 0.72,
        clippingPlanes,
      });

  const edgeMat = getEngineeringMaterial("chrome", wireframe, clippingPlanes);
  const accentMat = getEngineeringMaterial("brass", wireframe, clippingPlanes);

  // Construct precise Batarang 2D contour shape
  const shape = new THREE.Shape();
  // Start at center bat head notch
  shape.moveTo(0, 0.45);
  // Left ear
  shape.lineTo(-0.16, 0.85);
  shape.lineTo(-0.28, 0.6);
  // Left wing upper curve out to sharp wingtip
  shape.bezierCurveTo(-0.7, 0.95, -1.8, 1.55, -2.6, 2.0);
  // Left wingtip corner
  shape.lineTo(-2.65, 1.85);
  // Left wing bottom profile (sweeping back inward)
  shape.bezierCurveTo(-1.9, 0.7, -1.0, 0.1, -0.6, -0.25);
  // Left scallop notch
  shape.bezierCurveTo(-0.55, -0.05, -0.35, -0.1, -0.2, -0.45);
  // Bottom center tail point
  shape.lineTo(0, -0.9);
  // Right scallop notch
  shape.lineTo(0.2, -0.45);
  shape.bezierCurveTo(0.35, -0.1, 0.55, -0.05, 0.6, -0.25);
  // Right wing bottom profile
  shape.bezierCurveTo(1.0, 0.1, 1.9, 0.7, 2.65, 1.85);
  // Right wingtip corner
  shape.lineTo(2.6, 2.0);
  // Right wing upper curve back in
  shape.bezierCurveTo(1.8, 1.55, 0.7, 0.95, 0.28, 0.6);
  // Right ear
  shape.lineTo(0.16, 0.85);
  shape.lineTo(0, 0.45);

  // Left eye cutout hole
  const leftEye = new THREE.Path();
  leftEye.moveTo(-0.12, 0.38);
  leftEye.lineTo(-0.22, 0.28);
  leftEye.lineTo(-0.1, 0.24);
  leftEye.closePath();
  shape.holes.push(leftEye);

  // Right eye cutout hole
  const rightEye = new THREE.Path();
  rightEye.moveTo(0.12, 0.38);
  rightEye.lineTo(0.22, 0.28);
  rightEye.lineTo(0.1, 0.24);
  rightEye.closePath();
  shape.holes.push(rightEye);

  // Extrude with slight bevel
  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 1,
    depth: 0.08,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.03,
    bevelSegments: 3,
  };

  const bladeGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  bladeGeo.center();

  const bladeMesh = new THREE.Mesh(bladeGeo, carbonMat);
  root.add(bladeMesh);

  // Perimeter Beveled Chrome Cutting Edge Accent
  if (!wireframe) {
    const edgeGeo = new THREE.EdgesGeometry(bladeGeo, 24);
    const edgeLine = new THREE.LineSegments(
      edgeGeo,
      new THREE.LineBasicMaterial({ color: 0xa3e635, linewidth: 2 })
    );
    root.add(edgeLine);
  }

  // Center Grip / Balancing Core Pin
  const pinGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.16, 16);
  pinGeo.rotateX(Math.PI / 2);
  const pinMesh = new THREE.Mesh(pinGeo, accentMat);
  pinMesh.position.set(0, 0, 0);
  root.add(pinMesh);

  root.rotation.x = -0.55;
  root.rotation.z = -0.15;
  return root;
}

// ─────────────────────────────────────────────────────────────
// 04. WATCH: Precision Horological Timepiece Assembly
// (Modeled after watch.mp4 & Screenshot 2026-11-19 214926.png in Creo Parametric)
// ─────────────────────────────────────────────────────────────
export function createWatchAssembly(
  wireframe = false,
  explodedVal = 0,
  clippingPlanes: THREE.Plane[] = []
): THREE.Group {
  const root = new THREE.Group();

  const goldMat = getEngineeringMaterial("gold", wireframe, clippingPlanes);
  const steelMat = getEngineeringMaterial("steel", wireframe, clippingPlanes);
  const dialMat = wireframe
    ? getEngineeringMaterial("wireframe")
    : new THREE.MeshStandardMaterial({
        color: 0x0f254e, // Deep Sunburst Cobalt Blue
        roughness: 0.32,
        metalness: 0.5,
        clippingPlanes,
      });

  const crystalMat = wireframe
    ? goldMat
    : new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.9,
        opacity: 0.85,
        transparent: true,
        roughness: 0.05,
        ior: 1.77,
        clippingPlanes,
      });

  const caseRadius = 1.35;
  const caseHeight = 0.52;

  // 1. Monobloc Gold Watch Case Body
  const caseGeo = new THREE.CylinderGeometry(caseRadius, caseRadius * 0.94, caseHeight, 64);
  const caseMesh = new THREE.Mesh(caseGeo, goldMat);
  root.add(caseMesh);

  // 2. Contoured Watch Lugs (4 corner lugs at 10, 2, 4, 8 o'clock)
  const lugGeo = new THREE.BoxGeometry(0.24, caseHeight * 0.9, 0.65);
  lugGeo.rotateX(0.22); // Ergonomic wrist curve

  const lugPositions = [
    { x: -caseRadius * 0.68, z: -caseRadius * 0.88, rotY: -0.3 },
    { x: caseRadius * 0.68, z: -caseRadius * 0.88, rotY: 0.3 },
    { x: -caseRadius * 0.68, z: caseRadius * 0.88, rotY: 0.3 },
    { x: caseRadius * 0.68, z: caseRadius * 0.88, rotY: -0.3 },
  ];

  lugPositions.forEach((pos) => {
    const lug = new THREE.Mesh(lugGeo, goldMat);
    lug.position.set(pos.x, -0.06, pos.z);
    lug.rotation.y = pos.rotY;
    root.add(lug);
  });

  // 3. Screw-Down Crown at 3 o'clock
  const crownGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.3, 24);
  crownGeo.rotateZ(Math.PI / 2);
  const crownMesh = new THREE.Mesh(crownGeo, goldMat);
  crownMesh.position.set(caseRadius + 0.15, 0, 0);
  root.add(crownMesh);

  // 4. 60-Flute Gold Bezel (Explodes upwards)
  const bezelGroup = new THREE.Group();
  bezelGroup.position.y = caseHeight / 2 + 0.06 + explodedVal * 0.65;

  const bezelBaseGeo = new THREE.CylinderGeometry(caseRadius * 1.02, caseRadius * 1.02, 0.14, 64);
  const bezelBase = new THREE.Mesh(bezelBaseGeo, goldMat);
  bezelGroup.add(bezelBase);

  // 60 Flutes around perimeter
  const fluteGeo = new THREE.BoxGeometry(0.04, 0.14, 0.06);
  const numFlutes = 60;
  for (let i = 0; i < numFlutes; i++) {
    const angle = (i / numFlutes) * Math.PI * 2;
    const flute = new THREE.Mesh(fluteGeo, goldMat);
    flute.position.x = Math.cos(angle) * (caseRadius * 1.02);
    flute.position.z = Math.sin(angle) * (caseRadius * 1.02);
    flute.rotation.y = -angle;
    bezelGroup.add(flute);
  }
  root.add(bezelGroup);

  // 5. Deep Cobalt Blue Dial (Explodes slightly)
  const dialGroup = new THREE.Group();
  dialGroup.position.y = caseHeight / 2 + 0.02 + explodedVal * 0.25;

  const dialGeo = new THREE.CylinderGeometry(caseRadius * 0.82, caseRadius * 0.82, 0.03, 48);
  const dialMesh = new THREE.Mesh(dialGeo, dialMat);
  dialGroup.add(dialMesh);

  // 12 Applied Gold Hour Indices
  const indexGeo = new THREE.BoxGeometry(0.06, 0.03, 0.18);
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const marker = new THREE.Mesh(indexGeo, goldMat);
    const r = caseRadius * 0.65;
    marker.position.set(Math.cos(angle) * r, 0.025, Math.sin(angle) * r);
    marker.rotation.y = -angle;
    dialGroup.add(marker);
  }

  // Watch Hands (Pointing at ~10:10)
  const hourHandGeo = new THREE.BoxGeometry(0.05, 0.02, 0.45);
  const hourHand = new THREE.Mesh(hourHandGeo, goldMat);
  hourHand.position.set(-0.16, 0.04, -0.16);
  hourHand.rotation.y = 0.78;
  dialGroup.add(hourHand);

  const minuteHandGeo = new THREE.BoxGeometry(0.04, 0.02, 0.65);
  const minuteHand = new THREE.Mesh(minuteHandGeo, goldMat);
  minuteHand.position.set(0.24, 0.05, -0.24);
  minuteHand.rotation.y = -0.78;
  dialGroup.add(minuteHand);

  // Center Hand Pivot Cap
  const capGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.06, 16);
  const capMesh = new THREE.Mesh(capGeo, goldMat);
  capMesh.position.set(0, 0.06, 0);
  dialGroup.add(capMesh);

  root.add(dialGroup);

  // 6. Sapphire Crystal Glass (Explodes highest)
  const crystalGroup = new THREE.Group();
  crystalGroup.position.y = caseHeight / 2 + 0.12 + explodedVal * 1.1;
  const crystalGeo = new THREE.CylinderGeometry(caseRadius * 0.84, caseRadius * 0.84, 0.04, 48);
  const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
  crystalGroup.add(crystalMesh);
  root.add(crystalGroup);

  // 7. Caseback (Separates downward on exploded view)
  const casebackGroup = new THREE.Group();
  casebackGroup.position.y = -caseHeight / 2 - 0.04 - explodedVal * 0.6;
  const casebackGeo = new THREE.CylinderGeometry(caseRadius * 0.96, caseRadius * 0.9, 0.06, 48);
  const casebackMesh = new THREE.Mesh(casebackGeo, steelMat);
  casebackGroup.add(casebackMesh);
  root.add(casebackGroup);

  root.rotation.x = 0.75;
  root.rotation.y = -0.4;
  return root;
}

// ─────────────────────────────────────────────────────────────
// Supporting Geometries (Retained for Showcase & Fallbacks)
// ─────────────────────────────────────────────────────────────
export function createPlanetaryAssembly(
  materialMode: "titanium" | "graphite" | "brass" | "chrome" | "wireframe" = "titanium",
  wireframe = false,
  explodeAmount = 0,
  clippingPlanes: THREE.Plane[] = []
): THREE.Group {
  return createWatchAssembly(wireframe, explodeAmount, clippingPlanes);
}

export function createSheetMetalChassis(
  wireframe = false,
  explodeAmount = 0,
  clippingPlanes: THREE.Plane[] = []
): THREE.Group {
  return createBatmanBladeAssembly(wireframe, explodeAmount, clippingPlanes);
}

export function createTopologyBracket(
  wireframe = false,
  clippingPlanes: THREE.Plane[] = []
): THREE.Group {
  return createGunSlideAssembly(wireframe, 0, clippingPlanes);
}
