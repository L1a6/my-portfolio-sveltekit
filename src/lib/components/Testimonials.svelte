<script lang="ts">
  import { testimonials } from '$lib/data';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let visible = $state(false);
  let activeIndex = $state(0);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) visible = true; },
      { threshold: 0.1 }
    );
    const el = document.getElementById('testimonials-section');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });

  function next() { activeIndex = (activeIndex + 1) % testimonials.length; }
  function prev() { activeIndex = (activeIndex - 1 + testimonials.length) % testimonials.length; }

  const active = $derived(testimonials[activeIndex]);
</script>

<section
  id="testimonials-section"
  class="relative py-16 md:py-20 bg-white dark:bg-[#080808] transition-colors duration-500 border-t border-neutral-200/50 dark:border-neutral-800/50"
>
  <div class="max-w-3xl mx-auto px-6">
    <div
      class="mb-10 transition-all duration-700"
      class:opacity-0={!visible}
      class:opacity-100={visible}
    >
      <div class="mb-6 flex items-center gap-2">
        <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">05</span>
        <span class="w-6 h-px bg-neutral-300 dark:bg-neutral-700" />
        <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">Testimonials</span>
      </div>
      <h2 class="font-display text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
        What People <span class="text-neutral-400 dark:text-neutral-600">Say.</span>
      </h2>
      <div class="mt-4 w-full h-px bg-neutral-200 dark:bg-neutral-800" />
    </div>

    <div
      class="transition-all duration-700"
      class:opacity-0={!visible}
      class:opacity-100={visible}
      style="transition-delay: 0.2s"
    >
      {#key activeIndex}
        <div
          transition:fade={{ duration: 300 }}
          class="relative p-8 md:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30"
        >
          <!-- Big quote mark -->
          <div class="font-display text-[80px] leading-none text-neutral-200 dark:text-neutral-800 mb-2 -mt-4 -ml-2 select-none" aria-hidden="true">"</div>

          <p class="font-display text-xl md:text-2xl font-semibold text-neutral-800 dark:text-neutral-200 leading-relaxed mb-8">
            {active.quote}
          </p>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img
                src={active.image}
                alt={active.author}
                class="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-neutral-800"
              />
              <div>
                <a
                  href={active.authorLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm font-semibold text-neutral-900 dark:text-white hover:opacity-70 transition-opacity"
                >
                  {active.author}
                </a>
                <div class="text-xs text-neutral-500 dark:text-neutral-500">
                  {active.role},
                  <a href={active.companyLink} target="_blank" rel="noopener noreferrer" class="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
                    {active.company}
                  </a>
                </div>
              </div>
            </div>

            <!-- Nav -->
            <div class="flex items-center gap-2">
              <button
                onclick={prev}
                class="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200"
                aria-label="Previous"
              >
                <ChevronLeft size={14} />
              </button>
              <div class="flex items-center gap-1">
                {#each testimonials as _, i}
                  <button
                    onclick={() => activeIndex = i}
                    class="w-1.5 h-1.5 rounded-full transition-all duration-300 {i === activeIndex ? 'bg-neutral-900 dark:bg-white scale-125' : 'bg-neutral-300 dark:bg-neutral-700'}"
                    aria-label="Go to testimonial {i + 1}"
                  />
                {/each}
              </div>
              <button
                onclick={next}
                class="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200"
                aria-label="Next"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      {/key}
    </div>
  </div>
</section>
