#!/usr/bin/env node
/*
 * Generates src/generated/search-index.json — the titles the Ctrl+K palette
 * searches.
 *
 * Why this exists: the palette used to import every data file to read their
 * topic titles, which pulled ~2 MB of content into the main bundle so that a
 * visitor downloaded all 49 documents to read one page. This emits just the
 * titles (tens of KB), leaving the documents to load per route.
 *
 * Runs automatically via the prestart/prebuild hooks in package.json.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const OUT_DIR = path.join(SRC, 'generated');
const OUT_FILE = path.join(OUT_DIR, 'search-index.json');

const groups = JSON.parse(fs.readFileSync(path.join(SRC, 'navigation.data.json'), 'utf8'));

// Route -> data file. Pages absent here (the German ones) are still searchable
// by page name; only their topic tabs are left out.
const DATA_BY_PATH = {
    '/java/fundamentals': 'java/java-fundamentals.json',
    '/java/collections': 'java/collections.json',
    '/java/concurrency': 'java/concurrency.json',
    '/java/exceptions': 'java/exceptions.json',
    '/java/features': 'java/java-8-plus-features.json',
    '/java/testing': 'java/unit-testing.json',
    '/java/functional-programming': 'java/functional-programming.json',
    '/java/jvm': 'java/jvm-internals.json',
    '/java/modern': 'java/modern-java.json',
    '/spring/core': 'spring/core-concepts.json',
    '/spring/boot': 'spring/spring-boot.json',
    '/spring/data': 'spring/spring-data.json',
    '/spring/security': 'spring/spring-security.json',
    '/spring/rest': 'spring/rest-apis.json',
    '/spring/graphql': 'spring/graphql.json',
    '/spring/definitions': 'spring/definitions.json',
    '/databases/sql': 'databases/sql.json',
    '/databases/hibernate': 'databases/hibernate.json',
    '/databases/transactions': 'databases/transactions.json',
    '/databases/redis': 'databases/redis.json',
    '/databases/nosql': 'databases/nosql.json',
    '/architecture/design-patterns': 'architecture/design-patterns.json',
    '/architecture/solid': 'architecture/solid.json',
    '/architecture/principles': 'architecture/principles.json',
    '/architecture/microservices': 'architecture/microservices.json',
    '/architecture/kafka': 'architecture/kafka.json',
    '/architecture/system-design': 'architecture/system-design.json',
    '/architecture/performance': 'architecture/performance.json',
    '/devops/git': 'devops/git.json',
    '/devops/cicd': 'devops/cicd.json',
    '/devops/containers': 'devops/containers.json',
    '/devops/practices': 'devops/practices.json',
    '/devops/cloud': 'devops/cloud.json',
    '/agile/scrum': 'scrum/scrum.json',
    '/best-practices/code-reviews': 'bestPractices/codeReviews.json',
    '/practice/questions': 'practice/technical-questions.json',
    '/practice/by-level': 'practice/qa-by-level.json',
    '/practice/dsa': 'practice/dsa-patterns.json',
    '/practice/scenarios': 'practice/scenarios.json',
};

// Searchable label -> the tab the page actually opens on. They differ where a
// page groups many named things under fewer tabs.
function entriesFor(routePath, data) {
    if (routePath === '/architecture/design-patterns') {
        // Pattern names are what you search for; each lives under a category tab
        return (data.categories || []).flatMap((category) =>
            (category.patterns || [])
                .filter((pattern) => pattern.name)
                .map((pattern) => ({ label: pattern.name, tab: category.name }))
        );
    }
    if (routePath === '/architecture/solid') {
        return (data.principles || []).map((p) => {
            const label = p.acronym ? `${p.acronym}: ${p.name}` : p.name;
            return { label, tab: label };
        });
    }
    if (routePath === '/agile/scrum') {
        return ['Roles', 'Events', 'Artifacts', 'Key Concepts', 'Best Practices', 'Common Pitfalls', 'Metrics']
            .map((title) => ({ label: title, tab: title }));
    }
    return (data.topics || data.sections || [])
        // `code_examples` is a content bucket, not a topic anyone looks up
        .filter((topic) => topic.title && topic.title !== 'code_examples')
        .map((topic) => ({ label: topic.title, tab: topic.title }));
}

const entries = [];
const missing = [];

for (const group of groups) {
    for (const item of group.items) {
        // Compact shape: t=title, p=path, g=group, d=description.
        // The runtime derives id, kind and keywords from these.
        entries.push({ t: item.title, p: item.path, g: group.title, d: item.description || '' });

        const rel = DATA_BY_PATH[item.path];
        if (!rel) continue;

        const file = path.join(SRC, 'data', rel);
        if (!fs.existsSync(file)) {
            missing.push(`${item.path} -> ${rel}`);
            continue;
        }

        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        for (const { label, tab } of entriesFor(item.path, data)) {
            entries.push({
                t: label,
                p: `${item.path}?topic=${encodeURIComponent(tab)}`,
                g: `${group.title} › ${item.title}`,
            });
        }
    }
}

// A route in navigation.data.json with no data mapping is usually a wiring
// mistake, so make it visible rather than silently shipping an unsearchable page.
const unmapped = groups
    .flatMap((g) => g.items.map((i) => i.path))
    .filter((p) => !DATA_BY_PATH[p] && !p.startsWith('/learn/') && !p.startsWith('/german/'));

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(entries) + '\n');

const kb = (fs.statSync(OUT_FILE).size / 1024).toFixed(1);
console.log(`search-index: ${entries.length} entries, ${kb} KB`);
if (missing.length) console.warn('  missing data files:\n   ' + missing.join('\n   '));
if (unmapped.length) console.warn('  routes with no data mapping:\n   ' + unmapped.join('\n   '));
