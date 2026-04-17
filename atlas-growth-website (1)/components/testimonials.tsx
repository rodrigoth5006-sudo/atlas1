"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Mariana Costa",
    role: "CEO",
    company: "Moda Única Store",
    avatar: "MC",
    quote:
      "A Atlas Growth transformou completamente nosso e-commerce. Em apenas 6 meses, triplicamos nosso faturamento online. A equipe é extremamente profissional e os resultados são reais, não só relatórios bonitos.",
    stars: 5,
    metric: "+520% em receita",
  },
  {
    name: "Dr. Rafael Mendes",
    role: "Sócio-Diretor",
    company: "Clínica Sorrir Mais",
    avatar: "RM",
    quote:
      "Aumentamos nossos agendamentos em 280% em apenas 4 meses. O trabalho com Google Ads e redes sociais foi impecável. Hoje dependemos muito menos de indicações e temos um fluxo previsível de novos pacientes.",
    stars: 5,
    metric: "+280% em agendamentos",
  },
  {
    name: "Camila Fernandes",
    role: "Head de Marketing",
    company: "TechFlow SaaS",
    avatar: "CF",
    quote:
      "Contratamos a Atlas Growth para estruturar nossa estratégia de inbound. O resultado foi um ROI de 12x em 8 meses. A transparência e a comunicação constante fazem toda a diferença.",
    stars: 5,
    metric: "12x ROI em 8 meses",
  },
  {
    name: "Paulo Ribeiro",
    role: "Fundador",
    company: "Cursos Ribeiro",
    avatar: "PR",
    quote:
      "Escalamos do zero a R$1M/mês em lançamentos digitais com a estratégia de tráfego pago da Atlas. Eles não só criam campanhas — entendem profundamente o negócio e o cliente.",
    stars: 5,
    metric: "R$1M/mês em lançamentos",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")

  const prev = () => {
    setDirection("left")
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  }
  const next = () => {
    setDirection("right")
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))
  }

  const t = testimonials[current]

  return (
    <section id="testimonials" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-primary mb-4">
            Depoimentos
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
            O que nossos clientes dizem
          </h2>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-10 md:p-14 rounded-3xl bg-background border border-border">
            {/* Quote mark */}
            <div className="absolute top-8 left-10 text-6xl font-serif text-primary/20 leading-none select-none" aria-hidden="true">&ldquo;</div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} size={16} className="fill-primary text-primary" aria-hidden="true" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic relative z-10">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author row */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <span className="font-serif font-bold text-primary text-sm">{t.avatar}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
              <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
                {t.metric}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft size={18} className="text-foreground" aria-hidden="true" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === current ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Ir para depoimento ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
              aria-label="Próximo depoimento"
            >
              <ChevronRight size={18} className="text-foreground" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
