# Larry David — Portfolio (SvelteKit)

A highly interactive, visually impressive developer portfolio built with **SvelteKit** and **TailwindCSS**, converted from the original Next.js version.

## 🚀 Setup Instructions

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗 Architecture

```
src/
├── app.html          # HTML template with Google Fonts
├── app.css           # Global styles, Tailwind directives, custom animations
├── lib/
│   ├── data.ts       # All portfolio content (projects, skills, testimonials, personal info)
│   ├── theme.ts      # Svelte store for dark/light mode with localStorage persistence
│   └── components/
│       ├── Navbar.svelte       # Fixed navbar with pill-style nav items
│       ├── Hero.svelte         # Landing section with rotating tech stack
│       ├── Skills.svelte       # Infinite marquee tech logo slider
│       ├── Projects.svelte     # Accordion-style project showcase
│       ├── About.svelte        # About section with image parallax
│       ├── MyApproach.svelte   # 4-step process cards
│       ├── Testimonials.svelte # Testimonial carousel
│       ├── CTA.svelte          # Contact call-to-action
│       └── Footer.svelte       # Footer with social links
└── routes/
    ├── +layout.svelte    # Root layout with Navbar
    ├── +page.svelte      # Home page
    ├── +error.svelte     # 404 page
    ├── contact/+page.svelte   # Contact form
    └── skills/+page.svelte    # Full skills page
```

## 🎨 Animation Decisions

- **CSS transitions** for entrance animations (opacity + transform) triggered by IntersectionObserver — keeps it framework-native and performant
- **Svelte `slide` transition** for accordion project expansion — built-in, smooth, accessible
- **Svelte `fade` transition** for testimonial carousel — clean cross-fade
- **CSS `infinite-slider`** animation for the tech stack marquee — GPU-accelerated via `transform`
- **Rotating tech stack** in hero uses a simple `setInterval` with Svelte reactivity
- No heavy GSAP dependency required — transitions feel equally smooth with CSS + Svelte

## ⚡ Performance Optimization

- All images use `loading="lazy"` where not above the fold
- SvelteKit static adapter ready for full static generation
- Tech logos loaded from CDN (devicons) — no bundling overhead
- CSS custom properties for theme switching (no JS paint)
- `IntersectionObserver` for viewport-triggered animations (no scroll listeners)
- `prefers-reduced-motion` respected via CSS transitions (can be disabled via media query)

## ♿ Accessibility

- Semantic HTML throughout (`<nav>`, `<section>`, `<footer>`, `<main>`)
- All interactive elements have `aria-label` or visible text
- Keyboard navigable: all buttons, links, and form fields are focusable
- Color contrast maintained in both dark and light modes
- Form validation with clear error messages
- `alt` text on all images

## 🔄 Trade-offs Made

1. **No backend** — contact form is simulated with a 1.2s delay and success state. For production, wire it to Resend, Formspree, or a SvelteKit API route.
2. **Static project data** — projects are hardcoded in `src/lib/data.ts` instead of fetched from Supabase (backend removed as requested). Easy to re-add with a `+page.server.ts` load function.
3. **No Lottie animations** — `.lottie` files from the original are present in `static/animations/` but not rendered (requires `@lottiefiles/svelte-lottie-player`). Add the dependency if desired.
4. **Fonts via Google Fonts CDN** — Syne + DM Sans + JetBrains Mono. For offline-first, self-host with `fontsource`.

## 🌐 Deployment

Deploy to **Vercel**, **Netlify**, or **Cloudflare Pages**:

**Vercel:**
```bash
npx vercel
```

**Netlify:** Connect GitHub repo, set build command `npm run build`, publish dir `.svelte-kit/output/client` (or use `@sveltejs/adapter-netlify`).
