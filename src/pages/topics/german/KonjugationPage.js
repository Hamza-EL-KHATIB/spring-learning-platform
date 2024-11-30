import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import konjugationData from '../../../data/german/Konjugation.json';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const KonjugationPage = () => {
    const [activeVerb, setActiveVerb] = useState(konjugationData[0].verb);

    // Remove duplicate verbs from the list
    const uniqueVerbs = [...new Set(konjugationData.map((item) => item.verb))];

    const TabNavigation = () => (
        <div className="mb-8 flex flex-wrap gap-4">
            {uniqueVerbs.map((verb) => (
                <button
                    key={verb}
                    onClick={() => setActiveVerb(verb)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors shadow-lg ${
                        activeVerb === verb
                            ? 'bg-purple-600 text-white border border-purple-600'
                            : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
                    }`}
                >
                    <BookOpen className="w-4 h-4" />
                    {verb}
                </button>
            ))}
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
        const verbData = konjugationData.find((item) => item.verb === activeVerb);
        if (!verbData) return null;

        return (
            <div className="space-y-8">
                {/* Verb Header */}
                <div className="bg-gray-800 rounded-lg p-8 border border-purple-600 shadow-lg">
                    <h1 className="text-4xl font-bold text-white mb-4">{verbData.verb}</h1>
                    <p className="text-gray-400 text-xl">{verbData.meaning}</p>
                </div>

                {/* Conjugations Section */}
                {renderConjugations(verbData.conjugations)}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 pb-16">
            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-8 border border-purple-600 shadow-lg">
                <h1 className="text-4xl font-bold text-white">Konjugation der Verben</h1>
            </div>

            {/* Navigation */}
            <TabNavigation />

            {/* Content */}
            <div className="space-y-12 max-w-5xl mx-auto px-4">{renderContent()}</div>
        </div>
    );
};

export default KonjugationPage;