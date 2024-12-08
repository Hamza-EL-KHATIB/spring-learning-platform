import React, { useState } from 'react';
import { Book, ChevronDown, ChevronRight, Info } from 'lucide-react';
import germanData from '../../../data/german/german-cases.json';

const ExplanationCard = () => (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20 mb-8">
        <div className="flex items-center mb-4">
            <Info className="w-5 h-5 text-cyan-400 mr-2" />
            <h2 className="text-lg font-semibold text-white">Understanding German Cases</h2>
        </div>
        <div className="space-y-4 text-gray-300">
            <p>
                German cases change the form of articles and adjectives based on their role in the sentence:
            </p>
            <ul className="space-y-2 list-disc list-inside">
                <li>
                    <span className="text-purple-400 font-semibold">Nominativ</span>: Used for the subject of the sentence
                </li>
                <li>
                    <span className="text-cyan-400 font-semibold">Akkusativ</span>: Used for the direct object
                </li>
                <li>
                    <span className="text-pink-400 font-semibold">Dativ</span>: Used for the indirect object
                </li>
            </ul>
        </div>
    </div>
);

// Pattern component showing the transformation
const PatternTransformation = ({ example, expanded, onToggle }) => {
    const { complete, breakdown, translation } = example;

    return (
        <div className="bg-gray-800/50 rounded-lg p-4">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between text-gray-200 mb-2"
            >
                <span className="text-lg">{complete}</span>
                {expanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
            </button>

            {expanded && (
                <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-700">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-purple-400 font-medium w-20">Article:</span>
                            <span className="text-gray-300">{breakdown.article}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-cyan-400 font-medium w-20">Adjective:</span>
                            <span className="text-gray-300">{breakdown.adjective}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-pink-400 font-medium w-20">Noun:</span>
                            <span className="text-gray-300">{breakdown.noun}</span>
                        </div>
                    </div>
                    <div className="pt-2 border-t border-gray-700">
                        <span className="text-gray-400 italic">{translation}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

// Gender section with clear pattern display
const GenderSection = ({ gender, data, patternKey }) => {
    const [expandedExamples, setExpandedExamples] = useState({});

    const toggleExample = (index) => {
        setExpandedExamples(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white capitalize">{gender}</h3>
                <div className="text-sm text-cyan-400 bg-cyan-950/50 px-3 py-1 rounded-full">
                    {data.pattern}
                </div>
            </div>

            <div className="space-y-4">
                {data.examples.map((example, idx) => (
                    <PatternTransformation
                        key={`${patternKey}-${idx}`}
                        example={example}
                        expanded={expandedExamples[idx]}
                        onToggle={() => toggleExample(idx)}
                    />
                ))}
            </div>
        </div>
    );
};

// Main component
const GermanCasesPage = () => {
    const [activeCase, setActiveCase] = useState('nominativ');
    const [activeArticleType, setActiveArticleType] = useState('definite_article');

    const grammarData = germanData.grammar_patterns;
    const currentPatterns = grammarData[activeArticleType]?.patterns[activeCase];

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        German Grammar Patterns
                    </h1>
                    <p className="text-gray-400">
                        Learn how articles and adjectives change based on case and gender
                    </p>
                </div>

                <ExplanationCard />

                {/* Navigation */}
                <div className="flex space-x-4 mb-8">
                    <div className="flex-1">
                        <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Case</h3>
                        <div className="flex space-x-2">
                            {['nominativ', 'akkusativ', 'dativ'].map(caseType => (
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
                            {Object.entries(grammarData).map(([type, data]) => (
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

                {/* Patterns Grid */}
                {currentPatterns && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {Object.entries(currentPatterns).map(([gender, data]) => (
                            <GenderSection
                                key={gender}
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

export default GermanCasesPage;