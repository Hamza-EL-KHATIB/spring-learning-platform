import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, Database, Server, Box, GitBranch, Users, ChevronRight, Search } from 'lucide-react';

const NavigationCard = ({ category, showAll = false }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const displayedSubcategories = showAll || isExpanded
        ? category.subcategories
        : category.subcategories.slice(0, 3);

    return (
        <div className="bg-gray-800/90 backdrop-blur rounded-lg p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-700/50 rounded-lg">
                    {category.icon}
                </div>
                <h2 className="text-xl font-bold text-white">{category.title}</h2>
            </div>

            <div className="grid gap-2">
                {displayedSubcategories.map((sub) => (
                    <Link
                        key={sub.id}
                        to={sub.path}
                        className="group flex items-center p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 mr-2" />
                        <span className="text-gray-300 group-hover:text-white">{sub.title}</span>
                    </Link>
                ))}
            </div>

            {category.subcategories.length > 3 && !showAll && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 text-sm text-cyan-400 hover:text-cyan-300 flex items-center"
                >
                    {isExpanded ? 'Show Less' : `Show ${category.subcategories.length - 3} More`}
                </button>
            )}
        </div>
    );
};

const SearchResults = ({ results, onClose }) => {
    return results.length > 0 ? (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 max-h-96 overflow-y-auto z-50">
            {results.map((result, idx) => (
                <Link
                    key={idx}
                    to={result.path}
                    onClick={onClose}
                    className="block p-3 hover:bg-gray-700 border-b border-gray-700 last:border-0"
                >
                    <div className="text-gray-200 font-medium">{result.title}</div>
                    <div className="text-sm text-gray-400">{result.category}</div>
                </Link>
            ))}
        </div>
    ) : null;
};

const EnhancedNavigation = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const searchRef = useRef(null);

    const categories = [
        {
            id: 'java',
            title: 'Java Core',
            icon: <Book className="w-6 h-6 text-yellow-400" />,
            subcategories: [
                { id: 'collections', title: 'Collections Framework', path: '/java/collections' },
                { id: 'concurrency', title: 'Concurrency & Multithreading', path: '/java/concurrency' },
                { id: 'exceptions', title: 'Exception Handling', path: '/java/exceptions' },
                { id: 'features', title: 'Java Features', path: '/java/features' },
                { id: 'gc', title: 'Garbage Collection', path: '/java/gc' }
            ]
        },
        {
            id: 'spring',
            title: 'Spring Framework',
            icon: <Server className="w-6 h-6 text-green-400" />,
            subcategories: [
                { id: 'core', title: 'Spring Core', path: '/spring/core' },
                { id: 'boot', title: 'Spring Boot', path: '/spring/boot' },
                { id: 'data', title: 'Spring Data', path: '/spring/data' },
                { id: 'rest', title: 'REST APIs', path: '/spring/rest' }
            ]
        },
        {
            id: 'databases',
            title: 'Database Technologies',
            icon: <Database className="w-6 h-6 text-blue-400" />,
            subcategories: [
                { id: 'sql', title: 'SQL Fundamentals', path: '/databases/sql' },
                { id: 'hibernate', title: 'Hibernate ORM', path: '/databases/hibernate' },
                { id: 'transactions', title: 'Transactions', path: '/databases/transactions' },
                { id: 'redis', title: 'Redis', path: '/databases/redis' }
            ]
        }
    ];

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.length < 2) {
            setSearchResults([]);
            return;
        }

        // Search through all categories and subcategories
        const results = categories.flatMap(category =>
            category.subcategories
                .filter(sub =>
                    sub.title.toLowerCase().includes(query.toLowerCase())
                )
                .map(sub => ({
                    ...sub,
                    category: category.title
                }))
        ).slice(0, 5);

        setSearchResults(results);
    };

    return (
        <div className="space-y-8">
            {/* Enhanced Search Bar */}
            <div className="relative max-w-2xl mx-auto" ref={searchRef}>
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search topics, technologies, concepts..."
                        className="w-full px-4 py-3 bg-gray-800/90 backdrop-blur border border-gray-700 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <SearchResults results={searchResults} onClose={() => setSearchResults([])} />
            </div>

            {/* Featured Course */}
            <div className="bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 backdrop-blur rounded-lg p-8 border border-purple-500/20">
                <h2 className="text-2xl font-bold text-white mb-4">Featured Learning Path</h2>
                <p className="text-gray-300 mb-6">Master Spring Boot from basics to advanced concepts with our comprehensive guide</p>
                <Link
                    to="/spring/boot"
                    className="inline-flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                    Start Learning
                    <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(category => (
                    <NavigationCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
};

export default EnhancedNavigation;