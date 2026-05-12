<script lang="ts">
  import { skills, techStack } from '$lib/data';
  import Footer from '$lib/components/Footer.svelte';

  const skillCategories = [
    {
      title: 'Frontend',
      items: skills.frontend,
      description: 'Building responsive, performant user interfaces',
      color: 'from-blue-500/10 to-indigo-500/5',
    },
    {
      title: 'Backend',
      items: skills.backend,
      description: 'Server-side logic, databases, and APIs',
      color: 'from-emerald-500/10 to-teal-500/5',
    },
    {
      title: 'Mobile',
      items: skills.mobile,
      description: 'Cross-platform mobile applications',
      color: 'from-amber-500/10 to-orange-500/5',
    },
    {
      title: 'Tools',
      items: skills.tools,
      description: 'Development tools and workflow',
      color: 'from-purple-500/10 to-pink-500/5',
    },
  ];
</script>

<svelte:head>
  <title>Skills — Larry David</title>
</svelte:head>

<div class="min-h-screen pt-24 bg-white dark:bg-[#080808] transition-colors duration-500">
  <div class="max-w-3xl mx-auto px-6 py-16">
    <div class="mb-12">
      <div class="mb-6 flex items-center gap-2">
        <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">Stack</span>
      </div>
      <h1 class="font-display text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.1] mb-4">
        Skills & <span class="text-neutral-400 dark:text-neutral-600">Technologies.</span>
      </h1>
      <p class="text-neutral-600 dark:text-neutral-400 text-base">
        A comprehensive look at the tools and technologies I use to build modern web applications.
      </p>
      <div class="mt-6 w-full h-px bg-neutral-200 dark:bg-neutral-800" />
    </div>

    <!-- Categories grid -->
    <div class="grid md:grid-cols-2 gap-4 mb-16">
      {#each skillCategories as cat}
        <div class="p-6 rounded-xl border border-neutral-100 dark:border-neutral-900 bg-gradient-to-br {cat.color}">
          <h3 class="font-display font-bold text-neutral-900 dark:text-white mb-1">{cat.title}</h3>
          <p class="text-xs text-neutral-500 dark:text-neutral-500 mb-4">{cat.description}</p>
          <div class="flex flex-wrap gap-2">
            {#each cat.items as item}
              <span class="px-2.5 py-1 rounded-md bg-white/60 dark:bg-black/30 border border-neutral-200/60 dark:border-neutral-800/60 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                {item}
              </span>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <!-- Tech logos -->
    <div>
      <h2 class="font-display font-bold text-xl text-neutral-900 dark:text-white mb-6">Full Tech Radar</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {#each techStack as tech}
          <div class="flex items-center gap-2.5 p-3 rounded-lg border border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-900/30 hover:border-neutral-200 dark:hover:border-neutral-800 transition-all duration-200 group">
            <img
              src={tech.src}
              alt={tech.name}
              class="w-5 h-5 object-contain transition-transform duration-200 group-hover:scale-110"
              class:dark:invert={tech.invertDark}
              loading="lazy"
            />
            <span class="text-xs font-medium text-neutral-700 dark:text-neutral-300">{tech.name}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <Footer />
</div>
