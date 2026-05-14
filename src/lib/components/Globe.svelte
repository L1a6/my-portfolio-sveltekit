<script lang="ts">
  import { onMount } from 'svelte';
  import GlobeCanvas from '$lib/components/GlobeCanvas.svelte';

  let sectionEl: HTMLElement;
  let visible = $state(false);

  onMount(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) visible = true; },
      { threshold: 0.15 }
    );
    io.observe(sectionEl);
    return () => io.disconnect();
  });

  const cities = ['Lagos', 'London', 'New York', 'Tokyo', 'Sydney'];
</script>

<section
  bind:this={sectionEl}
  id="globe-section"
  class="relative py-16 md:py-24 overflow-hidden
         bg-white dark:bg-[#080808] transition-colors duration-500
         border-t border-neutral-200/50 dark:border-neutral-800/50"
>
  <div class="grid-bg absolute inset-0 pointer-events-none" />

  <div class="relative z-10 max-w-3xl mx-auto px-6">

    <!-- Header -->
    <div
      class="mb-10 transition-all duration-700"
      class:opacity-0={!visible}
      class:translate-y-4={!visible}
      class:opacity-100={visible}
      class:translate-y-0={visible}
    >
      <div class="mb-5 flex items-center gap-2">
        <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">03.5</span>
        <span class="w-6 h-px bg-neutral-300 dark:bg-neutral-700" />
        <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">Global Reach</span>
      </div>

      <h2 class="font-display text-3xl md:text-4xl lg:text-5xl font-bold
                 text-neutral-900 dark:text-white tracking-tight leading-[1.15]">
        Built for the world.
        <span class="text-neutral-400 dark:text-neutral-600"> Available everywhere.</span>
      </h2>

      <div class="mt-5 w-full h-px bg-neutral-200 dark:bg-neutral-800" />
    </div>

    <!-- Grid -->
    <div class="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

      <!-- Left -->
      <div
        class="order-2 md:order-1 transition-all duration-700"
        class:opacity-0={!visible}
        class:-translate-x-4={!visible}
        class:opacity-100={visible}
        class:translate-x-0={visible}
        style="transition-delay:0.2s"
      >
        <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
          I work with clients and teams across the globe — from startups in Nigeria
          to brands in Europe and North America. Wherever your users are, I build for them.
        </p>

        <div class="space-y-2 mb-8">
          {#each cities as city, i}
            <div
              class="flex items-center gap-3 transition-all duration-500"
              class:opacity-0={!visible}
              class:opacity-100={visible}
              style="transition-delay:{0.35 + i * 0.07}s"
            >
              <span class="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600 shrink-0" />
              <span class="font-mono-custom text-xs text-neutral-500 dark:text-neutral-500 uppercase tracking-wider">
                {city}
              </span>
            </div>
          {/each}
        </div>

        <div class="flex items-center gap-2.5">
          <span class="relative flex h-2 w-2 shrink-0">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span class="font-mono-custom text-[10px] text-neutral-500 dark:text-neutral-500 uppercase tracking-wider">
            Available for new projects
          </span>
        </div>
      </div>

      <!-- Right — Globe -->
      <div
        class="order-1 md:order-2 transition-all duration-700"
        class:opacity-0={!visible}
        class:translate-x-4={!visible}
        class:opacity-100={visible}
        class:translate-x-0={visible}
        style="transition-delay:0.1s"
      >
        <div class="relative mx-auto w-full max-w-[300px] sm:max-w-[360px] md:max-w-full">

          <div class="absolute -top-3 -left-3 w-4 h-px bg-neutral-300 dark:bg-neutral-700" />
          <div class="absolute -top-3 -left-3 h-4 w-px bg-neutral-300 dark:bg-neutral-700" />
          <div class="absolute -top-3 -right-3 w-4 h-px bg-neutral-300 dark:bg-neutral-700" />
          <div class="absolute -top-3 -right-3 h-4 w-px bg-neutral-300 dark:bg-neutral-700" />
          <div class="absolute -bottom-3 -left-3 w-4 h-px bg-neutral-300 dark:bg-neutral-700" />
          <div class="absolute -bottom-3 -left-3 h-4 w-px bg-neutral-300 dark:bg-neutral-700 -translate-y-4" />
          <div class="absolute -bottom-3 -right-3 w-4 h-px bg-neutral-300 dark:bg-neutral-700" />
          <div class="absolute -bottom-3 -right-3 h-4 w-px bg-neutral-300 dark:bg-neutral-700 -translate-y-4" />

          <GlobeCanvas />

          <div class="mt-3 flex items-center justify-between">
            <span class="font-mono-custom text-[8px] text-neutral-400 dark:text-neutral-600 uppercase tracking-wider">
              Drag to rotate
            </span>
            <span class="font-mono-custom text-[8px] text-neutral-400 dark:text-neutral-600">
              COBE.GL
            </span>
          </div>
        </div>
      </div>

    </div>

    <div
      class="mt-12 flex items-center gap-3 transition-all duration-700"
      class:opacity-0={!visible}
      class:opacity-100={visible}
      style="transition-delay:0.6s"
    >
      <div class="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700 shrink-0" />
      <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">
        Remote-first · Global workflow
      </span>
      <div class="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
    </div>

  </div>
</section>