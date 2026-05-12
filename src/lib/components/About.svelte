<script lang="ts">
  import { personal, skills } from '$lib/data';
  import { ArrowRight } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) visible = true; },
      { threshold: 0.1 }
    );
    const el = document.getElementById('about-section');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });

  const skillGroups = [
    { category: 'Frontend', items: skills.frontend },
    { category: 'Backend', items: skills.backend },
    { category: 'Mobile', items: skills.mobile },
    { category: 'Tools', items: skills.tools },
  ];
</script>

<section
  id="about-section"
  class="relative py-16 md:py-20 bg-white dark:bg-[#080808] transition-colors duration-500 border-t border-neutral-200/50 dark:border-neutral-800/50 overflow-hidden"
>
  <div class="max-w-3xl mx-auto px-6">
    <!-- Section label -->
    <div
      class="mb-10 transition-all duration-700"
      class:opacity-0={!visible}
      class:opacity-100={visible}
    >
      <div class="mb-6 flex items-center gap-2">
        <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">03</span>
        <span class="w-6 h-px bg-neutral-300 dark:bg-neutral-700" />
        <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">About</span>
      </div>
    </div>

    <div class="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
      <!-- Image -->
      <div
        class="md:col-span-5 transition-all duration-700"
        class:opacity-0={!visible}
        class:-translate-x-8={!visible}
        class:opacity-100={visible}
        class:translate-x-0={visible}
        style="transition-delay: 0.2s"
      >
        <div class="relative">
          <!-- Crop marks -->
          <div class="absolute -top-3 -left-3 w-4 h-px bg-neutral-400 dark:bg-neutral-600" />
          <div class="absolute -top-3 -left-3 h-4 w-px bg-neutral-400 dark:bg-neutral-600" />
          <div class="absolute -top-3 -right-3 w-4 h-px bg-neutral-400 dark:bg-neutral-600" />
          <div class="absolute -top-3 -right-3 h-4 w-px bg-neutral-400 dark:bg-neutral-600" />
          <div class="absolute -bottom-3 -left-3 w-4 h-px bg-neutral-400 dark:bg-neutral-600" />
          <div class="absolute -bottom-3 -left-3 h-4 w-px bg-neutral-400 dark:bg-neutral-600 -translate-y-4" />
          <div class="absolute -bottom-3 -right-3 w-4 h-px bg-neutral-400 dark:bg-neutral-600" />
          <div class="absolute -bottom-3 -right-3 h-4 w-px bg-neutral-400 dark:bg-neutral-600 -translate-y-4" />

          <div class="relative overflow-hidden rounded-lg aspect-square bg-neutral-100 dark:bg-neutral-900">
            <img
              src={personal.aboutImage}
              alt="Larry David"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent" />

            <!-- Active badge -->
            <div class="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
              <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-slow" />
              <span class="text-[8px] font-semibold text-white uppercase tracking-wider">Active</span>
            </div>
          </div>

          <div class="mt-3 flex items-center justify-between">
            <span class="font-mono-custom text-[8px] text-neutral-400 dark:text-neutral-600 tracking-wider uppercase">Portrait</span>
            <span class="font-mono-custom text-[8px] text-neutral-400 dark:text-neutral-600">REF.2025</span>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div
        class="md:col-span-7 transition-all duration-700"
        class:opacity-0={!visible}
        class:translate-y-6={!visible}
        class:opacity-100={visible}
        class:translate-y-0={visible}
        style="transition-delay: 0.4s"
      >
        <h2 class="font-display text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.15] mb-4">
          Developer. Designer.
          <span class="text-neutral-400 dark:text-neutral-600"> Problem Solver.</span>
        </h2>

        <div class="w-full h-px bg-neutral-200 dark:bg-neutral-800 mb-6" />

        <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
          {personal.bio}
        </p>

        <!-- Skills grid -->
        <div class="mb-8 space-y-3">
          {#each skillGroups as group, i}
            <div
              class="flex items-start gap-3 transition-all duration-500"
              class:opacity-0={!visible}
              class:opacity-100={visible}
              style="transition-delay: {0.5 + i * 0.08}s"
            >
              <span class="font-mono-custom text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider w-16 shrink-0 pt-0.5">
                {group.category}
              </span>
              <span class="w-4 h-px bg-neutral-300 dark:bg-neutral-700 mt-2.5 shrink-0" />
              <div class="flex flex-wrap gap-x-3 gap-y-1">
                {#each group.items as item}
                  <span class="flex items-center text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                    <span class="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600 mr-1.5" />
                    {item}
                  </span>
                {/each}
              </div>
            </div>
          {/each}
        </div>

        <!-- CTA -->
        <a
          href={personal.cv}
          download
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-sm font-semibold"
        >
          View Resume
          <ArrowRight size={15} />
        </a>
      </div>
    </div>
  </div>
</section>
