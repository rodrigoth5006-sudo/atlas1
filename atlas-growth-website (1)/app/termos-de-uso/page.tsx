import Link from "next/link"
import Image from "next/image"
import { FileText, ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Termos de Uso — Atlas Growth",
  description: "Leia os termos e condições de uso do site e serviços da Atlas Growth.",
}

const sections = [
  {
    title: "1. Aceitação dos termos",
    content: `Ao acessar e utilizar o site da Atlas Growth (atlasgrowth.com.br), você concorda com os presentes Termos de Uso. Caso não concorde com qualquer parte destes termos, solicitamos que não utilize nosso site.\n\nEstes termos se aplicam a todos os visitantes, usuários e demais pessoas que acessarem ou utilizarem o site.`,
  },
  {
    title: "2. Descrição dos serviços",
    content: `A Atlas Growth é uma agência de aquisição de clientes que oferece os seguintes serviços:\n\n• Tráfego Pago (Google Ads, Meta Ads, LinkedIn Ads)\n• SEO Estratégico\n• Growth Hacking\n• Gestão de Redes Sociais\n• Inbound Marketing\n• Automação e CRM\n• Consultoria Estratégica\n\nAs condições específicas de cada serviço são definidas em contrato individual firmado entre a Atlas Growth e o cliente.`,
  },
  {
    title: "3. Uso do site",
    content: `Ao utilizar nosso site, você se compromete a:\n\n• Não utilizar o site para fins ilegais ou não autorizados\n• Não transmitir vírus, malware ou qualquer código malicioso\n• Não tentar obter acesso não autorizado a sistemas ou dados\n• Não reproduzir, duplicar ou copiar conteúdos sem autorização\n• Não realizar ações que possam sobrecarregar nossa infraestrutura\n• Fornecer informações verdadeiras ao preencher formulários`,
  },
  {
    title: "4. Propriedade intelectual",
    content: `Todo o conteúdo presente neste site — incluindo textos, imagens, logotipos, ícones, gráficos, vídeos, layouts e código-fonte — é de propriedade exclusiva da Atlas Growth ou de seus licenciadores, e está protegido pelas leis de propriedade intelectual brasileiras e internacionais.\n\nÉ expressamente proibida a reprodução, distribuição, modificação ou uso comercial de qualquer conteúdo sem autorização prévia e por escrito da Atlas Growth.`,
  },
  {
    title: "5. Formulário de contato e diagnóstico",
    content: `Ao preencher nosso formulário de diagnóstico gratuito, você:\n\n• Autoriza a Atlas Growth a entrar em contato via e-mail e WhatsApp\n• Confirma que as informações fornecidas são verdadeiras\n• Compreende que o diagnóstico gratuito não implica compromisso comercial\n• Concorda com o uso dos dados conforme nossa Política de Privacidade\n\nO diagnóstico gratuito é uma análise preliminar sem custo, realizada como cortesia pela Atlas Growth.`,
  },
  {
    title: "6. Isenção de responsabilidade",
    content: `O site é fornecido "no estado em que se encontra", sem garantias de qualquer natureza. A Atlas Growth não garante que:\n\n• O site estará disponível de forma ininterrupta ou livre de erros\n• Os resultados obtidos com o uso do site serão precisos ou confiáveis\n• Erros no site serão corrigidos imediatamente\n\nA Atlas Growth não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso ou impossibilidade de uso do site.`,
  },
  {
    title: "7. Links para terceiros",
    content: `Nosso site pode conter links para sites de terceiros, como redes sociais e plataformas parceiras. Esses links são fornecidos apenas para conveniência e não implicam endosso ou responsabilidade pelo conteúdo desses sites.\n\nA Atlas Growth não tem controle sobre o conteúdo, políticas de privacidade ou práticas de sites de terceiros e não assume qualquer responsabilidade por eles.`,
  },
  {
    title: "8. Resultados e casos de sucesso",
    content: `Os resultados apresentados em nosso site (como percentuais de aumento de ROI, redução de CPC, etc.) são baseados em campanhas reais de clientes anteriores e servem apenas como referência.\n\nResultados passados não garantem resultados futuros. O desempenho de campanhas de marketing digital varia de acordo com o segmento, mercado, produto, investimento e outros fatores fora do controle da Atlas Growth.`,
  },
  {
    title: "9. Modificações",
    content: `A Atlas Growth reserva-se o direito de modificar estes Termos de Uso a qualquer momento, sem aviso prévio. As alterações entram em vigor imediatamente após publicação no site.\n\nO uso continuado do site após quaisquer modificações constitui aceitação dos novos termos. Recomendamos que você revise este documento periodicamente.`,
  },
  {
    title: "10. Lei aplicável e foro",
    content: `Estes Termos de Uso são regidos e interpretados de acordo com as leis da República Federativa do Brasil. Para a resolução de qualquer disputa decorrente destes termos, fica eleito o foro da comarca de Uberlândia, MG, com exclusão de qualquer outro, por mais privilegiado que seja.`,
  },
  {
    title: "11. Contato",
    content: `Para dúvidas sobre estes Termos de Uso, entre em contato:\n\nAtlas Growth — Agência de Aquisição de Clientes\nUberlândia, MG — Brasil\nE-mail: businessatlasgrowth@gmail.com\nWhatsApp: (34) 9 9981-8307\nInstagram: @businessatlasgrowth`,
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} aria-hidden="true" />
            Voltar ao site
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/atlas-growth-logo.png" alt="Atlas Growth" width={32} height={32} className="object-contain" />
            <span className="font-serif font-bold text-foreground text-sm">
              Atlas <span className="text-primary">Growth</span>
            </span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-secondary border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <FileText size={20} className="text-primary" aria-hidden="true" />
            </div>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Documento legal</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Termos de Uso
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Leia com atenção os termos e condições que regem o uso do site e dos serviços da Atlas Growth.
          </p>
          <div className="flex flex-wrap gap-6 mt-8 text-xs text-muted-foreground">
            <span>Última atualização: Janeiro de 2025</span>
            <span>Versão: 1.0</span>
            <span>Válido para o território brasileiro</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Quick nav */}
        <div className="mb-12 p-6 rounded-2xl bg-secondary border border-border">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Índice</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sections.map((s) => (
              <li key={s.title}>
                <a
                  href={`#${s.title.replace(/\s+/g, "-").toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-12">
          {sections.map((s) => (
            <article
              key={s.title}
              id={s.title.replace(/\s+/g, "-").toLowerCase()}
              className="border-b border-border pb-12 last:border-0"
            >
              <h2 className="font-serif text-xl font-bold text-foreground mb-4">{s.title}</h2>
              <div className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line">
                {s.content}
              </div>
            </article>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center">
          <p className="font-serif text-lg font-bold text-foreground mb-2">Precisa de mais informações?</p>
          <p className="text-sm text-muted-foreground mb-6">Entre em contato com nossa equipe para esclarecer qualquer dúvida sobre nossos termos e serviços.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:businessatlasgrowth@gmail.com"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-accent transition-colors"
            >
              Enviar e-mail
            </a>
            <Link
              href="/politica-de-privacidade"
              className="px-6 py-3 rounded-xl border border-border text-foreground text-sm font-semibold hover:border-primary/40 transition-colors"
            >
              Ver Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
