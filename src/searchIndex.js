import rawEntries from './generated/search-index.json';

// The index is generated at build time by scripts/build-search-index.js and holds
// only titles and paths. It used to be built by importing every data file, which
// pulled all ~2 MB of content into the main bundle — so opening one page
// downloaded the whole site. Documents now load per route instead.

// Stored compactly (t/p/g/d); rehydrate into the shape the palette renders.
export const searchEntries = rawEntries.map((entry) => ({
    id: entry.p,
    title: entry.t,
    path: entry.p,
    group: entry.g,
    kind: entry.p.includes('?topic=') ? 'topic' : 'page',
    keywords: `${entry.t} ${entry.d || ''} ${entry.g}`.toLowerCase(),
}));

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
