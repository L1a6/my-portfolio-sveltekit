<script lang="ts">
  import { onMount } from 'svelte';
  import { personal } from '$lib/data';
  import { ArrowRight, Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-svelte';

  let mounted = $state(false);
  let rotatingIndex = $state(0);
  const techItems = ['TypeScript', 'Next.js', 'React', 'Tailwind', 'Node.js', 'PostgreSQL'];

  onMount(() => {
    mounted = true;
    const interval = setInterval(() => {
      rotatingIndex = (rotatingIndex + 1) % techItems.length;
    }, 1800);
    return () => clearInterval(interval);
  });

  const socialLinks = [
    { href: personal.github, icon: Github, label: 'GitHub' },
    { href: personal.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: personal.twitter, label: 'X', custom: true },
    { href: personal.instagram, label: 'Instagram', custom: true },
    { href: `mailto:${personal.email}`, icon: Mail, label: 'Email' },
  ];
</script>

<section class="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-white dark:bg-[#080808] transition-colors duration-500">
  <!-- Grid background -->
  <div class="absolute inset-0 grid-bg opacity-100 pointer-events-none" />

  <!-- Ambient glow -->
  <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-neutral-100 dark:bg-neutral-900/60 blur-3xl pointer-events-none opacity-60" />

  <!-- Technical boundary lines -->
  <div class="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[900px] pointer-events-none">
    <div class="absolute top-20 left-0 w-6 h-px bg-neutral-300 dark:bg-neutral-700" />
    <div class="absolute top-20 left-0 w-px h-6 bg-neutral-300 dark:bg-neutral-700" />
    <div class="absolute top-20 right-0 w-6 h-px bg-neutral-300 dark:bg-neutral-700" />
    <div class="absolute top-20 right-0 w-px h-6 bg-neutral-300 dark:bg-neutral-700" />
    <div class="absolute bottom-6 left-0 w-6 h-px bg-neutral-300 dark:bg-neutral-700" />
    <div class="absolute bottom-6 left-0 w-px h-6 bg-neutral-300 dark:bg-neutral-700 -translate-y-6" />
    <div class="absolute bottom-6 right-0 w-6 h-px bg-neutral-300 dark:bg-neutral-700" />
    <div class="absolute bottom-6 right-0 w-px h-6 bg-neutral-300 dark:bg-neutral-700 -translate-y-6" />

    <!-- PORTFOLIO label -->
    <div
      class="absolute top-1/3 -translate-y-1/2 -left-10 flex flex-col items-center gap-3 transition-all duration-700"
      class:opacity-0={!mounted}
      class:opacity-100={mounted}
      style="transition-delay: 1.5s"
    >
      <div class="w-px h-12 bg-gradient-to-b from-transparent via-neutral-300/50 dark:via-neutral-600/50 to-transparent" />
      <span
        class="text-[9px] font-display font-bold tracking-[0.6em] text-neutral-400/50 dark:text-neutral-600/50 uppercase"
        style="writing-mode: vertical-rl;"
      >PORTFOLIO</span>
      <div class="w-px h-12 bg-gradient-to-b from-transparent via-neutral-300/50 dark:via-neutral-600/50 to-transparent" />
    </div>

    <!-- V1 badge -->
    <div
      class="absolute top-1/3 -translate-y-1/2 -right-10 flex flex-col items-center gap-3 transition-all duration-700"
      class:opacity-0={!mounted}
      class:opacity-100={mounted}
      style="transition-delay: 1.7s"
    >
      <div class="w-px h-12 bg-gradient-to-b from-transparent via-neutral-300/50 dark:via-neutral-600/50 to-transparent" />
      <div class="px-2 py-1.5 rounded border border-neutral-300/50 dark:border-neutral-700/50 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm">
        <span class="text-[9px] font-display font-black tracking-[0.3em] text-neutral-500 dark:text-neutral-500 uppercase">V2</span>
      </div>
      <div class="w-px h-12 bg-gradient-to-b from-transparent via-neutral-300/50 dark:via-neutral-600/50 to-transparent" />
    </div>
  </div>

  <div class="relative z-10 w-full max-w-3xl mx-auto px-6">
    <!-- Section label -->
    <div
      class="mb-8 flex items-center gap-2 transition-all duration-500"
      class:opacity-0={!mounted}
      class:translate-x-0={mounted}
      class:-translate-x-4={!mounted}
      style="transition-delay: 0.1s"
    >
      <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">01</span>
      <span class="w-6 h-px bg-neutral-300 dark:bg-neutral-700" />
      <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">Introduction</span>
    </div>

    <!-- Avatar -->
    <div
      class="relative inline-block mb-8 transition-all duration-700"
      class:opacity-0={!mounted}
      class:scale-90={!mounted}
      class:opacity-100={mounted}
      class:scale-100={mounted}
      style="transition-delay: 0.3s"
    >
      <div class="relative">
        <!-- Corner marks -->
        <div class="absolute -top-2 -left-2 w-3 h-px bg-neutral-400 dark:bg-neutral-600" />
        <div class="absolute -top-2 -left-2 h-3 w-px bg-neutral-400 dark:bg-neutral-600" />
        <div class="absolute -top-2 -right-2 w-3 h-px bg-neutral-400 dark:bg-neutral-600" />
        <div class="absolute -top-2 -right-2 h-3 w-px bg-neutral-400 dark:bg-neutral-600" />
        <div class="absolute -bottom-2 -left-2 w-3 h-px bg-neutral-400 dark:bg-neutral-600" />
        <div class="absolute -bottom-2 -left-2 h-3 w-px bg-neutral-400 dark:bg-neutral-600 -translate-y-3" />
        <div class="absolute -bottom-2 -right-2 w-3 h-px bg-neutral-400 dark:bg-neutral-600" />
        <div class="absolute -bottom-2 -right-2 h-3 w-px bg-neutral-400 dark:bg-neutral-600 -translate-y-3" />

        <img
          src={personal.avatar}
          alt="Larry David"
          class="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover ring-2 ring-neutral-200/50 dark:ring-neutral-800/50 bg-neutral-100 dark:bg-neutral-900"
          draggable="false"
        />

        <!-- Status indicator -->
        <div
          class="absolute -bottom-0.5 -right-0.5 transition-all duration-500"
          class:opacity-0={!mounted}
          class:scale-0={!mounted}
          style="transition-delay: 0.9s"
        >
          <div class="group cursor-default">
            <div class="flex items-center h-4 w-4 group-hover:w-auto rounded-full bg-white dark:bg-neutral-900 ring-2 ring-white dark:ring-neutral-900 overflow-hidden transition-all duration-300 ease-out">
              <span class="w-2.5 h-2.5 mx-[3px] rounded-full bg-emerald-500 shrink-0 animate-pulse-slow" />
              <span class="w-0 overflow-hidden whitespace-nowrap text-[8px] font-medium text-neutral-600 dark:text-neutral-400 transition-all duration-300 group-hover:w-auto group-hover:pr-1.5">
                {personal.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Heading -->
    <div class="mb-4 overflow-hidden">
      <h1
        class="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.15] transition-all duration-700"
        class:opacity-0={!mounted}
        class:translate-y-8={!mounted}
        style="transition-delay: 0.5s"
      >
        Hi, I'm {personal.name}.
        <span class="text-neutral-400 dark:text-neutral-600"> {personal.title}.</span>
      </h1>
    </div>

    <!-- Divider line -->
    <div
      class="w-full h-px bg-neutral-200 dark:bg-neutral-800 mb-5 origin-left transition-all duration-700"
      class:scale-x-0={!mounted}
      class:scale-x-100={mounted}
      style="transition-delay: 0.9s"
    />

    <!-- Description with rotating tech -->
    <div
      class="text-sm md:text-base text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed transition-all duration-500"
      class:opacity-0={!mounted}
      style="transition-delay: 1.1s"
    >
      <span>I build web applications with </span>
      <span class="inline-flex items-center gap-1 font-medium text-neutral-800 dark:text-neutral-200 min-w-[100px]">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        {techItems[rotatingIndex]}
      </span>
      <span> {personal.description}</span>
    </div>

    <!-- CTA Buttons -->
    <div
      class="flex gap-3 flex-wrap mb-10 transition-all duration-500"
      class:opacity-0={!mounted}
      style="transition-delay: 1.3s"
    >
      <a
        href="/contact"
        class="liquid-btn inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-sm font-semibold hover:opacity-90 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
      >
        Get in Touch
        <ArrowRight size={16} />
      </a>

      <a
        href={personal.cv}
        download
        class="inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-slow" />
        Available
      </a>
    </div>

    <!-- Social links -->
    <div
      class="flex items-center gap-4 transition-all duration-500"
      class:opacity-0={!mounted}
      style="transition-delay: 1.4s"
    >
      <a href={personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
        class="text-neutral-400 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
      </a>
      <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
        class="text-neutral-400 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <a href={personal.twitter} target="_blank" rel="noopener noreferrer" aria-label="X"
        class="text-neutral-400 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a href={`mailto:${personal.email}`} aria-label="Email"
        class="text-neutral-400 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-4 h-4"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
      </a>
    </div>

    <!-- Scroll indicator -->
    <div
      class="mt-12 flex items-center gap-3 transition-all duration-500"
      class:opacity-0={!mounted}
      style="transition-delay: 1.6s"
    >
      <div class="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
      <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">Scroll to explore</span>
      <div class="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
    </div>
  </div>
</section>
