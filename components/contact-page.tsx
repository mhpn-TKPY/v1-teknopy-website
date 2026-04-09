"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle, 
  Clock, 
  MessageSquare,
  Shield,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"

const services = [
  "Site Web Vitrine",
  "Site E-commerce",
  "Application Web",
  "Application Mobile",
  "Consulting IT",
  "Formation Informatique",
  "Formation Mathématiques",
  "Réparation PC",
  "Autre",
]

const benefits = [
  {
    icon: Clock,
    title: "Réponse sous 24h",
    description: "Nous vous recontactons rapidement pour discuter de votre projet",
  },
  {
    icon: Shield,
    title: "Devis gratuit",
    description: "Estimation détaillée sans engagement et sans frais cachés",
  },
  {
    icon: Zap,
    title: "Tarifs transparents",
    description: "Des prix clairs et compétitifs adaptés au marché martiniquais",
  },
]

const faq = [
  {
    question: "Comment se déroule un projet ?",
    answer: "Après un premier échange pour comprendre vos besoins, nous établissons un cahier des charges et un devis. Une fois validé, nous démarrons le développement avec des points réguliers jusqu'à la livraison.",
  },
  {
    question: "Quels sont les délais de réalisation ?",
    answer: "Un site vitrine prend généralement 2-3 semaines, un e-commerce 4-6 semaines. Les délais précis sont indiqués dans le devis selon la complexité du projet.",
  },
  {
    question: "Proposez-vous de la maintenance ?",
    answer: "Oui, nous proposons des forfaits de maintenance mensuels pour garder votre site à jour, sécurisé et performant. Les tarifs sont discutés selon vos besoins.",
  },
]

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background pb-12 pt-8 md:pb-16 md:pt-12">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <MessageSquare className="mr-1 h-3 w-3" />
              Contactez-nous
            </Badge>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
              Devenez client en{" "}
              <span className="text-primary">3 clics</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground text-pretty">
              Remplissez le formulaire ci-dessous et nous vous répondrons sous 24 heures avec un devis personnalisé et détaillé.
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <benefit.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-5">
            {/* Contact info */}
            <div className="space-y-6 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Informations de contact</CardTitle>
                  <CardDescription>
                    N&apos;hésitez pas à nous contacter directement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a
                    href="tel:+596696617151"
                    className="flex items-center gap-3 rounded-lg p-3 text-sm transition-colors hover:bg-secondary/50"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-lg text-primary">+596 696 617 151</p>
                    </div>
                  </a>

                  <a
                    href="mailto:manuel.harpon@teknopy.com"
                    className="flex items-center gap-3 rounded-lg p-3 text-sm transition-colors hover:bg-secondary/50"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-primary">manuel.harpon@teknopy.com</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 rounded-lg p-3 text-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Localisation</p>
                      <p className="text-muted-foreground">Fort-de-France, Martinique</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg p-3 text-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Horaires</p>
                      <p className="text-muted-foreground">Lun-Sam: 10h - 21h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="mb-2 text-lg font-semibold text-foreground">
                      Devis gratuit et sans engagement
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Réponse garantie sous 24 heures ouvrées
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact form */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-xl">Demander un devis</CardTitle>
                <CardDescription>
                  Décrivez votre projet et nous vous contacterons rapidement
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="mb-2 text-2xl font-semibold">Message envoyé !</h3>
                    <p className="mb-6 max-w-sm text-muted-foreground">
                      Merci pour votre message. Nous vous répondrons sous 24 heures avec un devis personnalisé.
                    </p>
                    <Button asChild variant="outline">
                      <Link href="/">Retour à l&apos;accueil</Link>
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <FieldGroup>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field>
                          <FieldLabel htmlFor="name">Nom complet *</FieldLabel>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Votre nom"
                            required
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="email">Email *</FieldLabel>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="votre@email.com"
                            required
                          />
                        </Field>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field>
                          <FieldLabel htmlFor="phone">Téléphone</FieldLabel>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+596 696 ..."
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="service">Service souhaité *</FieldLabel>
                          <Select name="service" required>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un service" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service} value={service}>
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                      </div>

                      <Field>
                        <FieldLabel htmlFor="message">Votre message *</FieldLabel>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Décrivez votre projet, vos besoins, votre budget approximatif..."
                          rows={6}
                          required
                        />
                      </Field>

                      <Button type="submit" className="w-full gap-2" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Spinner className="h-4 w-4" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </FieldGroup>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-secondary/30 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              {faq.map((item) => (
                <Card key={item.question}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Une autre question ?{" "}
                <a href="tel:+596696617151" className="font-medium text-primary hover:underline">
                  Appelez-nous directement
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
