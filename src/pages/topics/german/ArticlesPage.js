import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import articlesJson from '../../../data/german/articles.json';

const ArticlesPage = () => {
    const [expandedPossessive, setExpandedPossessive] = useState(null);
    const [activeTab, setActiveTab] = useState('definite_article');

    const articleTypes = [
        { id: 'definite_article', title: 'Definite Articles' },
        { id: 'indefinite_article', title: 'Indefinite Articles' },
        { id: 'negative_article', title: 'Negative Articles' },
        { id: 'personal_pronouns', title: 'Personal Pronouns' },
        { id: 'possessive_articles', title: 'Possessive Articles' },
    ];

    const togglePossessive = (type) => {
        setExpandedPossessive(expandedPossessive === type ? null : type);
    };

    const renderPersonalPronounTable = (cases) => {
        const persons = [
            "first_singular", "second_singular", "third_masculine", "third_neuter",
            "third_feminine", "first_plural", "second_plural", "third_plural", "second_formal"
        ];

        return (
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                    <tr>
                        <th className="text-left p-2 text-gray-400">Person</th>
                        <th className="text-left p-2 text-gray-400">Nominativ</th>
                        <th className="text-left p-2 text-gray-400">Akkusativ</th>
                        <th className="text-left p-2 text-gray-400">Dativ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {persons.map((person) => (
                        <tr key={person} className="border-t border-gray-800">
                            <td className="p-2 text-gray-300 font-medium">
                                {person.replace(/_/g, ' ')}
                            </td>
                            <td className="p-2 text-blue-300">
                                <div>{cases.nominativ[person].pronoun}</div>
                                <div className="text-gray-400 text-xs">{cases.nominativ[person].meaning}</div>
                            </td>
                            <td className="p-2 text-blue-300">
                                <div>{cases.akkusativ[person].pronoun}</div>
                                <div className="text-gray-400 text-xs">{cases.akkusativ[person].meaning}</div>
                            </td>
                            <td className="p-2 text-blue-300">
                                <div>{cases.dativ[person].pronoun}</div>
                                <div className="text-gray-400 text-xs">{cases.dativ[person].meaning}</div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderCaseTable = (cases) => (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                <tr>
                    <th className="text-left p-2 text-gray-400">Case</th>
                    <th className="text-left p-2 text-blue-400">Masculine</th>
                    <th className="text-left p-2 text-green-400">Neuter</th>
                    <th className="text-left p-2 text-pink-400">Feminine</th>
                    <th className="text-left p-2 text-purple-400">Plural</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(cases).map(([caseType, forms]) => (
                    <tr key={caseType} className="border-t border-gray-800">
                        <td className="p-2 text-gray-300 font-medium capitalize">{caseType}</td>
                        <td className="p-2 text-blue-300">{forms.masculine}</td>
                        <td className="p-2 text-green-300">{forms.neuter}</td>
                        <td className="p-2 text-pink-300">{forms.feminine}</td>
                        <td className="p-2 text-purple-300">{forms.plural || "-"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

    const renderExamples = (examples) => (
        <div className="space-y-3 mt-4">
            {Object.entries(examples).map(([caseType, example]) => (
                <div key={caseType} className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-sm text-gray-400 mb-1 capitalize">{caseType}</div>
                    <div className="text-white font-medium">{example.german}</div>
                    <div className="text-gray-400 text-sm">{example.english}</div>
                </div>
            ))}
        </div>
    );

    const renderPossessiveArticle = (type, data) => {
        const isExpanded = expandedPossessive === type;
        return (
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <button
                    onClick={() => togglePossessive(type)}
                    className="w-full flex items-center justify-between text-left"
                >
                    <div>
                        <h3 className="text-lg font-semibold text-white">{type}</h3>
                        <p className="text-gray-400 text-sm">{data.meaning}</p>
                    </div>
                    {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                </button>

                {isExpanded && (
                    <div className="mt-4 space-y-4">
                        {data.usage_hints && (
                            <div>
                                <h4 className="text-md font-medium text-gray-300 mb-2">Usage Hints</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    {data.usage_hints.map((hint, index) => (
                                        <li key={index} className="text-gray-400 text-sm">{hint}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {data.cases && (
                            <div>
                                <h4 className="text-md font-medium text-gray-300 mb-2">Cases</h4>
                                {renderCaseTable(data.cases)}
                            </div>
                        )}

                        {data.examples && (
                            <div>
                                <h4 className="text-md font-medium text-gray-300 mb-2">Examples</h4>
                                {renderExamples(data.examples)}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const renderPossessiveSummaryTable = (data) => {
        const pronouns = [
            { pronoun: 'ich', type: 'singular' },
            { pronoun: 'du', type: 'singular' },
            { pronoun: 'er/es', type: 'singular' },
            { pronoun: 'sie', type: 'singular' },
            { pronoun: 'wir', type: 'plural' },
            { pronoun: 'ihr', type: 'plural' },
            { pronoun: 'sie/Sie', type: 'plural' }
        ];

        const getPossessiveForm = (pronoun, caseType, gender) => {
            const forms = {
                'ich': data.singular_possessors.first_person.ich?.cases,
                'du': data.singular_possessors.second_person.du?.cases,
                'er/es': data.singular_possessors.third_person.er_es?.cases,
                'sie': data.singular_possessors.third_person.sie?.cases,
                'wir': data.plural_possessors.first_person.wir?.cases,
                'ihr': data.plural_possessors.second_person.ihr?.cases,
                'sie/Sie': data.formal.Sie?.cases
            };

            return forms[pronoun]?.[caseType]?.[gender] || '-';
        };

        return (
            <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm">
                    <thead>
                    <tr>
                        <th className="text-left p-2 bg-gray-800/50 text-gray-300">Person</th>
                        <th className="text-center p-2 bg-gray-800/50 text-gray-300">Case</th>
                        <th className="text-center p-2 bg-gray-800/50 text-blue-300">Maskulinum</th>
                        <th className="text-center p-2 bg-gray-800/50 text-green-300">Neutrum</th>
                        <th className="text-center p-2 bg-gray-800/50 text-pink-300">Femininum</th>
                        <th className="text-center p-2 bg-gray-800/50 text-purple-300">Plural</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pronouns.map((p, pIdx) => (
                        ['nominativ', 'akkusativ', 'dativ'].map((caseType, caseIdx) => (
                            <tr
                                key={`${p.pronoun}-${caseType}`}
                                className={`
                                ${caseIdx === 2 && pIdx !== pronouns.length - 1 ? 'border-b-2 border-b-gray-600 border-dashed' : ''}
                                ${caseIdx === 0 ? 'border-t border-gray-800' : ''}
                                ${pIdx % 2 === 0 ? 'bg-gray-800/20' : 'bg-gray-800/10'}
                            `}
                            >
                                {caseIdx === 0 && (
                                    <td rowSpan="3" className="text-gray-300 p-2 font-medium">
                                        {p.pronoun}
                                    </td>
                                )}
                                <td className="text-gray-300 p-2 capitalize font-medium">{caseType}</td>
                                <td className="text-blue-300 p-2 text-center">{getPossessiveForm(p.pronoun, caseType, 'masculine')}</td>
                                <td className="text-green-300 p-2 text-center">{getPossessiveForm(p.pronoun, caseType, 'neuter')}</td>
                                <td className="text-pink-300 p-2 text-center">{getPossessiveForm(p.pronoun, caseType, 'feminine')}</td>
                                <td className="text-purple-300 p-2 text-center">{getPossessiveForm(p.pronoun, caseType, 'plural')}</td>
                            </tr>
                        ))
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderPossessives = (data) => {
        return (
            <div className="space-y-6">
                {/* Summary Table */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Overview</h3>
                    {renderPossessiveSummaryTable(data)}
                </div>

                <div className="border-t border-gray-700 pt-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Detailed Examples</h3>

                    {/* Singular Possessors */}
                    <div className="mb-6">
                        <h4 className="text-lg font-medium text-gray-300 mb-4">Singular Possessors</h4>
                        <div className="space-y-4">
                            {Object.entries(data.singular_possessors).map(([person, possessives]) => (
                                <div key={person} className="space-y-2">
                                    <h5 className="text-md font-medium text-gray-400 capitalize mb-2">
                                        {person.replace(/_/g, ' ')}
                                    </h5>
                                    {Object.entries(possessives).map(([type, data]) =>
                                        renderPossessiveArticle(type, data)
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Plural Possessors */}
                    <div className="mb-6">
                        <h4 className="text-lg font-medium text-gray-300 mb-4">Plural Possessors</h4>
                        <div className="space-y-4">
                            {Object.entries(data.plural_possessors).map(([person, possessives]) => (
                                <div key={person} className="space-y-2">
                                    <h5 className="text-md font-medium text-gray-400 capitalize mb-2">
                                        {person.replace(/_/g, ' ')}
                                    </h5>
                                    {Object.entries(possessives).map(([type, data]) =>
                                        renderPossessiveArticle(type, data)
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Formal */}
                    <div>
                        <h4 className="text-lg font-medium text-gray-300 mb-4">Formal</h4>
                        <div className="space-y-4">
                            {Object.entries(data.formal).map(([type, data]) =>
                                renderPossessiveArticle(type, data)
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderArticleContent = (key, data) => (
        <div className="mt-6 space-y-6">
            {data.usage_hints && (
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-300">Usage Hints</h3>
                    <ul className="list-disc list-inside space-y-1">
                        {data.usage_hints.map((hint, index) => (
                            <li key={index} className="text-gray-400">{hint}</li>
                        ))}
                    </ul>
                </div>
            )}

            {key === 'possessive_articles' ? (
                renderPossessives(data)
            ) : (
                <>
                    {data.cases && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-4">Cases</h3>
                            {key === 'personal_pronouns' ?
                                renderPersonalPronounTable(data.cases) :
                                renderCaseTable(data.cases)}
                        </div>
                    )}

                    {data.examples && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-2">Examples</h3>
                            {renderExamples(data.examples)}
                        </div>
                    )}
                </>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Title Section */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white">German Articles</h1>
                        <p className="text-gray-400 mt-2">
                            Learn about German articles and their various forms across different cases
                        </p>
                    </div>

                    {/* Main Card with Tabs */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700">
                        {/* Tabs */}
                        <div className="flex overflow-x-auto border-b border-gray-700">
                            {articleTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setActiveTab(type.id)}
                                    className={`px-4 py-3 whitespace-nowrap font-medium transition-colors ${
                                        activeTab === type.id
                                            ? 'text-purple-400 border-b-2 border-purple-400'
                                            : 'text-gray-400 hover:text-gray-300'
                                    }`}
                                >
                                    {type.title}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {Object.entries(articlesJson).map(([key, data]) =>
                                    activeTab === key && (
                                        <div key={key}>
                                            <p className="text-gray-400">{data.description}</p>
                                            {renderArticleContent(key, data)}
                                        </div>
                                    )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticlesPage;