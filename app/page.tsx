import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { PromosSection } from "@/components/promos-section"
import { ServicesPreview } from "@/components/services-preview"
import { ProjectsPreview } from "@/components/projects-preview"
import { HomepageCTA } from "@/components/homepage-cta"
import { Footer } from "@/components/footer"
import { PromoBanner } from "@/components/promo-banner"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
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
