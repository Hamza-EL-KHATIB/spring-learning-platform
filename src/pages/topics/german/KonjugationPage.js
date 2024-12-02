import React, { useState } from 'react';
import {
    Search,
    ChevronRight,
    ChevronLeft,
    BookOpen,
    Eye,
    EyeOff,
    Loader2,
    AlertCircle,
    BookOpenCheck
} from 'lucide-react';
import konjugationData from '../../../data/german/Konjugation.json';

const KonjugationPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeVerbIndex, setActiveVerbIndex] = useState(0);
    const [showEnglish, setShowEnglish] = useState(true);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);
    const [dynamicVerbs] = useState([]);
    const [filteredVerbs, setFilteredVerbs] = useState(konjugationData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // German character validation
    const germanChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'ö', 'ü', 'ß'];

    const validateAndSanitizeInput = (input) => {
        const sanitized = input.toLowerCase().trim();
        return {
            sanitized,
            isValid: sanitized.split('').every(char => germanChars.includes(char))
        };
    };

    const handleSearchChange = (e) => {
        const { value } = e.target;
        const { sanitized, isValid } = validateAndSanitizeInput(value);

        if (!isValid && value.length > 0) {
            setError('Please use only German letters (a-z, ä, ö, ü, ß)');
        } else {
            setError(null);
        }

        setSearchTerm(sanitized);
    };

    const handleSearch = async () => {
        if (!searchTerm || isLoading) return;

        const { sanitized, isValid } = validateAndSanitizeInput(searchTerm);
        if (!isValid) {
            setError('Please use only German letters (a-z, ä, ö, ü, ß)');
            return;
        }

        // Check if we already have it in our verbs
        const allVerbs = [...konjugationData, ...dynamicVerbs];
        const localResults = allVerbs.filter(verb =>
            verb.verb.toLowerCase().includes(sanitized.toLowerCase()) ||
            verb.meaning.toLowerCase().includes(sanitized.toLowerCase())
        );

        if (localResults.length > 0) {
            setFilteredVerbs(localResults);
            setActiveVerbIndex(0);
            setError(null);
            return;
        }

        // If not found locally, try fetching from website
        setIsLoading(true);
        setError(null);
        try {
            // Fetch implementation would go here
            // For now, just show not found error
            setError('Word not found. Please check your spelling.');
        } catch (err) {
            setError('An error occurred while searching. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderTenseTable = (tense, conjugations) => {
        const pronouns = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
        return (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                <h3 className="text-lg font-medium text-purple-300 mb-4 capitalize">{tense}</h3>
                <div className="space-y-2">
                    {pronouns.map((pronoun) => (
                        <div key={pronoun} className="grid grid-cols-2 gap-4 py-2 border-b border-gray-700/50 last:border-0">
                            <div className="text-gray-400">{pronoun}</div>
                            <div className="text-white font-medium">{conjugations[pronoun][tense]}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const activeVerb = filteredVerbs[activeVerbIndex];

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                            German Verb Conjugation
                        </h1>
                        <button
                            onClick={() => setShowEnglish(!showEnglish)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg text-gray-400 hover:text-white transition-colors border border-gray-700/50"
                        >
                            {showEnglish ? (
                                <><Eye className="w-5 h-5" /><span>Hide English</span></>
                            ) : (
                                <><EyeOff className="w-5 h-5" /><span>Show English</span></>
                            )}
                        </button>
                    </div>

                    {/* Stats Display */}
                    <div className="flex gap-4 mb-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                            <BookOpenCheck className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-300">Total Verbs: {konjugationData.length + dynamicVerbs.length}</span>
                        </div>
                        {filteredVerbs.length !== konjugationData.length && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
                                <BookOpen className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-300">Showing: {filteredVerbs.length}</span>
                            </div>
                        )}
                    </div>

                    {/* Search Bar */}
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search verbs..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch();
                                    }
                                }}
                                className={`w-full px-5 py-3 bg-gray-800/50 border rounded-lg text-gray-300 focus:outline-none pl-12 ${
                                    error ? 'border-red-500/50 focus:border-red-500' : 'border-gray-700/50 focus:border-purple-500'
                                }`}
                            />
                            {isLoading ? (
                                <Loader2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500 animate-spin" />
                            ) : (
                                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                    error ? 'text-red-500' : 'text-gray-500'
                                }`} />
                            )}
                        </div>
                        <button
                            onClick={handleSearch}
                            disabled={isLoading || (searchTerm.length === 0)}
                            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50
                                     text-white rounded-lg font-medium transition-colors
                                     disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <Search className="w-5 h-5" />
                                    Search
                                </>
                            )}
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto">
                    <div className="lg:flex gap-8">
                        {/* Desktop Sidebar */}
                        <div className={`hidden lg:block transition-all duration-300 ${
                            isSidebarCollapsed ? 'w-16' : 'w-1/4'
                        }`}>
                            <div className="bg-gray-800/30 rounded-lg border border-gray-700/50">
                                <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
                                    {!isSidebarCollapsed && <h3 className="text-sm font-medium text-gray-400 uppercase">Verbs</h3>}
                                    <button
                                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                        className="p-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {isSidebarCollapsed ? (
                                            <ChevronRight className="w-4 h-4" />
                                        ) : (
                                            <ChevronLeft className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>

                                <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                                    <div className="p-4 space-y-2">
                                        {filteredVerbs.map((verb, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setActiveVerbIndex(index)}
                                                className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                                                    index === activeVerbIndex
                                                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-white border border-transparent'
                                                }`}
                                            >
                                                <BookOpen className="w-4 h-4 flex-shrink-0" />
                                                {!isSidebarCollapsed && <span className="text-left">{verb.verb}</span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Sidebar */}
                        <div className={`
                            lg:hidden fixed inset-0 z-40 transition-transform duration-300
                            ${showMobileSidebar ? 'translate-y-0' : 'translate-y-full'}
                        `}>
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                                 onClick={() => setShowMobileSidebar(false)} />
                            <div className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-xl max-h-[70vh] overflow-hidden">
                                <div className="p-4 border-b border-gray-800">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-medium text-white">Verbs List</h3>
                                        <button onClick={() => setShowMobileSidebar(false)}>
                                            <ChevronRight className="w-6 h-6 text-gray-400" />
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-y-auto p-4">
                                    {filteredVerbs.map((verb, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setActiveVerbIndex(index);
                                                setShowMobileSidebar(false);
                                            }}
                                            className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-all mb-2 ${
                                                index === activeVerbIndex
                                                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-white border border-transparent'
                                            }`}
                                        >
                                            <BookOpen className="w-4 h-4 flex-shrink-0" />
                                            <span className="text-left">{verb.verb}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Toggle Button */}
                        <div className="lg:hidden fixed bottom-6 right-6 z-50">
                            <button
                                onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                                className="p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
                            >
                                {showMobileSidebar ? (
                                    <ChevronRight className="w-6 h-6" />
                                ) : (
                                    <BookOpen className="w-6 h-6" />
                                )}
                            </button>
                        </div>

                        {/* Conjugation Display */}
                        {activeVerb && (
                            <div className="lg:flex-1">
                                {/* Verb Header */}
                                <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10 backdrop-blur rounded-lg border border-purple-500/20 p-8 mb-8 shadow-lg relative overflow-hidden">
                                    {/* Navigation Buttons */}
                                    <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
                                        <button
                                            onClick={() => setActiveVerbIndex(Math.max(0, activeVerbIndex - 1))}
                                            disabled={activeVerbIndex === 0}
                                            className="p-3 bg-gray-800/80 rounded-full text-gray-400 hover:text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 cursor-pointer"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={() => setActiveVerbIndex(Math.min(filteredVerbs.length - 1, activeVerbIndex + 1))}
                                            disabled={activeVerbIndex === filteredVerbs.length - 1}
                                            className="p-3 bg-gray-800/80 rounded-full text-gray-400 hover:text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 cursor-pointer"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    </div>

                                    {/* Main Content */}
                                    <div className="text-center relative z-10">
                                        <div className="inline-block">
                                            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3">
                                                {activeVerb.verb}
                                            </h2>
                                            {showEnglish && (
                                                <p className="text-xl text-gray-300/80">{activeVerb.meaning}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Decorative Elements */}
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
                                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl"></div>
                                </div>

                                {/* Conjugation Tables */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {Object.keys(activeVerb.conjugations.ich).map((tense) =>
                                        renderTenseTable(tense, activeVerb.conjugations)
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KonjugationPage;