import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _syne = Syne({ subsets: ["latin"], variable: "--font-syne" });

export const metadata: Metadata = {
  title: 'Atlas Growth — Agência de Marketing Digital',
  description: 'Transformamos marcas em líderes de mercado. Estratégias digitais orientadas por dados que geram crescimento real e mensurável para o seu negócio.',
  keywords: ['marketing digital', 'agência', 'SEO', 'tráfego pago', 'growth', 'atlas growth'],
  authors: [{ name: 'Atlas Growth' }],
  openGraph: {
    title: 'Atlas Growth — Agência de Marketing Digital',
    description: 'Transformamos marcas em líderes de mercado.',
    type: 'website',
  },
  themeColor: '#6B21A8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${_inter.variable} ${_syne.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
