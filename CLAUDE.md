# M.K Consulting Landing Page

Single-file static landing page for M.K Consulting — AI automation & workflow consulting for Atlanta-area businesses.

## Project structure

```
index.html   — the entire site (HTML + CSS + JS in one file)
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

## Before launch — update these placeholders

- **Domain**: All URLs reference `mkconsulting.com` — swap with the real domain once registered
- **Email**: `hello@mkconsulting.com` in the footer contact link
- **Canonical URL**: `<link rel="canonical" href="https://mkconsulting.com/" />`
- **Form backend**: The `#leadForm` submit handler logs to console only — wire it to a real endpoint (Zapier webhook, GHL, Supabase, etc.) at line ~1383 in index.html

## Hosting (GitHub Pages recommended)

1. Push this repo to GitHub
2. Go to repo Settings → Pages → Source: Deploy from branch → `main` / `/ (root)`
3. Site will be live at `https://<username>.github.io/<repo-name>/`
4. For a custom domain, add a `CNAME` file containing your domain name

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
**Swap CTA call link**: Replace `href="#book"` with `href="https://calendly.com/..."` or similar  
