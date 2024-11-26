import React, { useState } from 'react';
import hibernateJson from '../../../data/databases/hibernate.json';
import CodeBlock from '../../../components/CodeBlock';

const HibernatePage = () => {
    const [activeTab, setActiveTab] = useState('core-concepts');

    const TabNavigation = () => (
        <div className="mb-8 flex flex-wrap gap-4">
            {hibernateJson.topics.map((topic) => (
                <button
                    key={topic.id}
                    onClick={() => setActiveTab(topic.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeTab === topic.id
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                    }`}
                >
                    {topic.title}
                </button>
            ))}
        </div>
    );

    const renderConcepts = (concepts) => (
        <div className="space-y-6">
            {concepts.map((concept, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{concept.name}</h3>
                    <p className="text-gray-300 mb-4">{concept.description}</p>

                    {concept.operations && (
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Operations</h4>
                            {concept.operations.map((op, opIdx) => (
                                <div key={opIdx} className="bg-gray-900 rounded p-4">
                                    <h5 className="text-purple-300 font-medium mb-2">{op.name}</h5>
                                    <p className="text-gray-400 mb-2">{op.description}</p>
                                    <CodeBlock code={op.example} />
                                </div>
                            ))}
                        </div>
                    )}

                    {concept.features && (
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Features</h4>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                {concept.features.map((feature, fIdx) => (
                                    <li key={fIdx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {concept.characteristics && (
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Characteristics</h4>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                {concept.characteristics.map((char, cIdx) => (
                                    <li key={cIdx}>{char}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderStates = (states) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {states.map((state, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{state.name}</h3>
                    <p className="text-gray-300 mb-4">{state.description}</p>
                    <div className="space-y-1">
                        {state.characteristics.map((char, charIdx) => (
                            <div key={charIdx} className="flex items-center text-gray-300">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                {char}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderMappingAnnotations = (annotations) => (
        <div className="space-y-8">
            {annotations.map((category, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{category.category}</h3>
                    <div className="space-y-4">
                        {category.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="bg-gray-900 rounded-lg p-4">
                                <h4 className="text-lg font-medium text-purple-300 mb-2">{item.name}</h4>
                                <p className="text-gray-300 mb-3">{item.description}</p>
                                <CodeBlock code={item.example} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderCachingLevels = (levels) => (
        <div className="space-y-6">
            {levels.map((level, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{level.name}</h3>
                    <p className="text-gray-300 mb-4">{level.description}</p>

                    {level.characteristics && (
                        <div className="mb-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Characteristics</h4>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                {level.characteristics.map((char, charIdx) => (
                                    <li key={charIdx}>{char}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {level.providers && (
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Providers</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {level.providers.map((provider, pIdx) => (
                                    <div key={pIdx} className="bg-gray-900 rounded p-4">
                                        <h5 className="text-purple-300 font-medium mb-1">{provider.name}</h5>
                                        <p className="text-gray-400">{provider.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {level.configuration && (
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Configuration</h4>
                            <div className="bg-gray-900 rounded p-4">
                                <p className="text-gray-300 mb-2">Property: <code className="text-purple-300">{level.configuration.property}</code></p>
                                <p className="text-gray-300">Usage: <code className="text-purple-300">{level.configuration.usage}</code></p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
    const renderFetchingStrategies = (strategies) => (
        <div className="space-y-8">
            {strategies.map((strategy, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{strategy.type}</h3>
                    {strategy.options.map((option, optIdx) => (
                        <div key={optIdx} className="bg-gray-900 rounded p-4 mb-4">
                            <h4 className="text-lg font-medium text-purple-300">{option.name}</h4>
                            <p className="text-gray-300">{option.description}</p>
                            {option.characteristics && (
                                <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
                                    {option.characteristics.map((char, charIdx) => (
                                        <li key={charIdx}>{char}</li>
                                    ))}
                                </ul>
                            )}
                            {option.example && (
                                <CodeBlock code={option.example.code} />
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

    const renderQueryMethods = (methods) => (
        <div className="space-y-6">
            {methods.map((method, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{method.name}</h3>
                    <p className="text-gray-300 mb-4">{method.description}</p>
                    {method.example && <CodeBlock code={method.example.code} />}
                </div>
            ))}
        </div>
    );

    const renderPerformanceOptimization = (techniques) => (
        <div className="space-y-8">
            {techniques.map((technique, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{technique.category}</h3>
                    {technique.methods && (
                        <div className="space-y-4">
                            {technique.methods.map((method, methodIdx) => (
                                <div key={methodIdx} className="bg-gray-900 rounded p-4">
                                    <h4 className="text-lg font-medium text-purple-300 mb-2">{method.name}</h4>
                                    <CodeBlock code={method.example} />
                                </div>
                            ))}
                        </div>
                    )}
                    {technique.recommendations && (
                        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-4">
                            {technique.recommendations.map((rec, recIdx) => (
                                <li key={recIdx}>{rec}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );

    const renderBestPractices = (categories) => (
        <div className="space-y-8">
            {categories.map((category, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{category.name}</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {category.practices.map((practice, pIdx) => (
                            <li key={pIdx}>{practice}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );

    const renderContent = () => {
        const topic = hibernateJson.topics.find(t => t.id === activeTab);
        if (!topic) return null;

        switch (activeTab) {
            case 'core-concepts':
                return renderConcepts(topic.concepts);
            case 'entity-lifecycle':
                return renderStates(topic.states);
            case 'mapping-annotations':
                return renderMappingAnnotations(topic.annotations);
            case 'caching':
                return renderCachingLevels(topic.levels);
            case 'fetching-strategies':
                return renderFetchingStrategies(topic.strategies);
            case 'query-methods':
                return renderQueryMethods(topic.methods);
            case 'performance-optimization':
                return renderPerformanceOptimization(topic.techniques);
            case 'best-practices':
                return renderBestPractices(topic.categories);
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{hibernateJson.title}</h1>
            </div>

            {/* Navigation */}
            <TabNavigation />

            {/* Content */}
            <div className="space-y-8">{renderContent()}</div>
        </div>
    );
};

export default HibernatePage;
