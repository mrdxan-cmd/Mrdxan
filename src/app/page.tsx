import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ServiceAreasSection } from "@/components/home/ServiceAreasSection";
import { FaqSection } from "@/components/home/FaqSection";
import { ContactSection } from "@/components/home/ContactSection";
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
      <ProjectsSection />
      <ReviewsSection />
      <ServiceAreasSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
