# Architectural Debt & Conflict Matrix

This document maps the specific conflicts between the legacy CRM codebase implementation and the target "Nexus Overview" design system and Next.js 16/React 19 reference architecture.

## 1. Global Styling & Theming Conflicts

| Component/File | Legacy Implementation | Target Architecture (Nexus) | Resolution Plan |
| :--- | :--- | :--- | :--- |
| `globals.css` | Uses `oklch` and standard Tailwind classes for shadows and borders. | Strict achromatic scale (`hsl`); `0px 0px 0px 1px rgba(0,0,0,0.08)` shadow-as-border. | Rewrite CSS variables to pure HSL; eliminate `border` classes in favor of shadow utilities. |
| `layout.tsx` (Root) | Hardcodes `colorPrimary` and fonts in ClerkProvider. | Reads dynamic, strict design tokens from centralized configuration. | Move Clerk appearance configuration to a dedicated file using parsed CSS variables. |
| `layout.tsx` (Dashboard) | Imperative conditional classes for sticky nav; uses non-standard `DotMatrixBackground`. | Framer Motion layout shifts; strict Tier 1-3 glassmorphism backgrounds. | Refactor dashboard shell to use declarative framer-motion wrappers and standard surface variables. |
| Typography | Standard `Geist` tracking. | Aggressively minified tracking (`-2.4px` to `-2.88px`) for large metrics. | Apply tracking utilities globally or via specialized Text components. |

## 2. State & Data Fetching Conflicts

| Component/File | Legacy Implementation | Target Architecture (Nexus) | Resolution Plan |
| :--- | :--- | :--- | :--- |
| `tna-tracker/page.tsx` | Mixes static hardcoded mock data (`tnaData`) with dynamic queries in a single file. | Strict colocation; pure server-component data fetching passed down to client-interactive views. | Strip mock data; implement Server Component data fetching and pass to a client-side visualization component. |
| `pipeline-activity.tsx` | Hardcoded `pipelineChartValues`; static SVG patterns injected. | TanStack Query for dynamic data; CSS variable-bound patterns for theme reactivity. | Move chart values to API; bind SVG fill/stroke to `hsl(var(--...))` tokens. |
| `finance/page.tsx` | `ExportButton` relies on hardcoded `transactionsData` array. | API-driven CSV/PDF exports or dynamic prop passing from server. | Connect export utilities to real data fetching endpoints. |

## 3. Component Architecture Conflicts

| Component/File | Legacy Implementation | Target Architecture (Nexus) | Resolution Plan |
| :--- | :--- | :--- | :--- |
| `tna-stage-pipeline.tsx` | Duplicates stage definitions; creates custom `nodeStyles` and `cardStyles` dictionaries. | Maps stage defs from the global `order` context; relies purely on standard utility classes. | Refactor to use shared `Order` types and native Shadcn/Tailwind utility classes. |
| `app-sidebar.tsx` | Standard generic icons; lacks interactive micro-animations. | Strict weight/size constraints on icons; spring physics on hover states. | Update icons to match design spec; wrap Nav items in Framer Motion components with `stiffness: 300, damping: 24`. |

---

## Refactoring Strategy (Phase 4 Readiness)

The matrix reveals that the highest priority debt is **Visual-First Hardcoding**. The immediate refactoring steps are:
1. **Purge OKLCH:** Rewrite `globals.css` to strict HSL.
2. **Purge Borders:** Globally replace standard borders with the shadow-as-border technique.
3. **Decouple Data:** Remove static arrays from TNA and Finance pages, replacing them with TanStack queries or Server Components.
4. **Motion Enhancement:** Inject spring physics into the sidebar and KPI grids.
