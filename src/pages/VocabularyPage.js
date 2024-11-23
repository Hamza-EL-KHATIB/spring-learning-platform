import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import vocabularyData from '../data/german/a1.json';

const VocabularyPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [expandedExamples, setExpandedExamples] = useState({});

    // Toggle examples for a specific word
    const toggleExamples = (categoryIndex, wordIndex) => {
        const key = `${categoryIndex}-${wordIndex}`;
        setExpandedExamples(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // Filter vocabulary based on search term
    const getFilteredCategories = () => {
        if (!searchTerm) return vocabularyData;

        return vocabularyData.map(category => ({
            ...category,
            words: category.words.filter(word =>
                word.german.toLowerCase().includes(searchTerm.toLowerCase()) ||
                word.english.toLowerCase().includes(searchTerm.toLowerCase())
            )
        })).filter(category => category.words.length > 0);
    };

    const filteredCategories = getFilteredCategories();
    const totalWords = vocabularyData.reduce((sum, category) => sum + category.words.length, 0);
    const filteredWords = filteredCategories.reduce((sum, category) => sum + category.words.length, 0);

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="container mx-auto px-4">
                {/* Header with Stats */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-white mb-2">German A1 Vocabulary</h1>
                    <p className="text-gray-400">
                        {totalWords} words in {vocabularyData.length} categories
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-3xl mx-auto mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search words in German or English..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 pl-10"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                        {searchTerm && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
                                {filteredWords} results
                            </div>
                        )}
                    </div>
                </div>

                {/* Vocabulary List */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {filteredCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="bg-gray-800 rounded-lg border border-gray-700">
                            {/* Category Header */}
                            <button
                                onClick={() => setExpandedCategory(expandedCategory === categoryIndex ? null : categoryIndex)}
                                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-700/50 rounded-lg"
                            >
                                <div className="flex items-center justify-between w-full">
                                    <div>
                                        <h2 className="text-lg font-semibold text-purple-400">{category.title}</h2>
                                    </div>
                                    <div className="flex items-center space-x-3">
                    <span className="text-sm bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                      {category.words.length} words
                    </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-purple-400 transform transition-transform ${
                                                expandedCategory === categoryIndex ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </div>
                                </div>
                            </button>

                            {/* Words List */}
                            <div className={`px-4 pb-4 ${expandedCategory === categoryIndex ? 'block' : 'hidden'}`}>
                                <div className="space-y-2">
                                    {category.words.map((word, wordIndex) => {
                                        const exampleKey = `${categoryIndex}-${wordIndex}`;
                                        const isExamplesExpanded = expandedExamples[exampleKey];

                                        return (
                                            <div key={wordIndex} className="bg-gray-700/30 rounded-lg">
                                                {/* Word Row */}
                                                <button
                                                    onClick={() => toggleExamples(categoryIndex, wordIndex)}
                                                    className="w-full p-3 flex items-center justify-between text-left hover:bg-gray-700/50 rounded-lg"
                                                >
                                                    <div className="flex-1">
                                                        <p className="text-white">
                                                            {word.article && (
                                                                <span className="text-purple-400 mr-1">{word.article}</span>
                                                            )}
                                                            {word.german}
                                                        </p>
                                                        <p className="text-gray-400 text-sm">{word.english}</p>
                                                    </div>
                                                    {word.examples && (
                                                        <ChevronRight
                                                            className={`w-4 h-4 text-gray-400 transform transition-transform ${
                                                                isExamplesExpanded ? 'rotate-90' : ''
                                                            }`}
                                                        />
                                                    )}
                                                </button>

                                                {/* Examples Section */}
                                                {isExamplesExpanded && word.examples && (
                                                    <div className="px-3 pb-3 border-t border-gray-600/50">
                                                        <div className="pt-2 space-y-1">
                                                            {word.examples.map((example, exampleIndex) => (
                                                                <p key={exampleIndex} className="text-sm text-gray-400">
                                                                    • {example}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VocabularyPage;