# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Create React App (react-scripts) project — no custom lint script; ESLint runs as part of `start`/`build`.

- `npm start` — dev server
- `npm run build` — production build
- `npm test` — Jest in watch mode; run a single file with `npm test -- TopicPage` (matches test path pattern), non-interactive with `npm test -- --watchAll=false`
- `npm run deploy` — builds and publishes `build/` to GitHub Pages via gh-pages (homepage: hamza-el-khatib.github.io/spring-learning-platform)

## Critical: the data directory and .gitignore

**`src/data/` is listed in `.gitignore`** (a leftover from a plan to symlink it from an external directory). The English JSON files were restored from git history (commit 5840e57) and exist on disk, but changes to them are invisible to `git status` unless they are tracked/staged. Be careful: `git clean -x` would delete them. The French `-fr.json` variants were deliberately not restored — do not recreate them. If builds fail with "Module not found: .../data/...", the content is recoverable from commit 5840e57 (`git checkout 5840e57 -- src/data/...`).

Layout: `src/data/<category>/<name>.json` with categories `spring/`, `java/`, `databases/`, `architecture/`, `bestPractices/`, `devops/`, `scrum/`, `german/`, plus `images/` (design-pattern diagrams).

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

Two pages deliberately keep bespoke layouts: `DefinitionsPage` (all-visible glossary grid for interview lookup) and the German pages.

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

### Adding a new topic page requires touching four places

1. Add the JSON in `src/data/<category>/`
2. Create the page component in `src/pages/topics/<category>/` (a `TopicPageTemplate` one-liner)
3. Add the route in `src/App.js` (dedicated routes must come before the `/:section/:topic` fallback)
4. Add entries in `src/components/layout/Sidebar.js` (`navigationGroups`) **and** `src/pages/HomePage.js` (`categories`) — both are hand-maintained link lists, and a page missing from either is effectively unreachable

German-language pages (`src/pages/topics/german/`) are a separate feature set with their own routes (`/learn/*`, `/german/*`) and do not follow the topic-page pattern.
