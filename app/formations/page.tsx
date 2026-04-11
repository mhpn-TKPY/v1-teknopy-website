import type { Metadata } from "next"
import { Header } from "@/components/header"
import { TrainingsPage } from "@/components/trainings-page"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Formations | Cours Informatique & Mathématiques à Fort-de-France",
  description: "Cours particuliers informatique et mathématiques à 20€/h à Fort-de-France. Initiation, bureautique, code HTML/CSS/JS, maths 6e-2nd, préparation Brevet. Formation intra-entreprise disponible.",
  keywords: [
    "cours informatique martinique",
    "formation informatique fort-de-france",
    "cours mathématiques martinique",
    "cours particulier martinique",
    "préparation brevet martinique",
    "formation bureautique martinique",
    "cours code html css martinique",
  ],
  alternates: {
    canonical: "/formations",
  },
  openGraph: {
    title: "Formations TEKNOPY | Cours Informatique & Mathématiques",
    description: "Cours particuliers à 20€/h : informatique, bureautique, code, mathématiques 6e-2nd. Fort-de-France, Martinique.",
    url: "https://plistech.com/formations",
  },
}

export default function FormationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <TrainingsPage />
      </main>
      <Footer />
    </div>
  )
}
