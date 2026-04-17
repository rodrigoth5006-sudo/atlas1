"use client"

import { useState } from "react"
import { Send, CheckCircle, Phone, Mail, MapPin, Loader2, AlertCircle } from "lucide-react"
import Image from "next/image"

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    budget: "",
  })

  const WHATSAPP_NUMBER = "5534999818307"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const budgetLabel: Record<string, string> = {
      "ate-5k": "Até R$5.000/mês",
      "5k-15k": "R$5.000 – R$15.000/mês",
      "15k-50k": "R$15.000 – R$50.000/mês",
      "acima-50k": "Acima de R$50.000/mês",
    }

    // Abre WhatsApp em paralelo com o envio do email
    const whatsappMsg = [
      `*Novo diagnóstico gratuito — Atlas Growth*`,
      ``,
      `*Nome:* ${form.name}`,
      `*E-mail:* ${form.email}`,
      `*Telefone:* ${form.phone || "Não informado"}`,
      `*Empresa:* ${form.company || "Não informado"}`,
      `*Investimento:* ${budgetLabel[form.budget] || "Não informado"}`,
      ``,
      `*Mensagem:*`,
      form.message,
    ].join("\n")

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`,
      "_blank",
      "noopener,noreferrer"
    )

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Erro desconhecido.")
      }

      setSubmitted(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Falha ao enviar. Tente pelo WhatsApp."
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Info */}
          <div>
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-primary mb-4">
              Fale conosco
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance mb-6">
              Pronto para escalar seu negócio?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Preencha o formulário e nossa equipe entrará em contato em até 2 horas úteis para agendar um diagnóstico gratuito da sua presença digital.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-5 mb-10">
              {[
                { icon: Phone, label: "(34) 9 9981-8307" },
                { icon: Mail, label: "businessatlasgrowth@gmail.com" },
                { icon: MapPin, label: "Uberlândia, MG — Brasil" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de solicitar um diagnóstico gratuito.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary font-semibold text-sm transition-colors mb-10"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.858L.057 23.57a.75.75 0 0 0 .924.908l5.934-1.557A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.72 9.72 0 0 1-4.976-1.365l-.356-.212-3.683.967.983-3.59-.232-.369A9.716 9.716 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              Chamar no WhatsApp agora
            </a>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image src="/atlas-growth-logo.png" alt="Atlas Growth" width={48} height={48} className="object-contain opacity-80" />
              <div>
                <p className="font-serif font-bold text-foreground">Atlas Growth</p>
                <a
                  href="https://www.instagram.com/businessatlasgrowth/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-primary hover:underline mt-0.5"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @businessatlasgrowth
                </a>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="p-8 md:p-10 rounded-3xl bg-background border border-border">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-6">
                  <CheckCircle size={32} className="text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Mensagem enviada!</h3>
                <p className="text-muted-foreground max-w-sm">
                  Nossa equipe analisará sua solicitação e entrará em contato em até 2 horas úteis.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">Solicitar diagnóstico gratuito</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Nome *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      className="px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 text-sm transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">E-mail *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className="px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">Telefone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(11) 9 9999-9999"
                      className="px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 text-sm transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="text-sm font-medium text-foreground">Empresa</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Nome da empresa"
                      className="px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="budget" className="text-sm font-medium text-foreground">Investimento mensal em marketing</label>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 text-sm transition-colors"
                  >
                    <option value="">Selecione um intervalo</option>
                    <option value="ate-5k">Até R$5.000/mês</option>
                    <option value="5k-15k">R$5.000 – R$15.000/mês</option>
                    <option value="15k-50k">R$15.000 – R$50.000/mês</option>
                    <option value="acima-50k">Acima de R$50.000/mês</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Conte sobre seu negócio *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Qual é o seu principal desafio de marketing hoje?"
                    className="px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 text-sm transition-colors resize-none"
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-accent transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer mt-2"
                  style={{ boxShadow: "0 0 20px oklch(0.55 0.27 290 / 0.3)" }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Solicitar diagnóstico gratuito
                      <Send size={16} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  Ao enviar, você concorda com nossa Política de Privacidade. Sem spam, prometemos.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
