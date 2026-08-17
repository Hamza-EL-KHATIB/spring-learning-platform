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

### Two-tier page system

1. **Dedicated pages** (`src/pages/topics/<category>/<Name>Page.js`) — rich, self-contained components for Spring, Java, Architecture, Transactions, Best Practices, German. Each explicitly routed in `App.js`.
2. **`src/pages/TopicPage.js` fallback** — the `/:section/:topic` catch-all route. Contains its own `jsonData` registry mapping section/topic params to imported JSON, and renders the *old* JSON structure (`concepts`, `types`, `code` fields) via `src/components/topic/` renderers (ConceptRenderer, TypeRenderer, ListRenderer, CodeExample). Used by SQL, Hibernate, Redis, Git, Scrum.

### Dedicated page pattern (follow when creating/modifying pages)

Each dedicated page is self-contained — sub-components are defined inline in the page file, not shared:

1. Static import of the EN JSON file
2. `useState` for `activeTopic`, defaulting to the first topic in `data.topics`
3. `TopicNavigation` — tab bar over `data.topics`
4. `getTopicIcon(title)` / `getSectionIcon(title)` — map title strings/keywords to lucide icons
5. `renderTopicSections(topic)` — pulls intro sections (description/definition) out first, renders the rest
6. `renderContent(content, contentType)` — recursive renderer handling strings, arrays, and objects with `simple-content` / `multi-content`
7. Inline styled sub-components: `ContentCard`, `CodeBlock`, `StyledListItem`

`RestPage.js` (`src/pages/topics/spring/RestPage.js`) is the reference implementation of this pattern.

### JSON structure for dedicated pages

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

### Adding a new topic page requires touching three places

1. Create the page component in `src/pages/topics/<category>/` (plus its JSON in the external data dir)
2. Add the route in `src/App.js` (dedicated routes must come before the `/:section/:topic` fallback)
3. Add the sidebar entry in `src/components/layout/Sidebar.js` (`navigationGroups`) — this is the real navigation; `src/components/navigation/NavigationStructure.js` is an unused example, don't edit it expecting UI changes

German-language pages (`src/pages/topics/german/`) are a separate feature set with their own routes (`/learn/*`, `/german/*`) and do not follow the topic-page pattern.
