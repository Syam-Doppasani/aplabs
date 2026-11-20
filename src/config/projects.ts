/**
 * AP LABS — Verified Engineering Projects & Portfolio Data
 *
 * Source of truth for portfolio showcases:
 * 1. Tactical Modular Gun Assembly (Gun)
 * 2. Hydraulic Dam Spillway & Barrage (Dam)
 * 3. Aerodynamic Batman Tactical Blade (Batman Blade)
 * 4. Precision Luxury Mechanical Watch (Watch)
 */

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface TechnicalAnnotation {
  id: string;
  title: string;
  description: string;
  position: [number, number, number];
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
  modelType: "gun" | "dam" | "blade" | "watch";
  isFeatured?: boolean;
  wireframeAvailable: boolean;
  explodedAvailable: boolean;
  crossSectionAvailable: boolean;
  annotations: TechnicalAnnotation[];
  schematicType: "svg-gun" | "svg-dam" | "svg-blade" | "svg-watch";
  mediaVideo?: string;
  mediaImages?: string[];
}

export const portfolioCategories = [
  "All Projects",
  "Mechanical Part Design",
  "3D CAD Modelling",
  "Sheet Metal Design",
  "Product Design",
  "Assembly Design",
  "3D Printer Designs",
  "Design Optimization",
] as const;

export const projectsData: ProjectItem[] = [
  {
    id: "tactical-firearm-assembly",
    slug: "tactical-firearm-assembly",
    title: "Tactical Modular Firearm Slide & Assembly",
    categories: ["Mechanical Part Design", "Product Design", "3D CAD Modelling"],
    primaryCategory: "Mechanical Part Design",
    shortDescription:
      "Precision CNC-machined tactical firearm slide featuring aggressive forward cocking serrations, barrel porting, weight-reduction window cuts, and an optics-ready mounting cut.",
    fullDescription:
      "Engineered for high-cycle reciprocating duty. The component balances slide mass against recoil spring inertia to optimize cycling velocity, reduce muzzle flip, and maintain strict ±0.005 mm internal rail tolerances for smooth frame interface.",
    engineeringChallenge:
      "Machining complex multi-axis serrations and skeletonized lightening pockets while maintaining structural rigidity across the ejection port during high-pressure chamber discharges.",
    designApproach:
      "Modeled in Creo Parametric / SolidWorks with parametric tool clearances. Integrated 45° chamfered edge transitions, deep cocking serrations for positive traction, and direct-thread optics footprint.",
    technicalObservations: [
      "Angled forward and rear slide serrations provide maximum positive grip under wet conditions.",
      "Top skeleton windows optimize reciprocating mass without weakening lockup surfaces.",
      "Precision-machined internal guide rail slots with Ra 0.4 µm micro-finish.",
    ],
    specs: [
      { label: "Machining Method", value: "5-Axis CNC Milling" },
      { label: "Tolerance Class", value: "±0.005 mm Critical Rails" },
      { label: "Optic Footprint", value: "Direct RMR / Shield Cut" },
      { label: "Surface Finish", value: "DLC / Cerakote Black & Gold" },
      { label: "Serration Angle", value: "30° Reverse Incline" },
    ],
    materials: ["416R Stainless Steel", "Aircraft Grade 7075-T6 Billet"],
    cadFormats: ["STEP AP242", "Parasolid (.x_t)", "Native Creo / SolidWorks"],
    modelType: "gun",
    isFeatured: true,
    wireframeAvailable: true,
    explodedAvailable: true,
    crossSectionAvailable: true,
    schematicType: "svg-gun",
    mediaImages: ["/media/gun-slide.png", "/media/gun-profile.png", "/media/gun-optic.png"],
    annotations: [
      {
        id: "cocking-serrations",
        title: "Tactical Slide Serrations",
        description: "Angled CNC-milled grooves for positive weapon manipulation.",
        position: [-1.2, 0.4, 0.3],
      },
      {
        id: "barrel-port",
        title: "Ventilated Barrel Port",
        description: "Lightweight cutout allowing rapid gas escape and barrel cooling.",
        position: [1.1, 0.3, 0],
      },
      {
        id: "optic-mount",
        title: "Optics-Ready Footprint",
        description: "Recessed mounting deck for micro reflex sights with locating recoil lugs.",
        position: [-0.6, 0.6, 0],
      },
    ],
  },
  {
    id: "hydraulic-dam-structure",
    slug: "hydraulic-dam-structure",
    title: "Hydraulic Dam Spillway & Barrage Structure",
    categories: ["Assembly Design", "3D CAD Modelling"],
    primaryCategory: "Assembly Design",
    shortDescription:
      "Large-scale hydraulic infrastructure CAD assembly detailing multi-gate crest spillways, concrete dividing piers, sluice channels, and base flume foundations.",
    fullDescription:
      "Engineered to model hydrodynamic flow regulation and flood discharge control. Includes multi-bay sluice gate assemblies with mechanical lift guides, ogee-profile spillway transitions, and bottom foundation dissipator channels.",
    engineeringChallenge:
      "Managing massive multi-body structural alignments and hydrostatic pressure load cases across a 12-bay crest barrage while ensuring modular sluice gate interchangeability.",
    designApproach:
      "Utilized hierarchical top-down assembly architecture in SolidWorks/Creo. Applied hydraulic grade lines to shape the spillway ogee curve and placed reinforced concrete pier buttresses to withstand river thrust.",
    technicalObservations: [
      "12-bay continuous radial spillway gate arrangement with guided pier slots.",
      "Streamlined pier noses to minimize hydrodynamic turbulence and vortex cavitation.",
      "Integrated downstream energy dissipation apron with chute blocks.",
    ],
    specs: [
      { label: "Structure Type", value: "Gravity Barrage & Crest Spillway" },
      { label: "Spillway Profile", value: "Standard Ogee Curve" },
      { label: "Gate Mechanism", value: "Hydraulic Radial Sluice Gates" },
      { label: "BOM Assembly", value: "38 Top-Level Sub-Assemblies" },
      { label: "CAD Environment", value: "SolidWorks Professional Assembly" },
    ],
    materials: ["Reinforced Grade 50 Concrete", "A36 Structural Steel Gates", "Stainless Sluice Seals"],
    cadFormats: ["STEP AP214", "Native SolidWorks Assembly", "Parasolid"],
    modelType: "dam",
    isFeatured: true,
    wireframeAvailable: true,
    explodedAvailable: false,
    crossSectionAvailable: true,
    schematicType: "svg-dam",
    mediaImages: ["/media/dam-structure.png"],
    annotations: [
      {
        id: "pier-nose",
        title: "Hydrodynamic Pier Nose",
        description: "Aerodynamic concrete divider reducing upstream eddy currents.",
        position: [0, 1.0, 1.2],
      },
      {
        id: "crest-chute",
        title: "Spillway Ogee Chute",
        description: "Curvilinear discharge surface mapped to high-velocity water trajectories.",
        position: [0, 0.2, -0.4],
      },
      {
        id: "gate-slots",
        title: "Vertical Sluice Gate Slots",
        description: "Machined steel guide tracks embedded in concrete for gate deployment.",
        position: [0.8, 0.8, 0.6],
      },
    ],
  },
  {
    id: "batman-tactical-blade",
    slug: "batman-tactical-blade",
    title: "Aerodynamic Batman Tactical Batarang Blade",
    categories: ["3D Printer Designs", "Product Design", "3D CAD Modelling"],
    primaryCategory: "3D Printer Designs",
    shortDescription:
      "Aerodynamic bat-wing tactical blade engineered with dual sweep wings, symmetrical center grip balance, bevelled slicing edges, and additive 3D print readiness.",
    fullDescription:
      "Inspired by superhero lore and tactical aerodynamic principles. Designed with dual sweeping crescent wings, central finger ring for rotational deployment, and faceted bevelled outer contours for optimal flight stability and high-impact structural strength.",
    engineeringChallenge:
      "Creating an aggressive aerodynamic profile that can be cleanly 3D printed (FDM / SLA / SLS) without overhang support collapse while preserving razor-thin perimeter blade bevels.",
    designApproach:
      "Designed with self-supporting 45° chamfer transitions and balanced mass distribution around the central rotational hub. Includes relief cutouts for weight reduction and high-grip finger jimping.",
    technicalObservations: [
      "Dual crescent wing geometry with optimized aerodynamic lift and spin stability.",
      "Center grip hole engineered with chamfered inner ring for ergonomic finger spin.",
      "Optimized for 0.12mm layer height 3D printing and waterjet titanium cutting.",
    ],
    specs: [
      { label: "Wingspan Length", value: "240.00 mm Overall" },
      { label: "Center Thickness", value: "4.50 mm Structural" },
      { label: "Edge Bevel", value: "Compound 30° Bevel" },
      { label: "Manufacturing", value: "3D Print (FDM/SLA) & CNC Waterjet" },
      { label: "Center Balance", value: "Neutral Mass Centroid (0,0)" },
    ],
    materials: ["PLA+ / PETG / Carbon Fiber Nylon", "Ti-6Al-4V Grade 5 Titanium", "6061-T6 Aluminum"],
    cadFormats: ["STL High-Density Mesh", "STEP AP242", "OBJ", "Native Parametric Solid"],
    modelType: "blade",
    isFeatured: true,
    wireframeAvailable: true,
    explodedAvailable: false,
    crossSectionAvailable: true,
    schematicType: "svg-blade",
    mediaVideo: "/media/batman-blade.mp4",
    annotations: [
      {
        id: "wing-tip",
        title: "Swept Wing Tip",
        description: "Aerodynamic wing tips generating trailing vortex stability during spin.",
        position: [1.6, 0.5, 0],
      },
      {
        id: "center-grip",
        title: "Center Ergonomic Hub",
        description: "Bevelled finger index hole and balanced inertia pivot point.",
        position: [0, 0, 0],
      },
      {
        id: "blade-bevel",
        title: "Compound Cutting Edge",
        description: "Faceted razor bevel engineered for rapid penetration and clean slicing.",
        position: [-1.2, -0.4, 0],
      },
    ],
  },
  {
    id: "luxury-mechanical-watch",
    slug: "luxury-mechanical-watch",
    title: "Precision Luxury Mechanical Watch Assembly",
    categories: ["Product Design", "Mechanical Part Design", "Assembly Design"],
    primaryCategory: "Product Design",
    shortDescription:
      "Luxury timepiece housing modeled in Creo Parametric 12 featuring fluted outer bezel, engraved hour ring, sapphire crystal seal channel, and integrated strap lugs.",
    fullDescription:
      "Modeled strictly in Creo Parametric 12 with a complete feature tree (extrusions, revolves, patterns, mirror symmetries, and cosmetic threading). The multi-body assembly incorporates an external fluted bezel, dial plate with 'NANI' branding, internal movement chamber, and precision crown winding stem.",
    engineeringChallenge:
      "Constraining a complex 41mm luxury watch assembly with 120 fluted bezel teeth and micron-level sapphire crystal compression gasket fits without feature regen failures in Creo.",
    designApproach:
      "Constructed datum-driven parametric sketches with pattern relations. Modeled the case body, screw-down caseback, fluted bezel ring, and dial index markers as separate mating bodies.",
    technicalObservations: [
      "Fluted outer bezel with 12 radial hour indicator notches.",
      "Dial face with engraved radial index tracks and custom 'NANI' gold insignia.",
      "Dual contoured 20mm strap lugs engineered with drilled spring bar sockets.",
    ],
    specs: [
      { label: "Case Diameter", value: "Ø 41.00 mm Nominal" },
      { label: "Lug-to-Lug Distance", value: "48.50 mm" },
      { label: "Strap Width", value: "20.00 mm Standard" },
      { label: "Water Resistance", value: "10 ATM Gasket Groove" },
      { label: "CAD System", value: "Creo Parametric 12 (Full Tree)" },
    ],
    materials: ["316L Surgical Stainless Steel", "18K Gold PVD", "Sapphire Crystal Glass"],
    cadFormats: ["Creo Assembly (.asm / .prt)", "STEP AP242", "Parasolid"],
    modelType: "watch",
    isFeatured: true,
    wireframeAvailable: true,
    explodedAvailable: true,
    crossSectionAvailable: true,
    schematicType: "svg-watch",
    mediaVideo: "/media/watch.mp4",
    mediaImages: ["/media/watch-cad.png"],
    annotations: [
      {
        id: "fluted-bezel",
        title: "Fluted Gold Bezel",
        description: "Precision-milled radial notches catching and reflecting light.",
        position: [0, 0.4, 1.2],
      },
      {
        id: "dial-face",
        title: "Branded Dial Face",
        description: "Royal blue and gold dial plate with hour tick markers and 'NANI' typography.",
        position: [0, 0.25, 0],
      },
      {
        id: "case-lugs",
        title: "Integrated Strap Lugs",
        description: "Ergonomically curved lugs with spring-bar retention blind bores.",
        position: [1.2, -0.2, 0.8],
      },
    ],
  },
];
