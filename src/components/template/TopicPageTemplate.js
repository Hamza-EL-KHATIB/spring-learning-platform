import React, { useState } from 'react';
import { BookOpen, FileText, Code2 } from 'lucide-react';
import FloatingMenu from '../layout/FloatingMenu';
import CodeBlock from './CodeBlock';
import renderContent from './ContentRenderer';
import { getSectionIcon, getTopicIcon } from './icons';
import { TagPills, deriveType, prettifyKey } from './primitives';

// Accepts either root convention: { topics: [...] } or { sections: [...] }.
// Pages with exotic roots build a topics[] array themselves before passing data in.
const normalizeTopics = (data) => data.topics || data.sections || [];

const topicId = (topic) => topic.id || topic.title;

const isIntroTitle = (title) => {
    const t = (title || '').toLowerCase();
    return t === 'description' || t === 'definition' || t === 'overview' || t.startsWith('what is');
};

// Old-style topic keys that are metadata or intro prose, not renderable sections
const META_KEYS = new Set([
    'id', 'title', 'description', 'content', 'tags', 'icon', 'multi-content', 'simple-content',
]);

const isBlank = (value) =>
    value === null || value === undefined ||
    (typeof value === 'string' && !value.trim()) ||
    (Array.isArray(value) && value.length === 0);

const IntroBox = ({ items }) => {
    if (!items.length) return null;
    return (
        <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-lg p-4 border border-purple-500/30 mb-4 shadow-md">
            {items.map((item, idx) => (
                <div key={idx} className={idx > 0 ? 'mt-3' : ''}>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 bg-gray-800/70 rounded-md">
                            {item.title?.toLowerCase() === 'description'
                                ? <FileText className="w-4 h-4 text-cyan-400" />
                                : <BookOpen className="w-4 h-4 text-purple-400" />}
                        </div>
                        <h3 className="text-base font-semibold text-white">{prettifyKey(item.title)}</h3>
                    </div>
                    <div className="ml-8">{renderContent(item.content)}</div>
                </div>
            ))}
        </div>
    );
};

export const SectionPanel = ({ title, accent = 'default', children }) => (
    <div className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg p-4 border shadow-md ${
        accent === 'code' ? 'border-pink-500/30' : 'border-gray-700/50'
    }`}>
        <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-gray-800/70 rounded-md">
                {accent === 'code' ? <Code2 className="w-4 h-4 text-pink-400" /> : getSectionIcon(title)}
            </div>
            <h3 className={`text-base font-semibold ${accent === 'code' ? 'text-pink-300' : 'text-purple-300'}`}>
                {title}
            </h3>
        </div>
        {children}
    </div>
);

const TopicBody = ({ topic, opts }) => {
    if (!topic) return null;

    // New-style topic
    if (topic['multi-content']) {
        const intro = topic['multi-content']
            .filter((s) => isIntroTitle(s.title))
            .map((s) => ({ title: s.title, content: s['simple-content'] ?? s['multi-content'] }));
        const sections = topic['multi-content'].filter((s) => !isIntroTitle(s.title));

        return (
            <>
                <IntroBox items={intro} />
                <div className="space-y-3">
                    {sections.map((section, idx) => {
                        if (section.title === 'code_examples') {
                            return (
                                <SectionPanel key={idx} title="Code Examples" accent="code">
                                    <div className="space-y-3">
                                        {(section['multi-content'] || []).map((example, exIdx) => (
                                            <CodeBlock
                                                key={exIdx}
                                                code={example['simple-content']}
                                                title={example.title}
                                                language={opts.language}
                                            />
                                        ))}
                                    </div>
                                </SectionPanel>
                            );
                        }
                        return (
                            <SectionPanel key={idx} title={section.title}>
                                {renderContent(
                                    section['multi-content'] ?? section['simple-content'],
                                    deriveType(section.title),
                                    opts
                                )}
                            </SectionPanel>
                        );
                    })}
                </div>
            </>
        );
    }

    // Old-style topic: intro prose + one panel per payload key
    const sections = Object.entries(topic).filter(
        ([key, value]) => !META_KEYS.has(key) && !isBlank(value)
    );
    const intro = [
        ['Description', topic.description],
        ['Overview', topic.content],
    ]
        .filter(([, value]) => typeof value === 'string' && value.trim())
        .map(([title, content]) => ({ title, content }));

    return (
        <>
            <IntroBox items={intro} />
            <div className="space-y-3">
                {sections.map(([key, value], idx) => {
                    const label = prettifyKey(key);
                    // A lone section repeating the topic's own name adds a
                    // redundant panel — render its content directly instead.
                    if (sections.length === 1 && label.toLowerCase() === topic.title?.toLowerCase()) {
                        return <div key={idx}>{renderContent(value, deriveType(key), opts, key)}</div>;
                    }
                    return (
                        <SectionPanel key={idx} title={label}>
                            {renderContent(value, deriveType(key), opts, key)}
                        </SectionPanel>
                    );
                })}
            </div>
        </>
    );
};

/**
 * Unified topic page.
 *
 * Props:
 * - data:          JSON with { title, tags?, topics[] | sections[] }
 * - persistKey:    localStorage key suffix for remembering the active tab
 * - images:        { fileName → imported module } for diagram resolution
 * - language:      default code-block language ('java' unless overridden)
 * - iconOverrides: { topicTitle → icon element } for the tab bar
 * - renderTopic:   (topic) → node | null — full custom rendering for a topic
 * - header:        extra node under the page title
 * - footer:        node rendered below the tabbed content (always visible)
 */
const TopicPageTemplate = ({
    data,
    persistKey,
    images,
    resolveDiagram,
    language = 'java',
    iconOverrides = {},
    renderTopic,
    header,
    footer,
}) => {
    const topics = normalizeTopics(data);
    const storageKey = persistKey ? `topic-tab:${persistKey}` : null;

    const [activeId, setActiveId] = useState(() => {
        if (storageKey) {
            const saved = localStorage.getItem(storageKey);
            if (saved && topics.some((t) => topicId(t) === saved)) return saved;
        }
        return topics[0] ? topicId(topics[0]) : null;
    });

    const selectTopic = (id) => {
        setActiveId(id);
        if (storageKey) localStorage.setItem(storageKey, id);
    };

    const activeTopic = topics.find((t) => topicId(t) === activeId);
    const opts = { images, language, resolveDiagram };
    const showTabs = topics.length > 1;

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Page header */}
            <div className="mb-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-purple-500/30 shadow-md">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {data.title}
                </h1>
                <TagPills tags={data.tags} />
                {header}
            </div>

            {/* Tab bar */}
            {showTabs && (
                <div className="mb-4 flex flex-wrap gap-2 p-1 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    {topics.map((topic) => {
                        const id = topicId(topic);
                        return (
                            <button
                                key={id}
                                onClick={() => selectTopic(id)}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                                    activeId === id
                                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30'
                                        : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50 hover:text-gray-300'
                                }`}
                            >
                                {iconOverrides[topic.title] || getTopicIcon(topic.title)}
                                <span className="ml-1">{topic.title}</span>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Active topic */}
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg p-4 border border-purple-500/20 shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 bg-gray-800/70 rounded-md">
                            {iconOverrides[activeTopic?.title] || getTopicIcon(activeTopic?.title)}
                        </div>
                        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            {activeTopic?.title}
                        </h2>
                    </div>
                    {(renderTopic && activeTopic && renderTopic(activeTopic)) || (
                        <TopicBody topic={activeTopic} opts={opts} />
                    )}
                </div>
            </div>

            {footer && <div className="mt-6 space-y-4">{footer}</div>}

            {/* Mobile quick-nav */}
            {showTabs && (
                <FloatingMenu
                    tabs={topics.map((t) => ({
                        id: topicId(t),
                        title: t.title,
                        icon: iconOverrides[t.title] || getTopicIcon(t.title),
                    }))}
                    activeTab={activeId}
                    onTabChange={selectTopic}
                />
            )}
        </div>
    );
};

export default TopicPageTemplate;
