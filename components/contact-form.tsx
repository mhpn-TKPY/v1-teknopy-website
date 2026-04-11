"use client"

import { useState } from "react"
import { Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { ServiceSelector, type SelectedService } from "@/components/service-selector"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([])
  const [estimatedTotal, setEstimatedTotal] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    
    // Web3Forms configuration
    formData.append('access_key', 'dd2f81b5-56ac-4e05-8320-ae65fddec383')
    
    // IMPORTANT: Redirect emails to the admin email
    formData.append('to_email', 'manuel.harpon@teknopy.com')
    
    // Format services for the email
    const servicesText = selectedServices.length > 0 
      ? selectedServices.map(s => `${s.name} (${s.price})`).join(', ') 
      : 'Non specifie'
    formData.append('services', servicesText)
    formData.append('estimated_total', estimatedTotal || 'Non calcule')
    
    // Subject with services
    const serviceNames = selectedServices.map(s => s.name).join(', ')
    formData.append('subject', `[TEKNOPY] Demande de devis - ${serviceNames || 'Services non specifies'}`)
    formData.append('from_name', formData.get('name') as string)
    
    // Replyto for easy response
    formData.append('replyto', formData.get('email') as string)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      
      if (result.success) {
        setIsSuccess(true)
        form.reset()
        setSelectedServices([])
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
            Devenez client en 3 clics! Remplissez le formulaire et nous vous repondrons sous 24h.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-5">
          {/* Contact info */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations de contact</CardTitle>
                <CardDescription>
                  N&apos;hesitez pas a nous contacter directement
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
                    <p className="font-medium">Telephone</p>
                    <p className="text-muted-foreground">+596 696 617 151</p>
                  </div>
                </a>

                <a
                  href="mailto:manuel.harpon@teknopy.com"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">manuel.harpon@teknopy.com</p>
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
                  <strong className="text-foreground">Devis gratuit</strong> pour tous vos projets web. Reponse garantie sous 24 heures ouvrees.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact form */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">Demander un devis</CardTitle>
              <CardDescription>
                Selectionnez vos services et decrivez votre projet
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Message envoye!</h3>
                  <p className="text-muted-foreground">
                    Merci pour votre message. Nous vous repondrons sous 24 heures.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setIsSuccess(false)}
                  >
                    Envoyer un autre message
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

                    <Field>
                      <FieldLabel htmlFor="phone">Telephone</FieldLabel>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+596 696 ..."
                      />
                    </Field>

                    <Field>
                      <FieldLabel>Services souhaites *</FieldLabel>
                      <p className="text-xs text-muted-foreground mb-2">
                        Selectionnez un ou plusieurs services pour obtenir une estimation
                      </p>
                      <ServiceSelector 
                        selectedServices={selectedServices}
                        onServicesChange={setSelectedServices}
                        onTotalChange={setEstimatedTotal}
                      />
                      {/* Hidden input for form validation */}
                      <input 
                        type="hidden" 
                        name="services_selected" 
                        value={selectedServices.map(s => s.name).join(', ')} 
                        required={selectedServices.length === 0}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="message">Details du projet *</FieldLabel>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Decrivez votre projet, vos objectifs, vos delais souhaites..."
                        rows={4}
                        required
                      />
                    </Field>

                    <Button 
                      type="submit" 
                      className="w-full gap-2" 
                      disabled={isSubmitting || selectedServices.length === 0}
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner className="h-4 w-4" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Envoyer la demande de devis
                        </>
                      )}
                    </Button>

                    {selectedServices.length === 0 && (
                      <p className="text-xs text-center text-muted-foreground">
                        Veuillez selectionner au moins un service pour continuer
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
