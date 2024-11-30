import React, { useState } from 'react';
import {
    Search,
    ChevronRight,
    ChevronLeft,
    BookOpen,
    Eye,
    EyeOff
} from 'lucide-react';
import konjugationData from '../../../data/german/Konjugation.json';

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #2a2a2a;
    border-radius: 10px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(128, 90, 213, 0.6);
    border-radius: 10px;
    border: 2px solid #2a2a2a;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(128, 90, 213, 0.9);
  }
`;

const KonjugationPage = () => {
    // Add scrollbar styles to head
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = scrollbarStyles;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [activeVerbIndex, setActiveVerbIndex] = useState(0);
    const [showEnglish, setShowEnglish] = useState(true);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Filter verbs based on search
    const filteredVerbs = konjugationData.filter(verb =>
        verb.verb.toLowerCase().includes(searchTerm.toLowerCase()) ||
        verb.meaning.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeVerb = filteredVerbs[activeVerbIndex];

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

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="flex items-center justify-between mb-6">
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

                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search verbs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 pl-12"
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Verb List Sidebar */}
                        <div className={`lg:w-1/4 transition-all duration-300 ${isSidebarCollapsed ? 'lg:w-16' : 'lg:w-1/4'}`}>
                            <div className="bg-gray-800/30 rounded-lg border border-gray-700/50">
                                {/* Collapse Toggle */}
                                <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
                                    {!isSidebarCollapsed && <h3 className="text-sm font-medium text-gray-400 uppercase">Verbs</h3>}
                                    <button
                                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                        className="p-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                                    </button>
                                </div>

                                {/* Scrollable Verb List */}
                                <div className="max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
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

                        {/* Conjugation Display */}
                        {activeVerb && (
                            <div className="lg:flex-1">
                                {/* Verb Header */}
                                <div className="bg-gray-800/30 rounded-lg border border-purple-500/30 p-6 mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <button
                                            onClick={() => setActiveVerbIndex(Math.max(0, activeVerbIndex - 1))}
                                            disabled={activeVerbIndex === 0}
                                            className="p-2 text-gray-400 hover:text-white disabled:opacity-50"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <div className="text-center">
                                            <h2 className="text-3xl font-bold text-white mb-2">{activeVerb.verb}</h2>
                                            {showEnglish && (
                                                <p className="text-gray-400 text-lg">{activeVerb.meaning}</p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => setActiveVerbIndex(Math.min(filteredVerbs.length - 1, activeVerbIndex + 1))}
                                            disabled={activeVerbIndex === filteredVerbs.length - 1}
                                            className="p-2 text-gray-400 hover:text-white disabled:opacity-50"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
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