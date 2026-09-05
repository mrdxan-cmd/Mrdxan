import type { Metadata, Viewport } from "next";
import "./globals.css";
import { inter, outfit } from "@/lib/fonts";
import { getSiteUrl, site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyContactBar } from "@/components/layout/StickyContactBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: site.defaultTitle,
    template: site.titleTemplate,
  },
  description: site.defaultDescription,
  applicationName: site.name,
  keywords: [
    "Maler Näfels",
    "Maler Glarus",
    "Malerarbeiten Glarus",
    "Gipserarbeiten Glarus",
    "Fassadenrenovation Glarus",
    "Malergeschäft Glarus Nord",
    "Maler Phönix",
  ],
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "de_CH",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: `${site.name} – ${site.tagline}` }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.language} className={`${inter.variable} ${outfit.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ember-500 focus:px-4 focus:py-2 focus:text-white"
        >
          Zum Inhalt springen
        </a>
        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
        <Header />
        <main id="main" className="flex-1 pb-14 lg:pb-0">
          {children}
        </main>
        <Footer />
        <StickyContactBar />
      </body>
    </html>
  );
}
