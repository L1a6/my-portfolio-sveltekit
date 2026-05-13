<script lang="ts">
	import GlobePulse from './GlobePulse.svelte';
	import { onMount } from 'svelte';

	let visible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) visible = true;
			},
			{ threshold: 0.1 }
		);
		const el = document.getElementById('global-section');
		if (el) observer.observe(el);
		return () => observer.disconnect();
	});

	const markers = [
		{ id: 'london', location: [51.51, -0.13], delay: 0 },
		{ id: 'newyork', location: [40.71, -74.01], delay: 0.5 },
		{ id: 'tokyo', location: [35.68, 139.65], delay: 1 },
		{ id: 'sydney', location: [-33.87, 151.21], delay: 1.5 }
	];
</script>

<section
	id="global-section"
	class="relative py-16 md:py-24 bg-gradient-to-b from-white to-neutral-50 dark:from-[#080808] dark:to-neutral-900/30 transition-colors duration-500 border-t border-neutral-200/50 dark:border-neutral-800/50"
>
	<div class="max-w-5xl mx-auto px-6">
		<!-- Section label -->
		<div
			class="mb-12 transition-all duration-700"
			class:opacity-0={!visible}
			class:opacity-100={visible}
		>
			<div class="mb-6 flex items-center gap-2">
				<span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase"
					>05</span
				>
				<span class="w-6 h-px bg-neutral-300 dark:bg-neutral-700\"></span>
				<span class="font-mono-custom text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase"
					>Global Reach</span
				>
			</div>

			<h2
				class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-3 transition-all duration-700"
				class:opacity-0={!visible}
				class:translate-y-4={!visible}
				style="transition-delay: 0.1s"
			>
				Connect Worldwide
			</h2>
			<p
				class="text-neutral-600 dark:text-neutral-400 transition-all duration-700"
				class:opacity-0={!visible}
				class:translate-y-4={!visible}
				style="transition-delay: 0.2s"
			>
				I collaborate with teams across the globe. Interact with the globe to explore my presence worldwide.
			</p>
		</div>

		<!-- Globe Container -->
		<div
			class="flex justify-center transition-all duration-700"
			class:opacity-0={!visible}
			class:scale-90={!visible}
			class:opacity-100={visible}
			class:scale-100={visible}
			style="transition-delay: 0.3s"
		>
			<div class="w-full max-w-sm">
				<GlobePulse {markers} className="w-full" />
				<p class="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-6">
					Drag to explore • Always available • Global timezone coverage
				</p>
			</div>
		</div>
	</div>

	<!-- Ambient glow background -->
	<div
		class="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"
	></div>
</section>
