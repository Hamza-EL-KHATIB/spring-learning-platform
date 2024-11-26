import React, { useState } from 'react';
import { Code, Database, Layers, Zap, Settings, BookOpen } from 'lucide-react';
import hibernateJson from '../../../data/databases/hibernate.json';
import CodeBlock from '../../../components/CodeBlock';

const HibernatePage = () => {
    const [activeTab, setActiveTab] = useState('core-concepts');

    const TabNavigation = () => (
        <div className="flex flex-wrap gap-2 mb-8">
            {hibernateJson.topics.map((topic) => (
                <button
                    key={topic.id}
                    onClick={() => setActiveTab(topic.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeTab === topic.id
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
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
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">{hibernateJson.title}</h1>

                <TabNavigation />

                <div className="space-y-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default HibernatePage;