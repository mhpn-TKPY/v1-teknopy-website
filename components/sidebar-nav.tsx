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
        "fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden flex-col rounded-r-2xl border border-l-0 border-border/40 bg-background/95 shadow-xl backdrop-blur transition-all duration-300 ease-in-out lg:flex",
        isExpanded ? "w-48" : "w-14"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Navigation items */}
      <nav className="py-4">
        <ul className="flex flex-col gap-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname.startsWith(item.href.replace("/#", "/")))
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  )}
                  title={!isExpanded ? item.label : undefined}
                >
                  <item.icon className={cn(
                    "h-5 w-5 shrink-0 transition-transform duration-200",
                    !isActive && "group-hover:scale-110"
                  )} />
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
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
