"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  Layers, 
  FolderKanban, 
  GraduationCap, 
  Mail, 
  Euro,
  User,
  FileText,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { 
    href: "/", 
    label: "Accueil", 
    icon: Home,
    description: "Page principale"
  },
  { 
    href: "/#services", 
    label: "Services", 
    icon: Layers,
    description: "Nos prestations"
  },
  { 
    href: "/tarifs", 
    label: "Tarifs", 
    icon: Euro,
    description: "Grille tarifaire"
  },
  { 
    href: "/projets", 
    label: "Realisations", 
    icon: FolderKanban,
    description: "Nos projets"
  },
  { 
    href: "/formations", 
    label: "Formations", 
    icon: GraduationCap,
    description: "Cours & formations"
  },
  { 
    href: "/contact", 
    label: "Contact", 
    icon: Mail,
    description: "Nous contacter"
  },
]

const ctaItems = [
  { 
    href: "/espace-client", 
    label: "Espace Client", 
    icon: User,
    variant: "outline" as const
  },
  { 
    href: "/contact", 
    label: "Devis Gratuit", 
    icon: FileText,
    variant: "primary" as const
  },
]

export function SidebarNav() {
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 hidden h-screen flex-col border-r border-border/40 bg-background/95 backdrop-blur transition-all duration-300 ease-in-out md:flex",
        isExpanded ? "w-56" : "w-16"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo area */}
      <div className="flex h-16 items-center justify-center border-b border-border/40 px-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
            T
          </div>
          <span 
            className={cn(
              "font-bold text-foreground whitespace-nowrap transition-all duration-300",
              isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
            )}
          >
            TEKNOPY
          </span>
        </Link>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="flex flex-col gap-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname.startsWith(item.href.replace("/#", "/")))
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 shrink-0 transition-transform duration-200",
                    isActive && "text-primary",
                    !isActive && "group-hover:scale-110"
                  )} />
                  <div 
                    className={cn(
                      "flex flex-col transition-all duration-300",
                      isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
                    )}
                  >
                    <span className="whitespace-nowrap">{item.label}</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {item.description}
                    </span>
                  </div>
                  {isActive && isExpanded && (
                    <ChevronRight className="ml-auto h-4 w-4 text-primary" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* CTA buttons */}
      <div className="border-t border-border/40 p-2">
        <ul className="flex flex-col gap-1">
          {ctaItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  item.variant === "primary" 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "border border-border bg-background hover:bg-muted"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span 
                  className={cn(
                    "whitespace-nowrap transition-all duration-300",
                    isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
