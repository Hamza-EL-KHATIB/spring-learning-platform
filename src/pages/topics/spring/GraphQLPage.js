import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Server, Code, Database, Shield, CheckCircle, AlertTriangle, Globe, FileJson, BookOpen } from 'lucide-react';
import graphqlJsonEn from '../../../data/spring/graphql.json';
import graphqlJsonFr from '../../../data/spring/graphql-fr.json';

const GraphQLPage = () => {
    // Language state with localStorage persistence
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('graphqlPageLanguage') || 'en';
    });

    const [activeTab, setActiveTab] = useState('graphql-fundamentals');
    const [graphqlJson, setGraphqlJson] = useState(language === 'en' ? graphqlJsonEn : graphqlJsonFr);

    // Change language and save preference
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        localStorage.setItem('graphqlPageLanguage', lang);
        setGraphqlJson(lang === 'en' ? graphqlJsonEn : graphqlJsonFr);
    };

    // Language Selector Component
    const LanguageSelector = () => (
        <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-purple-400" />
            <div className="flex rounded-lg overflow-hidden border border-gray-700">
                <button
                    onClick={() => handleLanguageChange('en')}
                    className={`px-3 py-1.5 text-sm ${
                        language === 'en'
                            ? 'bg-purple-500/30 text-purple-300'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    English
                </button>
                <button
                    onClick={() => handleLanguageChange('fr')}
                    className={`px-3 py-1.5 text-sm ${
                        language === 'fr'
                            ? 'bg-purple-500/30 text-purple-300'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    Français
                </button>
            </div>
        </div>
    );

    const renderTabIcon = (id) => {
        switch (id) {
            case 'graphql-fundamentals':
                return <Server className="w-4 h-4" />;
            case 'graphql-schema':
                return <FileJson className="w-4 h-4" />;
            case 'graphql-controller':
                return <Code className="w-4 h-4" />;
            case 'graphql-data-fetching':
                return <Database className="w-4 h-4" />;
            case 'graphql-error-handling':
                return <AlertTriangle className="w-4 h-4" />;
            case 'graphql-security':
                return <Shield className="w-4 h-4" />;
            case 'graphql-testing':
                return <CheckCircle className="w-4 h-4" />;
            case 'graphql-best-practices':
                return <BookOpen className="w-4 h-4" />;
            default:
                return <Code className="w-4 h-4" />;
        }
    };

    const TabNavigation = () => (
        <div className="mb-8 flex flex-wrap gap-4">
            {graphqlJson.topics.map((topic) => (
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

    // Render Code Blocks
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

    // Render GraphQL Principles
    const renderPrinciples = (principles) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {principles && principles.map((principle, idx) => (
                <div key={idx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                    <h4 className="text-lg font-medium text-purple-300 mb-2">{principle.name}</h4>
                    <p className="text-gray-300">{principle.description}</p>
                </div>
            ))}
        </div>
    );

    // Render GraphQL Operations
    const renderOperations = (operations) => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {operations && operations.map((operation, idx) => (
                <div key={idx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                    <h4 className="text-lg font-medium text-purple-300 mb-2">{operation.operation}</h4>
                    <p className="text-gray-300">{operation.usage}</p>
                </div>
            ))}
        </div>
    );

    // Render Annotations
    const renderAnnotations = (annotations) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {annotations && annotations.map((annotation, idx) => (
                <div key={idx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                    <h4 className="text-lg font-medium text-purple-300 mb-2">{annotation.name}</h4>
                    <p className="text-gray-300">{annotation.description}</p>
                </div>
            ))}
        </div>
    );

    const renderGraphQLFundamentals = (concepts) => (
        <div className="space-y-6">
            {concepts?.map((concept, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{concept.name}</h3>

                    {concept.principles && (
                        <div className="mb-6">
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Principles</h4>
                            {renderPrinciples(concept.principles)}
                        </div>
                    )}

                    {concept.operations && (
                        <div className="mb-6">
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Operations</h4>
                            {renderOperations(concept.operations)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderSchemaComponents = (components) => (
        <div className="space-y-6">
            {components?.map((component, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{component.name}</h3>
                    <p className="text-gray-300 mb-6">{component.description}</p>

                    {component.annotations && (
                        <div>
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Annotations</h4>
                            {renderAnnotations(component.annotations)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderControllerComponents = (components) => (
        <div className="space-y-6">
            {components?.map((component, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{component.name}</h3>
                    <p className="text-gray-300 mb-6">{component.description}</p>

                    {component.example && (
                        <div>
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Example</h4>
                            {renderCodeBlock(component.example.code)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderDataFetchingFeatures = (features) => (
        <div className="space-y-6">
            {features?.map((feature, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{feature.name}</h3>
                    <p className="text-gray-300 mb-6">{feature.description}</p>

                    {feature.example && (
                        <div>
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Implementation</h4>
                            {renderCodeBlock(feature.example.code)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderErrorHandlingComponents = (components) => (
        <div className="space-y-6">
            {components?.map((component, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{component.name}</h3>
                    <p className="text-gray-300">{component.description}</p>
                </div>
            ))}
        </div>
    );

    const renderSecurityFeatures = (features) => (
        <div className="space-y-6">
            {features?.map((feature, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{feature.name}</h3>
                    <p className="text-gray-300 mb-6">{feature.description}</p>

                    {feature.annotations && (
                        <div>
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Annotations</h4>
                            {renderAnnotations(feature.annotations)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderTestingTypes = (types) => (
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
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{practice.category}</h3>

                    {practice.recommendations && (
                        <div>
                            <h4 className="text-lg font-medium text-gray-200 mb-4">Recommendations</h4>
                            <ul className="list-disc list-inside space-y-2">
                                {practice.recommendations.map((rec, recIdx) => (
                                    <li key={recIdx} className="text-gray-300">{rec}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderContent = () => {
        const topic = graphqlJson.topics.find(t => t.id === activeTab);
        if (!topic) return null;

        return (
            <ContentSection title={topic.title} description={topic.description}>
                {(() => {
                    switch(activeTab) {
                        case 'graphql-fundamentals':
                            return renderGraphQLFundamentals(topic.concepts);
                        case 'graphql-schema':
                            return renderSchemaComponents(topic.components);
                        case 'graphql-controller':
                            return renderControllerComponents(topic.components);
                        case 'graphql-data-fetching':
                            return renderDataFetchingFeatures(topic.features);
                        case 'graphql-error-handling':
                            return renderErrorHandlingComponents(topic.components);
                        case 'graphql-security':
                            return renderSecurityFeatures(topic.features);
                        case 'graphql-testing':
                            return renderTestingTypes(topic.types);
                        case 'graphql-best-practices':
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
            {/* Language Selector */}
            <LanguageSelector />

            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{graphqlJson.title}</h1>
            </div>

            {/* Navigation Tabs */}
            <TabNavigation />

            {/* Content */}
            <div className="space-y-8">
                {renderContent()}
            </div>
        </div>
    );
};

export default GraphQLPage;