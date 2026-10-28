/*
 * The ball shader. One full-screen pass draws the balls two ways and blends
 * between them with uMerge:
 *
 *   bodies (uMerge 0)   before the shake every ball is its own oil drop with
 *                       a crisp edge. Where two press together the power
 *                       diagram cuts them along their radical line, and a
 *                       drop pressed past a wall is cut by it; a smooth-min
 *                       rounds the corners, so drops meet like liquid, not
 *                       like cut glass. The distance to that edge is the
 *                       drop's height profile: a dome that refracts the
 *                       backdrop (hardest at the rim, per colour channel, so
 *                       edges fringe like a real lens), focuses light opposite
 *                       the lamp and shows a thin-film sheen at its rim. Each drop also carries a
 *                       wobble (axis + squash) from impacts and speed.
 *   metaball (uMerge 1) the r²/d² field summed over every ball, iso-surface
 *                       at 1.0, so the bodies melt into one blob.
 *
 * Ball count is a compile-time constant, so the material is rebuilt when the
 * selection changes — cheap, and it keeps the loop bounded for every GPU.
 *
 *   uText  — label texture on each body (1) → plain colour (0)
 *   uMerge — separate bodies (0) → one metaball (1)
 *   uMix   — each ball keeps its colour (0) → marbled, then blended (1)
 *   uGlow  — lit glossy surface (0) → emissive core, halo, rays, and the
 *            whole screen flooding with the drops' mixed colour (1)
 *   uFlash — white-out at the moment of the reveal
 *   uFlow  — the selected colours drifting through the stage's background as
 *            Perlin-style noise (0 off → 1)
 *   uShaka — the "샤카 샤카" chant over the mix (0 → 1); uKick jolts it with
 *            every shake
 */

/** Slots in the flow's palette: the selection's colours repeat to fill them, so a new selection never re-indexes the field. */
export const FLOW_SLOTS = 8

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

export function fragmentShader(count: number): string {
  return /* glsl */ `
  precision highp float;
  #define N ${Math.max(count, 1)}
  #define FLOW_SLOTS ${FLOW_SLOTS}
  #define DROP_OPACITY 0.62
  #define RIPPLE_MODES 14

  uniform vec4 uBalls[N];      // x, y (device px, y down), radius, angle
  uniform vec4 uDeform[N];     // squash axis x, y, squash amount, ripple amplitude
  uniform vec3 uColors[N];
  uniform sampler2D uAtlas;    // one label per row, N rows
  uniform vec2 uRes;
  uniform vec4 uArea;          // walls: left, top, right, bottom (device px)
  uniform vec2 uCenter;
  uniform vec3 uAvg;           // mean colour of every ball — the light the screen fills with
  uniform float uScale;        // mean radius, for normal strength
  uniform float uText;
  uniform float uMerge;
  uniform float uMix;
  uniform float uGlow;
  uniform float uFlash;
  uniform float uFlow;
  uniform vec3 uFlowColors[FLOW_SLOTS]; // the flow's own palette — outlives the balls it came from
  uniform sampler2D uShakaTex; // "샤카" twice, one word per half
  uniform float uShakaAspect;  // texture width / height
  uniform float uShaka;
  uniform float uKick;
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  /* Gradient (Perlin-style) noise and a three-octave fbm, roughly −0.6…0.6. */
  vec2 grad2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
  }
  float gnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(dot(grad2(i), f), dot(grad2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
               mix(dot(grad2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(grad2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float sum = 0.0, amp = 0.5;
    for (int k = 0; k < 3; k++) { sum += amp * gnoise(p); p *= 2.03; amp *= 0.5; }
    return sum;
  }

  /*
   * The selected colours drifting through the bubble area: one noise field
   * says which colour (neighbours blend), another how much — a faint
   * light, strongest mid-area, feathered out at the zone's edges.
   */
  vec3 flowAt(vec2 p) {
    if (uFlow < 0.001) return vec3(0.0);
    float scale = 1.0 / (uRes.y * 0.32);
    float which = fbm(p * scale + vec2(uTime * 0.045, -uTime * 0.03)) * 0.9 + 0.5;
    float much = fbm(p * scale * 1.3 + vec2(-uTime * 0.035, uTime * 0.05) + 7.3) * 0.9 + 0.5;
    float idx = fract(which * 1.6) * float(FLOW_SLOTS);
    int i0 = int(floor(idx));
    int i1 = i0 + 1 >= FLOW_SLOTS ? 0 : i0 + 1;
    vec3 col = mix(uFlowColors[i0], uFlowColors[i1], smoothstep(0.0, 1.0, fract(idx)));
    float feather = uRes.y * 0.06;
    float zone = smoothstep(0.0, feather, p.x - uArea.x) * smoothstep(0.0, feather, uArea.z - p.x)
               * smoothstep(0.0, feather, p.y - uArea.y) * smoothstep(0.0, feather, uArea.w - p.y);
    return col * (0.05 + 0.13 * smoothstep(0.25, 0.85, much)) * zone * uFlow;
  }

  /* Night sky with a faint dot grid — also what a drop refracts. */
  vec3 backdrop(vec2 p) {
    vec2 uv = vec2(p.x / uRes.x, 1.0 - p.y / uRes.y);
    // mauve 1 (#121113) at the floor, violet 2 (#1b1525) overhead.
    vec3 bg = mix(vec3(0.071, 0.067, 0.075), vec3(0.106, 0.082, 0.145), uv.y);
    vec2 cell = fract(p / 22.0) - 0.5;
    bg += vec3(0.05) * smoothstep(0.09, 0.0, length(cell)) * (0.4 + 0.6 * hash(floor(p / 22.0)));
    vec2 v = uv - 0.5;
    return bg * (1.0 - dot(v, v) * 0.9);
  }

  /* Smooth minimum of two edge distances, carrying their inward gradients. */
  void smin(inout float e, inout vec2 g, float e2, vec2 g2, float k) {
    float h = clamp(0.5 + 0.5 * (e2 - e) / k, 0.0, 1.0);
    e = mix(e2, e, h) - k * h * (1.0 - h);
    g = normalize(mix(g2, g, h) + 1e-5);
  }

  /* Ball-local position after the jiggle: squashed along the impact axis,
     bulged across it. Length 1.0 is the body's edge. */
  vec2 deform(vec2 l, vec4 dm, float phase) {
    vec2 axis = dm.xy;
    float along = dot(l, axis);
    vec2 across = l - axis * along;
    vec2 q = axis * (along / (1.0 - dm.z)) + across / (1.0 + 0.6 * dm.z);
    float q2 = dot(q, q);
    // Ripples move the rim by a few percent; well away from it they change
    // nothing visible, so the mode loop is skipped there. The fade below
    // keeps that cut seamless.
    if (q2 > 3.0) return q;
    float reach = smoothstep(3.0, 2.2, q2) * smoothstep(0.02, 0.3, q2);
    // Ripples round the rim: RIPPLE_MODES odd modes (3, 5, … 29), each
    // travelling at its own speed and direction, amplitude falling off
    // gently. Low modes stay weak — mode 3 alone draws a rounded triangle,
    // mode 5 a pentagon — so the outline reads as a circle that shivers.
    float th = atan(q.y, q.x);
    float ripple = 0.0;
    float amp = 0.15;
    for (int m = 0; m < RIPPLE_MODES; m++) {
      float fm = float(m);
      float k = 3.0 + 2.0 * fm;
      float dir = mod(fm, 2.0) < 0.5 ? 1.0 : -1.0;
      ripple += amp * sin(k * th + dir * uTime * (2.3 + 0.62 * fm) + phase * (1.0 + 0.37 * fm));
      amp *= 0.88;
    }
    return q / (1.0 + dm.w * ripple * reach);
  }

  void main() {
    vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);

    // Metaball field.
    float field = 0.0;
    vec2 grad = vec2(0.0);
    vec3 sharp = vec3(0.0); float sharpW = 0.0;
    vec3 soft = vec3(0.0);  float softW = 0.0;

    // Bodies: the owner is the ball with the lowest power distance among
    // those that contain p; its neighbours define its contact faces below.
    float powers[N];            // each ball's power at p, reused by the contact pass
    float bestP = 1e20;
    int owner = -1;
    vec2 ownerC = vec2(0.0);
    vec2 ownerL = vec2(0.0); float ownerR = 1.0;

    for (int i = 0; i < N; i++) {
      vec4 b = uBalls[i];
      powers[i] = 1e20;
      if (b.z < 0.5) continue;
      vec2 d = p - b.xy;
      float d2 = dot(d, d) + 1.0;
      float r2 = b.z * b.z;
      float w = r2 / d2;
      field += w;
      grad += -2.0 * r2 * d / (d2 * d2);
      float w2 = w * w;
      float dom = w2 * w2;
      sharp += uColors[i] * dom; sharpW += dom;
      soft += uColors[i] * w;    softW += w;

      vec2 l = deform(d / b.z, uDeform[i], float(i) * 2.39);
      float pw = (dot(l, l) - 1.0) * r2;
      powers[i] = pw;
      if (pw < bestP) {
        bestP = pw; ownerC = b.xy;
        if (pw < 0.0) { owner = i; ownerL = l; ownerR = b.z; }
      }
    }

    vec3 sharpCol = sharpW > 0.0 ? sharp / sharpW : vec3(0.0);
    vec3 softCol = softW > 0.0 ? soft / softW : vec3(0.0);

    vec3 flow = flowAt(p);

    // ── bodies: oil drops ───────────────────────────────────────────────
    float bodyIn = 0.0;
    vec3 bodyCol = vec3(0.0);
    vec4 label = vec4(0.0);
    vec3 labelA = vec3(0.0);  // label coverage per channel — the colour split
    // Two lights on the viewer's side, like a two-lamp camera rig: the key
    // at top-left, a slightly weaker one at bottom-right (screen y grows down).
    vec3 L1 = normalize(vec3(-0.5, -0.55, 0.68));
    vec3 L2 = normalize(vec3(0.5, 0.55, 0.68));
    if (owner >= 0) {
      // Edge distance (px) and its inward gradient, from every wall of the
      // drop: its own rim, its contact face with each neighbour, the stage
      // walls — all blended by smooth-min, so where faces meet there is a
      // rounded shoulder, never a point. (Taking only the nearest neighbour
      // left a crease wherever the nearest one changed.)
      vec2 toward = p - ownerC;
      float e = (1.0 - length(ownerL)) * ownerR;
      vec2 g = -normalize(toward + 1e-5);
      // Rounding radius where a face meets the rim. Smooth-min erodes the
      // shape by up to k/4 where two edges coincide — and where two drops
      // touch, the rim and the contact face coincide — so a large k reads as
      // a gap between touching drops. Kept small; the all-neighbour blend
      // below is what removes the creases, not the size of k.
      float k = ownerR * 0.12;
      for (int j = 0; j < N; j++) {
        if (j == owner) continue;
        vec4 bj = uBalls[j];
        if (bj.z < 0.5) continue;
        float pj = powers[j];
        float span = length(ownerC - bj.xy);
        if (span < 0.5) continue;
        float face = (pj - bestP) / (2.0 * span) - 0.35;
        // Faces far beyond the rounding radius cannot change the edge.
        if (face > e + k) continue;
        smin(e, g, face, (ownerC - bj.xy) / span, k);
      }
      smin(e, g, p.x - uArea.x, vec2(1.0, 0.0), k);
      smin(e, g, uArea.z - p.x, vec2(-1.0, 0.0), k);
      smin(e, g, p.y - uArea.y, vec2(0.0, 1.0), k);
      smin(e, g, uArea.w - p.y, vec2(0.0, -1.0), k);
      bodyIn = smoothstep(0.0, 1.5, e);

      // Dome profile: a quarter circle over the outer part of the drop.
      float u = clamp(e / (ownerR * 0.9), 0.0, 1.0);
      float thick = sqrt(max(1.0 - (1.0 - u) * (1.0 - u), 0.0));
      float slope = min((1.0 - u) / max(thick, 0.08), 7.0);
      vec3 n = normalize(vec3(-g * slope, 1.0));

      vec3 base = uColors[owner];
      vec3 R1 = reflect(-L1, n);
      vec3 R2 = reflect(-L2, n);
      // A small, soft glint — not a hot spot.
      float spec = pow(max(R1.z, 0.0), 160.0) * 0.5 + pow(max(R1.z, 0.0), 16.0) * 0.035
                 + (pow(max(R2.z, 0.0), 160.0) * 0.5 + pow(max(R2.z, 0.0), 16.0) * 0.035) * 0.75;
      float fres = pow(1.0 - n.z, 2.5);

      // Refraction: the lens bends hardest at the rim, where the surface is
      // steepest, and each wavelength bends a little less than the last —
      // so the backdrop is sampled once per channel (chromatic aberration).
      vec2 bend = n.xy * ownerR * (0.35 + 1.1 * fres);
      vec3 seen = vec3(backdrop(p + bend * 1.12).r, backdrop(p + bend * 0.86).g, backdrop(p + bend * 0.6).b) + flow * 0.8;
      // Translucent oil at full saturation: the hue itself is untouched, only
      // how much of it covers what lies behind. Thin at the rim (mostly the
      // bent backdrop), never more than DROP_OPACITY at the thickest point.
      float body = smoothstep(0.0, 0.45, thick);
      vec3 tint = base * (0.35 + 0.65 * thick);
      // Rims keep most of their colour, so touching drops read as touching.
      float cover = DROP_OPACITY * mix(0.7, 1.0, body);
      bodyCol = mix(seen * 1.25, tint, cover);

      // Light gathered by the lens collects opposite each lamp — two
      // crescents facing each other; their edges split into colour like any
      // lens caustic.
      float r = length(ownerL);
      vec2 dir = ownerL / max(r, 1e-3);
      float away = max(smoothstep(0.2, 1.0, dot(dir, -normalize(L1.xy))),
                       0.75 * smoothstep(0.2, 1.0, dot(dir, -normalize(L2.xy))));
      vec3 rr = vec3(r * 1.1, r, r * 0.9);
      vec3 caustic = away * smoothstep(vec3(0.3), vec3(0.72), rr) * (1.0 - smoothstep(vec3(0.8), vec3(0.98), rr));
      bodyCol += base * caustic.g * 0.85 + caustic * 0.16;

      // Rim: darker, with an oily thin-film sheen, then a hairline of light
      // whose channels sit a pixel apart — the fringe a real lens edge shows.
      bodyCol *= 1.0 - 0.3 * fres;
      vec3 film = 0.5 + 0.5 * cos(6.2831 * (vec3(0.0, 0.33, 0.67) + fres * 1.4 + dot(ownerL, vec2(0.35, 0.55)) + uTime * 0.05));
      bodyCol += film * fres * 0.32;
      // Each channel's hairline sits ~3px from the next: a clear red / blue fringe.
      vec3 ee = vec3(e - 3.0, e, e + 3.0);
      bodyCol += 0.5 * smoothstep(vec3(0.0), vec3(1.4), ee) * (1.0 - smoothstep(vec3(1.4), vec3(3.6), ee));
      // Red spills just outside the rim's light, blue just inside it.
      bodyCol += vec3(0.22, 0.0, 0.0) * (1.0 - smoothstep(0.0, 5.0, e)) + vec3(0.0, 0.02, 0.24) * smoothstep(3.0, 7.0, e) * (1.0 - smoothstep(7.0, 12.0, e)) * fres * 2.0;
      bodyCol += vec3(spec);

      // The label sits inside the drop, nudged by the same refraction, and
      // splits into colour toward the rim where the lens is strongest.
      float c = cos(uBalls[owner].w), sn = sin(uBalls[owner].w);
      vec2 tl = mat2(c, -sn, sn, c) * (ownerL + n.xy * 0.06);
      float t2 = dot(tl, tl);
      if (t2 < 0.9) {
        vec2 uv = tl * (1.0 + 0.22 * t2) * 0.5 + 0.5;
        vec2 split = normalize(tl + 1e-5) * (0.009 + 0.045 * t2);
        float row = float(owner);
        vec4 g = texture2D(uAtlas, vec2(uv.x, 1.0 - (row + uv.y) / float(N)));
        vec2 uvR = uv + split, uvB = uv - split;
        float aR = texture2D(uAtlas, vec2(uvR.x, 1.0 - (row + clamp(uvR.y, 0.0, 1.0)) / float(N))).a;
        float aB = texture2D(uAtlas, vec2(uvB.x, 1.0 - (row + clamp(uvB.y, 0.0, 1.0)) / float(N))).a;
        label = vec4(g.rgb, g.a);
        labelA = vec3(aR, g.a, aB) * 0.92;
      }
    }

    // ── metaball ────────────────────────────────────────────────────────
    float marble = 0.5 + 0.5 * sin(dot(p, vec2(0.011, 0.017)) + field * 2.6 + uTime * 2.4
                                 + 3.0 * sin(p.y * 0.006 - uTime * 1.3));
    float melt = clamp(uMix * (0.55 + 0.9 * marble * (1.0 - uMix)), 0.0, 1.0);
    vec3 base = mix(sharpCol, softCol, melt);

    float h = clamp((field - 1.0) / 1.6, 0.0, 1.0);
    vec3 n = normalize(vec3(-grad * uScale * 0.55, 0.3 + h));
    float diffuse = max(dot(n, L1), 0.0) * 0.6 + max(dot(n, L2), 0.0) * 0.45;
    float spec = pow(max(reflect(-L1, n).z, 0.0), 48.0) + pow(max(reflect(-L2, n).z, 0.0), 48.0) * 0.75;
    float rimLight = pow(1.0 - n.z, 2.2);
    vec3 metaCol = base * (0.42 + 0.7 * diffuse) + vec3(spec) * 0.55 + base * rimLight * 0.5;
    float aa = max(fwidth(field), 1e-4);
    float metaIn = smoothstep(1.0 - aa, 1.0 + aa, field);

    // ── blend ───────────────────────────────────────────────────────────
    vec3 surface = mix(bodyCol, metaCol, uMerge);
    float inside = mix(bodyIn, metaIn, uMerge);
    surface = mix(surface, label.rgb, clamp(labelA, 0.0, 1.0) * uText * (1.0 - uMerge));

    float pulse = 0.85 + 0.15 * sin(uTime * 9.0);
    surface += base * uGlow * (0.9 + 0.8 * h) * pulse;
    surface = mix(surface, vec3(1.0), uGlow * smoothstep(1.6, 6.0, field) * 0.75);

    vec3 bg = backdrop(p) + flow + softCol * min(field, 1.0) * 0.12;

    vec2 fromCenter = p - uCenter;
    float ang = atan(fromCenter.y, fromCenter.x);
    float rays = pow(abs(sin(ang * 6.0 + uTime * 0.8)), 10.0) + pow(abs(sin(ang * 11.0 - uTime * 1.3)), 16.0) * 0.6;
    float reach = min(field, 1.0);
    bg += softCol * uGlow * (pow(reach, 1.6) * 1.4 + rays * pow(reach, 0.9) * 0.7) * pulse;

    vec3 color = mix(bg, surface, inside);

    // The whole screen lights up: a wash of the mixed colour radiating from
    // the centre, slow rays sweeping across it, white rising at the peak.
    vec2 fromMid = (p - uRes * 0.5) / max(uRes.x, uRes.y);
    float wash = 1.0 - smoothstep(0.0, 0.85, length(fromMid)) * 0.55;
    float sweep = pow(abs(sin(atan(fromMid.y, fromMid.x) * 5.0 + uTime * 0.6)), 6.0);
    color += uAvg * uGlow * (wash * 1.3 + sweep * 0.35) * pulse;
    color += vec3(1.0) * pow(uGlow, 3.0) * 0.55;

    // ── 샤카 샤카 ───────────────────────────────────────────────────────
    // The two words hop in turn like a chant, ripple, split into colour and
    // glow with the drops' mixed light; a hard shake jolts the whole line.
    if (uShaka > 0.001) {
      float unit = uRes.x / 400.0;
      vec2 d = p - uRes * vec2(0.5, 0.36);
      d += vec2(sin(uTime * 53.0), cos(uTime * 47.0)) * uKick * 9.0 * unit;
      float tilt = -0.07 + 0.05 * sin(uTime * 6.0) + uKick * 0.06 * sin(uTime * 31.0);
      d = mat2(cos(tilt), sin(tilt), -sin(tilt), cos(tilt)) * d;
      float boxW = min(uRes.x * 0.9, 560.0 * unit);
      vec2 uv = d / vec2(boxW, boxW / uShakaAspect) + 0.5;

      float beat = uTime * 8.5;
      float left = step(uv.x, 0.5);
      float hop = mix(pow(abs(sin(beat + 1.5708)), 3.0), pow(abs(sin(beat)), 3.0), left);
      vec2 wc = vec2(mix(0.7, 0.3, left), 0.5);             // this word's centre
      uv = (uv - wc) / (1.0 + 0.16 * hop) + wc;              // pop on its beat
      uv.y += 0.12 * hop;                                    // and jump
      uv.x += sin(uv.y * 11.0 + uTime * 17.0) * (0.008 + 0.012 * uKick);
      uv.y += sin(uv.x * 23.0 - uTime * 13.0) * 0.02;

      // Chromatic aberration: red and blue pulled apart on a diagonal, wider
      // on each hop and with every shake.
      float split = 0.006 + 0.014 * uKick + 0.005 * hop;
      vec2 ca = vec2(split, split * uShakaAspect * 0.35);
      float aG = texture2D(uShakaTex, uv).a;
      float aR = texture2D(uShakaTex, uv + ca).a;
      float aB = texture2D(uShakaTex, uv - ca).a;
      // Halo: a ring of eight taps averaged — a soft rim, not offset copies.
      float halo = 0.0;
      for (int k = 0; k < 8; k++) {
        float an = float(k) * 0.7854;
        halo += texture2D(uShakaTex, uv + vec2(cos(an) * 0.011, sin(an) * 0.036)).a;
      }
      halo = clamp(halo / 8.0 * 1.6, 0.0, 1.0);

      vec3 sweep = 0.5 + 0.5 * cos(6.2831 * (vec3(0.0, 0.33, 0.67) + uv.x * 0.9 - uTime * 0.7));
      vec3 ink = mix(sweep, vec3(1.0), 0.55) * 1.1;
      // A dark rim for legibility over the bright blob, then the coloured glow.
      color = mix(color, color * 0.35, halo * 0.7 * uShaka);
      color += (uAvg * 1.2 + 0.1) * halo * 0.45 * uShaka;
      color = mix(color, ink, clamp(vec3(aR, aG, aB), 0.0, 1.0) * uShaka);
    }

    color = mix(color, vec3(1.0), uFlash);
    gl_FragColor = vec4(color, 1.0);
  }
`
}
