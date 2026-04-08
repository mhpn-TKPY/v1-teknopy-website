import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'TEKNOPY Concept | Agence Web Martinique',
  description: 'Agence de développement web et consulting IT en Martinique. Création de sites web, applications, et formations informatiques. Devenez client en 3 clics!',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/favicon-32x32.jpg',
        sizes: '32x32',
        type: 'image/jpeg',
      },
      {
        url: '/images/logo-teknopy.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    apple: '/apple-touch-icon.jpg',
    shortcut: '/favicon-32x32.jpg',
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
