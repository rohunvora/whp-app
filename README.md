# Certified — Auto-issue Certificates for Whop Courses

Automatically issue branded completion certificates when students finish Whop courses. The #1 requested feature in Courses app reviews.

**Live:** https://whp-app.vercel.app/

## Current State

### ✅ Completed
- **Landing page** — Swiss Precision design (anti-slop), grid-based layout, white background
- **Database schema** — Prisma models for certificates, templates, course configs, webhooks
- **Webhook handler** — Receives `course_lesson_interaction.completed` events from Whop
- **Dashboard pages** — Company dashboard, course management, template editor, backfill UI
- **Experience view** — Student-facing certificate gallery with download/share
- **Verification page** — Public URLs for certificate verification
- **PDF generation** — Playwright-based HTML-to-PDF for certificate downloads
- **Auth guards** — Role-based access for dashboard vs experience views

### 🚧 Needs Work
- **Database connection** — Need to set up PostgreSQL (Neon/Supabase) and run migrations
- **Whop webhook registration** — Configure webhook in Whop developer dashboard
- **Environment variables** — Add WHOP_API_KEY, DATABASE_URL, etc. to Vercel
- **Template editor** — Basic UI exists, needs polish and preview functionality
- **PDF storage** — Currently generates on-demand; could cache to R2/S3
- **Email notifications** — "Your certificate is ready" emails not implemented
- **Analytics** — No tracking of certificate issuance/downloads

### 🔮 Future Ideas
- Multiple certificate designs per course
- Custom domains for verification URLs
- LinkedIn integration (one-click add to profile)
- Bulk export for course creators
- Certificate expiration/revocation

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Database:** PostgreSQL + Prisma ORM
- **Styling:** Tailwind CSS 4
- **Auth:** Whop SDK (@whop/sdk, @whop/react)
- **PDF:** Playwright (HTML → PDF)
- **Deployment:** Vercel

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

Create `.env.local`:

```bash
# Whop (get from https://whop.com/apps)
WHOP_API_KEY=your_api_key
NEXT_PUBLIC_WHOP_APP_ID=your_app_id
WHOP_WEBHOOK_SECRET=your_webhook_secret

# Database (Neon, Supabase, or self-hosted PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/database

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set up database

```bash
# Generate Prisma client
pnpm db:generate

# Push schema to database
pnpm db:push
```

### 4. Configure Whop App

1. Go to [Whop Developer Dashboard](https://whop.com/apps)
2. Create/select your app
3. Set paths:
   - **App path:** `/experiences/[experienceId]`
   - **Dashboard path:** `/dashboard/[companyId]`
   - **Discover path:** `/discover`
4. Add permissions:
   - `courses:read`
   - `course_analytics:read`
   - `webhook_receive:courses`
5. Create webhook:
   - **Event:** `course_lesson_interaction.completed`
   - **URL:** `https://your-app.vercel.app/api/whop/webhooks`

### 5. Run locally

```bash
pnpm dev
```

## Project Structure

```
app/
├── page.tsx                    # Landing page
├── dashboard/[companyId]/      # Creator dashboard
│   ├── courses/                # Enable/disable certificates per course
│   ├── templates/              # Certificate template editor
│   └── backfill/               # Issue certs to past completions
├── experiences/[experienceId]/ # Student certificate gallery
├── verify/[publicId]/          # Public verification page
└── api/
    ├── whop/webhooks/          # Course completion webhook
    ├── certificates/[id]/      # Download PDF
    ├── templates/              # CRUD for templates
    └── backfill/[courseId]/    # Backfill API

lib/
├── db.ts                       # Prisma client (lazy-loaded)
├── auth.ts                     # Auth guards
├── whop-sdk.ts                 # Whop SDK wrapper
└── pdf-generator.ts            # Playwright PDF generation

prisma/
└── schema.prisma               # Database models
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

The app will auto-deploy on push to main.

### Environment Variables for Vercel

```
WHOP_API_KEY=
NEXT_PUBLIC_WHOP_APP_ID=
WHOP_WEBHOOK_SECRET=
DATABASE_URL=
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## Design

The landing page uses the **Swiss Precision** design system:
- White background, black text
- 12-column grid layout
- Sharp corners (no border-radius)
- 1px borders
- Inter font family
- No gradients, no blur effects, no decorative orbs

This was intentionally designed to avoid "AI slop" patterns commonly seen in AI-generated sites.

## License

MIT
