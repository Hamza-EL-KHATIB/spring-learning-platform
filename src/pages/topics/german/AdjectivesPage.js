import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Info } from 'lucide-react';
import adjectivesJson from '../../../data/german/adjectives.json';

const ExplanationCard = () => (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20 mb-8">
        <div className="flex items-center mb-4">
            <Info className="w-5 h-5 text-cyan-400 mr-2" />
            <h2 className="text-lg font-semibold text-white">Understanding German Adjective Endings</h2>
        </div>
        <div className="space-y-4 text-gray-300">
            <p>German adjective endings change based on three factors:</p>
            <ul className="space-y-2 list-disc list-inside">
                {adjectivesJson.general_tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                ))}
            </ul>
        </div>
    </div>
);

const PatternTransformation = ({ example, expanded, onToggle }) => {
    if (!example) return null;

    return (
        <div className="bg-gray-800/50 rounded-lg p-4">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between text-gray-200 mb-2"
            >
                <span className="text-lg">{example.german}</span>
                {expanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
            </button>

            {expanded && example.breakdown && (
                <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-700">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-purple-400 font-medium w-20">Article:</span>
                            <span className="text-gray-300">{example.breakdown.article}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-cyan-400 font-medium w-20">Adjective:</span>
                            <span className="text-gray-300">{example.breakdown.adjective}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-pink-400 font-medium w-20">Noun:</span>
                            <span className="text-gray-300">{example.breakdown.noun}</span>
                        </div>
                    </div>
                    <div className="pt-2 border-t border-gray-700">
                        <span className="text-gray-400 italic">{example.english}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

const GenderSection = ({ gender, data, patternKey }) => {
    const [expandedExamples, setExpandedExamples] = useState({});

    const toggleExample = (index) => {
        setExpandedExamples(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    if (!data || !data.example) return null;

    return (
        <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white capitalize">{gender}</h3>
                <div className="text-sm text-cyan-400 bg-cyan-950/50 px-3 py-1 rounded-full">
                    Ending: {data.ending}
                </div>
            </div>

            <PatternTransformation
                example={data.example}
                expanded={expandedExamples[0]}
                onToggle={() => toggleExample(0)}
            />
        </div>
    );
};

const AdjectivesPage = () => {
    const [activeCase, setActiveCase] = useState('nominativ');
    const [activeArticleType, setActiveArticleType] = useState('after_definite_article');

    const articleTypes = {
        after_definite_article: { description: 'After Definite Article' },
        after_indefinite_article: { description: 'After Indefinite Article' },
        without_article: { description: 'Without Article' }
    };

    const cases = ['nominativ', 'akkusativ', 'dativ'];
    const currentPattern = adjectivesJson.adjective_patterns[activeArticleType];
    const currentCaseData = currentPattern?.cases?.[activeCase];

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        German Adjective Patterns
                    </h1>
                    <p className="text-gray-400">
                        Learn how adjective endings change based on articles, case, and gender
                    </p>
                </div>

                <ExplanationCard />

                {/* Navigation */}
                <div className="flex space-x-4 mb-8">
                    <div className="flex-1">
                        <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Case</h3>
                        <div className="flex space-x-2">
                            {cases.map(caseType => (
                                <button
                                    key={caseType}
                                    onClick={() => setActiveCase(caseType)}
                                    className={`px-4 py-2 rounded-lg font-medium ${
                                        activeCase === caseType
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    }`}
                                >
                                    {caseType.charAt(0).toUpperCase() + caseType.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Article Type</h3>
                        <div className="flex space-x-2">
                            {Object.entries(articleTypes).map(([type, data]) => (
                                <button
                                    key={type}
                                    onClick={() => setActiveArticleType(type)}
                                    className={`px-4 py-2 rounded-lg font-medium ${
                                        activeArticleType === type
                                            ? 'bg-cyan-500 text-white'
                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    }`}
                                >
                                    {data.description}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Description Card */}
                {currentPattern && (
                    <div className="mb-8 bg-gray-800/50 rounded-lg p-6 border border-purple-500/20">
                        <h3 className="text-xl font-semibold text-white mb-4">{currentPattern.description}</h3>
                        <p className="text-gray-300 mb-4">{currentPattern.explanation}</p>
                        {currentPattern.pattern_hints && (
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                                {currentPattern.pattern_hints.map((hint, index) => (
                                    <li key={index}>{hint}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {/* Patterns Grid */}
                {currentCaseData && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {Object.entries(currentCaseData).map(([gender, data]) => (
                            <GenderSection
                                key={`${activeArticleType}-${activeCase}-${gender}`}
                                gender={gender}
                                data={data}
                                patternKey={`${activeArticleType}-${activeCase}-${gender}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdjectivesPage;