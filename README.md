# Bujhi

Bujhi is a research-driven education platform for the Bangladesh school curriculum. The current MVP includes the public site, interactive authentication desk, and the first Class 8 student dashboard.

## Current routes

- `/` — interactive homepage.
- `/about` — project story and research context.
- `/register` — choose student or teacher entry.
- `/signup` — create an account.
- `/login` — log in.
- `/dashboard` — first Class 8 student learning desk.

## Class 8 dashboard MVP

The first student dashboard includes:

- a Class 8 NCTB subject shelf;
- selectable subjects and chapters;
- a laptop-style learning selector;
- Visual, Simulation, Read Aloud, and Teacher-style learning modes;
- interactive lamp and globe;
- a student-only "Talk to a friend" wellbeing corner;
- responsive transitions for desktop and mobile.

The shelf currently points users to the official NCTB website as the source. Direct verified textbook PDF links can be added subject-by-subject later.

## Authentication and database

The frontend uses Next.js route handlers that connect to Supabase Auth and Postgres through the Supabase REST API. No extra npm package is required.

1. Create a Supabase project for Bujhi.
2. Open the Supabase SQL editor and run `supabase/schema.sql`.
3. Copy `.env.example` to `.env.local`.
4. Add your project URL and publishable/anon key:

```env
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_ANON_KEY=YOUR_KEY
```

5. Add the same two environment variables in Vercel.

The schema creates `profiles`, automatically creates a profile when a Supabase Auth user signs up, enables row-level security, and includes a `learning_preferences` table for the next personalization stage.

## Run locally

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Add `.env.local` as described above.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

## Deploy

Import `CodeArtisanNNZ/bujhi` into Vercel as a Next.js project and configure the two Supabase environment variables before deploying.
