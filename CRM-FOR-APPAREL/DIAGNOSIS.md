# Codebase Diagnosis & Technical Debt Audit

## Executive Summary
This document provides a comprehensive file-by-file diagnostic of the legacy Pranali ERP codebase (`src/app/(main)/dashboard/*`). The primary goal is to map architectural drift, hardcoded values, and design system violations against the established source of truth (`_reference/workflow.md` and `_reference/DESIGN.md`).

The codebase currently exhibits a pattern of "Visual-First, Logic-Second" debt, where components look complex but rely on hardcoded arrays, inconsistent styling tokens, and mock data rather than the prescribed TanStack Query / Next.js server architecture.

---

## 1. Core Layout & Global Config

### FILE: `src/app/layout.tsx`
**Status:** Rewrite / Modernized
**Purpose:** Root application wrapper and provider injection.
**Modernization Improvements:**
- [x] **ClerkProvider:** Integrated with theme variables.
- [x] **Metadata:** Fixed hardcoded titles; integrated `APP_CONFIG`.
**Architecture Conflicts:**
- The clerk provider appearance is tightly coupled to the layout.
- `PreferencesStoreProvider` takes raw props that could cause hydration mismatches.

### FILE: `src/app/globals.css`
**Status:** Rewrite / In Progress
**Purpose:** CSS variables and Tailwind v4 theme mapping.
**Architecture Conflicts:**
- Uses a mix of HSL and OKLCH which creates an inconsistent color space.
- Violates the Vercel-inspired shadow-as-border philosophy.

---

## 2. Merchandising Modules

### FILE: `src/app/(main)/dashboard/tna-tracker/page.tsx`
**Purpose:** High-level overview of Time & Action stages.
**Development Phase Issues:**
- [x] **Hardcoded Data:** Mixing static data with dynamic queries.
- [x] **Token Bypassing:** Uses direct variable injection instead of proper semantic status tokens.

---

## 3. Supporting Modules (Finance & CRM)

### FILE: `src/app/(main)/dashboard/finance/page.tsx`
**Status:** Modernized
**Purpose:** Financial overview and transaction tracking.
**Improvements:**
- [x] **Currency Localization:** Switched from USD to INR using `formatCurrency`.
- [x] **Chart Scaling:** Recharts data scaled to reflect realistic Indian market values.

---

## 4. Backend & API

### FILE: `src/app/api/command-center/route.ts`
**Status:** Integrated
**Reason:** Caching mechanism is good, but the SQL query was a raw string.
**Improvements:**
- [x] **Redis Integration:** Implemented fast read-path cache for metrics.
- [x] **NeonDB Integration:** Migrated from local JSON to Postgres queries.

---

## Summary and Next Steps

The legacy codebase shows a solid understanding of modern tools (Next.js, Tailwind, Zustand, TanStack Query), but fundamentally violates the overarching design and architectural patterns defined in the references:

1. **Styling Philosophy:** Almost every visual component used traditional CSS borders instead of the mandated `0px 0px 0px 1px rgba(0,0,0,0.08)` shadow-as-border technique. (Partially resolved in Dashboard refresh).
2. **Component Monoliths:** Pages like `orders/page.tsx` and `priority-dashboard.tsx` are massive, mixing state, data fetching, and complex UI rendering.
3. **Data Management:** Too many components relied on hardcoded mock data. This has been addressed in the core Finance and Dashboard modules.

**Implementation Plan (Phase 4):**
1. Overhaul `globals.css` to strictly enforce the Vercel color scale and shadow-border utility classes.
2. Refactor the layout shell to correctly apply themes without hydration mismatches.
3. Break down monolithic components into atomic, collocated modules.
