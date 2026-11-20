import { siteConfig } from "./site";
import { confirmedServices } from "./services";

export const siteMetadata = {
  title: {
    default: "AP Labs | Mechanical Engineering & Product Design Studio",
    template: "%s | AP Labs",
  },
  description:
    "AP Labs is a precision mechanical engineering and product design studio. Specializing in mechanical part design, 3D CAD modelling, 3D printer designs, sheet metal design, assembly engineering, and design optimization.",
  keywords: [
    "Mechanical Part Design",
    "3D CAD Modelling",
    "3D Printer Designs",
    "Additive Manufacturing Design",
    "Mechanical Engineering Design",
    "Sheet Metal Design",
    "Product Design Services",
    "Assembly Design",
    "Mechanical Design Optimization",
    "Parametric CAD Engineering",
    "GD&T Tolerancing",
    "Industrial Design",
  ],
  authors: [{ name: "AP Labs" }],
  creator: "AP Labs",
  publisher: "AP Labs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.domain,
    title: "AP Labs | Mechanical Engineering & Product Design Studio",
    description:
      "Engineering ideas designed with precision. Mechanical part design, 3D printer designs, 3D CAD modelling, and design optimization.",
    siteName: "AP Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "AP Labs | Mechanical Engineering & Product Design Studio",
    description:
      "Engineering ideas designed with precision. Mechanical part design, 3D printer designs, 3D CAD modelling, and design optimization.",
  },
};

/**
 * Generate Structured JSON-LD Data according to Google standards
 */
export function generateStructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EngineeringService",
    "@id": `${siteConfig.domain}/#organization`,
    name: siteConfig.name,
    description: siteConfig.businessDescription,
    url: siteConfig.domain,
    knowsAbout: [
      "Mechanical Part Design",
      "3D CAD Modelling",
      "3D Printer Designs",
      "Sheet Metal Design",
      "Product Design",
      "Assembly Design",
      "Design Optimization",
    ],
    serviceType: "Mechanical Engineering & Product Design Studio",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Engineering & Design Services",
      itemListElement: confirmedServices.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          position: index + 1,
        },
      })),
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.domain}/#website`,
    url: siteConfig.domain,
    name: siteConfig.name,
    description: siteConfig.businessDescription,
    publisher: {
      "@id": `${siteConfig.domain}/#organization`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What mechanical design services does AP Labs offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AP Labs offers seven specialized mechanical engineering services: Mechanical Part Design, 3D CAD Modelling, 3D Printer Designs, Sheet Metal Design, Product Design, Assembly Design, and Design Optimization.",
        },
      },
      {
        "@type": "Question",
        name: "Does AP Labs design for 3D printing and additive manufacturing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AP Labs provides complete additive engineering including build orientation optimization, support-free geometries, minimum wall thickness enforcement, snap-fit tolerances, and lightweight lattice structures.",
        },
      },
      {
        "@type": "Question",
        name: "Can AP Labs create 3D CAD models for manufacturing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AP Labs engineers precision parametric solid and surface models suitable for downstream CNC machining, 3D printing, sheet metal fabrication, and CMM quality verification.",
        },
      },
      {
        "@type": "Question",
        name: "What file deliverables are provided upon project completion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Standard handoffs include native CAD files (Creo, SolidWorks, CATIA), neutral 3D formats (STEP AP242, IGES, Parasolid, STL/3MF), and 2D engineering drawings with ASME Y14.5 GD&T annotations.",
        },
      },
    ],
  };

  return {
    organizationSchema,
    websiteSchema,
    faqSchema,
  };
}
