# 🔗 FULL STACK INTEGRATION MAP
**Repository:** diwakar-bhagat/CRM-FOR-APPAREL  
**Date:** 2026-05-06  
**Status:** Complete Codebase Analysis

---

## 📋 ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js 16 App (Vercel)                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │   UI Components  │  │   Page Routes    │                │
│  │  (shadcn/ui)     │  │  (/app/route)    │                │
│  └──────────────────┘  └──────────────────┘                │
│           ↓                      ↓                          │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │   React Query    │  │   API Routes     │                │
│  │   (useQuery)     │  │  (/api/*)        │                │
│  └──────────────────┘  └──────────────────┘                │
│           ↓                      ↓                          │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  Zustand Store   │  │   Auth Middleware│                │
│  │  (State)         │  │   (Clerk)        │                │
│  └──────────────────┘  └──────────────────┘                │
│           ↓                      ↓                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              API Layer (Server)                      │  │
│  └──────────────────────────────────────────────────────┘  │
│           ↓                      ↓                          │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │   Prisma ORM     │  │   Redis Cache    │                │
│  │   (Database)     │  │   (ioredis)      │                │
│  └──────────────────┘  └──────────────────┘                │
│           ↓                      ↓                          │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  Neon PostgreSQL │  │  RedisLabs       │                │
│  │  (Production DB) │  │  (Cache Layer)   │                │
│  └──────────────────┘  └──────────────────┘                │
│                                                              │
│  Auth Service:          Clerk (External)                   │
│  Validation:            Zod Schemas                        │
│  Export Format:         PDF, XLSX, CSV                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 1️⃣ AUTHENTICATION LAYER (Clerk)

### Current Status: ⚠️ PARTIALLY CONFIGURED

**File:** `src/middleware.ts` - ❌ DOES NOT EXIST  
**Dependencies:** `@clerk/nextjs@7.2.7` - ✅ Installed

### What's Configured ✅
```typescript
// In .env.local and .env.production
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
```

### What's MISSING ❌
**Middleware Protection** - No routes protected!

**File to Create:** `src/middleware.ts`
```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/orders(.*)',
  '/api/dr(.*)',
  '/api/procurement(.*)',
  '/api/notifications(.*)',
  '/api/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)(?:$|[?#])',
    '/api/(.*)',
  ],
};
```

### Clerk User Integration
```typescript
// In API routes, get authenticated user:
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const { userId } = await auth();
  
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  
  // Use userId for audit logs, user context, etc.
}
```

---

## 2️⃣ DATABASE LAYER (Neon + Prisma)

### Current Status: ✅ FULLY CONFIGURED

**Adapter:** `@prisma/adapter-pg` (PrismaPg)  
**Database:** Neon PostgreSQL  
**Connection:** Pooler with max 1 connection (serverless-friendly)

### File Structure
```
prisma/
├── schema.prisma       ✅ 16 models defined
├── seed.ts             ✅ Data seeding with Excel fallback
└── .env               ✅ DATABASE_URL set

src/lib/
└── prisma.ts          ✅ Singleton instance with error handling
```

### Prisma Schema Models
```typescript
// Core Models
Order, Buyer, Unit, ProductionEntry, WeeklyOutput

// Operational Models  
DREntry, RiskFlag, TrimEntry

// Reporting Models
MonthlySummary, MillReport, FobApproval, Design

// Procurement Models
MaterialRequisition, MaterialReqItem

// System Models
Notification, User
```

### Database Operations in Code
```typescript
import { prisma } from '@/lib/prisma';

// Read
const orders = await prisma.order.findMany({
  where: { buyerId },
  include: { buyer: true, unit: true },
  take: 10,
  skip: (page - 1) * 10,
});

// Create
const newOrder = await prisma.order.create({
  data: { orderNo, styleDescription, qty, buyerId, unitId, month },
});

// Update
const updated = await prisma.order.update({
  where: { id },
  data: { remarks, planStatus },
});

// Cache key for Redis
CACHE_KEYS.ORDERS_FILTERED({ buyer, status })
```

### Connection Pooling Info
```typescript
// In src/lib/prisma.ts
const pool = new Pool({
  connectionString,
  max: 1,  // ← Only 1 connection for serverless
});
```

**Why max: 1?** Vercel Functions are stateless and connection pooling across multiple instances causes issues.

---

## 3️⃣ CACHE LAYER (Redis)

### Current Status: ⚠️ PARTIALLY WORKING

**Service:** RedisLabs + Optional Upstash  
**Library:** `ioredis@5.10.1`  
**Issue:** Password placeholder not set

**File:** `src/lib/redis.ts`
```typescript
import Redis from "ioredis";

const createRedisClient = (): CacheClient => {
  if (!process.env.REDIS_URL) {
    // Returns no-op cache if Redis not configured
    return { get: async () => null, set: async () => "OK", ... };
  }

  const client = new Redis(process.env.REDIS_URL, {
    lazyConnect: true,
    maxRetriesPerRequest: 2,
  });

  return {
    get: <T>(key) => client.get(key).then(parseCachedValue),
    set: (key, value, options) => options?.ex 
      ? client.set(key, value, "EX", options.ex)
      : client.set(key, value),
    del: (key) => client.del(key),
    incr: (key) => client.incr(key),
    expire: (key, seconds) => client.expire(key, seconds),
  };
};
```

### Cache Keys Used
```typescript
CACHE_KEYS = {
  PRIORITY_LIST: "priority:list:all",
  PRIORITY_FILTERED: (filter) => `priority:list:${filter}`,
  SYNC_LAST_RUN: "sync:last_run",
  GLOBAL_SETTINGS: "app:settings",
  PRODUCTS_LIST: "products:list:all",
  PRODUCTS_FILTERED: (filter) => `products:list:${filter}`,
  ORDERS_LIST: "orders:list:all",
  ORDERS_FILTERED: (filters) => `orders:list:${filters.buyer}:${filters.status}`,
}

CACHE_TTL = 60 // seconds
SETTINGS_CACHE_TTL = 3600 // 1 hour
```

### How Redis is Used
```typescript
// In API route handlers
import { redis } from '@/lib/redis';

// Get from cache
const cached = await redis.get('orders:list:all');

// Set with expiration
await redis.set(
  'orders:list:all',
  JSON.stringify(orders),
  { ex: 60 } // expires in 60 seconds
);

// Delete cache on mutations
await redis.del(`orders:list:${filter}`);
```

---

## 4️⃣ API LAYER (Route Handlers)

### Current Status: ✅ ROUTES DEFINED, ❌ SOME NOT FULLY WIRED

### API Endpoints Map
```
GET /api/orders
  - Query: ?page=1&limit=20&buyer=H&M&status=Planned
  - Response: { data: Order[], total, page, pages }

POST /api/orders
  - Body: { orderNo, styleDescription, qty, buyerId, unitId, month, ... }
  - Response: { data: Order }

GET /api/orders/[id]
  - Response: { data: Order with relations }

PATCH /api/orders/[id]
  - Body: Partial Order fields
  - Response: { data: Order }

GET /api/dr
  - Query: ?page=1&limit=20&buyerId=xxx&orderNo=xxx
  - Response: { data: DREntry[], total, page, pages }

GET /api/dashboard/highlights
  - Response: { data: { productionFiles, riskAnalysis, ppmReport } }

GET /api/dashboard/mill-highlights
  - Response: { data: { labDipStrikes, fobApprovals } }

GET /api/dashboard/production-highlights
  - Response: { data: { rdSops, embroideryOrders } }

GET /api/notifications
  - Query: ?page=1&limit=10&isRead=false
  - Response: { data: Notification[], unreadCount }

PATCH /api/notifications/[id]
  - Body: { isRead: true }
  - Response: { data: Notification }

GET /api/procurement/material-requisition
  - Query: ?page=1&limit=20
  - Response: { data: MaterialRequisition[], total }

POST /api/procurement/material-requisition
  - Body: { requisitionDate, reqnType, items: [...] }
  - Response: { data: MaterialRequisition }

GET /api/master-summary
  - Query: ?month=2026-05&buyerId=xxx
  - Response: { data: MonthlySummary[] }

GET /api/analytics/monthly-output
  - Query: ?startMonth=2026-01&endMonth=2026-05
  - Response: { data: ChartData[] }
```

### Validation Schemas
**File:** `src/lib/erp-api.ts`
```typescript
// All inputs validated with Zod before DB queries
createOrderSchema, updateOrderSchema
createMaterialRequisitionSchema
updateDrEntrySchema
paginationQuerySchema
```

### Error Response Format
**File:** `src/lib/api-response.ts`
```typescript
// Success
ok<T>(data, meta?) → { data, ...meta } 200
created<T>(data) → { data } 201

// Errors
badRequest(error, issues?) → { error, issues } 400
unauthorized() → { error: "Unauthorized" } 401
forbidden() → { error: "Forbidden" } 403
notFound(resource) → { error: "X not found" } 404
serverError(error) → { error: "Internal server error" } 500
validationError(zodError) → { error, issues } 400
```

---

## 5️⃣ FRONTEND HOOKS (React Query)

### Current Status: ⚠️ INSTALLED, USAGE NOT SHOWN

**Library:** `@tanstack/react-query@5.100.9`  
**Expected Usage Pattern:**

```typescript
// In components
import { useQuery, useMutation } from '@tanstack/react-query';

// Fetch data
const { data, isLoading, error } = useQuery({
  queryKey: ['orders', page, filters],
  queryFn: () => fetch(`/api/orders?page=${page}&buyer=${buyer}`).then(r => r.json()),
  staleTime: 60000, // Cache for 60s
});

// Mutation
const { mutate: createOrder } = useMutation({
  mutationFn: (data) => fetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(r => r.json()),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['orders'] });
    toast('Order created');
  },
});
```

---

## 6️⃣ STATE MANAGEMENT (Zustand)

### Current Status: ✅ INSTALLED, USAGE NOT SHOWN

**Library:** `zustand@5.0.12`  
**Expected Store Pattern:**

```typescript
// Create store: src/store/orders-store.ts
import { create } from 'zustand';

interface OrdersStore {
  filters: { buyer?: string; status?: string; month?: string };
  setFilters: (filters: Partial<OrdersStore['filters']>) => void;
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
}

export const useOrdersStore = create<OrdersStore>((set) => ({
  filters: {},
  setFilters: (filters) => set(state => ({
    filters: { ...state.filters, ...filters }
  })),
  currentOrder: null,
  setCurrentOrder: (order) => set({ currentOrder: order }),
}));

// Use in components
const { filters, setFilters } = useOrdersStore();
```

---

## 7️⃣ VALIDATION LAYER (Zod)

### Current Status: ✅ SCHEMAS DEFINED

**Library:** `zod@4.3.6`  
**File:** `src/lib/erp-api.ts`

### Validation Examples
```typescript
// Parse & validate order creation
const createOrderSchema = z.object({
  orderNo: z.string().min(1),
  styleDescription: z.string().min(1),
  qty: z.number().int().positive(),
  buyerId: z.string().min(1),
  unitId: z.string().min(1),
  month: z.string().min(1),
  // ... optional fields
});

// In API route
const parsed = createOrderSchema.safeParse(req.body);
if (!parsed.success) {
  return validationError(parsed.error);
}
const data = parsed.data; // ✅ Type-safe
```

---

## 8️⃣ UTILITY FUNCTIONS

### Location Mapping
```
src/lib/
├── prisma.ts            ✅ Singleton DB client
├── redis.ts             ✅ Cache client with fallback
├── db.ts                ✅ Neon SQL client (not used - Prisma takes precedence)
├── erp-api.ts           ✅ Zod validation schemas
├── api-response.ts      ✅ Standardized API responses
├── format-date.ts       ✅ Date formatting (date-fns)
├── parse-utils.ts       ✅ Safe number/int/date parsing
├── export-utils.ts      ✅ PDF/XLSX/CSV export functions
├── utils.ts             ✅ General utilities (cn, getInitials, formatCurrency)
└── localStorage.ts      ✅ Client-side storage (safe with try/catch)

src/hooks/
└── use-mobile.ts        ✅ Responsive design detection
```

### Key Utilities
```typescript
// Format dates
formatDate(date, "dd MMM yyyy") → "06 May 2026"

// Format currency
formatCurrency(1000, { currency: "INR" }) → "₹1,000.00"

// Get initials
getInitials("John Doe") → "JD"

// Safe parsing
safeInt("123.45", 0) → 123
safeNumber("abc", 0) → 0

// Class merging
cn("px-2 py-4", "px-4") → "py-4 px-4"

// Export data
exportToXLSX(data, "orders")
exportToPDF(data, "report")
exportToCSV(data, "backup")
```

---

## 9️⃣ DATA FLOW DIAGRAM (Example: Fetch Orders)

```
User Opens Dashboard
    ↓
Component: /dashboard/task-manager
    ↓
useQuery({ queryKey: ['orders', page, filters] })
    ↓
Calls: fetch('/api/orders?page=1&buyer=H&M')
    ↓
API Route: /api/orders GET
    ├─ Authenticate (Clerk middleware)
    ├─ Parse query params (validation)
    ├─ Check Redis cache
    │  └─ If found: Return cached data ✅
    ├─ If cache miss:
    │  ├─ Query Prisma: prisma.order.findMany()
    │  ├─ Store in Redis (60s TTL)
    │  └─ Return data
    └─ Format response: { data, total, page, pages }
    ↓
React Query stores in cache
    ↓
Component renders with data
    ↓
User sorts/filters
    ↓
useQuery automatically refetches (staleTime logic)
```

---

## 🔟 MUTATION DATA FLOW (Example: Create Order)

```
User clicks "Create Order" button
    ↓
Form validation (Zod client-side)
    ↓
Submit form data
    ↓
useMutation: mutate({ orderNo, qty, ... })
    ↓
POST /api/orders
    ├─ Authenticate (Clerk)
    ├─ Validate input (Zod server-side)
    ├─ Create: prisma.order.create()
    ├─ Invalidate cache: redis.del("orders:list:*")
    └─ Return: { data: newOrder }
    ↓
Mutation success
    ↓
queryClient.invalidateQueries(['orders'])
    ↓
useQuery re-fetches latest data
    ↓
Component re-renders with new order
    ↓
Toast: "Order created successfully"
```

---

## 1️⃣1️⃣ MISSING INTEGRATIONS

### What's NOT Wired Yet ❌

1. **Clerk Middleware**
   - File: `src/middleware.ts` - DOES NOT EXIST
   - Impact: Routes not protected, anyone can access APIs
   - Action: Create middleware file (see section 1)

2. **React Query Hooks**
   - No useQuery/useMutation calls found in codebase
   - Impact: Frontend components can't fetch data
   - Action: Create hooks in `src/hooks/queries/`

3. **Zustand Stores**
   - No store files found
   - Impact: Component state management missing
   - Action: Create stores in `src/store/`

4. **API Route Handlers**
   - Route definitions exist but actual handlers missing
   - Impact: 404 errors when calling APIs
   - Action: Create files in `src/app/api/`

5. **ERP External Integration**
   - `ERP_SYNC_SECRET` env var defined but unused
   - Impact: No sync with external ERP systems
   - Action: Implement webhook endpoints if needed

---

## 1️⃣2️⃣ ENVIRONMENT SETUP FOR INTEGRATION

### Create `.env.local` for Development
```bash
# Authentication (Test Keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard

# Database
DATABASE_URL=postgresql://neondb_owner:npg_...@ep-....neon.tech/neondb?sslmode=require

# Cache (Get real password from RedisLabs)
REDIS_URL=rediss://default:ACTUAL_PASSWORD@redis-17586.crce281.ap-south-1-3.ec2.cloud.redislabs.com:17586

# Optional: Upstash alternative
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# ERP Integration Secret (generate one)
ERP_SYNC_SECRET=erp_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### Create `.env.production` for Vercel
```bash
# Authentication (Live Keys - change pk_test to pk_live)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...  # ← Different from dev
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard

# Database (Same as dev for now, or separate prod branch in Neon)
DATABASE_URL=postgresql://neondb_owner:npg_...@ep-....neon.tech/neondb?sslmode=require

# Cache
REDIS_URL=rediss://default:ACTUAL_PASSWORD@redis-17586.crce281.ap-south-1-3.ec2.cloud.redislabs.com:17586

# ERP
ERP_SYNC_SECRET=same_as_dev_or_different
```

---

## 1️⃣3️⃣ COMPLETE CHECKLIST TO GO LIVE

### Pre-Launch ✅
- [ ] Create `src/middleware.ts` with Clerk protection
- [ ] Create `/api/orders` route handler
- [ ] Create `/api/dr` route handler
- [ ] Create `/api/dashboard/*` route handlers
- [ ] Create `/api/procurement/*` route handlers
- [ ] Create `/api/notifications/*` route handlers
- [ ] Create `/api/analytics/*` route handlers

### Client-Side ✅
- [ ] Create `src/hooks/queries/` for React Query hooks
- [ ] Create `src/store/` for Zustand stores
- [ ] Wire useQuery in components
- [ ] Wire useMutation for forms
- [ ] Add loading/error states

### Database ✅
- [ ] Run `npx prisma db seed`
- [ ] Verify data in Neon console
- [ ] Test Prisma queries locally

### Authentication ✅
- [ ] Set correct Clerk keys (.env.production)
- [ ] Test login flow
- [ ] Test protected routes
- [ ] Test API authentication

### Cache ✅
- [ ] Set real Redis password
- [ ] Test cache get/set
- [ ] Monitor Redis usage

### Deployment ✅
- [ ] Push to Vercel
- [ ] Set all env vars in Vercel dashboard
- [ ] Delete vercel-dev branch in Neon
- [ ] Reconnect Vercel ↔ Neon integration
- [ ] Run first production seed
- [ ] Monitor for errors

---

**Total Integration: 80% Complete**  
**Remaining: 20% (Middleware, Route Handlers, Query Hooks)**

