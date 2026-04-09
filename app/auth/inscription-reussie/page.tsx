import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CheckCircle2, Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function InscriptionReussiePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="relative w-full max-w-md">
          {/* Background decoration */}
          <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          
          <Card className="relative border-border/50 bg-card/95 backdrop-blur-sm">
            <CardHeader className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Inscription réussie !</CardTitle>
                <CardDescription className="mt-2">
                  Bienvenue dans la famille TEKNOPY
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">Vérifiez votre boîte mail</p>
                    <p className="mt-1 text-muted-foreground">
                      Un email de confirmation vous a été envoyé. Cliquez sur le lien pour activer votre compte.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button asChild className="w-full" variant="outline">
                  <Link href="/auth/connexion">
                    Se connecter
                  </Link>
                </Button>
                <Link 
                  href="/"
                  className="inline-flex w-full items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour à l&apos;accueil
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
