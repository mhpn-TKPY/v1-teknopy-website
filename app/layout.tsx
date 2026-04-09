import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CookieConsent } from '@/components/cookie-consent'
import { SidebarNav } from '@/components/sidebar-nav'
import { SocialShare, SocialShareMobile } from '@/components/social-share'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'TEKNOPY Concept | Agence Web en Martinique',
    template: '%s | TEKNOPY Concept',
  },
  description: "L'innovation au service du web. Creation de sites vitrines (400EUR), e-commerce (1000EUR), applications web, formations informatique et mathematiques (20EUR/h), reparation PC a Fort-de-France. Devis gratuit sous 24h.",
  keywords: [
    'agence web martinique',
    'creation site web martinique',
    'developpeur web fort-de-france',
    'site vitrine martinique',
    'e-commerce martinique',
    'application web martinique',
    'formation informatique martinique',
    'cours mathematiques martinique',
    'reparation PC martinique',
    'depannage informatique fort-de-france',
    'consulting IT martinique',
    'tarif site web martinique',
    'prix site internet martinique',
    'plistech',
    'teknopy',
  ],
  authors: [{ name: 'TEKNOPY Concept', url: 'https://plistech.com' }],
  creator: 'Manuel Harpon',
  publisher: 'TEKNOPY Concept',
  generator: 'v0.app',
  metadataBase: new URL('https://plistech.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://plistech.com',
    siteName: 'TEKNOPY Concept',
    title: 'TEKNOPY Concept | Agence Web en Martinique',
    description: "L'innovation au service du web. Creation de sites web, applications, formations et reparations informatiques a Fort-de-France. Tarifs transparents et devis gratuit sous 24h.",
    images: [
      {
        url: 'https://plistech.com/opengraph-image.png',
        width: 1550,
        height: 1127,
        alt: 'TEKNOPY Creation - Le web au service de l\'innovation',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@teknopy',
    creator: '@teknopy',
    title: 'TEKNOPY Concept | Agence Web Martinique',
    description: 'Sites web, applications, formations informatiques et reparations PC a Fort-de-France. Devis gratuit.',
    images: ['https://plistech.com/twitter-image.png'],
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
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#22863a' },
    { media: '(prefers-color-scheme: dark)', color: '#2ea043' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// Structured Data (JSON-LD) for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://plistech.com/#organization',
      name: 'TEKNOPY Concept',
      alternateName: 'Plistech',
      url: 'https://plistech.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://plistech.com/images/logo-teknopy.png',
        width: 200,
        height: 88,
      },
      image: 'https://plistech.com/opengraph-image.png',
      description: "Agence de developpement web, consulting IT et formations informatiques en Martinique",
      telephone: '+596696617151',
      email: 'contact@plistech.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Fort-de-France',
        addressRegion: 'Martinique',
        postalCode: '97200',
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
      sameAs: [
        'https://www.facebook.com/teknopy',
        'https://www.instagram.com/teknopy',
        'https://twitter.com/teknopy',
        'https://www.linkedin.com/company/teknopy',
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://plistech.com/#localbusiness',
      name: 'TEKNOPY Concept',
      image: 'https://plistech.com/opengraph-image.png',
      priceRange: 'EUR EUR',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '21:00',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://plistech.com/#website',
      url: 'https://plistech.com',
      name: 'TEKNOPY Concept',
      description: 'Agence Web en Martinique',
      publisher: { '@id': 'https://plistech.com/#organization' },
      inLanguage: 'fr-FR',
    },
    {
      '@type': 'Service',
      '@id': 'https://plistech.com/#web-services',
      name: 'Creation de Sites Web',
      provider: { '@id': 'https://plistech.com/#organization' },
      serviceType: 'Developpement Web',
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
          description: 'Boutique en ligne avec paiement securise Stripe/PayPal',
          price: '1000',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          name: 'Application Web',
          description: 'Espace client personnalise avec tableau de bord',
          price: '1500',
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta property="og:image" content="https://plistech.com/opengraph-image.png" />
        <meta property="og:image:width" content="1550" />
        <meta property="og:image:height" content="1127" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="TEKNOPY Creation - Le web au service de l'innovation" />
        <meta name="twitter:image" content="https://plistech.com/twitter-image.png" />
        <meta name="twitter:image:alt" content="TEKNOPY Creation - Agence Web Martinique" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <SidebarNav />
        {children}
        <SocialShare />
        <SocialShareMobile />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}
