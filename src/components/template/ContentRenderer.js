import React from 'react';
import CodeBlock, { getCodeString, looksLikeCode } from './CodeBlock';
import {
    ContentCard, StyledListItem, DataTable, StarRating, CodePair,
    deriveType, prettifyKey,
} from './primitives';

const CODE_KEYS = /^(code|codes|snippet|snippets|syntax|pseudocode|implementation_code)$/i;
const EXAMPLE_KEYS = /^(example|examples)$/i;

// Keys that name an item; the first one present becomes the card heading
const HEADING_KEYS = [
    'title', 'name', 'feature', 'concept', 'principle', 'pattern', 'term',
    'type', 'method', 'operation', 'command', 'strategy', 'state', 'question',
];
// Generic wrapper keys holding body prose; rendered bare, with no "Label:" prefix
const BODY_KEYS = new Set(['content', 'text', 'body']);

const SKIP_KEYS = new Set(['id', 'icon', ...HEADING_KEYS]);

// Keys that pair up into a bad↔good toggle
const PAIR_SHAPES = [
    ['bad', 'good'],
    ['incorrect', 'correct'],
    ['bad_practice', 'good_practice'],
    ['problematic', 'correct'],
];

const Paragraph = ({ text }) => {
    const lines = String(text).split('\n');
    return (
        <p className="text-gray-300 text-sm">
            {lines.map((line, i) => (
                <React.Fragment key={i}>
                    {line}
                    {i < lines.length - 1 && <br />}
                </React.Fragment>
            ))}
        </p>
    );
};

const itemHeading = (item) => {
    const key = HEADING_KEYS.find((k) => typeof item[k] === 'string' && item[k].trim());
    return key ? item[key] : null;
};

// Empty strings/arrays/objects would render as a stray label with no content
const isEmpty = (value) =>
    value === null || value === undefined ||
    (typeof value === 'string' && !value.trim()) ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0);

const isTable = (value) =>
    value && typeof value === 'object' && !Array.isArray(value) &&
    Array.isArray(value.rows) && (Array.isArray(value.headers) || value.headers === undefined);

const findPair = (obj) => {
    for (const [badKey, goodKey] of PAIR_SHAPES) {
        if (obj[badKey] !== undefined && obj[goodKey] !== undefined) {
            return { bad: obj[badKey], good: obj[goodKey], badKey, goodKey };
        }
    }
    return null;
};

// Renders any JSON value with sensible defaults. `opts.images` maps a
// diagram/file name from the JSON to an imported image module.
export const renderContent = (content, contentType = 'default', opts = {}, key = null, depth = 0) => {
    if (content === null || content === undefined) return null;

    // ---- primitives ----
    if (typeof content === 'number' || typeof content === 'boolean') {
        return <p className="text-gray-300 text-sm">{String(content)}</p>;
    }

    if (typeof content === 'string') {
        if (key && CODE_KEYS.test(key)) return <CodeBlock code={content} language={opts.language} />;
        if (key && EXAMPLE_KEYS.test(key) && looksLikeCode(content)) {
            return <CodeBlock code={content} language={opts.language} />;
        }
        if (key === 'diagram') {
            const img = opts.resolveDiagram?.(content) ?? opts.images?.[content];
            if (img) return <img src={img} alt="diagram" className="max-w-full rounded-md border border-gray-700/50 bg-white" />;
            return <CodeBlock code={content} language="text" />;
        }
        if (key === 'pseudocode') return <CodeBlock code={content} language="text" />;
        // ASCII art (tree diagrams etc.) must keep its whitespace
        if (content.includes('\n') && /[│├└┌┐─┬┴↳]/.test(content)) {
            return <CodeBlock code={content} language="text" />;
        }
        return <Paragraph text={content} />;
    }

    // ---- arrays ----
    if (Array.isArray(content)) {
        if (content.every((item) => typeof item === 'string')) {
            // Array of code snippets under a code key
            if (key && (CODE_KEYS.test(key) || (EXAMPLE_KEYS.test(key) && content.some(looksLikeCode)))) {
                return <CodeBlock code={content.join('\n')} language={opts.language} />;
            }
            return (
                <ul className="space-y-1">
                    {content.map((item, idx) => (
                        <StyledListItem key={idx} type={contentType}>{item}</StyledListItem>
                    ))}
                </ul>
            );
        }
        return (
            <div className="space-y-3">
                {content.map((item, idx) => (
                    <div key={idx}>{renderContent(item, contentType, opts, key, depth)}</div>
                ))}
            </div>
        );
    }

    // ---- objects ----
    if (typeof content === 'object') {
        // New-style: code_examples group
        if (content.title === 'code_examples' && content['multi-content']) {
            return (
                <ContentCard title="Code Examples" contentType="code" className="mb-3" depth={depth}>
                    <div className="space-y-3">
                        {content['multi-content'].map((example, idx) => (
                            <CodeBlock key={idx} code={example['simple-content']} title={example.title} language={opts.language} />
                        ))}
                    </div>
                </ContentCard>
            );
        }

        // New-style: { title, simple-content }
        if (content.title && content['simple-content'] !== undefined) {
            const t = content.title.toLowerCase();
            if (t.includes('code') || t.includes('example')) {
                return <CodeBlock code={content['simple-content']} title={content.title} language={opts.language} />;
            }
            return (
                <ContentCard title={content.title} contentType={deriveType(content.title, contentType)} className="mb-3" depth={depth}>
                    {renderContent(content['simple-content'], deriveType(content.title, contentType), opts, null, depth + 1)}
                </ContentCard>
            );
        }

        // New-style: { title, multi-content }
        if (content.title && content['multi-content']) {
            const derived = deriveType(content.title, contentType);
            return (
                <ContentCard title={content.title} contentType={derived} className="mb-3" depth={depth}>
                    {renderContent(content['multi-content'], derived, opts, null, depth + 1)}
                </ContentCard>
            );
        }

        // Table
        if (isTable(content)) {
            return <DataTable headers={content.headers} rows={content.rows} />;
        }

        // Pure code object: { code | snippet [, title, language] }
        const pureCode = getCodeString(content);
        if (pureCode !== null && Object.keys(content).every((k) =>
            ['code', 'snippet', 'content', 'title', 'language', 'description'].includes(k))) {
            return (
                <div className="space-y-2">
                    {content.description && <Paragraph text={content.description} />}
                    <CodeBlock code={pureCode} title={content.title} language={content.language || opts.language} />
                </div>
            );
        }

        // Bad ↔ good pair
        const pair = findPair(content);
        if (pair) {
            const rest = Object.entries(content).filter(
                ([k]) => k !== pair.badKey && k !== pair.goodKey && !SKIP_KEYS.has(k)
            );
            return (
                <div className="space-y-3">
                    {rest.map(([k, v], idx) => (
                        <div key={idx}>{renderEntry(k, v, contentType, opts, depth)}</div>
                    ))}
                    <CodePair bad={pair.bad} good={pair.good} language={opts.language} />
                </div>
            );
        }

        // Generic object: heading, then body prose, then remaining entries
        const heading = itemHeading(content);
        const bodyText = ['description', ...BODY_KEYS]
            .filter((k) => typeof content[k] === 'string' && content[k].trim())
            .map((k) => content[k]);
        const entries = Object.entries(content).filter(
            ([k, v]) => !SKIP_KEYS.has(k) && k !== 'description' && !BODY_KEYS.has(k) && !isEmpty(v)
        );
        // When this object gets its own card, its entries sit inside it and so
        // are one level deeper; without a heading they stay at this level.
        const childDepth = heading ? depth + 1 : depth;
        const body = (
            <div className="space-y-3">
                {bodyText.map((text, idx) => <Paragraph key={idx} text={text} />)}
                {entries.map(([k, v], idx) => (
                    <div key={idx}>{renderEntry(k, v, contentType, opts, childDepth)}</div>
                ))}
            </div>
        );

        if (heading) {
            return (
                <ContentCard title={heading} contentType={deriveType(heading, contentType)} className="mb-1" depth={depth}>
                    {content.answer !== undefined
                        ? renderContent(content.answer, contentType, opts, null, depth + 1)
                        : body}
                </ContentCard>
            );
        }
        return body;
    }

    return null;
};

// Renders one key/value entry of an old-style payload object
const renderEntry = (key, value, contentType, opts, depth = 0) => {
    // Interview-relevance star widget
    if (key === 'interviewRelevance' && typeof value === 'number') {
        return <StarRating value={value} />;
    }

    // Code-ish values render bare (no wrapping card needed)
    if (typeof value === 'string' && (CODE_KEYS.test(key) || key === 'diagram' || key === 'pseudocode' ||
        (EXAMPLE_KEYS.test(key) && looksLikeCode(value)))) {
        return renderContent(value, contentType, opts, key, depth);
    }

    // Source under an unrecognised key ("problematic", "incorrect", …) still
    // needs a code block. Require a newline plus code punctuation so ordinary
    // prose isn't mistaken for code.
    if (typeof value === 'string' && value.includes('\n') && /[;{}]|=>|->|::/.test(value)) {
        return (
            <div>
                <p className="text-sm font-medium text-purple-300 mb-1">{prettifyKey(key)}</p>
                <CodeBlock code={value} language={opts.language} />
            </div>
        );
    }

    const nestedType = deriveType(key, contentType);

    // Short scalar → "Label: value" line
    if (typeof value === 'string' && value.length <= 120 && !value.includes('\n')) {
        return (
            <p className="text-sm text-gray-300">
                <span className="font-medium text-purple-300">{prettifyKey(key)}: </span>
                {value}
            </p>
        );
    }

    // Everything else → labeled card
    return (
        <ContentCard title={prettifyKey(key)} contentType={nestedType} depth={depth}>
            {renderContent(value, nestedType, opts, key, depth + 1)}
        </ContentCard>
    );
};

export default renderContent;
