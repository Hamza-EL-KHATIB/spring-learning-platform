import React, { useState, useEffect } from 'react';
import { Box, Database, GitMerge, Settings, Shield, Code, Layers, Globe } from 'lucide-react';
import coreJsonEn from '../../../data/spring/core.json';
import coreJsonFr from '../../../data/spring/core-fr.json';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Language Selector Component
const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
    return (
        <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-purple-400" />
            <div className="flex rounded-lg overflow-hidden border border-gray-700">
                <button
                    onClick={() => onLanguageChange('en')}
                    className={`px-3 py-1.5 text-sm ${
                        currentLanguage === 'en'
                            ? 'bg-purple-500/30 text-purple-300'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    English
                </button>
                <button
                    onClick={() => onLanguageChange('fr')}
                    className={`px-3 py-1.5 text-sm ${
                        currentLanguage === 'fr'
                            ? 'bg-purple-500/30 text-purple-300'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    Français
                </button>
            </div>
        </div>
    );
};

const CorePage = () => {
    // Get the language preference from localStorage or default to English
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('corePageLanguage') || 'en';
    });

    // State for the content based on language
    const [coreJson, setCoreJson] = useState(language === 'en' ? coreJsonEn : coreJsonFr);

    // Active tab state
    const [activeTab, setActiveTab] = useState('ioc-container');

    // Change the language and save the preference
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        localStorage.setItem('corePageLanguage', lang);
    };

    useEffect(() => {
        // Update content based on selected language
        setCoreJson(language === 'en' ? coreJsonEn : coreJsonFr);
    }, [language]);

    const TabNavigation = () => (
        <div className="mb-8 flex flex-wrap gap-4">
            {coreJson.topics.map((topic) => (
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

    const renderCoreComponents = (components) => (
        <div className="space-y-6">
            {components && components.map((component, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{component.name}</h3>
                    <p className="text-gray-300 mb-4">{component.description}</p>

                    {component.characteristics && (
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">
                                {language === 'en' ? 'Characteristics' : 'Caractéristiques'}
                            </h4>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                {component.characteristics.map((char, charIdx) => (
                                    <li key={charIdx}>{char}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {component.relationships && (
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">
                                {language === 'en' ? 'Relationships' : 'Relations'}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {component.relationships.map((rel, relIdx) => (
                                    <div key={relIdx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                        <h5 className="text-purple-300 font-medium mb-2">{rel.component}</h5>
                                        <p className="text-gray-300">{rel.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {component.methods && (
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">
                                {language === 'en' ? 'Methods' : 'Méthodes'}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {component.methods.map((method, methodIdx) => (
                                    <div key={methodIdx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                        <h5 className="text-purple-300 font-medium mb-2">{method.name}</h5>
                                        <p className="text-gray-300">{method.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {component.example && (
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">
                                {language === 'en' ? 'Example' : 'Exemple'}
                            </h4>
                            <SyntaxHighlighter
                                language="java"
                                style={oneDark}
                                customStyle={{
                                    borderRadius: '0.5rem',
                                    padding: '1rem',
                                    backgroundColor: '#282c34',
                                }}
                            >
                                {component.example.code}
                            </SyntaxHighlighter>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderSpringConfigurations = (configs) => (
        <div className="space-y-6">
            {configs && configs.map((config, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{config.type}</h3>
                    <p className="text-gray-300 mb-4">{config.description}</p>

                    {config.example && (
                        <div className="mt-4">
                            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                <h4 className="text-lg font-medium text-gray-200 mb-3">
                                    {language === 'en' ? 'Example' : 'Exemple'}
                                </h4>
                                <SyntaxHighlighter
                                    language="java"
                                    style={oneDark}
                                    customStyle={{
                                        borderRadius: '0.5rem',
                                        padding: '1rem',
                                        backgroundColor: '#282c34',
                                    }}
                                >
                                    {config.example.code}
                                </SyntaxHighlighter>

                                {config.example.advantages && (
                                    <div className="mt-4">
                                        <h5 className="text-sm font-medium text-green-400 mb-2">
                                            {language === 'en' ? 'Advantages' : 'Avantages'}
                                        </h5>
                                        <ul className="list-disc list-inside text-gray-300">
                                            {config.example.advantages.map((adv, advIdx) => (
                                                <li key={advIdx}>{adv}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderAOPConcepts = (concepts) => (
        <div className="space-y-6">
            {concepts && concepts.map((concept, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{concept.term}</h3>
                    <p className="text-gray-300 mb-4">{concept.description}</p>

                    {concept.example && (
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50 mb-4">
                            <h4 className="text-sm font-medium text-gray-200 mb-2">
                                {language === 'en' ? 'Example' : 'Exemple'}
                            </h4>
                            <p className="text-gray-300">{concept.example}</p>
                        </div>
                    )}

                    {concept.types && (
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-3">
                                {language === 'en' ? 'Advice Types' : 'Types de Conseils'}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {concept.types.map((type, typeIdx) => (
                                    <div key={typeIdx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                        <h5 className="text-purple-300 font-medium mb-2">{type.name}</h5>
                                        <p className="text-gray-300">{type.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderTabIcon = (id) => {
        switch (id) {
            case 'ioc-container':
                return <Box className="w-4 h-4" />;
            case 'bean-lifecycle':
                return <GitMerge className="w-4 h-4" />;
            case 'bean-scopes':
                return <Layers className="w-4 h-4" />;
            case 'configuration':
                return <Settings className="w-4 h-4" />;
            case 'aop':
                return <Shield className="w-4 h-4" />;
            case 'spring-components':
                return <Database className="w-4 h-4" />;
            default:
                return <Code className="w-4 h-4" />;
        }
    };

    const renderIoCContainerConcepts = (concepts) => (
        <div className="space-y-6">
            {concepts && concepts.map((concept, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{concept.name}</h3>
                    <p className="text-gray-300 mb-4">{concept.description}</p>

                    {concept.benefits && (
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">
                                {language === 'en' ? 'Benefits' : 'Avantages'}
                            </h4>
                            <ul className="list-disc list-inside text-gray-300">
                                {concept.benefits.map((benefit, bidx) => (
                                    <li key={bidx}>{benefit}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {concept.types && concept.types.map((type, typeIdx) => (
                        <div key={typeIdx} className="mt-6 bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                            <h4 className="text-lg font-medium text-purple-300 mb-2">{type.type}</h4>
                            <p className="text-gray-300 mb-4">{type.description}</p>

                            {type.example && (
                                <div className="mt-4">
                                    <SyntaxHighlighter
                                        language="java"
                                        style={oneDark}
                                        customStyle={{
                                            borderRadius: '0.5rem',
                                            padding: '1rem',
                                            backgroundColor: '#282c34',
                                        }}
                                    >
                                        {type.example.code}
                                    </SyntaxHighlighter>

                                    {type.example.advantages && (
                                        <div className="mt-4">
                                            <h5 className="text-sm font-medium text-green-400 mb-2">
                                                {language === 'en' ? 'Advantages' : 'Avantages'}
                                            </h5>
                                            <ul className="list-disc list-inside text-gray-300">
                                                {type.example.advantages.map((adv, advIdx) => (
                                                    <li key={advIdx}>{adv}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {type.example.disadvantages && (
                                        <div className="mt-4">
                                            <h5 className="text-sm font-medium text-red-400 mb-2">
                                                {language === 'en' ? 'Disadvantages' : 'Inconvénients'}
                                            </h5>
                                            <ul className="list-disc list-inside text-gray-300">
                                                {type.example.disadvantages.map((dis, disIdx) => (
                                                    <li key={disIdx}>{dis}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

    const renderBeanLifecycle = (phases) => (
        <div className="space-y-6">
            {phases && phases.map((phase, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{phase.phase}</h3>
                    <p className="text-gray-300 mb-4">{phase.description}</p>

                    {phase.events && (
                        <div className="space-y-2">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">
                                {language === 'en' ? 'Events' : 'Événements'}
                            </h4>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                {phase.events.map((event, eventIdx) => (
                                    <li key={eventIdx}>{event}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderBeanScopes = (scopes) => (
        <div className="space-y-6">
            {scopes && scopes.map((scope, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-purple-400">{scope.name}</h3>
                        {scope.defaultScope && (
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
                                {language === 'en' ? 'Default Scope' : 'Portée par Défaut'}
                            </span>
                        )}
                    </div>

                    <p className="text-gray-300 mb-4">{scope.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {scope.usage && (
                            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                <h4 className="text-sm font-medium text-gray-200 mb-2">
                                    {language === 'en' ? 'Usage' : 'Utilisation'}
                                </h4>
                                <code className="text-purple-300 text-sm">{scope.usage}</code>
                            </div>
                        )}

                        {scope.bestFor && (
                            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                <h4 className="text-sm font-medium text-gray-200 mb-2">
                                    {language === 'en' ? 'Best For' : 'Idéal Pour'}
                                </h4>
                                <p className="text-gray-300">{scope.bestFor}</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderContent = () => {
        const topic = coreJson.topics.find(t => t.id === activeTab);
        if (!topic) return null;

        switch (activeTab) {
            case 'ioc-container':
                return renderIoCContainerConcepts(topic.concepts);
            case 'bean-lifecycle':
                return renderBeanLifecycle(topic.phases);
            case 'bean-scopes':
                return renderBeanScopes(topic.scopes);
            case 'configuration':
                return renderSpringConfigurations(topic.methods);
            case 'aop':
                return renderAOPConcepts(topic.concepts);
            case 'spring-components':
                return renderCoreComponents(topic.components);
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Language Selector */}
            <LanguageSelector
                currentLanguage={language}
                onLanguageChange={handleLanguageChange}
            />

            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{coreJson.title}</h1>
            </div>

            {/* Navigation */}
            <TabNavigation />

            {/* Content */}
            <div className="space-y-8">{renderContent()}</div>
        </div>
    );
};

export default CorePage;