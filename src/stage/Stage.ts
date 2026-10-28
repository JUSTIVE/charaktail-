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

import { inkOn } from '../domain/palette'
import { haptic } from './haptics'
import { listenMotion } from './motion'
import { World } from './physics'
import { FLOW_SLOTS, fragmentShader, vertexShader } from './shader'
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
/** A result listens for a re-roll only after this long on screen… */
const REARM_AFTER = 1.5
/** …and this long without a hard shake. */
const REARM_QUIET = 0.8
/** The lowest pixel ratio adaptive resolution will drop to. */
const MIN_DPR = 0.75
/** px/s² of slosh per deg/s of gyro turn, and of swirl per deg/s of spin. */
const SLOSH = 7
const SWIRL = 3
/** Share of the gyro's slosh felt before the shake button is pressed. */
const IDLE_GYRO = 0.15
const SHAKA_W = 1024
const SHAKA_H = 300
/** Share of the zone the bubbles cover; soft contacts take up the rest. */
const FILL = 0.86

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
  /** One canvas for every atlas — iOS paints new canvases blank past its canvas-memory cap. */
  private readonly atlasCanvas = document.createElement('canvas')
  private atlasSpecs: readonly BallSpec[] = []
  private u!: StageUniforms
  private world = new World()
  private specs = new Map<string, BallSpec>()
  private signature = ''
  private colors: Vector3[] = []

  private mode: StageMode = 'idle'
  private modeAt = 0
  private charge = 0
  private readonly flowColors = Array.from({ length: FLOW_SLOTS }, () => new Vector3())
  private looks = { text: 1, merge: 0, mix: 0, glow: 0, flash: 0, shaka: 0, flow: 0 }
  private shakaTex: CanvasTexture | null = null
  /** Recent shake strength, 0–1; jolts the 샤카 text. */
  private kick = 0
  /** A real tilt sensor is reporting — gravity then follows the phone. */
  private hasTilt = false
  /** When the last shake above the floor arrived, wall-clock seconds. */
  private lastStrongShake = -Infinity
  /** A result accepts a re-roll only once the phone has been still after it. */
  private rearmed = false
  /** The meter reached full since the mode began. */
  private filled = false
  /** Highest quarter of the meter already announced by a tick. */
  private chargeQuarter = 0
  /** Latest gyroscope reading, deg/s in screen space; applied each frame. */
  private rotation = { x: 0, y: 0, z: 0 }
  private manualShake = false
  private manualTimer = 0

  private width = 1
  private height = 1
  private dpr = 1
  private maxDpr = 1
  /** Share of the device pixel ratio actually rendered (adaptive). */
  private resolution = 1
  private frameAvg = 1 / 60
  private adaptedAt = 0
  private time = 0
  private last = 0
  private frame = 0
  private disposers: (() => void)[] = []

  /**
   * Meters showing the charge. The stage writes their transform directly:
   * a custom property on :root would restyle the whole document every frame.
   */
  readonly meters = new Set<HTMLElement>()
  private shownCharge = -1

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
          this.hasTilt = true
          this.world.gravity = g
        },
        onShake: ({ x, y, magnitude, dt }) => this.shake(x, y, magnitude, dt),
        onRotate: (r) => {
          this.rotation = r
        },
      }),
    )
    this.bindPointer()
    // The chant is drawn once its glyphs are in, so it never falls back.
    void document.fonts.load(SHAKA_FONT, '샤카').finally(() => {
      this.shakaTex = drawShaka()
    })
    // The web font is a dynamic subset: glyphs arrive in chunks, on demand.
    // Text drawn before its chunk lands is blank (Safari) or a fallback, and
    // a canvas never redraws itself — so every landing repaints the labels.
    const onFonts = () => this.redrawLabels()
    document.fonts.addEventListener('loadingdone', onFonts)
    this.disposers.push(() => document.fonts.removeEventListener('loadingdone', onFonts))
    // A lost GPU context drops every texture; upload them again on return.
    const onRestored = () => this.redrawLabels()
    canvas.addEventListener('webglcontextrestored', onRestored)
    this.disposers.push(() => canvas.removeEventListener('webglcontextrestored', onRestored))

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
    this.filled = false
    this.chargeQuarter = 0
    if (mode === 'mixing') haptic.mix()
    if (mode === 'glowing') haptic.glow()
    // The hold button hides once the sequence starts, so its release never
    // arrives — the stage lets go itself, or it would keep shaking forever.
    if (mode !== 'armed') this.manualShake = false
    if (mode === 'revealed') this.rearmed = false
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
    this.shakaTex?.dispose()
    this.mesh.material.dispose()
    this.mesh.geometry.dispose()
    this.renderer.dispose()
  }

  // ── input ─────────────────────────────────────────────────────────────────

  private shake(ax: number, ay: number, magnitude: number, dt: number, manual = false): void {
    if (magnitude > 4) this.world.kick(ax, ay, 38)
    this.kick = Math.max(this.kick, Math.min(magnitude / 30, 1))
    if (magnitude > SHAKE_FLOOR) this.lastStrongShake = this.time
    // Over a result only a real, *new* shake re-rolls: the shaking that just
    // produced this result usually carries on past the reveal, and must not
    // roll again by itself (see `rearmed`). The button lives on the HUD.
    if (this.mode !== 'armed' && !(this.mode === 'revealed' && !manual && this.rearmed)) return
    const over = magnitude - SHAKE_FLOOR
    if (over > 0) this.charge = Math.min(1, this.charge + (over / SHAKE_RATE) * dt * 4)
    // A tick each time the meter crosses a quarter, firmer as it fills.
    const quarter = Math.floor(this.charge * 4)
    if (quarter > this.chargeQuarter && quarter < 4) haptic.charge(quarter)
    this.chargeQuarter = Math.max(this.chargeQuarter, quarter)
    // "Full" is decided here, when a shake fills the meter. Checking
    // `charge >= 1` in the frame loop never fired for real motion: each
    // frame lets the charge decay a hair before the check, so a meter topped
    // up by device events always read 0.998 and the roll never started.
    if (this.charge >= 1) this.filled = true
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
    this.maxDpr = Math.min(window.devicePixelRatio || 1, 2)
    this.applyResolution()
  }

  private applyResolution(): void {
    this.dpr = Math.max(MIN_DPR, this.maxDpr * this.resolution)
    this.renderer.setPixelRatio(this.dpr)
    this.renderer.setSize(this.width, this.height, false)
  }

  /**
   * Adaptive resolution. The shader is per-pixel heavy; on a phone that
   * can't hold the frame rate the drawing buffer steps down a quarter at a
   * time (to MIN_DPR at worst), and steps back up after a few smooth seconds.
   */
  private adapt(real: number): void {
    this.frameAvg += (real - this.frameAvg) * 0.06
    if (this.time - this.adaptedAt < 1) return
    const slow = this.frameAvg > 1 / 40
    const smooth = this.frameAvg < 1 / 54
    if (slow && this.maxDpr * this.resolution > MIN_DPR) {
      this.resolution = Math.max(MIN_DPR / this.maxDpr, this.resolution - 0.25)
      this.adaptedAt = this.time
      this.applyResolution()
    } else if (smooth && this.resolution < 1 && this.time - this.adaptedAt > 4) {
      this.resolution = Math.min(1, this.resolution + 0.25)
      this.adaptedAt = this.time
      this.applyResolution()
    }
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

  /**
   * Bubbles fill their zone: radius from a target coverage near what soft
   * bodies can pack (they squash into the gaps), capped so one bubble alone
   * still fits between the walls.
   */
  private radius(count: number): number {
    const a = this.world.targetArea
    const w = Math.max(a.right - a.left, 1)
    const h = Math.max(a.bottom - a.top, 1)
    const fit = Math.sqrt((FILL * w * h) / (Math.max(count, 1) * Math.PI))
    return Math.max(22, Math.min(fit, Math.min(w, h) * 0.48))
  }

  // ── frame ─────────────────────────────────────────────────────────────────

  private start(): void {
    cancelAnimationFrame(this.frame)
    this.last = performance.now()
    const tick = (now: number) => {
      // Wall-clock seconds drive the choreography, so a slow phone still
      // mixes, glows and reveals on schedule; the physics step stays capped
      // so a long frame can't fling a drop through a wall.
      const real = Math.min((now - this.last) / 1000, 0.25)
      const dt = Math.min(real, 1 / 30)
      this.last = now
      this.update(dt, real)
      this.adapt(real)
      this.render()
      this.frame = requestAnimationFrame(tick)
    }
    this.frame = requestAnimationFrame(tick)
  }

  private update(dt: number, real: number): void {
    this.time += real
    const elapsed = this.time - this.modeAt
    const world = this.world
    const t = world.tuning
    const inset = 10
    // Start under the top bar — its padding already carries the notch inset.
    const bar = document.querySelector('.topbar')?.getBoundingClientRect().bottom ?? 52
    const top = Math.max(inset, bar + 10)
    world.targetArea = { left: inset, top, right: this.width - inset, bottom: this.floor() }
    if (world.area.right === 0) world.area = { ...world.targetArea }
    const zone = world.targetArea
    t.center = { x: (zone.left + zone.right) / 2, y: (zone.top + zone.bottom) / 2 }

    if (this.manualShake) {
      this.manualTimer -= real
      if (this.manualTimer <= 0) {
        this.manualTimer = 0.07
        const a = Math.random() * Math.PI * 2
        this.shake(Math.cos(a) * 26, Math.sin(a) * 26, 26, 0.07, true)
      }
    } else if (this.mode === 'armed' || this.mode === 'revealed') {
      this.charge = Math.max(0, this.charge - real * 0.12)
    }
    if (this.mode === 'revealed' && !this.rearmed && this.time - this.modeAt > REARM_AFTER && this.time - this.lastStrongShake > REARM_QUIET) {
      this.rearmed = true
    }

    const live = world.bodies.filter((b) => !b.leaving).length
    let radius = this.radius(live)
    const looks = { text: 1, merge: 0, mix: 0, glow: 0, shaka: 0 }

    switch (this.mode) {
      case 'idle':
      case 'armed': {
        // Oil in water: heavy drag, little bounce.
        Object.assign(t, { gravity: 750, collide: true, attract: 0, swirl: 0, damping: 0.4, restitution: 0.3, spread: 60 })
        if (this.mode === 'idle' || !this.hasTilt) {
          // Nothing tilting them: a gentle pull toward the middle of the area
          // packs the drops together — contacts and walls push back, so they
          // fill the whole area pressed against each other. (Without a pull,
          // every force only pushes apart and the gaps never close.)
          Object.assign(t, { gravity: 0, spread: 300, damping: 0.25, attract: 3.2 })
          // Before the shake button, a real sensor's tilt pools them only a
          // little to the low side (on the shake screen tilt is full gravity).
          if (this.hasTilt) t.gravity = 40
        }
        looks.text = 1 - this.charge * 0.7
        looks.mix = this.charge * 0.3
        if (this.mode === 'armed' && this.filled) this.setMode('mixing')
        break
      }
      case 'mixing': {
        const k = Math.min(elapsed / MIX_SECONDS, 1)
        Object.assign(t, { gravity: 200 * (1 - k), collide: false, attract: 6 + 30 * k, swirl: 1400 * (1 - k * 0.5), damping: 0.35, spread: 0 })
        radius *= 1 - 0.25 * k
        looks.text = 0
        // Bodies give up their edges first, then the colours run.
        looks.merge = Math.min(k * 2.5, 1)
        looks.mix = k
        looks.shaka = 1
        if (k >= 1) this.setMode('glowing')
        break
      }
      case 'glowing': {
        const k = Math.min(elapsed / GLOW_SECONDS, 1)
        Object.assign(t, { gravity: 0, collide: false, attract: 50, swirl: 500 * (1 - k), damping: 0.15, spread: 0 })
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
        Object.assign(t, { gravity: 0, collide: false, attract: 18, swirl: 60, damping: 0.25, spread: 0 })
        radius = 0
        looks.text = 0
        looks.merge = 1
        looks.mix = 1
        looks.glow = this.charge * 0.6
        if (this.filled) {
          this.setMode('mixing')
          this.onReshake()
        }
        break
      }
    }

    for (const body of world.bodies) if (!body.leaving) body.targetR = radius

    // 찰랑: the gyro sloshes the drops wherever they are still separate —
    // only a whisper of it before the shake button is pressed.
    if (this.mode === 'idle' || this.mode === 'armed') {
      const r = this.rotation
      const gain = this.mode === 'idle' ? IDLE_GYRO : 1
      this.world.slosh(r.x * SLOSH * gain, r.y * SLOSH * gain, r.z * SWIRL * gain, dt)
      // Readings arrive ~60 Hz; let a stale one fade rather than push forever.
      this.rotation = { x: r.x * 0.8, y: r.y * 0.8, z: r.z * 0.8 }
    }

    // Two substeps keep fast shakes from tunnelling through the walls.
    world.step(dt / 2)
    world.step(dt / 2)

    this.looks.text = approach(this.looks.text, looks.text, this.mode === 'mixing' ? 9 : 5, real)
    this.looks.merge = approach(this.looks.merge, looks.merge, 7, real)
    this.looks.mix = approach(this.looks.mix, looks.mix, 6, real)
    // Into the glow fast; out of it slowly, so the screen fades like an afterimage.
    this.looks.glow = approach(this.looks.glow, looks.glow, looks.glow > this.looks.glow ? 8 : 1.6, real)
    this.looks.flash = approach(this.looks.flash, 0, 2.6, real)
    // The colour flow behind the drops: on while there are drops, easing out
    // as they merge, gone once the result clears them.
    // Fades in over a moment, out slowly (≈3s) — it lingers like a stain.
    const flowTarget = live > 0 && (this.mode === 'idle' || this.mode === 'armed') ? 1 : this.mode === 'mixing' ? 0.6 : 0
    this.looks.flow = approach(this.looks.flow, flowTarget, flowTarget > this.looks.flow ? 1.5 : 0.45, real)
    // Its palette glides toward the selection's colours and keeps the last
    // ones once the balls are gone, so the fade-out has something to fade.
    if (this.colors.length) {
      this.flowColors.forEach((slot, i) => slot.lerp(this.colors[i % this.colors.length]!, 1 - Math.exp(-3 * real)))
    }
    // The chant snaps in and leaves as the glow takes over.
    this.looks.shaka = approach(this.looks.shaka, looks.shaka, looks.shaka > this.looks.shaka ? 12 : 7, real)
    // While mixing the chant keeps its own beat even without a hand on the phone.
    if (this.mode === 'mixing') this.kick = Math.max(this.kick, 0.25)
    this.kick *= Math.pow(0.12, real)
    const shown = this.mode === 'mixing' || this.mode === 'glowing' ? 1 : this.charge
    if (Math.abs(shown - this.shownCharge) > 0.002) {
      this.shownCharge = shown
      for (const meter of this.meters) meter.style.transform = `scaleX(${shown.toFixed(3)})`
    }
  }

  private reveal(): void {
    this.looks.flash = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.35 : 1
    haptic.reveal()
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

    const u = this.u
    const balls = u.uBalls.value
    const deform = u.uDeform.value
    let sumR = 0
    bodies.forEach((body, i) => {
      balls[i]!.set(body.x * this.dpr, body.y * this.dpr, body.r * this.dpr, body.angle)
      deform[i]!.set(body.axis.x, body.axis.y, body.squash, body.wobble)
      sumR += body.r
    })
    const area = this.world.area
    u.uArea.value.set(area.left * this.dpr, area.top * this.dpr, area.right * this.dpr, area.bottom * this.dpr)
    u.uRes.value.set(this.width * this.dpr, this.height * this.dpr)
    u.uCenter.value.set(this.world.tuning.center.x * this.dpr, this.world.tuning.center.y * this.dpr)
    const avg = u.uAvg.value
    avg.set(0, 0, 0)
    for (const color of this.colors) avg.add(color)
    if (this.colors.length) avg.multiplyScalar(1 / this.colors.length)
    u.uScale.value = (bodies.length ? sumR / bodies.length : 1) * this.dpr
    u.uText.value = this.looks.text
    u.uMerge.value = this.looks.merge
    u.uFlow.value = this.looks.flow
    u.uFlowColors.value.forEach((slot, i) => slot.copy(this.flowColors[i]!))
    u.uShaka.value = this.shakaTex ? this.looks.shaka : 0
    u.uKick.value = this.kick
    u.uShakaTex.value = this.shakaTex
    u.uMix.value = this.looks.mix
    u.uGlow.value = this.looks.glow
    u.uFlash.value = this.looks.flash
    u.uTime.value = this.time
    this.renderer.render(this.scene, this.camera)
  }

  /** Same balls, fresh ink: repaint the label atlas and the chant in place. */
  private redrawLabels(): void {
    if (this.atlas && this.atlasSpecs.length) {
      drawAtlas(this.atlasCanvas, this.atlasSpecs, this.atlas)
    }
    if (this.shakaTex) {
      drawShaka(this.shakaTex)
    }
  }

  /** New ball set → new atlas and a material compiled for that count. */
  private rebuild(): void {
    const bodies = this.world.bodies
    const specs = bodies.map((b) => this.specs.get(b.id)!)
    this.atlas?.dispose()
    this.atlas = drawAtlas(this.atlasCanvas, specs)
    this.atlasSpecs = specs
    // Ask for exactly these glyphs; draw again once they are in.
    void document.fonts.load(labelFont(64), specs.map((s) => s.label).join('')).then(() => this.redrawLabels())
    const old = this.mesh.material
    this.mesh.material = this.material(specs.length)
    old.dispose()
    const colors = this.u.uColors.value
    specs.forEach((spec, i) => colors[i]!.copy(rgb(spec.color)))
    this.colors = specs.map((spec) => rgb(spec.color))
  }

  /** A material compiled for `count` balls, holding `this.u` by reference. */
  private material(count: number): ShaderMaterial {
    this.u = createUniforms(Math.max(count, 1), this.atlas, this.shakaTex)
    return new ShaderMaterial({
      vertexShader,
      fragmentShader: fragmentShader(count),
      depthTest: false,
      depthWrite: false,
      uniforms: this.u,
    })
  }
}

/** Every uniform the shader reads, typed — three's own map is a loose index. */
function createUniforms(n: number, atlas: CanvasTexture | null, shakaTex: CanvasTexture | null) {
  return {
    uBalls: { value: Array.from({ length: n }, () => new Vector4()) },
    uDeform: { value: Array.from({ length: n }, () => new Vector4(0, 1, 0, 0)) },
    uColors: { value: Array.from({ length: n }, () => new Vector3()) },
    uAtlas: { value: atlas },
    uRes: { value: new Vector2() },
    uArea: { value: new Vector4() },
    uCenter: { value: new Vector2() },
    uAvg: { value: new Vector3() },
    uScale: { value: 1 },
    uText: { value: 1 },
    uMerge: { value: 0 },
    uFlow: { value: 0 },
    uFlowColors: { value: Array.from({ length: FLOW_SLOTS }, () => new Vector3()) },
    uShaka: { value: 0 },
    uKick: { value: 0 },
    uShakaTex: { value: shakaTex },
    uShakaAspect: { value: SHAKA_W / SHAKA_H },
    uMix: { value: 0 },
    uGlow: { value: 0 },
    uFlash: { value: 0 },
    uTime: { value: 0 },
  }
}
type StageUniforms = ReturnType<typeof createUniforms>

const labelFont = (px: number) => `700 ${px}px "Pretendard Variable", Pretendard, -apple-system, system-ui, sans-serif`

/**
 * One row per label; the ink follows the fill, so amber and lime get dark
 * type. Draws into `canvas`; with `into`, refreshes that texture in place
 * (same size) instead of making a new one.
 */
function drawAtlas(canvas: HTMLCanvasElement, specs: readonly BallSpec[], into?: CanvasTexture): CanvasTexture {
  const labels = specs.map((s) => s.label)
  const rows = Math.max(labels.length, 1)
  // Setting the size also clears the canvas.
  canvas.width = ATLAS_CELL
  canvas.height = ATLAS_CELL * rows
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    labels.forEach((label, i) => {
      let size = 64
      ctx.font = labelFont(size)
      const width = ctx.measureText(label).width
      if (width > 188) size = Math.max(30, Math.floor((size * 188) / width))
      ctx.font = labelFont(size)
      const cy = i * ATLAS_CELL + ATLAS_CELL / 2
      const ink = inkOn(specs[i]!.color)
      const dark = ink !== '#ffffff'
      ctx.shadowColor = dark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(18, 17, 19, 0.55)'
      ctx.shadowBlur = dark ? 6 : 10
      ctx.shadowOffsetY = dark ? 1 : 3
      ctx.fillStyle = ink
      ctx.fillText(label, ATLAS_CELL / 2, cy)
    })
  }
  if (into) {
    into.needsUpdate = true
    return into
  }
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = NoColorSpace
  texture.generateMipmaps = false
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  return texture
}

const SHAKA_FONT = `900 190px "Pretendard Variable", Pretendard, -apple-system, system-ui, sans-serif`

/** "샤카 샤카": one word per half, so the shader can make them hop in turn. With `into`, redraws it in place. */
function drawShaka(into?: CanvasTexture): CanvasTexture {
  const canvas = (into?.image as HTMLCanvasElement | undefined) ?? document.createElement('canvas')
  canvas.width = SHAKA_W
  canvas.height = SHAKA_H
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = SHAKA_FONT
    ctx.fillStyle = '#ffffff'
    // Words close together: one chant, not two labels.
    ctx.fillText('샤카', SHAKA_W * 0.3, SHAKA_H / 2)
    ctx.fillText('샤카', SHAKA_W * 0.7, SHAKA_H / 2)
  }
  if (into) {
    into.needsUpdate = true
    return into
  }
  const texture = new CanvasTexture(canvas)
  // The shader samples this in screen order (v grows downward), unlike the
  // label atlas, which keeps three's default bottom-up flip.
  texture.flipY = false
  texture.colorSpace = NoColorSpace
  texture.generateMipmaps = false
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  return texture
}
