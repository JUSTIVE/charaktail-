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
  /** Jiggle: compression along `axis` (+ squashed, − stretched), as a spring. */
  squash: number
  squashVel: number
  axis: { x: number; y: number }
  /** Amplitude of the finer surface ripples (modes 3, 5, 7) — rises on impact, ebbs slowly. */
  wobble: number
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
  /**
   * Mutual repulsion inside a halo around each body, px/s² at full overlap
   * of the halos. With little gravity it spreads the bodies evenly over the
   * whole area instead of letting them pile on the floor.
   */
  spread: number
  center: { x: number; y: number }
  /** Pull back toward upright, rad/s² per rad — keeps the labels readable. */
  upright: number
  /** Fastest a ball may turn, rad/s. */
  maxSpin: number
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
    spread: 0,
    center: { x: 0, y: 0 },
    upright: 26,
    maxSpin: 2.4,
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
      squash: 0,
      squashVel: 0,
      axis: { x: 0, y: 1 },
      wobble: 0.04,
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
      body.spin += (Math.random() - 0.5) * 0.8 * scale
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
      // A fast drop stretches along its path; impacts take over the axis.
      const speed = Math.hypot(body.vx, body.vy)
      if (Math.abs(body.squash) < 0.04 && speed > 250) body.axis = { x: body.vx / speed, y: body.vy / speed }
      const stretch = -Math.min(Math.max(speed - 250, 0) / 6000, 0.12)
      body.squashVel += (-SQUASH_STIFFNESS * (body.squash - stretch) - SQUASH_DAMPING * body.squashVel) * dt
      // Bounded squash: a drop flattens and stretches, it never folds to a point.
      body.squash = Math.max(-0.2, Math.min(0.28, body.squash + body.squashVel * dt))
      // Ripples ebb toward a small resting level: a low-tension drop is never quite still.
      body.wobble = WOBBLE_REST + (body.wobble - WOBBLE_REST) * Math.pow(0.5, dt)

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
      // A damped spring toward upright: bumps tilt a label, it rocks back.
      const tilt = Math.atan2(Math.sin(body.angle), Math.cos(body.angle))
      body.spin += (-tilt * t.upright - body.spin * 7) * dt
      body.spin = Math.max(-t.maxSpin, Math.min(t.maxSpin, body.spin))
      body.angle = tilt + body.spin * dt
    }

    if (t.spread > 0) this.repel(dt)
    if (t.collide) this.collide(dt)
    this.walls(dt)
    this.bodies = this.bodies.filter((b) => !(b.leaving && b.r < 0.5))
  }

  /*
   * Contacts are springs, not hard stops: two bodies sink into each other a
   * little and push back, so the shader's flat contact face grows and shrinks
   * with the squeeze. Past `HARD_LIMIT` the overlap is resolved outright, so
   * a violent shake cannot pass one body through another.
   */
  private collide(dt: number): void {
    const bodies = this.bodies
    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        const a = bodies[i]!
        const b = bodies[j]!
        const dx = b.x - a.x
        const dy = b.y - a.y
        const rest = a.r + b.r
        const d2 = dx * dx + dy * dy
        if (d2 >= rest * rest || d2 === 0) continue
        const d = Math.sqrt(d2)
        const nx = dx / d
        const ny = dy / d
        const rel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny

        const push = ((CONTACT_STIFFNESS / (rest / 2)) * (rest - d) - CONTACT_DAMPING * rel) * dt * 0.5
        if (push > 0) {
          a.vx -= nx * push
          a.vy -= ny * push
          b.vx += nx * push
          b.vy += ny * push
        }

        const hard = rest * HARD_LIMIT
        if (d < hard) {
          const fix = (hard - d) / 2
          a.x -= nx * fix
          a.y -= ny * fix
          b.x += nx * fix
          b.y += ny * fix
          if (rel < 0) {
            const impulse = (-(1 + this.tuning.restitution) * rel) / 2
            a.vx -= impulse * nx
            a.vy -= impulse * ny
            b.vx += impulse * nx
            b.vy += impulse * ny
          }
        }

        if (rel < -JIGGLE_THRESHOLD) {
          jiggle(a, nx, ny, -rel)
          jiggle(b, nx, ny, -rel)
        }
        // Glancing contact turns the bodies a little; the upright spring undoes it.
        const tangent = (b.vx - a.vx) * -ny + (b.vy - a.vy) * nx
        a.spin += (tangent / (a.r * 12)) * dt * 30
        b.spin -= (tangent / (b.r * 12)) * dt * 30
      }
    }
  }

  /** Even spacing: every pair pushes apart while their halos overlap, and the
   *  walls push back too, so the bodies settle into an even spread. */
  private repel(dt: number): void {
    const bodies = this.bodies
    const strength = this.tuning.spread * dt
    for (let i = 0; i < bodies.length; i++) {
      const a = bodies[i]!
      for (let j = i + 1; j < bodies.length; j++) {
        const b = bodies[j]!
        const dx = b.x - a.x
        const dy = b.y - a.y
        const reach = (a.r + b.r) * SPREAD_HALO
        const d = Math.hypot(dx, dy)
        if (d >= reach || d === 0) continue
        const push = ((reach - d) / reach) * strength
        a.vx -= (dx / d) * push
        a.vy -= (dy / d) * push
        b.vx += (dx / d) * push
        b.vy += (dy / d) * push
      }
      const { left, top, right, bottom } = this.area
      const halo = a.r * WALL_HALO
      const near = (gap: number) => Math.max(0, 1 - Math.max(gap, 0) / Math.max(halo, 1))
      a.vx += (near(a.x - a.r - left) - near(right - a.x - a.r)) * strength * 0.6
      a.vy += (near(a.y - a.r - top) - near(bottom - a.y - a.r)) * strength * 0.6
    }
  }

  /** Walls are springs too: a body pressed into one flattens against it. */
  private walls(dt: number): void {
    const { left, top, right, bottom } = this.area
    const e = this.tuning.restitution
    for (const body of this.bodies) {
      const r = body.r
      const k = WALL_STIFFNESS / Math.max(r, 1)
      const limit = r * (1 - WALL_LIMIT)
      // [penetration, normal x, normal y, velocity into the wall]
      const sides: [number, number, number, number][] = [
        [left - (body.x - r), 1, 0, -body.vx],
        [body.x + r - right, -1, 0, body.vx],
        [top - (body.y - r), 0, 1, -body.vy],
        [body.y + r - bottom, 0, -1, body.vy],
      ]
      for (const [pen, nx, ny, into] of sides) {
        if (pen <= 0) continue
        const accel = k * pen + (into > 0 ? CONTACT_DAMPING * into : 0)
        body.vx += nx * accel * dt
        body.vy += ny * accel * dt
        if (into > JIGGLE_THRESHOLD) jiggle(body, nx, ny, into)
        if (pen > r - limit) {
          // Pressed past the limit: stop here and bounce.
          body.x += nx * (pen - (r - limit))
          body.y += ny * (pen - (r - limit))
          const v = body.vx * nx + body.vy * ny
          if (v < 0) {
            body.vx -= (1 + e) * v * nx
            body.vy -= (1 + e) * v * ny
          }
        }
        // Rolling along a wall: spin follows the sliding speed.
        const slide = body.vx * -ny + body.vy * nx
        body.spin += (slide / (r * 8)) * dt * 6
      }
    }
  }
}

/**
 * Surface tension, in effect: px/s² per px of overlap, scaled by 1/radius so
 * every size squishes alike. Low values let drops sink into each other and
 * the walls; the hard limits keep a hard shake from passing one through another.
 */
const CONTACT_STIFFNESS = 16000
const WALL_STIFFNESS = 12000
const CONTACT_DAMPING = 9
/** Two bodies may sink to this fraction of their combined radii. */
const HARD_LIMIT = 0.68
/** A body may press this fraction of its radius past a wall. */
const WALL_LIMIT = 0.22
const SQUASH_STIFFNESS = 130
const SQUASH_DAMPING = 5
const WOBBLE_REST = 0.006
/**
 * Repulsion reach, as a multiple of the combined radii. Under 1: drops only
 * push once they already press into each other, so they rest touching.
 */
const SPREAD_HALO = 0.97
/** How far from a wall (× radius) the spread starts pushing a drop back in. */
const WALL_HALO = 0.25
/** px/s of closing speed below which a contact is resting, not an impact. */
const JIGGLE_THRESHOLD = 60

function jiggle(body: Body, nx: number, ny: number, speed: number): void {
  body.axis = { x: nx, y: ny }
  body.squashVel += Math.min(speed, 2000) * 0.0018
  body.wobble = Math.min(0.035, body.wobble + Math.min(speed, 2000) * 0.00002)
}
