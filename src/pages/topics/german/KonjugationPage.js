import React, { useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, ChevronRight as ExpandIcon, ChevronLeft as CollapseIcon } from 'lucide-react';
import konjugationData from '../../../data/german/Konjugation.json';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const KonjugationPage = () => {
    const [activeVerbIndex, setActiveVerbIndex] = useState(0);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const activeVerb = konjugationData[activeVerbIndex].verb;

    const SidebarNavigation = () => (
        <div
            className={`fixed top-0 left-0 h-full bg-gray-800/50 backdrop-blur-sm border-r border-gray-700/50 transition-all duration-300 ease-in-out overflow-hidden ${
                isSidebarCollapsed ? 'w-16' : 'w-72'
            }`}
        >
            {/* Collapse Button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
                <h2 className={`${isSidebarCollapsed ? 'hidden' : 'text-sm font-semibold text-gray-300 uppercase tracking-wider'}`}>Verbs</h2>
                <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                    {isSidebarCollapsed ? (
                        <ExpandIcon className="w-5 h-5 text-gray-400" />
                    ) : (
                        <CollapseIcon className="w-5 h-5 text-gray-400" />
                    )}
                </button>
            </div>

            {/* Categories List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {!isSidebarCollapsed && (
                    <div className="p-4">
                        <div className="space-y-1">
                            {konjugationData.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveVerbIndex(index)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                        activeVerbIndex === index
                                            ? 'bg-purple-500/20 text-purple-300'
                                            : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
                                    }`}
                                >
                                    <BookOpen className="w-4 h-4 flex-shrink-0" />
                                    <span className="text-sm font-medium">{item.verb}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Collapsed View */}
                {isSidebarCollapsed && (
                    <div className="py-4 space-y-2">
                        {konjugationData.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveVerbIndex(index)}
                                className={`w-full flex items-center justify-center p-3 transition-colors ${
                                    activeVerbIndex === index
                                        ? 'text-purple-400'
                                        : 'text-gray-500 hover:text-gray-300'
                                }`}
                            >
                                <BookOpen className="w-5 h-5" />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const renderConjugations = (conjugations) => (
        <div className="overflow-x-auto">
            <div className="min-w-full bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="grid grid-cols-4 gap-6">
                    <div className="font-bold text-purple-400 text-lg">Pronoun</div>
                    {Object.keys(conjugations.ich).map((tense, idx) => (
                        <div key={idx} className="font-bold text-purple-400 text-lg uppercase">
                            {tense}
                        </div>
                    ))}
                </div>
                {Object.entries(conjugations).map(([pronoun, tenses], idx) => (
                    <div key={idx} className="grid grid-cols-4 gap-6 mt-4 border-t border-gray-700 pt-4">
                        <div className="text-purple-300 font-medium text-md">{pronoun}</div>
                        {Object.keys(tenses).map((tense, tenseIdx) => (
                            <div key={tenseIdx} className="bg-gray-900 rounded p-4 border border-gray-700 shadow-md">
                                <p className="text-gray-200 text-lg font-semibold">{tenses[tense]}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderContent = () => {
        const verbData = konjugationData[activeVerbIndex];
        if (!verbData) return null;

        return (
            <div className={`space-y-8 ${isSidebarCollapsed ? 'ml-20' : 'ml-80'}`}>
                {/* Verb Header with Navigation */}
                <div className="bg-gray-800 rounded-lg p-8 border border-purple-600 shadow-lg flex items-center justify-between">
                    <button
                        onClick={() => setActiveVerbIndex((prevIndex) => Math.max(prevIndex - 1, 0))}
                        className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-700"
                        disabled={activeVerbIndex === 0}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-2">{verbData.verb}</h1>
                        <p className="text-gray-400 text-xl">{verbData.meaning}</p>
                    </div>
                    <button
                        onClick={() => setActiveVerbIndex((prevIndex) => Math.min(prevIndex + 1, konjugationData.length - 1))}
                        className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-700"
                        disabled={activeVerbIndex === konjugationData.length - 1}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Conjugations Section */}
                {renderConjugations(verbData.conjugations)}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 pb-16">
            <SidebarNavigation />
            <div className="pt-8">
                {/* Content */}
                {renderContent()}
            </div>
        </div>
    );
};

export default KonjugationPage;
