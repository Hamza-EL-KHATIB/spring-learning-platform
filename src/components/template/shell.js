import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FloatingMenu from '../layout/FloatingMenu';
import { getTopicIcon } from './icons';
import { TagPills } from './primitives';

// The page chrome every page shares — header, tab bar, mobile nav — split out
// from TopicPageTemplate so pages with their own body (vocabulary tables,
// conjugation drills) look identical without going through its JSON renderer.

export const PageHeader = ({ title, subtitle, tags, children }) => (
    <div className="mb-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-purple-500/30 shadow-md">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            {title}
        </h1>
        {subtitle && <p className="text-gray-400 mt-2 text-sm">{subtitle}</p>}
        <TagPills tags={tags} />
        {children}
    </div>
);

export const TabBar = ({ tabs, activeId, onChange }) => {
    if (!tabs || tabs.length < 2) return null;

    return (
        <div className="mb-4 flex flex-wrap gap-2 p-1 bg-gray-800/50 rounded-lg border border-gray-700/50">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                        activeId === tab.id
                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50 hover:text-gray-300'
                    }`}
                >
                    {tab.icon || getTopicIcon(tab.title)}
                    <span className="ml-1">{tab.title}</span>
                </button>
            ))}
        </div>
    );
};

// The panel the active tab's content sits in, with its heading
export const ActivePanel = ({ title, icon, children }) => (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg p-4 border border-purple-500/20 shadow-md">
        {title && (
            <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-gray-800/70 rounded-md">{icon || getTopicIcon(title)}</div>
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {title}
                </h2>
            </div>
        )}
        {children}
    </div>
);

/**
 * Tab state shared by every tabbed page: remembers the last tab per page in
 * localStorage and honours the ?topic= links the quick-search palette emits.
 */
export const useTabs = (tabs, persistKey) => {
    const storageKey = persistKey ? `topic-tab:${persistKey}` : null;
    const [searchParams] = useSearchParams();
    const requestedTab = searchParams.get('topic');

    const [activeId, setActiveId] = useState(() => {
        if (storageKey) {
            const saved = localStorage.getItem(storageKey);
            if (saved && tabs.some((t) => t.id === saved)) return saved;
        }
        return tabs[0]?.id ?? null;
    });

    useEffect(() => {
        if (!requestedTab) return;
        const match = tabs.find((t) => t.id === requestedTab || t.title === requestedTab);
        if (match) setActiveId(match.id);
    }, [requestedTab]); // eslint-disable-line react-hooks/exhaustive-deps

    const select = (id) => {
        setActiveId(id);
        if (storageKey) localStorage.setItem(storageKey, id);
    };

    return { activeId, select, activeTab: tabs.find((t) => t.id === activeId) };
};

// Tab bar + the matching mobile drawer, which pages otherwise forget to add
export const PageTabs = ({ tabs, activeId, onChange }) => (
    <>
        <TabBar tabs={tabs} activeId={activeId} onChange={onChange} />
        {tabs.length > 1 && (
            <FloatingMenu
                tabs={tabs.map((t) => ({ id: t.id, title: t.title, icon: t.icon || getTopicIcon(t.title) }))}
                activeTab={activeId}
                onTabChange={onChange}
            />
        )}
    </>
);
