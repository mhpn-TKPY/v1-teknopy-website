import type { Metadata } from "next"
import { Header } from "@/components/header"
import { ProjectsPage } from "@/components/projects-page"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Realisations | Portfolio Web en Martinique",
  description: "Decouvrez nos realisations : sites vitrines, e-commerce, applications web et mobiles developpes pour nos clients en Martinique. Portfolio complet de TEKNOPY Concept.",
  keywords: [
    "portfolio web martinique",
    "realisations site web martinique",
    "projets developpement web fort-de-france",
    "references agence web martinique",
  ],
  alternates: {
    canonical: "/projets",
  },
  openGraph: {
    title: "Portfolio TEKNOPY | Nos Realisations Web",
    description: "Sites vitrines, e-commerce, applications web et mobiles. Decouvrez nos projets realises en Martinique.",
    url: "https://teknopy.com/projets",
  },
}

export default function ProjetsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ProjectsPage />
      </main>
      <Footer />
    </div>
  )
}
