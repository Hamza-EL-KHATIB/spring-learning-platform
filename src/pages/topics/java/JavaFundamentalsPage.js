import React, {useState, useEffect, useRef, useMemo} from 'react';
import {Book, Code, Database, Server, Layout, Box, Cpu, MemoryStick, Clock, GitBranch, Globe, Shield, CheckCircle2, XCircle} from 'lucide-react';
import javaFundamentalsJsonEn from '../../../data/java/java-fundamentals.json';
import javaFundamentalsJsonFr from '../../../data/java/java-fundamentals-fr.json';
import CodeBlock from '../../../components/CodeBlock';

const JavaFundamentalsPage = () => {
    // Language state with localStorage persistence
    const [language, setLanguage] = useState(() =>
        localStorage.getItem('javaFundamentalsLanguage') || 'en'
    );

    // Content based on language - memoized to prevent unnecessary recalculations
    const content = useMemo(() =>
            language === 'en' ? javaFundamentalsJsonEn : javaFundamentalsJsonFr,
        [language]
    );

    // Active section index
    const [activeSection, setActiveSection] = useState(0);

    // Tab navigation ref
    const tabsRef = useRef(null);

    // Update localStorage when language changes
    useEffect(() => {
        localStorage.setItem('javaFundamentalsLanguage', language);
    }, [language]);

    // Icons mapping for sections - memoized to avoid recreation
    const sectionIcons = useMemo(() => ({
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
    }), []);

    // Language Selector Component
    const LanguageSelector = () => (
        <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-cyan-400"/>
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

    // Render a section subsection with proper structure
    const renderSubsection = (subsection, sectionIcon) => {
        return (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    {sectionIcon &&
                        <div className="p-2 bg-gray-700/50 rounded-lg">
                            {sectionIcon}
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
                                    <div
                                        className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-300 font-semibold">
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
                        <CodeBlock code={subsection.code}/>

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
                        <pre
                            className="text-gray-300 text-sm font-mono overflow-x-auto whitespace-pre bg-gray-800/70 p-3 rounded-lg">
                            {subsection.diagram}
                        </pre>
                    </div>
                )}

                {/* Primitive Types Table */}
                {subsection.types && subsection.types[0]?.dataType && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {language === 'en' ? 'Primitive Types' : 'Types Primitifs'}
                        </h4>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-800/50 rounded-lg">
                                <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="py-2 px-3 text-left text-sm text-gray-400">{language === 'en' ? 'Type' : 'Type'}</th>
                                    <th className="py-2 px-3 text-left text-sm text-gray-400">{language === 'en' ? 'Size' : 'Taille'}</th>
                                    <th className="py-2 px-3 text-left text-sm text-gray-400">{language === 'en' ? 'Range' : 'Intervalle'}</th>
                                    <th className="py-2 px-3 text-left text-sm text-gray-400">{language === 'en' ? 'Default' : 'Défaut'}</th>
                                    <th className="py-2 px-3 text-left text-sm text-gray-400">{language === 'en' ? 'Usage' : 'Utilisation'}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {subsection.types.map((type, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}>
                                        <td className="py-2 px-3 text-purple-300 font-mono">{type.dataType}</td>
                                        <td className="py-2 px-3 text-gray-300">{type.size}</td>
                                        <td className="py-2 px-3 text-gray-300">{type.range}</td>
                                        <td className="py-2 px-3 text-gray-300 font-mono">{type.defaultValue}</td>
                                        <td className="py-2 px-3 text-gray-300">{type.usage}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Reference Types */}
                {subsection.types && !subsection.types[0]?.dataType && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {language === 'en' ? 'Types' : 'Types'}
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                            {subsection.types.map((type, idx) => (
                                <div key={idx} className="bg-gray-800/70 p-3 rounded-lg">
                                    <h5 className="text-purple-300 font-medium">{type.type}</h5>
                                    <p className="text-gray-400">{type.description}</p>
                                    {type.notes && <p className="text-gray-400 italic mt-1">{type.notes}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Variable Types */}
                {subsection.variables && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {language === 'en' ? "Variable Types" : "Types de Variables"}
                        </h4>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-800/50 rounded-lg">
                                <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="py-2 px-3 text-left text-sm text-gray-400">{language === 'en' ? 'Type' : 'Type'}</th>
                                    <th className="py-2 px-3 text-left text-sm text-gray-400">{language === 'en' ? 'Storage' : 'Stockage'}</th>
                                    <th className="py-2 px-3 text-left text-sm text-gray-400">{language === 'en' ? 'Lifecycle' : 'Cycle de vie'}</th>
                                    <th className="py-2 px-3 text-left text-sm text-gray-400">{language === 'en' ? 'Scope' : 'Portée'}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {subsection.variables.map((variable, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}>
                                        <td className="py-2 px-3 text-purple-300">{variable.type}</td>
                                        <td className="py-2 px-3 text-gray-300">{variable.storage}</td>
                                        <td className="py-2 px-3 text-gray-300">{variable.lifecycle}</td>
                                        <td className="py-2 px-3 text-gray-300">{variable.scope}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Type Conversions */}
                {subsection.conversions && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {language === 'en' ? "Type Conversions" : "Conversions de Type"}
                        </h4>
                        <div className="space-y-4">
                            {subsection.conversions.map((conversion, idx) => (
                                <div key={idx} className="bg-gray-800/70 p-4 rounded-lg">
                                    <h5 className="text-purple-300 font-medium mb-2">{conversion.type}</h5>
                                    <p className="text-gray-300 mb-2">{conversion.description}</p>
                                    {conversion.example && <CodeBlock code={conversion.example}/>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Examples (e.g., for Constants) */}
                {subsection.examples && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {language === 'en' ? "Examples" : "Exemples"}
                        </h4>
                        <div className="space-y-2 bg-gray-800/70 p-3 rounded-lg">
                            {subsection.examples.map((example, idx) => (
                                <div key={idx} className="mb-2">
                                    <code className="text-gray-300 font-mono">{example}</code>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
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
                    <React.Fragment key={idx}>
                        {renderSubsection(subsection, sectionIcons[section.title])}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    // Render Data Types and Variables section (second section)
    const renderDataTypes = () => {
        const section = content.sections[1];
        if (!section) return null;

        return (
            <div className="space-y-6">
                {section.subsections?.map((subsection, idx) => (
                    <React.Fragment key={idx}>
                        {renderSubsection(subsection, sectionIcons[section.title])}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    // Generic section renderer for placeholder sections
    const renderGenericSection = (sectionIndex) => {
        const section = content.sections[sectionIndex];
        if (!section) return null;

        return (
            <div className="space-y-6">
                {section.subsections?.map((subsection, idx) => (
                    <React.Fragment key={idx}>
                        {renderSubsection(subsection, sectionIcons[section.title])}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    // OOP Concepts section specialized renderer
    const renderOOPConcepts = () => {
        const section = content.sections[2];
        if (!section) return null;

        // Classes and objects subsection renderer
        const renderClassesAndObjects = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Code className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subsection.concepts?.map((item, idx) => (
                        <div key={idx} className="bg-gray-800/70 p-4 rounded-lg">
                            <h4 className="text-lg font-medium text-purple-300 mb-2">{item.concept}</h4>
                            <p className="text-gray-300">{item.description}</p>
                        </div>
                    ))}
                </div>

                {subsection.example && (
                    <div className="mt-6">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {language === 'en' ? 'Example Code' : 'Exemple de Code'}
                        </h4>
                        <CodeBlock code={subsection.example} />
                    </div>
                )}
            </div>
        );

        // Four pillars subsection renderer
        const renderPillars = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Box className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                <div className="space-y-8 mt-4">
                    {subsection.pillars?.map((pillar, idx) => (
                        <div key={idx} className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/30">
                            <h4 className="text-xl font-semibold text-purple-300 mb-3">{pillar.name}</h4>
                            <p className="text-gray-300 mb-4">{pillar.description}</p>

                            {pillar.definition && (
                                <div className="bg-gray-800/30 p-3 rounded border border-purple-500/20 mb-4">
                                    <p className="text-gray-300 italic">{pillar.definition}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {pillar.implementation && (
                                    <div className="bg-gray-800/30 p-3 rounded">
                                        <h5 className="text-md font-medium text-cyan-300 mb-2">
                                            {language === 'en' ? 'Implementation' : 'Implémentation'}
                                        </h5>
                                        <ul className="list-disc list-inside space-y-1">
                                            {pillar.implementation.map((item, itemIdx) => (
                                                <li key={itemIdx} className="text-gray-300">
                                                    {typeof item === 'object' && item.type ?
                                                        `${item.type}: ${item.description}` :
                                                        item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {pillar.benefits && (
                                    <div className="bg-gray-800/30 p-3 rounded">
                                        <h5 className="text-md font-medium text-cyan-300 mb-2">
                                            {language === 'en' ? 'Benefits' : 'Avantages'}
                                        </h5>
                                        <ul className="list-disc list-inside space-y-1">
                                            {pillar.benefits.map((item, itemIdx) => (
                                                <li key={itemIdx} className="text-gray-300">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {pillar.types && (
                                    <div className="bg-gray-800/30 p-3 rounded md:col-span-2">
                                        <h5 className="text-md font-medium text-cyan-300 mb-2">
                                            {language === 'en' ? 'Types' : 'Types'}
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {pillar.types.map((type, typeIdx) => (
                                                <div key={typeIdx} className="bg-gray-800/50 p-2 rounded">
                                                    <h6 className="text-pink-300 font-medium">{type.type}</h6>
                                                    <p className="text-gray-300 text-sm">{type.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {pillar.comparison && (
                                    <div className="bg-gray-800/30 p-3 rounded md:col-span-2">
                                        <h5 className="text-md font-medium text-cyan-300 mb-2">
                                            {language === 'en' ? 'Comparison' : 'Comparaison'}
                                        </h5>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full bg-gray-800/50 rounded-lg">
                                                <thead>
                                                <tr className="border-b border-gray-700">
                                                    <th className="py-2 px-3 text-left text-sm text-gray-400">
                                                        {language === 'en' ? 'Aspect' : 'Aspect'}
                                                    </th>
                                                    <th className="py-2 px-3 text-left text-sm text-gray-400">
                                                        {language === 'en' ? 'Method Overloading' : 'Surcharge de Méthode'}
                                                    </th>
                                                    <th className="py-2 px-3 text-left text-sm text-gray-400">
                                                        {language === 'en' ? 'Method Overriding' : 'Redéfinition de Méthode'}
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {pillar.comparison.map((row, rowIdx) => (
                                                    <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}>
                                                        <td className="py-2 px-3 text-purple-300">{row.aspect}</td>
                                                        <td className="py-2 px-3 text-gray-300">{row.methodOverloading}</td>
                                                        <td className="py-2 px-3 text-gray-300">{row.methodOverriding}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {pillar.example && (
                                <div className="mt-4">
                                    <h5 className="text-md font-medium text-cyan-300 mb-2">
                                        {language === 'en' ? 'Example' : 'Exemple'}
                                    </h5>
                                    <CodeBlock code={pillar.example} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );

        // Access modifiers subsection renderer
        const renderAccessModifiers = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Shield className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full bg-gray-800/50 rounded-lg">
                        <thead>
                        <tr className="border-b border-gray-700">
                            <th className="py-2 px-3 text-left text-sm text-gray-400">
                                {language === 'en' ? 'Modifier' : 'Modificateur'}
                            </th>
                            <th className="py-2 px-3 text-center text-sm text-gray-400">
                                {language === 'en' ? 'Same Class' : 'Même Classe'}
                            </th>
                            <th className="py-2 px-3 text-center text-sm text-gray-400">
                                {language === 'en' ? 'Same Package' : 'Même Package'}
                            </th>
                            <th className="py-2 px-3 text-center text-sm text-gray-400">
                                {language === 'en' ? 'Subclass' : 'Sous-classe'}
                            </th>
                            <th className="py-2 px-3 text-center text-sm text-gray-400">
                                {language === 'en' ? 'World' : 'Monde'}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {subsection.modifiers.map((mod, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}>
                                <td className="py-2 px-3 text-pink-300 font-medium">{mod.modifier}</td>
                                <td className="py-2 px-3 text-center">
                                    {mod.class ?
                                        <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto" /> :
                                        <XCircle className="w-5 h-5 text-red-400 mx-auto" />}
                                </td>
                                <td className="py-2 px-3 text-center">
                                    {mod.package ?
                                        <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto" /> :
                                        <XCircle className="w-5 h-5 text-red-400 mx-auto" />}
                                </td>
                                <td className="py-2 px-3 text-center">
                                    {mod.subclass ?
                                        <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto" /> :
                                        <XCircle className="w-5 h-5 text-red-400 mx-auto" />}
                                </td>
                                <td className="py-2 px-3 text-center">
                                    {mod.world ?
                                        <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto" /> :
                                        <XCircle className="w-5 h-5 text-red-400 mx-auto" />}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );

        // Non-access modifiers subsection renderer
        const renderNonAccessModifiers = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Code className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                <div className="space-y-4 mt-4">
                    {subsection.modifiers.map((mod, idx) => (
                        <div key={idx} className="bg-gray-800/70 p-4 rounded-lg">
                            <h4 className="text-lg font-medium text-pink-300 mb-2">
                                <code className="bg-gray-900/70 px-2 py-1 rounded">{mod.modifier}</code>
                            </h4>

                            {mod.description && (
                                <p className="text-gray-300 mb-3">{mod.description}</p>
                            )}

                            {mod.useCases && (
                                <div className="ml-4">
                                    <h5 className="text-sm font-medium text-cyan-300 mb-2">
                                        {language === 'en' ? 'Use Cases:' : 'Cas d\'utilisation:'}
                                    </h5>
                                    <ul className="list-disc list-inside space-y-1">
                                        {mod.useCases.map((useCase, caseIdx) => (
                                            <li key={caseIdx} className="text-gray-300">{useCase}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );

        // Render specialized components based on subsection type
        return (
            <div className="space-y-6">
                {section.subsections[0] && renderClassesAndObjects(section.subsections[0])}
                {section.subsections[1] && renderPillars(section.subsections[1])}
                {section.subsections[2] && renderAccessModifiers(section.subsections[2])}
                {section.subsections[3] && renderNonAccessModifiers(section.subsections[3])}
            </div>
        );
    };

    // Memory Management section specialized renderer
    const renderMemoryManagement = () => {
        const section = content.sections[3];
        if (!section) return null;

        // Efficiently render Stack vs Heap Memory subsection
        const renderMemoryTypes = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <MemoryStick className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {subsection.memory.map((memory, idx) => (
                        <div key={idx} className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/30 flex flex-col h-full">
                            <h4 className="text-xl font-semibold text-purple-300 mb-3">{memory.type}</h4>

                            <div className="flex-grow">
                                <h5 className="text-sm font-medium text-cyan-300 mb-2">
                                    {language === 'en' ? 'Characteristics:' : 'Caractéristiques:'}
                                </h5>
                                <ul className="list-disc list-inside space-y-1 mb-4">
                                    {memory.characteristics.map((char, charIdx) => (
                                        <li key={charIdx} className="text-gray-300">{char}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-3">
                                <h5 className="text-sm font-medium text-cyan-300 mb-2">
                                    {language === 'en' ? 'Example:' : 'Exemple:'}
                                </h5>
                                <CodeBlock code={memory.example} />
                            </div>
                        </div>
                    ))}
                </div>

                {subsection.diagram && (
                    <div className="mt-6 bg-gray-800/70 p-4 rounded-lg">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {language === 'en' ? 'Memory Diagram:' : 'Diagramme de Mémoire:'}
                        </h4>
                        <pre className="text-gray-300 text-sm font-mono overflow-x-auto whitespace-pre">
                            {subsection.diagram}
                        </pre>
                    </div>
                )}
            </div>
        );

        // Efficiently render Variable Storage subsection
        const renderVariableStorage = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Database className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full bg-gray-800/50 rounded-lg">
                        <thead>
                        <tr className="border-b border-gray-700">
                            <th className="py-2 px-4 text-left text-sm text-gray-400">{language === 'en' ? 'Type' : 'Type'}</th>
                            <th className="py-2 px-4 text-left text-sm text-gray-400">{language === 'en' ? 'Storage' : 'Stockage'}</th>
                            <th className="py-2 px-4 text-left text-sm text-gray-400">{language === 'en' ? 'Lifecycle' : 'Cycle de vie'}</th>
                            <th className="py-2 px-4 text-left text-sm text-gray-400">{language === 'en' ? 'Scope' : 'Portée'}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {subsection.variables.map((variable, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}>
                                <td className="py-2 px-4 text-purple-300 font-medium">{variable.type}</td>
                                <td className="py-2 px-4 text-gray-300">{variable.storage}</td>
                                <td className="py-2 px-4 text-gray-300">{variable.lifecycle}</td>
                                <td className="py-2 px-4 text-gray-300">{variable.scope}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );

        // Efficiently render Garbage Collection subsection
        const renderGarbageCollection = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <GitBranch className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                {/* Details about GC */}
                {subsection.details && (
                    <div className="bg-gray-800/70 p-4 rounded-lg mb-6">
                        <ul className="list-disc list-inside space-y-2">
                            {subsection.details.map((detail, idx) => (
                                <li key={idx} className="text-gray-300">{detail}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* GC Process */}
                {subsection.process && (
                    <div className="mt-6">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {language === 'en' ? 'Garbage Collection Process:' : 'Processus de Garbage Collection:'}
                        </h4>
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            {subsection.process.map((step, idx) => (
                                <div key={idx} className="flex-1 bg-gray-800/70 p-4 rounded-lg border-l-4 border-cyan-500">
                                    <div className="text-cyan-300 font-medium mb-1">{step.step}</div>
                                    <p className="text-gray-300">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* GC Collectors */}
                {subsection.collectors && (
                    <div className="mt-6">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {language === 'en' ? 'Garbage Collectors:' : 'Collecteurs de Garbage:'}
                        </h4>
                        <div className="space-y-3">
                            {subsection.collectors.map((collector, idx) => (
                                <div key={idx} className="bg-gray-800/70 p-4 rounded-lg">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                                        <h5 className="text-purple-300 font-medium">{collector.name}</h5>
                                        <code className="bg-gray-900/50 px-2 py-1 rounded text-pink-300 text-xs font-mono">
                                            {collector.flag}
                                        </code>
                                    </div>
                                    <p className="text-gray-300">{collector.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* GC Tuning */}
                {subsection.tuning && (
                    <div className="mt-6">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {language === 'en' ? 'Tuning Tips:' : 'Conseils d\'optimisation:'}
                        </h4>
                        <div className="bg-gray-800/70 p-4 rounded-lg">
                            <ul className="list-disc list-inside space-y-2">
                                {subsection.tuning.map((tip, idx) => (
                                    <li key={idx} className="text-gray-300 whitespace-pre-wrap"
                                        dangerouslySetInnerHTML={{
                                            __html: tip.replace(/`([^`]+)`/g, '<code class="bg-gray-900/50 px-1 py-0.5 rounded text-pink-300 font-mono">$1</code>')
                                        }}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        );

        // Efficiently render all subsections with direct access by index
        return (
            <div className="space-y-6">
                {section.subsections[0] && renderMemoryTypes(section.subsections[0])}
                {section.subsections[1] && renderVariableStorage(section.subsections[1])}
                {section.subsections[2] && renderGarbageCollection(section.subsections[2])}
            </div>
        );
    };
    const renderConstructors = () => renderGenericSection(4);
    const renderKeywords = () => renderGenericSection(5);
    const renderClassesAndInterfaces = () => renderGenericSection(6);
    const renderStringHandling = () => renderGenericSection(7);
    const renderPackagesAndAccess = () => renderGenericSection(8);
    const renderBestPractices = () => renderGenericSection(9);
    const renderInterviewFocus = () => renderGenericSection(10);
    const renderInterviewFAQs = () => renderGenericSection(11);

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Language Selector */}
            <LanguageSelector/>

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
            <TabNavigation/>

            {/* Content - Each section with its specific renderer */}
            <div className="space-y-8">
                {activeSection === 0 ? renderCoreConcepts() :
                    activeSection === 1 ? renderDataTypes() :
                        activeSection === 2 ? renderOOPConcepts() :
                            activeSection === 3 ? renderMemoryManagement() :
                                activeSection === 4 ? renderConstructors() :
                                    activeSection === 5 ? renderKeywords() :
                                        activeSection === 6 ? renderClassesAndInterfaces() :
                                            activeSection === 7 ? renderStringHandling() :
                                                activeSection === 8 ? renderPackagesAndAccess() :
                                                    activeSection === 9 ? renderBestPractices() :
                                                        activeSection === 10 ? renderInterviewFocus() :
                                                            renderInterviewFAQs()}
            </div>
        </div>
    );
};

export default JavaFundamentalsPage;
