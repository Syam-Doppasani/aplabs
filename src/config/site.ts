/**
 * AP LABS — Site Configuration & Authoritative Business Context
 *
 * All unverified/unknown business values are preserved as placeholders
 * and remain easily configurable in this single source of truth.
 *
 * STRICT RULE: Do not fabricate contact details, locations, testimonials,
 * certifications, client lists, or manufacturing capabilities.
 */

export interface SocialLinks {
  linkedIn: string;
  instagram: string;
  facebook: string;
  youtube: string;
}

export interface SiteConfig {
  name: string;
  industry: string;
  logoText: string;
  tagline: string;
  businessDescription: string;
  targetAudience: string[];
  
  // Configurable Unknowns (placeholders preserved until verified)
  location: string;
  email: string;
  phone: string;
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
  tagline: "ENGINEERING IDEAS. DESIGNED WITH PRECISION.",
  businessDescription:
    "AP Labs is a mechanical engineering and product design studio providing specialized design services for businesses, manufacturers, entrepreneurs, and individual product developers. The agency focuses on mechanical components, mould design, CAD modelling, sheet metal design, product design, assembly design, mould flow analysis, and design optimization.",
  targetAudience: [
    "Manufacturing companies",
    "Product development companies",
    "Industrial businesses",
    "Entrepreneurs & Startup founders",
    "Individual inventors & product developers",
    "Businesses requiring specialized mechanical design support",
  ],

  // Unknown business information (Preserve configuration placeholders)
  location: "[BUSINESS_LOCATION]",
  email: "[BUSINESS_EMAIL]",
  phone: "[PHONE_NUMBER]",
  domain: "https://aplabs.design", // fallback canonical domain
  googleFormUrl: "[GOOGLE_FORM_URL]",

  social: {
    linkedIn: "[LINKEDIN_URL]",
    instagram: "[INSTAGRAM_URL]",
    facebook: "[FACEBOOK_URL]",
    youtube: "[YOUTUBE_URL]",
  },

  teamInfo: "[TEAM_INFORMATION]",
  founderInfo: "[FOUNDER_INFORMATION]",
  yearsExperience: "[YEARS_OF_EXPERIENCE_IF_VERIFIED]",
  cadSoftware: [
    "[CONFIRMED_SOFTWARE]",
  ],
  certifications: [
    "[CONFIRMED_CERTIFICATIONS]",
  ],
};

/**
 * Utility to check if a configuration string is a placeholder
 */
export function isConfigPlaceholder(value: string | undefined): boolean {
  if (!value) return true;
  return value.trim().startsWith("[") && value.trim().endsWith("]");
}

/**
 * Safely format placeholder strings for display with clear context
 */
export function displayOrPlaceholder(
  value: string | undefined,
  fallbackLabel: string
): string {
  if (!value || isConfigPlaceholder(value)) {
    return fallbackLabel;
  }
  return value;
}
