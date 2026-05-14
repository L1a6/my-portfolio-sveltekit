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

  const markers = [
    { location: [6.52,    3.38]  as [number, number], size: 0.025 }, // Lagos
    { location: [51.51,  -0.13]  as [number, number], size: 0.025 }, // London
    { location: [40.71, -74.01]  as [number, number], size: 0.025 }, // New York
    { location: [35.68, 139.65]  as [number, number], size: 0.025 }, // Tokyo
    { location: [-33.87, 151.21] as [number, number], size: 0.025 }, // Sydney
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

    function getConfig(isDark: boolean) {
      return isDark
        ? {
            dark          : 1,
            diffuse       : 1.5,
            mapBrightness : 10,
            baseColor     : [0.08, 0.08, 0.08] as [number, number, number],
            markerColor   : [0.2,  0.8,  0.9]  as [number, number, number],
            glowColor     : [0.05, 0.05, 0.05] as [number, number, number],
          }
        : {
            dark          : 0,
            diffuse       : 2.0,
            mapBrightness : 5,
            baseColor     : [0.95, 0.95, 0.95] as [number, number, number],
            markerColor   : [0.2,  0.8,  0.9]  as [number, number, number],
            glowColor     : [0.95, 0.95, 0.95] as [number, number, number],
          };
    }

    function createGlobeInstance() {
      if (rafId) cancelAnimationFrame(rafId);
      if (globe) { globe.destroy(); globe = null; }
      if (canvasEl) canvasEl.style.opacity = '0';

      import('cobe').then(({ default: createGlobe }) => {
        if (!canvasEl) return;

        const width  = canvasEl.offsetWidth || 400;
        const isDark = document.documentElement.classList.contains('dark');

        globe = createGlobe(canvasEl, {
          devicePixelRatio : Math.min(window.devicePixelRatio || 1, 2),
          width,
          height           : width,
          phi              : 0,
          theta            : 0.2,
          mapSamples       : 16000,
          opacity          : 0.7,
          markers,
          ...getConfig(isDark),
        });

        function animate() {
          if (!isPaused) phi += SPEED;
          globe.update({
            phi  : phi + phiOffset + dragPhi,
            theta: 0.2 + thetaOffset + dragTheta,
          });
          rafId = requestAnimationFrame(animate);
        }
        animate();

        setTimeout(() => {
          if (canvasEl) canvasEl.style.opacity = '1';
        });
      });
    }

    if (canvasEl?.offsetWidth > 0) {
      createGlobeInstance();
    } else {
      const ro = new ResizeObserver(entries => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          createGlobeInstance();
        }
      });
      ro.observe(canvasEl);
    }

    // Re-init on theme toggle
    const mo = new MutationObserver(() => createGlobeInstance());
    mo.observe(document.documentElement, {
      attributes     : true,
      attributeFilter: ['class'],
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      globe?.destroy();
      mo.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup',   onPointerUp);
    };
  });
</script>

<!-- Clean. Just the canvas. Native COBE dots only. -->
<div class="relative aspect-square select-none">
  <canvas
    bind:this={canvasEl}
    onpointerdown={onPointerDown}
    style="width:100%; height:100%; cursor:grab; opacity:0;
           transition:opacity 1.2s ease; border-radius:50%;
           touch-action:none;"
  />
</div>
