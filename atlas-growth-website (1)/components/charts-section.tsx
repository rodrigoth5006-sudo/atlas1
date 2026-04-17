"use client"

import { useEffect, useRef, useState } from "react"
import {
  AreaChart, Area,
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts"

// ── Brand colors (no CSS vars — Recharts requires resolved values) ──────────
const VIOLET       = "#7c3aed"
const VIOLET_LIGHT = "#a78bfa"
const VIOLET_MID   = "#8b5cf6"
const VIOLET_PALE  = "#ede9fe"
const VIOLET_DARK  = "#5b21b6"
const GRAY_LINE    = "#e5e7eb"
const TEXT_MUTED   = "#6b7280"

// ── Data ────────────────────────────────────────────────────────────────────
const roiData = [
  { mes: "Jan", roi: 120 },
  { mes: "Fev", roi: 185 },
  { mes: "Mar", roi: 210 },
  { mes: "Abr", roi: 260 },
  { mes: "Mai", roi: 295 },
  { mes: "Jun", roi: 340 },
  { mes: "Jul", roi: 390 },
  { mes: "Ago", roi: 420 },
]

const channelData = [
  { canal: "Google Ads",  leads: 420, conversoes: 210 },
  { canal: "Meta Ads",    leads: 380, conversoes: 175 },
  { canal: "SEO",         leads: 290, conversoes: 160 },
  { canal: "LinkedIn",    leads: 180, conversoes: 95  },
  { canal: "Email",       leads: 140, conversoes: 88  },
]

const budgetData = [
  { name: "Google Ads",  value: 35 },
  { name: "Meta Ads",    value: 28 },
  { name: "SEO",         value: 18 },
  { name: "LinkedIn",    value: 12 },
  { name: "Email",       value: 7  },
]

const conversionData = [
  { semana: "S1", taxa: 2.1 },
  { semana: "S2", taxa: 2.8 },
  { semana: "S3", taxa: 3.2 },
  { semana: "S4", taxa: 2.9 },
  { semana: "S5", taxa: 3.8 },
  { semana: "S6", taxa: 4.1 },
  { semana: "S7", taxa: 3.9 },
  { semana: "S8", taxa: 4.7 },
]

const PIE_COLORS = [VIOLET, VIOLET_MID, VIOLET_LIGHT, "#c4b5fd", "#ddd6fe"]

// ── Intersection-observer hook ───────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ── Custom tooltip ────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label, unit = "" }: {
  active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string; unit?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-border rounded-xl px-4 py-3 shadow-lg text-sm">
      {label && <p className="font-semibold text-foreground mb-1">{label}</p>}
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          {p.name}: <span className="font-bold">{p.value}{unit}</span>
        </p>
      ))}
    </div>
  )
}

// ── Chart Cards ───────────────────────────────────────────────────────────────
function ChartCard({
  title, subtitle, children, className = "",
}: { title: string; subtitle: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-background rounded-2xl border border-border p-6 flex flex-col gap-4 hover:border-primary/30 transition-colors ${className}`}>
      <div>
        <p className="font-serif font-bold text-foreground text-lg leading-tight">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
      {children}
    </div>
  )
}

// ── ROI Area Chart ────────────────────────────────────────────────────────────
function RoiChart({ animate }: { animate: boolean }) {
  return (
    <ChartCard title="Crescimento de ROI" subtitle="Evolução média de campanhas ativas — últimos 8 meses">
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={roiData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="roiGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={VIOLET}      stopOpacity={0.18} />
              <stop offset="95%" stopColor={VIOLET}      stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={GRAY_LINE} vertical={false} />
          <XAxis dataKey="mes" tick={{ fontSize: 11, fill: TEXT_MUTED }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: TEXT_MUTED }} axisLine={false} tickLine={false} unit="%" />
          <Tooltip content={<CustomTooltip unit="%" />} />
          <Area
            type="monotone"
            dataKey="roi"
            name="ROI"
            stroke={VIOLET}
            strokeWidth={2.5}
            fill="url(#roiGrad)"
            dot={{ fill: VIOLET, r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: VIOLET }}
            isAnimationActive={animate}
            animationDuration={1600}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-2 pt-1">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/8 px-3 py-1 rounded-full border border-primary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          +420% em 8 meses
        </span>
      </div>
    </ChartCard>
  )
}

// ── Channels Bar Chart ────────────────────────────────────────────────────────
function ChannelsChart({ animate }: { animate: boolean }) {
  return (
    <ChartCard title="Leads por Canal" subtitle="Comparativo de captação e conversão por canal de marketing">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={channelData} barGap={4} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRAY_LINE} vertical={false} />
          <XAxis dataKey="canal" tick={{ fontSize: 10, fill: TEXT_MUTED }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: TEXT_MUTED }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="leads"
            name="Leads"
            fill={VIOLET_PALE}
            stroke={VIOLET_LIGHT}
            strokeWidth={1}
            radius={[6, 6, 0, 0]}
            isAnimationActive={animate}
            animationDuration={1400}
            animationEasing="ease-out"
          />
          <Bar
            dataKey="conversoes"
            name="Conversoes"
            fill={VIOLET}
            radius={[6, 6, 0, 0]}
            isAnimationActive={animate}
            animationDuration={1600}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 pt-1 flex-wrap">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="w-3 h-3 rounded-sm inline-block border border-violet-300 bg-violet-100" />
          Leads captados
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="w-3 h-3 rounded-sm inline-block" style={{ background: VIOLET }} />
          Conversoes
        </span>
      </div>
    </ChartCard>
  )
}

// ── Budget Pie Chart ──────────────────────────────────────────────────────────
function BudgetChart({ animate }: { animate: boolean }) {
  return (
    <ChartCard title="Distribuicao de Budget" subtitle="Alocacao media de investimento por canal — campanha tipo">
      <div className="flex items-center gap-4">
        <ResponsiveContainer width="55%" height={200}>
          <PieChart>
            <Pie
              data={budgetData}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={82}
              paddingAngle={3}
              dataKey="value"
              isAnimationActive={animate}
              animationBegin={200}
              animationDuration={1400}
            >
              {budgetData.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />
              ))}
            </Pie>
            <Tooltip formatter={(v: number) => [`${v}%`, "Alocacao"]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-2 flex-1">
          {budgetData.map((d, i) => (
            <div key={d.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: PIE_COLORS[i] }} />
                <span className="text-xs text-muted-foreground leading-none">{d.name}</span>
              </div>
              <span className="text-xs font-bold text-foreground">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  )
}

// ── Conversion Line Chart ────────────────────────────────────────────────────
function ConversionChart({ animate }: { animate: boolean }) {
  return (
    <ChartCard title="Taxa de Conversao Semanal" subtitle="Percentual de visitantes convertidos em leads qualificados">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={conversionData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRAY_LINE} vertical={false} />
          <XAxis dataKey="semana" tick={{ fontSize: 11, fill: TEXT_MUTED }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: TEXT_MUTED }} axisLine={false} tickLine={false} unit="%" domain={[0, 6]} />
          <Tooltip content={<CustomTooltip unit="%" />} />
          <Line
            type="monotone"
            dataKey="taxa"
            name="Conversao"
            stroke={VIOLET}
            strokeWidth={2.5}
            dot={{ fill: VIOLET, r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: VIOLET_DARK }}
            isAnimationActive={animate}
            animationDuration={1800}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-2 pt-1">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/8 px-3 py-1 rounded-full border border-primary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          +124% na taxa de conversao
        </span>
      </div>
    </ChartCard>
  )
}

// ── Main Section ─────────────────────────────────────────────────────────────
export default function ChartsSection() {
  const { ref, inView } = useInView(0.15)

  return (
    <section id="charts" className="py-24 bg-secondary" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-primary mb-4">
            Performance em tempo real
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance mb-4">
            Dados que provam <br className="hidden md:block" />
            cada decisao
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Nossas campanhas sao gerenciadas com dashboards ao vivo. Veja o tipo de resultado que nossos clientes acompanham toda semana.
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RoiChart animate={inView} />
          <ChannelsChart animate={inView} />
          <BudgetChart animate={inView} />
          <ConversionChart animate={inView} />
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          * Dados baseados na media de performance das campanhas ativas da Atlas Growth. Resultados individuais variam conforme segmento, verba e estrategia.
        </p>
      </div>
    </section>
  )
}
