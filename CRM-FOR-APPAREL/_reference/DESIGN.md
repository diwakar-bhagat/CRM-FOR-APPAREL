---
version: "alpha"
name: "Nexus Overview"
description: "Nexus Overview Dashboard Section is designed for demonstrating application workflows and interface hierarchy. Key features include clear information density, modular panels, and interface rhythm. It is suitable for product showcases, admin panels, and analytics experiences."
colors:
  primary: "#00F0FF"
  secondary: "#FFFFFF"
  tertiary: "#0A45FF"
  neutral: "#FFFFFF"
  background: "#FFFFFF"
  surface: "#0A0A0A"
  text-primary: "#737373"
  text-secondary: "#A3A3A3"
  border: "#404040"
  accent: "#00F0FF"
typography:
  headline-lg:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "16px"
    letterSpacing: "0.025em"
    textTransform: "uppercase"
  body-md:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
  label-md:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
    letterSpacing: "0.3px"
rounded:
  full: "9999px"
spacing:
  base: "4px"
  sm: "2px"
  md: "3px"
  lg: "4px"
  xl: "6px"
  gap: "4px"
  card-padding: "12px"
  section-padding: "32px"
components:
  button-primary:
    backgroundColor: "#262626"
    textColor: "{colors.secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "6px"
  button-link:
    textColor: "{colors.text-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "6px"
---

## Overview

- **Composition cues:**
  - Layout: Grid
  - Content Width: Full Bleed
  - Framing: Glassy
  - Grid: Strong

## Colors

The color system uses dark mode with #00F0FF as the main accent and #FFFFFF as the neutral foundation.

- **Primary (#00F0FF):** Main accent and emphasis color.
- **Secondary (#FFFFFF):** Supporting accent for secondary emphasis.
- **Tertiary (#0A45FF):** Reserved accent for supporting contrast moments.
- **Neutral (#FFFFFF):** Neutral foundation for backgrounds, surfaces, and supporting chrome.

- **Usage:** Background: #FFFFFF; Surface: #0A0A0A; Text Primary: #737373; Text Secondary: #A3A3A3; Border: #404040; Accent: #00F0FF

## Typography

Typography relies on Inter across display, body, and utility text.

- **Headlines (`headline-lg`):** Inter, 12px, weight 500, line-height 16px, letter-spacing 0.025em, uppercase.
- **Body (`body-md`):** Inter, 12px, weight 400, line-height 16px.
- **Labels (`label-md`):** Inter, 12px, weight 400, line-height 16px, letter-spacing 0.3px.

## Layout

Layout follows a grid composition with reusable spacing tokens. Preserve the grid, full bleed structural frame before changing ornament or component styling. Use 4px as the base rhythm and let larger gaps step up from that cadence instead of introducing unrelated spacing values.

Treat the page as a grid / full bleed composition, and keep that framing stable when adding or remixing sections.

- **Layout type:** Grid
- **Content width:** Full Bleed
- **Base unit:** 4px
- **Scale:** 2px, 3px, 4px, 6px, 8px, 12px, 16px, 20px
- **Section padding:** 32px
- **Card padding:** 12px, 16px, 20px, 32px
- **Gaps:** 4px, 8px, 12px, 16px

## Elevation & Depth

Depth is communicated through glass, border contrast, and reusable shadow or blur treatments. Keep those recipes consistent across hero panels, cards, and controls so the page reads as one material system.

Surfaces should read as glass first, with borders, shadows, and blur only reinforcing that material choice.

- **Surface style:** Glass
- **Borders:** 1px #FFFFFF; 1px #404040; 1px #525252; 1px #030303
- **Shadows:** rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(255, 255, 255, 0.4) 0px 0px 8px 0px
- **Blur:** 24px, 12px

### Techniques
- **Gradient border shell:** Use a thin gradient border shell around the main card. Wrap the surface in an outer shell with 0px padding and a 0px radius. Drive the shell with none so the edge reads like premium depth instead of a flat stroke. Keep the actual stroke understated so the gradient shell remains the hero edge treatment. Inset the real content surface inside the wrapper with a slightly smaller radius so the gradient only appears as a hairline frame.

## Shapes

Shapes rely on a tight radius system anchored by 3px and scaled across cards, buttons, and supporting surfaces. Icon geometry should stay compatible with that soft-to-controlled silhouette.

Use the radius family intentionally: larger surfaces can open up, but controls and badges should stay within the same rounded DNA instead of inventing sharper or pill-only exceptions.

- **Corner radii:** 3px, 4px, 8px, 16px, 9999px
- **Icon treatment:** Linear
- **Icon sets:** Solar

## Components

Anchor interactions to the detected button styles.

### Buttons
- **Primary:** background #262626, text #FFFFFF, radius 9999px, padding 6px, border 1px solid rgba(255, 255, 255, 0.05).
- **Links:** text #A3A3A3, radius 9999px, padding 6px, border 0px solid rgb(229, 231, 235).

### Iconography
- **Treatment:** Linear.
- **Sets:** Solar.

## Do's and Don'ts

Use these constraints to keep future generations aligned with the current system instead of drifting into adjacent styles.

### Do
- Do use the primary palette as the main accent for emphasis and action states.
- Do keep spacing aligned to the detected 4px rhythm.
- Do reuse the Glass surface treatment consistently across cards and controls.
- Do keep corner radii within the detected 3px, 4px, 8px, 16px, 9999px family.

### Don't
- Don't introduce extra accent colors outside the core palette roles unless the page needs a new semantic state.
- Don't mix unrelated shadow or blur recipes that break the current depth system.
- Don't exceed the detected moderate motion intensity without a deliberate reason.

## Motion

Motion feels controlled and interface-led across text, layout, and section transitions. Timing clusters around 150ms and 2000ms. Easing favors ease and cubic-bezier(0.4. Hover behavior focuses on text and color changes.

**Motion Level:** moderate

**Durations:** 150ms, 2000ms

**Easings:** ease, cubic-bezier(0.4, 0, 1), 0.2, 0.6

**Hover Patterns:** text, color, stroke

## WebGL

Reconstruct the graphics as a full-bleed background field using custom shaders. The effect should read as technical, meditative, and atmospheric: dot-matrix particle field with black and sparse spacing. Build it from dot particles + soft depth fade so the effect reads clearly. Animate it as slow breathing pulse. Interaction can react to the pointer, but only as a subtle drift. Preserve dom fallback.

**Id:** webgl

**Label:** WebGL

**Stack:** WebGL

**Insights:**
  - **Scene:**
    - **Value:** Full-bleed background field
  - **Effect:**
    - **Value:** Dot-matrix particle field
  - **Primitives:**
    - **Value:** Dot particles + soft depth fade
  - **Motion:**
    - **Value:** Slow breathing pulse
  - **Interaction:**
    - **Value:** Pointer-reactive drift
  - **Render:**
    - **Value:** custom shaders

**Techniques:** Dot matrix, Breathing pulse, Pointer parallax, Shader gradients, Noise fields

**Code Evidence:**
  - **HTML reference:**
    - **Language:** html
    - **Snippet:**
      ```html
      <!-- Dither Background Shader Canvas -->
      <canvas id="dither-bg" class="fixed inset-0 w-full h-full z-0 pointer-events-none"></canvas>

      <!-- App Wrapper -->
      ```
  - **JS reference:**
    - **Language:** js
    - **Snippet:**
      ```
      attribute vec2 position;
              void main() {
                  gl_Position = vec4(position, 0.0, 1.0);
              }
          `;
          const vs = gl.createShader(gl.VERTEX_SHADER);
          gl.shaderSource(vs, vsCode);
      …
      ```
  - **Draw call:**
    - **Language:** js
    - **Snippet:**
      ```
      -1.0,  1.0,  
           1.0,  1.0
      ]);

      const vbo = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      …
      ```
## WebGL

Reconstruct the graphics as a centered hero scene using webgl, renderer, alpha, antialias, dpr clamp. The effect should read as retro-futurist, technical, and meditative: perspective grid field with green on black and sparse spacing. Build it from grid lines + depth fade so the effect reads clearly. Animate it as slow breathing pulse. Interaction can react to the pointer, but only as a subtle drift. Preserve dom fallback.

**Id:** webgl

**Label:** WebGL

**Stack:** ThreeJS, WebGL

**Insights:**
  - **Scene:**
    - **Value:** Centered hero scene
  - **Effect:**
    - **Value:** Perspective grid field
  - **Primitives:**
    - **Value:** Grid lines + depth fade
  - **Motion:**
    - **Value:** Slow breathing pulse
  - **Interaction:**
    - **Value:** Pointer-reactive drift
  - **Render:**
    - **Value:** WebGL, Renderer, alpha, antialias, DPR clamp

**Techniques:** Perspective grid, Breathing pulse, Pointer parallax, Noise fields, DOM fallback

**Code Evidence:**
  - **HTML reference:**
    - **Language:** html
    - **Snippet:**
      ```html
      <div class="relative aspect-[2.3/1] bg-[#050507] shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/[0.04] mb-12 md:mb-20 overflow-hidden rounded-lg group">
          <canvas id="gl" class="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"></canvas>

          <div class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 border border-neutral-600 bg-white"></div>
      ```
  - **JS reference:**
    - **Language:** html
    - **Snippet:**
      ```html
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
      ```
      ## ThreeJS

Reconstruct the Three.js layer as a centered hero scene with layered spatial depth that feels retro-futurist and technical. Use alpha, antialias, dpr clamp renderer settings, perspective, ~30deg fov, plane geometry, meshstandardmaterial materials, and ambient + directional lighting. Motion should read as timeline-led reveals, with poster frame + dom fallback.

**Id:** threejs

**Label:** ThreeJS

**Stack:** ThreeJS, WebGL

**Insights:**
  - **Scene:**
    - **Value:** Centered hero scene with layered spatial depth
  - **Render:**
    - **Value:** alpha, antialias, DPR clamp
  - **Camera:**
    - **Value:** Perspective, ~30deg FOV
  - **Lighting:**
    - **Value:** ambient + directional
  - **Materials:**
    - **Value:** MeshStandardMaterial
  - **Geometry:**
    - **Value:** plane
  - **Motion:**
    - **Value:** Timeline-led reveals

**Techniques:** PBR shading, Timeline beats, alpha, antialias, DPR clamp, Poster frame + DOM fallback

**Code Evidence:**
  - **HTML reference:**
    - **Language:** html
    - **Snippet:**
      ```html
      <div class="relative aspect-[2.3/1] bg-[#050507] shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/[0.04] mb-12 md:mb-20 overflow-hidden rounded-lg group">
          <canvas id="gl" class="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"></canvas>

          <div class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 border border-neutral-600 bg-white"></div>
      ```
  - **JS reference:**
    - **Language:** html
    - **Snippet:**
      ```html
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
      ```
      ## Motion

Motion feels expressive but remains focused on interface, text, and layout transitions. Timing clusters around 150ms and 300ms. Easing favors ease and 0. Hover behavior focuses on text and color changes. Scroll choreography uses GSAP ScrollTrigger for section reveals and pacing.

**Motion Level:** expressive

**Durations:** 150ms, 300ms, 1500ms

**Easings:** ease, 0, 0.2, 1), cubic-bezier(0.4, cubic-bezier(0

**Hover Patterns:** text, color, stroke, transform

**Scroll Patterns:** gsap-scrolltrigger
## Do's and Don'ts

Use these constraints to keep future generations aligned with the current system instead of drifting into adjacent styles.

**Dos:** Use the primary palette as the main accent for emphasis and action states., Keep spacing aligned to the detected 6px rhythm., Reuse the Glass surface treatment consistently across cards and controls., Keep corner radii within the detected 4px, 8px, 12px, 24px, 9999px family.

**Donts:** Do not introduce extra accent colors outside the core palette roles unless the page needs a new semantic state., Do not mix unrelated shadow or blur recipes that break the current depth system., Do not exceed the detected expressive motion intensity without a deliberate reason.