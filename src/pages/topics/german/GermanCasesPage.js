import React, { useState } from 'react';
import { Book } from 'lucide-react';
import germanData from '../../../data/german/german-cases.json';

const GermanCasesPage = () => {
    const [activeTab, setActiveTab] = useState('definite');
    const [selectedCase, setSelectedCase] = useState('nominativ');

    const TabButton = ({ id, label, active, onClick }) => (
        <button
            onClick={() => onClick(id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                active
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
        >
            {label}
        </button>
    );

    const CaseSelector = () => (
        <div className="flex space-x-4 mb-6">
            {['nominativ', 'akkusativ', 'dativ'].map(caseType => (
                <button
                    key={caseType}
                    onClick={() => setSelectedCase(caseType)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCase === caseType
                            ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                >
                    {caseType.charAt(0).toUpperCase() + caseType.slice(1)}
                </button>
            ))}
        </div>
    );

    const ArticleTable = ({ articleType }) => {
        const data = germanData.articles_and_pronouns[articleType].cases[selectedCase];
        const type = germanData.articles_and_pronouns[articleType].type;

        return (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/20 mb-6">
                <h3 className="text-xl font-bold text-purple-300 mb-4">{type}</h3>
                <div className="grid grid-cols-4 gap-4">
                    {Object.entries(data).map(([gender, article]) => (
                        <div key={gender} className="bg-gray-900/50 p-4 rounded-lg">
                            <div className="text-gray-400 text-sm mb-1">{gender}</div>
                            <div className="text-purple-300 font-medium">{article}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const AdjectiveEndingsTable = ({ type }) => {
        const data = germanData.adjective_endings[type].cases[selectedCase];
        const description = germanData.adjective_endings[type].description;

        return (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/20 mb-6">
                <h3 className="text-xl font-bold text-purple-300 mb-2">{description}</h3>
                <div className="grid grid-cols-4 gap-4">
                    {Object.entries(data).map(([gender, ending]) => (
                        <div key={gender} className="bg-gray-900/50 p-4 rounded-lg">
                            <div className="text-gray-400 text-sm mb-1">{gender}</div>
                            <div className="text-purple-300 font-medium">{ending}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const ExamplesSection = ({ type }) => {
        const examples = germanData.examples[type][selectedCase];

        return (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/20">
                <h3 className="text-xl font-bold text-purple-300 mb-4">Examples</h3>
                <div className="space-y-3">
                    {examples.map((example, idx) => (
                        <div key={idx} className="bg-gray-900/50 p-3 rounded-lg">
                            <span className="text-gray-300">{example}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Title Section */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <div className="flex items-center gap-3">
                    <Book className="w-8 h-8 text-purple-400" />
                    <h1 className="text-3xl font-bold text-white">German Cases & Articles</h1>
                </div>
            </div>

            {/* Case Selection */}
            <CaseSelector />

            {/* Navigation Tabs */}
            <div className="flex space-x-4 mb-8">
                <TabButton
                    id="definite"
                    label="Definite Articles"
                    active={activeTab === 'definite'}
                    onClick={setActiveTab}
                />
                <TabButton
                    id="indefinite"
                    label="Indefinite Articles"
                    active={activeTab === 'indefinite'}
                    onClick={setActiveTab}
                />
                <TabButton
                    id="negative"
                    label="Negative Articles"
                    active={activeTab === 'negative'}
                    onClick={setActiveTab}
                />
                <TabButton
                    id="adjectives"
                    label="Adjective Endings"
                    active={activeTab === 'adjectives'}
                    onClick={setActiveTab}
                />
            </div>

            {/* Content Section */}
            <div className="space-y-6">
                {activeTab === 'definite' && (
                    <>
                        <ArticleTable articleType="definite_article" />
                        <ExamplesSection type="with_definite_articles" />
                    </>
                )}

                {activeTab === 'indefinite' && (
                    <>
                        <ArticleTable articleType="indefinite_article" />
                        <ExamplesSection type="with_indefinite_articles" />
                    </>
                )}

                {activeTab === 'negative' && (
                    <>
                        <ArticleTable articleType="negative_article" />
                    </>
                )}

                {activeTab === 'adjectives' && (
                    <>
                        <AdjectiveEndingsTable type="after_definite_article" />
                        <AdjectiveEndingsTable type="after_indefinite_article" />
                        <AdjectiveEndingsTable type="without_article" />
                        <ExamplesSection type="without_articles" />
                    </>
                )}
            </div>
        </div>
    );
};

export default GermanCasesPage;