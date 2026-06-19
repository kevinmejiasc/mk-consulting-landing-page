# Gamma Tech Group Landing Page

Single-file static landing page for Gamma Tech Group (formerly M.K Consulting) — AI automation & workflow consulting for Atlanta-area businesses. Domain: `gammatechgroup.com`.

## Project structure

```
index.html             — the entire site (HTML + CSS + JS in one file)
google-apps-script.gs  — Google Sheets lead-capture endpoint (deploy as an Apps Script Web App)
robots.txt             — crawl rules (allows major AI/LLM crawlers) + sitemap pointer
sitemap.xml            — single-URL sitemap
llms.txt               — concise site summary for AI search engines
CNAME                  — custom domain for GitHub Pages (gammatechgroup.com)
logo.png, logo2.png    — brand marks (still show old "M.K" art — replace with Gamma Tech Group)
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

- **Sheets endpoint**: Set `SHEETS_ENDPOINT` near the top of the `<script>` in index.html to the Apps Script Web App URL (see `google-apps-script.gs` for setup). Until set, leads log to console only.
- **Sheet ID**: Set `SHEET_ID` in `google-apps-script.gs` before deploying it.
- **Logo art**: `logo.png` / `logo2.png` still show the old M.K mark — replace the image files with the Gamma Tech Group logo (filenames can stay the same).
- **Social card**: `og:image` / `twitter:image` point at `logo2.png`. A dedicated 1200×630 share image is recommended for nicer link previews.
- **Calendar**: Form success redirects to `https://calendar.app.google/MMjszRpnR6TFjwmLA` (Google Calendar appointment scheduling) — update the `#calBtn` href if the link changes.

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
