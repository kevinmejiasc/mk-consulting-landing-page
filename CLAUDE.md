# Gamma Tech Group Landing Page

Single-file static landing page for Gamma Tech Group (formerly M.K Consulting) — AI automation & workflow consulting for Atlanta-area businesses. Domain: `gammatechgroup.com`.

## Project structure

```
index.html             — the entire site (HTML + CSS + JS in one file)
cloudflare-worker.js   — lead-capture endpoint (deploy as a Cloudflare Worker; emails via Resend)
robots.txt             — crawl rules (allows major AI/LLM crawlers) + sitemap pointer
sitemap.xml            — single-URL sitemap
llms.txt               — concise site summary for AI search engines
CNAME                  — custom domain for GitHub Pages (gammatechgroup.com)
favicon.svg            — Γ tile mark (inline SVG logo also lives in index.html nav/footer)
icon-square.svg        — full-bleed source for the PNG icons
favicon-512.png, apple-touch-icon.png — rasterized icons (from icon-square.svg)
og-card.html           — 1200×630 social-card source; render to og-image.png via headless Chrome
og-image.png           — social share image (og:image / twitter:image)
```

## Key sections in index.html

| Section | Purpose |
|---|---|
| `<head>` SEO block | Title, meta tags, canonical URL, Open Graph, JSON-LD structured data |
| `#hero` | Headline, sub-copy, CTA buttons, trust stats |
| `#problem` | 3-card problem statement |
| `#services` | 4-row services list |
| `#process` | 4-step process grid |
| `#outcomes` | Stats/outcome cards |
| `#book` | Lead capture form + success message |
| `#faq` | Accordion FAQ |
| `<footer>` | Nav links, contact, copyright |

## Before launch — remaining placeholders

- **Lead endpoint**: Set `LEAD_ENDPOINT` near the top of the `<script>` in index.html to the Cloudflare Worker URL (see `cloudflare-worker.js` for setup). Until set, leads log to console only (no email sent).
- **Worker secrets**: In the Worker's Settings → Variables, set `RESEND_API_KEY` (Secret), `NOTIFY_TO` (inbox), and optionally `FROM_EMAIL`. The Resend key never touches the repo or the browser.
- **Lead form anti-abuse**: hidden honeypot field `website` (humans leave blank); the Worker drops any submission where it's filled.
- **Logo**: done — inline SVG lockup (Γ tile + Manrope wordmark) in nav/footer; `favicon.svg` + PNG icons generated. Old `logo.png`/`logo2.png` removed.
- **Social card**: done — `og:image` / `twitter:image` point at `og-image.png` (1200×630). To regenerate after edits: tweak `og-card.html`, then `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --force-device-scale-factor=2 --window-size=1200,630 --virtual-time-budget=4000 --screenshot=og-image.png file://$PWD/og-card.html` and `sips -z 630 1200 og-image.png`.
- **Calendar**: Form success redirects to `https://scheduler.zoom.us/kevin-mejias/gammatechgroup` (Zoom Scheduler) — update the `#calBtn` href if the link changes.

## Hosting (GitHub Pages + custom domain)

Repo: `kevinmejiasc/mk-consulting-landing-page`.

1. Push to GitHub (`main`).
2. Repo Settings → Pages → Source: Deploy from branch → `main` / `/ (root)`.
3. Custom domain: the `CNAME` file holds `gammatechgroup.com`. In Settings → Pages, enter the domain and enable "Enforce HTTPS".
4. DNS at the registrar:
   - Apex `gammatechgroup.com` → four A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (and AAAA records for IPv6 if desired).
   - `www` → CNAME → `kevinmejiasc.github.io`.

## Design tokens (CSS variables)

| Variable | Value | Usage |
|---|---|---|
| `--accent` | `#d4ff3d` | Electric lime — primary CTA color |
| `--accent-warm` | `#ff5722` | Heat orange — strikethrough effect |
| `--bg` | `#07070a` | Base background |
| `--ink` | `#f6f5f0` | Primary text |
| `--body` | Manrope | Body font |
| `--display` | Fraunces | Heading font |
| `--mono` | JetBrains Mono | Labels, tags |

## Common edits

**Change hero headline**: Edit the `<h1 class="hero-title">` block  
**Add/remove FAQ items**: Add/remove `<details>` blocks inside `#faq` and mirror in the JSON-LD `FAQPage` script  
**Update trust stats**: The three `.trust-item` divs inside `.hero-trust`  
**Change the calendar link**: Edit the `#calBtn` href in the modal success state (the JS auto-redirect reads from that same href)  
