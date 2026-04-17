import Link from "next/link"
import Image from "next/image"
import { Shield, ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Política de Privacidade — Atlas Growth",
  description: "Saiba como a Atlas Growth coleta, usa e protege seus dados pessoais.",
}

const sections = [
  {
    title: "1. Quem somos",
    content: `A Atlas Growth é uma agência de aquisição de clientes localizada em Uberlândia, MG, fundada em 2025. Atuamos com estratégias de marketing digital orientadas por dados para gerar crescimento real e mensurável para nossos clientes. Para entrar em contato: businessatlasgrowth@gmail.com | (34) 9 9981-8307.`,
  },
  {
    title: "2. Quais dados coletamos",
    content: `Coletamos apenas as informações necessárias para prestar nossos serviços e responder às suas solicitações:\n\n• Nome completo\n• Endereço de e-mail\n• Número de telefone\n• Nome da empresa\n• Informações sobre investimento em marketing\n• Mensagens enviadas através do formulário de contato\n\nTambém podemos coletar automaticamente dados de navegação como endereço IP, tipo de navegador, páginas visitadas e tempo de permanência, por meio de cookies e ferramentas de analytics.`,
  },
  {
    title: "3. Como usamos seus dados",
    content: `Utilizamos suas informações para:\n\n• Responder às suas solicitações de diagnóstico e contato\n• Enviar propostas comerciais e informações sobre nossos serviços\n• Melhorar a experiência de navegação em nosso site\n• Enviar comunicações de marketing, desde que você tenha consentido\n• Cumprir obrigações legais e regulatórias\n\nNão vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins comerciais sem o seu consentimento explícito.`,
  },
  {
    title: "4. Base legal para o tratamento",
    content: `Tratamos seus dados com base nas seguintes hipóteses legais previstas na Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018):\n\n• Consentimento: quando você preenche nosso formulário de contato\n• Legítimo interesse: para fins de analytics e melhoria do site\n• Execução de contrato: quando existe uma relação comercial estabelecida\n• Cumprimento de obrigação legal: quando exigido por lei`,
  },
  {
    title: "5. Cookies e tecnologias similares",
    content: `Nosso site utiliza cookies para:\n\n• Garantir o funcionamento correto das páginas\n• Analisar o tráfego e comportamento dos visitantes (Google Analytics)\n• Mensurar a efetividade de campanhas publicitárias\n\nVocê pode configurar seu navegador para recusar cookies a qualquer momento. No entanto, isso pode afetar o funcionamento de algumas funcionalidades do site.`,
  },
  {
    title: "6. Compartilhamento de dados",
    content: `Seus dados podem ser compartilhados apenas nas seguintes situações:\n\n• Com prestadores de serviços que nos auxiliam na operação do site (hospedagem, e-mail)\n• Com ferramentas de analytics como Google Analytics, mediante anonimização\n• Com autoridades competentes, quando exigido por lei ou ordem judicial\n\nTodos os terceiros com quem compartilhamos dados estão sujeitos a obrigações contratuais de confidencialidade e proteção.`,
  },
  {
    title: "7. Por quanto tempo guardamos seus dados",
    content: `Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas nesta política ou pelo prazo exigido por lei. Em geral:\n\n• Dados de contato e leads: até 2 anos após o último contato\n• Dados de clientes ativos: durante toda a vigência do contrato + 5 anos\n• Dados de analytics: conforme configuração da ferramenta utilizada\n\nApós esse período, seus dados são excluídos de forma segura ou anonimizados.`,
  },
  {
    title: "8. Seus direitos como titular",
    content: `Nos termos da LGPD, você tem os seguintes direitos:\n\n• Confirmar a existência de tratamento de seus dados\n• Acessar os dados que temos sobre você\n• Corrigir dados incompletos ou desatualizados\n• Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários\n• Solicitar a portabilidade de seus dados\n• Revogar o consentimento a qualquer momento\n• Solicitar a eliminação de dados tratados com base no consentimento\n\nPara exercer qualquer desses direitos, entre em contato: businessatlasgrowth@gmail.com`,
  },
  {
    title: "9. Segurança dos dados",
    content: `Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui o uso de conexões criptografadas (HTTPS), controle de acesso restrito e revisões periódicas de segurança.`,
  },
  {
    title: "10. Alterações nesta política",
    content: `Podemos atualizar esta Política de Privacidade periodicamente. Quando isso ocorrer, atualizaremos a data de revisão no topo desta página. Recomendamos que você a revise regularmente. O uso continuado do site após as alterações implica aceitação da política atualizada.`,
  },
  {
    title: "11. Contato e encarregado de dados (DPO)",
    content: `Para dúvidas, solicitações ou reclamações relacionadas ao tratamento de seus dados pessoais, entre em contato com nossa equipe:\n\nAtlas Growth — Agência de Aquisição de Clientes\nUberlândia, MG — Brasil\nE-mail: businessatlasgrowth@gmail.com\nWhatsApp: (34) 9 9981-8307`,
  },
]

export default function PrivacyPage() {
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
              <Shield size={20} className="text-primary" aria-hidden="true" />
            </div>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Documento legal</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Política de Privacidade
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Sua privacidade é fundamental para nós. Este documento descreve como coletamos, usamos e protegemos suas informações pessoais.
          </p>
          <div className="flex flex-wrap gap-6 mt-8 text-xs text-muted-foreground">
            <span>Última atualização: Janeiro de 2025</span>
            <span>Versão: 1.0</span>
            <span>Conforme LGPD — Lei nº 13.709/2018</span>
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
          <p className="font-serif text-lg font-bold text-foreground mb-2">Ficou com alguma dúvida?</p>
          <p className="text-sm text-muted-foreground mb-6">Nossa equipe está pronta para esclarecer qualquer questão sobre privacidade e uso dos seus dados.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:businessatlasgrowth@gmail.com"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-accent transition-colors"
            >
              Enviar e-mail
            </a>
            <a
              href="https://wa.me/5534999818307"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl border border-border text-foreground text-sm font-semibold hover:border-primary/40 transition-colors"
            >
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
