# Jesus Christ Ministries

Public website for **Jesus Christ Ministries** — a Pentecostal ministry with 20+ branches across 7 regions in Kenya.

**Stack:** Next.js (App Router) · Tailwind CSS · Firebase/Firestore (optional) · YouTube embeds  
**Languages:** English / Swahili (header toggle, `localStorage`)  
**Hosting:** Vercel recommended

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design system

| Token | Role | Usage |
|-------|------|--------|
| White | Base | Page backgrounds, cards |
| Royal purple (`#4c1d6a`) | Primary | Header bar, CTAs, brand |
| Light blue | Secondary | Soft sections, hover accents |
| Gold (`#c9a227`) | Accent | Give CTA, badges, dividers — sparingly |

Fonts: **Playfair Display** (headings) · **DM Sans** (body)

## Sitemap (implemented)

| Route | Status |
|-------|--------|
| `/` | Home — hero, welcome, find branch, latest sermon, events, regions |
| `/about` | Mission, vision, beliefs |
| `/leadership` | Interactive org tree (Bishop → Overseers → Pastors) |
| `/regions`, `/regions/[id]` | Region directory + detail |
| `/branches/[id]` | Branch page (services, pastor, contact) |
| `/visit` | Plan Your Visit form |
| `/sermons`, `/sermons/live` | Archive + live placeholder |
| `/events` | Calendar with scope/region filters |
| `/ministries` | National ministries directory |
| `/give` | Why we give (Paybill deferred) |
| `/blog`, `/blog/[slug]` | Devotionals (sample posts) |
| `/membership` | Registration form |
| `/contact` | General inquiry form |
| `/privacy`, `/terms` | Legal stubs |
| `/admin/*` | Scaffold only (not in public nav) |

## Data

Until Firebase is configured, content loads from `src/lib/mock-data.ts`:

- **Regions:** Nairobi, Western, North Rift, Kilgoris, Meru, Kilifi, Malindi  
- **Bishop:** Edward Musamusi & Edith Fedha Musamusi  
- Overseer / pastor names marked `[To Confirm]` are placeholders  

Copy Firebase keys into `.env.local` from `.env.example`. Client helpers live in `src/lib/firebase.ts`.

## i18n

Simple dictionary (no heavy library):

- `src/lib/i18n/dictionaries.ts` — `en` / `sw`
- `src/lib/i18n/context.tsx` — `useI18n()`, persists locale

## Firebase

See **[docs/FIREBASE_SETUP.md](docs/FIREBASE_SETUP.md)** for the exact console steps.  
Seed payloads: `docs/seed/regions.json`, `docs/seed/leadership.json`.

The app works offline from mock data until env vars are set.

## Open items for content owners

1. Real overseer & pastor names + photos (bishop couple photo is in place)  
2. Logo asset (currently monogram “JCM”)  
3. Real YouTube video IDs  
4. Branch addresses / map embeds / WhatsApp numbers  
5. Paybill / Till when ready  
6. Firebase project + Auth for admin (follow docs/FIREBASE_SETUP.md)  

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
