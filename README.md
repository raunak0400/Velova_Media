# Velova Media

Marketing website for **Velova Media** — a digital marketing agency based in Ahmedabad, Gujarat, serving brands across India, the UK, the USA, Canada and the Netherlands.

Built with Next.js 15 (App Router), React 19, and Tailwind CSS 4, with GSAP/Framer Motion/Lenis for scroll and motion effects.

## Tech stack

| Layer       | Choice |
|-------------|--------|
| Framework   | [Next.js 15](https://nextjs.org) (App Router, React Server Components) |
| UI library  | [React 19](https://react.dev) |
| Styling     | [Tailwind CSS 4](https://tailwindcss.com) |
| Motion      | [GSAP](https://gsap.com), [Framer Motion](https://www.framer.com/motion/), [Lenis](https://lenis.darkroom.engineering/) (smooth scroll) |
| Validation  | [Zod](https://zod.dev) |
| Language    | TypeScript (strict mode) |
| Deployment  | [Vercel](https://vercel.com) |

## Getting started

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Pages hot-reload as you edit.

### Available scripts

| Command         | Description                                  |
|-----------------|-----------------------------------------------|
| `npm run dev`   | Start the local dev server                    |
| `npm run build` | Create an optimized production build          |
| `npm run start` | Serve the production build locally            |
| `npm run lint`  | Run ESLint                                    |

## Project structure

```
app/                  Route segments (App Router) — pages, layouts, metadata routes
  ├─ about/, services/, markets/, case-studies/, blog/, contact/
  ├─ sitemap.ts, robots.ts, opengraph-image.tsx   Generated SEO/metadata routes
components/
  ├─ layout/          Navbar, Footer, page transitions, section wrapper
  ├─ sections/         Page-specific composed sections (home, about, ...)
  ├─ content/         Reusable content templates/cards (blog, case study, service)
  ├─ motion/          Animation-driven presentational components
  └─ ui/              Small shared UI primitives (buttons, CTAs)
animations/           Scroll/reveal/parallax hooks and shared motion config
constants/            Business info (NAP), route paths, motion constants
data/                 Static content: services, case studies, blog posts, FAQs, etc.
lib/
  ├─ schema/          JSON-LD structured data builders (Organization, FAQ, ...)
  ├─ utils/           Small helpers (cn, WhatsApp link builder)
  └─ validation/      Zod schemas (contact form)
providers/            App-level context providers (Lenis smooth scroll, cursor)
public/               Static assets served as-is
assets/fonts/         Self-hosted font files
```

Path alias: `@/*` resolves to the project root (see `tsconfig.json`).

## Content & configuration

- **Business info (NAP, socials, service area):** `constants/business.ts` is the single source of truth, consumed by the footer, WhatsApp CTAs, and LocalBusiness/Organization JSON-LD. Several fields are marked `TODO(client)` and must be filled in with real values (registered address, phone, WhatsApp number) before those surfaces are accurate in production.
- **Page content** (services, case studies, blog posts, FAQs, testimonials, markets): lives in `data/*.ts` as typed arrays — add or edit entries there rather than in the page components. `app/sitemap.ts` picks up new slugs automatically.
- **Contact form:** `app/contact/actions.ts` is a Next.js Server Action that validates input with `lib/validation/contact.ts`. It currently logs submissions server-side only — no email/CRM provider is wired in yet (see the `TODO(client)` comment in that file). Connect a provider (e.g. Resend, SendGrid, or a CRM webhook) before launch.

## Deployment (Vercel)

This project is deployed on [Vercel](https://vercel.com):

1. Push to the `main` branch (or open a PR — Vercel will build a preview deployment).
2. Vercel auto-detects Next.js and runs `npm run build`.
3. No environment variables are currently required for the build. If a contact-form provider (email/CRM) is wired in later, add its credentials as Vercel project environment variables — never commit them to the repo.

## Security

See [SECURITY.md](./SECURITY.md) for how to report a vulnerability.

## License

Proprietary — all rights reserved. See [LICENSE](./LICENSE).
