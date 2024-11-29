import React, { useState, useMemo } from 'react';
import { Search, Eye, EyeOff, ChevronRight } from 'lucide-react';
import vocabularyData from '../../../data/german/a1.json';
import VocabularyTabs from './VocabularyTabs';
import './VocabularyPage.css';

const VocabularyPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showEnglish, setShowEnglish] = useState(true);
    const [selectedWord, setSelectedWord] = useState(null);
    const [activeTab, setActiveTab] = useState('basics');
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Calculate total words from the entire vocabulary data
    const totalWords = useMemo(() =>
            vocabularyData.reduce((total, category) => total + category.words.length, 0),
        []
    );

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSearchTerm('');
    };

    // Filter data based on search term and selected category
    const filteredData = vocabularyData
        .filter(category =>
            !selectedCategory || category.title === selectedCategory
        )
        .map(category => ({
            ...category,
            words: category.words.filter(word =>
                !searchTerm ||
                word.german.toLowerCase().includes(searchTerm.toLowerCase()) ||
                word.english.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }))
        .filter(category => category.words.length > 0);

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                            German A1 Vocabulary
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
                            placeholder="Type to search words..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 pl-12"
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="max-w-6xl mx-auto mb-8">
                    <VocabularyTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        onSelectCategory={handleCategorySelect}
                        totalWords={totalWords}
                    />
                </div>

                {/* Word List */}
                <div className="max-w-6xl mx-auto">
                    <div className="space-y-8">
                        {filteredData.map((category, catIndex) => (
                            <div key={catIndex} className="bg-gray-800/30 rounded-lg border border-gray-700/50 p-6">
                                <div className="flex flex-col gap-1 mb-4">
                                    <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                                        {category.title.split('(')[0].trim()}
                                    </h2>
                                    {category.title.includes('(') && (
                                        <p className="text-sm text-gray-400 font-medium">
                                            {`(${category.title.split('(')[1]}`}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-3">
                                    {category.words.map((word, wordIndex) => (
                                        <button
                                            key={wordIndex}
                                            onClick={() => setSelectedWord(word)}
                                            className="group bg-gray-800/50 hover:bg-gray-700/50 rounded-lg p-4 transition-all w-full text-left border border-gray-700/50 hover:border-purple-500/50"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        {word.article && (
                                                            <span className="text-purple-400 text-sm">{word.article}</span>
                                                        )}
                                                        <span className="text-lg text-white">{word.german}</span>
                                                    </div>
                                                    {showEnglish && (
                                                        <p className="text-gray-400 mt-1">{word.english}</p>
                                                    )}
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-purple-400 transition-colors" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Word Details Modal */}
            {selectedWord && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-gray-900 rounded-2xl border border-gray-800 max-w-lg w-full">
                        {/* Modal content remains the same */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VocabularyPage;