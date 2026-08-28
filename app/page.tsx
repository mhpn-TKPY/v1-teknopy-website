import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { AllOffers } from "@/components/all-offers"
import { PromosSection } from "@/components/promos-section"
import { ProjectsPreview } from "@/components/projects-preview"
import { Pricing } from "@/components/pricing"
import { Trainings } from "@/components/trainings"
import { Skills } from "@/components/skills"
import { HomepageCTA } from "@/components/homepage-cta"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <AllOffers />
        <PromosSection />
        <ProjectsPreview />
        <Pricing />
        <Trainings />
        <Skills />
        <HomepageCTA />
      </main>
      <Footer />
    </div>
  )
}
