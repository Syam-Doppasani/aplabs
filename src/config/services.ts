/**
 * AP LABS — Confirmed Services Specification
 *
 * APPROVED SERVICES:
 * 1. Mechanical Part Design
 * 2. 3D CAD Modelling
 * 3. Sheet Metal Design
 * 4. Product Design
 * 5. Assembly Design
 * 6. 3D Printer Designs
 * 7. Design Optimization
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
  modelType: "part" | "cad" | "sheetmetal" | "product" | "assembly" | "3dprinter" | "optimization";
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
    id: "cad-modelling",
    number: "02",
    title: "3D CAD Modelling",
    tagline: "Parametric solid and surface modelling for digital engineering.",
    description:
      "High-precision digital representation of components and systems utilizing robust parametric solids and Class-A surfacing techniques in Creo Parametric, SolidWorks, and CATIA. Ready for downstream engineering and CAM toolpaths.",
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
    number: "03",
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
    number: "04",
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
    number: "05",
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
    id: "3d-printer-designs",
    number: "06",
    title: "3D Printer Designs",
    tagline: "Additive manufacturing engineering, slicer optimization, and rapid functional prototyping.",
    description:
      "Specialized CAD design engineered specifically for additive manufacturing (FDM, SLA, SLS, and DMLS). Focuses on overhang minimization, self-supporting geometry, print-in-place moving hinges, anisotropic layer tensile compensation, and thread tolerances.",
    keyDeliverables: [
      "FDM / SLA / SLS print-ready geometry without support failures",
      "Print-in-place articulated kinematic joints and snap-fits",
      "High-resolution mesh tessellation and STL / 3MF exports",
      "Internal lattice infill and mass optimization for speed and strength",
    ],
    visualDirection: "Layer-by-layer additive toolpath visualization transitioning into solid 3D print model.",
    technicalBadge: "DFAM (Design for Additive Manufacturing)",
    modelType: "3dprinter",
    enquiryPrompt: "Enquire about 3D Printer Designs",
  },
  {
    id: "design-optimization",
    number: "07",
    title: "Design Optimization",
    tagline: "Mass reduction, rib re-engineering, and structural stress minimization.",
    description:
      "Iterative engineering refinement to maximize stiffness-to-weight ratios, eliminate stress concentrations, optimize wall thicknesses, and reduce manufacturing cycle times while preserving critical safety factors.",
    keyDeliverables: [
      "Generative mass reduction and load-path alignment",
      "Rib pattern restructuring for stiffness",
      "Stress relief filleting & draft angle optimization",
      "Material savings and cycle-time efficiency reviews",
    ],
    visualDirection: "Side-by-side comparison of baseline geometry versus optimized lightweight geometry.",
    technicalBadge: "Mass Reduction & Structural Refinement",
    modelType: "optimization",
    enquiryPrompt: "Enquire about Design Optimization",
  },
];
