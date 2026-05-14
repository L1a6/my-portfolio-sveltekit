<script lang="ts">
  import { onMount } from 'svelte';

  let canvasEl: HTMLCanvasElement;

  let pointerStart: { x: number; y: number } | null = null;
  let dragPhi   = 0;
  let dragTheta = 0;
  let phiOffset   = 0;
  let thetaOffset = 0;
  let isPaused = false;

  const SPEED = 0.003;

  const markers: { location: [number, number]; size: number }[] = [
    { location: [6.52,    3.38],  size: 0.04 }, // Lagos
    { location: [51.51,  -0.13],  size: 0.03 }, // London
    { location: [40.71, -74.01],  size: 0.03 }, // New York
    { location: [35.68, 139.65],  size: 0.03 }, // Tokyo
    { location: [-33.87, 151.21], size: 0.03 }, // Sydney
  ];

  function onPointerDown(e: PointerEvent) {
    pointerStart = { x: e.clientX, y: e.clientY };
    if (canvasEl) canvasEl.style.cursor = 'grabbing';
    isPaused = true;
  }
  function onPointerMove(e: PointerEvent) {
    if (!pointerStart) return;
    dragPhi   = (e.clientX - pointerStart.x) / 300;
    dragTheta = (e.clientY - pointerStart.y) / 1000;
  }
  function onPointerUp() {
    if (pointerStart) {
      phiOffset   += dragPhi;
      thetaOffset += dragTheta;
      dragPhi = dragTheta = 0;
    }
    pointerStart = null;
    if (canvasEl) canvasEl.style.cursor = 'grab';
    isPaused = false;
  }

  onMount(() => {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup',   onPointerUp,   { passive: true });

    let globe: any = null;
    let rafId = 0;
    let phi = 0;

    async function init() {
      const { default: createGlobe } = await import('cobe');
      if (!canvasEl || globe) return;

      const width  = canvasEl.offsetWidth || 400;
      const isDark = document.documentElement.classList.contains('dark');

      const cfg = isDark
        ? {
            dark          : 1,
            diffuse       : 1.2,
            mapBrightness : 6,
            baseColor     : [0.08, 0.08, 0.08] as [number, number, number],
            markerColor   : [0.55, 0.55, 0.55] as [number, number, number],
            glowColor     : [0.08, 0.08, 0.08] as [number, number, number],
          }
        : {
            dark          : 0,
            diffuse       : 2.0,
            mapBrightness : 5,
            baseColor     : [0.95, 0.95, 0.95] as [number, number, number],
            markerColor   : [0.60, 0.60, 0.60] as [number, number, number],
            glowColor     : [0.95, 0.95, 0.95] as [number, number, number],
          };

      globe = createGlobe(canvasEl, {
        devicePixelRatio : Math.min(window.devicePixelRatio || 1, 2),
        width,
        height           : width,
        phi              : 0,
        theta            : 0.3,
        mapSamples       : 16000,
        opacity          : 1,
        markers,
        ...cfg,
      });

      function animate() {
        if (!isPaused) phi += SPEED;
        globe.update({
          phi  : phi + phiOffset + dragPhi,
          theta: 0.3 + thetaOffset + dragTheta,
        });
        rafId = requestAnimationFrame(animate);
      }
      animate();

      requestAnimationFrame(() => {
        if (canvasEl) canvasEl.style.opacity = '1';
      });
    }

    if (canvasEl?.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver(entries => {
        if (entries[0]?.contentRect.width > 0) { ro.disconnect(); init(); }
      });
      ro.observe(canvasEl);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      globe?.destroy();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup',   onPointerUp);
    };
  });
</script>

<div class="relative aspect-square w-full select-none">
  <canvas
    bind:this={canvasEl}
    onpointerdown={onPointerDown}
    style="width:100%; height:100%; cursor:grab; opacity:0;
           transition:opacity 1.4s ease; border-radius:50%;
           touch-action:none; display:block;"
  />
</div>