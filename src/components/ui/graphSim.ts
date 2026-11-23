// A tiny force-directed layout for the reference graph (no d3: ~a dozen nodes).

import { NodeKind } from '@/enums'

export interface GraphNode {
  id: string
  label: string
  kind: NodeKind
  dead?: boolean
  x: number
  y: number
  vx: number
  vy: number
  pinned?: boolean
}

export interface GraphEdge {
  source: string
  target: string
  bad?: boolean
}

type Seed = Omit<GraphNode, 'x' | 'y' | 'vx' | 'vy'>

// The worked example from the hero: Corvath dies in Book One, ch. 12, and is referenced again in Book Two, ch. 3.
const SEEDS: Seed[] = [
  { id: 'series', label: 'The Ashfall Cycle', kind: NodeKind.Series },
  { id: 'b1', label: 'Embergate', kind: NodeKind.Book },
  { id: 'b2', label: 'The Drowned Throne', kind: NodeKind.Book },
  { id: 'c12', label: 'ch-12 The Fall', kind: NodeKind.Chapter },
  { id: 'c01', label: 'ch-01 Saltlight', kind: NodeKind.Chapter },
  { id: 'c03', label: 'ch-03 The Tidewatch', kind: NodeKind.Chapter },
  { id: 'corvath', label: 'Lord Corvath', kind: NodeKind.Character, dead: true },
  { id: 'sera', label: 'Sera of Vael', kind: NodeKind.Character },
  { id: 'tidewatch', label: 'The Tidewatch', kind: NodeKind.Location },
  { id: 'keep', label: 'Embergate Keep', kind: NodeKind.Location },
]

export const EDGES: GraphEdge[] = [
  { source: 'series', target: 'b1' },
  { source: 'series', target: 'b2' },
  { source: 'b1', target: 'c12' },
  { source: 'b2', target: 'c01' },
  { source: 'b2', target: 'c03' },
  { source: 'c12', target: 'corvath' },
  { source: 'c12', target: 'keep' },
  { source: 'c01', target: 'sera' },
  { source: 'c01', target: 'tidewatch' },
  { source: 'c03', target: 'sera' },
  { source: 'c03', target: 'tidewatch' },
  { source: 'c03', target: 'corvath', bad: true },
]

export function createNodes(): GraphNode[] {
  // Start on a circle so the first frames unfold the same way every time.
  return SEEDS.map((seed, i) => {
    const angle = (i / SEEDS.length) * Math.PI * 2
    return { ...seed, x: Math.cos(angle) * 90, y: Math.sin(angle) * 90, vx: 0, vy: 0 }
  })
}

export function radiusOf(node: GraphNode): number {
  return node.kind === NodeKind.Series ? 7 : node.kind === NodeKind.Book ? 6 : 4.5
}

const REPULSION = 9000
const SPRING = 0.04
const LINK_LENGTH = 110
const CENTER = 0.006
const FRICTION = 0.62

export function step(nodes: GraphNode[], edges: GraphEdge[], alpha: number): void {
  const byId = new Map(nodes.map((n) => [n.id, n]))
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i]
      const b = nodes[j]
      const dx = b.x - a.x || 0.01
      const dy = b.y - a.y || 0.01
      const d2 = Math.max(dx * dx + dy * dy, 64)
      const f = (REPULSION / d2) * alpha
      const d = Math.sqrt(d2)
      a.vx -= (dx / d) * f
      a.vy -= (dy / d) * f
      b.vx += (dx / d) * f
      b.vy += (dy / d) * f
    }
  }
  for (const e of edges) {
    const a = byId.get(e.source)
    const b = byId.get(e.target)
    if (!a || !b) continue
    const dx = b.x - a.x
    const dy = b.y - a.y
    const d = Math.sqrt(dx * dx + dy * dy) || 1
    const f = (d - LINK_LENGTH) * SPRING * alpha
    a.vx += (dx / d) * f
    a.vy += (dy / d) * f
    b.vx -= (dx / d) * f
    b.vy -= (dy / d) * f
  }
  for (const n of nodes) {
    if (n.pinned) {
      n.vx = 0
      n.vy = 0
      continue
    }
    n.vx = (n.vx - n.x * CENTER * alpha) * FRICTION
    n.vy = (n.vy - n.y * CENTER * alpha) * FRICTION
    n.x += n.vx
    n.y += n.vy
  }
}

// Scale and offset that fit every node (plus room for labels) inside a w×h box, never zooming past 1.
export function fitView(nodes: GraphNode[], w: number, h: number) {
  const xs = nodes.map((n) => n.x)
  const ys = nodes.map((n) => n.y)
  const minX = Math.min(...xs) - 60
  const maxX = Math.max(...xs) + 60
  const minY = Math.min(...ys) - 20
  const maxY = Math.max(...ys) + 36
  const k = Math.min(1, w / (maxX - minX), h / (maxY - minY))
  return { k, x: -((minX + maxX) / 2) * k, y: -((minY + maxY) / 2) * k }
}

export function neighbours(id: string, edges: GraphEdge[]): Set<string> {
  const out = new Set<string>([id])
  for (const e of edges) {
    if (e.source === id) out.add(e.target)
    if (e.target === id) out.add(e.source)
  }
  return out
}
