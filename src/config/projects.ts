/**
 * AP LABS — Verified Engineering Projects & Portfolio Data
 *
 * All assets originate directly from studio archives in assets/ and assets/aplabsworkproof/
 * Core Featured Projects:
 * 1. Tactical Modular Firearm Slide & Assembly (Gun)
 * 2. Hydraulic Dam Spillway & Barrage Structure (Dam)
 * 3. Aerodynamic Batman Tactical Batarang Blade (Batman Blade)
 * 4. Precision Luxury Mechanical Watch Assembly (Watch)
 * Extended Verified Workproof Records:
 * 5. Heavy-Duty Split Plummer Block Bearing Assembly
 * 6. High-Performance IC Engine Piston Assembly
 * 7. Centrifugal Blower & Cooling-Fin Engine Assembly
 * 8. Precision Stamped Sheet Metal Mounting Bracket
 * 9. Modular Commercial Workstation Cubicle Assembly
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
  cadSoftwareName?: string;
  modelType: "gun" | "dam" | "blade" | "watch";
  isFeatured?: boolean;
  wireframeAvailable: boolean;
  explodedAvailable: boolean;
  crossSectionAvailable: boolean;
  annotations: TechnicalAnnotation[];
  schematicType: "svg-gun" | "svg-dam" | "svg-blade" | "svg-watch";
  thumbnailImage: string;
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
    cadSoftwareName: "Creo / SolidWorks",
    shortDescription:
      "Precision CNC-machined tactical firearm slide featuring aggressive forward cocking serrations, 8 barrel compensator ports, weight-reduction window cuts, and an optics-ready mounting cut.",
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
    thumbnailImage: "/media/gun-slide.png",
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
    id: "luxury-mechanical-watch",
    slug: "luxury-mechanical-watch",
    title: "Precision Luxury Mechanical Watch Assembly",
    categories: ["Product Design", "Mechanical Part Design", "Assembly Design"],
    primaryCategory: "Product Design",
    cadSoftwareName: "Creo Parametric 12",
    shortDescription:
      "Luxury timepiece housing modeled in Creo Parametric 12 featuring fluted outer bezel, royal blue sunburst dial with gold hour tick marks, 'NaNi' insignia, and integrated strap lugs.",
    fullDescription:
      "Modeled strictly in Creo Parametric 12 with a complete feature tree (extrusions, revolves, patterns, mirror symmetries, and cosmetic threading). The multi-body assembly incorporates an external fluted bezel, dial plate with custom 'NaNi' branding, internal movement chamber, and precision crown winding stem.",
    engineeringChallenge:
      "Constraining a complex 41mm luxury watch assembly with 120 fluted bezel teeth and micron-level sapphire crystal compression gasket fits without feature regen failures in Creo.",
    designApproach:
      "Constructed datum-driven parametric sketches with pattern relations. Modeled the case body, screw-down caseback, fluted bezel ring, and dial index markers as separate mating bodies.",
    technicalObservations: [
      "Fluted outer bezel with 12 radial hour indicator notches.",
      "Dial face with engraved radial index tracks and custom 'NaNi' gold insignia.",
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
    thumbnailImage: "/media/watch-detail.png",
    mediaVideo: "/media/watch.mp4",
    mediaImages: ["/media/watch-detail.png", "/media/watch-cad.png"],
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
        description: "Royal blue and gold dial plate with hour tick markers and 'NaNi' typography.",
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
  {
    id: "batman-tactical-blade",
    slug: "batman-tactical-blade",
    title: "Aerodynamic Batman Tactical Batarang Blade",
    categories: ["3D Printer Designs", "Product Design", "Sheet Metal Design"],
    primaryCategory: "3D Printer Designs",
    cadSoftwareName: "SolidWorks 2025 SP1.2",
    shortDescription:
      "Aerodynamic bat-wing tactical blade engineered with dual sweep wings, carbon fiber weave texture, symmetrical center grip balance, bevelled slicing edges, and additive 3D print readiness.",
    fullDescription:
      "Modeled in SolidWorks 2025 with sheet-metal base flanges, cut-extrudes, and flat patterns. Designed with dual sweeping crescent wings, central finger ring for rotational deployment, and faceted outer contours for optimal flight stability and high-impact structural strength.",
    engineeringChallenge:
      "Creating an aggressive aerodynamic profile that can be cleanly 3D printed (FDM / SLA / SLS) without overhang support collapse while preserving razor-thin perimeter blade bevels.",
    designApproach:
      "Designed with self-supporting 45° chamfer transitions and balanced mass distribution around the central rotational hub. Includes relief cutouts for weight reduction and high-grip finger jimping.",
    technicalObservations: [
      "Dual crescent wing geometry with optimized aerodynamic lift and spin stability.",
      "Zoltek Panex 33 carbon-composite material specification.",
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
    cadFormats: ["STL High-Density Mesh", "STEP AP242", "OBJ", "Native SolidWorks Part"],
    modelType: "blade",
    isFeatured: true,
    wireframeAvailable: true,
    explodedAvailable: false,
    crossSectionAvailable: true,
    schematicType: "svg-blade",
    thumbnailImage: "/media/batman-blade-cad.jpg",
    mediaVideo: "/media/batman-blade.mp4",
    mediaImages: ["/media/batman-blade-cad.jpg"],
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
    id: "hydraulic-dam-structure",
    slug: "hydraulic-dam-structure",
    title: "Hydraulic Dam Spillway & Barrage Structure",
    categories: ["Assembly Design", "3D CAD Modelling"],
    primaryCategory: "Assembly Design",
    cadSoftwareName: "SolidWorks Assembly",
    shortDescription:
      "Large-scale hydraulic infrastructure CAD assembly detailing multi-gate crest spillways, concrete dividing piers, sluice channels, and base flume foundations.",
    fullDescription:
      "Engineered to model hydrodynamic flow regulation and flood discharge control. Includes multi-bay sluice gate assemblies with mechanical lift guides, ogee-profile spillway transitions, and bottom foundation dissipator channels.",
    engineeringChallenge:
      "Managing massive multi-body structural alignments and hydrostatic pressure load cases across a multi-bay crest barrage while ensuring modular sluice gate interchangeability.",
    designApproach:
      "Utilized hierarchical top-down assembly architecture in SolidWorks/Creo. Applied hydraulic grade lines to shape the spillway ogee curve and placed reinforced concrete pier buttresses to withstand river thrust.",
    technicalObservations: [
      "Continuous radial spillway gate arrangement with guided pier slots.",
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
    thumbnailImage: "/media/dam-structure.png",
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
    id: "plummer-block-bearing",
    slug: "plummer-block-bearing",
    title: "Split Plummer Block Bearing Housing",
    categories: ["Assembly Design", "Mechanical Part Design", "3D CAD Modelling"],
    primaryCategory: "Assembly Design",
    cadSoftwareName: "SolidWorks Mechanical",
    shortDescription:
      "Heavy-duty cast iron split plummer block pedestal bearing featuring stepped phosphor bronze bushings, high-tensile cap bolts, and grease lubrication zerk.",
    fullDescription:
      "Designed for industrial transmission shafts carrying radial and thrust loads. Incorporates a split casting architecture with precision dowel pin registration, integrated base mounting slots, and an internal grease reservoir channel.",
    engineeringChallenge:
      "Achieving uniform clamping pressure across split brass journal shells without inducing bore ovality under dynamic shaft rotational speeds.",
    designApproach:
      "Engineered with finite-element-verified cast ribbing, relief recesses on parting surfaces, and clearance bolt holes for foundation alignment.",
    technicalObservations: [
      "Split phosphor bronze bushing shells with anti-rotation locating tabs.",
      "Dual hex-head clamping cap bolts with machined lock washer counterbores.",
      "Base mounting flange with elongated slots for precision shaft center-line alignment.",
    ],
    specs: [
      { label: "Shaft Bore", value: "Ø 50.00 mm H7 Fit" },
      { label: "Housing Material", value: "Class 30 Gray Cast Iron" },
      { label: "Bush Material", value: "SAE 660 Bronze Split Shells" },
      { label: "Fasteners", value: "Grade 8.8 High-Tensile Bolts" },
      { label: "Lubrication", value: "Central Grease Port M10x1" },
    ],
    materials: ["Gray Cast Iron GG-25", "SAE 660 Leaded Bronze", "Medium Carbon Steel"],
    cadFormats: ["STEP AP242", "Parasolid (.x_t)", "Native SolidWorks Part"],
    modelType: "watch",
    wireframeAvailable: true,
    explodedAvailable: false,
    crossSectionAvailable: true,
    schematicType: "svg-gun",
    thumbnailImage: "/media/plummer-block.png",
    mediaImages: ["/media/plummer-block.png"],
    annotations: [
      {
        id: "brass-bush",
        title: "Split Bronze Bushing",
        description: "Dual-half friction sleeve with oil groove channels.",
        position: [0, 0.2, 0],
      },
    ],
  },
  {
    id: "high-performance-piston",
    slug: "high-performance-piston",
    title: "High-Performance IC Engine Piston Assembly",
    categories: ["Mechanical Part Design", "Product Design", "Design Optimization"],
    primaryCategory: "Mechanical Part Design",
    cadSoftwareName: "SolidWorks Aerospace",
    shortDescription:
      "Metallic red hard-anodized forged piston featuring 3 compression ring grooves, precision wrist pin bore with circlip grooves, and asymmetrical skirt mass-relief pockets.",
    fullDescription:
      "Engineered for high-RPM motorsport and light aircraft engine applications. Features an optimized thermal crown profile, strutted internal pin boss supports, and slipper-type skirt geometry to reduce frictional reciprocating losses.",
    engineeringChallenge:
      "Balancing high cylinder combustion thermal expansion against bore clearance tolerances to eliminate cold slap while preventing high-load scuffing.",
    designApproach:
      "Utilized complex revolving and 3D lofted profile cuts in SolidWorks. Parametrically tuned crown thickness and ring land spacing for thermal heat transfer into the cylinder walls.",
    technicalObservations: [
      "3-ring pack: top compression, scraper ring, and oil control ring groove.",
      "Hard anodized crimson finish with micro-dimpled skirt lubricant retention.",
      "Precision-honed wrist pin bore with dual circlip wire retaining grooves.",
    ],
    specs: [
      { label: "Bore Diameter", value: "Ø 84.00 mm Nominal" },
      { label: "Wrist Pin Bore", value: "Ø 22.00 mm (+0.005 / -0.000)" },
      { label: "Ring Land Width", value: "1.2mm / 1.5mm / 2.8mm" },
      { label: "Alloy Spec", value: "Forged 2618-T6 High-Silicon" },
      { label: "Finish", value: "Crimson Hard Anodize Type III" },
    ],
    materials: ["2618-T6 Forged Aluminum", "Case-Hardened 9310 Steel Pin"],
    cadFormats: ["STEP AP242", "Parasolid", "Native SolidWorks Part"],
    modelType: "watch",
    wireframeAvailable: true,
    explodedAvailable: false,
    crossSectionAvailable: true,
    schematicType: "svg-gun",
    thumbnailImage: "/media/engine-piston.png",
    mediaImages: ["/media/engine-piston.png"],
    annotations: [
      {
        id: "ring-pack",
        title: "Compression Ring Grooves",
        description: "Precision-milled ring lands with gas accumulation relief.",
        position: [0, 0.3, 0],
      },
    ],
  },
  {
    id: "centrifugal-blower-engine",
    slug: "centrifugal-blower-engine",
    title: "Centrifugal Blower & Cooling-Fin Engine Assembly",
    categories: ["Assembly Design", "Product Design", "3D CAD Modelling"],
    primaryCategory: "Assembly Design",
    cadSoftwareName: "SolidWorks Assembly",
    shortDescription:
      "Integrated mechanical power unit assembly combining air-cooled engine cylinder head with deep thermal fins, high-flow centrifugal blower housing, and rigid mounting base.",
    fullDescription:
      "Complete assembly modeling in SolidWorks detailing an air-cooled powerhead connected directly to a high-volume centrifugal blower volute. Designed for industrial utility, pneumatic material transfer, and forced-air cooling systems.",
    engineeringChallenge:
      "Eliminating resonant vibration harmonics between the reciprocating engine crankcase and the high-speed centrifugal scroll casing across varying load states.",
    designApproach:
      "Engineered a rigid channel-section sub-frame with reinforced gusset brackets. Integrated circular flange bolt patterns and aerodynamically smooth intake and discharge throats.",
    technicalObservations: [
      "Thin-wall cylinder cooling fins optimized for maximum convective heat dissipation.",
      "Multi-bolt circular inlet flange with concentric pilot ring for airtight sealing.",
      "Box-section welded foundation frame resisting dynamic torque reactions.",
    ],
    specs: [
      { label: "Inlet Diameter", value: "Ø 140.00 mm Circular Flange" },
      { label: "Outlet Dimensions", value: "120 x 60 mm Rectangular Chute" },
      { label: "Cylinder Cooling", value: "24 Thin-Wall Die-Cast Fins" },
      { label: "Fastener Standard", value: "ISO 4762 Socket Head Cap Screws" },
      { label: "Assembly Tree", value: "14 Discrete Mated Components" },
    ],
    materials: ["A380 Die-Cast Aluminum", "Structural Mild Steel Q235", "Ductile Iron"],
    cadFormats: ["STEP AP242", "Native SolidWorks Assembly", "Parasolid"],
    modelType: "dam",
    wireframeAvailable: true,
    explodedAvailable: false,
    crossSectionAvailable: true,
    schematicType: "svg-dam",
    thumbnailImage: "/media/blower-assembly.png",
    mediaImages: ["/media/blower-assembly.png"],
    annotations: [
      {
        id: "volute-casing",
        title: "Scroll Volute Housing",
        description: "Aerodynamic spiral casing converting kinetic energy to static pressure.",
        position: [0.5, 0, 0],
      },
    ],
  },
  {
    id: "precision-sheet-metal-bracket",
    slug: "precision-sheet-metal-bracket",
    title: "Formed Sheet Metal Support Bracket",
    categories: ["Sheet Metal Design", "Mechanical Part Design"],
    primaryCategory: "Sheet Metal Design",
    cadSoftwareName: "SolidWorks Sheet Metal",
    shortDescription:
      "Complex stamped and air-bent sheet metal mounting bracket engineered with corner relief notches, 90° and offset joggle bends, and vibration isolation slots.",
    fullDescription:
      "Precision sheet metal design engineered for progressive die stamping or CNC press brake forming. Features stiffening flanges, stress-relief bend cutouts, and accurate K-factor bend compensation for flawless flat-pattern laser cutting.",
    engineeringChallenge:
      "Preventing material tear and excessive strain hardening at tight inside bend radii while preserving tight center-to-center hole tolerances after multiple bending operations.",
    designApproach:
      "Modeled using SolidWorks Sheet Metal tools with exact material bend tables. Added corner relief radius notches to eliminate flange buckling during air bending.",
    technicalObservations: [
      "Offset joggle bends providing clearance over adjacent chassis fasteners.",
      "Calculated bend allowance ensuring exact post-forming dimensional conformance.",
      "Lightweight central cutout reducing component weight by 34% without compromising rigidity.",
    ],
    specs: [
      { label: "Sheet Gauge", value: "2.50 mm (12 AWG Nominal)" },
      { label: "Inside Bend Radius", value: "R 2.50 mm (1.0 x Thickness)" },
      { label: "Bend Allowance", value: "K-Factor 0.44 Air Bending" },
      { label: "Cutting Method", value: "CNC Fiber Laser Flat Pattern" },
      { label: "Forming Method", value: "Multi-Axis CNC Press Brake" },
    ],
    materials: ["5052-H32 Marine Grade Aluminum", "AISI 304 Stainless Steel"],
    cadFormats: ["DXF Flat Pattern", "STEP AP242", "SolidWorks Part (.sldprt)"],
    modelType: "blade",
    wireframeAvailable: true,
    explodedAvailable: false,
    crossSectionAvailable: true,
    schematicType: "svg-blade",
    thumbnailImage: "/media/sheet-metal-bracket.png",
    mediaImages: ["/media/sheet-metal-bracket.png"],
    annotations: [
      {
        id: "bend-relief",
        title: "Corner Bend Relief",
        description: "Engineered tear-relief notch preventing flange distortion.",
        position: [0, 0.1, 0],
      },
    ],
  },
  {
    id: "modular-office-workstation",
    slug: "modular-office-workstation",
    title: "Modular Workstation Cubicle System",
    categories: ["Product Design", "Assembly Design", "3D CAD Modelling"],
    primaryCategory: "Product Design",
    cadSoftwareName: "SolidWorks Professional Assembly",
    shortDescription:
      "Commercial modular workstation pod assembly modeled in SolidWorks (`main.ass`) with acoustic partition dividers, ergonomic work surfaces, task chairs, and storage units.",
    fullDescription:
      "Complete parametric office furniture system modeled with detailed sub-assemblies. Features modular aluminum extrusions, cable management raceways, acoustic felt partition walls, woodgrain laminate tops, and ergonomic seating models.",
    engineeringChallenge:
      "Designing a universal interconnect bracket system allowing workstations to be reconfigured into 2-pod, 4-pod, 6-pod, or 8-pod clusters without requiring custom fabrication.",
    designApproach:
      "Top-down SolidWorks assembly modeling with linked configurations. Built modular sub-assemblies for desks, divider screens, pedestals, and chairs (`chair assembly<1>...<5>`, `wooden storage ass<1>`).",
    technicalObservations: [
      "Extruded aluminum framing with concealed snap-in electrical raceways.",
      "Interchangeable privacy divider screens with acoustic damping cores.",
      "Modular credenza storage units acting as shared structural partition anchors.",
    ],
    specs: [
      { label: "Layout Configuration", value: "8-Person Back-to-Back Pod" },
      { label: "Worksurface Dimensions", value: "1500 x 750 mm per User" },
      { label: "Screen Height", value: "1200 mm Acoustic Screen" },
      { label: "Assembly Complexity", value: "18 Sub-Assemblies / 42 Parts" },
      { label: "CAD System", value: "SolidWorks Professional (`main.ass`)" },
    ],
    materials: ["6063-T5 Extruded Aluminum", "E1 Grade Engineered Wood", "Recycled PET Felt"],
    cadFormats: ["STEP AP214", "Native SolidWorks Assembly", "Parasolid"],
    modelType: "dam",
    wireframeAvailable: true,
    explodedAvailable: false,
    crossSectionAvailable: true,
    schematicType: "svg-dam",
    thumbnailImage: "/media/office-workstation.png",
    mediaImages: ["/media/office-workstation.png"],
    annotations: [
      {
        id: "work-pod",
        title: "Modular 8-Pod Cluster",
        description: "Reconfigurable office layout with concealed wiring raceways.",
        position: [0, 0.5, 0],
      },
    ],
  },
];
