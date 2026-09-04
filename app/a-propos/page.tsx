import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { GraduationCap, Briefcase, User, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'À propos',
  description:
    "Manuel Harpon, fondateur de TEKNOPY Concept — ingénieur DevOps et développeur full-stack, 10 ans d'expérience en développement web et infrastructure cloud à Fort-de-France, Martinique.",
}

const experiences = [
  {
    role: 'Développeur Web Full-Stack WordPress',
    entreprise: 'Lakou Sankofa',
    periode: '2024 – 2026',
    lieu: 'Saint-Joseph, Martinique',
    detail: 'Tunnels de vente Stripe, espaces membres, sites vitrines.',
  },
  {
    role: 'Développeur Front-End Angular',
    entreprise: 'Paprec Group',
    periode: '2020 – 2022',
    lieu: 'La Courneuve',
    detail: "Application de gestion RH — sécurité et robustesse du code, tests unitaires.",
  },
  {
    role: 'Chef de projet création de sites web',
    entreprise: 'Open IT Martinique',
    periode: '2018 – 2023',
    lieu: 'Fort-de-France',
    detail: 'Refonte complète de site web et identité visuelle.',
  },
]

const diplomes = [
  {
    titre: 'Certification RNCP niveau 7 — Expert en Informatique et Système d’Information',
    ecole: 'EPSI Paris',
    annee: '2023',
  },
  {
    titre: 'Master 2 Expert en Informatique et Systèmes d’Information',
    ecole: 'EPSI Paris',
    annee: '2022 – 2023',
  },
  {
    titre: 'Licence Pro Développement Web',
    ecole: 'UNISTRA / ADN Formation',
    annee: '2019',
  },
  {
    titre: 'BTS Informatique de Gestion',
    ecole: 'CFA Tertiaire de Bellevue, Martinique',
    annee: '2010',
  },
  {
    titre: 'Formation DevOps et automatisation des déploiements',
    ecole: 'M2I Formation',
    annee: '2024',
  },
]

export default function AProposPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Manuel Harpon</h1>
              <p className="mt-2 text-lg text-primary">Fondateur, TEKNOPY Concept</p>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Ingénieur DevOps et développeur full-stack, 10 ans d&apos;expérience à concevoir,
                sécuriser et déployer des solutions applicatives et d&apos;infrastructure pour des
                structures de tailles variées — grande distribution, énergie, secteur public,
                éducation, ESN. J&apos;ai fondé TEKNOPY Concept à Fort-de-France pour mettre cette
                expertise au service de projets web sur mesure, de la conception à
                l&apos;infrastructure cloud.
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Expérience sélectionnée
                  </h2>
                  <div className="space-y-6">
                    {experiences.map((exp) => (
                      <div key={exp.role + exp.entreprise} className="border-l-2 border-primary/20 pl-4">
                        <p className="font-medium text-foreground">{exp.role}</p>
                        <p className="text-sm text-muted-foreground">
                          {exp.entreprise} · {exp.lieu} · {exp.periode}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">{exp.detail}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Formation et certification
                  </h2>
                  <div className="space-y-4">
                    {diplomes.map((d) => (
                      <div key={d.titre} className="flex items-start gap-3">
                        <Award className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">{d.titre}</p>
                          <p className="text-sm text-muted-foreground">
                            {d.ecole} · {d.annee}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
