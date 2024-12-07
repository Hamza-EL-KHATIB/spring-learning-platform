import React, { useState } from 'react';
import { Book, Info } from 'lucide-react';
import germanData from '../../../data/german/german-cases.json';

const GermanCasesPage = () => {
    const [activeTab, setActiveTab] = useState('articles');
    const [selectedCase, setSelectedCase] = useState('nominativ');
    const [selectedArticleType, setSelectedArticleType] = useState('definite_article');

    const TabButton = ({ id, label, active, onClick }) => (
        <button
            onClick={() => onClick(id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                active
                    ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-lg shadow-fuchsia-500/20'
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
                            ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg shadow-cyan-500/20'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                >
                    {caseType.charAt(0).toUpperCase() + caseType.slice(1)}
                </button>
            ))}
        </div>
    );

    const ArticleTypeSelector = () => (
        <div className="flex space-x-4 mb-6">
            {[
                { id: 'definite_article', label: 'Definite Articles' },
                { id: 'indefinite_article', label: 'Indefinite Articles' },
                { id: 'negative_article', label: 'Negative Articles' }
            ].map(type => (
                <button
                    key={type.id}
                    onClick={() => setSelectedArticleType(type.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedArticleType === type.id
                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                >
                    {type.label}
                </button>
            ))}
        </div>
    );

    const ArticlesTable = () => {
        const data = germanData.articles_and_pronouns[selectedArticleType].cases[selectedCase];
        const examples = germanData.examples[
            selectedArticleType === 'definite_article'
                ? 'with_definite_articles'
                : selectedArticleType === 'indefinite_article'
                    ? 'with_indefinite_articles'
                    : null
            ]?.[selectedCase];

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-violet-500/20">
                    <div className="grid grid-cols-4 gap-4">
                        {Object.entries(data).map(([gender, article]) => (
                            <div key={gender} className="bg-gray-900/50 p-4 rounded-lg border border-violet-500/10">
                                <div className="text-gray-400 text-sm mb-1">{gender}</div>
                                <div className="text-2xl font-bold text-violet-300">{article}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {examples && (
                    <div className="bg-gray-800/50 rounded-lg p-6 border border-fuchsia-500/20">
                        <h3 className="text-xl font-bold text-fuchsia-300 mb-4">Examples</h3>
                        <div className="space-y-3">
                            {examples.map((example, idx) => {
                                // Split the example to highlight the relevant parts
                                const parts = example.split(' ');
                                return (
                                    <div key={idx} className="bg-gray-900/50 p-3 rounded-lg border border-fuchsia-500/10">
                                        {parts.map((part, partIdx) => {
                                            // Check if this part contains the relevant article or ending
                                            const isArticle = germanData.articles_and_pronouns[selectedArticleType].cases[selectedCase][Object.keys(germanData.articles_and_pronouns[selectedArticleType].cases[selectedCase])[0]] === part;
                                            const hasRelevantEnding = Object.values(germanData.articles_and_pronouns[selectedArticleType].cases[selectedCase]).some(article => part.startsWith(article));

                                            return (
                                                <span key={partIdx} className={`${
                                                    isArticle ? 'text-fuchsia-400 font-bold' :
                                                        hasRelevantEnding ? 'text-pink-400' : 'text-gray-300'
                                                } ${partIdx > 0 ? 'ml-1' : ''}`}>
                                                    {part}
                                                </span>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const AdjectiveEndingsTable = () => {
        const types = [
            { id: 'after_definite_article', title: 'After Definite Articles' },
            { id: 'after_indefinite_article', title: 'After Indefinite Articles' },
            { id: 'without_article', title: 'Without Articles' }
        ];

        return (
            <div className="space-y-8">
                {types.map(type => {
                    const data = germanData.adjective_endings[type.id].cases[selectedCase];
                    return (
                        <div key={type.id} className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                            <h3 className="text-xl font-bold text-cyan-300 mb-4">{type.title}</h3>
                            <div className="grid grid-cols-4 gap-4">
                                {Object.entries(data).map(([gender, ending]) => (
                                    <div key={gender} className="bg-gray-900/50 p-4 rounded-lg border border-cyan-500/10">
                                        <div className="text-gray-400 text-sm mb-1">{gender}</div>
                                        <div className="text-2xl font-bold text-cyan-300">{ending}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                <div className="bg-gray-800/50 rounded-lg p-6 border border-teal-500/20">
                    <h3 className="text-xl font-bold text-teal-300 mb-4">Examples</h3>
                    <div className="space-y-3">
                        {germanData.examples.without_articles[selectedCase].map((example, idx) => {
                            // Split the example to highlight the relevant parts
                            const parts = example.split(' ');
                            return (
                                <div key={idx} className="bg-gray-900/50 p-3 rounded-lg border border-teal-500/10">
                                    {parts.map((part, partIdx) => {
                                        // Check if this part contains an adjective ending
                                        const endings = germanData.adjective_endings.without_article.cases[selectedCase];
                                        const hasEnding = Object.values(endings).some(ending =>
                                            part.endsWith(ending) && part.length > ending.length
                                        );

                                        return (
                                            <span key={partIdx} className={`${
                                                hasEnding ? 'text-cyan-400 font-semibold' : 'text-gray-300'
                                            } ${partIdx > 0 ? 'ml-1' : ''}`}>
                                                {part}
                                            </span>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Title Section */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-fuchsia-500/20">
                <div className="flex items-center gap-3">
                    <Book className="w-8 h-8 text-fuchsia-400" />
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400">
                        German Cases & Articles
                    </h1>
                </div>
                <p className="text-gray-300 mt-4">
                    Master German grammar cases, articles, and adjective endings with clear examples.
                </p>
            </div>

            {/* Case Selection */}
            <CaseSelector />

            {/* Main Navigation */}
            <div className="flex space-x-4 mb-8">
                <TabButton
                    id="articles"
                    label="Articles"
                    active={activeTab === 'articles'}
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
                {activeTab === 'articles' && (
                    <>
                        <ArticleTypeSelector />
                        <ArticlesTable />
                    </>
                )}

                {activeTab === 'adjectives' && (
                    <AdjectiveEndingsTable />
                )}
            </div>
        </div>
    );
};

export default GermanCasesPage;