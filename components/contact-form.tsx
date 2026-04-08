"use client"

import { useState } from "react"
import { Send, Phone, Mail, MapPin, CheckCircle, MailCheck, Monitor, Globe, GraduationCap, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

// Service categories with their services
const serviceCategories = [
  {
    id: "web",
    name: "Développement Web",
    icon: Globe,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    services: [
      "Site Web Vitrine",
      "Application Web",
      "E-commerce",
      "Application Mobile",
    ],
  },
  {
    id: "consulting",
    name: "Consulting & Formation",
    icon: GraduationCap,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    services: [
      "Consulting IT",
      "Formation Informatique",
      "Formation Mathématiques",
    ],
  },
  {
    id: "hardware",
    name: "Réparation Hardware",
    icon: Wrench,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    services: [
      "Réparation PC / Laptop",
      "Dépannage Logiciel Windows",
      "Récupération de Données",
      "Nettoyage / Optimisation PC",
      "Installation Windows / Drivers",
      "Remplacement Composants (RAM, SSD, Écran)",
      "Diagnostic Matériel",
    ],
  },
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [requiresVerification, setRequiresVerification] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string>("")

  const selectedCategoryData = serviceCategories.find(c => c.id === selectedCategory)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: selectedService || formData.get("service"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const result = await response.json()
        setIsSuccess(true)
        setRequiresVerification(result.requiresVerification ?? false)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-secondary/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Contactez-nous
          </h2>
          <p className="text-muted-foreground">
            Devenez client en 3 clics! Remplissez le formulaire et nous vous répondrons sous 24h.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-5">
          {/* Contact info */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations de contact</CardTitle>
                <CardDescription>
                  N&apos;hésitez pas à nous contacter directement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <a
                  href="tel:+596696617151"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-muted-foreground">+596 696 617 151</p>
                  </div>
                </a>

                <a
                  href="mailto:contact@plistech.com"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">contact@plistech.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Localisation</p>
                    <p className="text-muted-foreground">Fort-de-France, Martinique</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-6">
                <p className="text-center text-sm text-muted-foreground">
                  <strong className="text-foreground">Devis gratuit</strong> pour tous vos projets web. Réponse garantie sous 24 heures ouvrées.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact form */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">Demander un devis</CardTitle>
              <CardDescription>
                Décrivez votre projet et nous vous contacterons rapidement
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {requiresVerification ? (
                      <MailCheck className="h-8 w-8 text-primary" />
                    ) : (
                      <CheckCircle className="h-8 w-8 text-primary" />
                    )}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {requiresVerification ? "Vérifiez votre email!" : "Message envoyé!"}
                  </h3>
                  <p className="text-muted-foreground">
                    {requiresVerification 
                      ? "Un email de vérification a été envoyé à votre adresse. Cliquez sur le lien pour confirmer votre demande."
                      : "Merci pour votre message. Nous vous répondrons sous 24 heures."
                    }
                  </p>
                  {requiresVerification && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      Pensez à vérifier vos spams si vous ne recevez pas l&apos;email.
                    </p>
                  )}
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

                    <Field>
                      <FieldLabel htmlFor="phone">Téléphone</FieldLabel>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+596 696 ..."
                      />
                    </Field>

                    {/* Service Category Selection */}
                    <Field>
                      <FieldLabel>Catégorie de service *</FieldLabel>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {serviceCategories.map((category) => {
                          const Icon = category.icon
                          const isSelected = selectedCategory === category.id
                          return (
                            <button
                              key={category.id}
                              type="button"
                              onClick={() => {
                                setSelectedCategory(category.id)
                                setSelectedService("")
                              }}
                              className={cn(
                                "flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all hover:shadow-md",
                                isSelected
                                  ? `${category.borderColor} ${category.bgColor} border-2`
                                  : "border-border hover:border-primary/50"
                              )}
                            >
                              <div className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-full",
                                category.bgColor
                              )}>
                                <Icon className={cn("h-5 w-5", category.color)} />
                              </div>
                              <span className="text-sm font-medium">{category.name}</span>
                            </button>
                          )
                        })}
                      </div>
                    </Field>

                    {/* Service Selection (Radio Buttons) */}
                    {selectedCategoryData && (
                      <Field>
                        <FieldLabel>Service souhaité *</FieldLabel>
                        <RadioGroup
                          value={selectedService}
                          onValueChange={setSelectedService}
                          className="grid gap-2"
                        >
                          {selectedCategoryData.services.map((service) => (
                            <div
                              key={service}
                              className={cn(
                                "flex items-center space-x-3 rounded-lg border p-3 transition-colors",
                                selectedService === service
                                  ? `${selectedCategoryData.borderColor} ${selectedCategoryData.bgColor}`
                                  : "border-border hover:bg-secondary/50"
                              )}
                            >
                              <RadioGroupItem
                                value={service}
                                id={service}
                                className={cn(
                                  selectedService === service && selectedCategoryData.color
                                )}
                              />
                              <Label
                                htmlFor={service}
                                className="flex-1 cursor-pointer text-sm font-medium"
                              >
                                {service}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                        <input type="hidden" name="service" value={selectedService} />
                      </Field>
                    )}

                    <Field>
                      <FieldLabel htmlFor="message">Votre message *</FieldLabel>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Décrivez votre projet ou votre besoin..."
                        rows={4}
                        required
                      />
                    </Field>

                    <Button 
                      type="submit" 
                      className="w-full gap-2" 
                      disabled={isSubmitting || !selectedService}
                    >
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

                    {!selectedCategory && (
                      <p className="text-center text-sm text-muted-foreground">
                        Sélectionnez une catégorie de service pour continuer
                      </p>
                    )}
                  </FieldGroup>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
