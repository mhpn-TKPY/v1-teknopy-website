"use client"

import { useState } from "react"
import { Send, Phone, Mail, MapPin, CheckCircle, Globe, GraduationCap, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

// Web3Forms API Key (envoie à contact@plistech.com)
const WEB3FORMS_ACCESS_KEY = "dd2f81b5-56ac-4e05-8320-ae65fddec383"

// URL du logo TEKNOPY (hébergé publiquement)
const LOGO_URL = "https://v1-teknopy-website.vercel.app/images/logo-teknopy.png"

// Fonction pour générer le template HTML de l'email
function generateEmailHTML(data: {
  name: string
  email: string
  phone: string
  service: string
  message: string
  date: string
}) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle demande - TEKNOPY</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5; line-height: 1.6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header avec logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 32px 40px; text-align: center;">
              <img src="${LOGO_URL}" alt="TEKNOPY Création" style="max-width: 180px; height: auto;" />
              <h1 style="color: #ffffff; margin: 16px 0 0 0; font-size: 24px; font-weight: 600;">Nouvelle Demande de Devis</h1>
            </td>
          </tr>
          
          <!-- Corps du message -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #374151; font-size: 16px; margin: 0 0 24px 0;">
                Bonjour,<br><br>
                Une nouvelle demande de devis a été soumise via le formulaire de contact du site TEKNOPY. Voici les détails :
              </p>
              
              <!-- Carte d'information client -->
              <table role="presentation" style="width: 100%; background-color: #f9fafb; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="color: #10b981; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px 0; font-weight: 600;">Informations Client</h2>
                    
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                          <span style="color: #6b7280; font-size: 14px;">Nom complet</span>
                        </td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                          <strong style="color: #111827; font-size: 14px;">${data.name}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                          <span style="color: #6b7280; font-size: 14px;">Email</span>
                        </td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                          <a href="mailto:${data.email}" style="color: #10b981; font-size: 14px; text-decoration: none;">${data.email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                          <span style="color: #6b7280; font-size: 14px;">Téléphone</span>
                        </td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                          <a href="tel:${data.phone}" style="color: #10b981; font-size: 14px; text-decoration: none;">${data.phone || 'Non renseigné'}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #6b7280; font-size: 14px;">Date de la demande</span>
                        </td>
                        <td style="padding: 8px 0; text-align: right;">
                          <span style="color: #111827; font-size: 14px;">${data.date}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Service demandé -->
              <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <h2 style="color: rgba(255,255,255,0.9); font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0; font-weight: 500;">Service Demandé</h2>
                    <p style="color: #ffffff; font-size: 18px; margin: 0; font-weight: 600;">${data.service}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Message -->
              <table role="presentation" style="width: 100%; background-color: #f9fafb; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="color: #10b981; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px 0; font-weight: 600;">Message</h2>
                    <p style="color: #374151; font-size: 15px; margin: 0; white-space: pre-wrap;">${data.message}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Bouton Répondre -->
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="text-align: center; padding: 16px 0;">
                    <a href="mailto:${data.email}?subject=RE: Votre demande de devis - ${data.service}" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                      Répondre au client
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px 0;">
                <strong style="color: #374151;">TEKNOPY Création</strong> - Services Informatiques
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                Fort-de-France, Martinique | +596 696 617 151 | contact@plistech.com
              </p>
              <p style="color: #9ca3af; font-size: 11px; margin: 16px 0 0 0;">
                Cet email a été généré automatiquement suite à une demande sur teknopy.com
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string>("")

  const selectedCategoryData = serviceCategories.find(c => c.id === selectedCategory)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    
    // Récupérer les valeurs du formulaire
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string || ""
    const message = formData.get("message") as string
    const date = new Date().toLocaleString("fr-FR", { 
      timeZone: "America/Martinique",
      dateStyle: "full",
      timeStyle: "short"
    })
    
    // Générer le template HTML pour l'email
    const emailHTML = generateEmailHTML({
      name,
      email,
      phone,
      service: selectedService,
      message,
      date
    })
    
    // Créer un nouveau FormData pour Web3Forms avec le template HTML
    const web3FormData = new FormData()
    web3FormData.append("access_key", WEB3FORMS_ACCESS_KEY)
    web3FormData.append("subject", `[TEKNOPY] Nouvelle demande - ${selectedService}`)
    web3FormData.append("from_name", "TEKNOPY Création")
    web3FormData.append("replyto", email)
    web3FormData.append("botcheck", "")
    
    // Champs pour le template (Web3Forms les utilise dans l'email)
    web3FormData.append("name", name)
    web3FormData.append("email", email)
    web3FormData.append("phone", phone || "Non renseigné")
    web3FormData.append("service", selectedService)
    web3FormData.append("message", message)
    web3FormData.append("date", date)

    try {
      // Appel direct à Web3Forms côté client (évite le blocage Cloudflare)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3FormData,
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        form.reset()
        setSelectedCategory(null)
        setSelectedService("")
        
        // Sauvegarder également en base de données
        try {
          await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              phone,
              service: selectedService,
              message,
            }),
          })
        } catch {
          // Silently fail - email was sent successfully
        }
      } else {
        setErrorMessage(data.message || "Une erreur est survenue. Veuillez réessayer.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrorMessage("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-secondary/30 py-10 md:py-14 lg:py-16" aria-labelledby="contact-heading">
      <div className="container mx-auto px-4">
        <header className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
          <span className="mb-2 inline-block text-sm font-medium text-primary">Demande de Devis Gratuit</span>
          <h2 id="contact-heading" className="mb-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Contactez TEKNOPY Création
          </h2>
          <p className="text-muted-foreground">
            Devenez client en 3 clics! Remplissez le formulaire et nous vous répondrons sous 24h. Devis 100% gratuit.
          </p>
        </header>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-5 lg:gap-8">
          {/* Contact info */}
          <div className="space-y-6 lg:col-span-2">
            {/* Founder Card with Photo */}
            <Card className="overflow-hidden">
              <div className="relative">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5" />
                
                <CardContent className="relative pt-6">
                  {/* Photo and info */}
                  <div className="flex flex-col items-center text-center">
                    {/* Photo with ring */}
                    <div className="relative mb-4">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary to-accent opacity-75 blur-sm" />
                      <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-background shadow-xl md:h-28 md:w-28">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/images/manuel-harpon.jpg"
                          alt="Manuel HARPON - Fondateur TEKNOPY"
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      {/* Online indicator */}
                      <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-background bg-green-500" />
                    </div>
                    
                    {/* Name and title */}
                    <h3 className="text-lg font-bold text-foreground">Manuel HARPON</h3>
                    <p className="mb-3 text-sm text-primary font-medium">Fondateur & Lead Developer</p>
                    
                    {/* Brief description */}
                    <p className="mb-4 text-xs text-muted-foreground leading-relaxed">
                      Expert en solutions digitales avec 5+ ans d&apos;expérience. 
                      Je vous accompagne de A à Z dans la réalisation de vos projets.
                    </p>

                    {/* Quick stats */}
                    <div className="grid w-full grid-cols-3 gap-2 rounded-lg bg-background/80 p-3 text-center backdrop-blur-sm">
                      <div>
                        <p className="text-lg font-bold text-primary">50+</p>
                        <p className="text-xs text-muted-foreground">Projets</p>
                      </div>
                      <div className="border-x border-border">
                        <p className="text-lg font-bold text-primary">5+</p>
                        <p className="text-xs text-muted-foreground">Années</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-primary">100%</p>
                        <p className="text-xs text-muted-foreground">Satisfaction</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* Contact details card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Contact direct</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href="tel:+596696617151"
                  className="flex items-center gap-3 rounded-lg p-2 text-sm transition-all hover:bg-primary/5 hover:text-primary"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">+596 696 617 151</p>
                    <p className="text-xs text-muted-foreground">Appeler maintenant</p>
                  </div>
                </a>

                <a
                  href="mailto:contact@plistech.com"
                  className="flex items-center gap-3 rounded-lg p-2 text-sm transition-all hover:bg-primary/5 hover:text-primary"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">contact@plistech.com</p>
                    <p className="text-xs text-muted-foreground">Réponse sous 24h</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 rounded-lg p-2 text-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Fort-de-France</p>
                    <p className="text-xs text-muted-foreground">Martinique, France</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Devis 100% gratuit</p>
                    <p className="text-xs text-muted-foreground">Réponse garantie sous 24h</p>
                  </div>
                </div>
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
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-green-700">
                    Demande envoyée avec succès!
                  </h3>
                  <p className="text-muted-foreground">
                    Merci pour votre demande. Notre équipe a bien reçu votre message
                    et vous enverra un email de confirmation sous 24 heures avec le récapitulatif de votre demande.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setIsSuccess(false)}
                  >
                    Envoyer une autre demande
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Hidden fields for Web3Forms */}
                  <input type="hidden" name="botcheck" value="" />
                  <input type="hidden" name="redirect" value="false" />
                  
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

                    {errorMessage && (
                      <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
                        {errorMessage}
                      </div>
                    )}

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
