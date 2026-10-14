/**
 * GLSL source for the fluid background, kept as plain string exports since
 * next.config.ts has no shader loader configured. One fragment program
 * only — `u_quality` branches the warp-layer count at runtime instead of
 * compiling a second variant, so there's exactly one program to compile
 * and recover from context loss.
 *
 * The color/noise technique here is a direct single-pass port of
 * kota.co.uk's own hero background (reverse-engineered from its public
 * Next.js build output: a classic-Perlin noise field cycling through a
 * fixed color array, shaped by a sin-power vignette, inside one rotated/
 * scaled plane — see data-background="4" in its markup). Their version
 * runs this per-pixel color math inside a full Three.js scene (camera,
 * plane mesh, post-process composer); this reproduces the same math
 * directly in screen-space UV, without pulling in Three.js.
 */

export const VERTEX_SRC = `#version 300 es
// Single fullscreen triangle (3 verts, no vertex buffer attributes needed
// beyond position) — cheaper than a quad + index buffer for one draw call.
const vec2 POSITIONS[3] = vec2[3](
  vec2(-1.0, -1.0),
  vec2(3.0, -1.0),
  vec2(-1.0, 3.0)
);

void main() {
  gl_Position = vec4(POSITIONS[gl_VertexID], 0.0, 1.0);
}
`;

export const FRAGMENT_SRC = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_seed;
uniform vec2 u_mouseVelocity;
uniform float u_mouseInfluence;
uniform float u_quality;
uniform vec3 u_palette[6];

out vec4 outColor;

// Classic Perlin 2D noise (Stefan Gustavson) — ported verbatim from
// kota.co.uk's own compiled shader source.
vec2 fade(vec2 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }
vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

void main() {
  // gl_FragCoord is in *framebuffer* (window) coordinates, not viewport-local
  // ones — each shared-atlas slot sits at a different x-offset in the same
  // framebuffer, so a raw gl_FragCoord.x / u_resolution.x divide only ever
  // lands in [0,1] for slot 0. Every slot is exactly u_resolution.x wide, so
  // mod() re-localizes x into the current tile regardless of its offset.
  vec2 localCoord = vec2(mod(gl_FragCoord.x, u_resolution.x), gl_FragCoord.y);
  vec2 uv = localCoord / u_resolution;

  // kota's post-process "liquid" distortion, folded directly into the UV
  // (their version runs this as a second composer pass over a render
  // target; a single-pass field doesn't need the extra texture/pass).
  vec2 p = 2.0 * uv - 1.0;
  float rnd = fract(sin(u_seed.x) * 43758.5453);
  p += 0.22 * rnd * cos(2.0 * p.yx + u_time * 0.18 + u_seed.y);
  p += 0.14 * rnd * cos(3.3 * p.xy + u_time * 0.24 - u_seed.x);
  vec2 warpedUv = p * 0.5 + 0.5;
  warpedUv += u_mouseVelocity * 0.0006 * u_mouseInfluence;

  // kota's actual hero accent isn't a radial blob — it's a soft, roughly
  // constant-width diagonal RIBBON crossing the frame, with a fixed color
  // cross-section (cream edge → cyan → deep purple → saturated magenta
  // core) rather than colors cycling over time. Model it directly as
  // distance from a line (band), not a vignette around a point.
  float angle = 1.15; // ribbon's lengthwise direction, radians from +x axis
  vec2 dir = vec2(cos(angle), sin(angle));
  vec2 normal = vec2(-dir.y, dir.x);

  vec2 centered = warpedUv - vec2(0.62, 0.78);
  float distAcross = dot(centered, normal);
  float along = dot(centered, dir);

  // Gentle organic wobble of the band's width/centerline along its length,
  // plus a slow drift so it doesn't read as a static, mathematically-perfect
  // stripe.
  distAcross += 0.05 * cnoise(vec2(along * 2.0 + u_seed.x, u_time * 0.04 + u_seed.y));

  float halfWidth = mix(0.16, 0.2, u_quality);
  float band = distAcross / halfWidth;
  float absBand = abs(band);

  // Cross-section: magenta core fading outward through purple, cyan, then
  // a faint cream edge before dropping to fully transparent.
  vec3 color = u_palette[4];
  color = mix(color, u_palette[2], smoothstep(0.0, 0.55, absBand));
  color = mix(color, u_palette[1], smoothstep(0.45, 0.85, absBand));
  color = mix(color, u_palette[0], smoothstep(0.75, 1.05, absBand));

  float alpha = 0.92 * (1.0 - smoothstep(0.7, 1.35, absBand));

  // This canvas spans Hero + WhyVelova as one continuous backdrop (see
  // page.tsx), but the glow itself should read as the hero's own accent —
  // a hard-ish floor fade (independent of the shape's own soft vignette)
  // keeps it from washing out the WhyVelova card row underneath, regardless
  // of how far the shape's falloff would otherwise reach.
  float sectionFade = smoothstep(0.38, 0.62, uv.y);
  alpha *= sectionFade;

  outColor = vec4(color, clamp(alpha, 0.0, 0.95));
}
`;
