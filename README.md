# curia-website

Marketing site for [Curia](https://github.com/josephfung/curia) — a Digital Office of the CEO. Deployed at [meetcuria.com](https://meetcuria.com).

## Stack

- **React 18** (single-page, no router)
- **Vite 6**
- **Plain CSS** — no framework, custom design system under the `m-` namespace
- **Cloudflare Pages** for hosting

## Local development

```bash
npm install
npm run dev       # http://localhost:5173
```

## Build

```bash
npm run build     # output in dist/
npm run preview   # preview the production build locally
```

## Structure

```
src/
  App.jsx       # All page sections as React components
  styles.css    # Global styles (m- namespace)
  main.jsx      # Entry point
public/
  assets/       # Logos and images
  fonts/        # Self-hosted Manrope and Lora
index.html
```

Everything lives in `App.jsx` — each section of the page is its own component (`Hero`, `CapabilitiesSection`, `GovernanceSection`, etc.). There is no build-time routing or data fetching; it's a static marketing page.

## Deployment

Pushes to `main` deploy automatically via Cloudflare Pages. No manual step needed.

DNS is managed at Rebel.com.
