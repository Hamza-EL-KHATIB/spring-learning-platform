import React, { useState } from 'react';
import { Book, ChevronDown, ChevronUp } from 'lucide-react';
import germanData from '../../../data/german/german-cases.json';

const ExamplesSection = ({ examples }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!examples || examples.length === 0) return null;

    return (
        <div className="mt-4">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
                <span className="text-sm">Examples</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isExpanded && (
                <div className="mt-2 space-y-2">
                    {examples.map((example, idx) => (
                        <div key={idx} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                            <p className="text-gray-300">{example}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const TabButton = ({ id, label, active, onClick }) => (
    <button
        onClick={() => onClick(id)}
        className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base sm:px-4 ${
            active
                ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-lg shadow-fuchsia-500/20'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
    >
        {label}
    </button>
);

const CaseSelector = ({ selectedCase, setSelectedCase }) => (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 mb-4">
        <h2 className="text-sm text-gray-400 mb-3">Select Case:</h2>
        <div className="flex flex-wrap gap-2">
            {['nominativ', 'akkusativ', 'dativ'].map(caseType => (
                <button
                    key={caseType}
                    onClick={() => setSelectedCase(caseType)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                        selectedCase === caseType
                            ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg shadow-cyan-500/20'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                >
                    {caseType.charAt(0).toUpperCase() + caseType.slice(1)}
                </button>
            ))}
        </div>
    </div>
);

const ArticleTypeSelector = ({ selectedArticleType, setSelectedArticleType }) => (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 mb-4">
        <h2 className="text-sm text-gray-400 mb-3">Select Article Type:</h2>
        <div className="flex flex-wrap gap-2">
            {[
                { id: 'definite_article', label: 'Definite' },
                { id: 'indefinite_article', label: 'Indefinite' },
                { id: 'negative_article', label: 'Negative' },
            ].map(type => (
                <button
                    key={type.id}
                    onClick={() => setSelectedArticleType(type.id)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                        selectedArticleType === type.id
                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                >
                    {type.label}
                </button>
            ))}
        </div>
    </div>
);

const PronounTypeSelector = ({ selectedPronounType, setPronounType }) => (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 mb-4">
        <h2 className="text-sm text-gray-400 mb-3">Select Pronoun Type:</h2>
        <div className="flex flex-wrap gap-2">
            {[
                { id: 'personal_pronouns', label: 'Personal' },
                { id: 'possessive_articles', label: 'Possessive' }
            ].map(type => (
                <button
                    key={type.id}
                    onClick={() => setPronounType(type.id)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                        selectedPronounType === type.id
                            ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/20'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                >
                    {type.label}
                </button>
            ))}
        </div>
    </div>
);

const ArticlesTable = ({ selectedCase, selectedArticleType }) => {
    const data = germanData.articles_and_pronouns[selectedArticleType].cases[selectedCase];
    const examples = germanData.adjective_endings.after_definite_article.examples[selectedCase];

    return (
        <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-violet-500/20">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                    {Object.entries(data).map(([gender, article]) => (
                        <div key={gender} className="bg-gray-900/50 p-3 rounded-lg border border-violet-500/10">
                            <div className="text-gray-400 text-xs sm:text-sm mb-1">{gender}</div>
                            <div className="text-lg sm:text-2xl font-bold text-violet-300">{article}</div>
                        </div>
                    ))}
                </div>
                <ExamplesSection examples={examples} />
            </div>
        </div>
    );
};

const PronounsTable = ({ selectedCase, selectedPronounType }) => {
    if (selectedPronounType === 'personal_pronouns') {
        const data = germanData.articles_and_pronouns.personal_pronouns.cases[selectedCase];
        return (
            <div className="bg-gray-800/50 rounded-lg p-3 border border-pink-500/20">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {Object.entries(data).map(([gender, pronoun]) => (
                        <div key={gender} className="bg-gray-900/50 p-2 rounded-lg border border-pink-500/10">
                            <div className="text-gray-400 text-xs mb-0.5">{gender}</div>
                            <div className="text-base sm:text-lg font-bold text-pink-300">{pronoun}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const possessiveArticles = germanData.articles_and_pronouns.possessive_articles;

    return (
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="grid grid-cols-5 border-b border-gray-700/50">
                <div className="p-4 text-gray-400 font-medium">Possessive</div>
                <div className="p-4 text-gray-400 font-medium">Masculine</div>
                <div className="p-4 text-gray-400 font-medium">Neuter</div>
                <div className="p-4 text-gray-400 font-medium">Feminine</div>
                <div className="p-4 text-gray-400 font-medium">Plural</div>
            </div>

            {Object.entries(possessiveArticles).map(([key, article]) => {
                if (!article?.cases?.[selectedCase]) return null;

                return (
                    <div
                        key={key}
                        className="grid grid-cols-5 border-b border-gray-700/50 last:border-0 hover:bg-gray-800/50 transition-colors group"
                    >
                        <div className="p-4">
                            <span className="text-fuchsia-400 font-medium">{key}</span>
                            <span className="text-gray-500 text-sm ml-2">({article.meaning})</span>
                        </div>
                        <div className="p-4">
                            <span className="text-gray-300 group-hover:text-white transition-colors">
                                {article.cases[selectedCase].masculine}
                            </span>
                        </div>
                        <div className="p-4">
                            <span className="text-gray-300 group-hover:text-white transition-colors">
                                {article.cases[selectedCase].neuter}
                            </span>
                        </div>
                        <div className="p-4">
                            <span className="text-gray-300 group-hover:text-white transition-colors">
                                {article.cases[selectedCase].feminine}
                            </span>
                        </div>
                        <div className="p-4">
                            <span className="text-gray-300 group-hover:text-white transition-colors">
                                {article.cases[selectedCase].plural}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const AdjectiveEndingsTable = ({ selectedCase }) => {
    const types = [
        { id: 'after_definite_article', title: 'After Definite Articles' },
        { id: 'after_indefinite_article', title: 'After Indefinite Articles' },
        { id: 'without_article', title: 'Without Articles' }
    ];

    return (
        <div className="space-y-6">
            {types.map(type => {
                const data = germanData.adjective_endings[type.id].cases[selectedCase];
                const examples = germanData.adjective_endings[type.id].examples[selectedCase];

                return (
                    <div key={type.id} className="bg-gray-800/50 rounded-lg p-4 border border-cyan-500/20">
                        <h3 className="text-lg font-bold text-cyan-300 mb-4">{type.title}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                            {Object.entries(data).map(([gender, ending]) => (
                                <div key={gender} className="bg-gray-900/50 p-3 rounded-lg border border-cyan-500/10">
                                    <div className="text-gray-400 text-xs sm:text-sm mb-1">{gender}</div>
                                    <div className="text-lg sm:text-2xl font-bold text-cyan-300">{ending}</div>
                                </div>
                            ))}
                        </div>
                        <ExamplesSection examples={examples} />
                    </div>
                );
            })}
        </div>
    );
};

const GermanCasesPage = () => {
    const [activeTab, setActiveTab] = useState('articles');
    const [selectedCase, setSelectedCase] = useState('nominativ');
    const [selectedArticleType, setSelectedArticleType] = useState('definite_article');
    const [selectedPronounType, setPronounType] = useState('personal_pronouns');

    return (
        <div className="min-h-screen bg-gray-900 px-4">
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <Book className="w-6 h-6 sm:w-8 sm:h-8 text-fuchsia-400" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400">
                        German Cases
                    </h1>
                </div>
            </div>

            <CaseSelector selectedCase={selectedCase} setSelectedCase={setSelectedCase} />

            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 mb-4">
                <h2 className="text-sm text-gray-400 mb-3">Select Content Type:</h2>
                <div className="flex flex-wrap gap-2">
                    <TabButton
                        id="articles"
                        label="Articles"
                        active={activeTab === 'articles'}
                        onClick={setActiveTab}
                    />
                    <TabButton
                        id="pronouns"
                        label="Pronouns"
                        active={activeTab === 'pronouns'}
                        onClick={setActiveTab}
                    />
                    <TabButton
                        id="adjectives"
                        label="Adjective Endings"
                        active={activeTab === 'adjectives'}
                        onClick={setActiveTab}
                    />
                </div>
            </div>

            <div className="space-y-4">
                {activeTab === 'articles' && (
                    <>
                        <ArticleTypeSelector
                            selectedArticleType={selectedArticleType}
                            setSelectedArticleType={setSelectedArticleType}
                        />
                        <ArticlesTable
                            selectedCase={selectedCase}
                            selectedArticleType={selectedArticleType}
                        />
                    </>
                )}

                {activeTab === 'pronouns' && (
                    <>
                        <PronounTypeSelector
                            selectedPronounType={selectedPronounType}
                            setPronounType={setPronounType}
                        />
                        <PronounsTable
                            selectedCase={selectedCase}
                            selectedPronounType={selectedPronounType}
                        />
                    </>
                )}

                {activeTab === 'adjectives' && (
                    <AdjectiveEndingsTable selectedCase={selectedCase} />
                )}
            </div>
        </div>
    );
};

export default GermanCasesPage;