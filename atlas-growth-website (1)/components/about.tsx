"use client"

import { CheckCircle2 } from "lucide-react"
import Image from "next/image"
import dynamic from "next/dynamic"

const AtlasHologram = dynamic(() => import("./atlas-hologram"), {
  ssr: false,
})

const pillars = [
  "Estratégia personalizada para cada cliente",
  "Relatórios transparentes e em tempo real",
  "Time especializado por vertical de negócio",
  "Reuniões semanais de alinhamento e performance",
  "SLA de resposta em até 2 horas úteis",
  "Garantia de resultados nos primeiros 90 dias",
]

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-background py-24">
      <div className="absolute right-0 top-0 bottom-0 hidden w-[52%] pointer-events-none opacity-25 lg:block">
        <AtlasHologram />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80"
                alt="Equipe jovem e dinâmica da Atlas Growth reunida em torno de uma mesa de trabalho colaborativo, analisando resultados de campanhas digitais em monitores"
                className="h-[420px] w-full object-cover object-top"
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(30,10,60,0.72) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
                    Nossa sede
                  </p>
                  <p className="font-serif text-lg font-bold leading-tight text-foreground">
                    Uberlândia, MG
                  </p>
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/20 px-3 py-1.5 backdrop-blur-sm">
                  <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-medium text-primary">
                    Desde 2025
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 -bottom-6 hidden rounded-2xl border border-border bg-card p-5 shadow-xl md:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                  <Image
                    src="/atlas-growth-logo.png"
                    alt="Atlas Growth"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Fundada em</p>
                  <p className="font-serif font-bold text-foreground">2025</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Sobre a Atlas Growth
            </span>

            <h2 className="mb-6 font-serif text-4xl font-bold text-balance text-foreground md:text-5xl">
              Carregamos o peso do crescimento digital para você
            </h2>

            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              Assim como o titã Atlas sustentou o mundo sobre seus ombros, nós
              carregamos a responsabilidade do crescimento digital do seu negócio
              — com força, estratégia e comprometimento total.
            </p>

            <p className="mb-8 leading-relaxed text-muted-foreground">
              Nascida em Uberlândia em 2025, a Atlas Growth reúne um time de
              especialistas em cada canal digital com uma missão clara: ser mais
              do que uma agência. Somos uma extensão do seu time comercial,
              completamente focados nos seus resultados.
            </p>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <li key={pillar} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-snug text-muted-foreground">
                    {pillar}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
