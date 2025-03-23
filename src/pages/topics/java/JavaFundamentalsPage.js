import React, { useState, useEffect, useRef } from 'react';
import { Book, Code, Database, Server, Layout, Box, Cpu, MemoryStick, Clock, GitBranch, Globe } from 'lucide-react';
import javaFundamentalsJsonEn from '../../../data/java/java-fundamentals.json';
import javaFundamentalsJsonFr from '../../../data/java/java-fundamentals-fr.json';
import CodeBlock from '../../../components/CodeBlock';

const JavaFundamentalsPage = () => {
    // Language state with localStorage persistence
    const [language, setLanguage] = useState(() =>
        localStorage.getItem('javaFundamentalsLanguage') || 'en'
    );

    // Content based on language
    const [content, setContent] = useState(
        language === 'en' ? javaFundamentalsJsonEn : javaFundamentalsJsonFr
    );

    // Active section index
    const [activeSection, setActiveSection] = useState(0);

    // Tab navigation ref
    const tabsRef = useRef(null);

    // Update content when language changes
    useEffect(() => {
        setContent(language === 'en' ? javaFundamentalsJsonEn : javaFundamentalsJsonFr);
        localStorage.setItem('javaFundamentalsLanguage', language);
    }, [language]);

    // Icons mapping for sections
    const sectionIcons = {
        'Core Concepts': <Cpu className="w-5 h-5"/>,
        'Concepts de Base': <Cpu className="w-5 h-5"/>,
        'Data Types and Variables': <Database className="w-5 h-5"/>,
        'Types de Données et Variables': <Database className="w-5 h-5"/>,
        'Object-Oriented Programming Concepts': <Box className="w-5 h-5"/>,
        'Concepts de Programmation Orientée Objet': <Box className="w-5 h-5"/>,
        'Memory Management': <MemoryStick className="w-5 h-5"/>,
        'Gestion de la Mémoire': <MemoryStick className="w-5 h-5"/>,
        'Constructors': <Layout className="w-5 h-5"/>,
        'Constructeurs': <Layout className="w-5 h-5"/>,
        'Keywords and Modifiers': <Code className="w-5 h-5"/>,
        'Mots-clés et Modificateurs': <Code className="w-5 h-5"/>,
        'Classes and Interfaces': <Server className="w-5 h-5"/>,
        'Classes et Interfaces': <Server className="w-5 h-5"/>,
        'String Handling': <Book className="w-5 h-5"/>,
        'Gestion des Chaînes': <Book className="w-5 h-5"/>,
        'Packages and Access Control': <GitBranch className="w-5 h-5"/>,
        'Packages et Contrôle d\'Accès': <GitBranch className="w-5 h-5"/>,
        'Best Practices': <Clock className="w-5 h-5"/>,
        'Meilleures Pratiques': <Clock className="w-5 h-5"/>,
        'Interview Focus Areas': <Box className="w-5 h-5"/>,
        'Domaines d\'intérêt pour les Entretiens': <Box className="w-5 h-5"/>,
        'Interview FAQs': <Book className="w-5 h-5"/>,
        'FAQ d\'Entretien': <Book className="w-5 h-5"/>
    };

    // Language Selector Component
    const LanguageSelector = () => (
        <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-cyan-400" />
            <div className="flex rounded-lg overflow-hidden border border-gray-700">
                <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1.5 text-sm ${
                        language === 'en'
                            ? 'bg-cyan-500/30 text-cyan-300'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    English
                </button>
                <button
                    onClick={() => setLanguage('fr')}
                    className={`px-3 py-1.5 text-sm ${
                        language === 'fr'
                            ? 'bg-cyan-500/30 text-cyan-300'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    Français
                </button>
            </div>
        </div>
    );

    // Tab Navigation component
    const TabNavigation = () => {
        return (
            <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                    {content.sections.map((section, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveSection(index)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors shadow-lg ${
                                activeSection === index
                                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-gray-900 shadow-cyan-500/50'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 shadow-gray-900/50'
                            }`}
                        >
                            {sectionIcons[section.title] || <Box className="w-5 h-5"/>}
                            {section.title}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    // Render Core Concepts section (first section)
    const renderCoreConcepts = () => {
        const section = content.sections[0];
        if (!section) return null;

        return (
            <div className="space-y-6">
                {section.subsections?.map((subsection, idx) => (
                    <div key={idx} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            {sectionIcons[section.title] &&
                                <div className="p-2 bg-gray-700/50 rounded-lg">
                                    {sectionIcons[section.title]}
                                </div>
                            }
                            <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                        </div>

                        {/* Content text */}
                        {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                        {/* Key Features */}
                        {subsection.keyFeatures && (
                            <div className="mt-4">
                                <h4 className="text-md font-semibold text-cyan-300 mb-3">
                                    {language === 'en' ? 'Key Features' : 'Caractéristiques Clés'}
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {subsection.keyFeatures.map((feature, idx) => (
                                        <div key={idx} className="bg-gray-800/70 p-3 rounded-lg">
                                            <h5 className="text-purple-300 font-medium">{feature.feature}</h5>
                                            <p className="text-gray-400 text-sm">{feature.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Components */}
                        {subsection.components && (
                            <div className="mt-4">
                                <h4 className="text-md font-semibold text-cyan-300 mb-3">
                                    {language === 'en' ? 'Components' : 'Composants'}
                                </h4>
                                <div className="space-y-4">
                                    {subsection.components.map((component, idx) => (
                                        <div key={idx} className="bg-gray-800/70 p-4 rounded-lg">
                                            <h5 className="text-purple-300 font-medium mb-2">{component.name}</h5>
                                            <p className="text-gray-300 mb-3">{component.description || component.function}</p>

                                            {component.tools && (
                                                <div className="mt-2">
                                                    <h6 className="text-sm font-medium text-gray-400 mb-2">
                                                        {language === 'en' ? "Tools:" : "Outils:"}
                                                    </h6>
                                                    <ul className="list-disc list-inside space-y-1">
                                                        {component.tools.map((tool, toolIdx) => (
                                                            <li key={toolIdx} className="text-gray-300">{tool}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {component.includes && (
                                                <div className="mt-2">
                                                    <h6 className="text-sm font-medium text-gray-400 mb-2">
                                                        {language === 'en' ? "Includes:" : "Inclut:"}
                                                    </h6>
                                                    <ul className="list-disc list-inside space-y-1">
                                                        {component.includes.map((item, itemIdx) => (
                                                            <li key={itemIdx} className="text-gray-300">{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {component.features && (
                                                <div className="mt-2">
                                                    <h6 className="text-sm font-medium text-gray-400 mb-2">
                                                        {language === 'en' ? "Features:" : "Fonctionnalités:"}
                                                    </h6>
                                                    <ul className="list-disc list-inside space-y-1">
                                                        {component.features.map((feature, featureIdx) => (
                                                            <li key={featureIdx} className="text-gray-300">{feature}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Steps */}
                        {subsection.steps && (
                            <div className="mt-4">
                                <h4 className="text-md font-semibold text-cyan-300 mb-3">
                                    {language === 'en' ? "Process Steps" : "Étapes du Processus"}
                                </h4>
                                <div className="space-y-3">
                                    {subsection.steps.map((step, idx) => (
                                        <div key={idx} className="flex items-start gap-3 bg-gray-800/70 p-3 rounded-lg">
                                            <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-300 font-semibold">
                                                {step.step}
                                            </div>
                                            <p className="text-gray-300 pt-1">{step.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Code and keywords */}
                        {subsection.code && (
                            <div className="mt-4">
                                <h4 className="text-md font-semibold text-cyan-300 mb-3">
                                    {language === 'en' ? "Code Example" : "Exemple de Code"}
                                </h4>
                                <CodeBlock code={subsection.code} />

                                {subsection.keywords && (
                                    <div className="mt-3">
                                        <h6 className="text-sm font-medium text-gray-400 mb-2">
                                            {language === 'en' ? "Keywords:" : "Mots-clés:"}
                                        </h6>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                            {subsection.keywords.map((keyword, idx) => (
                                                <div key={idx} className="bg-gray-700/50 p-2 rounded">
                                                    <span className="text-pink-300 font-mono">{keyword.keyword}</span>
                                                    <p className="text-gray-300 text-sm mt-1">{keyword.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Diagram */}
                        {subsection.diagram && (
                            <div className="mt-4">
                                <h4 className="text-md font-semibold text-cyan-300 mb-3">
                                    {language === 'en' ? "Component Diagram" : "Diagramme des Composants"}
                                </h4>
                                <pre className="text-gray-300 text-sm font-mono overflow-x-auto whitespace-pre bg-gray-800/70 p-3 rounded-lg">
                                    {subsection.diagram}
                                </pre>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    // Placeholder sections
    const renderPlaceholderSection = () => {
        const section = content.sections[activeSection];
        if (!section) return null;

        return (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                <div className="flex items-center justify-center py-16 flex-col">
                    <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
                        {sectionIcons[section.title] || <Code className="w-8 h-8 text-gray-500" />}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-300 mb-2">{section.title}</h3>
                    <p className="text-gray-400 text-center max-w-md">
                        {language === 'en'
                            ? 'This section is under development. Check back soon for more content!'
                            : 'Cette section est en cours de développement. Revenez bientôt pour plus de contenu !'}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Language Selector */}
            <LanguageSelector />

            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{content.title}</h1>
                <p className="text-gray-300">
                    {language === 'en'
                        ? "Comprehensive guide to Java programming fundamentals"
                        : "Guide complet des fondamentaux de programmation Java"
                    }
                </p>
            </div>

            {/* Navigation */}
            <TabNavigation />

            {/* Content */}
            <div className="space-y-8">
                {activeSection === 0 ? renderCoreConcepts() : renderPlaceholderSection()}
            </div>
        </div>
    );
};

export default JavaFundamentalsPage;
