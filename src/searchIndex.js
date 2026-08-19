import { navigationGroups } from './navigation';

import javaFundamentals from './data/java/java-fundamentals.json';
import collections from './data/java/collections.json';
import concurrency from './data/java/concurrency.json';
import exceptions from './data/java/exceptions.json';
import features from './data/java/java-8-plus-features.json';
import unitTesting from './data/java/unit-testing.json';
import functionalProgramming from './data/java/functional-programming.json';
import springCore from './data/spring/core-concepts.json';
import springBoot from './data/spring/spring-boot.json';
import springData from './data/spring/spring-data.json';
import springSecurity from './data/spring/spring-security.json';
import restApis from './data/spring/rest-apis.json';
import graphql from './data/spring/graphql.json';
import definitions from './data/spring/definitions.json';
import sql from './data/databases/sql.json';
import hibernate from './data/databases/hibernate.json';
import transactions from './data/databases/transactions.json';
import redis from './data/databases/redis.json';
import designPatterns from './data/architecture/design-patterns.json';
import solid from './data/architecture/solid.json';
import principles from './data/architecture/principles.json';
import microservices from './data/architecture/microservices.json';
import kafka from './data/architecture/kafka.json';
import systemDesign from './data/architecture/system-design.json';
import jvmInternals from './data/java/jvm-internals.json';
import git from './data/devops/git.json';
import scrum from './data/scrum/scrum.json';
import codeReviews from './data/bestPractices/codeReviews.json';
import questionBank from './data/practice/technical-questions.json';

const dataByPath = {
    '/java/fundamentals': javaFundamentals,
    '/java/collections': collections,
    '/java/concurrency': concurrency,
    '/java/exceptions': exceptions,
    '/java/features': features,
    '/java/testing': unitTesting,
    '/java/functional-programming': functionalProgramming,
    '/spring/core': springCore,
    '/spring/boot': springBoot,
    '/spring/data': springData,
    '/spring/security': springSecurity,
    '/spring/rest': restApis,
    '/spring/graphql': graphql,
    '/spring/definitions': definitions,
    '/databases/sql': sql,
    '/databases/hibernate': hibernate,
    '/databases/transactions': transactions,
    '/databases/redis': redis,
    '/architecture/design-patterns': designPatterns,
    '/architecture/solid': solid,
    '/architecture/principles': principles,
    '/architecture/microservices': microservices,
    '/architecture/kafka': kafka,
    '/architecture/system-design': systemDesign,
    '/java/jvm': jvmInternals,
    '/devops/git': git,
    '/agile/scrum': scrum,
    '/best-practices/code-reviews': codeReviews,
    '/practice/questions': questionBank,
};

// Searchable entries for a page, as { label, tab } — `label` is what the user
// reads, `tab` is the tab the page actually opens on. They differ where a page
// groups many named things under fewer tabs.
const entriesFor = (path, data) => {
    if (path === '/architecture/design-patterns') {
        // Pattern names are what you search for; each lives under a category tab
        return (data.categories || []).flatMap((category) =>
            (category.patterns || [])
                .filter((pattern) => pattern.name)
                .map((pattern) => ({ label: pattern.name, tab: category.name }))
        );
    }
    if (path === '/architecture/solid') {
        return (data.principles || []).map((p) => {
            const label = p.acronym ? `${p.acronym}: ${p.name}` : p.name;
            return { label, tab: label };
        });
    }
    if (path === '/agile/scrum') {
        return ['Roles', 'Events', 'Artifacts', 'Key Concepts', 'Best Practices', 'Common Pitfalls', 'Metrics']
            .map((title) => ({ label: title, tab: title }));
    }
    return (data.topics || data.sections || [])
        // `code_examples` is a content bucket, not a topic users look up
        .filter((topic) => topic.title && topic.title !== 'code_examples')
        .map((topic) => ({ label: topic.title, tab: topic.title }));
};

// Flat list of everything reachable: one entry per page, one per topic tab.
export const searchEntries = navigationGroups.flatMap((group) =>
    group.items.flatMap((item) => {
        const data = dataByPath[item.path];
        const pageEntry = {
            id: item.path,
            title: item.title,
            path: item.path,
            group: group.title,
            kind: 'page',
            keywords: `${item.title} ${item.description || ''} ${group.title}`.toLowerCase(),
        };
        if (!data) return [pageEntry];

        const topicEntries = entriesFor(item.path, data).map(({ label, tab }) => ({
            id: `${item.path}#${label}`,
            title: label,
            path: `${item.path}?topic=${encodeURIComponent(tab)}`,
            group: `${group.title} › ${item.title}`,
            kind: 'topic',
            keywords: `${label} ${item.title} ${group.title}`.toLowerCase(),
        }));
        return [pageEntry, ...topicEntries];
    })
);

// Subsequence match, so "beanscope" finds "Bean Scopes" and "sprsec" finds
// "Spring Security". Exact substring hits rank above scattered ones.
const fuzzyScore = (haystack, needle) => {
    const direct = haystack.indexOf(needle);
    if (direct !== -1) return 1000 - direct;

    let index = 0;
    let score = 0;
    let lastHit = -1;
    for (const char of needle) {
        const hit = haystack.indexOf(char, index);
        if (hit === -1) return -1;
        score += hit === lastHit + 1 ? 5 : 1;
        lastHit = hit;
        index = hit + 1;
    }
    return score;
};

export const searchTopics = (query, limit = 12) => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
        return searchEntries.filter((entry) => entry.kind === 'page').slice(0, limit);
    }

    const scored = searchEntries
        .map((entry) => {
            const titleScore = fuzzyScore(entry.title.toLowerCase(), needle);
            const keywordScore = fuzzyScore(entry.keywords, needle);
            return {
                entry,
                score: Math.max(titleScore, keywordScore === -1 ? -1 : keywordScore * 0.5),
                direct: entry.keywords.includes(needle),
            };
        })
        .filter(({ score }) => score > 0);

    // Subsequence matching is a fallback for abbreviations ("sprsec"), not a
    // way to pad results: once anything contains the query outright, scattered
    // letter matches are noise — "saga" shouldn't surface "String Handling".
    const direct = scored.filter((r) => r.direct);
    const pool = direct.length ? direct : scored;

    return pool
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ entry }) => entry);
};
