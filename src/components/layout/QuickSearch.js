import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CornerDownLeft, FileText, Hash } from 'lucide-react';
import { searchTopics } from '../../searchIndex';

// Ctrl/Cmd+K palette over every page and topic tab, for looking something up
// mid-interview without walking the sidebar.
const QuickSearch = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);

    const results = useMemo(() => searchTopics(query), [query]);

    // Clear on every open/close transition. Clearing only on open would race
    // with the input remounting, letting the previous query linger and the
    // next keystrokes append to it. Focus synchronously before paint so the
    // first characters typed after the shortcut aren't dropped.
    useLayoutEffect(() => {
        setQuery('');
        setActiveIndex(0);
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    useEffect(() => setActiveIndex(0), [query]);

    // Keep the highlighted row visible while arrowing through results
    useEffect(() => {
        listRef.current
            ?.querySelector(`[data-index="${activeIndex}"]`)
            ?.scrollIntoView({ block: 'nearest' });
    }, [activeIndex]);

    const go = useCallback(
        (entry) => {
            if (!entry) return;
            onClose();
            navigate(entry.path);
        },
        [navigate, onClose]
    );

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
        } else if (event.key === 'Enter') {
            event.preventDefault();
            go(results[activeIndex]);
        } else if (event.key === 'Escape') {
            event.preventDefault();
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] px-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-xl bg-gray-800 rounded-lg border border-purple-500/30 shadow-2xl overflow-hidden"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-700">
                    <Search className="w-5 h-5 text-purple-400 shrink-0" />
                    <input
                        ref={inputRef}
                        autoFocus
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search topics — try “bean scopes”, “isolation”, “flyweight”"
                        className="flex-1 bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none text-sm"
                    />
                    <kbd className="hidden sm:block px-1.5 py-0.5 text-[10px] text-gray-400 border border-gray-600 rounded">
                        ESC
                    </kbd>
                </div>

                <div ref={listRef} className="max-h-[55vh] overflow-y-auto p-2">
                    {results.length === 0 ? (
                        <p className="px-3 py-8 text-center text-sm text-gray-500">
                            Nothing matches “{query}”.
                        </p>
                    ) : (
                        results.map((entry, index) => (
                            <button
                                key={entry.id}
                                data-index={index}
                                onClick={() => go(entry)}
                                onMouseMove={() => setActiveIndex(index)}
                                className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left transition-colors ${
                                    index === activeIndex ? 'bg-purple-500/20' : 'hover:bg-gray-700/50'
                                }`}
                            >
                                {entry.kind === 'page' ? (
                                    <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                                ) : (
                                    <Hash className="w-4 h-4 text-gray-500 shrink-0" />
                                )}
                                <span className="min-w-0 flex-1">
                                    <span className="block text-sm text-gray-100 truncate">{entry.title}</span>
                                    <span className="block text-xs text-gray-500 truncate">{entry.group}</span>
                                </span>
                                {index === activeIndex && (
                                    <CornerDownLeft className="w-3.5 h-3.5 text-purple-300 shrink-0" />
                                )}
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

// Owns the open state and the global shortcut, so any page can stay unaware of it.
export const useQuickSearch = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const onKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                setIsOpen((open) => !open);
            }
            // "/" opens search unless the user is typing in a field
            if (
                event.key === '/' &&
                !/^(INPUT|TEXTAREA)$/.test(event.target.tagName) &&
                !event.target.isContentEditable
            ) {
                event.preventDefault();
                setIsOpen(true);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    return { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) };
};

export default QuickSearch;
