<script lang="ts">
	import { onMount } from 'svelte';
	import createGlobe from 'cobe';

	interface PulseMarker {
		id: string;
		location: [number, number];
		delay: number;
	}

	const defaultMarkers: PulseMarker[] = [
		{ id: 'pulse-1', location: [51.51, -0.13], delay: 0 },
		{ id: 'pulse-2', location: [40.71, -74.01], delay: 0.5 },
		{ id: 'pulse-3', location: [35.68, 139.65], delay: 1 },
		{ id: 'pulse-4', location: [-33.87, 151.21], delay: 1.5 }
	];

	export let markers: PulseMarker[] = defaultMarkers;
	export let className: string = '';
	export let speed: number = 0.003;

	let canvasRef: HTMLCanvasElement;
	let pointerInteracting: { x: number; y: number } | null = null;
	let dragOffset = { phi: 0, theta: 0 };
	let phiOffset = 0;
	let thetaOffset = 0;
	let isPaused = false;

	const handlePointerDown = (e: PointerEvent) => {
		pointerInteracting = { x: e.clientX, y: e.clientY };
		if (canvasRef) canvasRef.style.cursor = 'grabbing';
		isPaused = true;
	};

	const handlePointerUp = () => {
		if (pointerInteracting !== null) {
			phiOffset += dragOffset.phi;
			thetaOffset += dragOffset.theta;
			dragOffset = { phi: 0, theta: 0 };
		}
		pointerInteracting = null;
		if (canvasRef) canvasRef.style.cursor = 'grab';
		isPaused = false;
	};

	const handlePointerMove = (e: PointerEvent) => {
		if (pointerInteracting !== null) {
			dragOffset = {
				phi: (e.clientX - pointerInteracting.x) / 300,
				theta: (e.clientY - pointerInteracting.y) / 1000
			};
		}
	};

	onMount(() => {
		if (!canvasRef) return;

		const canvas = canvasRef;
		let globe: ReturnType<typeof createGlobe> | null = null;
		let animationId: number;
		let phi = 0;

		function init() {
			const width = canvas.offsetWidth;
			if (width === 0 || globe) return;

			globe = createGlobe(canvas, {
				devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
				width,
				height: width,
				phi: 0,
				theta: 0.2,
				dark: 1,
				diffuse: 1.5,
				mapSamples: 16000,
				mapBrightness: 10,
				baseColor: [0.5, 0.5, 0.5],
				markerColor: [0.2, 0.8, 0.9],
				glowColor: [0.05, 0.05, 0.05],
				markerElevation: 0,
				markers: markers.map((m) => ({ location: m.location, size: 0.025, id: m.id })),
				arcs: [],
				arcColor: [0.3, 0.85, 0.95],
				arcWidth: 0.5,
				arcHeight: 0.25,
				opacity: 0.7
			});

			function animate() {
				if (!isPaused) phi += speed;
				globe!.update({
					phi: phi + phiOffset + dragOffset.phi,
					theta: 0.2 + thetaOffset + dragOffset.theta
				});
				animationId = requestAnimationFrame(animate);
			}

			animate();
			setTimeout(() => canvas && (canvas.style.opacity = '1'));
		}

		if (canvas.offsetWidth > 0) {
			init();
		} else {
			const ro = new ResizeObserver((entries) => {
				if (entries[0]?.contentRect.width > 0) {
					ro.disconnect();
					init();
				}
			});
			ro.observe(canvas);
		}

		window.addEventListener('pointermove', handlePointerMove, { passive: true });
		window.addEventListener('pointerup', handlePointerUp, { passive: true });

		return () => {
			if (animationId) cancelAnimationFrame(animationId);
			if (globe) globe.destroy();
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('pointerup', handlePointerUp);
		};
	});
</script>

<div class={`relative aspect-square select-none ${className}`}>
	<style>
		@keyframes pulse-expand {
			0% {
				transform: scaleX(0.3) scaleY(0.3);
				opacity: 0.8;
			}
			100% {
				transform: scaleX(1.5) scaleY(1.5);
				opacity: 0;
			}
		}
	</style>

	<canvas
		bind:this={canvasRef}
		on:pointerdown={handlePointerDown}
		style={{
			width: '100%',
			height: '100%',
			cursor: 'grab',
			opacity: 0,
			transition: 'opacity 1.2s ease',
			borderRadius: '50%',
			touchAction: 'none'
		}}
	></canvas>

	{#each markers as m (m.id)}
		<div
			style={{
				position: 'absolute',
				bottom: 'anchor(center)',
				left: 'anchor(center)',
				translate: '-50% 50%',
				width: '40px',
				height: '40px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				pointerEvents: 'none',
				opacity: `var(--cobe-visible-${m.id}, 0)`,
				filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
				transition: 'opacity 0.4s, filter 0.4s'
			}}
		>
			<span
				style={{
					position: 'absolute',
					inset: 0,
					border: '2px solid #33ccdd',
					borderRadius: '50%',
					opacity: 0,
					animation: `pulse-expand 2s ease-out infinite ${m.delay}s`
				}}
			></span>
			<span
				style={{
					position: 'absolute',
					inset: 0,
					border: '2px solid #33ccdd',
					borderRadius: '50%',
					opacity: 0,
					animation: `pulse-expand 2s ease-out infinite ${m.delay + 0.5}s`
				}}
			></span>
			<span
				style={{
					width: '10px',
					height: '10px',
					background: '#33ccdd',
					borderRadius: '50%',
					boxShadow: '0 0 0 3px #111, 0 0 0 5px #33ccdd'
				}}
			></span>
		</div>
	{/each}
</div>
