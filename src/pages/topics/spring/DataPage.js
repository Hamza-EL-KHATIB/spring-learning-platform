import React, { useState } from 'react';
import { Database, GitMerge, LayoutGrid, Clock, FileCode, Shield, Code } from 'lucide-react';
import { CopyBlock, dracula } from 'react-code-blocks';
import data from '../../../data/spring/data.json';

const DataPage = () => {
    const [activeTab, setActiveTab] = useState(data.topics[0].id);

    const TabNavigation = () => (
        <div className="mb-8 flex flex-wrap gap-4">
            {data.topics.map((topic) => (
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
            case 'spring-data-jpa':
                return <Database className="w-4 h-4" />;
            case 'custom-queries':
                return <FileCode className="w-4 h-4" />;
            case 'pagination-sorting':
                return <LayoutGrid className="w-4 h-4" />;
            case 'transactions':
                return <GitMerge className="w-4 h-4" />;
            case 'auditing':
                return <Clock className="w-4 h-4" />;
            case 'projections':
                return <Shield className="w-4 h-4" />;
            case 'best-practices':
                return <Code className="w-4 h-4" />;
            default:
                return <Database className="w-4 h-4" />;
        }
    };

    const renderCodeBlock = (code, language = 'java') => (
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
            <CopyBlock
                text={code}
                language={language}
                theme={dracula}
                wrapLines
                customStyle={{
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    backgroundColor: '#282c34',
                    overflow: 'auto'
                }}
            />
        </div>
    );

    const renderMethods = (methods) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {methods.map((method, index) => (
                <div key={index} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                    <h4 className="text-purple-300 font-medium mb-2">{method.name}</h4>
                    <p className="text-gray-300 mb-2">{method.usage}</p>
                    <code className="text-pink-400 text-sm">{method.example}</code>
                </div>
            ))}
        </div>
    );

    const renderOperators = (operators) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {operators.map((op, index) => (
                <div key={index} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                    <h4 className="text-purple-300 font-medium mb-2">{op.name}</h4>
                    <code className="text-pink-400 text-sm">{op.example}</code>
                </div>
            ))}
        </div>
    );

    const renderAttributes = (attributes) => (
        <div className="space-y-4">
            {attributes.map((attr, index) => (
                <div key={index} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                    <h4 className="text-purple-300 font-medium mb-3">@{attr.name}</h4>
                    <div className="grid grid-cols-1 gap-2">
                        {attr.values.map((value, vIndex) => (
                            <div key={vIndex} className="text-gray-300 px-3 py-2 bg-gray-800/50 rounded">
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderPractices = (categories) => (
        <div className="space-y-6">
            {categories.map((category, index) => (
                <div key={index} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                    <h4 className="text-purple-300 font-medium mb-3">{category.name}</h4>
                    <ul className="list-disc list-inside space-y-2">
                        {category.practices.map((practice, pIndex) => (
                            <li key={pIndex} className="text-gray-300">{practice}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );

    const renderContent = () => {
        const topic = data.topics.find(t => t.id === activeTab);
        if (!topic) return null;

        return (
            <div className="space-y-6">
                {/* Concepts Section */}
                {topic.concepts && topic.concepts.map((concept, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-xl font-semibold text-purple-400 mb-4">{concept.name}</h3>
                        <p className="text-gray-300 mb-6">{concept.description}</p>

                        {concept.methods && (
                            <div className="mb-6">
                                <h4 className="text-lg font-medium text-gray-200 mb-4">Methods</h4>
                                {renderMethods(concept.methods)}
                            </div>
                        )}

                        {concept.implementation && (
                            <div className="mb-6">
                                <h4 className="text-lg font-medium text-gray-200 mb-4">Implementation</h4>
                                {renderCodeBlock(concept.implementation.code)}
                            </div>
                        )}

                        {concept.attributes && (
                            <div className="mb-6">
                                <h4 className="text-lg font-medium text-gray-200 mb-4">Attributes</h4>
                                {renderAttributes(concept.attributes)}
                            </div>
                        )}

                        {concept.patterns && (
                            <div className="mb-6">
                                <h4 className="text-lg font-medium text-gray-200 mb-4">Query Patterns</h4>
                                <div className="space-y-4">
                                    {concept.patterns.map((pattern, pIndex) => (
                                        <div key={pIndex} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                            <h5 className="text-purple-300 font-medium mb-2">{pattern.prefix}</h5>
                                            <code className="text-gray-300 block mb-2">{pattern.example}</code>
                                            <code className="text-gray-400 text-sm">{pattern.generates}</code>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {concept.operators && (
                            <div className="mb-6">
                                <h4 className="text-lg font-medium text-gray-200 mb-4">Query Operators</h4>
                                {renderOperators(concept.operators)}
                            </div>
                        )}
                    </div>
                ))}

                {/* Types Section */}
                {topic.types && topic.types.map((type, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-xl font-semibold text-purple-400 mb-4">{type.name}</h3>
                        <p className="text-gray-300 mb-6">{type.description}</p>

                        {type.examples && (
                            <div className="space-y-4">
                                {type.examples.map((example, eIndex) => (
                                    <div key={eIndex}>
                                        <h4 className="text-lg font-medium text-gray-200 mb-2">
                                            {example.description}
                                        </h4>
                                        {renderCodeBlock(example.code)}
                                    </div>
                                ))}
                            </div>
                        )}

                        {type.example && renderCodeBlock(type.example.code)}
                    </div>
                ))}

                {/* Features Section */}
                {topic.features && topic.features.map((feature, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-xl font-semibold text-purple-400 mb-4">{feature.name}</h3>
                        <p className="text-gray-300 mb-6">{feature.description}</p>

                        {feature.example && renderCodeBlock(feature.example.code)}
                        {feature.setup && renderCodeBlock(feature.setup.code)}
                    </div>
                ))}

                {/* Best Practices Section */}
                {topic.categories && (
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-xl font-semibold text-purple-400 mb-6">Best Practices</h3>
                        {renderPractices(topic.categories)}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{data.title}</h1>
            </div>

            {/* Navigation */}
            <TabNavigation />

            {/* Content */}
            <div className="space-y-8">
                {renderContent()}
            </div>
        </div>
    );
};

export default DataPage;