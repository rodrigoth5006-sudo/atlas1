import { CheckCircle2 } from "lucide-react"
import Image from "next/image"
import dynamic from "next/dynamic"

const AtlasHologram = dynamic(() => import("./atlas-hologram"), { ssr: false })

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
    <section id="about" className="relative py-24 bg-background overflow-hidden">
      {/* CSS hologram background */}
      <div className="absolute right-0 top-0 bottom-0 w-[52%] opacity-25 pointer-events-none hidden lg:block">
        <AtlasHologram />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80"
                alt="Equipe jovem e dinâmica da Atlas Growth reunida em torno de uma mesa de trabalho colaborativo, analisando resultados de campanhas digitais em monitores"
                className="w-full h-[420px] object-cover object-top"
              />
              {/* Bottom fade overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(30,10,60,0.72) 0%, transparent 60%)" }}
                aria-hidden="true"
              />
              {/* Bottom label over the image */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="text-xs text-primary font-semibold tracking-widest uppercase mb-1">Nossa sede</p>
                  <p className="font-serif text-lg font-bold text-foreground leading-tight">Uberlândia, MG</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                  <span className="text-xs text-primary font-medium">Desde 2025</span>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-5 shadow-xl hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Image src="/atlas-growth-logo.png" alt="Atlas Growth" width={28} height={28} className="object-contain" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Fundada em</p>
                  <p className="font-serif font-bold text-foreground">2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-primary mb-4">
              Sobre a Atlas Growth
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance mb-6">
              Carregamos o peso do crescimento digital para você
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Assim como o titã Atlas sustentou o mundo sobre seus ombros, nós carregamos a responsabilidade do crescimento digital do seu negócio — com força, estratégia e comprometimento total.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Nascida em Uberlândia em 2025, a Atlas Growth reúne um time de especialistas em cada canal digital com uma missão clara: ser mais do que uma agência. Somos uma extensão do seu time comercial, completamente focados nos seus resultados.
            </p>

            {/* Pillars */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pillars.map((pillar) => (
                <li key={pillar} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground leading-snug">{pillar}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
