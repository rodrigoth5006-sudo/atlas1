import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, company, budget, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 })
    }

    const budgetLabel: Record<string, string> = {
      "ate-5k": "Até R$5.000/mês",
      "5k-15k": "R$5.000 – R$15.000/mês",
      "15k-50k": "R$15.000 – R$50.000/mês",
      "acima-50k": "Acima de R$50.000/mês",
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f7ff; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #6d28d9; font-size: 24px; margin: 0;">Atlas Growth</h1>
          <p style="color: #7c3aed; font-size: 13px; margin: 4px 0 0;">Agência de Aquisição de Clientes</p>
        </div>

        <div style="background: #fff; border-radius: 10px; padding: 28px; border: 1px solid #e9d5ff;">
          <h2 style="color: #1e0a3c; font-size: 18px; margin: 0 0 24px;">Novo diagnóstico gratuito solicitado</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3e8ff; color: #6b7280; font-size: 13px; width: 40%;">Nome</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3e8ff; color: #1e0a3c; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3e8ff; color: #6b7280; font-size: 13px;">E-mail</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3e8ff; color: #1e0a3c; font-size: 14px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3e8ff; color: #6b7280; font-size: 13px;">Telefone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3e8ff; color: #1e0a3c; font-size: 14px;">${phone || "Não informado"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3e8ff; color: #6b7280; font-size: 13px;">Empresa</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3e8ff; color: #1e0a3c; font-size: 14px;">${company || "Não informado"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3e8ff; color: #6b7280; font-size: 13px;">Investimento mensal</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3e8ff; color: #1e0a3c; font-size: 14px;">${budgetLabel[budget] || "Não informado"}</td>
            </tr>
          </table>

          <div style="margin-top: 24px;">
            <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px;">Mensagem</p>
            <p style="color: #1e0a3c; font-size: 14px; line-height: 1.6; background: #f9f7ff; padding: 16px; border-radius: 8px; margin: 0;">${message.replace(/\n/g, "<br/>")}</p>
          </div>
        </div>

        <div style="text-align: center; margin-top: 28px;">
          <a href="https://wa.me/5534999818307?text=${encodeURIComponent(`Olá ${name}, vi seu diagnóstico e quero te ajudar!`)}"
             style="display: inline-block; background: #6d28d9; color: #fff; padding: 12px 28px; border-radius: 50px; text-decoration: none; font-size: 14px; font-weight: 600;">
            Responder pelo WhatsApp
          </a>
        </div>

        <p style="text-align: center; color: #9ca3af; font-size: 11px; margin-top: 24px;">
          Atlas Growth · Uberlândia, MG · businessatlasgrowth@gmail.com
        </p>
      </div>
    `

    await transporter.sendMail({
      from: `"Atlas Growth" <${process.env.GMAIL_USER}>`,
      to: "businessatlasgrowth@gmail.com",
      replyTo: email,
      subject: `Novo lead: ${name}${company ? ` — ${company}` : ""}`,
      html: htmlBody,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[contact] Erro ao enviar email:", err)
    return NextResponse.json({ error: "Falha ao enviar. Tente pelo WhatsApp." }, { status: 500 })
  }
}
