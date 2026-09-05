import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TrustSection } from "@/components/home/TrustSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ServiceAreasSection } from "@/components/home/ServiceAreasSection";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: site.defaultTitle,
    description: site.defaultDescription,
    path: "/",
  }),
  title: { absolute: site.defaultTitle },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <TrustSection />
      <ProcessSection />
      <ProjectsSection />
      <ReviewsSection />
      <ServiceAreasSection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
