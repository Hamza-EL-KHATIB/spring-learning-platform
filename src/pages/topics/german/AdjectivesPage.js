import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Info, Table } from 'lucide-react';
import adjectivesJson from '../../../data/german/adjectives.json';

const EndingsOverview = () => {
    const articleTypes = {
        after_definite_article: "Definite Article (der/die/das)",
        after_indefinite_article: "Indefinite Article (ein/eine)",
        without_article: "Without Article"
    };

    const cases = ['nominativ', 'akkusativ', 'dativ'];
    const genders = ['masculine', 'feminine', 'neuter', 'plural'];

    return (
        <div className="space-y-8">
            <div className="bg-gray-800/50 rounded-lg p-4 sm:p-6 border border-cyan-500/20">
                <div className="flex items-center mb-4">
                    <Table className="w-5 h-5 text-cyan-400 mr-2" />
                    <h2 className="text-base sm:text-lg font-semibold text-white">Adjective Endings Overview</h2>
                </div>

                {Object.entries(articleTypes).map(([type, title]) => (
                    <div key={type} className="mb-8">
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">{title}</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                <tr>
                                    <th className="text-left text-gray-400 pb-2">Case / Gender</th>
                                    {genders.map(gender => (
                                        <th key={gender} className="text-left text-gray-400 pb-2 capitalize">
                                            {gender}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                {cases.map(caseType => (
                                    <tr key={caseType} className="border-t border-gray-800">
                                        <td className="py-2 text-gray-300 capitalize whitespace-nowrap">
                                            {caseType}
                                        </td>
                                        {genders.map(gender => {
                                            const path = adjectivesJson.adjective_patterns[type]?.cases?.[caseType]?.[gender];
                                            const ending = path?.ending || '-';
                                            const article = path?.example?.breakdown?.article || '-';

                                            return (
                                                <td key={gender} className="py-2 whitespace-nowrap">
                                                    {/* Display article and ending together */}
                                                    <span className="text-gray-300 mr-2">
                                                            {article}
                                                        </span>
                                                    <span className="text-cyan-400 font-medium">
                                                            {ending}
                                                        </span>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Tips */}
            <div className="bg-gray-800/50 rounded-lg p-4 sm:p-6 border border-purple-500/20">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Memory Aids</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                    {adjectivesJson.memory_aids.map((tip, index) => (
                        <li key={index}>{tip}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const DetailedExplanations = () => {
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
        <div className="space-y-8">
            <ExplanationCard />

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-8">
                <div className="flex-1">
                    <h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-2">Case</h3>
                    <div className="flex space-x-2 overflow-x-auto">
                        {cases.map(caseType => (
                            <button
                                key={caseType}
                                onClick={() => setActiveCase(caseType)}
                                className={`px-3 py-2 text-sm rounded-lg font-medium whitespace-nowrap ${
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
                    <h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-2">Article Type</h3>
                    <div className="flex space-x-2 overflow-x-auto">
                        {Object.entries(articleTypes).map(([type, data]) => (
                            <button
                                key={type}
                                onClick={() => setActiveArticleType(type)}
                                className={`px-3 py-2 text-sm rounded-lg font-medium whitespace-nowrap ${
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

            {/* Pattern Description */}
            {currentPattern && (
                <div className="bg-gray-800/50 rounded-lg p-4 sm:p-6 border border-purple-500/20">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">{currentPattern.description}</h3>
                    <p className="text-gray-300 text-sm sm:text-base mb-4">{currentPattern.explanation}</p>
                    {currentPattern.pattern_hints && (
                        <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base">
                            {currentPattern.pattern_hints.map((hint, index) => (
                                <li key={index}>{hint}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* Examples Grid */}
            {currentCaseData && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {Object.entries(currentCaseData).map(([gender, data]) => (
                        <GenderSection
                            key={`${activeArticleType}-${activeCase}-${gender}`}
                            gender={gender}
                            data={data}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const ExplanationCard = () => (
    <div className="bg-gray-800/50 rounded-lg p-4 sm:p-6 border border-cyan-500/20">
        <div className="flex items-center mb-4">
            <Info className="w-5 h-5 text-cyan-400 mr-2" />
            <h2 className="text-base sm:text-lg font-semibold text-white">Understanding German Adjective Endings</h2>
        </div>
        <div className="space-y-4 text-gray-300 text-sm sm:text-base">
            <p>German adjective endings change based on three factors:</p>
            <ul className="space-y-2 list-disc list-inside">
                {adjectivesJson.general_tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                ))}
            </ul>
        </div>
    </div>
);

const GenderSection = ({ gender, data }) => {
    const [expanded, setExpanded] = useState(false);

    if (!data || !data.example) return null;

    return (
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-purple-500/20">
            <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white capitalize mb-2">{gender}</h3>
                <div className="inline-block bg-cyan-950/50 border border-cyan-500/50 text-cyan-300 px-3 py-1 rounded-lg">
                    <span className="text-sm sm:text-base font-bold">Ending:</span>
                    <span className="text-base sm:text-lg font-semibold ml-1">{data.ending}</span>
                </div>
            </div>
            <PatternExample
                example={data.example}
                expanded={expanded}
                onToggle={() => setExpanded(!expanded)}
            />
        </div>
    );
};

const PatternExample = ({ example, expanded, onToggle }) => {
    if (!example) return null;

    return (
        <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between text-gray-200 mb-2 text-sm sm:text-base"
            >
                <span>{example.german}</span>
                {expanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
            </button>

            {expanded && example.breakdown && (
                <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-700 text-sm sm:text-base">
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


const AdjectivesPage = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="min-h-screen bg-gray-900 py-6 sm:py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        German Adjective Patterns
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base">
                        Learn how adjective endings change based on articles, case, and gender
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex space-x-2 sm:space-x-4 mb-6 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-3 py-2 text-sm sm:text-base rounded-lg font-medium whitespace-nowrap ${
                            activeTab === 'overview'
                                ? 'bg-purple-500 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        Overview Tables
                    </button>
                    <button
                        onClick={() => setActiveTab('detailed')}
                        className={`px-3 py-2 text-sm sm:text-base rounded-lg font-medium whitespace-nowrap ${
                            activeTab === 'detailed'
                                ? 'bg-purple-500 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        Detailed Explanations
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'overview' ? <EndingsOverview /> : <DetailedExplanations />}
            </div>
        </div>
    );
};

export default AdjectivesPage;
