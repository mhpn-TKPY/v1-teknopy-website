"use client"

import { useState } from "react"
import { Share2, X, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Custom social icons as SVG components
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

function XTwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

const shareLinks = [
  {
    name: "WhatsApp",
    icon: WhatsAppIcon,
    getUrl: (url: string, title: string) => 
      `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
    color: "hover:bg-[#25D366] hover:text-white",
    bgColor: "bg-[#25D366]",
  },
  {
    name: "X",
    icon: XTwitterIcon,
    getUrl: (url: string, title: string) => 
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    color: "hover:bg-black hover:text-white",
    bgColor: "bg-black",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    getUrl: () => "https://instagram.com/teknopy_concept",
    color: "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:text-white",
    bgColor: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
  },
  {
    name: "TikTok",
    icon: TikTokIcon,
    getUrl: () => "https://tiktok.com/@teknopy_concept",
    color: "hover:bg-black hover:text-white",
    bgColor: "bg-black",
  },
  {
    name: "Google",
    icon: GoogleIcon,
    getUrl: (url: string) => 
      `https://www.google.com/search?q=${encodeURIComponent(url)}`,
    color: "hover:bg-white hover:text-[#4285F4] hover:shadow-md",
    bgColor: "bg-white",
  },
  {
    name: "Email",
    icon: Mail,
    getUrl: (url: string, title: string) => 
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Decouvrez TEKNOPY Concept: ${url}`)}`,
    color: "hover:bg-primary hover:text-white",
    bgColor: "bg-primary",
  },
]

export function SocialShare() {
  const [isOpen, setIsOpen] = useState(false)
  const siteUrl = "https://teknopy.com"
  const siteTitle = "TEKNOPY Concept - Agence Web en Martinique"

  return (
    <div className="fixed bottom-24 right-4 z-40 hidden md:block">
      {/* Share button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={cn(
          "h-12 w-12 rounded-full shadow-lg transition-all duration-300",
          isOpen 
            ? "bg-muted text-muted-foreground hover:bg-muted" 
            : "bg-primary text-white hover:bg-primary/90"
        )}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
      </Button>

      {/* Share options */}
      <div
        className={cn(
          "absolute bottom-16 right-0 flex flex-col gap-2 transition-all duration-300",
          isOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {shareLinks.map((link, index) => (
          <a
            key={link.name}
            href={link.getUrl(siteUrl, siteTitle)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border shadow-md transition-all duration-200",
              link.color
            )}
            style={{
              transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
            }}
            title={`Partager sur ${link.name}`}
          >
            <link.icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </div>
  )
}

// Floating share bar for mobile (horizontal at bottom)
export function SocialShareMobile() {
  const siteUrl = "https://teknopy.com"
  const siteTitle = "TEKNOPY Concept - Agence Web en Martinique"

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-sm py-2 px-4 md:hidden">
      <div className="flex items-center justify-around">
        {shareLinks.slice(0, 5).map((link) => (
          <a
            key={link.name}
            href={link.getUrl(siteUrl, siteTitle)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200",
              link.color
            )}
            title={`Partager sur ${link.name}`}
          >
            <link.icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </div>
  )
}
