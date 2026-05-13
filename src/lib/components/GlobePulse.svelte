<script lang="ts">
  import { onMount } from 'svelte';
  import createGlobe from 'cobe';

  interface PulseMarker {
    id: string;
    location: [number, number];
    delay: number;
  }

  interface Props {
    markers?: PulseMarker[];
    speed?: number;
    class?: string;
  }

  const defaultMarkers: PulseMarker[] = [
    { id: 'pulse-1', location: [51.51, -0.13], delay: 0 },       // London
    { id: 'pulse-2', location: [40.71, -74.01], delay: 0.5 },    // New York
    { id: 'pulse-3', location: [35.68, 139.65], delay: 1 },      // Tokyo
    { id: 'pulse-4', location: [-33.87, 151.21], delay: 1.5 },   // Sydney
    { id: 'pulse-5', location: [5.05, 7.93], delay: 2 },         // Uyo, Nigeria
  ];

  let { markers = defaultMarkers, speed = 0.003, class: className = '' }: Props = $props();

  let canvas: HTMLCanvasElement;
  let pointerInteracting: { x: number; y: number } | null = null;
  let dragOffset = { phi: 0, theta: 0 };
  let phiOffset = 0;
  let thetaOffset = 0;
  let isPaused = false;

  function handlePointerDown(e: PointerEvent) {
    pointerInteracting = { x: e.clientX, y: e.clientY };
    canvas.style.cursor = 'grabbing';
    isPaused = true;
  }

  function handlePointerUp() {
    if (pointerInteracting !== null) {
      phiOffset += dragOffset.phi;
      thetaOffset += dragOffset.theta;
      dragOffset = { phi: 0, theta: 0 };
    }
    pointerInteracting = null;
    if (canvas) canvas.style.cursor = 'grab';
    isPaused = false;
  }

  onMount(() => {
    function handlePointerMove(e: PointerEvent) {
      if (pointerInteracting !== null) {
        dragOffset = {
          phi: (e.clientX - pointerInteracting.x) / 300,
          theta: (e.clientY - pointerInteracting.y) / 1000,
        };
      }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });

    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId: number;
    let phi = 0;

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 1.2,
        theta: 0.2,
        dark: 1,
        diffuse: 1.5,
        mapSamples: 16000,
        mapBrightness: 10,
        baseColor: [0.48, 0.48, 0.48],
        markerColor: [0.2, 0.8, 0.9],
        glowColor: [0.06, 0.06, 0.06],
        markerElevation: 0,
        markers: markers.map((m) => ({ location: m.location, size: 0.026, id: m.id })),
        arcs: [],
        arcColor: [0.3, 0.85, 0.95],
        arcWidth: 0.5,
        arcHeight: 0.25,
        opacity: 0.7,
      });

      function animate() {
        if (!isPaused) phi += speed;
        globe!.update({
          phi: phi + phiOffset + dragOffset.phi,
          theta: 0.2 + thetaOffset + dragOffset.theta,
        });
        animationId = requestAnimationFrame(animate);
      }
      animate();
      setTimeout(() => {
        if (canvas) canvas.style.opacity = '1';
      }, 50);
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      if (animationId) cancelAnimationFrame(animationId);
      if (globe) globe.destroy();
    };
  });
</script>

<div class="relative aspect-square select-none {className}">
  <canvas
    bind:this={canvas}
    onpointerdown={handlePointerDown}
    style="
      width: 100%;
      height: 100%;
      cursor: grab;
      opacity: 0;
      transition: opacity 1.2s ease;
      border-radius: 50%;
      touch-action: none;
    "
  />

  {#each markers as m (m.id)}
    <div
      style="
        position: absolute;
        position-anchor: --cobe-{m.id};
        bottom: anchor(center);
        left: anchor(center);
        translate: -50% 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        opacity: var(--cobe-visible-{m.id}, 0);
        filter: blur(calc((1 - var(--cobe-visible-{m.id}, 0)) * 8px));
        transition: opacity 0.4s, filter 0.4s;
      "
    >
      <span class="pulse-ring" style="animation-delay: {m.delay}s;" />
      <span class="pulse-ring" style="animation-delay: {m.delay + 0.5}s;" />
      <span class="pulse-dot" />
    </div>
  {/each}
</div>

<style>
  @keyframes pulse-expand {
    0%   { transform: scale(0.3); opacity: 0.8; }
    100% { transform: scale(1.5); opacity: 0; }
  }

  .pulse-ring {
    position: absolute;
    inset: 0;
    border: 2px solid #33ccdd;
    border-radius: 50%;
    opacity: 0;
    animation: pulse-expand 2s ease-out infinite;
  }

  .pulse-dot {
    width: 10px;
    height: 10px;
    background: #33ccdd;
    border-radius: 50%;
    box-shadow: 0 0 0 3px #0a0a0a, 0 0 0 5px #33ccdd;
    flex-shrink: 0;
  }
</style>
