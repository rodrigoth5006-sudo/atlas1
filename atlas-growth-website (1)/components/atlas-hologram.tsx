"use client"

import { useEffect, useRef } from "react"

const METRICS = [
  { label: "+340% ROI",  angle: 0 },
  { label: "CTR 8.4%",   angle: 60 },
  { label: "CPC -62%",   angle: 120 },
  { label: "ROAS 5.8x",  angle: 180 },
  { label: "CPL -48%",   angle: 240 },
  { label: "Conv 12%",   angle: 300 },
]

export default function AtlasHologram() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener("resize", resize)

    const VIOLET      = "109, 40, 217"
    const VIOLET_L    = "139, 92, 246"
    const VIOLET_PALE = "196, 181, 253"

    const draw = (t: number) => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      const cx = W * 0.5
      const cy = H * 0.52

      // ── scanline sweep ───────────────────────────────────────────────────
      const scanY = ((t * 0.00065) % (H + 40)) - 20
      const scan  = ctx.createLinearGradient(0, scanY, 0, scanY + 40)
      scan.addColorStop(0,   `rgba(${VIOLET_L}, 0)`)
      scan.addColorStop(0.5, `rgba(${VIOLET_L}, 0.35)`)
      scan.addColorStop(1,   `rgba(${VIOLET_L}, 0)`)
      ctx.fillStyle = scan
      ctx.fillRect(0, scanY, W, 40)

      // ── Atlas silhouette built from arcs/rects ───────────────────────────
      const sc    = Math.min(W, H) / 520        // scale
      const bob   = Math.sin(t * 0.0012) * 6   // float
      const alpha = 0.72

      ctx.save()
      ctx.translate(cx, cy + bob)
      ctx.scale(sc, sc)

      const drawHolo = (fn: () => void, fill = true) => {
        ctx.beginPath()
        fn()
        if (fill) {
          ctx.fillStyle = `rgba(${VIOLET}, ${alpha})`
          ctx.fill()
        }
        ctx.strokeStyle = `rgba(${VIOLET_PALE}, 0.45)`
        ctx.lineWidth   = 0.8 / sc
        ctx.stroke()
      }

      // torso
      drawHolo(() => {
        ctx.ellipse(0, -60, 52, 80, 0, 0, Math.PI * 2)
      })
      // lower body
      drawHolo(() => {
        ctx.ellipse(0, 20, 44, 55, 0, 0, Math.PI * 2)
      })
      // neck
      drawHolo(() => {
        ctx.ellipse(0, -148, 18, 22, 0, 0, Math.PI * 2)
      })
      // head
      drawHolo(() => {
        ctx.arc(2, -186, 36, 0, Math.PI * 2)
      })
      // left arm raised
      drawHolo(() => {
        ctx.ellipse(-80, -130, 16, 58, -0.55, 0, Math.PI * 2)
      })
      drawHolo(() => {
        ctx.ellipse(-112, -188, 13, 46, -0.75, 0, Math.PI * 2)
      })
      // right arm raised
      drawHolo(() => {
        ctx.ellipse(80, -130, 16, 58, 0.55, 0, Math.PI * 2)
      })
      drawHolo(() => {
        ctx.ellipse(112, -188, 13, 46, 0.75, 0, Math.PI * 2)
      })
      // left leg (kneeling)
      drawHolo(() => {
        ctx.ellipse(-32, 110, 20, 62, 0.22, 0, Math.PI * 2)
      })
      drawHolo(() => {
        ctx.ellipse(-44, 192, 16, 44, 0.55, 0, Math.PI * 2)
      })
      // right leg (planted)
      drawHolo(() => {
        ctx.ellipse(32, 100, 20, 65, -0.15, 0, Math.PI * 2)
      })
      drawHolo(() => {
        ctx.ellipse(36, 185, 16, 46, -0.3, 0, Math.PI * 2)
      })

      // ── planet (held above head) ─────────────────────────────────────────
      const pR  = 72
      const pY  = -285
      const rot = t * 0.00085

      // glow
      const glow = ctx.createRadialGradient(0, pY, 0, 0, pY, pR * 2)
      glow.addColorStop(0,   `rgba(${VIOLET_L}, 0.22)`)
      glow.addColorStop(1,   `rgba(${VIOLET}, 0)`)
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(0, pY, pR * 2, 0, Math.PI * 2)
      ctx.fill()

      // planet body
      ctx.save()
      ctx.beginPath()
      ctx.arc(0, pY, pR, 0, Math.PI * 2)
      ctx.clip()
      ctx.fillStyle = `rgba(${VIOLET}, 0.85)`
      ctx.fillRect(-pR, pY - pR, pR * 2, pR * 2)

      // continent-like patches (rotated)
      ctx.translate(0, pY)
      ctx.rotate(rot)
      ctx.fillStyle = `rgba(${VIOLET_PALE}, 0.18)`
      ;[
        [-28, -30, 38, 28],
        [ 10,  10, 30, 22],
        [-20,  18, 24, 18],
        [ 20, -20, 20, 14],
      ].forEach(([x, y, w, h]) => {
        ctx.beginPath()
        ctx.ellipse(x, y, w, h, 0.3, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()

      // planet outline
      ctx.beginPath()
      ctx.arc(0, pY, pR, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${VIOLET_PALE}, 0.7)`
      ctx.lineWidth   = 1.5 / sc
      ctx.stroke()

      // orbit rings
      ;[1.4, 1.9, 2.55].forEach((mult, i) => {
        ctx.beginPath()
        ctx.ellipse(0, pY, pR * mult, pR * mult * 0.28, (i * Math.PI) / 3 + rot * 0.5, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${VIOLET_L}, ${0.45 - i * 0.12})`
        ctx.lineWidth   = (1.2 - i * 0.3) / sc
        ctx.stroke()
      })

      // orbiting metric dots + labels
      const metricRot = t * 0.00055
      METRICS.forEach((m, i) => {
        const a    = (m.angle * Math.PI) / 180 + metricRot
        const orR  = pR * (1.65 + (i % 3) * 0.28)
        const mx   = Math.cos(a) * orR
        const my   = pY + Math.sin(a) * orR * 0.32

        // dot
        ctx.beginPath()
        ctx.arc(mx, my, 5 / sc, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${VIOLET_PALE}, 0.95)`
        ctx.fill()

        // label
        ctx.font      = `bold ${Math.round(13 / sc)}px monospace`
        ctx.fillStyle = `rgba(${VIOLET_L}, 0.88)`
        ctx.textAlign = mx > 0 ? "left" : "right"
        ctx.fillText(m.label, mx + (mx > 0 ? 10 / sc : -10 / sc), my + 4 / sc)
      })

      ctx.restore()

      // ── base shadow ──────────────────────────────────────────────────────
      const shadow = ctx.createRadialGradient(cx, cy + 240 * sc, 0, cx, cy + 240 * sc, 90 * sc)
      shadow.addColorStop(0, `rgba(${VIOLET}, 0.18)`)
      shadow.addColorStop(1, `rgba(${VIOLET}, 0)`)
      ctx.fillStyle = shadow
      ctx.beginPath()
      ctx.ellipse(cx, cy + 240 * sc, 80 * sc, 18 * sc, 0, 0, Math.PI * 2)
      ctx.fill()

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
