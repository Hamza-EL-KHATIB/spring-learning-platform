import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { navigationGroups } from '../navigation';

const CategorySection = ({ group }) => (
    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/50">
        <div className="flex items-center gap-3 mb-4">
            <span className="text-purple-400">{group.icon}</span>
            <h3 className="text-lg font-semibold text-white">{group.title}</h3>
        </div>
        <div className="grid gap-1">
            {group.items.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-700/50 transition-colors group"
                >
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 shrink-0" />
                    <div className="min-w-0">
                        <div className="text-gray-200 group-hover:text-white text-sm">{item.title}</div>
                        {item.description && (
                            <div className="text-xs text-gray-500">{item.description}</div>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    </div>
);

const HomePage = () => (
    <div className="space-y-8">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-purple-500/30">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Interview & Training Notes
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
                Press{' '}
                <kbd className="px-1.5 py-0.5 text-xs border border-gray-600 rounded text-gray-300">Ctrl</kbd>
                {' '}+{' '}
                <kbd className="px-1.5 py-0.5 text-xs border border-gray-600 rounded text-gray-300">K</kbd>
                {' '}(or{' '}
                <kbd className="px-1.5 py-0.5 text-xs border border-gray-600 rounded text-gray-300">/</kbd>
                ) to jump straight to any topic.
            </p>
            <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                <Search className="w-3.5 h-3.5" />
                <span>Search covers every page and every topic tab.</span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {navigationGroups.map((group) => (
                <CategorySection key={group.key} group={group} />
            ))}
        </div>
    </div>
);

export default HomePage;
