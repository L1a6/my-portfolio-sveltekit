<script lang="ts">
  import { approach } from '$lib/data';
  import { onMount } from 'svelte';

  let visible = $state(false);
  let activeStep = $state(0);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) visible = true; },
      { threshold: 0.1 }
    );
    const el = document.getElementById('approach-section');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <script
    type="module"
    src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
  ></script>
</svelte:head>

<section
  id="approach-section"
  class="relative py-16 md:py-20 bg-white dark:bg-[#080808] transition-colors duration-500 border-t border-neutral-200/50 dark:border-neutral-800/50"
>
  <div class="max-w-3xl mx-auto px-6">
    <div
      class="mb-10 transition-all duration-700"
      class:opacity-0={!visible}
      class:opacity-100={visible}
    >
      <div class="mb-6 flex items-center gap-2">
        <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">04</span>
        <span class="w-6 h-px bg-neutral-300 dark:bg-neutral-700"></span>
        <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">Process</span>
      </div>
      <h2 class="font-display text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.15]">
        My Approach. <span class="text-neutral-400 dark:text-neutral-600">How I Work.</span>
      </h2>
      <div class="mt-4 w-full h-px bg-neutral-200 dark:bg-neutral-800"></div>
    </div>

    <!-- Steps -->
    <div class="grid md:grid-cols-2 gap-4">
      {#each approach as step, i}
        <button
          class="group text-left p-6 rounded-xl border transition-all duration-300 {activeStep === i
            ? 'bg-neutral-50 dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-700'
            : 'border-neutral-100 dark:border-neutral-900 hover:border-neutral-200 dark:hover:border-neutral-800'}"
          onclick={() => activeStep = i}
          class:opacity-0={!visible}
          class:opacity-100={visible}
          style="transition-delay: {0.1 + i * 0.1}s"
        >
          <div class="flex items-start justify-between mb-3">
            <span class="font-mono-custom text-[10px] text-neutral-400 dark:text-neutral-600 tracking-widest">{step.number}</span>
            <div class="w-2 h-2 rounded-full {activeStep === i ? 'bg-emerald-500' : 'bg-neutral-200 dark:bg-neutral-800'} transition-colors duration-300"></div>
          </div>

          <h3 class="font-display font-bold text-xl text-neutral-900 dark:text-white mb-2">{step.title}</h3>

          <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
            {step.description}
          </p>

          <div class="mb-4 overflow-hidden rounded-lg border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-50 dark:bg-neutral-900/40">
            {#if step.animation.endsWith('.mp4')}
              <video
                class="w-full h-32 md:h-36 object-cover"
                autoplay
                muted
                loop
                playsinline
                preload="metadata"
                aria-hidden="true"
              >
                <source src={step.animation} type="video/mp4" />
              </video>
            {:else}
              <dotlottie-player
                src={step.animation}
                background="transparent"
                speed="1"
                loop
                autoplay
                aria-hidden="true"
                class="w-full h-32 md:h-36"
              ></dotlottie-player>
            {/if}
          </div>

          {#if activeStep === i}
            <div class="space-y-1.5">
              {#each step.details as detail}
                <div class="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
                  <span class="w-1 h-1 rounded-full bg-emerald-500 shrink-0"></span>
                  {detail}
                </div>
              {/each}
            </div>
          {/if}
        </button>
      {/each}
    </div>
  </div>
</section>
