import React, { useCallback, useMemo, useState, memo } from 'react';
import { Search, ChevronDown, X, HelpCircle } from 'lucide-react';
import CodeBlock from '../../../components/template/CodeBlock';
import { TabBar } from '../../../components/template/shell';

// Q&A needs its own layout — searchable accordion rather than the standard
// section cards — but uses the app's shared tab bar, cards and code blocks.

const CATEGORY_EMOJI = ['💡', '🧠', '🔑', '⚡', '📦', '🔮', '🛠️', '🔄', '🏗️', '📝'];

const categoryName = (category) => category.name || category.category || 'Questions';

const highlight = (text, term) => {
    if (!term) return text;
    try {
        const parts = String(text).split(new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === term.toLowerCase()
                ? <mark key={i} className="bg-purple-500/30 text-purple-200 rounded px-0.5">{part}</mark>
                : <React.Fragment key={i}>{part}</React.Fragment>
        );
    } catch {
        return text;
    }
};

// Answers are markdown-ish: ``` fences and `inline` code
const Answer = memo(({ answer, searchTerm }) => {
    const blocks = useMemo(() => String(answer).split(/(```[\s\S]*?```)/g), [answer]);

    return (
        <div className="space-y-3">
            {blocks.map((part, idx) => {
                if (part.startsWith('```')) {
                    const language = part.match(/^```(\w+)/)?.[1] || 'java';
                    const code = part.replace(/^```(?:\w+)?\n?/, '').replace(/```$/, '');
                    return <CodeBlock key={idx} code={code} language={language} />;
                }
                if (!part.trim()) return null;

                return (
                    <p key={idx} className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                        {part.split(/`([^`]+)`/).map((text, i) =>
                            i % 2 === 0 ? (
                                <React.Fragment key={i}>{highlight(text, searchTerm)}</React.Fragment>
                            ) : (
                                <code key={i} className="bg-gray-900/70 px-1 py-0.5 rounded text-pink-300 font-mono text-xs">
                                    {text}
                                </code>
                            )
                        )}
                    </p>
                );
            })}
        </div>
    );
});
Answer.displayName = 'Answer';

const QuestionCard = memo(({ qa, isExpanded, onToggle, searchTerm }) => (
    <div
        className={`rounded-md border overflow-hidden transition-all ${
            isExpanded
                ? 'bg-gray-800/80 border-purple-500/30 shadow-md'
                : 'bg-gray-800/60 border-gray-700/50 hover:border-gray-600'
        }`}
    >
        <button onClick={onToggle} className="w-full text-left p-3 flex justify-between items-start gap-3">
            <h4 className="text-sm font-medium text-purple-300">
                {highlight(qa.question, searchTerm)}
            </h4>
            <ChevronDown
                className={`w-4 h-4 shrink-0 mt-0.5 transition-transform ${
                    isExpanded ? 'rotate-180 text-purple-300' : 'text-gray-500'
                }`}
            />
        </button>
        {isExpanded && (
            <div className="px-3 pb-3 pt-2 border-t border-gray-700/40">
                <Answer answer={qa.answer} searchTerm={searchTerm} />
            </div>
        )}
    </div>
));
QuestionCard.displayName = 'QuestionCard';

const EnhancedInterviewFAQs = ({ section }) => {
    // Memoized so the fallback [] doesn't create a new array each render and
    // invalidate the memos below
    const categories = useMemo(() => section?.categories || [], [section]);
    const [searchText, setSearchText] = useState('');
    const [activeId, setActiveId] = useState('0');
    const [expandedId, setExpandedId] = useState(null);

    const toggle = useCallback(
        (id) => setExpandedId((current) => (current === id ? null : id)),
        []
    );

    const tabs = useMemo(
        () => categories.map((category, i) => ({
            id: String(i),
            title: categoryName(category),
            icon: <span>{CATEGORY_EMOJI[i % CATEGORY_EMOJI.length]}</span>,
        })),
        [categories]
    );

    // When searching, show matches across every category rather than one tab
    const matches = useMemo(() => {
        const term = searchText.trim().toLowerCase();
        if (!term) return null;
        return categories
            .map((category, i) => ({
                name: categoryName(category),
                emoji: CATEGORY_EMOJI[i % CATEGORY_EMOJI.length],
                index: i,
                questions: (category.questions || []).filter(
                    (q) =>
                        q.question?.toLowerCase().includes(term) ||
                        q.answer?.toLowerCase().includes(term)
                ),
            }))
            .filter((category) => category.questions.length > 0);
    }, [categories, searchText]);

    if (!categories.length) return null;

    const activeCategory = categories[Number(activeId)] || categories[0];

    return (
        <div className="space-y-4">
            {section.description && (
                <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-lg p-4 border border-purple-500/30">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 bg-gray-800/70 rounded-md">
                            <HelpCircle className="w-4 h-4 text-purple-400" />
                        </div>
                        <h3 className="text-base font-semibold text-white">Interview Roadmap</h3>
                    </div>
                    <p className="text-gray-300 text-sm ml-8">{section.description}</p>
                </div>
            )}

            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/70 rounded-md border border-gray-700 focus-within:border-purple-500/50 transition-colors">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                    type="text"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder="Search these questions…"
                    className="flex-1 bg-transparent text-gray-100 text-sm placeholder-gray-500 focus:outline-none"
                />
                {searchText && (
                    <button onClick={() => setSearchText('')} className="text-gray-500 hover:text-white">
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {matches === null ? (
                <>
                    <TabBar tabs={tabs} activeId={activeId} onChange={setActiveId} />
                    <div className="space-y-2">
                        {(activeCategory.questions || []).map((qa, j) => {
                            const id = `q-${activeId}-${j}`;
                            return (
                                <QuestionCard
                                    key={id}
                                    qa={qa}
                                    isExpanded={expandedId === id}
                                    onToggle={() => toggle(id)}
                                    searchTerm=""
                                />
                            );
                        })}
                    </div>
                </>
            ) : matches.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-gray-500">
                    No questions match “{searchText}”.
                </p>
            ) : (
                <div className="space-y-4">
                    {matches.map((category) => (
                        <div key={category.index} className="space-y-2">
                            <h3 className="text-sm font-medium text-purple-300">
                                <span className="mr-1.5">{category.emoji}</span>
                                {category.name}
                            </h3>
                            {category.questions.map((qa, j) => {
                                const id = `s-${category.index}-${j}`;
                                return (
                                    <QuestionCard
                                        key={id}
                                        qa={qa}
                                        isExpanded={expandedId === id}
                                        onToggle={() => toggle(id)}
                                        searchTerm={searchText}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EnhancedInterviewFAQs;
