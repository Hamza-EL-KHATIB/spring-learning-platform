import React, { useState } from 'react';
import { Lock, Database, GitBranch, AlertTriangle, BookOpen, Layers, Shield, Settings } from 'lucide-react';
import transactionsJson from '../../../data/databases/transactions.json';
import CodeBlock from '../../../components/CodeBlock';

const TransactionsPage = () => {
    const [activeTab, setActiveTab] = useState('acid-properties');

    const TabNavigation = () => (
        <div className="mb-8 flex flex-wrap gap-4">
            {transactionsJson.topics.map((topic) => (
                <button
                    key={topic.id}
                    onClick={() => setActiveTab(topic.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeTab === topic.id
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                    }`}
                >
                    {renderTabIcon(topic.id)}
                    {topic.title}
                </button>
            ))}
        </div>
    );

    const renderTabIcon = (id) => {
        switch (id) {
            case 'acid-properties':
                return <Shield className="w-4 h-4" />;
            case 'isolation-levels':
                return <Layers className="w-4 h-4" />;
            case 'spring-transaction-management':
                return <Settings className="w-4 h-4" />;
            case 'transaction-patterns':
                return <Database className="w-4 h-4" />;
            case 'best-practices':
                return <BookOpen className="w-4 h-4" />;
            case 'common-pitfalls':
                return <AlertTriangle className="w-4 h-4" />;
            case 'distributed-transactions':
                return <GitBranch className="w-4 h-4" />;
            default:
                return <Lock className="w-4 h-4" />;
        }
    };

    const renderAcidProperties = (properties) => (
        <div className="space-y-6">
            {properties.map((property, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{property.name}</h3>
                    <p className="text-gray-300 mb-4">{property.description}</p>

                    <div className="space-y-4">
                        <h4 className="text-lg font-medium text-gray-200">Key Points</h4>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            {property.key_points.map((point, pointIdx) => (
                                <li key={pointIdx}>{point}</li>
                            ))}
                        </ul>
                    </div>

                    {property.example && (
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Example: {property.example.scenario}</h4>
                            {property.example.code && <CodeBlock code={property.example.code} />}
                            {property.example.description && (
                                <p className="text-gray-300 mt-2">{property.example.description}</p>
                            )}
                        </div>
                    )}

                    {property.problems && (
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Common Problems</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {property.problems.map((problem, problemIdx) => (
                                    <div key={problemIdx} className="bg-gray-900 rounded p-4">
                                        <h5 className="text-purple-300 font-medium mb-2">{problem.name}</h5>
                                        <p className="text-gray-400">{problem.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderIsolationLevels = (data) => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
                {data.levels.map((level, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-xl font-semibold text-purple-400 mb-3">{level.name}</h3>
                        <p className="text-gray-300 mb-4">{level.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <h4 className="text-lg font-medium text-gray-200 mb-2">Prevents</h4>
                                <ul className="list-disc list-inside text-gray-300">
                                    {level.prevents.length ? level.prevents.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    )) : <li>Nothing</li>}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-gray-200 mb-2">Allows</h4>
                                <ul className="list-disc list-inside text-gray-300">
                                    {level.allows.length ? level.allows.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    )) : <li>Nothing</li>}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-4 p-4 bg-gray-900 rounded">
                            <p className="text-gray-300">{level.usage}</p>
                        </div>
                    </div>
                ))}
            </div>

            {data.usage && (
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">Usage Examples</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Spring</h4>
                            <CodeBlock code={data.usage.spring} />
                        </div>
                        <div>
                            <h4 className="text-lg font-medium text-gray-200 mb-2">JDBC</h4>
                            <CodeBlock code={data.usage.jdbc} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderSpringTransactionManagement = (features) => (
        <div className="space-y-6">
            {features.map((feature, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center gap-2 mb-6">
                        <Settings className="w-6 h-6 text-purple-400" />
                        <h3 className="text-xl font-semibold text-purple-400">{feature.name}</h3>
                    </div>

                    {feature.attributes && (
                        <div className="grid grid-cols-1 gap-6">
                            {feature.attributes.map((attr, attrIdx) => (
                                <div key={attrIdx} className="bg-gray-800/50 rounded-lg border border-gray-700/50">
                                    <div className="p-4 border-b border-gray-700/50">
                                        <h4 className="text-lg font-medium text-purple-300">{attr.name}</h4>
                                        {!attr.values && (
                                            <p className="mt-2 text-gray-400">{attr.description}</p>
                                        )}
                                    </div>

                                    {attr.values && (
                                        <div className="p-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                {attr.values.map((val, valIdx) => (
                                                    <div key={valIdx}
                                                         className="relative bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h5 className="text-purple-300 font-medium">
                                                                {val.name}
                                                            </h5>
                                                            {val.default && (
                                                                <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                                                                Default
                                                            </span>
                                                            )}
                                                        </div>
                                                        <p className="text-gray-400">{val.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {feature.example && (
                        <div className="mt-6 bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                            <h4 className="text-lg font-medium text-purple-300 mb-3">Example Usage</h4>
                            <CodeBlock code={feature.example.code} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderTransactionPatterns = (patterns) => (
        <div className="grid grid-cols-1 gap-6">
            {patterns.map((pattern, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{pattern.name}</h3>
                    <p className="text-gray-300 mb-4">{pattern.description}</p>
                    <div className="bg-gray-900 rounded p-4">
                        <p className="text-gray-400">Implementation: {pattern.implementation}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderBestPractices = (practices) => (
        <div className="space-y-6">
            {practices.map((practice, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{practice.category}</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        {practice.items.map((item, itemIdx) => (
                            <li key={itemIdx}>{item}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );

    const renderCommonPitfalls = (pitfalls) => (
        <div className="grid grid-cols-1 gap-6">
            {pitfalls.map((pitfall, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-xl font-semibold text-purple-400 mb-3">{pitfall.problem}</h3>
                            <p className="text-red-400 mb-2">Impact: {pitfall.impact}</p>
                            <p className="text-green-400">Solution: {pitfall.solution}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderDistributedTransactions = (concepts) => (
        <div className="space-y-6">
            {concepts.map((concept, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{concept.name}</h3>
                    <p className="text-gray-300 mb-4">{concept.description}</p>

                    {concept.phases && (
                        <div className="space-y-2">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Phases</h4>
                            <ul className="list-disc list-inside text-gray-300">
                                {concept.phases.map((phase, phaseIdx) => (
                                    <li key={phaseIdx}>{phase}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {concept.patterns && (
                        <div className="space-y-2">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Patterns</h4>
                            <ul className="list-disc list-inside text-gray-300">
                                {concept.patterns.map((pattern, patternIdx) => (
                                    <li key={patternIdx}>{pattern}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderContent = () => {
        const topic = transactionsJson.topics.find(t => t.id === activeTab);
        if (!topic) return null;

        switch (activeTab) {
            case 'acid-properties':
                return renderAcidProperties(topic.properties);
            case 'isolation-levels':
                return renderIsolationLevels(topic);
            case 'spring-transaction-management':
                return renderSpringTransactionManagement(topic.features);
            case 'transaction-patterns':
                return renderTransactionPatterns(topic.patterns);
            case 'best-practices':
                return renderBestPractices(topic.practices);
            case 'common-pitfalls':
                return renderCommonPitfalls(topic.pitfalls);
            case 'distributed-transactions':
                return renderDistributedTransactions(topic.concepts);
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{transactionsJson.title}</h1>
            </div>

            {/* Navigation */}
            <TabNavigation />

            {/* Content */}
            <div className="space-y-8">{renderContent()}</div>
        </div>
    );
};

export default TransactionsPage;