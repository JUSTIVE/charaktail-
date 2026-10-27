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
 *                       backdrop, focuses light opposite the lamp and shows a
 *                       thin-film sheen at its rim. Each drop also carries a
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
 */

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

  uniform vec4 uBalls[N];      // x, y (device px, y down), radius, angle
  uniform vec4 uDeform[N];     // squash axis x, y, squash amount, —
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
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  /* Night sky with a faint dot grid — also what a drop refracts. */
  vec3 backdrop(vec2 p) {
    vec2 uv = vec2(p.x / uRes.x, 1.0 - p.y / uRes.y);
    vec3 bg = mix(vec3(0.035, 0.03, 0.07), vec3(0.075, 0.055, 0.13), uv.y);
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
  vec2 deform(vec2 l, vec4 dm) {
    vec2 axis = dm.xy;
    float along = dot(l, axis);
    vec2 across = l - axis * along;
    return axis * (along / (1.0 - dm.z)) + across / (1.0 + 0.6 * dm.z);
  }

  void main() {
    vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);

    // Metaball field.
    float field = 0.0;
    vec2 grad = vec2(0.0);
    vec3 sharp = vec3(0.0); float sharpW = 0.0;
    vec3 soft = vec3(0.0);  float softW = 0.0;

    // Bodies: the owner is the ball with the lowest power distance among
    // those that contain p; the runner-up defines the contact face.
    float bestP = 1e20; float secondP = 1e20;
    int owner = -1;
    vec2 ownerC = vec2(0.0); vec2 secondC = vec2(0.0);
    vec2 ownerL = vec2(0.0); float ownerR = 1.0;

    for (int i = 0; i < N; i++) {
      vec4 b = uBalls[i];
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

      vec2 l = deform(d / b.z, uDeform[i]);
      float pw = (dot(l, l) - 1.0) * r2;
      if (pw < bestP) {
        secondP = bestP; secondC = ownerC;
        bestP = pw; ownerC = b.xy;
        if (pw < 0.0) { owner = i; ownerL = l; ownerR = b.z; }
      } else if (pw < secondP) {
        secondP = pw; secondC = b.xy;
      }
    }

    vec3 sharpCol = sharpW > 0.0 ? sharp / sharpW : vec3(0.0);
    vec3 softCol = softW > 0.0 ? soft / softW : vec3(0.0);

    // ── bodies: oil drops ───────────────────────────────────────────────
    float bodyIn = 0.0;
    vec3 bodyCol = vec3(0.0);
    vec4 label = vec4(0.0);
    vec3 L = normalize(vec3(-0.45, -0.65, 0.75));
    if (owner >= 0) {
      // Edge distance (px) and its inward gradient, from three walls of the
      // drop: its own rim, the contact face with the runner-up, the stage walls.
      vec2 toward = p - ownerC;
      float e = (1.0 - length(ownerL)) * ownerR;
      vec2 g = -normalize(toward + 1e-5);
      float k = ownerR * 0.22;
      float span = length(ownerC - secondC);
      if (secondP < 1e19 && span > 0.5) smin(e, g, (secondP - bestP) / (2.0 * span) - 2.0, (ownerC - secondC) / span, k);
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
      vec3 Rf = reflect(-L, n);
      float spec = pow(max(Rf.z, 0.0), 160.0) * 1.5 + pow(max(Rf.z, 0.0), 16.0) * 0.1;
      float fres = pow(1.0 - n.z, 2.5);

      // Translucent body: the backdrop bent through the lens, stained by the oil.
      vec3 seen = backdrop(p + n.xy * ownerR * 0.5);
      bodyCol = seen * 0.6 + base * (0.22 + 0.78 * thick) * 0.92;

      // Light gathered by the lens, on the side away from the lamp.
      float r = length(ownerL);
      float away = dot(ownerL / max(r, 1e-3), -normalize(L.xy));
      float caustic = smoothstep(0.2, 1.0, away) * smoothstep(0.3, 0.72, r) * (1.0 - smoothstep(0.8, 0.98, r));
      bodyCol += base * caustic * 0.85 + vec3(0.12) * caustic;

      // Rim: darker, with an oily thin-film sheen, then a hairline of light.
      bodyCol *= 1.0 - 0.3 * fres;
      vec3 film = 0.5 + 0.5 * cos(6.2831 * (vec3(0.0, 0.33, 0.67) + fres * 1.4 + dot(ownerL, vec2(0.35, 0.55)) + uTime * 0.05));
      bodyCol += film * fres * 0.32;
      bodyCol += vec3(0.35) * smoothstep(0.0, 1.2, e) * (1.0 - smoothstep(1.2, 3.2, e));
      bodyCol += vec3(spec);

      // The label sits inside the drop, nudged by the same refraction.
      float c = cos(uBalls[owner].w), sn = sin(uBalls[owner].w);
      vec2 tl = mat2(c, -sn, sn, c) * (ownerL + n.xy * 0.06);
      if (dot(tl, tl) < 0.9) {
        vec2 uv = tl * (1.0 + 0.22 * dot(tl, tl)) * 0.5 + 0.5;
        label = texture2D(uAtlas, vec2(uv.x, 1.0 - (float(owner) + uv.y) / float(N)));
        label.a *= 0.92;
      }
    }

    // ── metaball ────────────────────────────────────────────────────────
    float marble = 0.5 + 0.5 * sin(dot(p, vec2(0.011, 0.017)) + field * 2.6 + uTime * 2.4
                                 + 3.0 * sin(p.y * 0.006 - uTime * 1.3));
    float melt = clamp(uMix * (0.55 + 0.9 * marble * (1.0 - uMix)), 0.0, 1.0);
    vec3 base = mix(sharpCol, softCol, melt);

    float h = clamp((field - 1.0) / 1.6, 0.0, 1.0);
    vec3 n = normalize(vec3(-grad * uScale * 0.55, 0.3 + h));
    float diffuse = max(dot(n, L), 0.0);
    float spec = pow(max(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0), 48.0);
    float rimLight = pow(1.0 - n.z, 2.2);
    vec3 metaCol = base * (0.42 + 0.7 * diffuse) + vec3(spec) * 0.55 + base * rimLight * 0.5;
    float aa = max(fwidth(field), 1e-4);
    float metaIn = smoothstep(1.0 - aa, 1.0 + aa, field);

    // ── blend ───────────────────────────────────────────────────────────
    vec3 surface = mix(bodyCol, metaCol, uMerge);
    float inside = mix(bodyIn, metaIn, uMerge);
    surface = mix(surface, label.rgb, clamp(label.a, 0.0, 1.0) * uText * (1.0 - uMerge));

    float pulse = 0.85 + 0.15 * sin(uTime * 9.0);
    surface += base * uGlow * (0.9 + 0.8 * h) * pulse;
    surface = mix(surface, vec3(1.0), uGlow * smoothstep(1.6, 6.0, field) * 0.75);

    vec3 bg = backdrop(p) + softCol * min(field, 1.0) * 0.12;

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

    color = mix(color, vec3(1.0), uFlash);
    gl_FragColor = vec4(color, 1.0);
  }
`
}
