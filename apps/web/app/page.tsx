import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Categories } from "@/components/sections/Categories";
import { FeaturedGrid } from "@/components/sections/FeaturedGrid";
import { ThreeDShowcase } from "@/components/sections/ThreeDShowcase";
import { BentoShowcase } from "@/components/sections/BentoShowcase";
import { PricingSection } from "@/components/sections/PricingSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Categories />
        <FeaturedGrid />
        <ThreeDShowcase />
        <BentoShowcase />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}