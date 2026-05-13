<script lang="ts">
  import { personal } from '$lib/data';
  import { ArrowRight } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) visible = true; },
      { threshold: 0.1 }
    );
    const el = document.getElementById('cta-section');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<section
  id="cta-section"
  class="relative py-20 md:py-28 bg-white dark:bg-[#080808] transition-colors duration-500 border-t border-neutral-200/50 dark:border-neutral-800/50 overflow-hidden"
>
  <!-- Background decoration -->
  <div class="absolute inset-0 grid-bg opacity-50 pointer-events-none"></div>
  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-50/50 dark:via-neutral-900/20 to-transparent pointer-events-none"></div>

  <div class="relative z-10 max-w-3xl mx-auto px-6 text-center">
    <div
      class="transition-all duration-700"
      class:opacity-0={!visible}
      class:translate-y-6={!visible}
      class:opacity-100={visible}
      class:translate-y-0={visible}
    >
      <div class="mb-6 flex items-center justify-center gap-2">
        <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">06</span>
        <span class="w-6 h-px bg-neutral-300 dark:bg-neutral-700"></span>
        <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">Contact</span>
      </div>

      <h2 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.1] mb-6">
        Let's work
        <span class="text-neutral-400 dark:text-neutral-600"> together.</span>
      </h2>

      <p class="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-10 max-w-md mx-auto">
        Have a project in mind? I'd love to hear from you and see how we can create something amazing.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-4">
        <a
          href="/contact"
          class="inline-flex items-center gap-2 px-7 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full font-semibold hover:opacity-90 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl shadow-neutral-900/20"
        >
          Get in Touch
          <ArrowRight size={16} />
        </a>

        <a
          href={`mailto:${personal.email}`}
          class="inline-flex items-center gap-2 px-7 py-3 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full font-medium hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200"
        >
          {personal.email}
        </a>
      </div>
    </div>
  </div>
</section>
