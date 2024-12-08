import React, { useState } from 'react';
import { Book, Info, Table, ClipboardCheck } from 'lucide-react';
import cases from '../../../data/german/cases.json';

const CasesPage = () => {
    const [activeCase, setActiveCase] = useState('nominativ');
    const [activeTab, setActiveTab] = useState('introduction'); // tabs: introduction, cases, twoWayPrepositions, memoryAids

    // Component for rendering verb and preposition lists
    const TriggerList = ({ items, type }) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {items.map((item, idx) => (
                <div key={idx} className="bg-gray-800/50 rounded px-3 py-2 flex items-center justify-between">
                    <span className="text-purple-300">{item[type]}</span>
                    <span className="text-gray-400 text-sm">{item.meaning}</span>
                </div>
            ))}
        </div>
    );

    // Component for rendering examples
    const Examples = ({ examples }) => (
        <div className="space-y-4">
            {examples.map((example, idx) => (
                <div key={idx} className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-lg text-white mb-2">{example.german}</p>
                    <p className="text-gray-300 mb-2">{example.english}</p>
                    <p className="text-sm text-gray-400">{example.explanation}</p>
                </div>
            ))}
        </div>
    );

    // Tabs configuration
    const tabs = [
        { key: 'introduction', label: 'Introduction', icon: Info },
        { key: 'cases', label: 'Cases', icon: Book },
        { key: 'twoWayPrepositions', label: 'Two-Way Prepositions', icon: Table },
        { key: 'memoryAids', label: 'Memory Aids', icon: ClipboardCheck }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Title */}
                <h1 className="text-3xl font-bold mb-8">German Cases (Fälle)</h1>

                {/* Tabs Navigation */}
                <div className="flex space-x-2 border-b border-gray-800 pb-2 mb-6">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-t-md font-medium transition-colors ${
                                    activeTab === tab.key
                                        ? 'bg-gray-800 text-white border border-gray-700 border-b-0'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                <Icon className="w-5 h-5 text-purple-400" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                {activeTab === 'introduction' && (
                    <div className="p-6 bg-gray-800/50 rounded-lg space-y-6">
                        <p className="text-gray-300">{cases.introduction.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {cases.introduction.key_questions.map((item, idx) => (
                                <div key={idx} className="bg-gray-800 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold text-purple-400 mb-2">{item.case}</h3>
                                    <ul className="list-disc list-inside text-gray-300">
                                        {item.questions.map((q, qIdx) => (
                                            <li key={qIdx}>{q}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'cases' && (
                    <div className="space-y-4">
                        {/* Case Selection Tabs */}
                        <div className="flex space-x-2 mb-4">
                            {Object.keys(cases.cases).map((caseKey) => (
                                <button
                                    key={caseKey}
                                    onClick={() => setActiveCase(caseKey)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        activeCase === caseKey
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                                >
                                    {cases.cases[caseKey].name}
                                </button>
                            ))}
                        </div>

                        {/* Active Case Content */}
                        <div className="bg-gray-800/50 rounded-lg p-6 space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">{cases.cases[activeCase].name}</h3>
                                <p className="text-gray-300">{cases.cases[activeCase].definition}</p>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold mb-3">Usage</h4>
                                <ul className="list-disc list-inside space-y-2">
                                    {cases.cases[activeCase].usage.map((use, idx) => (
                                        <li key={idx} className="text-gray-300">{use}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Verbs */}
                            {cases.cases[activeCase].common_triggers.verbs.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-semibold mb-3">Common Verbs</h4>
                                    <TriggerList items={cases.cases[activeCase].common_triggers.verbs} type="verb" />
                                </div>
                            )}

                            {/* Prepositions */}
                            {cases.cases[activeCase].common_triggers.prepositions.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-semibold mb-3">Common Prepositions</h4>
                                    <TriggerList items={cases.cases[activeCase].common_triggers.prepositions} type="preposition" />
                                </div>
                            )}

                            {/* Examples */}
                            <div>
                                <h4 className="text-lg font-semibold mb-3">Examples</h4>
                                <Examples examples={cases.cases[activeCase].examples} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'twoWayPrepositions' && (
                    <div className="bg-gray-800/50 rounded-lg p-6 space-y-6">
                        <p className="text-gray-300">{cases.two_way_prepositions.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <h4 className="font-medium text-purple-400 mb-2">Akkusativ (Motion)</h4>
                                <p className="text-gray-300 text-sm">{cases.two_way_prepositions.rule.motion_akkusativ}</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <h4 className="font-medium text-purple-400 mb-2">Dativ (Location)</h4>
                                <p className="text-gray-300 text-sm">{cases.two_way_prepositions.rule.location_dativ}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {cases.two_way_prepositions.list.map((prep, idx) => (
                                <div key={idx} className="bg-gray-800 p-3 rounded-lg">
                                    <p className="text-purple-400 font-medium">{prep.preposition}</p>
                                    <p className="text-gray-400 text-sm">{prep.meaning}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'memoryAids' && (
                    <div className="bg-gray-800/50 rounded-lg p-6 space-y-6">
                        <div>
                            <h4 className="text-lg font-semibold mb-3">Logic</h4>
                            <ul className="list-disc list-inside space-y-2">
                                {cases.memory_aids.logic.map((item, idx) => (
                                    <li key={idx} className="text-gray-300">{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-3">Quick Tests</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {cases.memory_aids.quick_tests.map((test, idx) => (
                                    <div key={idx} className="bg-gray-800 p-4 rounded-lg">
                                        <h5 className="text-purple-400 font-medium mb-2">{test.name}</h5>
                                        <p className="text-gray-300 text-sm">{test.hint}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CasesPage;
