/**
 * AP LABS — Confirmed Services Specification
 *
 * EXACT 8 APPROVED SERVICES:
 * 1. Mechanical Part Design
 * 2. Injection Mould Design
 * 3. 3D CAD Modelling
 * 4. Sheet Metal Design
 * 5. Product Design
 * 6. Assembly Design
 * 7. Mould Flow Analysis
 * 8. Design Optimization
 *
 * STRICT RULE: Do not add additional services without authorization.
 */

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  keyDeliverables: string[];
  visualDirection: string;
  technicalBadge: string;
  modelType: "part" | "mould" | "cad" | "sheetmetal" | "product" | "assembly" | "flow" | "optimization";
  enquiryPrompt: string;
}

export const confirmedServices: ServiceItem[] = [
  {
    id: "mechanical-part-design",
    number: "01",
    title: "Mechanical Part Design",
    tagline: "Functional geometry, dimensional precision, and clear design intent.",
    description:
      "Design of individual mechanical components engineered to exacting functional parameters. Focuses on stress distribution, load requirements, machining and tooling constraints, and precise Geometric Dimensioning and Tolerancing (GD&T).",
    keyDeliverables: [
      "Machined & cast component geometry",
      "Dimensional tolerance & GD&T definitions",
      "Material selection & mechanical compatibility",
      "Manufacturability for CNC, casting, or additive processes",
    ],
    visualDirection: "Precision mechanical component with CAD wireframe overlay and datum coordinate axes.",
    technicalBadge: "ISO / ASME Y14.5 GD&T Standards",
    modelType: "part",
    enquiryPrompt: "Enquire about Mechanical Part Design",
  },
  {
    id: "injection-mould-design",
    number: "02",
    title: "Injection Mould Design",
    tagline: "Core, cavity, and precision tooling architectures for polymer manufacturing.",
    description:
      "Comprehensive injection mould tooling design encompassing cavity and core splitting, parting line resolution, runner and gating systems, conformal cooling channel layouts, and mechanical ejection systems.",
    keyDeliverables: [
      "Core and cavity block separation",
      "Parting line & shut-off surface engineering",
      "Ejector pin & slide mechanism design",
      "Tooling thermal management & cooling circuit layout",
    ],
    visualDirection: "Exploded mould assembly showing core, cavity, lifters, and cooling channels.",
    technicalBadge: "Tooling & Die Geometry",
    modelType: "mould",
    enquiryPrompt: "Enquire about Injection Mould Design",
  },
  {
    id: "cad-modelling",
    number: "03",
    title: "3D CAD Modelling",
    tagline: "Parametric solid and surface modelling for digital engineering.",
    description:
      "High-precision digital representation of components and systems utilizing robust parametric solids and Class-A surfacing techniques. Ready for downstream engineering, CAM toolpaths, and CMM inspection.",
    keyDeliverables: [
      "Feature-based parametric solid modelling",
      "Curvature-continuous surface generation",
      "Native and neutral export (STEP, IGES, Parasolid, STL)",
      "Digital prototyping and inspection readiness",
    ],
    visualDirection: "Wireframe mesh transitioning smoothly into high-fidelity solid shaded geometry.",
    technicalBadge: "Parametric Solids & Surfacing",
    modelType: "cad",
    enquiryPrompt: "Enquire about 3D CAD Modelling",
  },
  {
    id: "sheet-metal-design",
    number: "04",
    title: "Sheet Metal Design",
    tagline: "Precision enclosures, chassis, and folded structural components.",
    description:
      "Formed sheet metal engineering with exact bend deduction calculations, K-factor compensation, relief notches, and self-clinching fastener hardware integration. Complete with flat-pattern DXF outputs for laser/punch press fabrication.",
    keyDeliverables: [
      "Enclosure and rackmount chassis engineering",
      "Bend radius, K-factor, and corner relief design",
      "Flat-pattern unfolding geometry for CNC press brakes",
      "PEM hardware & structural spot-welding layouts",
    ],
    visualDirection: "Folded sheet metal component showing simultaneous folded state and flat-pattern overlay.",
    technicalBadge: "K-Factor & Bend Deduction Precision",
    modelType: "sheetmetal",
    enquiryPrompt: "Enquire about Sheet Metal Design",
  },
  {
    id: "product-design",
    number: "05",
    title: "Product Design",
    tagline: "Holistic form, functional architecture, and human-machine interaction.",
    description:
      "End-to-end design synthesis combining industrial aesthetics, ergonomic requirements, internal component packaging, and mechanical housing engineering to produce market-ready physical products.",
    keyDeliverables: [
      "Ergonomic form and physical enclosure concepts",
      "Internal PCB and mechanical component packaging",
      "Snap-fits, bosses, ribs, and assembly fastenings",
      "Design for Assembly (DFA) and Design for Manufacturing (DFM)",
    ],
    visualDirection: "Detailed product concept with cutaway revealing internal component packaging.",
    technicalBadge: "Ergonomics & DFA/DFM Synthesis",
    modelType: "product",
    enquiryPrompt: "Enquire about Product Design",
  },
  {
    id: "assembly-design",
    number: "06",
    title: "Assembly Design",
    tagline: "Kinematic alignment, multi-body constraints, and tolerance stack-ups.",
    description:
      "Full mechanical assembly architecture detailing how individual components interface, articulate, and fasten. Includes interference and collision checking, motion simulation, and complete Bill of Materials (BOM) structuring.",
    keyDeliverables: [
      "Multi-body kinematic constraint definitions",
      "Interference, clearance, and collision analysis",
      "Tolerance stack-up verification",
      "Structured engineering Bill of Materials (BOM)",
    ],
    visualDirection: "Exploded assembly animation showing axial alignment and fastener paths.",
    technicalBadge: "Kinematic & Interference Verification",
    modelType: "assembly",
    enquiryPrompt: "Enquire about Assembly Design",
  },
  {
    id: "mould-flow-analysis",
    number: "07",
    title: "Mould Flow Analysis",
    tagline: "Visualizing fill dynamics, gate freeze, weld lines, and thermal behavior.",
    description:
      "Engineering visualization of polymer injection dynamics to optimize gate placement, prevent air traps, reduce weld line vulnerabilities, and achieve balanced fill patterns across multi-cavity moulds.",
    keyDeliverables: [
      "Cavity fill time & melt front progression visualization",
      "Injection pressure & clamp force estimations",
      "Weld line & air trap identification",
      "Volumetric shrinkage and warpage assessment",
    ],
    visualDirection: "Mould flow fill-time progression and false-color thermal/pressure gradient mapping.",
    technicalBadge: "Rheology & Thermal Visualization",
    modelType: "flow",
    enquiryPrompt: "Enquire about Mould Flow Analysis",
  },
  {
    id: "design-optimization",
    number: "08",
    title: "Design Optimization",
    tagline: "Mass reduction, rib re-engineering, and structural stress minimization.",
    description:
      "Iterative engineering refinement to maximize stiffness-to-weight ratios, eliminate stress concentrations, optimize wall thicknesses, and reduce manufacturing cycle times while preserving critical safety factors.",
    keyDeliverables: [
      "Topology optimization and structural mass reduction",
      "Rib pattern restructuring for stiffness without sink marks",
      "Stress relief filleting & draft angle optimization",
      "Material savings and cycle-time efficiency reviews",
    ],
    visualDirection: "Side-by-side comparison of baseline geometry versus optimized lightweight geometry.",
    technicalBadge: "Mass Reduction & Structural Refinement",
    modelType: "optimization",
    enquiryPrompt: "Enquire about Design Optimization",
  },
];
