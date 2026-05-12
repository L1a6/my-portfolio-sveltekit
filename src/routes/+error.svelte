<script lang="ts">
  import { ArrowLeft } from 'lucide-svelte';
</script>

<svelte:head>
  <title>404 — Page Not Found</title>
</svelte:head>

<div class="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#080808] transition-colors duration-500 px-6">
  <div class="text-center">
    <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase mb-6 block">404</span>
    <h1 class="font-display text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-4">
      Page not found.
    </h1>
    <p class="text-neutral-600 dark:text-neutral-400 mb-8 max-w-sm mx-auto">
      This page doesn't exist or has been moved to a different location.
    </p>
    <a
      href="/"
      class="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
    >
      <ArrowLeft size={15} />
      Back Home
    </a>
  </div>
</div>
