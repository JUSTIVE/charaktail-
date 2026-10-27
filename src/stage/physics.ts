/*
 * A small 2D rigid-circle world in CSS pixels. It only has to feel right on a
 * phone: gravity from the device's tilt, inertia from its shakes, balls that
 * roll (their angle turns the label texture) and bump into each other.
 */

export interface Body {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  /** Current radius — eases toward `targetR`, so balls grow in and shrink out. */
  r: number
  targetR: number
  angle: number
  spin: number
  /** Set while a ball shrinks out; removed once it reaches zero. */
  leaving: boolean
}

export interface Rect {
  left: number
  top: number
  right: number
  bottom: number
}

export interface WorldTuning {
  /** px/s² per unit of the gravity vector. */
  gravity: number
  restitution: number
  /** Velocity kept per second — air drag. */
  damping: number
  /** Ball–ball collisions; off while the colours melt into one another. */
  collide: boolean
  /** Pull toward `center`, px/s² per px of distance. */
  attract: number
  /** Tangential push around `center`, px/s². */
  swirl: number
  center: { x: number; y: number }
}

export class World {
  bodies: Body[] = []
  /** Unit vector-ish, from the device's tilt. */
  gravity = { x: 0, y: 1 }
  /** Where balls may go. Eased toward `targetArea` each step. */
  area: Rect = { left: 0, top: 0, right: 0, bottom: 0 }
  targetArea: Rect = { left: 0, top: 0, right: 0, bottom: 0 }
  tuning: WorldTuning = {
    gravity: 900,
    restitution: 0.55,
    damping: 0.6,
    collide: true,
    attract: 0,
    swirl: 0,
    center: { x: 0, y: 0 },
  }

  /** Pointer grab: the body follows (x, y) on a stiff spring. */
  private grab: { id: string; x: number; y: number } | null = null

  add(id: string, targetR: number): Body {
    const a = this.area
    const body: Body = {
      id,
      x: a.left + (a.right - a.left) * (0.3 + Math.random() * 0.4),
      y: a.top + (a.bottom - a.top) * 0.25,
      vx: (Math.random() - 0.5) * 300,
      vy: -200 - Math.random() * 200,
      r: 0,
      targetR,
      angle: (Math.random() - 0.5) * 0.6,
      spin: 0,
      leaving: false,
    }
    this.bodies.push(body)
    return body
  }

  remove(id: string): void {
    const body = this.bodies.find((b) => b.id === id)
    if (body) body.leaving = true
  }

  /** A shake: every ball takes the opposite of the device's acceleration. */
  kick(ax: number, ay: number, scale = 1): void {
    for (const body of this.bodies) {
      const jitter = 0.7 + Math.random() * 0.6
      body.vx -= ax * scale * jitter
      body.vy -= ay * scale * jitter
      body.spin += (Math.random() - 0.5) * 4 * scale
    }
  }

  pick(x: number, y: number): Body | null {
    let best: Body | null = null
    let bestD = Infinity
    for (const body of this.bodies) {
      const d = Math.hypot(body.x - x, body.y - y)
      if (d < body.r * 1.15 && d < bestD) {
        best = body
        bestD = d
      }
    }
    return best
  }

  grabAt(id: string, x: number, y: number): void {
    this.grab = { id, x, y }
  }

  release(vx: number, vy: number): void {
    const body = this.grab && this.bodies.find((b) => b.id === this.grab!.id)
    if (body) {
      body.vx = vx
      body.vy = vy
    }
    this.grab = null
  }

  step(dt: number): void {
    const t = this.tuning
    const ease = 1 - Math.exp(-dt * 6)
    for (const key of ['left', 'top', 'right', 'bottom'] as const) {
      this.area[key] += (this.targetArea[key] - this.area[key]) * ease
    }

    const drag = Math.pow(t.damping, dt)
    for (const body of this.bodies) {
      body.r += ((body.leaving ? 0 : body.targetR) - body.r) * (1 - Math.exp(-dt * 7))

      if (this.grab?.id === body.id) {
        // Critically damped follow, so a fling carries the pointer's speed.
        const k = 1 - Math.exp(-dt * 22)
        const nx = body.x + (this.grab.x - body.x) * k
        const ny = body.y + (this.grab.y - body.y) * k
        body.vx = (nx - body.x) / dt
        body.vy = (ny - body.y) / dt
        body.x = nx
        body.y = ny
        continue
      }

      body.vx += this.gravity.x * t.gravity * dt
      body.vy += this.gravity.y * t.gravity * dt

      if (t.attract > 0 || t.swirl > 0) {
        const dx = t.center.x - body.x
        const dy = t.center.y - body.y
        const d = Math.hypot(dx, dy) || 1
        body.vx += dx * t.attract * dt + (-dy / d) * t.swirl * dt
        body.vy += dy * t.attract * dt + (dx / d) * t.swirl * dt
      }

      body.vx *= drag
      body.vy *= drag
      body.x += body.vx * dt
      body.y += body.vy * dt
      body.angle += body.spin * dt
      body.spin *= Math.pow(0.5, dt)
    }

    if (t.collide) this.collide()
    this.walls()
    this.bodies = this.bodies.filter((b) => !(b.leaving && b.r < 0.5))
  }

  private collide(): void {
    const bodies = this.bodies
    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        const a = bodies[i]!
        const b = bodies[j]!
        const dx = b.x - a.x
        const dy = b.y - a.y
        // Metaballs read as soft: let them sink into each other a little.
        const min = (a.r + b.r) * 0.86
        const d2 = dx * dx + dy * dy
        if (d2 >= min * min || d2 === 0) continue
        const d = Math.sqrt(d2)
        const nx = dx / d
        const ny = dy / d
        const push = (min - d) / 2
        a.x -= nx * push
        a.y -= ny * push
        b.x += nx * push
        b.y += ny * push
        const rel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny
        if (rel < 0) {
          const impulse = (-(1 + this.tuning.restitution) * rel) / 2
          a.vx -= impulse * nx
          a.vy -= impulse * ny
          b.vx += impulse * nx
          b.vy += impulse * ny
          // Glancing contact turns the balls, so the labels roll.
          const tangent = (b.vx - a.vx) * -ny + (b.vy - a.vy) * nx
          a.spin += tangent / (a.r * 4)
          b.spin -= tangent / (b.r * 4)
        }
      }
    }
  }

  private walls(): void {
    const { left, top, right, bottom } = this.area
    const e = this.tuning.restitution
    for (const body of this.bodies) {
      const r = body.r
      if (body.x - r < left) {
        body.x = left + r
        if (body.vx < 0) body.vx = -body.vx * e
        body.spin -= body.vy / (r * 2)
      } else if (body.x + r > right) {
        body.x = right - r
        if (body.vx > 0) body.vx = -body.vx * e
        body.spin += body.vy / (r * 2)
      }
      if (body.y - r < top) {
        body.y = top + r
        if (body.vy < 0) body.vy = -body.vy * e
        body.spin += body.vx / (r * 2)
      } else if (body.y + r > bottom) {
        body.y = bottom - r
        if (body.vy > 0) body.vy = -body.vy * e
        // Rolling on the floor: spin follows ground speed.
        body.spin += (body.vx / r - body.spin) * 0.2
      }
    }
  }
}
