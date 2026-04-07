"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Send, Phone, Mail, MapPin, CheckCircle, RefreshCw, Clock, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { sendVerificationEmail } from "@/lib/web3forms-client"

const services = [
  "Site Web Vitrine",
  "Application Web",
  "Application Mobile",
  "E-commerce",
  "Consulting IT",
  "Formation Informatique",
  "Formation Mathématiques",
  "Autre",
]

const RESEND_DELAY_SECONDS = 120 // 2 minutes before allowing resend

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [selectedService, setSelectedService] = useState<string>("")
  // Saved form data for resend
  const savedDataRef = useRef<Record<string, unknown> | null>(null)
  // Countdown: seconds remaining before resend is allowed
  const [countdown, setCountdown] = useState(0)
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startCountdown = useCallback(() => {
    setCountdown(RESEND_DELAY_SECONDS)
    if (countdownRef.current) clearInterval(countdownRef.current)
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current!)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [])

  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [])

  const submitForm = useCallback(async (data: Record<string, unknown>, isResend = false) => {
    if (isResend) setIsResending(true)
    else setIsSubmitting(true)
    
    // Clear previous errors
    setIsError(false)
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: "Erreur serveur" }))
        setIsError(true)
        setErrorMessage(err.error || "Une erreur est survenue. Veuillez réessayer.")
        return
      }

      const result = await response.json()

      // Attempt to send verification email — non-blocking.
      // Token is already stored in Supabase; email is best-effort.
      let sent = false
      try {
        sent = await sendVerificationEmail(
          result.email as string,
          result.name as string,
          result.magicLink as string
        )
      } catch {
        sent = false
      }

      savedDataRef.current = data
      setEmailSent(sent)
      setIsSuccess(true)
      startCountdown()
    } catch {
      setIsError(true)
      setErrorMessage("Impossible de contacter le serveur. Vérifiez votre connexion.")
    } finally {
      if (isResend) setIsResending(false)
      else setIsSubmitting(false)
    }
  }, [startCountdown])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: selectedService || formData.get("service"),
      message: formData.get("message"),
    }
    await submitForm(data)
  }

  async function handleResend() {
    if (!savedDataRef.current || countdown > 0) return
    await submitForm(savedDataRef.current, true)
  }

  function handleNewRequest() {
    // Reset all states to show the blank form again without page reload
    setIsSuccess(false)
    setIsError(false)
    setErrorMessage("")
    setEmailSent(false)
    setIsSubmitting(false)
    setIsResending(false)
    setSelectedService("")
    setCountdown(0)
    if (countdownRef.current) clearInterval(countdownRef.current)
    savedDataRef.current = null
  }

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0")
    const s = (secs % 60).toString().padStart(2, "0")
    return `${m}:${s}`
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
              {isError && (
                <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-900 dark:bg-red-900/20 dark:text-red-300">
                  <p className="font-semibold mb-1">Erreur</p>
                  <p>{errorMessage}</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => setIsError(false)}
                  >
                    Réessayer
                  </Button>
                </div>
              )}
              {isSuccess ? (
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">
                      {emailSent ? "Vérification nécessaire" : "Demande enregistrée"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {emailSent
                        ? "Un email de vérification a été envoyé. Cliquez sur le lien pour confirmer votre demande."
                        : "Votre demande a bien été enregistrée. Utilisez le bouton ci-dessous pour renvoyer le lien de vérification."}
                    </p>
                  </div>

                  <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-900 dark:bg-blue-900/20 dark:text-blue-300">
                    <p className="font-semibold mb-2">Comment ça fonctionne ?</p>
                    <ul className="list-inside list-disc space-y-1 text-xs">
                      <li>Un email de vérification est envoyé à votre adresse</li>
                      <li>Cliquez sur le lien de vérification dans l&apos;email</li>
                      <li>Votre message et un récapitulatif seront alors envoyés</li>
                      <li>L&apos;équipe Teknopy recevra également votre message</li>
                    </ul>
                  </div>

                  {/* Resend section */}
                  <div className="rounded-lg border border-border p-4 text-center space-y-3">
                    <p className="text-xs text-muted-foreground">
                      Le lien expire dans <strong>10 minutes</strong>. Si vous ne l&apos;avez pas reçu ou s&apos;il a expiré, vous pouvez en demander un nouveau.
                    </p>
                    {countdown > 0 ? (
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Renvoi disponible dans <strong className="font-mono tabular-nums">{formatCountdown(countdown)}</strong></span>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={handleResend}
                        disabled={isResending}
                      >
                        {isResending ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Renvoi en cours...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="h-4 w-4" />
                            Renvoyer un nouveau lien
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {/* New request — resets the form without page reload */}
                  <div className="border-t border-border pt-4 text-center">
                    <p className="mb-3 text-xs text-muted-foreground">
                      Vous souhaitez soumettre une autre demande ?
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-muted-foreground hover:text-foreground"
                      onClick={handleNewRequest}
                    >
                      <PlusCircle className="h-4 w-4" />
                      Nouvelle demande
                    </Button>
                  </div>
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

                    <Field>
                      <FieldLabel htmlFor="service">Service souhaité *</FieldLabel>
                      <Select name="service" required onValueChange={setSelectedService}>
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

                    <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
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
  )
}
