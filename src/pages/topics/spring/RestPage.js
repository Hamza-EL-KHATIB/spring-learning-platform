import React, { useState } from 'react';
import { Globe2, Code, MessageSquare, AlertTriangle, FileJson, Shield, TestTube, BookOpen } from 'lucide-react';
import restJson from '../../../data/spring/rest.json';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const RestPage = () => {
    const [activeTab, setActiveTab] = useState('rest-basics');

    const TabNavigation = () => (
        <div className="mb-8 flex flex-wrap gap-4">
            {restJson.topics.map((topic) => (
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
            case 'rest-basics':
                return <Globe2 className="w-4 h-4" />;
            case 'rest-controllers':
                return <Code className="w-4 h-4" />;
            case 'response-handling':
                return <MessageSquare className="w-4 h-4" />;
            case 'error-handling':
                return <AlertTriangle className="w-4 h-4" />;
            case 'content-negotiation':
                return <FileJson className="w-4 h-4" />;
            case 'security':
                return <Shield className="w-4 h-4" />;
            case 'testing':
                return <TestTube className="w-4 h-4" />;
            case 'best-practices':
                return <BookOpen className="w-4 h-4" />;
            default:
                return <Code className="w-4 h-4" />;
        }
    };

    const renderCodeBlock = (code, language = 'java') => (
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
            <SyntaxHighlighter
                language={language}
                style={oneDark}
                customStyle={{
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    backgroundColor: '#282c34',
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );

    const ContentSection = ({ title, description, children }) => (
        <div className="mb-12">
            {(title || description) && (
                <div className="mb-6">
                    {title && <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>}
                    {description && <p className="text-gray-300">{description}</p>}
                </div>
            )}
            {children}
        </div>
    );

    const renderRestFundamentals = (concepts) => (
        <div className="space-y-6">
            {concepts?.map((concept, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{concept.name}</h3>

                    {concept.principles && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {concept.principles.map((principle, pIdx) => (
                                <div key={pIdx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                    <h4 className="text-lg font-medium text-purple-300 mb-2">{principle.name}</h4>
                                    <p className="text-gray-300">{principle.description}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {concept.methods && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {concept.methods.map((method, mIdx) => (
                                <div key={mIdx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                    <h4 className="text-lg font-medium text-purple-300 mb-2">{method.method}</h4>
                                    <p className="text-gray-300 mb-2">{method.usage}</p>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-pink-400">{method.annotation}</span>
                                        <span className="text-gray-400">
                                            ({method.idempotent ? 'Idempotent' : 'Non-idempotent'})
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderRestControllers = (components) => (
        <div className="space-y-6">
            {components?.map((component, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{component.name}</h3>
                    <p className="text-gray-300 mb-6">{component.description}</p>

                    {component.example && (
                        <div className="mb-6">
                            {renderCodeBlock(component.example.code)}
                        </div>
                    )}

                    {component.types && (
                        <div>
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Types</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {component.types.map((type, tIdx) => (
                                    <div key={tIdx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                        <h5 className="text-purple-300 font-medium mb-2">{type.annotation}</h5>
                                        <p className="text-gray-300 mb-2">{type.description}</p>
                                        {type.attributes && (
                                            <div className="mt-2">
                                                <span className="text-gray-400">Attributes: </span>
                                                <span className="text-pink-400">{type.attributes.join(', ')}</span>
                                            </div>
                                        )}
                                        {type.example && (
                                            <code className="mt-2 block text-sm text-cyan-400">{type.example}</code>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {component.annotations && (
                        <div className="mt-6">
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Annotations</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {component.annotations.map((annotation, aIdx) => (
                                    <div key={aIdx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                        <h5 className="text-purple-300 font-medium mb-2">{annotation.name}</h5>
                                        <p className="text-gray-300 mb-2">{annotation.description}</p>
                                        {annotation.example && (
                                            <code className="mt-2 block text-sm text-cyan-400">{annotation.example}</code>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderResponseHandling = (features) => (
        <div className="space-y-6">
            {features?.map((feature, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{feature.name}</h3>
                    <p className="text-gray-300 mb-6">{feature.description}</p>

                    {feature.example && (
                        <div className="mb-6">
                            {renderCodeBlock(feature.example.code)}
                        </div>
                    )}

                    {feature.commonCodes && (
                        <div>
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Status Codes</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {feature.commonCodes.map((code, cIdx) => (
                                    <div key={cIdx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                        <h5 className="text-purple-300 font-medium mb-2">{code.code}</h5>
                                        <p className="text-gray-300">{code.usage}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderErrorHandling = (components) => (
        <div className="space-y-6">
            {components?.map((component, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{component.name}</h3>
                    <p className="text-gray-300 mb-6">{component.description}</p>

                    {component.example && (
                        <div>
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Implementation Example</h4>
                            {renderCodeBlock(component.example.code)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderContentNegotiation = (features) => (
        <div className="space-y-6">
            {features?.map((feature, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{feature.name}</h3>

                    {feature.types && (
                        <div className="mb-6">
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Content Types</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {feature.types.map((type, tIdx) => (
                                    <div key={tIdx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                        <h5 className="text-purple-300 font-medium mb-2">{type.type}</h5>
                                        <p className="text-gray-300 mb-2">{type.description}</p>
                                        {type.example && (
                                            <code className="text-sm text-cyan-400">{type.example}</code>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {feature.headers && (
                        <div>
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Request Headers</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {feature.headers.map((header, hIdx) => (
                                    <div key={hIdx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                        <h5 className="text-purple-300 font-medium mb-2">{header.name}</h5>
                                        <p className="text-gray-300">{header.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderSecurity = (features) => (
        <div className="space-y-6">
            {features?.map((feature, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{feature.name}</h3>

                    {Array.isArray(feature.methods) && (
                        <div className="mb-6">
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Authentication Methods</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {feature.methods.map((method, mIdx) => (
                                    <div key={mIdx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                        <span className="text-gray-300">{method}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {feature.annotations && (
                        <div>
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Authorization Annotations</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {feature.annotations.map((annotation, aIdx) => (
                                    <div key={aIdx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                        <h5 className="text-purple-300 font-medium mb-2">{annotation.name}</h5>
                                        <code className="text-sm text-cyan-400">{annotation.example}</code>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderTesting = (types) => (
        <div className="space-y-6">
            {types?.map((type, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{type.name}</h3>
                    <p className="text-gray-300 mb-6">{type.description}</p>

                    {type.example && (
                        <div>
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Example</h4>
                            {renderCodeBlock(type.example.code)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderBestPractices = (practices) => (
        <div className="space-y-6">
            {practices?.map((practice, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    {practice.category && (
                        <h3 className="text-xl font-semibold text-purple-400 mb-4">{practice.category}</h3>
                    )}

                    {practice.recommendations && (
                        <div className="mb-6">
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Recommendations</h4>
                            <ul className="list-disc list-inside space-y-2">
                                {practice.recommendations.map((rec, rIdx) => (
                                    <li key={rIdx} className="text-gray-300">{rec}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {practice.strategies && (
                        <div className="mb-6">
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Strategies</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {practice.strategies.map((strategy, sIdx) => (
                                    <div key={sIdx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                        <h5 className="text-purple-300 font-medium mb-2">{strategy.name}</h5>
                                        <code className="text-sm text-cyan-400">{strategy.example}</code>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {practice.tools && (
                        <div>
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Tools</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {practice.tools.map((tool, tIdx) => (
                                    <div key={tIdx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                        <h5 className="text-purple-300 font-medium mb-2">{tool.name}</h5>
                                        <p className="text-gray-300">{tool.usage}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderContent = () => {
        const topic = restJson.topics.find(t => t.id === activeTab);
        if (!topic) return null;

        return (
            <ContentSection title={topic.title} description={topic.description}>
                {(() => {
                    switch(activeTab) {
                        case 'rest-basics':
                            return renderRestFundamentals(topic.concepts);
                        case 'rest-controllers':
                            return renderRestControllers(topic.components);
                        case 'response-handling':
                            return renderResponseHandling(topic.features);
                        case 'error-handling':
                            return renderErrorHandling(topic.components);
                        case 'content-negotiation':
                            return renderContentNegotiation(topic.features);
                        case 'security':
                            return renderSecurity(topic.features);
                        case 'testing':
                            return renderTesting(topic.types);
                        case 'best-practices':
                            return renderBestPractices(topic.practices);
                        default:
                            return null;
                    }
                })()}
            </ContentSection>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{restJson.title}</h1>
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

export default RestPage;
