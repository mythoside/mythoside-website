import { useEffect, useRef } from 'react'
import { EDGES, createNodes, fitView, neighbours, radiusOf, step } from './graphSim'
import type { GraphNode } from './graphSim'

interface View { x: number; y: number; k: number }
interface Size { w: number; h: number }
type Drag =
  | { mode: 'node'; node: GraphNode }
  | { mode: 'pan'; startX: number; startY: number; viewX: number; viewY: number }

const MIN_ALPHA = 0.004

function cssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

function nodeColor(node: GraphNode): string {
  if (node.dead) return cssVar('--ember')
  if (node.kind === 'character') return cssVar('--gold')
  if (node.kind === 'location') return cssVar('--starlight')
  if (node.kind === 'chapter') return cssVar('--muted')
  return cssVar('--text')
}

function drawGraph(ctx: CanvasRenderingContext2D, nodes: GraphNode[], view: View, size: Size, hover: GraphNode | null) {
  const dpr = window.devicePixelRatio || 1
  const lit = hover ? neighbours(hover.id, EDGES) : null
  const byId = new Map(nodes.map((n) => [n.id, n]))
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, size.w, size.h)
  ctx.translate(size.w / 2 + view.x, size.h / 2 + view.y)
  ctx.scale(view.k, view.k)

  for (const e of EDGES) {
    const a = byId.get(e.source)
    const b = byId.get(e.target)
    if (!a || !b) continue
    const on = !lit || (lit.has(a.id) && lit.has(b.id))
    ctx.globalAlpha = on ? 1 : 0.15
    ctx.strokeStyle = e.bad ? cssVar('--ember') : cssVar('--line-2')
    ctx.lineWidth = (e.bad ? 1.5 : 1) / view.k
    ctx.setLineDash(e.bad ? [4 / view.k, 4 / view.k] : [])
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.stroke()
  }
  ctx.setLineDash([])

  ctx.font = `500 ${12 / view.k}px Inter, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  for (const n of nodes) {
    const on = !lit || lit.has(n.id)
    const r = radiusOf(n)
    ctx.globalAlpha = on ? 1 : 0.2
    ctx.fillStyle = nodeColor(n)
    ctx.beginPath()
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
    ctx.fill()
    if (n.dead) {
      ctx.strokeStyle = cssVar('--ember')
      ctx.lineWidth = 1 / view.k
      ctx.beginPath()
      ctx.arc(n.x, n.y, r + 3, 0, Math.PI * 2)
      ctx.stroke()
    }
    ctx.fillStyle = hover === n || (lit && lit.has(n.id)) ? cssVar('--text') : cssVar('--muted')
    ctx.fillText(n.dead ? `${n.label} †` : n.label, n.x, n.y + r + 6 / view.k)
  }
  ctx.globalAlpha = 1
}

export default function ReferenceGraph({ label }: { label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const nodes = createNodes()
    const view: View = { x: 0, y: 0, k: 1 }
    const size: Size = { w: 0, h: 0 }
    let alpha = 1
    let frame = 0
    let hover: GraphNode | null = null
    let drag: Drag | null = null
    // Until the reader pans or zooms, the camera keeps the whole graph in frame.
    let userView = false

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      for (let i = 0; i < 300; i++) step(nodes, EDGES, 1 - i / 300)
      alpha = 0
    }

    const draw = () => {
      if (!userView && size.w > 0 && drag?.mode !== 'node') Object.assign(view, fitView(nodes, size.w, size.h))
      drawGraph(ctx, nodes, view, size, hover)
    }
    const tick = () => {
      frame = 0
      if (alpha > MIN_ALPHA) {
        step(nodes, EDGES, alpha)
        alpha *= 0.985
      }
      draw()
      if (alpha > MIN_ALPHA || drag?.mode === 'node') frame = requestAnimationFrame(tick)
    }
    const kick = (min: number) => {
      alpha = Math.max(alpha, min)
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      size.w = rect.width
      size.h = rect.height
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      draw()
    }

    const toWorld = (e: PointerEvent | WheelEvent) => {
      const rect = canvas.getBoundingClientRect()
      return {
        x: (e.clientX - rect.left - size.w / 2 - view.x) / view.k,
        y: (e.clientY - rect.top - size.h / 2 - view.y) / view.k,
      }
    }
    const hit = (e: PointerEvent) => {
      const p = toWorld(e)
      return nodes.find((n) => Math.hypot(n.x - p.x, n.y - p.y) <= radiusOf(n) + 8 / view.k) ?? null
    }

    const onDown = (e: PointerEvent) => {
      const node = hit(e)
      if (node) {
        node.pinned = true
        drag = { mode: 'node', node }
        kick(0.3)
      } else if (e.pointerType === 'mouse') {
        drag = { mode: 'pan', startX: e.clientX, startY: e.clientY, viewX: view.x, viewY: view.y }
      } else {
        return
      }
      canvas.setPointerCapture(e.pointerId)
      canvas.style.cursor = 'grabbing'
    }
    const onMove = (e: PointerEvent) => {
      if (drag?.mode === 'node') {
        const p = toWorld(e)
        drag.node.x = p.x
        drag.node.y = p.y
        kick(0.3)
        return
      }
      if (drag?.mode === 'pan') {
        userView = true
        view.x = drag.viewX + e.clientX - drag.startX
        view.y = drag.viewY + e.clientY - drag.startY
        draw()
        return
      }
      const next = hit(e)
      canvas.style.cursor = next ? 'grab' : 'default'
      if (next !== hover) {
        hover = next
        draw()
      }
    }
    const onUp = (e: PointerEvent) => {
      if (drag?.mode === 'node') drag.node.pinned = false
      drag = null
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId)
      canvas.style.cursor = hover ? 'grab' : 'default'
      kick(0.1)
    }
    const onLeave = () => {
      if (drag || !hover) return
      hover = null
      draw()
    }
    // Zoom only with a modifier (or a trackpad pinch, which reports ctrlKey) so the page still scrolls.
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return
      e.preventDefault()
      userView = true
      const rect = canvas.getBoundingClientRect()
      const k = Math.min(2.5, Math.max(0.5, view.k * Math.exp(-e.deltaY * 0.01)))
      const cx = e.clientX - rect.left - size.w / 2
      const cy = e.clientY - rect.top - size.h / 2
      view.x = cx - ((cx - view.x) * k) / view.k
      view.y = cy - ((cy - view.y) * k) / view.k
      view.k = k
      draw()
    }
    const onReset = () => {
      userView = false
      draw()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const themeWatch = new MutationObserver(draw)
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const scheme = window.matchMedia('(prefers-color-scheme: dark)')
    scheme.addEventListener('change', draw)
    document.fonts?.ready.then(draw)

    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('wheel', onWheel, { passive: false })
    canvas.addEventListener('dblclick', onReset)
    resize()
    // Unfold the layout when it scrolls into view, so the motion is seen rather than spent offscreen.
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      kick(alpha)
      io.disconnect()
    })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      themeWatch.disconnect()
      scheme.removeEventListener('change', draw)
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('wheel', onWheel)
      canvas.removeEventListener('dblclick', onReset)
    }
  }, [])

  return <canvas ref={canvasRef} className="graph-canvas" role="img" aria-label={label} />
}
