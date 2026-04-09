import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ServicesPreview } from "@/components/services-preview"
import { ProjectsPreview } from "@/components/projects-preview"
import { HomepageCTA } from "@/components/homepage-cta"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ServicesPreview />
        <ProjectsPreview />
        <HomepageCTA />
      </main>
      <Footer />
    </div>
  )
}
