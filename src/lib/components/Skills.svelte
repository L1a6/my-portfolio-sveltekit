<script lang="ts">
  import { techStack } from '$lib/data';
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) visible = true; },
      { threshold: 0.1 }
    );
    const el = document.getElementById('skills-section');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });

  // Double the array for seamless loop
  const doubled = [...techStack, ...techStack];
</script>

<section
  id="skills-section"
  class="relative py-12 md:py-16 bg-white dark:bg-[#080808] transition-colors duration-500 border-t border-neutral-200/50 dark:border-neutral-800/50 overflow-hidden"
>
  <!-- Content -->
  <div
    class="max-w-3xl mx-auto px-6 mb-6 transition-all duration-700"
    class:opacity-0={!visible}
    class:opacity-100={visible}
    class:translate-y-4={!visible}
    class:translate-y-0={visible}
  >
    <div class="flex items-center justify-center gap-4 mb-2">
      <div class="h-px w-10 bg-neutral-300 dark:bg-neutral-700"></div>
      <h2 class="font-mono-custom text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
        Tech Stack
      </h2>
      <div class="h-px w-10 bg-neutral-300 dark:bg-neutral-700"></div>
    </div>
    <p class="text-center text-sm text-neutral-500 dark:text-neutral-500">
      Building modern, scalable applications with industry-leading frameworks
    </p>
  </div>

  <!-- Infinite slider -->
  <div class="relative overflow-hidden" style="mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent)">
    <div class="infinite-slider gap-10 py-3">
      {#each doubled as tech, i}
        <div class="flex items-center gap-2.5 px-3 select-none pointer-events-none shrink-0">
          <img
            src={tech.src}
            alt={tech.name}
            class="h-6 w-auto"
            class:dark:invert={tech.invertDark}
            loading="lazy"
          />
          <span class="text-sm font-medium text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
            {tech.name}
          </span>
        </div>
      {/each}
    </div>
  </div>
</section>
