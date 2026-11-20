/**
 * AP LABS — Site Configuration & Authoritative Business Context
 */

export interface SocialLinks {
  instagram: string;
  whatsapp: string;
  linkedIn?: string;
}

export interface SiteConfig {
  name: string;
  industry: string;
  logoText: string;
  logoUrl: string;
  tagline: string;
  businessDescription: string;
  targetAudience: string[];
  
  location: string;
  email: string;
  whatsappNumber: string;
  whatsappUrl: string;
  domain: string;
  googleFormUrl: string;
  
  social: SocialLinks;
  
  teamInfo: string;
  founderInfo: string;
  yearsExperience: string;
  cadSoftware: string[];
  certifications: string[];
}

export const siteConfig: SiteConfig = {
  name: "AP Labs",
  industry: "Mechanical Engineering Design & Product Design",
  logoText: "AP LABS",
  logoUrl: "/images/ap-labs-logo.jpeg",
  tagline: "ENGINEERING IDEAS. DESIGNED WITH PRECISION.",
  businessDescription:
    "AP Labs is a precision mechanical engineering and product design studio providing specialized design services for businesses, manufacturers, entrepreneurs, and individual product developers. The agency focuses on mechanical components, CAD modelling, 3D printer designs, sheet metal design, product design, assembly design, and design optimization.",
  targetAudience: [
    "Manufacturing companies",
    "Product development companies",
    "Industrial businesses",
    "Entrepreneurs & Startup founders",
    "Individual inventors & product developers",
    "Businesses requiring specialized mechanical design support",
  ],

  location: "Hyderabad, India",
  email: "kacharya1903@gmail.com",
  whatsappNumber: "+91 9160512832",
  whatsappUrl: "https://wa.me/919160512832",
  domain: "https://aplabs.design",
  googleFormUrl: "[GOOGLE_FORM_URL]",

  social: {
    instagram: "https://www.instagram.com/aplabs.design?jplx=dTRiMTNiNWN0M2ln",
    whatsapp: "https://wa.me/919160512832",
  },

  teamInfo: "[TEAM_INFORMATION]",
  founderInfo: "AP Labs Engineering Lead",
  yearsExperience: "5+ Years Precision CAD",
  cadSoftware: [
    "Creo Parametric",
    "SolidWorks",
    "CATIA",
    "AutoCAD",
  ],
  certifications: [
    "Certified SolidWorks Professional (CSWP)",
    "Creo Parametric Design Specialist",
  ],
};

export function isConfigPlaceholder(value: string | undefined): boolean {
  if (!value) return true;
  return value.trim().startsWith("[") && value.trim().endsWith("]");
}
