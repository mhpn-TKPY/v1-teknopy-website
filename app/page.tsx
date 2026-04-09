import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Pricing } from "@/components/pricing"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Trainings } from "@/components/trainings"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Pricing />
        <Projects />
        <Skills />
        <Trainings />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
