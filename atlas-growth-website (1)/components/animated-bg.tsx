"use client"

import { useEffect, useRef } from "react"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulse: number
  pulseSpeed: number
  type: "data" | "hub" | "micro"
}

interface Particle {
  progress: number
  speed: number
  fromIdx: number
  toIdx: number
  opacity: number
}

const VIOLET = "109, 40, 217"
const VIOLET_LIGHT = "124, 58, 237"
const VIOLET_BRIGHT = "139, 92, 246"

export default function AnimatedBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let nodes: Node[] = []
    let particles: Particle[] = []
    let w = 0
    let h = 0

    function resize() {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
      init()
    }

    function init() {
      const nodeCount = Math.min(Math.floor((w * h) / 14000), 55)
      nodes = []
      for (let i = 0; i < nodeCount; i++) {
        const type: Node["type"] =
          i < 4 ? "hub" : i < nodeCount * 0.35 ? "data" : "micro"
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: type === "hub" ? 5 : type === "data" ? 3 : 1.5,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.012 + Math.random() * 0.018,
          type,
        })
      }

      // seed initial particles
      particles = []
      for (let i = 0; i < 18; i++) spawnParticle()
    }

    function spawnParticle() {
      const from = Math.floor(Math.random() * nodes.length)
      let to = Math.floor(Math.random() * nodes.length)
      while (to === from) to = Math.floor(Math.random() * nodes.length)
      particles.push({
        progress: 0,
        speed: 0.003 + Math.random() * 0.004,
        fromIdx: from,
        toIdx: to,
        opacity: 0.6 + Math.random() * 0.4,
      })
    }

    function getConnection(a: Node, b: Node) {
      const dx = a.x - b.x
      const dy = a.y - b.y
      return Math.sqrt(dx * dx + dy * dy)
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, w, h)

      // ── Light background ──────────────────────────────────────────────────
      const bg = ctx.createRadialGradient(w * 0.55, h * 0.35, 0, w * 0.55, h * 0.35, Math.max(w, h) * 0.9)
      bg.addColorStop(0, `rgba(245, 240, 255, 1)`)
      bg.addColorStop(0.5, `rgba(250, 248, 255, 1)`)
      bg.addColorStop(1, `rgba(255, 255, 255, 1)`)
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      // ── Soft violet orbs ─────────────────────────────────────────────────
      const orb1 = ctx.createRadialGradient(w * 0.72, h * 0.25, 0, w * 0.72, h * 0.25, w * 0.42)
      orb1.addColorStop(0, `rgba(${VIOLET_BRIGHT}, 0.13)`)
      orb1.addColorStop(1, `rgba(${VIOLET}, 0.0)`)
      ctx.fillStyle = orb1
      ctx.fillRect(0, 0, w, h)

      const orb2 = ctx.createRadialGradient(w * 0.12, h * 0.72, 0, w * 0.12, h * 0.72, w * 0.32)
      orb2.addColorStop(0, `rgba(${VIOLET_LIGHT}, 0.10)`)
      orb2.addColorStop(1, `rgba(${VIOLET}, 0.0)`)
      ctx.fillStyle = orb2
      ctx.fillRect(0, 0, w, h)

      // ── Move nodes ────────────────────────────────────────────────────────
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        n.pulse += n.pulseSpeed
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }

      // ── Draw connections ──────────────────────────────────────────────────
      const maxDist = w < 768 ? 160 : 220
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = getConnection(nodes[i], nodes[j])
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${VIOLET}, ${alpha})`
            ctx.lineWidth = nodes[i].type === "hub" || nodes[j].type === "hub" ? 1 : 0.5
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // ── Draw nodes ────────────────────────────────────────────────────────
      for (const n of nodes) {
        const pulseScale = 1 + Math.sin(n.pulse) * 0.25
        const r = n.radius * pulseScale

        if (n.type === "hub") {
          // outer ring
          ctx.beginPath()
          ctx.arc(n.x, n.y, r * 2.8, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${VIOLET}, ${0.18 + Math.sin(n.pulse) * 0.07})`
          ctx.lineWidth = 1
          ctx.stroke()

          // glow
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3.5)
          g.addColorStop(0, `rgba(${VIOLET}, 0.22)`)
          g.addColorStop(0.4, `rgba(${VIOLET_LIGHT}, 0.09)`)
          g.addColorStop(1, `rgba(${VIOLET}, 0)`)
          ctx.beginPath()
          ctx.arc(n.x, n.y, r * 3.5, 0, Math.PI * 2)
          ctx.fillStyle = g
          ctx.fill()

          // core
          ctx.beginPath()
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${VIOLET}, 1)`
          ctx.fill()
        } else if (n.type === "data") {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 2.5)
          g.addColorStop(0, `rgba(${VIOLET_LIGHT}, 0.18)`)
          g.addColorStop(1, `rgba(${VIOLET}, 0)`)
          ctx.beginPath()
          ctx.arc(n.x, n.y, r * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = g
          ctx.fill()

          ctx.beginPath()
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${VIOLET_LIGHT}, 0.95)`
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${VIOLET}, ${0.25 + Math.sin(n.pulse) * 0.15})`
          ctx.fill()
        }
      }

      // ── Draw & advance particles ──────────────────────────────────────────
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.progress += p.speed

        const from = nodes[p.fromIdx]
        const to = nodes[p.toIdx]
        if (!from || !to) { particles.splice(i, 1); continue }

        const px = from.x + (to.x - from.x) * p.progress
        const py = from.y + (to.y - from.y) * p.progress

        // trail
        const trailLen = 0.08
        const t0 = Math.max(0, p.progress - trailLen)
        const tx = from.x + (to.x - from.x) * t0
        const ty = from.y + (to.y - from.y) * t0

        const grad = ctx.createLinearGradient(tx, ty, px, py)
        grad.addColorStop(0, `rgba(${VIOLET}, 0)`)
        grad.addColorStop(1, `rgba(${VIOLET}, ${p.opacity * 0.85})`)

        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(px, py)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()

        // head dot
        const headGlow = ctx.createRadialGradient(px, py, 0, px, py, 4)
        headGlow.addColorStop(0, `rgba(${VIOLET_BRIGHT}, ${p.opacity})`)
        headGlow.addColorStop(0.4, `rgba(${VIOLET}, ${p.opacity * 0.45})`)
        headGlow.addColorStop(1, `rgba(${VIOLET}, 0)`)
        ctx.beginPath()
        ctx.arc(px, py, 4, 0, Math.PI * 2)
        ctx.fillStyle = headGlow
        ctx.fill()

        if (p.progress >= 1) {
          particles.splice(i, 1)
          spawnParticle()
        }
      }

      // ── Floating data labels ──────────────────────────────────────────────
      const labels = ["SEO", "ROI", "CPC", "CTR", "ROAS", "ADS", "CRM", "KPI"]
      ctx.font = "bold 10px monospace"
      for (let i = 0; i < nodes.length && i < labels.length; i++) {
        const n = nodes[i]
        if (n.type === "hub") {
          const alpha = 0.28 + Math.sin(n.pulse * 0.7 + i) * 0.10
          ctx.fillStyle = `rgba(${VIOLET}, ${alpha})`
          ctx.fillText(labels[i % labels.length], n.x + n.radius * 2 + 5, n.y - 4)
        }
      }

      // ── Scanline sweep ────────────────────────────────────────────────────
      const scanY = ((time * 0.04) % (h + 60)) - 30
      const scanGrad = ctx.createLinearGradient(0, scanY, 0, scanY + 60)
      scanGrad.addColorStop(0, `rgba(${VIOLET}, 0)`)
      scanGrad.addColorStop(0.5, `rgba(${VIOLET}, 0.018)`)
      scanGrad.addColorStop(1, `rgba(${VIOLET}, 0)`)
      ctx.fillStyle = scanGrad
      ctx.fillRect(0, scanY, w, 60)

      animId = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ display: "block" }}
    />
  )
}
