# Animation System Design — Muse Bar

## Context

The Muse Bar website has a vintage/luxury aesthetic (gold on dark) but currently lacks meaningful animations. Existing code has basic CSS transitions on hover states and a generic `animate-bounce` on the scroll indicator. The goal is to add a subtle, elegant animation layer that reinforces the brand's refined feel — and to build it as reusable primitives so every future page benefits without custom animation code.

## Decisions

- **Library:** Framer Motion (declarative API, handles enter/exit, scroll-triggered reveals)
- **Style:** Subtle & elegant — slow fade-ins, gentle parallax, smooth reveals
- **Scope:** Reusable animation components + home page refactor + page transitions

## Animation Components

Location: `src/components/animations/`

### FadeIn
- Wraps any element for scroll-triggered reveal
- Props: `direction` (up/down/left/right), `delay`, `duration`, `className`
- Uses `whileInView` with `viewport={{ once: true, amount: 0.2 }}`

### StaggerChildren
- Wraps a group of `FadeIn` children; each child animates in sequence
- Props: `staggerDelay` (default 0.15s), `className`

### RevealText
- Heading text reveal — splits into words, each fades + slides up
- Props: `delay`, `className`

### PageTransition
- Wraps page content in `template.tsx` for route change animations
- Fade out (0.2s) → fade in (0.4s) on navigation

## Animation Tokens

Location: `src/lib/animations.ts`

```ts
export const animation = {
  duration: { fast: 0.3, normal: 0.6, slow: 0.8 },
  easing: [0.25, 0.1, 0.25, 1],
  viewport: { once: true, amount: 0.2 },
}
```

## Home Page Refactor

### Hero Section
- "TBILISI" label: FadeIn delay 0.2s
- "MUSE" heading: FadeIn with slight scale, delay 0.4s
- Gold divider: expand from center, delay 0.6s
- Subtitle: FadeIn delay 0.8s
- CTA buttons: StaggerChildren delay 1.0s
- Scroll indicator: custom subtle pulse (replace animate-bounce)

### Events Preview (scroll-triggered)
- Label, title, divider, subtitle: StaggerChildren
- CTA button: FadeIn last

### About Section (scroll-triggered)
- Text block: FadeIn from left
- Image: FadeIn from right

### Header
- Mobile menu: AnimatePresence for slide-down enter/exit (not instant toggle)

### Footer
- 3 columns: StaggerChildren on scroll

## Page Transitions
- Implemented via `[locale]/template.tsx` (Next.js re-mounts template on navigation)
- AnimatePresence + motion.div wrapping children
- Fade transition: exit 0.2s, enter 0.4s

## What This Enables
Every future page (events, menu, about, gallery, contact) wraps sections in `<FadeIn>` and `<StaggerChildren>`. No per-page animation code needed.
