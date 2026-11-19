import { siteConfig } from "./site";
import { confirmedServices } from "./services";

export const siteMetadata = {
  title: {
    default: "AP Labs | Mechanical Engineering & Product Design Studio",
    template: "%s | AP Labs",
  },
  description:
    "AP Labs is a precision mechanical engineering and product design studio. Specializing in mechanical part design, injection mould design, 3D CAD modelling, sheet metal design, assembly engineering, mould flow analysis, and design optimization.",
  keywords: [
    "Mechanical Part Design",
    "Injection Mould Design",
    "3D CAD Modelling",
    "Mechanical Engineering Design",
    "Sheet Metal Design",
    "Product Design Services",
    "Assembly Design",
    "Mould Flow Analysis",
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
      "Engineering ideas designed with precision. Mechanical part design, injection mould engineering, 3D CAD modelling, and design optimization.",
    siteName: "AP Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "AP Labs | Mechanical Engineering & Product Design Studio",
    description:
      "Engineering ideas designed with precision. Mechanical part design, injection mould engineering, 3D CAD modelling, and design optimization.",
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
      "Injection Mould Design",
      "3D CAD Modelling",
      "Sheet Metal Design",
      "Product Design",
      "Assembly Design",
      "Mould Flow Analysis",
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
          text: "AP Labs offers eight specialized mechanical engineering services: Mechanical Part Design, Injection Mould Design, 3D CAD Modelling, Sheet Metal Design, Product Design, Assembly Design, Mould Flow Analysis, and Design Optimization.",
        },
      },
      {
        "@type": "Question",
        name: "Does AP Labs provide injection mould design?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AP Labs provides complete injection mould tooling design including core and cavity splitting, parting line engineering, runner and gating layouts, cooling channel circuits, and guided ejection systems.",
        },
      },
      {
        "@type": "Question",
        name: "Can AP Labs create 3D CAD models for manufacturing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AP Labs engineers precision parametric solid and surface models suitable for downstream CNC machining, casting, tooling manufacture, 3D printing, and CMM quality verification.",
        },
      },
      {
        "@type": "Question",
        name: "Does AP Labs work with individual product developers and entrepreneurs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AP Labs supports manufacturing companies, product development studios, industrial enterprises, startup entrepreneurs, and individual product inventors requiring specialized mechanical design engineering.",
        },
      },
      {
        "@type": "Question",
        name: "Can businesses enquire about complex mechanical assembly design?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AP Labs provides full mechanical assembly design encompassing kinematic constraints, tolerance stack-up analysis, collision/interference verification, and structured Bill of Materials (BOM) creation.",
        },
      },
      {
        "@type": "Question",
        name: "What information should I provide for a design enquiry?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To initiate an enquiry, provide your project description, design objectives, dimensional or space constraints, target materials, known operating loads, reference sketches or 2D/3D files, and your timeline.",
        },
      },
      {
        "@type": "Question",
        name: "How can I discuss a mechanical engineering project with AP Labs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can submit your project requirements directly through the AP Labs Project Enquiry Form link on the website.",
        },
      },
    ],
  };

  return { organizationSchema, websiteSchema, faqSchema };
}
