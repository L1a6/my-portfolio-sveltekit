<script lang="ts">
  import { personal } from '$lib/data';
  import Footer from '$lib/components/Footer.svelte';
  import { ArrowRight, Mail, MapPin, Phone, Github, Linkedin } from 'lucide-svelte';

  let name = $state('');
  let email = $state('');
  let message = $state('');
  let status = $state<'idle' | 'sending' | 'sent' | 'error'>('idle');
  let errors = $state<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Valid email is required';
    if (!message.trim() || message.length < 10) e.message = 'Message must be at least 10 characters';
    errors = e;
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    status = 'sending';

    // Simulate send (no backend)
    await new Promise(r => setTimeout(r, 1200));
    status = 'sent';
    name = '';
    email = '';
    message = '';
  }
</script>

<svelte:head>
  <title>Contact — Larry David</title>
</svelte:head>

<div class="min-h-screen pt-24 bg-white dark:bg-[#080808] transition-colors duration-500">
  <div class="max-w-3xl mx-auto px-6 py-16">
    <!-- Header -->
    <div class="mb-12">
      <div class="mb-6 flex items-center gap-2">
        <span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">Get in touch</span>
      </div>
      <h1 class="font-display text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.1] mb-4">
        Let's work <span class="text-neutral-400 dark:text-neutral-600">together.</span>
      </h1>
      <div class="w-full h-px bg-neutral-200 dark:bg-neutral-800" />
    </div>

    <div class="grid md:grid-cols-2 gap-12">
      <!-- Contact info -->
      <div>
        <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
          Have a project in mind or want to discuss how we can work together? I'm always open to new opportunities and interesting challenges.
        </p>

        <div class="space-y-4 mb-8">
          <a href={`mailto:${personal.email}`}
            class="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <Mail size={16} class="text-neutral-400 dark:text-neutral-600" />
            {personal.email}
          </a>
          <div class="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
            <MapPin size={16} class="text-neutral-400 dark:text-neutral-600" />
            {personal.location}
          </div>
          <a href={`https://wa.me/${personal.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
            class="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <Phone size={16} class="text-neutral-400 dark:text-neutral-600" />
            {personal.phone}
          </a>
        </div>

        <div class="flex items-center gap-4">
          <a href={personal.github} target="_blank" rel="noopener noreferrer"
            class="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <Github size={14} />GitHub
          </a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
            class="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <Linkedin size={14} />LinkedIn
          </a>
        </div>
      </div>

      <!-- Form -->
      <div>
        {#if status === 'sent'}
          <div class="p-6 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30 text-center">
            <div class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 text-emerald-600 dark:text-emerald-400">
                <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="font-display font-bold text-neutral-900 dark:text-white mb-1">Message sent!</h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">I'll get back to you as soon as possible.</p>
            <button
              onclick={() => status = 'idle'}
              class="mt-4 text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            >
              Send another message
            </button>
          </div>
        {:else}
          <div class="space-y-4">
            <!-- Name -->
            <div>
              <label for="name" class="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5 uppercase tracking-wider font-mono-custom">
                Name
              </label>
              <input
                id="name"
                type="text"
                bind:value={name}
                placeholder="Your name"
                class="w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 transition-all duration-200 outline-none focus:ring-2 focus:ring-neutral-900/20 dark:focus:ring-white/10
                  {errors.name ? 'border-red-300 dark:border-red-800' : 'border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-600'}"
              />
              {#if errors.name}
                <p class="mt-1 text-xs text-red-500">{errors.name}</p>
              {/if}
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5 uppercase tracking-wider font-mono-custom">
                Email
              </label>
              <input
                id="email"
                type="email"
                bind:value={email}
                placeholder="your@email.com"
                class="w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 transition-all duration-200 outline-none focus:ring-2 focus:ring-neutral-900/20 dark:focus:ring-white/10
                  {errors.email ? 'border-red-300 dark:border-red-800' : 'border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-600'}"
              />
              {#if errors.email}
                <p class="mt-1 text-xs text-red-500">{errors.email}</p>
              {/if}
            </div>

            <!-- Message -->
            <div>
              <label for="message" class="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5 uppercase tracking-wider font-mono-custom">
                Message
              </label>
              <textarea
                id="message"
                bind:value={message}
                placeholder="Tell me about your project..."
                rows={5}
                class="w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 transition-all duration-200 outline-none focus:ring-2 focus:ring-neutral-900/20 dark:focus:ring-white/10 resize-none
                  {errors.message ? 'border-red-300 dark:border-red-800' : 'border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-600'}"
              />
              {#if errors.message}
                <p class="mt-1 text-xs text-red-500">{errors.message}</p>
              {/if}
            </div>

            <button
              onclick={handleSubmit}
              disabled={status === 'sending'}
              class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all duration-200 hover:scale-[1.01]"
            >
              {#if status === 'sending'}
                <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              {:else}
                Send Message
                <ArrowRight size={15} />
              {/if}
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <Footer />
</div>
