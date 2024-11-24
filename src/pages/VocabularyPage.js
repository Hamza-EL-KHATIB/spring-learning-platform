import React, { useState } from 'react';
import { Search, Eye, EyeOff, X, BookOpen, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import vocabularyData from '../data/german/a1.json';
import './VocabularyPage.css';

const CategorySidebar = ({
                             vocabularyData,
                             activeCategory,
                             setActiveCategory,
                             isSidebarCollapsed,
                             setIsSidebarCollapsed
                         }) => {
    return (
        <div
            className={`flex flex-col h-full bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700/50 transition-all duration-300 ease-in-out ${
                isSidebarCollapsed ? 'w-16' : 'w-72'
            }`}
        >
            {/* Collapse Button */}
            <div className="flex items-center justify-end p-4 border-b border-gray-700/50">
                <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                    {isSidebarCollapsed ? (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    ) : (
                        <ChevronLeft className="w-5 h-5 text-gray-400" />
                    )}
                </button>
            </div>

            {/* Categories List */}
            <div className="flex-1 overflow-y-auto">
                {!isSidebarCollapsed && (
                    <div className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <GraduationCap className="w-5 h-5 text-purple-400" />
                            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                                Categories
                            </h2>
                        </div>
                        <div className="space-y-1">
                            {vocabularyData.map((category, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveCategory(index)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                        activeCategory === index
                                            ? 'bg-purple-500/20 text-purple-300'
                                            : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
                                    }`}
                                >
                                    <BookOpen className="w-4 h-4 flex-shrink-0" />
                                    <div className="flex flex-1 items-center justify-between">
                                        <div className="flex flex-col text-left">
                    <span className="text-sm font-medium">
                      {category.title.split('(')[0].trim()}
                    </span>
                                            <span className="text-xs text-gray-500">
                      {category.title.includes('(') ? `(${category.title.split('(')[1]}` : ''}
                    </span>
                                        </div>
                                        <span className="text-xs px-2 py-1 rounded-full bg-gray-700/50">
                      {category.words.length}
                    </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Collapsed View */}
                {isSidebarCollapsed && (
                    <div className="py-4">
                        {vocabularyData.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveCategory(index)}
                                className={`w-full flex items-center justify-center p-3 transition-colors ${
                                    activeCategory === index
                                        ? 'text-purple-400'
                                        : 'text-gray-500 hover:text-gray-300'
                                }`}
                            >
                                <div
                                    className={`w-2 h-2 rounded-full ${
                                        activeCategory === index
                                            ? 'bg-purple-400'
                                            : 'bg-gray-600'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const VocabularyPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState(0);
    const [showEnglish, setShowEnglish] = useState(true);
    const [selectedWord, setSelectedWord] = useState(null);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const filteredData = !searchTerm
        ? vocabularyData
        : vocabularyData.map(category => ({
            ...category,
            words: category.words.filter(word =>
                word.german.toLowerCase().includes(searchTerm.toLowerCase()) ||
                word.english.toLowerCase().includes(searchTerm.toLowerCase())
            )
        })).filter(category => category.words.length > 0);

    const closeModal = () => setSelectedWord(null);

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="container mx-auto px-4 py-8 h-full">
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

                {/* Main Content */}
                <div className="max-w-6xl mx-auto flex gap-6 h-[calc(100vh-12rem)]">
                    {/* Categories Sidebar */}
                    <CategorySidebar
                        vocabularyData={vocabularyData}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        isSidebarCollapsed={isSidebarCollapsed}
                        setIsSidebarCollapsed={setIsSidebarCollapsed}
                    />

                    {/* Words List */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 p-6">
                            {(searchTerm ? filteredData : [vocabularyData[activeCategory]]).map((category, catIndex) => (
                                <div key={catIndex} className="mb-8 last:mb-0">
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
            </div>

            {/* Modal for Word Examples */}
            {selectedWord && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-gray-900 rounded-2xl border border-gray-800 max-w-lg w-full">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-800">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    {selectedWord.article && (
                                        <span className="text-lg text-purple-400">{selectedWord.article}</span>
                                    )}
                                    <h2 className="text-xl font-bold text-white">{selectedWord.german}</h2>
                                </div>
                                <p className="text-gray-400">{selectedWord.english}</p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-400 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Examples</h3>
                                <div className="space-y-3">
                                    {selectedWord.examples && selectedWord.examples.map((example, index) => (
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

                        {/* Modal Footer */}
                        <div className="flex justify-end px-6 py-4 border-t border-gray-800">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VocabularyPage;