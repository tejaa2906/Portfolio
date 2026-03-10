# Frontend Portfolio with Supabase Admin

This project is a React + Vite portfolio designed for GitHub Pages. The public site stays frontend-only, while Supabase provides:

- admin login
- editable `Projects`
- editable `Travel Blog`
- image upload for travel stories

The site still renders seed content if Supabase is not configured, so design work does not block on backend setup.

## Local development

Install dependencies:

```bash
npm install --prefix client
```

Create the frontend env file:

```bash
cp client/.env.example client/.env
```

Add your Supabase values to `client/.env`:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
VITE_SUPABASE_TRAVEL_BUCKET=travel-images
```

Run the app:

```bash
npm run dev
```

Build the static site:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Supabase setup

1. Create a Supabase project.
2. In the Supabase SQL editor, run [supabase/schema.sql](/Users/tejaswinigude/Desktop/portfolio/supabase/schema.sql).
3. In `Authentication > Users`, create your admin user with email and password.
4. Copy the project URL and anon key into `client/.env`.
5. Start the app and open `#/admin`.

Current schema:

- `projects`
- `travel_posts`
- storage bucket: `travel-images`

Security model:

- public users can read projects and travel posts
- authenticated users can create, update, and delete projects and travel posts
- authenticated users can upload and delete travel images

This is acceptable for a single-admin portfolio. If you later add multiple editors, tighten the policies before doing that.

## How content works

- [client/src/App.jsx](/Users/tejaswinigude/Desktop/portfolio/client/src/App.jsx): routes, public pages, admin UI
- [client/src/lib/portfolioApi.js](/Users/tejaswinigude/Desktop/portfolio/client/src/lib/portfolioApi.js): Supabase client and CRUD logic
- [client/src/siteContent.js](/Users/tejaswinigude/Desktop/portfolio/client/src/siteContent.js): nav, landing copy, and fallback seed content
- [client/src/styles.css](/Users/tejaswinigude/Desktop/portfolio/client/src/styles.css): theme and layout

Travel blog behavior:

- each blog card links to its own page using `#/travel-blog/:slug`
- each post has four image slots in the admin editor
- image uploads go to Supabase Storage

## GitHub Pages deployment

This repo includes a GitHub Pages workflow. Once the repo is pushed to GitHub:

1. Push your code to the `main` branch.
2. In GitHub, open `Settings > Pages`.
3. Set `Source` to `GitHub Actions`.
4. Add repository variables and secrets for the frontend build:
   - repository variable: `VITE_SUPABASE_URL`
   - repository variable: `VITE_SUPABASE_TRAVEL_BUCKET`
   - repository secret: `VITE_SUPABASE_ANON_KEY`
5. Push again to redeploy.

The Vite config derives the correct `base` path automatically during GitHub Actions builds for project pages repositories.
