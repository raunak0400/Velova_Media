/**
 * GLSL source for the fluid background, kept as plain string exports since
 * next.config.ts has no shader loader configured. One fragment program
 * only — `u_quality` branches the warp-layer count at runtime instead of
 * compiling a second variant, so there's exactly one program to compile
 * and recover from context loss.
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
uniform vec2 u_mouse;
uniform vec2 u_mouseVelocity;
uniform float u_mouseInfluence;
uniform float u_quality;
uniform vec3 u_paletteA;
uniform vec3 u_paletteB;
uniform vec3 u_paletteC;
uniform vec3 u_paletteD;
uniform vec3 u_paletteE;

out vec4 outColor;

// Ashima-style 2D simplex noise — ALU-only, no texture lookups, standard
// choice for organic non-repeating fields at low octave counts.
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float simplexNoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Inigo Quilez-style fbm domain warp: sample a field to get a warp vector,
// use it to displace the position for the next field. Two layers at full
// quality, one at reduced quality (u_quality < 0.5) — same program either
// way, just fewer samples.
float warpedField(vec2 p, float t) {
  vec2 q = vec2(
    simplexNoise(p + vec2(0.0, 0.0) + t * 0.02),
    simplexNoise(p + vec2(5.2, 1.3) - t * 0.017)
  );

  vec2 r = p + 1.6 * q;
  if (u_quality > 0.5) {
    r += 0.8 * vec2(
      simplexNoise(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.013),
      simplexNoise(p + 4.0 * q + vec2(8.3, 2.8) - t * 0.011)
    );
  }

  return simplexNoise(r + t * 0.008);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 aspectUv = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 p = aspectUv * 1.4 + u_seed;

  // Mouse: large-radius, low-amplitude additive offset with smoothstep
  // falloff so it reads as broad ambient disturbance, not a spotlight.
  // u_mouseInfluence decays exponentially with idle time (set on the CPU
  // side) so the field keeps drifting from time alone once the cursor
  // stops moving.
  vec2 mouseUv = u_mouse / u_resolution;
  vec2 mouseAspectUv = (mouseUv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
  float mouseDist = distance(aspectUv, mouseAspectUv);
  float mouseFalloff = 1.0 - smoothstep(0.0, 0.9, mouseDist);
  vec2 mouseOffset = u_mouseVelocity * 0.0006 * mouseFalloff * u_mouseInfluence;

  float field = warpedField(p + mouseOffset, u_time);
  float field2 = warpedField(p * 1.3 - u_seed * 0.5 + mouseOffset * 0.6, u_time * 0.8 + 31.4);

  float t1 = smoothstep(-1.0, 1.0, field);
  float t2 = smoothstep(-1.0, 1.0, field2);

  vec3 color = mix(u_paletteA, u_paletteB, t1);
  color = mix(color, u_paletteC, t2 * 0.7);
  color = mix(color, u_paletteD, smoothstep(0.55, 1.0, t1) * 0.6);
  color = mix(color, u_paletteE, smoothstep(0.6, 1.0, t2) * 0.4);

  outColor = vec4(color, 0.55);
}
`;
