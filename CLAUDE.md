# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Create React App (react-scripts) project — no custom lint script; ESLint runs as part of `start`/`build`.

- `npm start` — dev server
- `npm run build` — production build
- `npm test` — Jest in watch mode; run a single file with `npm test -- TopicPage` (matches test path pattern), non-interactive with `npm test -- --watchAll=false`
- `npm run deploy` — builds and publishes `build/` to GitHub Pages via gh-pages (homepage: hamza-el-khatib.github.io/spring-learning-platform)
- `docker compose up dev` — dev server with hot reload in a container, on :3000
- `docker compose up --build web` — the production image (nginx serving the static build) on :8080

`prestart` and `prebuild` run `scripts/build-search-index.js`, which regenerates
`src/generated/search-index.json`. That file is gitignored and derived from `src/data`,
so run `npm run build:search-index` after adding content if you are not going through
`npm start`/`npm run build`.

### Bundle: keep it split

Routes are `React.lazy` in `App.js` so each page's component **and its JSON** land in a
separate chunk. Two things will silently undo that, so avoid both:

- **Importing a data file from anything that always loads** (Layout, Header, the search
  palette). That pins the content into the main chunk. The Ctrl+K index deliberately
  reads only the generated titles file for this reason.
- **Converting a route back to a static import** in `App.js`.

Initial load is ~72 KB gzipped; it was 638 KB when everything sat in one chunk.

### Docker

`Dockerfile` is a multi-stage build: node builds the static site, nginx serves it (~85 MB).
`Dockerfile.dev` is the hot-reload image. `docker/nginx.conf` sets caching (immutable for
hashed assets, no-cache for `index.html`) and gzip.

Two things there are load-bearing and easy to break:
- `ENV PUBLIC_URL="/"` in the Dockerfile. It must not be `""` — CRA treats an empty string
  as unset and falls back to the `homepage` field, which makes every asset 404 and renders
  a blank page.
- `package-lock.json` is committed on purpose; `npm ci` in the build needs it. If it drifts
  out of sync with `package.json`, the Docker build fails while local builds keep working.

## Content data

`src/data/<category>/<name>.json`, categories: `spring/`, `java/`, `databases/`,
`architecture/`, `bestPractices/`, `devops/`, `scrum/`, `practice/`, `german/`, plus
`images/` (design-pattern diagrams). All tracked in git.

The content is transcribed from an Obsidian vault outside the repo
(`Interview Prep`); `CONTENT-GAPS.md` records what came from where and the
de-duplication decisions. Some vault `json/` files are structural mirrors of their
`.md` and add nothing — check before importing one.

Only English. A former EN/FR system was removed; do not recreate `-fr.json` files.

## Architecture

React 18 SPA using **HashRouter** (required for GitHub Pages), Tailwind CSS (dark theme: gray-800/900 backgrounds, purple/pink gradient accents), lucide-react icons, react-syntax-highlighter (Prism + oneDark) for code blocks. Content lives entirely in JSON data files; components are renderers. English only — a former EN/FR i18n system was fully removed, so avoid reintroducing language context/selectors.

### One shared page template — do not hand-roll page layouts

Every topic page renders through `src/components/template/TopicPageTemplate.js`. Pages are thin: import JSON, pass it in. A typical page is five lines:

```js
const RestPage = () => <TopicPageTemplate data={data} persistKey="spring-rest" />;
```

Never reintroduce per-page copies of tab bars, cards, or code blocks — that duplication is what this template replaced.

`src/components/template/`:
- **`TopicPageTemplate.js`** — page shell: gradient header, tag pills, tab bar over topics, active-topic panel, `FloatingMenu` mobile nav. Also exports `SectionPanel` for footer sections.
- **`ContentRenderer.js`** — recursive `renderContent(value, type, opts, key)`. Handles both JSON conventions plus arbitrary nested objects, detecting tables, code, bad/good pairs, diagrams, and star ratings by key name.
- **`primitives.js`** — `ContentCard`, `StyledListItem`, `DataTable`, `StarRating`, `CodePair`, `TagPills`, `deriveType`, `prettifyKey`.
- **`CodeBlock.js`** — Prism + oneDark with a copy button. `language="text"` renders a bare `<pre>` for ASCII diagrams and pseudocode (Prism would mangle them). `getCodeString` normalizes string | `{code|snippet}` | array.
- **`icons.js`** — `getTopicIcon` / `getSectionIcon` keyword→lucide maps.

Template props: `persistKey` (localStorage tab memory), `images` (filename→imported module for `diagram` fields), `resolveDiagram` (function form), `language` (default code language), `iconOverrides`, `renderTopic` (full custom rendering for one topic — used by JavaFundamentalsPage to slot in `EnhancedInterviewFAQs`), `header`, `footer` (always-visible sections below the tabs).

Pages whose JSON root isn't `topics[]`/`sections[]` build a `topics[]` array at module level before passing it in — see `ScrumPage`, `SolidPage`, `DesignPatternsPage`.

`src/pages/TopicPage.js` remains the `/:section/:topic` fallback: a registry lookup that renders through the same template, with a "topic not found" state.

Some pages keep a bespoke **body** because their content isn't topic-shaped — `DefinitionsPage` (all-visible glossary grid), `EnhancedInterviewFAQs` (searchable Q&A accordion), and the German pages (declension tables, vocabulary and conjugation browsers). They still use the shared **chrome** from `shell.js`, so they match everything else. Import `PageHeader`/`PageTabs`/`ActivePanel`/`useTabs` rather than hand-writing a header or tab bar.

### JSON structures the template understands

Either root convention works — `{ title, topics: [...] }` or `{ title, sections: [...] }`. Within a topic, either the `multi-content` style below or arbitrary old-style payload keys (`concepts`, `types`, `features`, `patterns`, …), which get one `SectionPanel` per key.

```json
{
  "title": "Page Title",
  "topics": [
    {
      "title": "Topic Name",
      "multi-content": [
        { "title": "description", "simple-content": "string" },
        { "title": "section title", "multi-content": [...] },
        { "title": "code_examples", "multi-content": [{ "title": "...", "simple-content": "code" }] }
      ]
    }
  ]
}
```

### Navigation

`src/navigation.js` is the single source of truth — the sidebar, the home page grid, and the search index all read from it, so adding a page there gets it into all three.

`src/searchIndex.js` imports every data file and flattens it into one entry per page plus one per topic tab, powering the Ctrl+K / `/` palette (`src/components/layout/QuickSearch.js`, mounted in `Layout`). Topic results link to `?topic=<tab>`, which `TopicPageTemplate` reads to open on that tab. Where a page's tabs don't match what users search for — design patterns are searched by pattern name but tabbed by category — `entriesFor` maps the searchable label to the tab that contains it; keep that mapping right when adding such a page.

### Adding a new topic page requires touching three places

1. Add the JSON in `src/data/<category>/`
2. Create the page component in `src/pages/topics/<category>/` (a `TopicPageTemplate` one-liner) and route it in `src/App.js` (dedicated routes must come before the `/:section/:topic` fallback)
3. Add it to `navigationGroups` in `src/navigation.js`, and to the import map in `src/searchIndex.js` so its topics are searchable

German-language pages (`src/pages/topics/german/`) are a separate content area with their own routes under both `/learn/*` and `/german/*`; `sectionKey()` in `navigation.js` maps `learn` onto the `german` sidebar group. They render their own bodies (declension tables, vocabulary/conjugation browsers) but use the same header, tabs, cards and palette as everything else — keep it that way rather than reintroducing per-page accent colors.

`Layout` hides the sidebar for `/`, `/learn/german`, `/learn/vocabulary` and `/learn/konjugation`: the first two are hubs, and the last two carry their own list sidebar, which leaves too little room beside a second one.
