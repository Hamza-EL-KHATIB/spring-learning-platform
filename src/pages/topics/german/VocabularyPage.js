import React, { useState, useMemo } from 'react';
import { Search, Eye, EyeOff, X, ChevronRight, BookOpenCheck, BookOpen } from 'lucide-react';
import vocabularyData from '../../../data/german/a1.json';
import VocabularyTabs from './VocabularyTabs';
import './VocabularyPage.css';

const VocabularyPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showEnglish, setShowEnglish] = useState(true);
    const [selectedWord, setSelectedWord] = useState(null);
    const [activeTab, setActiveTab] = useState('basics');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showMobileCategories, setShowMobileCategories] = useState(false);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSearchTerm(''); // Clear search when changing category
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

    // Calculate totals after filteredData is defined
    const totals = useMemo(() => {
        const total = vocabularyData.reduce((total, category) => total + category.words.length, 0);
        const filtered = filteredData.reduce((total, category) => total + category.words.length, 0);
        return { total, filtered };
    }, [filteredData]);

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                            German A1 Vocabulary
                        </h1>
                        <div className="flex items-center gap-4">
                            {/* Stats Display */}
                            <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                <BookOpenCheck className="w-4 h-4 text-purple-400" />
                                <span className="text-purple-300">Words: {totals.total}</span>
                            </div>
                            {totals.filtered !== totals.total && (
                                <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
                                    <BookOpen className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-300">Showing: {totals.filtered}</span>
                                </div>
                            )}
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

                {/* Desktop Layout */}
                <div className="max-w-6xl mx-auto hidden lg:block">
                    <div className="flex gap-8">
                        {/* Categories Sidebar */}
                        <div className="w-1/4">
                            <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 sticky top-4">
                                <VocabularyTabs
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                    onSelectCategory={handleCategorySelect}
                                    vertical={true}
                                />
                            </div>
                        </div>

                        {/* Words Grid */}
                        <div className="flex-1">
                            <div className="space-y-8">
                                {filteredData.map((category, catIndex) => (
                                    <div key={catIndex}
                                         className="bg-gray-800/30 rounded-lg border border-gray-700/50 p-6">
                                        <CategoryContent
                                            category={category}
                                            showEnglish={showEnglish}
                                            onSelectWord={setSelectedWord}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden">
                    {/* Mobile Categories Button */}
                    <div className="fixed bottom-6 right-6 z-50">
                        <button
                            onClick={() => setShowMobileCategories(!showMobileCategories)}
                            className="p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
                        >
                            {showMobileCategories ? (
                                <ChevronRight className="w-6 h-6" />
                            ) : (
                                <BookOpen className="w-6 h-6" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Categories Drawer */}
                    <div className={`
                        fixed inset-0 z-40 transition-transform duration-300
                        ${showMobileCategories ? 'translate-y-0' : 'translate-y-full'}
                    `}>
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                             onClick={() => setShowMobileCategories(false)} />
                        <div className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-xl max-h-[70vh] flex flex-col">
                            <div className="p-4 border-b border-gray-800">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium text-white">Categories</h3>
                                    <button onClick={() => setShowMobileCategories(false)}>
                                        <ChevronRight className="w-6 h-6 text-gray-400" />
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-y-auto overscroll-contain p-4 flex-1 touch-pan-y">
                                <VocabularyTabs
                                    activeTab={activeTab}
                                    setActiveTab={(tab) => {
                                        setActiveTab(tab);
                                        setShowMobileCategories(false);
                                    }}
                                    onSelectCategory={(category) => {
                                        handleCategorySelect(category);
                                        setShowMobileCategories(false);
                                    }}
                                    vertical={true}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Words List */}
                    <div className="space-y-8">
                        {filteredData.map((category, catIndex) => (
                            <div key={catIndex}
                                 className="bg-gray-800/30 rounded-lg border border-gray-700/50 p-6">
                                <CategoryContent
                                    category={category}
                                    showEnglish={showEnglish}
                                    onSelectWord={setSelectedWord}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Word Details Modal */}
                <WordDetailsModal
                    word={selectedWord}
                    onClose={() => setSelectedWord(null)}
                />
            </div>
        </div>
    );
};

// Extracted components for better organization
const CategoryContent = ({ category, showEnglish, onSelectWord }) => (
    <>
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
                <WordCard
                    key={wordIndex}
                    word={word}
                    showEnglish={showEnglish}
                    onClick={() => onSelectWord(word)}
                />
            ))}
        </div>
    </>
);

const WordCard = ({ word, showEnglish, onClick }) => (
    <button
        onClick={onClick}
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
);

const WordDetailsModal = ({ word, onClose }) => {
    if (!word) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 max-w-lg w-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            {word.article && (
                                <span className="text-lg text-purple-400">{word.article}</span>
                            )}
                            <h2 className="text-xl font-bold text-white">{word.german}</h2>
                        </div>
                        <p className="text-gray-400">{word.english}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-400 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                            Examples
                        </h3>
                        <div className="space-y-3">
                            {word.examples?.map((example, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800/50 rounded-lg p-4"
                                >
                                    <span className="text-gray-300">{example}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end px-6 py-4 border-t border-gray-800">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VocabularyPage;