# Mudasir — Video Editor Portfolio

Premium personal portfolio for a freelance video editor.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Motion (`motion`)

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```

## Configuration before deploy

| Item | Where |
| --- | --- |
| Production domain | `data/site.ts` → `siteUrl` |
| Social preview image | `/public/images/og/` + `siteConfig.ogImage` |
| Contact email | `data/site.ts` → `email` |
| Social profiles | `data/contact.ts` → `socialLinks` |
| Inquiry delivery | `.env` → `INQUIRY_WEBHOOK_URL` (see `.env.example`) |
| Showreel | `data/showreel.ts` + `/public/videos` |
| Portfolio projects | `data/projects.ts` + media under `/public` |
| Demo grid preview | `siteConfig.showDemoProjects` (keep `false` in production) |

## Adding a real project

1. Add thumbnail to `/public/images/projects/`
2. Add video to `/public/videos/`
3. Append an entry in `data/projects.ts` (see comments in that file)
4. Set `featured: true` for larger treatment

Do not invent clients, metrics, or placeholder “real” work.

## Deploy

Any Node host that runs `next build` + `next start` works (Vercel, Netlify, Railway, etc.).

1. Set `INQUIRY_WEBHOOK_URL` in the host’s environment
2. Set `siteUrl` / `ogImage` in `data/site.ts`
3. Deploy — no platform lock-in is hard-coded
