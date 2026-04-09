import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CookieConsent } from '@/components/cookie-consent'
import { SidebarNav } from '@/components/sidebar-nav'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'TEKNOPY Concept | Agence Web & Prestations Informatiques en Martinique',
    template: '%s | TEKNOPY Concept',
  },
  description: 'Agence de développement web, création de sites vitrines (400€), e-commerce (1000€), applications web, formations informatique et mathématiques (20€/h), réparation PC à Fort-de-France. Devis gratuit sous 24h.',
  keywords: [
    'agence web martinique',
    'création site web martinique',
    'développeur web fort-de-france',
    'site vitrine martinique',
    'e-commerce martinique',
    'application web martinique',
    'formation informatique martinique',
    'cours mathématiques martinique',
    'réparation PC martinique',
    'dépannage informatique fort-de-france',
    'consulting IT martinique',
    'tarif site web martinique',
    'prix site internet martinique',
  ],
  authors: [{ name: 'TEKNOPY Concept', url: 'https://teknopy.com' }],
  creator: 'Manuel Harpon',
  publisher: 'TEKNOPY Concept',
  generator: 'v0.app',
  metadataBase: new URL('https://teknopy.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://teknopy.com',
    siteName: 'TEKNOPY Concept',
    title: 'TEKNOPY Concept | Agence Web & Prestations Informatiques en Martinique',
    description: 'Création de sites web, applications, formations et réparations informatiques à Fort-de-France. Tarifs transparents et devis gratuit sous 24h.',
    images: [
      {
        url: '/images/og-teknopy.jpg',
        width: 1200,
        height: 630,
        alt: 'TEKNOPY Concept - Agence Web Martinique',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEKNOPY Concept | Agence Web Martinique',
    description: 'Sites web, applications, formations informatiques et réparations PC à Fort-de-France. Devis gratuit.',
  },
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
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#22863a' },
    { media: '(prefers-color-scheme: dark)', color: '#2ea043' },
  ],
  width: 'device-width',
  initialScale: 1,
}

// Structured Data (JSON-LD) for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://teknopy.com/#organization',
      name: 'TEKNOPY Concept',
      alternateName: 'Plistech',
      description: 'Agence de développement web, consulting IT et formations informatiques en Martinique',
      url: 'https://teknopy.com',
      telephone: '+596696617151',
      email: 'contact@plistech.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Fort-de-France',
        addressRegion: 'Martinique',
        addressCountry: 'FR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 14.6161,
        longitude: -61.0588,
      },
      areaServed: {
        '@type': 'Place',
        name: 'Martinique',
      },
      priceRange: '€€',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '21:00',
      },
    },
    {
      '@type': 'Service',
      '@id': 'https://teknopy.com/#web-services',
      name: 'Création de Sites Web',
      provider: { '@id': 'https://teknopy.com/#organization' },
      serviceType: 'Développement Web',
      areaServed: 'Martinique',
      offers: [
        {
          '@type': 'Offer',
          name: 'Site Web Vitrine',
          description: 'Site responsive 1-5 pages avec formulaire de contact et SEO de base',
          price: '400',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          name: 'Site E-commerce',
          description: 'Boutique en ligne avec paiement sécurisé Stripe/PayPal',
          price: '1000',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          name: 'Application Web',
          description: 'Espace client personnalisé avec tableau de bord',
          price: '1500',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          name: 'Application Mobile',
          description: 'Application cross-platform iOS & Android',
          price: '1200',
          priceCurrency: 'EUR',
        },
      ],
    },
    {
      '@type': 'EducationalOrganization',
      '@id': 'https://teknopy.com/#training',
      name: 'TEKNOPY Formations',
      parentOrganization: { '@id': 'https://teknopy.com/#organization' },
      areaServed: 'Fort-de-France, Martinique',
      offers: [
        {
          '@type': 'Offer',
          name: 'Cours d\'informatique particulier',
          description: 'Initiation, bureautique, sécurité web, HTML/CSS/JS',
          price: '20',
          priceCurrency: 'EUR',
          unitCode: 'HUR',
        },
        {
          '@type': 'Offer',
          name: 'Cours de mathématiques',
          description: 'Niveau 6e à 2nd, préparation Brevet, adultes',
          price: '20',
          priceCurrency: 'EUR',
          unitCode: 'HUR',
        },
        {
          '@type': 'Offer',
          name: 'Formation Intra-Entreprise',
          description: 'Session de 2h minimum, jusqu\'à 5 personnes',
          price: '100',
          priceCurrency: 'EUR',
        },
      ],
    },
    {
      '@type': 'Service',
      '@id': 'https://teknopy.com/#repair-services',
      name: 'Réparation & Maintenance PC',
      provider: { '@id': 'https://teknopy.com/#organization' },
      serviceType: 'Dépannage Informatique',
      areaServed: 'Martinique',
      offers: [
        {
          '@type': 'Offer',
          name: 'Diagnostic Matériel',
          description: 'Rapport de panne complet, offert si réparation acceptée',
          price: '20',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          name: 'Installation Windows/Drivers',
          description: 'Formatage, OS, drivers et logiciels essentiels',
          price: '50',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          name: 'Récupération de Données',
          description: 'Sur disque fonctionnel',
          price: '50',
          priceCurrency: 'EUR',
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <SidebarNav />
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}
