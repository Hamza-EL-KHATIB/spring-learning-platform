import React from 'react';
import { BookOpen, FileText, Code2 } from 'lucide-react';
import CodeBlock from './CodeBlock';
import renderContent from './ContentRenderer';
import { getSectionIcon } from './icons';
import { deriveType, prettifyKey, humanizeTitle, StarRating } from './primitives';
import { ActivePanel, PageHeader, PageTabs, useTabs } from './shell';

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
                {humanizeTitle(title)}
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
    const payload = Object.entries(topic).filter(
        ([key, value]) => !META_KEYS.has(key) && !isBlank(value)
    );
    // Scalars (a relevance score, a one-word label) don't deserve a whole
    // panel each — collect them into one compact row instead.
    const meta = payload.filter(([, value]) => typeof value === 'number');
    const sections = payload.filter(([, value]) => typeof value !== 'number');

    const intro = [
        ['Description', topic.description],
        ['Overview', topic.content],
    ]
        .filter(([, value]) => typeof value === 'string' && value.trim())
        .map(([title, content]) => ({ title, content }));

    return (
        <>
            <IntroBox items={intro} />
            {meta.length > 0 && (
                <div className="flex flex-wrap items-center gap-4 mb-3">
                    {meta.map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">{prettifyKey(key)}</span>
                            {/relevance/i.test(key) && value <= 5
                                ? <StarRating value={value} />
                                : <span className="text-sm text-gray-300">{value}</span>}
                        </div>
                    ))}
                </div>
            )}
            <div className="space-y-3">
                {sections.map(([key, value], idx) => {
                    // A topic with a single payload is already labelled by its
                    // own heading — a panel around it just nests for nothing.
                    if (sections.length === 1) {
                        return <div key={idx}>{renderContent(value, deriveType(key), opts, key)}</div>;
                    }
                    return (
                        <SectionPanel key={idx} title={prettifyKey(key)}>
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
    const tabs = topics.map((topic) => ({
        id: topicId(topic),
        title: topic.title,
        icon: iconOverrides[topic.title],
        topic,
    }));

    const { activeId, select, activeTab } = useTabs(tabs, persistKey);
    const activeTopic = activeTab?.topic;
    const opts = { images, language, resolveDiagram };

    return (
        <div className="min-h-screen bg-gray-900">
            <PageHeader title={data.title} tags={data.tags}>{header}</PageHeader>

            <PageTabs tabs={tabs} activeId={activeId} onChange={select} />

            <ActivePanel title={activeTopic?.title} icon={iconOverrides[activeTopic?.title]}>
                {(renderTopic && activeTopic && renderTopic(activeTopic)) || (
                    <TopicBody topic={activeTopic} opts={opts} />
                )}
            </ActivePanel>

            {footer && <div className="mt-6 space-y-4">{footer}</div>}
        </div>
    );
};

export default TopicPageTemplate;
