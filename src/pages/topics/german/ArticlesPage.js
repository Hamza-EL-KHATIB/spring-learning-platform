import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import articlesJson from '../../../data/german/articles.json';

const ArticlesPage = () => {
    const [expandedPossessive, setExpandedPossessive] = useState(null);
    const [activeTab, setActiveTab] = useState('definite_article');
    const [possessiveView, setPossessiveView] = useState('overview');
    const [possessivePronounsView, setPossessivePronounsView] = useState('overview');
    const [expandedPronoun, setExpandedPronoun] = useState(null);

    const articleTypes = [
        { id: 'definite_article', title: 'Definite Articles' },
        { id: 'indefinite_article', title: 'Indefinite Articles' },
        { id: 'negative_article', title: 'Negative Articles' },
        { id: 'personal_pronouns', title: 'Personal Pronouns' },
        { id: 'possessive_articles', title: 'Possessive Articles' },
        { id: 'possessive_pronouns', title: 'Possessive Pronouns' },
        { id: 'endings_pattern', title: 'Endings Pattern' }
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

        const cases = ['nominativ', 'akkusativ', 'dativ'];

        return (
            <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                    <thead>
                    <tr className="bg-gray-800/50">
                        <th className="text-left p-2 text-gray-300">Person</th>
                        <th className="text-center p-2 text-gray-300">Case</th>
                        <th className="text-center p-2 text-blue-300">Masculine</th>
                        <th className="text-center p-2 text-green-300">Neuter</th>
                        <th className="text-center p-2 text-pink-300">Feminine</th>
                        <th className="text-center p-2 text-purple-300">Plural</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pronouns.map((p, pIndex) => (
                        <React.Fragment key={p.pronoun}>
                            {/* Header row for each pronoun block */}
                            <tr className="bg-gray-800">
                                <td colSpan={6} className="p-2 text-white font-semibold">
                                    {p.pronoun}
                                </td>
                            </tr>
                            {cases.map((caseType) => (
                                <tr key={`${p.pronoun}-${caseType}`} className="border-t border-gray-800">
                                    <td className="text-gray-300 p-2 capitalize bg-gray-800/30">
                                        {/* We leave this cell blank since we already have a header for the pronoun */}
                                    </td>
                                    <td className="text-gray-300 p-2 capitalize">{caseType}</td>
                                    <td className="text-blue-300 p-2 text-center">
                                        {getPossessiveForm(p.pronoun, caseType, 'masculine')}
                                    </td>
                                    <td className="text-green-300 p-2 text-center">
                                        {getPossessiveForm(p.pronoun, caseType, 'neuter')}
                                    </td>
                                    <td className="text-pink-300 p-2 text-center">
                                        {getPossessiveForm(p.pronoun, caseType, 'feminine')}
                                    </td>
                                    <td className="text-purple-300 p-2 text-center">
                                        {getPossessiveForm(p.pronoun, caseType, 'plural')}
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderPossessives = (data) => {
        return (
            <div className="space-y-6">
                <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-300 mb-4">Singular Possessors</h4>
                    <div className="space-y-4">
                        {Object.entries(data.singular_possessors).map(([person, possessives]) => (
                            <div key={person} className="space-y-2">
                                <h5 className="text-md font-medium text-gray-400 capitalize mb-2">
                                    {person.replace(/_/g, ' ')}
                                </h5>
                                {Object.entries(possessives).map(([type, d]) =>
                                    renderPossessiveArticle(type, d)
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-300 mb-4">Plural Possessors</h4>
                    <div className="space-y-4">
                        {Object.entries(data.plural_possessors).map(([person, possessives]) => (
                            <div key={person} className="space-y-2">
                                <h5 className="text-md font-medium text-gray-400 capitalize mb-2">
                                    {person.replace(/_/g, ' ')}
                                </h5>
                                {Object.entries(possessives).map(([type, d]) =>
                                    renderPossessiveArticle(type, d)
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-medium text-gray-300 mb-4">Formal</h4>
                    <div className="space-y-4">
                        {Object.entries(data.formal).map(([type, d]) =>
                            renderPossessiveArticle(type, d)
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderPossessivePronounsSummaryTable = (data) => {
        const { forms } = data;
        if (!forms) {
            return <p className="text-gray-400">No forms available for possessive pronouns.</p>;
        }

        // We will show a table where each pronoun has a block of rows for each case.
        // Columns: Owner, Case, Masculine, Neuter, Feminine, Plural
        const cases = ["nominativ", "akkusativ", "dativ"];

        return (
            <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                    <thead>
                    <tr className="bg-gray-800/50">
                        <th className="p-2 text-gray-300 text-left">Pronoun</th>
                        <th className="p-2 text-gray-300 text-left">Case</th>
                        <th className="p-2 text-blue-300 text-left">Masculine</th>
                        <th className="p-2 text-green-300 text-left">Neuter</th>
                        <th className="p-2 text-pink-300 text-left">Feminine</th>
                        <th className="p-2 text-purple-300 text-left">Plural</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.entries(forms).map(([key, pronounData]) => (
                        <React.Fragment key={key}>
                            {/* A header row for the pronoun */}
                            <tr className="bg-gray-800">
                                <td colSpan={6} className="p-2 text-white font-semibold">
                                    {pronounData.meaning} ({pronounData.owner})
                                </td>
                            </tr>
                            {cases.map((caseType) => {
                                const caseForms = pronounData.cases[caseType];
                                return (
                                    <tr key={caseType} className="border-t border-gray-800">
                                        <td className="p-2 text-gray-300 font-medium bg-gray-800/30">
                                            {/* blank since we have the pronoun name above */}
                                        </td>
                                        <td className="p-2 text-gray-300 capitalize">{caseType}</td>
                                        <td className="p-2 text-blue-300">{caseForms.masculine}</td>
                                        <td className="p-2 text-green-300">{caseForms.neuter}</td>
                                        <td className="p-2 text-pink-300">{caseForms.feminine}</td>
                                        <td className="p-2 text-purple-300">{caseForms.plural}</td>
                                    </tr>
                                );
                            })}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderPossessivePronounsDetailed = (data, expandedPronoun, setExpandedPronoun) => {
        const { forms } = data;
        if (!forms) {
            return <p className="text-gray-400">No forms available for possessive pronouns.</p>;
        }

        const togglePronoun = (key) => {
            setExpandedPronoun(expandedPronoun === key ? null : key);
        };

        const cases = ["nominativ", "akkusativ", "dativ"];

        return (
            <div className="space-y-6">
                {Object.entries(forms).map(([key, pronounData]) => {
                    const isExpanded = expandedPronoun === key;
                    return (
                        <div className="bg-gray-800/50 rounded-lg p-4" key={key}>
                            <button
                                onClick={() => togglePronoun(key)}
                                className="w-full flex items-center justify-between text-left"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        {pronounData.meaning} ({pronounData.owner})
                                    </h3>
                                    <p className="text-gray-400 text-sm">Possessive Pronoun</p>
                                </div>
                                {isExpanded ? (
                                    <ChevronUp className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                            </button>

                            {isExpanded && (
                                <div className="mt-4 space-y-4">
                                    <div>
                                        <h4 className="text-md font-medium text-gray-300 mb-2">Cases</h4>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm border-collapse">
                                                <thead>
                                                <tr className="bg-gray-800/50">
                                                    <th className="p-2 text-gray-300 text-left">Case</th>
                                                    <th className="p-2 text-blue-300 text-left">Masculine</th>
                                                    <th className="p-2 text-green-300 text-left">Neuter</th>
                                                    <th className="p-2 text-pink-300 text-left">Feminine</th>
                                                    <th className="p-2 text-purple-300 text-left">Plural</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {cases.map((caseType) => {
                                                    const caseForms = pronounData.cases[caseType];
                                                    return (
                                                        <tr key={caseType} className="border-t border-gray-800">
                                                            <td className="p-2 text-gray-300 font-medium capitalize bg-gray-800/30">
                                                                {caseType}
                                                            </td>
                                                            <td className="p-2 text-blue-300">{caseForms.masculine}</td>
                                                            <td className="p-2 text-green-300">{caseForms.neuter}</td>
                                                            <td className="p-2 text-pink-300">{caseForms.feminine}</td>
                                                            <td className="p-2 text-purple-300">{caseForms.plural}</td>
                                                        </tr>
                                                    );
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/* Add any examples or additional info here if available */}
                                </div>
                            )}
                        </div>
                    );
                })}
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

            {/* Check if it's possessive pronouns and render similar UI as possessive articles */}
            {key === 'possessive_pronouns' ? (
                <div>
                    <div className="mb-6 border-b border-gray-700 flex">
                        <button
                            onClick={() => setPossessivePronounsView('overview')}
                            className={`px-4 py-2 font-medium ${possessivePronounsView === 'overview' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setPossessivePronounsView('detailed')}
                            className={`px-4 py-2 font-medium ${possessivePronounsView === 'detailed' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
                        >
                            Detailed Examples
                        </button>
                    </div>
                    {possessivePronounsView === 'overview'
                        ? renderPossessivePronounsSummaryTable(data)
                        : renderPossessivePronounsDetailed(data, expandedPronoun, setExpandedPronoun)
                    }

                </div>
            ) : key === 'possessive_articles' ? (
                <div>
                    <div className="mb-6 border-b border-gray-700 flex">
                        <button
                            onClick={() => setPossessiveView('overview')}
                            className={`px-4 py-2 font-medium ${possessiveView === 'overview' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setPossessiveView('detailed')}
                            className={`px-4 py-2 font-medium ${possessiveView === 'detailed' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
                        >
                            Detailed Examples
                        </button>
                    </div>
                    {possessiveView === 'overview' ? renderPossessiveSummaryTable(data) : renderPossessives(data)}
                </div>
            ) : (
                <>
                    {data.cases && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-4">Cases</h3>
                            {key === 'personal_pronouns'
                                ? renderPersonalPronounTable(data.cases)
                                : renderCaseTable(data.cases)}
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

    const renderDefiniteArticlesPattern = (pattern) => {
        const genders = Object.keys(pattern.patterns);
        const cases = ["nominativ", "akkusativ", "dativ"];

        return (
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 space-y-4">
                <h3 className="text-lg font-bold text-white">Definite Articles Pattern</h3>
                {pattern.description && <p className="text-gray-400 text-sm">{pattern.description}</p>}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                        <tr className="bg-gray-800/50">
                            <th className="p-2 text-gray-300 text-left">Case</th>
                            {genders.map(g => (
                                <th key={g} className="p-2 text-gray-300 text-left capitalize">{g}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {cases.map(c => (
                            <tr key={c} className="border-t border-gray-800">
                                <td className="p-2 text-gray-300 font-medium capitalize bg-gray-800/30">{c}</td>
                                {genders.map(g => {
                                    const form = pattern.patterns[g][c];
                                    return (
                                        <td key={g} className="p-2 text-gray-200">{form}</td>
                                    );
                                })}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderEinWordPattern = (pattern) => {
        const genders = Object.keys(pattern.patterns);
        const cases = ["nominativ", "akkusativ", "dativ"];

        return (
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 space-y-4">
                <h3 className="text-lg font-bold text-white">Ein-Word Pattern</h3>
                {pattern.description && <p className="text-gray-400 text-sm">{pattern.description}</p>}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                        <tr className="bg-gray-800/50">
                            <th className="p-2 text-gray-300 text-left">Case</th>
                            {genders.map(g => (
                                <th key={g} className="p-2 text-gray-300 text-left capitalize">{g}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {cases.map(c => (
                            <tr key={c} className="border-t border-gray-800">
                                <td className="p-2 text-gray-300 font-medium capitalize bg-gray-800/30">{c}</td>
                                {genders.map(g => {
                                    const forms = pattern.patterns[g];
                                    const form = forms[c];
                                    const note = g === "plural" && forms.note ?
                                        <div className="text-xs text-gray-500 italic">{forms.note}</div> : null;
                                    return (
                                        <td key={g} className="p-2 text-gray-200 align-top">
                                            {form}
                                            {note}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderSummarizedEndingsReference = (ref) => (
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 space-y-4">
            <h3 className="text-lg font-bold text-white">Summarized Endings Reference</h3>
            {ref.description && <p className="text-gray-400 text-sm">{ref.description}</p>}
            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                    <tr className="bg-gray-800/50">
                        <th className="p-2 text-gray-300 text-left">Ending</th>
                        <th className="p-2 text-gray-300 text-left">Usage</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ref.common_endings.map((ending, idx) => (
                        <tr key={idx} className="border-t border-gray-800">
                            <td className="p-2 text-gray-300 font-medium">{ending.ending}</td>
                            <td className="p-2 text-gray-400">{ending.usage}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderEndingsPattern = (data) => (
        <div className="mt-6 space-y-6">
            {data.definite_articles_pattern && renderDefiniteArticlesPattern(data.definite_articles_pattern)}
            {data.ein_word_pattern && renderEinWordPattern(data.ein_word_pattern)}
            {data.summarized_endings_reference && renderSummarizedEndingsReference(data.summarized_endings_reference)}
        </div>
    );

    return (
        <>
            <style>
                {`
                    .tabs-container::-webkit-scrollbar {
                        display: none;
                    }
                    .tabs-container {
                        -ms-overflow-style: none; 
                        scrollbar-width: none; 
                    }
                `}
            </style>

            <div className="min-h-screen bg-gray-900">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-white">German Articles</h1>
                            <p className="text-gray-400 mt-2">
                                Learn about German articles and their various forms, endings, and usage.
                            </p>
                        </div>

                        <div className="bg-gray-800/50 rounded-xl border border-gray-700">
                            <div className="flex overflow-x-auto border-b border-gray-700 tabs-container">
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

                            <div className="p-6 text-sm sm:text-base">
                                {activeTab !== 'endings_pattern' && Object.entries(articlesJson).map(([key, data]) =>
                                        activeTab === key && (
                                            <div key={key}>
                                                <p className="text-gray-400">{data.description}</p>
                                                {renderArticleContent(key, data)}
                                            </div>
                                        )
                                )}

                                {activeTab === 'endings_pattern' && articlesJson.endings_pattern && (
                                    renderEndingsPattern(articlesJson.endings_pattern)
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArticlesPage;
