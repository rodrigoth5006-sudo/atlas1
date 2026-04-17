"use client"

import { useEffect, useState } from "react"
import { ArrowRight, TrendingUp, Users, BarChart3 } from "lucide-react"
import AnimatedBg from "./animated-bg"

const words = ["Vendas", "Clientes", "Receita", "Crescimento"]

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length)
        setVisible(true)
      }, 300)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const handleScroll = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated network background */}
      <AnimatedBg />

      {/* Light overlay — subtle white wash so text contrasts over the animated bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.10) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 pt-32 pb-20 flex items-center min-h-screen">
        <div className="w-full">

          {/* ── Content ── */}
          <div className="flex flex-col items-start text-left max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              <span className="text-sm font-medium text-primary">+200 empresas escaladas</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-foreground mb-6 text-balance">
              Mais{" "}
              <span
                className="text-primary inline-block transition-all duration-300"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(-10px)",
                }}
              >
                {words[wordIndex]}
              </span>
              <br />
              para o Seu Negócio
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Estratégias de marketing digital orientadas por dados que transformam cliques em clientes e visitantes em receita previsível.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-14">
              <button
                onClick={() => handleScroll("#contact")}
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-accent transition-all duration-200 hover:scale-105 cursor-pointer"
                style={{ boxShadow: "0 0 30px oklch(0.55 0.27 290 / 0.4)" }}
              >
                Solicitar diagnóstico gratuito
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
              <button
                onClick={() => handleScroll("#results")}
                className="px-8 py-4 rounded-full border border-border text-foreground font-semibold text-base hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer backdrop-blur-sm"
              >
                Ver resultados
              </button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
              {[
                { icon: TrendingUp, value: "+340%", label: "ROI médio" },
                { icon: Users, value: "200+", label: "Clientes" },
                { icon: BarChart3, value: "R$50M+", label: "Em receita" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-1.5 p-4 rounded-2xl bg-card/60 border border-border hover:border-primary/30 transition-colors backdrop-blur-sm"
                >
                  <stat.icon size={20} className="text-primary" aria-hidden="true" />
                  <span className="font-serif text-2xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-xs text-muted-foreground text-center">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, oklch(1 0 0))" }}
        aria-hidden="true"
      />
    </section>
  )
}
