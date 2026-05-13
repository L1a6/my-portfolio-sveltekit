<script lang="ts">
  import { onMount } from 'svelte';
  import GlobePulse from '$lib/components/GlobePulse.svelte';
  import { MapPin } from 'lucide-svelte';

  let visible = $state(false);
  let globeVisible = $state(false);

  onMount(() => {
    const textObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) visible = true; },
      { threshold: 0.1 }
    );
    const globeObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) globeVisible = true; },
      { threshold: 0.05 }
    );

    const section = document.getElementById('global-reach-section');
    const globeEl = document.getElementById('globe-container');

    if (section) textObserver.observe(section);
    if (globeEl) globeObserver.observe(globeEl);

    return () => {
      textObserver.disconnect();
      globeObserver.disconnect();
    };
  });

  const locations = [
    { city: 'London',   country: 'UK',        lat: 51.51, lng: -0.13 },
    { city: 'New York', country: 'USA',        lat: 40.71, lng: -74.01 },
    { city: 'Tokyo',    country: 'Japan',      lat: 35.68, lng: 139.65 },
    { city: 'Sydney',   country: 'Australia',  lat: -33.87, lng: 151.21 },
    { city: 'Uyo',      country: 'Nigeria',    lat: 5.05, lng: 7.93 },
  ];

  const stats = [
    { value: '3+',  label: 'Years building' },
    { value: '5+',  label: 'Countries reached' },
    { value: '15+', label: 'Projects shipped' },
    { value: '∞',   label: 'Lines of code' },
  ];
</script>

<section
  id="global-reach-section"
  class="relative py-16 md:py-24 bg-white dark:bg-[#080808] transition-colors duration-500 border-t border-neutral-200/50 dark:border-neutral-800/50 overflow-hidden"
>
  <!-- Subtle grid background -->
  <div class="absolute inset-0 grid-bg opacity-100 pointer-events-none" />

  <!-- Ambient glow — mirrors the one in Hero -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 dark:bg-cyan-500/5 blur-3xl pointer-events-none" />

  <!-- Corner crop marks (desktop) -->
  <div class="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[900px] pointer-events-none">
    <div class="absolute top-8 left-0 w-5 h-px bg-neutral-300 dark:bg-neutral-700" />
    <div class="absolute top-8 left-0 w-px h-5 bg-neutral-300 dark:bg-neutral-700" />
    <div class="absolute top-8 right-0 w-5 h-px bg-neutral-300 dark:bg-neutral-700" />
    <div class="absolute top-8 right-0 w-px h-5 bg-neutral-300 dark:bg-neutral-700" />
    <div class="absolute bottom-8 left-0 w-5 h-px bg-neutral-300 dark:bg-neutral-700" />
    <div class="absolute bottom-8 left-0 w-px h-5 bg-neutral-300 dark:bg-neutral-700 -translate-y-5" />
    <div class="absolute bottom-8 right-0 w-5 h-px bg-neutral-300 dark:bg-neutral-700" />
    <div class="absolute bottom-8 right-0 w-px h-5 bg-neutral-300 dark:bg-neutral-700 -translate-y-5" />
  </div>

  <div class="relative z-10 max-w-3xl mx-auto px-6">

    <!-- Section label -->
    <div
      class="mb-10 md:mb-14 transition-all duration-700"
      class:opacity-0={!visible}
      class:opacity-100={visible}
      class:translate-y-4={!visible}
      class:translate-y-0={visible}
    >
      <div class="flex items-center gap-2">
        <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">06</span>
        <span class="w-6 h-px bg-neutral-300 dark:bg-neutral-700" />
        <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">Global Reach</span>
      </div>
    </div>

    <!-- Main grid: content left + globe right -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">

      <!-- LEFT — Text content -->
      <div class="md:col-span-5 flex flex-col gap-8">

        <!-- Headline -->
        <div
          class="transition-all duration-700"
          class:opacity-0={!visible}
          class:translate-y-6={!visible}
          class:opacity-100={visible}
          class:translate-y-0={visible}
          style="transition-delay: 0.15s"
        >
          <h2 class="font-display text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.15] mb-4">
            Built globally.
            <span class="text-neutral-400 dark:text-neutral-600"> Rooted locally.</span>
          </h2>
          <div class="w-full h-px bg-neutral-200 dark:bg-neutral-800 mb-5" />
          <p class="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
            From Uyo, Nigeria — I design and ship software for clients and teams
            across continents. Distance is irrelevant when the code runs everywhere.
          </p>
        </div>

        <!-- Stats grid -->
        <div
          class="grid grid-cols-2 gap-3 transition-all duration-700"
          class:opacity-0={!visible}
          class:opacity-100={visible}
          style="transition-delay: 0.3s"
        >
          {#each stats as stat, i}
            <div
              class="relative p-4 border border-neutral-200/60 dark:border-neutral-800/60 rounded-xl bg-neutral-50/50 dark:bg-neutral-900/30 backdrop-blur-sm group hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 transition-all"
              class:opacity-0={!visible}
              class:opacity-100={visible}
              style="transition-delay: {0.35 + i * 0.07}s; transition-duration: 600ms"
            >
              <!-- corner crop mark -->
              <div class="absolute top-2 right-2 w-2 h-px bg-neutral-300 dark:bg-neutral-700 group-hover:bg-cyan-400/50 transition-colors" />
              <div class="absolute top-2 right-2 w-px h-2 bg-neutral-300 dark:bg-neutral-700 group-hover:bg-cyan-400/50 transition-colors" />

              <span class="font-display text-2xl md:text-3xl font-black text-neutral-900 dark:text-white block">
                {stat.value}
              </span>
              <span class="font-mono-custom text-[10px] text-neutral-400 dark:text-neutral-600 uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          {/each}
        </div>

        <!-- Location list -->
        <div
          class="space-y-2 transition-all duration-700"
          class:opacity-0={!visible}
          class:opacity-100={visible}
          style="transition-delay: 0.55s"
        >
          <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase block mb-3">
            Active Locations
          </span>
          {#each locations as loc, i}
            <div
              class="flex items-center justify-between py-2 border-b border-neutral-100 dark:border-neutral-800/60 group transition-all duration-300 hover:px-1"
              class:opacity-0={!visible}
              class:opacity-100={visible}
              style="transition-delay: {0.6 + i * 0.06}s; transition-duration: 500ms"
            >
              <div class="flex items-center gap-2">
                <MapPin
                  size={10}
                  class="text-cyan-500 shrink-0 group-hover:scale-110 transition-transform duration-200"
                />
                <span class="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                  {loc.city}
                </span>
              </div>
              <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 uppercase tracking-wider">
                {loc.country}
              </span>
            </div>
          {/each}
        </div>

      </div>

      <!-- RIGHT — Globe -->
      <div
        id="globe-container"
        class="md:col-span-7 flex items-center justify-center transition-all duration-1000"
        class:opacity-0={!globeVisible}
        class:opacity-100={globeVisible}
        class:scale-95={!globeVisible}
        class:scale-100={globeVisible}
        style="transition-delay: 0.2s"
      >
        <!-- Globe wrapper — dark background in light mode so it always looks intentional -->
        <div class="relative w-full max-w-[420px] mx-auto">

          <!-- Outer glow ring -->
          <div
            class="absolute inset-0 rounded-full transition-opacity duration-1000"
            class:opacity-0={!globeVisible}
            class:opacity-100={globeVisible}
            style="
              background: radial-gradient(circle, rgba(51,204,221,0.08) 0%, transparent 70%);
              transform: scale(1.15);
              transition-delay: 0.6s;
            "
          />

          <!-- Dark container — makes globe look crisp on light mode too -->
          <div
            class="relative rounded-full overflow-hidden aspect-square
                   bg-[#06090a] dark:bg-transparent
                   shadow-[0_0_60px_rgba(0,0,0,0.15)] dark:shadow-none
                   ring-1 ring-neutral-200/30 dark:ring-neutral-800/50"
          >
            <!-- Crop marks on globe frame -->
            <div class="absolute top-3 left-3 w-4 h-px bg-neutral-600/40 z-10" />
            <div class="absolute top-3 left-3 h-4 w-px bg-neutral-600/40 z-10" />
            <div class="absolute top-3 right-3 w-4 h-px bg-neutral-600/40 z-10" />
            <div class="absolute top-3 right-3 h-4 w-px bg-neutral-600/40 z-10" />
            <div class="absolute bottom-3 left-3 w-4 h-px bg-neutral-600/40 z-10" />
            <div class="absolute bottom-3 left-3 h-4 w-px bg-neutral-600/40 -translate-y-4 z-10" />
            <div class="absolute bottom-3 right-3 w-4 h-px bg-neutral-600/40 z-10" />
            <div class="absolute bottom-3 right-3 h-4 w-px bg-neutral-600/40 -translate-y-4 z-10" />

            <GlobePulse class="w-full" />
          </div>

          <!-- Drag hint -->
          <div
            class="absolute -bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-1.5 transition-all duration-700"
            class:opacity-0={!globeVisible}
            class:opacity-100={globeVisible}
            style="transition-delay: 1.2s"
          >
            <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 uppercase tracking-widest">
              Drag to rotate
            </span>
          </div>
        </div>
      </div>

    </div>

    <!-- Bottom rule + label -->
    <div
      class="mt-16 flex items-center gap-3 transition-all duration-700"
      class:opacity-0={!visible}
      class:opacity-100={visible}
      style="transition-delay: 0.9s"
    >
      <div class="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
      <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">
        Remote-first · Async-friendly · Globally available
      </span>
      <div class="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
    </div>

  </div>
</section>
