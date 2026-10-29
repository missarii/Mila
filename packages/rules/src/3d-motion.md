# Mila 3D Motion & Spatial UI Guide

Building high-craft 3D motion websites (like Linear, Apple, Stripe, and HorizonX) with AI coding agents requires a balanced, tiered approach to prevent GPU throttling and sluggish mobile experiences.

---

## The 4 Tiers of 3D Motion in Mila

### Tier 1: Hardware-Accelerated CSS 3D (Zero Dependency)
- **What it is:** Pure CSS 3D perspective, `transform-style: preserve-3d`, mouse-following parallax, and concentric depth layers (`translateZ`).
- **Examples in Mila:**
  - `tilt-3d-card`: Uses `perspective(1000px)`, dynamic rotation matrix (`rotateX`, `rotateY`), and dynamic light glare reflection.
- **Performance:** Runs at native 60–120fps directly on the browser's compositor thread without triggering layout reflows.
- **When to use:** Cards, feature badges, interactive buttons, modal presentations.

### Tier 2: Canvas & WebGL Mathematical Shaders (Zero Dependency)
- **What it is:** High-performance HTML5 2D/WebGL Canvas using mathematical 3D perspective projections (`x * (fov / (fov + z))`).
- **Examples in Mila:**
  - `particle-wave-3d`: Dynamic 3D wireframe terrain with mouse-orbit camera rotation, responsive damping, and sine/cosine wave physics.
- **Performance:** Lightweight, zero external bundle overhead (no Three.js required for simple particle fields or waves).
- **When to use:** Hero section backdrops, landing page ambient environments, interactive data grids.

### Tier 3: React Three Fiber (R3F) & Three.js (Full 3D Environments)
- **What it is:** Full WebGL rendering engine with real lighting, PBR materials, shadows, and GLTF/GLB 3D model loaders.
- **How to prompt your agent with Mila:**
  > *"Using Mila's 60-30-10 dark palette (`bg-neutral-950`), set up a React Three Fiber canvas with a glowing wireframe torus and ambient spot lighting."*
- **Recommended Stack:**
  - `three`
  - `@react-three/fiber`
  - `@react-three/drei` (Float, MeshDistortMaterial, PresentationControls)
- **When to use:** 3D product visualizers, interactive hardware/device showcases, spatial interactive games.

### Tier 4: Spline 3D Integration (No-Code to Web)
- **What it is:** Pre-designed 3D interactive models crafted in Spline, exported and controlled natively via React.
- **How to use with Mila:**
  Install `@splinetool/react-spline` and combine with Mila's `FloatingNavbar` and `BentoGrid` for a hybrid 2D/3D interface.

---

## 3D Motion Rules for AI Coding Agents

1. **Always Respect `prefers-reduced-motion`:**
   Disable continuous 3D camera loops and aggressive tilt transformations when users have accessibility motion reduction enabled:
   ```css
   @media (prefers-reduced-motion: reduce) {
     .tilt-card { transform: none !important; }
   }
   ```
2. **Promote to GPU Compositor:**
   Always declare `will-change: transform` and `transform: translateZ(0)` to prevent CPU rasterization bottlenecks.
3. **Dampen Mouse Coordinates:**
   Never tie 3D rotation directly to raw cursor `e.clientX`. Always use linear interpolation (lerp) or cubic-bezier damping to avoid twitchy motion:
   ```ts
   currentX += (targetX - currentX) * 0.05;
   ```
4. **Mobile Battery Safeguard:**
   On viewports `< 768px`, cap canvas particle densities by 50% and disable heavy gyro tilt to preserve mobile battery life.
