import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { PromoTopStrip } from "@/components/promo-top-strip"
import { PromosSection } from "@/components/promos-section"
import { Footer } from "@/components/footer"
import { PromoBanner } from "@/components/promo-banner"

// Lazy load below-the-fold components to improve initial page load
const ServicesPreview = dynamic(() => import("@/components/services-preview").then(mod => ({ default: mod.ServicesPreview })), {
  loading: () => <div className="py-16 animate-pulse bg-slate-50" />,
  ssr: true
})

const ProjectsPreview = dynamic(() => import("@/components/projects-preview").then(mod => ({ default: mod.ProjectsPreview })), {
  loading: () => <div className="py-16 animate-pulse bg-white" />,
  ssr: true
})

const HomepageCTA = dynamic(() => import("@/components/homepage-cta").then(mod => ({ default: mod.HomepageCTA })), {
  loading: () => <div className="py-16 animate-pulse bg-primary/10" />,
  ssr: true
})

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* Promo banner appears right after header with visual effect */}
      <PromoTopStrip />
      <main className="flex-1">
        <Hero />
        <PromosSection />
        <ServicesPreview />
        <ProjectsPreview />
        <HomepageCTA />
      </main>
      <Footer />
      <PromoBanner />
    </div>
  )
}
