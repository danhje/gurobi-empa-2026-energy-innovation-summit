# Notes for agents

- This deck holds Daniel's own notes as an *attendee* of the summit, not the speakers' slides. Write content from his perspective; don't present it as if Gurobi or Empa authored it. The README deliberately doesn't spell this out.
- Pushing to `main` publishes immediately to the public GitHub Pages site. There is no staging branch.
- The background (gradient angle, stops, step sizes) was tuned by hand with Daniel. Don't change it unless asked.
- Colour rule: no pure reds or magentas anywhere. Use the CSS variables in `css/theme.css`. Roles: `--honey` for eyebrows, `h3` and links; `--cream` for titles and body; `--taupe` for subtitles; `--sand` for meta lines such as dates; `--burnt-orange` and `--amber` for small accents.
- Slide building blocks in `slides.md` (not used on every slide):
  - `<!-- .slide: class="title-slide" -->` gives the left-weighted title layout. Pair it with `<p class="eyebrow">`, `# Title`, `<p class="subtitle">` and `<p class="meta">`.
  - `<div class="cols">` with two child `<div>`s makes a two-column layout. Leave blank lines inside the divs so the Markdown still renders.
  - Code blocks have a semi-transparent espresso background (`rgba(22, 13, 8, 0.78)`) so the background shows through. Keep that alpha roughly where it is.
  - Maths: use `$$ … $$` or `$ … $`, never wrap it in backticks (KaTeX skips code spans).
- Text may extend into the brighter right-hand area. Check legibility rather than hard-capping width.
- reveal.js 5.2.1 is vendored in `vendor/`. Keep it local rather than switching to a CDN. KaTeX is pinned via `katex.version` in `index.html`.
- To preview without Playwright: run `python3 -m http.server 8765`, then `google-chrome --headless=new --no-sandbox --hide-scrollbars --window-size=1920,1080 --virtual-time-budget=4000 --screenshot=out.png "http://localhost:8765/#/2"` (the hash picks the slide index).

- The summit program lives in `program.json` and is the single source of truth for the left-hand overview. It was built from the Obsidian note `Energy innovation summit in Zurich 2026.md`; change the JSON when the program changes, don't invent sessions. A `notes` field, when present, is the linked notes page name for later mapping — not shown in the sidebar.
- Tag the first slide of a session with `<!-- .slide: data-session="item-id" -->`. Later slides inherit the most recent preceding `data-session` in document order (horizontal and vertical). `data-session="none"` or class `no-program` hides the sidebar. It is also hidden on `.title-slide` unless that slide has its own `data-session`. The sidebar lists every group in `program.json` at once (program days and later sections such as Summary), titles only; each heading is the group's `label`. Toggle it with `T`.

- Photographs from the notes live in `assets/img/` as web-optimised JPEGs (about 1600px on the long side, quality around 82, EXIF rotation applied, metadata stripped). Don't commit the original multi-MB files from the vault. In `slides.md`, a `.cols.cols-media` block puts text on the left and an `<img class="slide-image">` on the right.
