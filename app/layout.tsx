import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  // Titre optimisé SEO avec mots-clés principaux
  title: {
    default: 'TEKNOPY Création | Agence Web & Développement Martinique',
    template: '%s | TEKNOPY Création',
  },
  description: 'Agence de développement web et consulting IT en Martinique. Création de sites web, applications mobiles, et formations informatiques. L\'innovation au service du web. Devis gratuit sous 24h!',
  generator: 'v0.app',
  // Mots-clés SEO optimisés
  keywords: [
    'développement web martinique',
    'création site web martinique', 
    'agence web martinique',
    'consulting IT martinique',
    'formation informatique martinique',
    'TEKNOPY',
    'site vitrine martinique',
    'application web martinique',
    'wordpress martinique',
    'e-commerce martinique',
    'Fort-de-France',
    'développeur freelance martinique'
  ],
  authors: [{ name: 'Manuel HARPON', url: 'https://plistech.com' }],
  creator: 'TEKNOPY Création',
  publisher: 'TEKNOPY Création',
  // Informations de base - URL du domaine principal
  metadataBase: new URL('https://plistech.com'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
    },
  },
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Icônes pour tous les navigateurs et OS
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/logo-teknopy-150.png', sizes: '150x110', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    other: [
      { rel: 'mask-icon', url: '/images/logo-teknopy.svg', color: '#10b981' },
    ],
  },
  // Manifest PWA
  manifest: '/manifest.json',
  // Open Graph pour partage social (WhatsApp, Facebook, LinkedIn)
  openGraph: {
    title: 'TEKNOPY Création | Agence Web Martinique',
    description: 'L\'innovation au service du web. Création de sites web, applications et formations IT en Martinique. Devis gratuit!',
    url: 'https://plistech.com',
    siteName: 'TEKNOPY Création',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://plistech.com/og-image.png',
        width: 550,
        height: 400,
        alt: 'TEKNOPY Création - Agence Web Martinique',
        type: 'image/png',
      },
    ],
  },
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'TEKNOPY Création | Agence Web Martinique',
    description: 'L\'innovation au service du web. Création de sites web, applications et formations IT en Martinique.',
    images: ['https://plistech.com/og-image.png'],
    creator: '@teknopy',
  },
  // Catégorie
  category: 'technology',
  // Vérification
  verification: {
    google: 'google-site-verification-code', // À remplacer par votre code
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
