import {
  CanvasTexture,
  LinearFilter,
  Mesh,
  NoColorSpace,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderer,
} from 'three'

import { vibrate } from './haptics'
import { listenMotion } from './motion'
import { World } from './physics'
import { fragmentShader, vertexShader } from './shader'
import { patchStage, stageCell, type StageMode } from './store'

export interface BallSpec {
  id: string
  label: string
  color: string
}

const MIX_SECONDS = 1.8
const GLOW_SECONDS = 1.5
/** m/s² of linear acceleration below which a motion is a wobble, not a shake. */
const SHAKE_FLOOR = 12
/** m/s² above the floor that fill the charge in one second. */
const SHAKE_RATE = 20
const ATLAS_CELL = 256

function rgb(hex: string): Vector3 {
  const n = Number.parseInt(hex.slice(1), 16)
  return new Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255)
}

const approach = (current: number, target: number, rate: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-rate * dt))

/**
 * Owns the canvas: three.js renderer, the physics world, the sensors and the
 * mode choreography. React only tells it which balls exist and which mode the
 * route is in; everything per-frame stays out of React.
 */
export class Stage {
  private renderer: WebGLRenderer
  private scene = new Scene()
  private camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
  private mesh: Mesh<PlaneGeometry, ShaderMaterial>
  private atlas: CanvasTexture | null = null
  private world = new World()
  private specs = new Map<string, BallSpec>()
  private signature = ''
  private colors: Vector3[] = []

  private mode: StageMode = 'idle'
  private modeAt = 0
  private charge = 0
  private looks = { text: 1, merge: 0, mix: 0, glow: 0, flash: 0 }
  private manualShake = false
  private manualTimer = 0

  private width = 1
  private height = 1
  private dpr = 1
  private time = 0
  private last = 0
  private frame = 0
  private disposers: (() => void)[] = []

  /** Called once the glow peaks; the app turns this into a seed and a route. */
  onReveal: () => void = () => {}
  /** A hard shake over a finished result starts the next roll straight away. */
  onReshake: () => void = () => {}

  constructor(private canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' })
    this.mesh = new Mesh(new PlaneGeometry(2, 2), this.material(0))
    this.scene.add(this.mesh)

    const resize = () => this.resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    this.disposers.push(() => observer.disconnect())
    resize()

    this.disposers.push(
      listenMotion({
        onAlive: () => {
          if (stageCell.read().motion === 'unknown') patchStage({ motion: 'granted' })
        },
        onTilt: (g) => {
          this.world.gravity = g
        },
        onShake: ({ x, y, magnitude }) => this.shake(x, y, magnitude, 1 / 60),
      }),
    )
    this.bindPointer()

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(this.frame)
      else this.start()
    }
    document.addEventListener('visibilitychange', onVisibility)
    this.disposers.push(() => document.removeEventListener('visibilitychange', onVisibility))
    this.start()
  }

  // ── what React drives ─────────────────────────────────────────────────────

  setBalls(specs: readonly BallSpec[]): void {
    const next = new Set(specs.map((s) => s.id))
    for (const spec of specs) {
      const known = this.specs.has(spec.id)
      this.specs.set(spec.id, spec)
      if (!known || !this.world.bodies.some((b) => b.id === spec.id)) this.world.add(spec.id, this.radius(specs.length))
      else {
        const body = this.world.bodies.find((b) => b.id === spec.id)
        if (body) body.leaving = false
      }
    }
    for (const id of this.specs.keys()) {
      if (!next.has(id)) this.world.remove(id)
    }
  }

  setMode(mode: StageMode): void {
    // The sequence owns mixing and glowing; the route only catches up.
    if (mode === 'armed' && (this.mode === 'mixing' || this.mode === 'glowing')) return
    if (mode === this.mode) return
    const from = this.mode
    this.mode = mode
    this.modeAt = this.time
    // Every mode that can charge starts empty — a full meter left over from
    // the last round would re-trigger at once.
    if (mode === 'armed' || mode === 'idle' || mode === 'revealed') this.charge = 0
    // The hold button hides once the sequence starts, so its release never
    // arrives — the stage lets go itself, or it would keep shaking forever.
    if (mode !== 'armed') this.manualShake = false
    if ((from === 'revealed' || from === 'glowing') && (mode === 'idle' || mode === 'armed')) {
      // Burst the orb back into balls.
      for (const body of this.world.bodies) {
        const a = Math.random() * Math.PI * 2
        body.vx += Math.cos(a) * 900
        body.vy += Math.sin(a) * 900
      }
    }
    patchStage({ mode })
  }

  /** Desktop and permission-less fallback: hold to shake. */
  setManualShake(active: boolean): void {
    this.manualShake = active
  }

  dispose(): void {
    cancelAnimationFrame(this.frame)
    for (const dispose of this.disposers) dispose()
    this.atlas?.dispose()
    this.mesh.material.dispose()
    this.mesh.geometry.dispose()
    this.renderer.dispose()
  }

  // ── input ─────────────────────────────────────────────────────────────────

  private shake(ax: number, ay: number, magnitude: number, dt: number, manual = false): void {
    if (magnitude > 4) this.world.kick(ax, ay, 38)
    // Over a result only a real shake re-rolls; the button lives on the HUD.
    if (this.mode !== 'armed' && !(this.mode === 'revealed' && !manual)) return
    const over = magnitude - SHAKE_FLOOR
    if (over > 0) this.charge = Math.min(1, this.charge + (over / SHAKE_RATE) * dt * 4)
  }

  private bindPointer(): void {
    let last = { x: 0, y: 0, t: 0, vx: 0, vy: 0 }
    let grabbed: string | null = null
    const down = (event: PointerEvent) => {
      const body = this.world.pick(event.clientX, event.clientY)
      if (!body || this.mode === 'mixing' || this.mode === 'glowing') return
      this.canvas.setPointerCapture(event.pointerId)
      grabbed = body.id
      this.world.grabAt(body.id, event.clientX, event.clientY)
      last = { x: event.clientX, y: event.clientY, t: event.timeStamp, vx: 0, vy: 0 }
    }
    const move = (event: PointerEvent) => {
      if (!grabbed) return
      const dt = Math.max((event.timeStamp - last.t) / 1000, 1 / 240)
      const vx = (event.clientX - last.x) / dt
      const vy = (event.clientY - last.y) / dt
      last = { x: event.clientX, y: event.clientY, t: event.timeStamp, vx, vy }
      this.world.grabAt(grabbed, event.clientX, event.clientY)
      // A violent fling counts as shaking — the desktop way in.
      const speed = Math.hypot(vx, vy)
      if (this.mode === 'armed' && speed > 2400) this.charge = Math.min(1, this.charge + dt * (speed / 6000))
    }
    const up = (event: PointerEvent) => {
      if (!grabbed) return
      grabbed = null
      if (this.canvas.hasPointerCapture(event.pointerId)) this.canvas.releasePointerCapture(event.pointerId)
      this.world.release(last.vx * 0.9, last.vy * 0.9)
    }
    this.canvas.addEventListener('pointerdown', down)
    this.canvas.addEventListener('pointermove', move)
    this.canvas.addEventListener('pointerup', up)
    this.canvas.addEventListener('pointercancel', up)
    this.disposers.push(() => {
      this.canvas.removeEventListener('pointerdown', down)
      this.canvas.removeEventListener('pointermove', move)
      this.canvas.removeEventListener('pointerup', up)
      this.canvas.removeEventListener('pointercancel', up)
    })
  }

  // ── layout ────────────────────────────────────────────────────────────────

  private resize(): void {
    this.width = Math.max(1, this.canvas.clientWidth)
    this.height = Math.max(1, this.canvas.clientHeight)
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.renderer.setPixelRatio(this.dpr)
    this.renderer.setSize(this.width, this.height, false)
  }

  /**
   * The panel's top edge. Whatever sheet is on screen marks its body with
   * `data-stage-floor`, and the balls live above it.
   */
  private floor(): number {
    let top = this.height
    for (const el of document.querySelectorAll<HTMLElement>('[data-stage-floor]')) {
      if (el.closest('[inert]')) continue
      // Measure the sheet's frame, not the padded body inside it.
      const rect = (el.closest('.ms-slot') ?? el).getBoundingClientRect()
      if (rect.height > 0 && rect.top > 0) top = Math.min(top, rect.top - 8)
    }
    return Math.max(top, this.height * 0.22)
  }

  private radius(count: number): number {
    const a = this.world.targetArea
    const area = Math.max((a.right - a.left) * (a.bottom - a.top), 1)
    const fit = Math.sqrt((0.24 * area) / (Math.max(count, 1) * Math.PI))
    return Math.max(24, Math.min(fit, Math.min(this.width, this.height) * 0.19))
  }

  // ── frame ─────────────────────────────────────────────────────────────────

  private start(): void {
    cancelAnimationFrame(this.frame)
    this.last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min((now - this.last) / 1000, 1 / 30)
      this.last = now
      this.update(dt)
      this.render()
      this.frame = requestAnimationFrame(tick)
    }
    this.frame = requestAnimationFrame(tick)
  }

  private update(dt: number): void {
    this.time += dt
    const elapsed = this.time - this.modeAt
    const world = this.world
    const t = world.tuning
    const inset = 10
    // Clear the top bar (logo, 보관함) and the notch.
    const top = Math.max(inset, (window.visualViewport?.offsetTop ?? 0) + 64)
    world.targetArea = { left: inset, top, right: this.width - inset, bottom: this.floor() }
    if (world.area.right === 0) world.area = { ...world.targetArea }
    const zone = world.targetArea
    t.center = { x: (zone.left + zone.right) / 2, y: (zone.top + zone.bottom) / 2 }

    if (this.manualShake) {
      this.manualTimer -= dt
      if (this.manualTimer <= 0) {
        this.manualTimer = 0.07
        const a = Math.random() * Math.PI * 2
        this.shake(Math.cos(a) * 26, Math.sin(a) * 26, 26, 0.07, true)
      }
    } else if (this.mode === 'armed' || this.mode === 'revealed') {
      this.charge = Math.max(0, this.charge - dt * 0.12)
    }

    const live = world.bodies.filter((b) => !b.leaving).length
    let radius = this.radius(live)
    const looks = { text: 1, merge: 0, mix: 0, glow: 0 }

    switch (this.mode) {
      case 'idle':
      case 'armed': {
        // Oil in water: heavy drag, little bounce.
        Object.assign(t, { gravity: 750, collide: true, attract: 0, swirl: 0, damping: 0.4, restitution: 0.3 })
        if (this.mode === 'idle') {
          // Above the picker the balls float: weak gravity, a little lift.
          t.gravity = 260
        }
        looks.text = 1 - this.charge * 0.7
        looks.mix = this.charge * 0.3
        if (this.mode === 'armed' && this.charge >= 1) this.setMode('mixing')
        break
      }
      case 'mixing': {
        const k = Math.min(elapsed / MIX_SECONDS, 1)
        Object.assign(t, { gravity: 200 * (1 - k), collide: false, attract: 6 + 30 * k, swirl: 1400 * (1 - k * 0.5), damping: 0.35 })
        radius *= 1 - 0.25 * k
        looks.text = 0
        // Bodies give up their edges first, then the colours run.
        looks.merge = Math.min(k * 2.5, 1)
        looks.mix = k
        if (k >= 1) this.setMode('glowing')
        break
      }
      case 'glowing': {
        const k = Math.min(elapsed / GLOW_SECONDS, 1)
        Object.assign(t, { gravity: 0, collide: false, attract: 50, swirl: 500 * (1 - k), damping: 0.15 })
        radius *= 0.75 - 0.1 * k
        looks.text = 0
        looks.merge = 1
        looks.mix = 1
        looks.glow = k * k
        if (k >= 1) this.reveal()
        break
      }
      case 'revealed': {
        // The light has done its job: the drops are gone, the result is the
        // character. Shaking here glows the screen back up toward a new roll.
        Object.assign(t, { gravity: 0, collide: false, attract: 18, swirl: 60, damping: 0.25 })
        radius = 0
        looks.text = 0
        looks.merge = 1
        looks.mix = 1
        looks.glow = this.charge * 0.6
        if (this.charge >= 1) {
          this.setMode('mixing')
          this.onReshake()
        }
        break
      }
    }

    for (const body of world.bodies) if (!body.leaving) body.targetR = radius

    // Two substeps keep fast shakes from tunnelling through the walls.
    world.step(dt / 2)
    world.step(dt / 2)

    this.looks.text = approach(this.looks.text, looks.text, this.mode === 'mixing' ? 9 : 5, dt)
    this.looks.merge = approach(this.looks.merge, looks.merge, 7, dt)
    this.looks.mix = approach(this.looks.mix, looks.mix, 6, dt)
    // Into the glow fast; out of it slowly, so the screen fades like an afterimage.
    this.looks.glow = approach(this.looks.glow, looks.glow, looks.glow > this.looks.glow ? 8 : 1.6, dt)
    this.looks.flash = approach(this.looks.flash, 0, 2.6, dt)
    document.documentElement.style.setProperty('--charge', this.charge.toFixed(3))
  }

  private reveal(): void {
    this.looks.flash = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.35 : 1
    vibrate([40, 50, 140])
    this.setMode('revealed')
    this.onReveal()
  }

  private render(): void {
    const bodies = this.world.bodies
    const signature = bodies.map((b) => b.id).join('|')
    if (signature !== this.signature) {
      this.signature = signature
      this.rebuild()
    }

    const u = this.mesh.material.uniforms
    const balls = u.uBalls!.value as Vector4[]
    const deform = u.uDeform!.value as Vector4[]
    let sumR = 0
    bodies.forEach((body, i) => {
      balls[i]!.set(body.x * this.dpr, body.y * this.dpr, body.r * this.dpr, body.angle)
      deform[i]!.set(body.axis.x, body.axis.y, body.squash, 0)
      sumR += body.r
    })
    const area = this.world.area
    u.uArea!.value.set(area.left * this.dpr, area.top * this.dpr, area.right * this.dpr, area.bottom * this.dpr)
    u.uRes!.value.set(this.width * this.dpr, this.height * this.dpr)
    u.uCenter!.value.set(this.world.tuning.center.x * this.dpr, this.world.tuning.center.y * this.dpr)
    const avg = u.uAvg!.value as Vector3
    avg.set(0, 0, 0)
    for (const color of this.colors) avg.add(color)
    if (this.colors.length) avg.multiplyScalar(1 / this.colors.length)
    u.uScale!.value = (bodies.length ? sumR / bodies.length : 1) * this.dpr
    u.uText!.value = this.looks.text
    u.uMerge!.value = this.looks.merge
    u.uMix!.value = this.looks.mix
    u.uGlow!.value = this.looks.glow
    u.uFlash!.value = this.looks.flash
    u.uTime!.value = this.time
    this.renderer.render(this.scene, this.camera)
  }

  /** New ball set → new atlas and a material compiled for that count. */
  private rebuild(): void {
    const bodies = this.world.bodies
    const specs = bodies.map((b) => this.specs.get(b.id)!)
    this.atlas?.dispose()
    this.atlas = drawAtlas(specs.map((s) => s.label))
    const old = this.mesh.material
    this.mesh.material = this.material(specs.length)
    old.dispose()
    const colors = this.mesh.material.uniforms.uColors!.value as Vector3[]
    specs.forEach((spec, i) => colors[i]!.copy(rgb(spec.color)))
    this.colors = specs.map((spec) => rgb(spec.color))
  }

  private material(count: number): ShaderMaterial {
    const n = Math.max(count, 1)
    return new ShaderMaterial({
      vertexShader,
      fragmentShader: fragmentShader(n),
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uBalls: { value: Array.from({ length: n }, () => new Vector4()) },
        uDeform: { value: Array.from({ length: n }, () => new Vector4(0, 1, 0, 0)) },
        uColors: { value: Array.from({ length: n }, () => new Vector3()) },
        uAtlas: { value: this.atlas },
        uRes: { value: new Vector2() },
        uArea: { value: new Vector4() },
        uCenter: { value: new Vector2() },
        uAvg: { value: new Vector3() },
        uScale: { value: 1 },
        uText: { value: 1 },
        uMerge: { value: 0 },
        uMix: { value: 0 },
        uGlow: { value: 0 },
        uFlash: { value: 0 },
        uTime: { value: 0 },
      },
    })
  }
}

/** One row per label, white type with a soft shadow so it reads on any colour. */
function drawAtlas(labels: readonly string[]): CanvasTexture {
  const canvas = document.createElement('canvas')
  const rows = Math.max(labels.length, 1)
  canvas.width = ATLAS_CELL
  canvas.height = ATLAS_CELL * rows
  const ctx = canvas.getContext('2d')!
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  labels.forEach((label, i) => {
    let size = 64
    const font = (px: number) => `700 ${px}px "Pretendard Variable", Pretendard, -apple-system, system-ui, sans-serif`
    ctx.font = font(size)
    const width = ctx.measureText(label).width
    if (width > 188) size = Math.max(30, Math.floor((size * 188) / width))
    ctx.font = font(size)
    const cy = i * ATLAS_CELL + ATLAS_CELL / 2
    ctx.shadowColor = 'rgba(10, 6, 30, 0.55)'
    ctx.shadowBlur = 10
    ctx.shadowOffsetY = 3
    ctx.fillStyle = '#ffffff'
    ctx.fillText(label, ATLAS_CELL / 2, cy)
  })
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = NoColorSpace
  texture.generateMipmaps = false
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  return texture
}
