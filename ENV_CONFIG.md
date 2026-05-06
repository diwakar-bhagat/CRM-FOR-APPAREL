# ENVIRONMENT CONFIGURATION GUIDE

**Last Updated:** May 6, 2026

---

## SUMMARY

This document categorizes all required environment variables into:
- ✅ **AUTOMATED**: Already configured or can be auto-generated
- 🔧 **MANUAL**: Requires manual input from external services

---

## ENVIRONMENT VARIABLES CHECKLIST

### 1. CLERK AUTHENTICATION (Automated ✅)

| Variable | Value | Status | Source |
|----------|-------|--------|--------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_ZmxleGlibGUtbWFybW9zZXQtNzcuY2xlcmsuYWNjb3VudHMuZGV2JA` | ✅ Configured | `.env.local` |
| `CLERK_SECRET_KEY` | `sk_test_ntbCCAGOs3cyLnhxZtcBsRSJyJZBVpwKgcO0Wduxqw` | ✅ Configured | `.env.local` (Production safe) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/login` | ✅ Configured | `.env.local` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/signup` | ✅ Configured | `.env.local` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | `/dashboard` | ✅ Configured | `.env.local` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | `/dashboard` | ✅ Configured | `.env.local` |

**Status:** ✅ Ready for Vercel deployment  
**Action Required:** NONE — these are already set

---

### 2. DATABASE (Neon PostgreSQL) (Manual 🔧)

| Variable | Example Format | Status | Source | Where to Get |
|----------|---|--------|--------|--------------|
| `DATABASE_URL` | `postgresql://user:password@ep-xxxx-pooler.region.aws.neon.tech/dbname?sslmode=require&pgbouncer=true` | 🔧 **MISSING** | Neon Console | [Neon Console](https://console.neon.tech/app/projects) |
| `DIRECT_DATABASE_URL` | `postgresql://user:password@ep-xxxx.region.aws.neon.tech/dbname?sslmode=require` | 🔧 **MISSING** | Neon Console | [Neon Console](https://console.neon.tech/app/projects) |

**Why Both URLs?**
- **DATABASE_URL**: Used by application code (pooled connection for serverless)
- **DIRECT_DATABASE_URL**: Used by Prisma migrations (direct connection required)

**How to Get:**
1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Select your project → Connection strings
3. Copy "Pooled connection" → paste as `DATABASE_URL`
4. Copy "Direct connection" → paste as `DIRECT_DATABASE_URL`
5. Add `?sslmode=require&pgbouncer=true` to the pooled URL if not present

**Status:** 🔧 REQUIRES MANUAL INPUT  
**Action Required:** Get credentials from Neon console and add to `.env.local` and Vercel

---

### 3. CACHE (Upstash Redis) (Manual 🔧)

| Variable | Example Format | Status | Source | Where to Get |
|----------|---|--------|--------|--------------|
| `UPSTASH_REDIS_REST_URL` | `https://eu1-xxxx.upstash.io` | 🔧 **MISSING** | Upstash Console | [Upstash Console](https://console.upstash.com/redis) |
| `UPSTASH_REDIS_REST_TOKEN` | `AXx...your_token...` | 🔧 **MISSING** | Upstash Console | [Upstash Console](https://console.upstash.com/redis) |

**How to Get:**
1. Go to [https://console.upstash.com/redis](https://console.upstash.com/redis)
2. Create a database (if not exists) or select existing
3. Copy "REST URL" → paste as `UPSTASH_REDIS_REST_URL`
4. Copy "REST Token" → paste as `UPSTASH_REDIS_REST_TOKEN`

**Status:** 🔧 REQUIRES MANUAL INPUT  
**Action Required:** Get credentials from Upstash console and add to `.env.local` and Vercel

---

### 4. API SECURITY (Auto-generate 🔧)

| Variable | Example Format | Status | Source | How to Generate |
|----------|---|--------|--------|-----------------|
| `ERP_SYNC_SECRET` | `a3f7e2c9b1d4f6...` (32 hex chars) | 🔧 **MISSING** | Generate locally | Run: `openssl rand -hex 32` |

**How to Generate:**
```bash
# On macOS/Linux
openssl rand -hex 32

# Result: copy the output to .env.local
ERP_SYNC_SECRET=a3f7e2c9b1d4f6e8a1b2c3d4e5f6a7b8
```

**Status:** 🔧 REQUIRES LOCAL GENERATION  
**Action Required:** Run command above and add to `.env.local` and Vercel

---

## NEXT STEPS

### Step 1: Configure Locally (`.env.local`)
```bash
# Edit .env.local and add these:
DATABASE_URL=<from-neon-console>
DIRECT_DATABASE_URL=<from-neon-console>
UPSTASH_REDIS_REST_URL=<from-upstash-console>
UPSTASH_REDIS_REST_TOKEN=<from-upstash-console>
ERP_SYNC_SECRET=<from: openssl rand -hex 32>
```

### Step 2: Add to Vercel Environment Variables
1. Go to Vercel Project → **Settings** → **Environment Variables**
2. For each variable above, click **Add New**
3. Set **Environment** to: `Production`, `Preview`, and `Development`
4. For `CLERK_SECRET_KEY` and database secrets: set to **Production only**

### Step 3: Test Locally
```bash
# Install Prisma if not done
npm install prisma @prisma/client @prisma/adapter-neon dotenv --save

# Generate Prisma client
npm run postinstall

# Test build
npm run build

# Push schema to database
npm run db:push
```

### Step 4: Deploy to Vercel
```bash
git add .
git commit -m "feat: add prisma database configuration"
git push origin main
```

---

## VERCEL INTEGRATION NOTE (Action Required)

**Error:** Branch `vercel-dev` conflict between Neon and Vercel integration

**Resolution:**
1. In Neon console → Integrations → Vercel → Delete the integration
2. In Vercel → Storage → Remove Neon integration
3. Manually add all 4 database env vars in Vercel Settings
4. Reconnect integration if needed (it will auto-create a new branch)

---

## FILE LOCATIONS

| File | Status | Modified |
|------|--------|----------|
| `.env.local` | 🟡 Partially configured (DB/Redis/ERP missing) | ✅ Updated today |
| `.env.production` | 🟡 Partially configured (DB/Redis/ERP missing) | ✅ Updated today |
| `.env.example` | ✅ Complete reference | ✅ Created today |
| `prisma/schema.prisma` | ✅ Generated | ✅ Created today |
| `package.json` | ✅ Updated with Prisma scripts | ✅ Updated today |

---

## VERIFICATION CHECKLIST

Use this to verify everything is working:

```bash
# 1. Check Node/npm versions
node -v && npm -v

# 2. Verify packages installed
npm ls @prisma/client @prisma/adapter-neon dotenv

# 3. Test Prisma client generation
npm run postinstall

# 4. Test local build
npm run build

# 5. Check env vars are loaded
npm run db:studio  # Should not error about DATABASE_URL

# 6. Verify Vercel env vars (after deployment)
# Check Vercel Logs tab for: "DATABASE_URL" messages
```

---

## TROUBLESHOOTING

### "Error: connect ECONNREFUSED" during build
**Cause:** `DATABASE_URL` not set or invalid  
**Fix:** Verify `DIRECT_DATABASE_URL` in `.env.local`, run `npm run db:push`

### "Prisma client not generated" on Vercel
**Cause:** `postinstall` script not running  
**Fix:** Already added to `package.json` — ensure lock file is committed

### Blank screen / 500 errors in production
**Cause:** Missing environment variables on Vercel  
**Fix:** Check all 4 variables (DB, Redis, ERP_SYNC_SECRET) are in Vercel settings

### "branch vercel-dev already exists"
**Cause:** Neon-Vercel integration conflict  
**Fix:** See VERCEL INTEGRATION NOTE section above

---

## MANUAL-ONLY CONFIGURATIONS SUMMARY

These **MUST** be done manually — no automation possible:

1. ✋ **Get Neon Database URL**: [https://console.neon.tech](https://console.neon.tech) → Connection Strings
2. ✋ **Get Upstash Redis URL**: [https://console.upstash.com/redis](https://console.upstash.com/redis) → Details
3. ✋ **Generate ERP_SYNC_SECRET**: Run `openssl rand -hex 32` locally
4. ✋ **Add to Vercel**: Go to Vercel → Project → Settings → Environment Variables
5. ✋ **Resolve Neon-Vercel branch conflict**: Delete existing integration, reconnect manually

---

## QUESTIONS?

- **Neon Docs:** https://neon.tech/docs
- **Upstash Docs:** https://upstash.com/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Vercel Env Vars:** https://vercel.com/docs/projects/environment-variables

