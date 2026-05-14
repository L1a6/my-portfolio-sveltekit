<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import About from '$lib/components/About.svelte';
  import MyApproach from '$lib/components/MyApproach.svelte';
  import Testimonials from '$lib/components/Testimonials.svelte';
  import GlobalCanvas from '$lib/components/Globe.svelte';
  import CTA from '$lib/components/CTA.svelte';
  import Footer from '$lib/components/Footer.svelte';
    import Globe from '$lib/components/Globe.svelte';
</script>

<svelte:head>
  <title>Larry David — Full Stack Developer</title>
</svelte:head>

<Hero />
<Skills />
<Projects />
<About />
<MyApproach />
<Testimonials />
<Globe />
<CTA />
<Footer />
