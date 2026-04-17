import Image from "next/image"
import Link from "next/link"
import { Instagram, Linkedin, Youtube, Twitter } from "lucide-react"

type FooterLink = { label: string; href: string }

const footerLinks: Record<string, FooterLink[]> = {
  Serviços: [
    { label: "Tráfego Pago", href: "/#services" },
    { label: "SEO Estratégico", href: "/#services" },
    { label: "Growth Hacking", href: "/#services" },
    { label: "Social Media", href: "/#services" },
    { label: "Inbound Marketing", href: "/#services" },
    { label: "Automação & CRM", href: "/#services" },
    { label: "Consultoria Estratégica", href: "/#services" },
  ],
  Empresa: [
    { label: "Sobre nós", href: "/#about" },
    { label: "Cases de sucesso", href: "/#results" },
    { label: "Depoimentos", href: "/#testimonials" },
    { label: "FAQ", href: "/#faq" },
    { label: "Instagram", href: "https://www.instagram.com/businessatlasgrowth/" },
  ],
  Legal: [
    { label: "Diagnóstico gratuito", href: "/#contact" },
    { label: "Política de Privacidade", href: "/politica-de-privacidade" },
    { label: "Termos de Uso", href: "/termos-de-uso" },
  ],
}

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/businessatlasgrowth/" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Twitter, label: "X / Twitter", href: "#" },
]

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Image src="/atlas-growth-logo.png" alt="Atlas Growth" width={44} height={44} className="object-contain" />
              <span className="font-serif text-lg font-bold text-foreground">
                Atlas <span className="text-primary">Growth</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              Transformamos marcas em líderes de mercado com estratégias digitais orientadas por dados e resultados reais.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
                >
                  <Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-foreground text-sm mb-4">{title}</h3>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Atlas Growth. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="/politica-de-privacidade" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Política de Privacidade
            </Link>
            <span className="text-border text-xs" aria-hidden="true">|</span>
            <Link href="/termos-de-uso" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Termos de Uso
            </Link>
            <span className="text-border text-xs" aria-hidden="true">|</span>
            <p className="text-xs text-muted-foreground">
              Uberlândia, MG — Brasil
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
