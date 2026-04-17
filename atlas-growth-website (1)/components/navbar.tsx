"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Serviços", href: "#services" },
  { label: "Resultados", href: "#results" },
  { label: "Sobre", href: "#about" },
  { label: "Depoimentos", href: "#testimonials" },
  { label: "Contato", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNav = (href: string) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <Image
              src="/atlas-growth-logo.png"
              alt="Atlas Growth logo"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-xl font-bold tracking-wide text-foreground">
                Atlas <span className="text-primary">Growth</span>
              </span>
              <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground">
                Agência de Aquisição de Clientes
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleNav("#contact")}
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-accent transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              Falar com especialista
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="flex flex-col px-6 py-4 gap-4" aria-label="Navegação mobile">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors text-left cursor-pointer py-1"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("#contact")}
              className="mt-2 px-5 py-3 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-accent transition-all text-center cursor-pointer"
            >
              Falar com especialista
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
