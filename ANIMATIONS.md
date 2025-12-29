# Animation System Documentation

## Overview

The portfolio includes a comprehensive animation system with:
- **Asteroid/Meteor Particle Background** - 3D space scene with animated asteroids and meteors
- **Scroll Animations** - GSAP ScrollTrigger powered reveal animations
- **Hover Effects** - Various interactive hover animations throughout
- **Smooth Scrolling** - Lenis smooth scroll implementation

## Asteroid/Meteor Background

Located in `components/particles/asteroid-background.tsx`

### Features:
- 15 randomly positioned asteroids with organic shapes
- 8 meteors with glowing trails
- 2000 star particles in background
- Dynamic camera movement
- Pulsing glow effects on asteroids
- Smooth 60fps performance

### Customization:
- Adjust `asteroidCount` and `meteorCount` for more/less objects
- Modify `size` ranges for different asteroid sizes
- Change colors in material definitions
- Adjust velocity for speed variations

## Scroll Animations

Located in `lib/scroll-animations.tsx`

### Available Hooks:

1. **useFadeInUp** - Fade in from bottom
2. **useFadeInLeft** - Fade in from left
3. **useFadeInRight** - Fade in from right
4. **useScaleIn** - Scale in with bounce
5. **useRotateIn** - Rotate in with elastic effect
6. **useTextReveal** - Character-by-character text reveal
7. **useParallax** - Parallax scrolling effect
8. **useStaggerChildren** - Stagger animation for child elements

### Usage Example:
```tsx
import { useFadeInUp } from '@/lib/scroll-animations'

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null)
  useFadeInUp(ref, 0.2) // delay of 0.2s
  
  return <div ref={ref}>Content</div>
}
```

### ScrollReveal Component:
```tsx
import { ScrollReveal } from '@/components/animations/scroll-reveal'

<ScrollReveal delay={0.3}>
  <h1>This will fade in on scroll</h1>
</ScrollReveal>
```

## Hover Animations

Located in `lib/hover-animations.ts`

### Available Functions:

1. **apply3DTilt** - 3D tilt effect based on mouse position
2. **applyMagneticEffect** - Magnetic pull effect
3. **applyGlowPulse** - Glowing pulse on hover
4. **applyShineEffect** - Shine sweep animation
5. **applyRippleEffect** - Ripple on click
6. **applyFloatAnimation** - Continuous float animation
7. **applyGlitchEffect** - Glitch effect on hover

### Usage Example:
```tsx
import { apply3DTilt, applyGlowPulse } from '@/lib/hover-animations'

useEffect(() => {
  if (ref.current) {
    const cleanup1 = apply3DTilt(ref.current)
    const cleanup2 = applyGlowPulse(ref.current, '#00f0ff')
    return () => {
      cleanup1()
      cleanup2()
    }
  }
}, [])
```

### HoverCard Component:
```tsx
import { HoverCard } from '@/components/animations/hover-card'

<HoverCard glowColor="#00f0ff">
  <div>Content with 3D tilt and glow</div>
</HoverCard>
```

## Smooth Scrolling

Implemented using Lenis library in `components/smooth-scroll.tsx`

### Features:
- Buttery smooth scrolling
- Configurable easing
- Touch support
- Performance optimized

## Applied Throughout Site

### Home Page:
- Hero section: Fade in animations
- About preview: Staggered card animations
- Featured projects: 3D tilt hover cards
- Skills matrix: Scale in with glow effects

### Projects Page:
- Category filters: Magnetic buttons
- Project cards: 3D tilt + glow
- Staggered reveal animations

### Other Pages:
- Scroll reveal on all sections
- Hover effects on cards and buttons
- Magnetic buttons for CTAs
- Ripple effects on clicks

## Performance Tips

1. Use `will-change` CSS property for animated elements
2. Limit particle count for mobile devices
3. Use `transform` and `opacity` for animations (GPU accelerated)
4. Debounce scroll events when needed
5. Use `requestAnimationFrame` for smooth animations

## Customization

### Change Animation Speeds:
Modify `duration` values in GSAP animations

### Change Hover Intensity:
Adjust `strength` parameter in magnetic effects

### Add New Animations:
Create new functions in `lib/hover-animations.ts` following existing patterns

### Disable Animations:
Set `prefers-reduced-motion` media query support:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

