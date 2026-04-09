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
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/#services", label: "Services", icon: Layers },
  { href: "/tarifs", label: "Tarifs", icon: Euro },
  { href: "/projets", label: "Realisations", icon: FolderKanban },
  { href: "/formations", label: "Formations", icon: GraduationCap },
  { href: "/contact", label: "Contact", icon: Mail },
]

const ctaItems = [
  { href: "/espace-client", label: "Espace Client", icon: User, variant: "outline" as const },
  { href: "/contact", label: "Devis", icon: FileText, variant: "primary" as const },
]

export function SidebarNav() {
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()

  // Hide sidebar on espace-client, admin, and auth pages
  const hiddenPaths = ['/espace-client', '/admin', '/auth']
  const shouldHide = hiddenPaths.some(path => pathname.startsWith(path))
  
  if (shouldHide) return null

  return (
    <aside
      className={cn(
        "fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden flex-col rounded-l-2xl border border-r-0 border-border/40 bg-background/95 shadow-xl backdrop-blur transition-all duration-300 ease-in-out lg:flex",
        isExpanded ? "w-44" : "w-12"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Navigation items */}
      <nav className="py-3">
        <ul className="flex flex-col gap-0.5 px-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname.startsWith(item.href.replace("/#", "/")))
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  title={!isExpanded ? item.label : undefined}
                >
                  <item.icon className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-200",
                    isActive && "text-primary",
                    !isActive && "group-hover:scale-110"
                  )} />
                  <span 
                    className={cn(
                      "whitespace-nowrap text-xs transition-all duration-300",
                      isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Separator */}
      <div className="mx-2 h-px bg-border/40" />

      {/* CTA buttons */}
      <div className="py-2 px-1.5">
        <ul className="flex flex-col gap-0.5">
          {ctaItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "group flex items-center gap-2.5 rounded-lg px-2 py-2 text-xs font-medium transition-all duration-200",
                  item.variant === "primary" 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "border border-border/50 bg-background hover:bg-muted"
                )}
                title={!isExpanded ? item.label : undefined}
              >
                <item.icon className="h-4 w-4 shrink-0" />
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
