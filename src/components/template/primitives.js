import React, { useState } from 'react';
import { Star, ThumbsDown, ThumbsUp } from 'lucide-react';
import { getSectionIcon } from './icons';
import CodeBlock from './CodeBlock';

// Derive a content-type (drives card color) from a title/key.
// "pros"/"cons" need word boundaries — otherwise "Product Owner" and
// "Key Concepts" get scored as advantages and drawbacks.
export const deriveType = (title, fallback = 'default') => {
    const t = (title || '').toLowerCase();
    if (t.includes('benefit') || t.includes('advantage') || /\bpros?\b/.test(t)) return 'benefits';
    if (t.includes('drawback') || t.includes('disadvantage') || t.includes('pitfall') || /\bcons?\b/.test(t)) return 'drawbacks';
    if (t.includes('example')) return 'example';
    if (t.includes('type')) return 'types';
    if (t.includes('feature') || t.includes('propert') || t.includes('characteristic')) return 'features';
    if (t.includes('definition')) return 'definition';
    return fallback;
};

// "camelCaseKey_or-snake" → "Camel Case Key Or Snake"
export const prettifyKey = (key) => {
    if (!key) return '';
    return key
        .replace(/[_-]/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());
};

// JSON section titles are a mix of raw keys ("benefits", "code_examples") and
// real prose ("IoC vs DI"). Only clean up the former — title-casing the latter
// would mangle deliberate capitalisation.
export const humanizeTitle = (title) => {
    if (typeof title !== 'string' || !title) return title;
    return /[A-Z\s]/.test(title) ? title : prettifyKey(title);
};

const CARD_COLORS = {
    definition: 'bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-500/30',
    example: 'bg-gradient-to-br from-pink-900/20 to-pink-800/10 border-pink-500/30',
    code: 'bg-gradient-to-br from-pink-900/20 to-pink-800/10 border-pink-500/30',
    benefits: 'bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-500/30',
    advantages: 'bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-500/30',
    types: 'bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-500/30',
    features: 'bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-500/30',
    properties: 'bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-500/30',
    drawbacks: 'bg-gradient-to-br from-red-900/20 to-red-800/10 border-red-500/30',
    disadvantages: 'bg-gradient-to-br from-red-900/20 to-red-800/10 border-red-500/30',
};

export const ContentCard = ({ title, children, className = '', contentType = 'default' }) => {
    const colorClasses = CARD_COLORS[contentType] || 'bg-gray-800/70 border-gray-700/50';

    if (!title && !children) return null;

    return (
        <div className={`rounded-md p-3 border backdrop-blur-sm transition-all ${colorClasses} ${className} hover:shadow-md text-sm`}>
            {title && (
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-gray-800/70 rounded-md">{getSectionIcon(title)}</div>
                    <h4 className="text-base font-semibold text-white">{humanizeTitle(title)}</h4>
                </div>
            )}
            <div className={title ? 'ml-8' : ''}>{children}</div>
        </div>
    );
};

const BULLET_COLORS = {
    benefits: 'bg-green-400',
    advantages: 'bg-green-400',
    drawbacks: 'bg-red-400',
    disadvantages: 'bg-red-400',
    features: 'bg-blue-400',
    examples: 'bg-pink-400',
};

export const StyledListItem = ({ children, type = 'default' }) => (
    <li className="flex items-start gap-1.5 text-gray-300 mb-1 text-sm">
        <div className={`w-1 h-1 ${BULLET_COLORS[type] || 'bg-gray-400'} rounded-full mt-1.5 shrink-0`}></div>
        <span className="min-w-0">{children}</span>
    </li>
);

// Table for { headers: [], rows: [[]] }
export const DataTable = ({ headers, rows }) => {
    if (!rows || !rows.length) return null;
    return (
        <div className="overflow-x-auto rounded-md border border-gray-700/50">
            <table className="min-w-full text-sm">
                {headers && headers.length > 0 && (
                    <thead>
                        <tr className="bg-gray-800/90">
                            {headers.map((h, i) => (
                                <th key={i} className="px-3 py-2 text-left text-xs font-semibold text-purple-300 border-b border-gray-700/70 whitespace-nowrap">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    {rows.map((row, ri) => (
                        <tr key={ri} className={ri % 2 === 0 ? 'bg-gray-800/40' : 'bg-gray-800/60'}>
                            {(Array.isArray(row) ? row : Object.values(row)).map((cell, ci) => (
                                <td key={ci} className="px-3 py-2 text-gray-300 border-b border-gray-700/30 align-top">
                                    {String(cell)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// 1..5 interview-relevance stars
export const StarRating = ({ value, max = 5 }) => (
    <div className="flex items-center gap-0.5" title={`Interview relevance: ${value}/${max}`}>
        {[...Array(max)].map((_, i) => (
            <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
            />
        ))}
    </div>
);

// Bad ↔ Good code pair with a toggle
export const CodePair = ({ bad, good, badTitle = 'Bad practice', goodTitle = 'Good practice', language = 'java' }) => {
    const [showGood, setShowGood] = useState(true);
    const current = showGood ? good : bad;
    const currentTitle = showGood
        ? (typeof good === 'object' && good?.title) || goodTitle
        : (typeof bad === 'object' && bad?.title) || badTitle;

    return (
        <div>
            <div className="flex gap-2 mb-2">
                <button
                    onClick={() => setShowGood(false)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all border ${
                        !showGood
                            ? 'bg-red-500/20 text-red-300 border-red-500/40'
                            : 'bg-gray-800/50 text-gray-400 border-gray-700/50 hover:text-gray-300'
                    }`}
                >
                    <ThumbsDown className="w-3 h-3" /> Bad
                </button>
                <button
                    onClick={() => setShowGood(true)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all border ${
                        showGood
                            ? 'bg-green-500/20 text-green-300 border-green-500/40'
                            : 'bg-gray-800/50 text-gray-400 border-gray-700/50 hover:text-gray-300'
                    }`}
                >
                    <ThumbsUp className="w-3 h-3" /> Good
                </button>
            </div>
            <CodeBlock code={current} title={currentTitle} language={language} />
        </div>
    );
};

// Tag pills shown under the page title
export const TagPills = ({ tags }) => {
    if (!tags || !tags.length) return null;
    return (
        <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {tag}
                </span>
            ))}
        </div>
    );
};
