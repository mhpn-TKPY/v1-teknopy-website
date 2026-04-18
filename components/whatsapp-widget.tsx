"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, Send, Bot, User, Phone, FileText, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Types
interface Message {
  id: string
  text: string
  sender: "bot" | "user"
  timestamp: Date
  options?: QuickOption[]
}

interface QuickOption {
  label: string
  value: string
  icon?: React.ReactNode
}

interface LeadData {
  name?: string
  email?: string
  phone?: string
  projectType?: string
  budget?: string
  description?: string
  collectedAt?: Date
}

// Chatbot configuration
const WHATSAPP_NUMBER = "596696330921"
const BUSINESS_HOURS = { start: 8, end: 18 }

// Check if within business hours (Martinique timezone)
function isBusinessHours(): boolean {
  const now = new Date()
  const hour = now.getHours()
  return hour >= BUSINESS_HOURS.start && hour < BUSINESS_HOURS.end
}

// Generate unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

// Initial bot messages and conversation flow
const CONVERSATION_FLOW = {
  welcome: {
    text: "Bonjour! Je suis l'assistant virtuel de TEKNOPY Concept. Comment puis-je vous aider aujourd'hui?",
    options: [
      { label: "Demander un devis", value: "devis", icon: <FileText className="h-3 w-3" /> },
      { label: "Nos services", value: "services", icon: <CheckCircle2 className="h-3 w-3" /> },
      { label: "Parler a un conseiller", value: "contact", icon: <Phone className="h-3 w-3" /> },
    ]
  },
  devis: {
    text: "Parfait! Pour etablir votre devis personnalise, j'ai besoin de quelques informations. Quel type de projet vous interesse?",
    options: [
      { label: "Site Vitrine", value: "site-vitrine" },
      { label: "E-commerce", value: "e-commerce" },
      { label: "Application Web", value: "application" },
      { label: "Refonte de site", value: "refonte" },
    ]
  },
  services: {
    text: "Voici nos principaux services:\n\n- Sites Vitrine (a partir de 99EUR)\n- E-commerce & Boutiques en ligne\n- Applications Web sur mesure\n- Consulting IT & Formation\n- Maintenance & Support\n\nQuel service vous interesse?",
    options: [
      { label: "Demander un devis", value: "devis" },
      { label: "Voir nos offres", value: "offres" },
      { label: "Contacter un conseiller", value: "contact" },
    ]
  },
  offres: {
    text: "Nos offres speciales Martinique:\n\n- Site Vitrine 3 pages: 99EUR\n- Offre Associatif: 19EUR/an\n- Menu Restaurant: 79EUR/an\n\nProfitez de ces prix exceptionnels!",
    options: [
      { label: "Je suis interesse", value: "devis" },
      { label: "Plus d'infos", value: "contact" },
    ]
  },
  contact: {
    text: "Un conseiller est disponible! Cliquez ci-dessous pour demarrer une conversation WhatsApp directe.",
    options: [{ label: "Ouvrir WhatsApp", value: "whatsapp", icon: <MessageCircle className="h-3 w-3" /> }]
  },
  "contact-offline": {
    text: "Nous sommes actuellement fermes (8h-18h). Laissez-nous vos coordonnees et nous vous recontacterons des demain!",
    options: [{ label: "Laisser mes coordonnees", value: "collect-info" }]
  },
  "site-vitrine": {
    text: "Excellent choix! Un site vitrine est parfait pour presenter votre activite. Quel est votre budget approximatif?",
    options: [
      { label: "Moins de 500EUR", value: "budget-small" },
      { label: "500EUR - 1500EUR", value: "budget-medium" },
      { label: "Plus de 1500EUR", value: "budget-large" },
    ]
  },
  "e-commerce": {
    text: "Une boutique en ligne est un excellent investissement! Quel est votre budget approximatif?",
    options: [
      { label: "Moins de 1000EUR", value: "budget-small" },
      { label: "1000EUR - 3000EUR", value: "budget-medium" },
      { label: "Plus de 3000EUR", value: "budget-large" },
    ]
  },
  "application": {
    text: "Les applications web sur mesure sont notre specialite! Quel est votre budget approximatif?",
    options: [
      { label: "Moins de 2000EUR", value: "budget-small" },
      { label: "2000EUR - 5000EUR", value: "budget-medium" },
      { label: "Plus de 5000EUR", value: "budget-large" },
    ]
  },
  "refonte": {
    text: "Une refonte peut transformer votre presence en ligne! Quel est votre budget approximatif?",
    options: [
      { label: "Moins de 500EUR", value: "budget-small" },
      { label: "500EUR - 2000EUR", value: "budget-medium" },
      { label: "Plus de 2000EUR", value: "budget-large" },
    ]
  },
  "budget-small": {
    text: "Parfait! Pour finaliser votre demande de devis, puis-je avoir votre prenom?",
    collectField: "name"
  },
  "budget-medium": {
    text: "Excellent! Pour finaliser votre demande de devis, puis-je avoir votre prenom?",
    collectField: "name"
  },
  "budget-large": {
    text: "Super! Pour un projet de cette envergure, nous vous proposerons une solution premium. Puis-je avoir votre prenom?",
    collectField: "name"
  },
  "collect-name": {
    text: "Merci {name}! Quelle est votre adresse email?",
    collectField: "email"
  },
  "collect-email": {
    text: "Parfait! Et votre numero de telephone (optionnel)?",
    collectField: "phone"
  },
  "collect-phone": {
    text: "Pouvez-vous decrire brievement votre projet?",
    collectField: "description"
  },
  "collect-description": {
    text: "Merci {name}! J'ai bien enregistre votre demande. Un conseiller TEKNOPY vous contactera dans les plus brefs delais.\n\nRecapitulatif:\n- Email: {email}\n- Tel: {phone}\n- Projet: {projectType}\n- Budget: {budget}\n\nA tres bientot!",
    options: [
      { label: "Contacter par WhatsApp", value: "whatsapp", icon: <MessageCircle className="h-3 w-3" /> },
    ]
  },
  "collect-info": {
    text: "Bien sur! Puis-je avoir votre prenom?",
    collectField: "name"
  }
}

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [leadData, setLeadData] = useState<LeadData>({})
  const [currentStep, setCurrentStep] = useState<string>("welcome")
  const [collectingField, setCollectingField] = useState<string | null>(null)
  const [showPulse, setShowPulse] = useState(true)
  const [isOnline, setIsOnline] = useState(true) // Default to true for SSR
  const [mounted, setMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Handle hydration - only check business hours after mount
  useEffect(() => {
    setMounted(true)
    setIsOnline(isBusinessHours())
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Show welcome message on open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage("welcome")
    }
  }, [isOpen, messages.length])

  // Hide pulse after first interaction
  useEffect(() => {
    if (isOpen) setShowPulse(false)
  }, [isOpen])

  // Add bot message with typing effect
  const addBotMessage = (step: string, customText?: string) => {
    setIsTyping(true)
    
    setTimeout(() => {
      const flow = CONVERSATION_FLOW[step as keyof typeof CONVERSATION_FLOW]
      if (!flow) return
      
      let text = customText || ('text' in flow ? flow.text : "")
      
      // Replace placeholders with lead data
      if (leadData.name) text = text.replace(/{name}/g, leadData.name)
      if (leadData.email) text = text.replace(/{email}/g, leadData.email)
      if (leadData.phone) text = text.replace(/{phone}/g, leadData.phone || "Non fourni")
      if (leadData.projectType) text = text.replace(/{projectType}/g, leadData.projectType)
      if (leadData.budget) text = text.replace(/{budget}/g, leadData.budget)
      
      const newMessage: Message = {
        id: generateId(),
        text,
        sender: "bot",
        timestamp: new Date(),
        options: 'options' in flow ? flow.options : undefined
      }
      
      setMessages(prev => [...prev, newMessage])
      setIsTyping(false)
      setCurrentStep(step)
      
      // Check if we need to collect a field
      if ('collectField' in flow && flow.collectField) {
        setCollectingField(flow.collectField)
      } else {
        setCollectingField(null)
      }
    }, 800 + Math.random() * 400)
  }

  // Handle user message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    
    const userMessage: Message = {
      id: generateId(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    
    // Handle field collection
    if (collectingField) {
      const updatedLead = { ...leadData }
      
      switch (collectingField) {
        case "name":
          updatedLead.name = inputValue
          setLeadData(updatedLead)
          setInputValue("")
          addBotMessage("collect-name")
          break
        case "email":
          updatedLead.email = inputValue
          setLeadData(updatedLead)
          setInputValue("")
          addBotMessage("collect-email")
          break
        case "phone":
          updatedLead.phone = inputValue
          setLeadData(updatedLead)
          setInputValue("")
          addBotMessage("collect-phone")
          break
        case "description":
          updatedLead.description = inputValue
          updatedLead.collectedAt = new Date()
          setLeadData(updatedLead)
          setInputValue("")
          // Save lead data (could be sent to Supabase here)
          saveLead(updatedLead)
          addBotMessage("collect-description")
          break
      }
    } else {
      setInputValue("")
      // Default response for free text
      addBotMessage("services")
    }
  }

  // Handle quick option click
  const handleOptionClick = (option: QuickOption) => {
    // Add user message showing their choice
    const userMessage: Message = {
      id: generateId(),
      text: option.label,
      sender: "user",
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    
    // Handle special actions
    if (option.value === "whatsapp") {
      openWhatsApp()
      return
    }
    
    // Store project type and budget if applicable
    if (["site-vitrine", "e-commerce", "application", "refonte"].includes(option.value)) {
      setLeadData(prev => ({ ...prev, projectType: option.label }))
    }
    if (option.value.startsWith("budget-")) {
      setLeadData(prev => ({ ...prev, budget: option.label }))
    }
    
    // Navigate to next step - handle contact based on business hours
    let nextStep = option.value
    if (option.value === "contact") {
      nextStep = isOnline ? "contact" : "contact-offline"
    }
    addBotMessage(nextStep)
  }

  // Open WhatsApp with pre-filled message
  const openWhatsApp = () => {
    const message = leadData.name 
      ? `Bonjour TEKNOPY! Je suis ${leadData.name}. ${leadData.projectType ? `Je suis interesse par: ${leadData.projectType}.` : ''} ${leadData.description || ''}`
      : "Bonjour TEKNOPY! Je souhaite avoir plus d'informations sur vos services."
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  // Save lead to localStorage (could be Supabase)
  const saveLead = async (lead: LeadData) => {
    try {
      // Save to localStorage for now
      const existingLeads = JSON.parse(localStorage.getItem("teknopy_leads") || "[]")
      existingLeads.push(lead)
      localStorage.setItem("teknopy_leads", JSON.stringify(existingLeads))
      
      // TODO: Send to Supabase or email API
      console.log("[v0] Lead saved:", lead)
    } catch (error) {
      console.error("[v0] Error saving lead:", error)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl",
          isOpen && "scale-0 opacity-0"
        )}
        aria-label="Ouvrir le chat WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
        {showPulse && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500"></span>
          </span>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-4 right-4 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl bg-background shadow-2xl transition-all duration-300",
          isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-[#25D366] px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-6 w-6" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#25D366] bg-green-400"></span>
            </div>
            <div>
              <p className="font-semibold">TEKNOPY Assistant</p>
              <p className="text-xs text-white/80">
                {mounted ? (isOnline ? "En ligne" : "Hors ligne - Reponse sous 24h") : "En ligne"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 hover:bg-white/20"
            aria-label="Fermer le chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-[#ECE5DD] p-3">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-3 py-2 shadow-sm",
                    message.sender === "user"
                      ? "rounded-br-none bg-[#DCF8C6]"
                      : "rounded-bl-none bg-white"
                  )}
                >
                  <p className="whitespace-pre-line text-sm text-slate-800">
                    {message.text}
                  </p>
                  <p className="mt-1 text-right text-[10px] text-slate-500">
                    {message.timestamp.toLocaleTimeString("fr-FR", { 
                      hour: "2-digit", 
                      minute: "2-digit" 
                    })}
                  </p>
                  
                  {/* Quick Options */}
                  {message.options && message.options.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {message.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(option)}
                          className="flex items-center gap-1.5 rounded-full border border-[#25D366] bg-white px-3 py-1.5 text-xs font-medium text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
                        >
                          {option.icon}
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-lg rounded-bl-none bg-white px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "0ms" }}></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "150ms" }}></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 border-t bg-white p-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder={collectingField ? "Tapez votre reponse..." : "Ecrivez un message..."}
            className="flex-1 rounded-full border-slate-200 bg-slate-50 text-sm"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="h-9 w-9 rounded-full bg-[#25D366] hover:bg-[#20BD5A]"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Business Hours Notice */}
        {mounted && !isOnline && (
          <div className="flex items-center justify-center gap-1.5 bg-amber-50 px-3 py-1.5 text-xs text-amber-700">
            <Clock className="h-3 w-3" />
            Horaires: 8h - 18h (Martinique)
          </div>
        )}
      </div>
    </>
  )
}
