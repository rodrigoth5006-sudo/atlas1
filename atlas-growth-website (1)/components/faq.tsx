"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "Quanto tempo leva para ver resultados?",
    answer:
      "Os primeiros resultados geralmente aparecem entre 30 e 60 dias, dependendo do canal e da estratégia. Campanhas de tráfego pago tendem a gerar resultados mais rápidos, enquanto SEO e inbound têm um ciclo de maturação um pouco maior. Oferecemos garantia de resultados nos primeiros 90 dias de contrato.",
  },
  {
    question: "Qual o investimento mínimo para começar?",
    answer:
      "Trabalhamos com empresas a partir de R$3.000/mês em gestão, além do investimento em mídia. O valor ideal depende dos seus objetivos e do tamanho do mercado que você quer atingir. Realizamos um diagnóstico gratuito para recomendar o melhor pacote para o seu caso.",
  },
  {
    question: "Vocês trabalham com contratos de fidelidade?",
    answer:
      "Nossos contratos têm prazo mínimo de 3 meses, pois acreditamos que resultados sólidos demandam tempo para planejamento, execução e otimização. Após esse período, o contrato é renovado mensalmente com flexibilidade total para você.",
  },
  {
    question: "Como funciona o processo de onboarding?",
    answer:
      "Após a assinatura do contrato, realizamos um onboarding completo em até 7 dias úteis. Isso inclui acesso às contas, entrevistas de briefing aprofundado, auditoria das ações atuais e entrega do plano estratégico dos primeiros 90 dias.",
  },
  {
    question: "Quais relatórios e métricas recebo?",
    answer:
      "Você terá acesso a um dashboard em tempo real com as principais métricas do seu negócio. Além disso, entregamos relatórios semanais e um relatório mensal executivo com análise de performance, insights e plano de ação para o próximo período.",
  },
  {
    question: "Vocês atendem quais segmentos de mercado?",
    answer:
      "Temos experiência em e-commerce, saúde, educação, tecnologia (SaaS), serviços B2B e B2C, infoprodutos e varejo físico. Nossa metodologia é adaptável a qualquer segmento, com estratégias personalizadas para o seu público e mercado.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-primary mb-4">
            Dúvidas frequentes
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
            Perguntas & Respostas
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                openIndex === i ? "border-primary/40 bg-card" : "border-border bg-card hover:border-primary/20"
              }`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-foreground text-base leading-snug">{faq.question}</span>
                <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${openIndex === i ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`} aria-hidden="true">
                  {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
