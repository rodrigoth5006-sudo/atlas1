"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 340, suffix: "%", label: "de aumento médio em ROI", prefix: "+" },
  { value: 200, suffix: "+", label: "empresas atendidas", prefix: "" },
  { value: 50, suffix: "M+", label: "em receita gerada para clientes", prefix: "R$" },
  { value: 98, suffix: "%", label: "de taxa de retenção de clientes", prefix: "" },
]

function AnimatedCounter({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let start = 0
          const duration = 2000
          const step = Math.ceil(value / (duration / 16))
          const timer = setInterval(() => {
            start += step
            if (start >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(start)
            }
          }, 16)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

const caseStudies = [
  {
    company: "E-commerce de Moda",
    segment: "Varejo Online",
    result: "+520% em receita",
    period: "em 6 meses",
    channel: "Meta Ads + SEO",
    color: "from-primary/20 to-accent/10",
  },
  {
    company: "Clínica Odontológica",
    segment: "Saúde & Bem-estar",
    result: "+280% em agendamentos",
    period: "em 4 meses",
    channel: "Google Ads + Social",
    color: "from-accent/20 to-primary/10",
  },
  {
    company: "SaaS B2B",
    segment: "Tecnologia",
    result: "12x ROI",
    period: "em 8 meses",
    channel: "Inbound + LinkedIn",
    color: "from-primary/20 to-accent/10",
  },
]

export default function Results() {
  return (
    <section id="results" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-primary mb-4">
            Resultados comprovados
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance mb-4">
            Números que falam <br className="hidden md:block" />
            por si mesmos
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Mais do que promessas — entregamos resultados mensuráveis que impactam diretamente o seu faturamento.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-8 rounded-2xl bg-background border border-border hover:border-primary/30 transition-colors"
            >
              <div className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <p className="text-sm text-muted-foreground leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Case Studies */}
        <h3 className="font-serif text-2xl font-bold text-foreground text-center mb-8">
          Cases de sucesso
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <div
              key={cs.company}
              className={`p-8 rounded-2xl bg-background border border-border hover:border-primary/40 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-semibold text-foreground">{cs.company}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cs.segment}</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {cs.channel}
                </span>
              </div>
              <div className="font-serif text-3xl font-bold text-primary mb-1">{cs.result}</div>
              <p className="text-sm text-muted-foreground">{cs.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
