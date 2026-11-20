import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import { siteMetadata, generateStructuredData } from "@/config/seo";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { organizationSchema, websiteSchema, faqSchema } = generateStructuredData();

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} ${firaCode.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#050505] text-[#F5F5F5] antialiased selection:bg-[#A3E635] selection:text-[#050505]">
        {children}
      </body>
    </html>
  );
}
