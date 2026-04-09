import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité de TEKNOPY Concept - Protection de vos données personnelles conformément au RGPD.',
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Politique de Confidentialité
              </h1>
              <p className="mt-4 text-muted-foreground">
                Dernière mise à jour : Avril 2026
              </p>
            </div>

            <div className="space-y-8">
              {/* Introduction */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                    <Lock className="h-5 w-5 text-primary" />
                    Introduction
                  </h2>
                  <p className="text-muted-foreground">
                    TEKNOPY Concept (ci-après &quot;nous&quot;, &quot;notre&quot; ou &quot;TEKNOPY&quot;) s&apos;engage à protéger 
                    la vie privée de ses utilisateurs. Cette politique de confidentialité décrit comment nous 
                    collectons, utilisons et protégeons vos données personnelles conformément au Règlement 
                    Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
                  </p>
                </CardContent>
              </Card>

              {/* Responsable du traitement */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                    <UserCheck className="h-5 w-5 text-primary" />
                    Responsable du traitement
                  </h2>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>TEKNOPY Concept</strong></p>
                    <p>Représenté par : Manuel Harpon</p>
                    <p>Adresse : Fort-de-France, Martinique</p>
                    <p>Email : manuel.harpon@teknopy.com</p>
                    <p>Téléphone : +596 696 617 151</p>
                  </div>
                </CardContent>
              </Card>

              {/* Données collectées */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                    <Database className="h-5 w-5 text-primary" />
                    Données collectées
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Nous collectons les données suivantes :</p>
                    <ul className="list-disc space-y-2 pl-6">
                      <li><strong>Données d&apos;identification :</strong> nom, prénom, adresse email, numéro de téléphone</li>
                      <li><strong>Données de connexion :</strong> adresse IP, type de navigateur, pages visitées</li>
                      <li><strong>Données de projet :</strong> informations relatives à vos projets et demandes</li>
                      <li><strong>Données de formation :</strong> pour nos apprenants, informations nécessaires au suivi pédagogique (conformément aux exigences Qualiopi)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Finalités */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                    <Eye className="h-5 w-5 text-primary" />
                    Finalités du traitement
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Vos données sont utilisées pour :</p>
                    <ul className="list-disc space-y-2 pl-6">
                      <li>Gérer votre compte client et vos projets</li>
                      <li>Vous fournir nos services de développement web et formations</li>
                      <li>Assurer le suivi pédagogique (formations)</li>
                      <li>Répondre à vos demandes de contact</li>
                      <li>Améliorer nos services et notre site web</li>
                      <li>Respecter nos obligations légales et réglementaires</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Durée de conservation */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-4 text-xl font-semibold">Durée de conservation</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <ul className="list-disc space-y-2 pl-6">
                      <li><strong>Données clients :</strong> 3 ans après la fin de la relation commerciale</li>
                      <li><strong>Données de formation :</strong> 5 ans (conformément aux exigences Qualiopi)</li>
                      <li><strong>Données de connexion :</strong> 13 mois</li>
                      <li><strong>Cookies :</strong> 13 mois maximum</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Vos droits */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-4 text-xl font-semibold">Vos droits</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                    <ul className="list-disc space-y-2 pl-6">
                      <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données</li>
                      <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
                      <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
                      <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                      <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
                      <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
                    </ul>
                    <p className="mt-4">
                      Pour exercer ces droits, contactez-nous à : <strong>manuel.harpon@teknopy.com</strong>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                    <Mail className="h-5 w-5 text-primary" />
                    Contact
                  </h2>
                  <p className="text-muted-foreground">
                    Pour toute question concernant cette politique ou vos données personnelles, 
                    vous pouvez nous contacter à <strong>manuel.harpon@teknopy.com</strong> ou 
                    au <strong>+596 696 617 151</strong>.
                  </p>
                  <p className="mt-4 text-muted-foreground">
                    Vous pouvez également introduire une réclamation auprès de la CNIL (Commission 
                    Nationale de l&apos;Informatique et des Libertés) : <a href="https://www.cnil.fr" className="text-primary underline">www.cnil.fr</a>
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
