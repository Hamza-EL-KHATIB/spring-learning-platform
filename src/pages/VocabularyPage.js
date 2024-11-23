import React, { useState } from 'react';
import { Search, ChevronRight, ChevronLeft, Eye, EyeOff, X } from 'lucide-react';
import vocabularyData from '../data/german/a1.json';
import './VocabularyPage.css';

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
        <div className="h-screen bg-gray-900">
            <div className="container mx-auto px-4 py-8 h-full">
                {/* Header */}
                <div className="max-w-4xl mx-auto mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-white">German A1 Vocabulary</h1>
                        <button
                            onClick={() => setShowEnglish(!showEnglish)}
                            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
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
                            className="w-full px-5 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 pl-12"
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row h-[calc(100%-5rem)]">
                    {/* Categories Sidebar */}
                    <div className={`flex flex-col w-full md:w-64 pr-8 md:mr-6 overflow-y-auto h-full custom-scrollbar mb-6 md:mb-0 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'hidden md:block md:w-16' : ''}`}>
                        <button
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                            className="flex items-center text-gray-400 hover:text-white mb-4 md:block"
                        >
                            {isSidebarCollapsed ? (
                                <ChevronRight className="w-5 h-5" />
                            ) : (
                                <ChevronLeft className="w-5 h-5" />
                            )}
                        </button>
                        {!isSidebarCollapsed && (
                            <div className="space-y-2">
                                {vocabularyData.map((category, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveCategory(index)}
                                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                            activeCategory === index
                                                ? 'bg-purple-500/20 text-purple-400'
                                                : 'text-gray-400 hover:bg-gray-800'
                                        }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span>{category.title}</span>
                                            <span className="text-sm opacity-75">{category.words.length}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Toggle Sidebar Button for Mobile */}
                    {isSidebarCollapsed && (
                        <button
                            onClick={() => setIsSidebarCollapsed(false)}
                            className="text-gray-400 hover:text-white mb-4 md:hidden"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    )}

                    {/* Words List */}
                    <div className={`flex-1 overflow-y-auto h-full custom-scrollbar ${isSidebarCollapsed ? 'w-full' : ''}`}>
                        {(searchTerm ? filteredData : [vocabularyData[activeCategory]]).map((category, catIndex) => (
                            <div key={catIndex} className="mb-8">
                                <h2 className="text-xl font-semibold text-white mb-4">{category.title}</h2>
                                <div className="space-y-3">
                                    {category.words.map((word, wordIndex) => (
                                        <button
                                            key={wordIndex}
                                            onClick={() => setSelectedWord(word)}
                                            className="group bg-gradient-to-r from-pink-500/10 to-rose-500/10 hover:from-pink-500/20 hover:to-rose-500/20 rounded-lg p-4 transition-colors w-full text-left border border-pink-500/20"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="flex items-center space-x-2">
                                                        {word.article && (
                                                            <span className="text-purple-400 text-sm">{word.article}</span>
                                                        )}
                                                        <span className="text-lg text-white">{word.german}</span>
                                                    </div>
                                                    {showEnglish && (
                                                        <p className="text-gray-400 mt-1">{word.english}</p>
                                                    )}
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-gray-600" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
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
                                            className="group flex items-center justify-between bg-gray-800/50 rounded-lg p-4"
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
                                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
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
