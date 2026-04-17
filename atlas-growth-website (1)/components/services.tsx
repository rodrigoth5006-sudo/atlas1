import { Search, Target, Share2, LineChart, Globe, Zap, BriefcaseBusiness } from "lucide-react"

const services = [
  {
    icon: Target,
    title: "Tráfego Pago",
    description:
      "Campanhas de alta performance no Google, Meta e YouTube com otimização contínua para maximizar seu retorno sobre investimento.",
    tags: ["Google Ads", "Meta Ads", "YouTube Ads"],
  },
  {
    icon: Search,
    title: "SEO Estratégico",
    description:
      "Posicionamento orgânico que gera tráfego qualificado e autoridade duradoura para sua marca nos principais mecanismos de busca.",
    tags: ["On-Page", "Link Building", "Técnico"],
  },
  {
    icon: LineChart,
    title: "Growth Hacking",
    description:
      "Experimentos data-driven para identificar os canais e estratégias com maior potencial de escala para o seu negócio.",
    tags: ["A/B Testing", "CRO", "Funil de Vendas"],
  },
  {
    icon: Share2,
    title: "Social Media",
    description:
      "Gestão completa de redes sociais com conteúdo estratégico que engaja, converte e fortalece o posicionamento da marca.",
    tags: ["Instagram", "LinkedIn", "TikTok"],
  },
  {
    icon: Globe,
    title: "Inbound Marketing",
    description:
      "Atraia, converta e fidelize clientes com conteúdo relevante, automações inteligentes e nutrição de leads qualificados.",
    tags: ["Email Marketing", "Blog", "Lead Nurturing"],
  },
  {
    icon: Zap,
    title: "Automação & CRM",
    description:
      "Implantamos sistemas de automação e CRM que escalam sua operação comercial sem aumentar proporcionalmente os custos.",
    tags: ["HubSpot", "RD Station", "Pipedrive"],
  },
  {
    icon: BriefcaseBusiness,
    title: "Consultoria Estratégica",
    description:
      "Diagnóstico completo do seu negócio digital com um plano de ação personalizado, metas claras e acompanhamento próximo de especialistas dedicados.",
    tags: ["Diagnóstico", "Planejamento", "Mentoria"],
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-primary mb-4">
            O que fazemos
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance mb-4">
            Soluções completas para <br className="hidden md:block" />
            escalar seu negócio
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            De estratégia ao resultado, somos o parceiro que seu negócio precisa para crescer com consistência.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ background: "radial-gradient(circle at top left, oklch(0.55 0.27 290 / 0.08) 0%, transparent 70%)" }}
                aria-hidden="true"
              />

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon size={22} className="text-primary" aria-hidden="true" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{service.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
