<script lang="ts">
  import { projects } from '$lib/data';
  import { ExternalLink, Github, ChevronDown } from 'lucide-svelte';
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';

  let visible = $state(false);
  let activeIndex = $state(-1);

  const techLogos: Record<string, { src: string; invert?: boolean }> = {
    'Next.js': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
    'React': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    'TypeScript': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    'Node.js': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    'Tailwind CSS': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    'Supabase': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
    'PostgreSQL': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    'React Native': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    'Stripe': { src: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/stripe.svg', invert: true },
  };

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) visible = true; },
      { threshold: 0.1 }
    );
    const el = document.getElementById('projects');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });

  function toggle(i: number) {
    activeIndex = activeIndex === i ? -1 : i;
  }
</script>

<section
  id="projects"
  class="relative py-16 md:py-20 bg-white dark:bg-[#080808] transition-colors duration-500 border-t border-neutral-200/50 dark:border-neutral-800/50"
>
  <!-- Technical lines -->
  <div class="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[900px] pointer-events-none">
    <div class="absolute top-8 left-0 w-5 h-px bg-neutral-200 dark:bg-neutral-800"></div>
    <div class="absolute top-8 left-0 w-px h-5 bg-neutral-200 dark:bg-neutral-800"></div>
    <div class="absolute top-8 right-0 w-5 h-px bg-neutral-200 dark:bg-neutral-800"></div>
    <div class="absolute top-8 right-0 w-px h-5 bg-neutral-200 dark:bg-neutral-800"></div>
  </div>

  <div class="max-w-3xl mx-auto px-6">
    <!-- Header -->
    <div
      class="mb-10 transition-all duration-700"
      class:opacity-0={!visible}
      class:opacity-100={visible}
      class:translate-y-4={!visible}
      class:translate-y-0={visible}
    >
      <div class="mb-6 flex items-center gap-2">
        <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">02</span>
        <span class="w-6 h-px bg-neutral-300 dark:bg-neutral-700"></span>
        <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">Work</span>
      </div>
      <h2 class="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.15]">
        Selected <span class="text-neutral-400 dark:text-neutral-600">Projects.</span>
      </h2>
      <div class="mt-4 w-full h-px bg-neutral-200 dark:bg-neutral-800"></div>
    </div>

    <!-- Accordion projects -->
    <div class="space-y-0">
      {#each projects as project, i}
        {@const isActive = activeIndex === i}
        <div
          class="border-b border-neutral-200 dark:border-neutral-800 transition-all duration-300"
          style="transition-delay: {i * 60}ms"
          class:opacity-0={!visible}
          class:opacity-100={visible}
        >
          <!-- Row header (clickable) -->
          <button
            class="w-full group flex items-center gap-4 py-5 text-left transition-all duration-200"
            onclick={() => toggle(i)}
            aria-expanded={isActive}
          >
            <!-- Number -->
            <span class="font-mono-custom text-[10px] text-neutral-400 dark:text-neutral-600 w-6 shrink-0">
              0{i + 1}
            </span>

            <!-- Title -->
            <span class="font-display font-semibold text-lg md:text-xl text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors flex-1">
              {project.title}
            </span>

            <!-- Category badge -->
            <span class="hidden sm:block text-[10px] font-mono-custom text-neutral-400 dark:text-neutral-600 uppercase tracking-wider">
              {project.category}
            </span>

            <!-- Arrow -->
            <ChevronDown
              size={16}
              class="text-neutral-400 dark:text-neutral-600 transition-transform duration-300 shrink-0 {isActive ? 'rotate-180' : ''}"
            />
          </button>

          <!-- Expanded content -->
          {#if isActive}
            <div transition:slide={{ duration: 400 }} class="pb-6 pl-10">
              <div class="grid md:grid-cols-2 gap-6">
                <!-- Image -->
                <div class="relative overflow-hidden rounded-lg aspect-video bg-neutral-100 dark:bg-neutral-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <!-- Gradient overlay -->
                  <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>

                <!-- Info -->
                <div class="flex flex-col gap-4">
                  <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {project.description}
                  </p>

                  <!-- Tech stack -->
                  <div class="flex flex-wrap gap-2">
                    {#each project.technologies as tech}
                      <div class="flex items-center gap-1 px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                        {#if techLogos[tech]}
                          <img
                            src={techLogos[tech].src}
                            alt={tech}
                            class="w-3.5 h-3.5"
                            class:dark:invert={techLogos[tech].invert}
                            loading="lazy"
                          />
                        {/if}
                        <span class="text-[10px] font-medium text-neutral-600 dark:text-neutral-400">{tech}</span>
                      </div>
                    {/each}
                  </div>

                  <!-- Links -->
                  <div class="flex items-center gap-3 mt-auto pt-2">
                    {#if project.url}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white hover:opacity-70 transition-opacity"
                      >
                        <ExternalLink size={13} />
                        Live Demo
                      </a>
                    {/if}
                    {#if project.github}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      >
                        <Github size={13} />
                        GitHub
                      </a>
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
