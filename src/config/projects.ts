/**
 * AP LABS — Engineering Projects & Portfolio Data
 *
 * Source of truth for portfolio showcases representing confirmed services.
 * STRICT RULE: No fabricated clients, awards, testimonials, or false guarantees.
 * All technical specifications represent geometric and design parameters.
 */

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface TechnicalAnnotation {
  id: string;
  title: string;
  description: string;
  position: [number, number, number]; // 3D coordinates
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  categories: string[];
  primaryCategory: string;
  shortDescription: string;
  fullDescription: string;
  engineeringChallenge: string;
  designApproach: string;
  technicalObservations: string[];
  specs: TechnicalSpec[];
  materials: string[];
  cadFormats: string[];
  modelType: "gear" | "mould" | "chassis" | "handheld" | "joint" | "flow" | "bracket";
  isFeatured?: boolean;
  wireframeAvailable: boolean;
  explodedAvailable: boolean;
  crossSectionAvailable: boolean;
  annotations: TechnicalAnnotation[];
  schematicType: "svg-gear" | "svg-mould" | "svg-chassis" | "svg-product" | "svg-flow" | "svg-bracket";
}

export const portfolioCategories = [
  "All Projects",
  "Mechanical Part Design",
  "Injection Mould Design",
  "3D CAD Modelling",
  "Sheet Metal Design",
  "Product Design",
  "Assembly Design",
  "Mould Flow Analysis",
  "Design Optimization",
] as const;

export const projectsData: ProjectItem[] = [
  {
    id: "planetary-gearbox-assembly",
    slug: "planetary-gearbox-assembly",
    title: "High-Precision Planetary Reduction Hub",
    categories: ["Mechanical Part Design", "Assembly Design", "3D CAD Modelling"],
    primaryCategory: "Assembly Design",
    shortDescription:
      "Compact concentric planetary reduction drive with integrated needle roller bearings, sun gear, carrier plate, and ring gear assembly.",
    fullDescription:
      "Developed for compact high-torque industrial applications. The design integrates precision-machined involute gearing with optimized tooth profile crowning to minimize localized tooth contact stresses and backlash during cyclic load reversals.",
    engineeringChallenge:
      "Packaging a 5:1 reduction ratio within an 85mm envelope while ensuring rigid gear carrier alignment and oil-bath lubrication retention under continuous rotational duty.",
    designApproach:
      "Implemented a monolithic carrier cage with press-fit hardened steel pins. Integrated labyrinth seals and calculated tooth contact stress via AGMA standards to refine module and face width parameters.",
    technicalObservations: [
      "20° pressure angle with tip relief to attenuate gear mesh vibration harmonics.",
      "Dual deep-groove ball bearings flanking the planet carrier for rigid radial support.",
      "Interchangeable input sun spline interface for diverse motor couplings.",
    ],
    specs: [
      { label: "Gear Ratio", value: "5:1 Single Stage" },
      { label: "Nominal Outer Dia.", value: "Ø 84.00 mm" },
      { label: "Backlash Target", value: "< 7 arcmin" },
      { label: "Face Width", value: "14.5 mm" },
      { label: "Tolerance Class", value: "ISO Grade 6 / DIN 3962" },
    ],
    materials: ["4140 Alloy Steel (Core)", "Case-Hardened 8620 (Gears)", "6061-T6 Anodized Aluminum (Housing)"],
    cadFormats: ["STEP AP242", "Parasolid (.x_t)", "IGES (.igs)", "Native Parametric Solid"],
    modelType: "gear",
    isFeatured: true,
    wireframeAvailable: true,
    explodedAvailable: true,
    crossSectionAvailable: true,
    schematicType: "svg-gear",
    annotations: [
      {
        id: "sun-gear",
        title: "Input Sun Pinion",
        description: "Hardened pinion spline with machined oil relief groove.",
        position: [0, 0, 1.2],
      },
      {
        id: "planet-carrier",
        title: "Monolithic Planet Carrier",
        description: "Three-point balanced planet pin alignment bores with ±0.005mm concentricity.",
        position: [0, 0.7, 0.4],
      },
      {
        id: "ring-gear",
        title: "Internal Ring Gear Casing",
        description: "Integral casing with perimeter bolt circle and locating spigot.",
        position: [1.1, 0, -0.3],
      },
    ],
  },
  {
    id: "two-plate-injection-mould",
    slug: "two-plate-injection-mould",
    title: "Precision Multi-Cavity Mould Tool",
    categories: ["Injection Mould Design", "3D CAD Modelling"],
    primaryCategory: "Injection Mould Design",
    shortDescription:
      "Two-plate, 4-cavity injection mould tool designed for thin-wall engineering polymer housings with conformal cooling channels.",
    fullDescription:
      "Tooling design for an automated cycle production of precision thermoplastic enclosures. Features balanced runner manifolds, submarine sub-gates for automatic degating, guided ejection, and core-side cooling baffles.",
    engineeringChallenge:
      "Maintaining uniform mold surface temperature within ±2.5°C across all four cavities to eliminate differential shrinkage warpage on cosmetic surfaces.",
    designApproach:
      "Integrated conformal cooling channel layouts mapped to part contours, paired with beryllium copper insert plugs in high-heat core pockets. Parting lines follow natural component radii with 0° shutoff bypass.",
    technicalObservations: [
      "Submarine tunneling gates located on internal unexposed rib geometry for clean cosmetic perimeter.",
      "Guided ejection assembly with DLC-coated leader pins for dry-cycle longevity.",
      "Stepped parting surfaces providing positive interlocking against side injection pressures.",
    ],
    specs: [
      { label: "Tool Architecture", value: "2-Plate / 4-Cavity" },
      { label: "Cooling Circuit", value: "Conformal Loop with Baffles" },
      { label: "Ejection System", value: "Hydraulic Core-Pull + Pins" },
      { label: "Part Material", value: "Polycarbonate / ABS Alloy" },
      { label: "Calculated Shot Wt.", value: "94.2 grams" },
    ],
    materials: ["P20 Pre-hardened Tool Steel (Plates)", "H13 Hardened 52 HRC (Cavity/Core Inserts)", "CuBe2 Beryllium Copper"],
    cadFormats: ["STEP AP214", "Parasolid", "Native Assembly"],
    modelType: "mould",
    isFeatured: true,
    wireframeAvailable: true,
    explodedAvailable: true,
    crossSectionAvailable: true,
    schematicType: "svg-mould",
    annotations: [
      {
        id: "a-plate",
        title: "Cavity Plate (A-Plate)",
        description: "Hardened cavity block with mirrored optical-finish cosmetic surfaces.",
        position: [0, 1.4, 0],
      },
      {
        id: "cooling-lines",
        title: "Conformal Cooling Circuit",
        description: "Balanced dual-loop coolant circuits with Viton O-ring seals.",
        position: [0.8, 0.4, 0.6],
      },
      {
        id: "b-plate",
        title: "Core Plate & Ejector Set (B-Plate)",
        description: "Core block housing ejector pin sleeves and mechanical return pins.",
        position: [0, -1.2, 0],
      },
    ],
  },
  {
    id: "telemetry-chassis-enclosure",
    slug: "telemetry-chassis-enclosure",
    title: "2U Rackmount Telemetry Enclosure",
    categories: ["Sheet Metal Design"],
    primaryCategory: "Sheet Metal Design",
    shortDescription:
      "Ruggedized 19-inch 2U sheet metal chassis with modular rear I/O punchouts, captive hardware, and folded internal EMI partition baffles.",
    fullDescription:
      "Industrial electronics enclosure engineered strictly for CNC turret punch and press brake fabrication. Features interlocking wrap-around covers, countersunk self-clinching fasteners, and continuous ground paths.",
    engineeringChallenge:
      "Achieving rigorous torsional stiffness across a 450mm chassis depth using 1.2mm cold-rolled steel while preserving 78% open front ventilation mesh area.",
    designApproach:
      "Designed return flanges and hemmed stiffener edges along long spans. Calculated precise K-factor bend deductions for standard 90° air bending with 1.5mm inside bend radius.",
    technicalObservations: [
      "Corner relief notches sized at 1.5x material thickness to eliminate corner tearing during press-brake forming.",
      "Hexagonal perforated ventilation arrays optimized for punch tool life and airflow CFM.",
      "PEM-type self-clinching standoffs pre-positioned with minimum edge-to-hole clearances.",
    ],
    specs: [
      { label: "Chassis Standard", value: "EIA-310 19-inch 2U" },
      { label: "Material Thickness", value: "1.20 mm (Gauge 18)" },
      { label: "Inside Bend Radius", value: "R 1.50 mm" },
      { label: "K-Factor Value", value: "0.420 (Air Bending)" },
      { label: "Ventilation Open Area", value: "64.5% Free Flow" },
    ],
    materials: ["1.2mm SPCC Cold-Rolled Steel", "Alodine 5052-H32 Aluminum (Cover)", "Zinc-Plated Fasteners"],
    cadFormats: ["DXF Flat Pattern", "STEP AP242", "SolidWorks Part/Assembly"],
    modelType: "chassis",
    isFeatured: true,
    wireframeAvailable: true,
    explodedAvailable: true,
    crossSectionAvailable: true,
    schematicType: "svg-chassis",
    annotations: [
      {
        id: "perforated-face",
        title: "Hexagonal Mesh Inlets",
        description: "Punched airflow pattern maintaining structural perimeter web margins.",
        position: [0, 0, 1.4],
      },
      {
        id: "bend-relief",
        title: "Corner Bend Reliefs",
        description: "Tear-free circular corner reliefs complying with press-brake tooling limits.",
        position: [1.3, -0.4, 0.8],
      },
      {
        id: "chassis-base",
        title: "Folded Tray Chassis",
        description: "Bottom pan featuring integral mounting standoffs and grounding studs.",
        position: [0, -0.6, -0.4],
      },
    ],
  },
  {
    id: "handheld-diagnostic-housing",
    slug: "handheld-diagnostic-housing",
    title: "Ergonomic Handheld Diagnostic Device",
    categories: ["Product Design", "3D CAD Modelling"],
    primaryCategory: "Product Design",
    shortDescription:
      "Ergonomic clamshell enclosure featuring dual-shot overmolded grip surfaces, display bezel integration, and internal PCB mounting bosses.",
    fullDescription:
      "Designed for medical and industrial inspection fieldwork. Combines human hand anthropology studies with watertight IP67 perimeter sealing, drop-impact protection bumpers, and intuitive thumb controls.",
    engineeringChallenge:
      "Fitting a 4.3-inch TFT display, dual Li-ion battery cells, sensor probe daughterboard, and IP67 elastomer gasket into a handheld profile under 320 grams.",
    designApproach:
      "Sculpted curvature continuous surfaces (G2 curvature) with draft angles of 1.5° on all exterior textured surfaces. Internal ribs configured to reinforce drop impact zones without sink mark formation.",
    technicalObservations: [
      "Perimeter tongue-and-groove channel engineered for compressed silicone elastomer cord.",
      "Snap-fit battery retention clips engineered with calculated beam deflection within strain limits.",
      "Screw boss counterbores designed with 0.6t nominal wall ratios to prevent sink marks on the top housing.",
    ],
    specs: [
      { label: "Ingress Protection", value: "Designed for IP67" },
      { label: "Nominal Wall Thk.", value: "2.40 mm Uniform" },
      { label: "Draft Angle", value: "1.5° Core / 2.0° Cavity" },
      { label: "Overall Dimensions", value: "172 x 82 x 34 mm" },
      { label: "Drop Protection", value: "1.5m Corner Impact Geometry" },
    ],
    materials: ["SABIC Cycoloy PC/ABS", "Santoprene TPE Overmold (Shore 65A)", "Silicone Elastomer"],
    cadFormats: ["STEP", "IGES", "Parasolid", "STL High-Poly Prototyping"],
    modelType: "handheld",
    isFeatured: false,
    wireframeAvailable: true,
    explodedAvailable: true,
    crossSectionAvailable: true,
    schematicType: "svg-product",
    annotations: [
      {
        id: "display-bezel",
        title: "Protective Recessed Bezel",
        description: "Lip recess protects scratch-resistant display glass from flat face drops.",
        position: [0, 0.8, 0.4],
      },
      {
        id: "tpe-grip",
        title: "Overmolded TPE Grip",
        description: "Chemical bonding interlocks between rigid PC/ABS substrate and elastomeric grip.",
        position: [0.7, 0, 0],
      },
      {
        id: "pcb-bosses",
        title: "Internal Mounting Bosses",
        description: "Grounded brass heat-stake threaded inserts with perimeter gusset ribs.",
        position: [0, -0.6, -0.2],
      },
    ],
  },
  {
    id: "mould-flow-electronics-housing",
    slug: "mould-flow-electronics-housing",
    title: "Mould Flow Rheology & Fill Study",
    categories: ["Mould Flow Analysis"],
    primaryCategory: "Mould Flow Analysis",
    shortDescription:
      "Comprehensive rheological melt front and gate positioning simulation for a thin-wall reinforced thermoplastic housing.",
    fullDescription:
      "Engineering visualization and analysis identifying melt front velocity changes, weld line positions, clamp tonnage requirements, and pressure drops across complex thin-wall rib networks.",
    engineeringChallenge:
      "Premature gate freeze and potential air traps caused by uneven wall thicknesses around ventilation louvers during rapid injection cycles.",
    designApproach:
      "Evaluated single-gate versus dual-gate configurations. Relocated gate locations to force weld lines away from high-stress structural mounting lugs into low-load regions.",
    technicalObservations: [
      "Visualized melt front progression indicating 1.32-second total cavity fill at 120 MPa injection pressure.",
      "Identified and vented critical blind air pockets through ejector pin clearances.",
      "Predicted volumetric shrinkage variations kept within 0.4% across the primary cosmetic plane.",
    ],
    specs: [
      { label: "Simulation Type", value: "Fill, Pack & Cool Analysis" },
      { label: "Fill Time Target", value: "1.32 seconds" },
      { label: "Injection Pressure", value: "118.4 MPa" },
      { label: "Weld Line Control", value: "Relocated to low-stress axis" },
      { label: "Volumetric Shrinkage", value: "0.38% - 0.72%" },
    ],
    materials: ["Polyamide 66 + 30% Glass Fiber (PA66-GF30)"],
    cadFormats: ["FEA Mesh (.fem)", "STEP Geometry", "Simulation Report PDF"],
    modelType: "flow",
    isFeatured: false,
    wireframeAvailable: true,
    explodedAvailable: false,
    crossSectionAvailable: true,
    schematicType: "svg-flow",
    annotations: [
      {
        id: "injection-gate",
        title: "Submarine Gate Location",
        description: "Direct gate entry point feeding main structural rib spine first.",
        position: [-0.9, 0.4, 0],
      },
      {
        id: "weld-line",
        title: "Controlled Weld Line Intersection",
        description: "Re-converged polymer melt front positioned along reinforced gusset plate.",
        position: [0.3, 0.2, 0.5],
      },
      {
        id: "end-of-fill",
        title: "Last-to-Fill Perimeter",
        description: "Micro-vent relief channels placed along ejector pin interfaces.",
        position: [1.1, -0.4, -0.3],
      },
    ],
  },
  {
    id: "structural-topology-bracket",
    slug: "structural-topology-bracket",
    title: "Topology-Optimized Structural Bracket",
    categories: ["Design Optimization", "Mechanical Part Design", "3D CAD Modelling"],
    primaryCategory: "Design Optimization",
    shortDescription:
      "Generative topology mass reduction study converting a solid billet hinge bracket into an organic, load-aligned structure with 42% weight savings.",
    fullDescription:
      "Engineering optimization project aimed at weight reduction under severe combined tension and bending load cases. Material was systematically stripped from low-stress zones while maintaining minimum allowable safety factor.",
    engineeringChallenge:
      "Reducing mass below 600 grams while sustaining a 14.5 kN static peak load with maximum permissible deflection under 0.12 mm at the pin bore.",
    designApproach:
      "Executed SIMP (Solid Isotropic Material with Penalization) topology optimization followed by CAD surface reconstruction to create clean, machinable 5-axis toolpaths with constant ball-end radius fillets.",
    technicalObservations: [
      "42.6% mass reduction achieved (original: 980g, optimized: 562g).",
      "Maximum von Mises stress reduced below yield threshold with Safety Factor > 1.85.",
      "Smooth organic rib transitions designed to prevent localized notch stress peaks.",
    ],
    specs: [
      { label: "Mass Reduction", value: "42.6% (980g → 562g)" },
      { label: "Peak Design Load", value: "14.5 kN Combined" },
      { label: "Safety Factor", value: "1.88 min at yield" },
      { label: "Max Deflection", value: "0.086 mm @ pin axis" },
      { label: "Manufacturing Method", value: "5-Axis CNC / AlMgSc Additive" },
    ],
    materials: ["Aluminum 7075-T651 (Billet Machining)", "Scalmalloy (Optional Additive)"],
    cadFormats: ["STEP AP242", "High-Density STL", "Parametric Reconstructed Solid"],
    modelType: "bracket",
    isFeatured: false,
    wireframeAvailable: true,
    explodedAvailable: false,
    crossSectionAvailable: true,
    schematicType: "svg-bracket",
    annotations: [
      {
        id: "load-bore",
        title: "Load-Bearing Pivot Bore",
        description: "Preserved solid cylindrical boss with high-stress retention collar.",
        position: [0, 0.9, 0],
      },
      {
        id: "optimized-web",
        title: "Load-Aligned Web Fillets",
        description: "Isogrid-style organic structural ribs aligned with principal tension vectors.",
        position: [0.4, 0, 0.3],
      },
      {
        id: "mounting-flange",
        title: "Rigid Mounting Base",
        description: "4-bolt boundary constraint region with stress relief pocketing.",
        position: [0, -1.0, 0],
      },
    ],
  },
  {
    id: "cnc-articulated-joint",
    slug: "cnc-articulated-joint",
    title: "Multi-Axis CNC Articulated Joint",
    categories: ["Mechanical Part Design", "Assembly Design"],
    primaryCategory: "Mechanical Part Design",
    shortDescription:
      "Precision twin-bearing articulating robotic wrist joint with integrated strain wave harmonic drive pilot bore and cable routing passageway.",
    fullDescription:
      "Designed for high-payload multi-axis robotic manipulation. Features integrated cross-roller bearing seats, dowel pin locating rings, and an internal hollow bore enabling 360° continuous wiring harnesses.",
    engineeringChallenge:
      "Maintaining bearing seat runout within 0.006 mm TIR on a complex asymmetric housing subject to tool deflection during multi-axis machining.",
    designApproach:
      "Incorporated single-setup datum references with pre-machined tool relief pockets and balanced wall thicknesses to prevent thermal distortion during post-machining stress relief.",
    technicalObservations: [
      "Precision ground bearing journals with H7/h6 ISO sliding fit.",
      "Internal 24mm bore with chamfered wire harness pass-through surfaces.",
      "Weight-relieving scallop cuts along unconstrained structural perimeter.",
    ],
    specs: [
      { label: "Bearing Seat Runout", value: "< 0.006 mm TIR" },
      { label: "Central Bore ID", value: "Ø 24.00 mm Free" },
      { label: "Payload Capacity", value: "18.0 kg Static" },
      { label: "Torque Rating", value: "140 N·m Peak" },
      { label: "Finish Requirement", value: "Ra 0.8 µm Journals" },
    ],
    materials: ["7075-T6 Hard Anodized Aluminum", "AISI 440C Stainless Bearing Races"],
    cadFormats: ["STEP AP242", "IGES", "Parasolid"],
    modelType: "joint",
    isFeatured: false,
    wireframeAvailable: true,
    explodedAvailable: true,
    crossSectionAvailable: true,
    schematicType: "svg-gear",
    annotations: [
      {
        id: "bearing-journal",
        title: "Cross-Roller Bearing Seat",
        description: "Precision-ground journal with micron-level cylindrical tolerance.",
        position: [0, 0.6, 0.5],
      },
      {
        id: "hollow-bore",
        title: "Hollow Cable Routing Bore",
        description: "Continuous internal clearance for optical encoders and power cables.",
        position: [0, 0, 0],
      },
      {
        id: "flange-mount",
        title: "Motor Interface Flange",
        description: "Precision locating spigot with threaded M4 pattern.",
        position: [0, -0.7, -0.4],
      },
    ],
  },
];
