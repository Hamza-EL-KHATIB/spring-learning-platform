import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronDown, X } from 'lucide-react';
import { navigationGroups } from '../../navigation';

// Every section stays reachable in one click — during an interview you don't
// want to hop through a landing page to change subject.
const Sidebar = () => {
    const { pathname } = useLocation();
    const section = pathname.split('/')[1];
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // Groups default to expanded for the current section; clicking one overrides that.
    const [overrides, setOverrides] = useState({});

    const isExpanded = (key) => overrides[key] ?? key === section;
    const toggle = (key) => setOverrides((state) => ({ ...state, [key]: !isExpanded(key) }));

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed bottom-6 left-6 z-50 p-3
                bg-gradient-to-r from-pink-500/20 to-purple-500/20
                hover:from-pink-500/30 hover:to-purple-500/30
                text-purple-300 hover:text-purple-200
                rounded-lg border border-purple-500/20
                hover:border-purple-500/40
                transition-all duration-300 shadow-lg backdrop-blur-sm"
                title="Browse sections"
            >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>

            <div
                className={`lg:block ${isSidebarOpen ? 'block' : 'hidden'}
                lg:static fixed inset-y-0 left-0
                z-40 w-80 p-4
                transition-transform duration-300
                bg-gray-900/95 lg:bg-transparent
                lg:translate-x-0 lg:shadow-none shadow-md
                lg:sticky lg:top-20 overflow-y-auto lg:max-h-[calc(100vh-6rem)]`}
            >
                <div className="h-full flex flex-col bg-gray-800 rounded-lg">
                    <button
                        className="lg:hidden text-white p-4 self-end"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <nav className="p-3 space-y-1">
                        {navigationGroups.map((group) => {
                            const expanded = isExpanded(group.key);
                            const isCurrent = group.key === section;

                            return (
                                <div key={group.key}>
                                    <button
                                        onClick={() => toggle(group.key)}
                                        className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-colors ${
                                            isCurrent
                                                ? 'text-white bg-gray-700/40'
                                                : 'text-gray-300 hover:bg-gray-700/40 hover:text-white'
                                        }`}
                                    >
                                        <span className={isCurrent ? 'text-purple-400' : 'text-gray-400'}>
                                            {group.icon}
                                        </span>
                                        <span className="flex-1 text-left text-sm font-medium">{group.title}</span>
                                        {expanded
                                            ? <ChevronDown className="w-4 h-4 text-gray-500" />
                                            : <ChevronRight className="w-4 h-4 text-gray-500" />}
                                    </button>

                                    {expanded && (
                                        <div className="mt-1 mb-2 ml-4 pl-3 border-l border-gray-700/70 space-y-0.5">
                                            {group.items.map((item) => (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    onClick={() => setIsSidebarOpen(false)}
                                                    className={`block px-3 py-1.5 rounded-md text-sm transition-colors ${
                                                        pathname === item.path
                                                            ? 'bg-purple-500/10 text-purple-300'
                                                            : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                                                    }`}
                                                >
                                                    {item.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
