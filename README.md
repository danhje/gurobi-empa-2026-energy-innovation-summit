# Energy Innovation Summit 2026

Slides for the **Gurobi × Empa Energy Innovation Summit 2026**, built with [reveal.js](https://revealjs.com/) 5.2.1.

**Live site:** https://danhje.github.io/gurobi-empa-2026-energy-innovation-summit/

This is a static site. There is no build step. reveal.js is vendored in `vendor/reveal.js/` (dist and plugin files only), so the deck does not depend on a CDN for the framework. Google Fonts (Poppins and Inter) and KaTeX (loaded by the math plugin) are fetched from the network when you open the deck.

## View locally

From this directory, serve the files over HTTP (needed so `slides.md` can be fetched):

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000/.

Keyboard shortcuts worth knowing:

- `→` / `space` — next slide
- `S` — speaker notes
- `F` — fullscreen
- `Esc` / `O` — slide overview
- `P` — presentation mode (PDF print stylesheet via `?print-pdf`)

## Edit the deck

Slide content lives in [`slides.md`](slides.md). It is ordinary Markdown, with a few reveal.js conventions:

- `---` starts a new horizontal slide
- `--` starts a vertical (stacked) slide
- `Note:` begins speaker notes for that slide
- `<!-- .element: class="fragment" -->` on a list item reveals it step by step
- `<!-- .slide: class="title-slide" -->` attaches a class to the whole slide
- HTML is allowed when you need a layout that Markdown cannot express (for example the two-column `.cols` block)

The theme and global background are in [`css/theme.css`](css/theme.css). The background is a fixed 16:9 HTML/CSS layer (no images) that does not change between slides: an espresso base (`#160D08`) with a 70° linear gradient that builds toward the top-right through dark roast, walnut, cinnamon, copper, burnt orange, and amber, never fading below a 15% floor on the left. Four overlapping espresso rectangles at 16% opacity are anchored to the bottom-right corner and form a staircase.

Presentation chrome (16:9 at 1920×1080, fade transitions, slide numbers, hash URLs, plugins) is configured in [`index.html`](index.html).

## Deploy

GitHub Pages is enabled on this repository: it publishes the `main` branch from `/` (the repo root). Pushing to `main` updates the live site at the URL above. A `.nojekyll` file is included so GitHub Pages serves the files as a plain static site.

```bash
git add -A
git commit -m "Update slides"
git push origin main
```

The published site is usually ready within a minute of the push.
