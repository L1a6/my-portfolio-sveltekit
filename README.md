# Larry David — Interactive Developer Portfolio

> A highly interactive, visually immersive developer portfolio built with **SvelteKit** + **TailwindCSS**. Engineered to feel like an experience, not just a page.

🔗 **Live Demo:** [your-deployed-url.vercel.app](#)
📁 **GitHub:** [github.com/L1a6/larry-portfolio](#)

---

## 🚀 Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/L1a6/larry-portfolio.git
cd larry-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗 Architecture

```
larry-portfolio/
├── static/                        # All static assets (images, cv, favicon)
│   ├── hero.png
│   ├── about-image.jpg
│   ├── cv.pdf
│   ├── testimonials1-3.jpg
│   └── images/
└── src/
    ├── app.html                   # HTML shell — Google Fonts loaded here
    ├── app.css                    # Tailwind directives + global custom styles
    ├── lib/
    │   ├── data.ts                # Single source of truth — all portfolio content
    │   ├── theme.ts               # Svelte writable store — dark/light with localStorage
    │   └── components/
    │       ├── Navbar.svelte      # Fixed pill-nav, theme toggle, mobile menu
    │       ├── Hero.svelte        # Landing — avatar, rotating tech stack, social links
    │       ├── Skills.svelte      # Infinite CSS marquee — tech logo slider
    │       ├── Projects.svelte    # Accordion project showcase with expand/collapse
    │       ├── About.svelte       # About section — image + skills breakdown
    │       ├── GlobeCanvas.svelte # WebGL interactive globe (cobe) — 3D/WebGL feature
    │       ├── Globe.svelte       # Global Reach landing section — wraps GlobeCanvas
    │       ├── MyApproach.svelte  # 4-step process — Plan, Build, Test, Deploy
    │       ├── Testimonials.svelte# Testimonial carousel with fade transitions
    │       ├── CTA.svelte         # Call-to-action — let's work together
    │       └── Footer.svelte      # Footer with social links
    └── routes/
        ├── +layout.svelte         # Root layout — Navbar wraps all pages
        ├── +page.svelte           # Home — all sections composed here
        ├── +error.svelte          # 404 page
        ├── contact/
        │   └── +page.svelte       # Contact page — form with validation
        └── skills/
            └── +page.svelte       # Full skills & tech radar page
```

---

## ✨ Features

### Core Sections
- **Hero** — Animated entrance, rotating tech stack ticker, avatar with live status badge, social links, CV download
- **Tech Stack** — Infinite GPU-accelerated marquee of framework logos
- **Projects** — Accordion-style showcase; each card expands to reveal screenshot, description, tech stack, live + GitHub links
- **About** — Split layout with portrait image, skill categories, resume CTA
- **Global Reach** — Interactive 3D WebGL globe (see below)
- **My Approach** — Clickable 4-step process cards (Plan → Build → Test → Deploy)
- **Testimonials** — Auto-advancing carousel with fade transitions and dot navigation
- **Contact** — Full contact page with validated form, social links, location

### 🌍 3D / WebGL Creative Feature — Interactive Globe
As required by the Stage 5b brief, this portfolio implements a **3D / WebGL integration** as the chosen advanced creative feature.

Built using [**cobe**](https://github.com/shuding/cobe) — a lightweight WebGL globe library:

- Fully interactive — drag to rotate in any direction
- **Theme-aware** — globe colours match the active theme seamlessly:
  - Light mode → `baseColor [0.95]`, blends into white background
  - Dark mode → `baseColor [0.08]`, blends into `#080808` background
  - A `MutationObserver` watches the `<html>` class for `.dark` and re-initialises the globe instantly on theme toggle
- City markers rendered natively inside WebGL — rotate with the globe, hide naturally behind it, reappear on the other side
- Marker colour: cyan `[0.2, 0.8, 0.9]` — subtle pop of colour on both themes
- Cities represented: Lagos, London, New York, Tokyo, Sydney
- **Responsive** — canvas scales to container width at all breakpoints (mobile / tablet / desktop)
- Zero CSS overlay hacks — everything lives inside the WebGL canvas

---

## 🎨 Animation Decisions

| Animation | Technique | Reason |
|---|---|---|
| Section entrances | CSS `opacity` + `transform` via `IntersectionObserver` | Native, no library, performant |
| Project accordion | Svelte built-in `slide` transition | Smooth height animation, accessible |
| Testimonial carousel | Svelte built-in `fade` transition | Clean cross-dissolve |
| Tech logo marquee | CSS `@keyframes` + `transform: translateX` | GPU-accelerated, no JS needed |
| Hero tech stack rotation | `setInterval` + Svelte `$state` | Lightweight, no dependency |
| Globe rotation | `requestAnimationFrame` loop via cobe | 60fps WebGL, no layout thrash |
| Theme switch | CSS custom properties on `:root` | Zero JS paint, instant |
| Staggered list reveals | Inline `transition-delay` per item | Simple, readable, effective |

---

## ⚡ Performance Optimization

- **Lazy loading** — all images below the fold use `loading="lazy"`
- **Dynamic import** for `cobe` — globe library only loads when the section enters the viewport
- **CDN-hosted logos** — devicons served from jsDelivr, zero bundle impact
- **CSS-only animations** — no GSAP or Framer Motion; transitions handled natively
- **IntersectionObserver** — animations trigger on scroll entry, not on a global scroll listener
- **SvelteKit static adapter** — full static generation ready, zero server needed
- **CSS custom properties** for theming — no class toggling causes repaints
- **`ResizeObserver`** on globe canvas — initialises only when the element has a real width, prevents wasted renders on hidden elements
- **Font subsetting** via Google Fonts — only weights used are loaded (Syne 400–800, DM Sans 300–600)

---

## ♿ Accessibility

- Semantic HTML throughout — `<nav>`, `<main>`, `<section>`, `<footer>`, `<form>`
- All icon-only buttons have `aria-label`
- Keyboard navigable — all interactive elements are focusable in logical tab order
- Visible focus states on all controls
- Form inputs have associated `<label>` elements
- Form validation with clear inline error messages
- `alt` text on every meaningful image
- Colour contrast maintained in both light and dark themes (WCAG AA)
- Mobile touch targets meet minimum 44×44px guideline
- `touch-action: none` on globe canvas prevents scroll hijacking on mobile

---

## 🌗 Theme System

- Defaults to **light mode** on first visit
- User preference saved to `localStorage` — persists across sessions
- Toggle available in navbar on all pages
- Globe, all components, and CSS custom properties all respond to theme change instantly

---

## 📱 Responsive Breakpoints

| Breakpoint | Behaviour |
|---|---|
| Mobile `< 768px` | Single column, mobile nav menu, globe centred and capped at 300px |
| Tablet `768px` | Two-column grid activates for About, Globe, Approach sections |
| Desktop `> 1024px` | Full layout, max-width 3xl (768px) content container, side annotations visible |

---

## 🔄 Trade-offs Made

1. **No backend** — Contact form simulates submission with a 1.2s delay + success state. For production: wire to [Resend](https://resend.com), [Formspree](https://formspree.io), or a SvelteKit `+page.server.ts` action.
2. **Static data** — All project/skill/testimonial content lives in `src/lib/data.ts`. Easy to replace with a Supabase fetch inside a `+page.server.ts` load function when needed.
3. **CSS Anchor Positioning not used for globe markers** — The original React component used experimental CSS Anchor Positioning (`position-anchor`) which has limited browser support (Chrome 125+ only). The Svelte version uses COBE's native WebGL markers instead — broader compatibility with identical visual result.
4. **Fonts via CDN** — Google Fonts used for simplicity. For offline-first or maximum performance, self-host with `@fontsource/syne` etc.
5. **No Lottie** — `.lottie` animation files are present in `static/animations/` but not rendered. Add `@lottiefiles/svelte-lottie-player` if desired.

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npx vercel
```

### Netlify
Connect GitHub repo → Build command: `npm run build` → Publish directory: `.svelte-kit/output/client`

Or use the official adapter:
```bash
npm install @sveltejs/adapter-netlify
```

### Cloudflare Pages
```bash
npm install @sveltejs/adapter-cloudflare
```
Build command: `npm run build` → Output: `.svelte-kit/output/client`

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `@sveltejs/kit` | Framework |
| `svelte` | UI library |
| `tailwindcss` | Utility CSS |
| `cobe` | WebGL interactive globe |
| `lucide-svelte` | Icons |
| `typescript` | Type safety |
| `vite` | Build tool |

---

## 👤 Author

**Larry David**
Full Stack Developer

- GitHub: [@L1a6](https://github.com/L1a6)
- LinkedIn: [linkedin.com/in/larrydavid](https://linkedin.com/in/larrydavid)
- X: [@larrydaves2](https://x.com/larrydaves2)
- Email: larrydavid7730@gmail.com
-