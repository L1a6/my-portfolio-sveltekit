<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import { theme } from '$lib/theme';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';

  onMount(() => {
    // Apply stored theme immediately on mount
    if (browser) {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }
  });

  let { children } = $props();
  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });
</script>

<div class="min-h-screen bg-white dark:bg-[#080808] transition-colors duration-500">
  <Navbar />
  <main class:opacity-0={!mounted} class="transition-opacity duration-300">
    {@render children()}
  </main>
</div>
