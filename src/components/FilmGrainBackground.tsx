import { useEffect, useRef } from 'react';

const BACKGROUND_SRC = '/images/site-bg.png';

// Tuning for a fine, calm grain.
// - NOISE_INTENSITY: grain strength (0.5 was the heavy first pass).
// - NOISE_SHADOW: 0 keeps the grain stronger in dark areas, 1 flattens it.
// - NOISE_SPEED: how fast the grain evolves (units of noise space per second);
//   the grain morphs smoothly instead of flickering frame to frame.
// - MAX_DPR: grain is drawn per device pixel, so retina screens get finer grain.
const NOISE_INTENSITY = 0.45;
const NOISE_SHADOW = 0.0;
const NOISE_SPEED = 2.50;
// Grain width: 1 = one device pixel per grain, smaller = coarser grain.
const NOISE_SCALE = 0.8;
const NOISE_HEIGHT = 3;
const MAX_FPS = 30;
const MAX_DPR = 2;

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform sampler2D uImage;
uniform vec2 uView;
uniform vec2 uPage;
uniform float uTop;
uniform float uDpr;
uniform float uNoiseHeight;
uniform float uScale;
uniform vec2 uImageSize;
uniform float uTime;
uniform float uNoise;
uniform float uDepth;

// Hash without a visible lattice (Dave Hoskins, hash without sine).
float hash(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}

// Independent zero-mean noise per color channel, with a triangular distribution.
vec3 grainAt(vec2 cell, float frame) {
  return vec3(
    hash(vec3(cell, frame)) + hash(vec3(cell + 17.0, frame + 3.0)),
    hash(vec3(cell + 31.0, frame + 11.0)) + hash(vec3(cell + 53.0, frame + 19.0)),
    hash(vec3(cell + 71.0, frame + 23.0)) + hash(vec3(cell + 97.0, frame + 29.0))
  ) - 1.0;
}

float luma(vec3 c) {
  return dot(c, vec3(0.299, 0.587, 0.114));
}

void main() {
  // Position of this pixel on the whole page (CSS px, y down), so the picture
  // scrolls with the page while the grain stays fixed on the screen.
  vec2 pagePx = vec2(gl_FragCoord.x / uDpr, uView.y - gl_FragCoord.y / uDpr - uTop);

  // Emulate CSS background-size: cover; background-position: center.
  float scale = max(uPage.x / uImageSize.x, uPage.y / uImageSize.y);
  vec2 size = uImageSize * scale;
  vec2 offset = (uPage - size) * 0.5;
  vec2 uv = (pagePx - offset) / size;

  vec3 color = texture2D(uImage, uv).rgb;

  // Cross-fade between two noise frames so the grain drifts instead of flickering.
  vec2 cell = floor(vec2(gl_FragCoord.x * uScale, gl_FragCoord.y / (uNoiseHeight * uDpr)));
  float frame = floor(uTime);
  float w = smoothstep(0.0, 1.0, fract(uTime));
  vec3 grain = (grainAt(cell, frame) * (1.0 - w) + grainAt(cell, frame + 1.0) * w)
              / sqrt((1.0 - w) * (1.0 - w) + w * w);
  vec2 block = floor(cell / 2.0);
  float particleIndex = floor(hash(vec3(block, 41.0)) * 4.0);
  vec2 particleCell = vec2(mod(particleIndex, 2.0), floor(particleIndex / 2.0));
  float occupied = 1.0 - step(0.5, distance(mod(cell, 2.0), particleCell));
  grain *= occupied;

  color *= vec3(1.0) + grain * uNoise * (-1.0 + uDepth + luma(color) * 0.75);

  gl_FragColor = vec4(color, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function FilmGrainBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const uView = uniform('uView');
    const uPage = uniform('uPage');
    const uTop = uniform('uTop');
    const uDpr = uniform('uDpr');
    const uNoiseHeight = uniform('uNoiseHeight');
    const uImageSize = uniform('uImageSize');
    const uTime = uniform('uTime');
    gl.uniform1f(uniform('uNoise'), NOISE_INTENSITY);
    gl.uniform1f(uniform('uDepth'), NOISE_SHADOW);
    gl.uniform1f(uNoiseHeight, NOISE_HEIGHT);
    gl.uniform1f(uniform('uScale'), NOISE_SCALE);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let time = 0;
    let ready = false;
    let dpr = 1;
    let frame = 0;
    let lastDraw = 0;
    let cancelled = false;

    const draw = () => {
      if (!ready) return;
      gl.uniform1f(uTime, time);
      gl.uniform1f(uTop, host.getBoundingClientRect().top);
      gl.uniform2f(uPage, host.clientWidth, host.clientHeight);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const width = Math.max(1, Math.round(window.innerWidth * dpr));
      const height = Math.max(1, Math.round(window.innerHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      gl.uniform2f(uView, window.innerWidth, window.innerHeight);
      gl.uniform1f(uDpr, dpr);
      draw();
    };

    const tick = (now: number) => {
      if (cancelled) return;
      frame = requestAnimationFrame(tick);
      if (now - lastDraw < 1000 / MAX_FPS) return;
      lastDraw = now;
      time = (now / 1000) * NOISE_SPEED;
      draw();
    };

    const image = new Image();
    image.onload = () => {
      if (cancelled) return;
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.uniform2f(uImageSize, image.naturalWidth, image.naturalHeight);
      ready = true;
      resize();
      canvas.style.opacity = '1';
      if (!reducedMotion) frame = requestAnimationFrame(tick);
    };
    image.src = BACKGROUND_SRC;

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', draw, { passive: true });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', draw);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${BACKGROUND_SRC}')` }}
      />
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 h-full w-full opacity-0"
      />
    </div>
  );
}
