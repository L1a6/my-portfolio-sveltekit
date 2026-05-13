<script lang="ts">
  import { page } from '$app/stores';
  import { theme } from '$lib/theme';
  import { onMount } from 'svelte';
  import { Home, Lightbulb, FolderGit2, Mail, Moon, Sun, Menu, X } from 'lucide-svelte';
  import { fly, fade } from 'svelte/transition';

  let scrolled = $state(false);
  let mobileOpen = $state(false);

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Skills', href: '/skills', icon: Lightbulb },
    { label: 'Projects', href: '/#projects', icon: FolderGit2 },
    { label: 'Contact', href: '/contact', icon: Mail },
  ];

  onMount(() => {
    const handler = () => { scrolled = window.scrollY > 60; };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  });

  function isActive(href: string) {
    if (href === '/') return $page.url.pathname === '/';
    if (href.startsWith('/#')) return false;
    return $page.url.pathname.startsWith(href);
  }

  function handleNavClick(href: string) {
    mobileOpen = false;
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      if ($page.url.pathname !== '/') {
        window.location.href = href;
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
</script>

<nav
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
  class:shadow-sm={scrolled}
  style="background: {scrolled ? 'var(--color-bg)' : 'transparent'}; border-bottom: {scrolled ? '1px solid var(--color-border)' : '1px solid transparent'};"
>
  <div class="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
    <!-- Logo -->
    <a href="/" class="font-display font-bold text-sm tracking-widest uppercase text-current opacity-80 hover:opacity-100 transition-opacity">
      LD<span class="text-neutral-400 dark:text-neutral-600">.</span>
    </a>

    <!-- Desktop nav -->
    <div class="hidden md:flex items-center gap-1 bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-black/[0.06] dark:border-white/[0.07] rounded-full px-2 py-1.5">
      {#each navItems as item}
        {@const active = isActive(item.href)}
        {@const Icon = item.icon}
        <a
          href={item.href}
          onclick={() => handleNavClick(item.href)}
          class="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
          class:bg-black={active}
          class:dark:bg-white={active}
          class:text-white={active}
          class:dark:text-black={active}
          class:text-neutral-500={!active}
          class:dark:text-neutral-400={!active}
          class:hover:text-neutral-900={!active}
          class:dark:hover:text-neutral-200={!active}
        >
          <Icon size={13} />
          {item.label}
        </a>
      {/each}
    </div>

    <!-- Right actions -->
    <div class="flex items-center gap-2">
      <button
        onclick={() => theme.toggle()}
        class="w-8 h-8 flex items-center justify-center rounded-full border border-black/[0.06] dark:border-white/[0.07] bg-white/70 dark:bg-white/5 backdrop-blur-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all duration-200 hover:scale-105"
        aria-label="Toggle theme"
      >
        {#if $theme === 'dark'}
          <Sun size={14} />
        {:else}
          <Moon size={14} />
        {/if}
      </button>

      <!-- Mobile menu button -->
      <button
        onclick={() => mobileOpen = !mobileOpen}
        class="md:hidden w-8 h-8 flex items-center justify-center rounded-full border border-black/[0.06] dark:border-white/[0.07] bg-white/70 dark:bg-white/5 backdrop-blur-sm text-neutral-500 dark:text-neutral-400"
        aria-label="Menu"
      >
        {#if mobileOpen}
          <X size={14} />
        {:else}
          <Menu size={14} />
        {/if}
      </button>
    </div>
  </div>

  <!-- Mobile menu -->
  {#if mobileOpen}
    <div
      transition:fly={{ y: -10, duration: 200 }}
      class="md:hidden px-6 pb-4 border-t border-black/[0.06] dark:border-white/[0.07]"
      style="background: var(--color-bg);"
    >
      {#each navItems as item}
        {@const Icon = item.icon}
        <a
          href={item.href}
          onclick={() => handleNavClick(item.href)}
          class="flex items-center gap-3 py-3 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border-b border-black/[0.04] dark:border-white/[0.04] last:border-0 transition-colors"
        >
          <Icon size={16} />
          {item.label}
        </a>
      {/each}
    </div>
  {/if}
</nav>
