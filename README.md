# Maison & Oak — Luxury Furniture Demo

A 3-page static frontend demo built with Next.js 15 (App Router), TypeScript, Tailwind CSS,
and Framer Motion. Built for demo/presentation purposes.

## Pages included
- **Home** (`/`) — hero, category grid, best sellers, lookbook, featured collection banner,
  new arrivals, why-choose-us, animated stats, testimonials carousel, newsletter
- **Shop** (`/shop`) — full catalog (30 products) with category/price/stock filters, sorting,
  and pagination
- **Product Details** (`/product/[slug]`) — gallery with zoom, quantity selector, tabs
  (description/specs/reviews), related products
- Shared **Header** (sticky glass, mega menu, search, cart drawer, mobile nav) and **Footer**
- Bonus: `/app/not-found.tsx` for a styled 404

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

To build for production:

```bash
npm run build
npm run start
```

## Notes
- All data (30 products, collections, testimonials, FAQs) lives in `/data` — no backend needed.
- Cart & wishlist state is handled client-side via React Context (`/lib/store-context.tsx`);
  it resets on page reload since there's no backend/localStorage wired up yet.
- Images are served directly from Unsplash's CDN (configured in `next.config.mjs`).
- Fonts (Playfair Display, Inter) load via `next/font/google` and require an internet
  connection during `npm run build`/`npm run dev`.

## Not included in this demo
This is a 3-page slice of the full 12-page spec (About, Collections, Cart, Checkout, Wishlist,
FAQ, Contact were scoped out). The architecture (data layer, components/ui, store context) is
built to extend cleanly — happy to keep building out the remaining pages next.
