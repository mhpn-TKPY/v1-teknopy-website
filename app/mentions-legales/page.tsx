import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Scale, Building2, Server, FileText, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales de TEKNOPY Concept - Informations légales, éditeur, hébergeur et propriété intellectuelle.',
}

export default function MentionsLegalesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Scale className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Mentions Légales
              </h1>
              <p className="mt-4 text-muted-foreground">
                Informations légales conformément à la loi n° 2004-575 du 21 juin 2004
              </p>
            </div>

            <div className="space-y-8">
              {/* Éditeur */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                    <Building2 className="h-5 w-5 text-primary" />
                    Éditeur du site
                  </h2>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>TEKNOPY Concept</strong></p>
                    <p>Micro-entreprise</p>
                    <p>Représentant légal : Manuel Harpon</p>
                    <p>Adresse : Fort-de-France, Martinique (972)</p>
                    <p>Email : manuel.harpon@teknopy.com</p>
                    <p>Téléphone : +596 696 617 151</p>
                    <p>SIRET : 885 185 355 00033</p>
                  </div>
                </CardContent>
              </Card>

              {/* Hébergeur */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                    <Server className="h-5 w-5 text-primary" />
                    Hébergement
                  </h2>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Vercel Inc.</strong></p>
                    <p>340 S Lemon Ave #4133</p>
                    <p>Walnut, CA 91789, États-Unis</p>
                    <p>Site web : <a href="https://vercel.com" className="text-primary underline">vercel.com</a></p>
                  </div>
                </CardContent>
              </Card>

              {/* Propriété intellectuelle */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                    <FileText className="h-5 w-5 text-primary" />
                    Propriété intellectuelle
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes, 
                      icônes, sons, logiciels, etc.) est la propriété exclusive de TEKNOPY Concept 
                      ou de ses partenaires et est protégé par les lois françaises et internationales 
                      relatives à la propriété intellectuelle.
                    </p>
                    <p>
                      Toute reproduction, représentation, modification, publication, adaptation 
                      totale ou partielle des éléments du site, quel que soit le moyen ou le procédé 
                      utilisé, est interdite sans l&apos;autorisation écrite préalable de TEKNOPY Concept.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Qualiopi */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                    <Award className="h-5 w-5 text-primary" />
                    Certification Qualiopi
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      TEKNOPY Concept s&apos;engage dans une démarche qualité pour ses activités de 
                      formation, conformément au référentiel national qualité Qualiopi.
                    </p>
                    <p>
                      Cette certification atteste de la qualité du processus mis en œuvre par 
                      les prestataires d&apos;actions de développement des compétences.
                    </p>
                    <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                      <p className="text-sm font-medium text-primary">
                        Certification en cours - Formation professionnelle continue
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Limitation de responsabilité */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-4 text-xl font-semibold">Limitation de responsabilité</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      TEKNOPY Concept s&apos;efforce d&apos;assurer au mieux l&apos;exactitude et la mise à jour 
                      des informations diffusées sur ce site. Toutefois, nous ne pouvons garantir 
                      l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à 
                      disposition sur ce site.
                    </p>
                    <p>
                      En conséquence, TEKNOPY Concept décline toute responsabilité pour toute 
                      imprécision, inexactitude ou omission portant sur des informations disponibles 
                      sur ce site.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Cookies */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-4 text-xl font-semibold">Cookies</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur et 
                      analyser le trafic. Vous pouvez configurer vos préférences de cookies via 
                      notre bandeau de consentement.
                    </p>
                    <p>
                      Pour plus d&apos;informations, consultez notre{' '}
                      <a href="/politique-confidentialite" className="text-primary underline">
                        politique de confidentialité
                      </a>.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Droit applicable */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-4 text-xl font-semibold">Droit applicable</h2>
                  <p className="text-muted-foreground">
                    Le présent site et les mentions légales qui y figurent sont régis par le droit 
                    français. En cas de litige, et après l&apos;échec de toute tentative de recherche 
                    d&apos;une solution amiable, les tribunaux français seront seuls compétents pour 
                    connaître de ce litige.
                  </p>
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
