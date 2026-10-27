/*
 * The metaball shader. One full-screen pass: every pixel sums each ball's
 * r²/d² field, and the iso-surface at 1.0 is the blob. Ball count is a
 * compile-time constant, so the material is rebuilt when the selection
 * changes — cheap, and it keeps the loop bounded for every GPU.
 *
 * Five uniforms drive the whole show:
 *   uText  — label texture on each ball (1) → plain colour (0)
 *   uMix   — each ball keeps its colour (0) → marbled, then blended (1)
 *   uGlow  — lit glossy surface (0) → emissive core, halo and rays (1)
 *   uFlash — white-out at the moment of the reveal
 *   uTime  — seconds, for the marbling and the rays
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
  uniform vec3 uColors[N];
  uniform sampler2D uAtlas;    // one label per row, N rows
  uniform vec2 uRes;
  uniform vec2 uCenter;
  uniform float uScale;        // mean radius, for normal strength
  uniform float uText;
  uniform float uMix;
  uniform float uGlow;
  uniform float uFlash;
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  void main() {
    vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);

    float field = 0.0;
    vec2 grad = vec2(0.0);
    vec3 sharp = vec3(0.0); float sharpW = 0.0;
    vec3 soft = vec3(0.0);  float softW = 0.0;
    vec4 label = vec4(0.0);

    for (int i = 0; i < N; i++) {
      vec4 b = uBalls[i];
      if (b.z < 0.5) continue;
      vec2 d = p - b.xy;
      float d2 = dot(d, d) + 1.0;
      float r2 = b.z * b.z;
      float w = r2 / d2;
      field += w;
      grad += -2.0 * r2 * d / (d2 * d2);

      // Dominance: w⁴ keeps each ball's colour to itself until uMix lets go.
      float w2 = w * w;
      float dom = w2 * w2;
      sharp += uColors[i] * dom; sharpW += dom;
      soft += uColors[i] * w;    softW += w;

      // Label: ball-local coords, rotated with the ball, bulged like a sphere.
      vec2 l = d / b.z;
      float c = cos(b.w), s = sin(b.w);
      l = mat2(c, -s, s, c) * l;
      float l2 = dot(l, l);
      if (l2 < 0.9) {
        vec2 uv = l * (1.0 + 0.22 * l2) * 0.5 + 0.5;
        vec4 t = texture2D(uAtlas, vec2(uv.x, 1.0 - (float(i) + uv.y) / float(N)));
        label += t * dom;
      }
    }

    vec3 sharpCol = sharpW > 0.0 ? sharp / sharpW : vec3(0.0);
    vec3 softCol = softW > 0.0 ? soft / softW : vec3(0.0);
    label = sharpW > 0.0 ? label / sharpW : vec4(0.0);

    // Marbling: as uMix rises the colours streak into one another before
    // settling into the blend.
    float marble = 0.5 + 0.5 * sin(dot(p, vec2(0.011, 0.017)) + field * 2.6 + uTime * 2.4
                                 + 3.0 * sin(p.y * 0.006 - uTime * 1.3));
    float melt = clamp(uMix * (0.55 + 0.9 * marble * (1.0 - uMix)), 0.0, 1.0);
    vec3 base = mix(sharpCol, softCol, melt);

    // Surface: the field's gradient is the slope; flat on top, steep at edges.
    float h = clamp((field - 1.0) / 1.6, 0.0, 1.0);
    vec3 n = normalize(vec3(-grad * uScale * 0.55, 0.3 + h));
    vec3 L = normalize(vec3(-0.45, -0.65, 0.75));
    float diffuse = max(dot(n, L), 0.0);
    float spec = pow(max(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0), 48.0);
    float rim = pow(1.0 - n.z, 2.2);
    vec3 surface = base * (0.42 + 0.7 * diffuse) + vec3(spec) * 0.55 + base * rim * 0.5;

    surface = mix(surface, label.rgb, clamp(label.a, 0.0, 1.0) * uText);

    // Glow: the blob lights from inside, then its centre burns white.
    float pulse = 0.85 + 0.15 * sin(uTime * 9.0);
    surface += base * uGlow * (0.9 + 0.8 * h) * pulse;
    surface = mix(surface, vec3(1.0), uGlow * smoothstep(1.6, 6.0, field) * 0.75);

    // Background: night, with a little light spilled from the balls.
    vec3 bg = mix(vec3(0.035, 0.03, 0.07), vec3(0.075, 0.055, 0.13), vUv.y);
    vec2 cell = fract(p / 22.0) - 0.5;
    bg += vec3(0.05) * smoothstep(0.09, 0.0, length(cell)) * (0.4 + 0.6 * hash(floor(p / 22.0)));
    bg += softCol * min(field, 1.0) * 0.12;
    vec2 v = vUv - 0.5;
    bg *= 1.0 - dot(v, v) * 0.9;

    // Halo and rays only exist while glowing.
    vec2 fromCenter = p - uCenter;
    float ang = atan(fromCenter.y, fromCenter.x);
    float rays = pow(abs(sin(ang * 6.0 + uTime * 0.8)), 10.0) + pow(abs(sin(ang * 11.0 - uTime * 1.3)), 16.0) * 0.6;
    float reach = min(field, 1.0);
    bg += softCol * uGlow * (pow(reach, 1.6) * 1.4 + rays * pow(reach, 0.9) * 0.7) * pulse;

    float aa = max(fwidth(field), 1e-4);
    float inside = smoothstep(1.0 - aa, 1.0 + aa, field);
    vec3 color = mix(bg, surface, inside);
    color = mix(color, vec3(1.0), uFlash);

    gl_FragColor = vec4(color, 1.0);
  }
`
}
