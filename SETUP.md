# Setup Checklist

## Prerequisites Completed ✅

- [x] Project scaffolded from Whop Next.js template
- [x] Prisma schema created
- [x] Database models defined
- [x] Auth guards implemented
- [x] Webhook handler created
- [x] Dashboard pages created
- [x] Experience view created
- [x] Verification page created
- [x] PDF generation utility created
- [x] Backfill functionality implemented

## Next Steps (User Action Required)

### 1. Database Setup

```bash
# Create a PostgreSQL database (Neon, Supabase, or self-hosted)
# Get the connection string

# Add to .env.local
DATABASE_URL=postgresql://user:password@host:5432/database

# Generate Prisma client (requires Node 20.19+)
pnpm db:generate

# Push schema to database
pnpm db:push
```

### 2. Whop App Configuration

1. Go to https://whop.com/apps
2. Create/select your app
3. Configure paths:
   - Dashboard: `/dashboard/[companyId]`
   - Experience: `/experiences/[experienceId]/[...restPath]`
   - Discover: `/discover`
4. Set permissions:
   - `courses:read`
   - `course_analytics:read`
   - `webhook_receive:courses`
5. Create webhook:
   - Event: `course_lesson_interaction.completed`
   - URL: `https://your-app.vercel.app/api/whop/webhooks`

### 3. Environment Variables

Create `.env.local`:

```bash
WHOP_API_KEY=your_key
NEXT_PUBLIC_WHOP_APP_ID=your_app_id
WHOP_WEBHOOK_SECRET=your_secret
DATABASE_URL=your_db_url
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 4. Deploy to Vercel

```bash
vercel
# Add all environment variables in Vercel dashboard
```

### 5. Install Playwright (for PDF generation)

```bash
pnpm add -D playwright
pnpm exec playwright install chromium
```

## Known Issues / Notes

1. **Prisma Client**: Must be generated after database is set up. Requires Node 20.19+.

2. **Whop SDK API**: Some API methods may need adjustment based on actual SDK:
   - `courseStudents.list()` - May need to use different endpoint
   - `course.company_id` - May be `companyId` or nested in `company` object
   - `company.name` - May need to use `id` or different field

3. **PDF Generation**: Playwright needs to be installed in production. Consider using a serverless function or external service for PDF generation at scale.

4. **Storage**: PDF storage to R2/S3 is optional for MVP. PDFs can be generated on-demand.

## Testing

1. Install app in a test Whop
2. Enable a course for certificates
3. Create a template
4. Complete a course as a test user
5. Verify certificate is issued
6. Test backfill functionality
7. Test verification link

## API Endpoints

- `POST /api/whop/webhooks` - Course completion webhook
- `POST /api/courses/[courseId]/toggle` - Toggle course certificates
- `POST /api/templates` - Create template
- `PUT /api/templates/[id]` - Update template
- `POST /api/backfill/[courseId]` - Backfill certificates
- `GET /api/certificates/[id]/download` - Download PDF

