import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AlertTriangle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function ErreurPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="relative w-full max-w-md">
          {/* Background decoration */}
          <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-destructive/10 blur-3xl" />
          
          <Card className="relative border-border/50 bg-card/95 backdrop-blur-sm">
            <CardHeader className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Une erreur est survenue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-muted-foreground">
                {params?.error ? (
                  <p>Erreur : {params.error}</p>
                ) : (
                  <p>Une erreur non spécifiée est survenue lors de l&apos;authentification.</p>
                )}
              </div>
              
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/auth/connexion">
                    Réessayer
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
