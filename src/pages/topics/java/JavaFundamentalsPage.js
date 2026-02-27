import React, {useState, memo, useMemo} from 'react';
import {
    Book,
    Code,
    Target,
    Database,
    Server,
    Layout,
    Box,
    Cpu,
    MemoryStick,
    Clock,
    HelpCircle,
    GitBranch,
    Shield,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Lock,
} from 'lucide-react';
import javaFundamentalsJsonEn from '../../../data/java/java-fundamentals.json';
import CodeBlock from '../../../components/CodeBlock';
import EnhancedInterviewFAQs from "./EnhancedInterviewFAQs";

const JavaFundamentalsPage = () => {

    const content = javaFundamentalsJsonEn;

    const tabs = [
        {id: 'core-concepts', title: 'Core Concepts', icon: <Cpu className="w-4 h-4"/>},
        {id: 'data-types', title: 'Data Types', icon: <Database className="w-4 h-4"/>},
        {id: 'oop', title: 'OOP', icon: <Box className="w-4 h-4"/>},
        {id: 'memory', title: 'Memory', icon: <MemoryStick className="w-4 h-4"/>},
        {id: 'constructors', title: 'Constructors', icon: <Layout className="w-4 h-4"/>},
        {id: 'keywords', title: 'Keywords', icon: <Code className="w-4 h-4"/>},
        {id: 'classes', title: 'Classes & Interfaces', icon: <Server className="w-4 h-4"/>},
        {id: 'strings', title: 'String Handling', icon: <Book className="w-4 h-4"/>},
        {id: 'packages', title: 'Packages', icon: <GitBranch className="w-4 h-4"/>},
        {id: 'best-practices', title: 'Best Practices', icon: <Clock className="w-4 h-4"/>},
        {id: 'interview-focus', title: 'Interview Focus', icon: <Target className="w-4 h-4"/>},
        {id: 'interview-faqs', title: 'Interview FAQs', icon: <HelpCircle className="w-4 h-4"/>}
    ];

    // Active section index
    const [activeTab, setActiveTab] = useState('core-concepts');

    // Memoized callback for rendering practice category - moved from renderBestPractices
    const RenderPracticeCategory = memo(({category, conventions, practices, principles}) => {
        // Determine the right items array to render based on what's available
        const items = conventions || practices || principles;
        if (!items?.length) return null;

        // Memoized category icon mapping for performance
        const categoryIcons = {
            'Naming Conventions': <Code className="w-5 h-5 text-cyan-400"/>,
            'Conventions de Nommage': <Code className="w-5 h-5 text-cyan-400"/>,
            'Code Organization': <Layout className="w-5 h-5 text-cyan-400"/>,
            'Organisation du Code': <Layout className="w-5 h-5 text-cyan-400"/>,
            'Encapsulation': <Shield className="w-5 h-5 text-cyan-400"/>,
            'Design Principles': <Box className="w-5 h-5 text-cyan-400"/>,
            'Principes de Conception': <Box className="w-5 h-5 text-cyan-400"/>,
            'Immutability': <Lock className="w-5 h-5 text-cyan-400"/>,
            'Immutabilité': <Lock className="w-5 h-5 text-cyan-400"/>,
            'Error Handling': <AlertTriangle className="w-5 h-5 text-cyan-400"/>,
            'Gestion des Erreurs': <AlertTriangle className="w-5 h-5 text-cyan-400"/>,
            'Memory Management': <MemoryStick className="w-5 h-5 text-cyan-400"/>,
            'Gestion de la Mémoire': <MemoryStick className="w-5 h-5 text-cyan-400"/>,
            'Coding Principles': <GitBranch className="w-5 h-5 text-cyan-400"/>,
            'Principes de Codage': <GitBranch className="w-5 h-5 text-cyan-400"/>
        };

        // Get the appropriate icon, or use a default
        const icon = categoryIcons[category] || <Code className="w-5 h-5 text-cyan-400"/>;

        return (
            <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        {icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{category}</h3>
                </div>

                {/* Render simple list items */}
                {Array.isArray(items) && !items[0]?.name && (
                    <ul className="space-y-2 text-gray-300 list-disc list-inside">
                        {items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                )}

                {/* Render complex items with name/description */}
                {Array.isArray(items) && items[0]?.name && (
                    <div className="space-y-3">
                        {items.map((item, idx) => (
                            <div key={idx} className="bg-gray-800/70 p-3 rounded-lg">
                                <h4 className="text-purple-300 font-medium mb-1">{item.name}</h4>
                                <p className="text-gray-300">{item.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    });

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
        'Packages and Access Control': <GitBranch className="w-5 h-5"/>,
        'Best Practices': <Clock className="w-5 h-5"/>,
        'Interview Focus Areas': <Box className="w-5 h-5"/>,
        'Interview FAQs': <Book className="w-5 h-5"/>
    }), []);

    // Tab Navigation component
    const TabNavigation = () => (
        <div className="mb-4 flex flex-wrap gap-2 p-1 bg-gray-800/50 rounded-lg border border-gray-700/50">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                        activeTab === tab.id
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                    }`}
                >
                    {tab.icon}
                    {tab.title}
                </button>
            ))}
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'core-concepts':
                return renderCoreConcepts();
            case 'data-types':
                return renderDataTypes();
            case 'oop':
                return renderOOPConcepts();
            case 'memory':
                return renderMemoryManagement();
            case 'constructors':
                return renderConstructors();
            case 'keywords':
                return renderKeywords();
            case 'classes':
                return renderClassesAndInterfaces();
            case 'strings':
                return renderStringHandling();
            case 'packages':
                return renderPackagesAndAccess();
            case 'best-practices':
                return renderBestPractices();
            case 'interview-focus':
                return renderInterviewFocus();
            case 'interview-faqs':
                return renderInterviewFAQs();
            default:
                return renderCoreConcepts(); // Default fallback
        }
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
                            {'Key Features'}
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
                            {'Components'}
                        </h4>
                        <div className="space-y-4">
                            {subsection.components.map((component, idx) => (
                                <div key={idx} className="bg-gray-800/70 p-4 rounded-lg">
                                    <h5 className="text-purple-300 font-medium mb-2">{component.name}</h5>
                                    <p className="text-gray-300 mb-3">{component.description || component.function}</p>

                                    {component.tools && (
                                        <div className="mt-2">
                                            <h6 className="text-sm font-medium text-gray-400 mb-2">
                                                {'Tools:'}
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
                                                {'Includes:'}
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
                                                {'Features:'}
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
                            {'Process Steps'}
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
                            {'Code Example'}
                        </h4>
                        <CodeBlock code={subsection.code}/>

                        {subsection.keywords && (
                            <div className="mt-3">
                                <h6 className="text-sm font-medium text-gray-400 mb-2">
                                    {'Keywords:'}
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
                            {'Component Diagram'}
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
                            {'Primitive Types'}
                        </h4>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-800/50 rounded-lg">
                                <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="py-2 px-3 text-left text-sm text-gray-400">{'Type'}</th>
                                    <th className="py-2 px-3 text-left text-sm text-gray-400">{'Size'}</th>
                                    <th className="py-2 px-3 text-left text-sm text-gray-400">{'Range'}</th>
                                    <th className="py-2 px-3 text-left text-sm text-gray-400">{'Default'}</th>
                                    <th className="py-2 px-3 text-left text-sm text-gray-400">{'Usage'}</th>
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
                            {'Types'}
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
                            {'Variable Types'}
                        </h4>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-800/50 rounded-lg">
                                <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="py-2 px-3 text-left text-sm text-gray-400">{'Type'}</th>
                                    <th className="py-2 px-3 text-left text-sm text-gray-400">{'Storage'}</th>
                                    <th className="py-2 px-3 text-left text-sm text-gray-400">{'Lifecycle'}</th>
                                    <th className="py-2 px-3 text-left text-sm text-gray-400">{'Scope'}</th>
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
                            {'Type Conversions'}
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
                            {'Examples'}
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

    // OOP Concepts section specialized renderer
    const renderOOPConcepts = () => {
        const section = content.sections[2];
        if (!section) return null;

        // Classes and objects subsection renderer
        const renderClassesAndObjects = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Code className="w-5 h-5 text-cyan-400"/>
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
                            {'Example Code'}
                        </h4>
                        <CodeBlock code={subsection.example}/>
                    </div>
                )}
            </div>
        );

        // Four pillars subsection renderer
        const renderPillars = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Box className="w-5 h-5 text-cyan-400"/>
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
                                            {'Implementation'}
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
                                            {'Benefits'}
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
                                            {'Types'}
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
                                            {'Comparison'}
                                        </h5>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full bg-gray-800/50 rounded-lg">
                                                <thead>
                                                <tr className="border-b border-gray-700">
                                                    <th className="py-2 px-3 text-left text-sm text-gray-400">
                                                        {'Aspect'}
                                                    </th>
                                                    <th className="py-2 px-3 text-left text-sm text-gray-400">
                                                        {'Method Overloading'}
                                                    </th>
                                                    <th className="py-2 px-3 text-left text-sm text-gray-400">
                                                        {'Method Overriding'}
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {pillar.comparison.map((row, rowIdx) => (
                                                    <tr key={rowIdx}
                                                        className={rowIdx % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}>
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
                                        {'Example'}
                                    </h5>
                                    <CodeBlock code={pillar.example}/>
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
                        <Shield className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full bg-gray-800/50 rounded-lg">
                        <thead>
                        <tr className="border-b border-gray-700">
                            <th className="py-2 px-3 text-left text-sm text-gray-400">
                                {'Modifier'}
                            </th>
                            <th className="py-2 px-3 text-center text-sm text-gray-400">
                                {'Same Class'}
                            </th>
                            <th className="py-2 px-3 text-center text-sm text-gray-400">
                                {'Same Package'}
                            </th>
                            <th className="py-2 px-3 text-center text-sm text-gray-400">
                                {'Subclass'}
                            </th>
                            <th className="py-2 px-3 text-center text-sm text-gray-400">
                                {'World'}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {subsection.modifiers.map((mod, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}>
                                <td className="py-2 px-3 text-pink-300 font-medium">{mod.modifier}</td>
                                <td className="py-2 px-3 text-center">
                                    {mod.class ?
                                        <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto"/> :
                                        <XCircle className="w-5 h-5 text-red-400 mx-auto"/>}
                                </td>
                                <td className="py-2 px-3 text-center">
                                    {mod.package ?
                                        <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto"/> :
                                        <XCircle className="w-5 h-5 text-red-400 mx-auto"/>}
                                </td>
                                <td className="py-2 px-3 text-center">
                                    {mod.subclass ?
                                        <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto"/> :
                                        <XCircle className="w-5 h-5 text-red-400 mx-auto"/>}
                                </td>
                                <td className="py-2 px-3 text-center">
                                    {mod.world ?
                                        <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto"/> :
                                        <XCircle className="w-5 h-5 text-red-400 mx-auto"/>}
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
                        <Code className="w-5 h-5 text-cyan-400"/>
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
                                        Use Cases:
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
                        <MemoryStick className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {subsection.memory.map((memory, idx) => (
                        <div key={idx}
                             className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/30 flex flex-col h-full">
                            <h4 className="text-xl font-semibold text-purple-300 mb-3">{memory.type}</h4>

                            <div className="flex-grow">
                                <h5 className="text-sm font-medium text-cyan-300 mb-2">
                                    {'Characteristics:'}
                                </h5>
                                <ul className="list-disc list-inside space-y-1 mb-4">
                                    {memory.characteristics.map((char, charIdx) => (
                                        <li key={charIdx} className="text-gray-300">{char}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-3">
                                <h5 className="text-sm font-medium text-cyan-300 mb-2">
                                    {'Example:'}
                                </h5>
                                <CodeBlock code={memory.example}/>
                            </div>
                        </div>
                    ))}
                </div>

                {subsection.diagram && (
                    <div className="mt-6 bg-gray-800/70 p-4 rounded-lg">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {'Memory Diagram:'}
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
                        <Database className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full bg-gray-800/50 rounded-lg">
                        <thead>
                        <tr className="border-b border-gray-700">
                            <th className="py-2 px-4 text-left text-sm text-gray-400">{'Type'}</th>
                            <th className="py-2 px-4 text-left text-sm text-gray-400">{'Storage'}</th>
                            <th className="py-2 px-4 text-left text-sm text-gray-400">{'Lifecycle'}</th>
                            <th className="py-2 px-4 text-left text-sm text-gray-400">{'Scope'}</th>
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
                        <GitBranch className="w-5 h-5 text-cyan-400"/>
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
                            {'Garbage Collection Process:'}
                        </h4>
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            {subsection.process.map((step, idx) => (
                                <div key={idx}
                                     className="flex-1 bg-gray-800/70 p-4 rounded-lg border-l-4 border-cyan-500">
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
                            {'Garbage Collectors:'}
                        </h4>
                        <div className="space-y-3">
                            {subsection.collectors.map((collector, idx) => (
                                <div key={idx} className="bg-gray-800/70 p-4 rounded-lg">
                                    <div
                                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                                        <h5 className="text-purple-300 font-medium">{collector.name}</h5>
                                        <code
                                            className="bg-gray-900/50 px-2 py-1 rounded text-pink-300 text-xs font-mono">
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
                            Tuning Tips:
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

    const renderConstructors = () => {
        const section = content.sections[4];
        if (!section) return null;

        // Constructor types subsection renderer
        const renderConstructorTypes = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Layout className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {subsection.types?.map((type, idx) => (
                        <div key={idx} className="bg-gray-800/70 p-4 rounded-lg border border-pink-500/20">
                            <h4 className="text-lg font-medium text-pink-300 mb-2">{type.type}</h4>
                            <p className="text-gray-300 mb-2">{type.description}</p>
                            {type.notes && <p className="text-gray-400 text-sm italic">{type.notes}</p>}
                        </div>
                    ))}
                </div>

                {subsection.example && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {'Example Code'}
                        </h4>
                        <CodeBlock code={subsection.example}/>
                    </div>
                )}
            </div>
        );

        // Constructor chaining subsection renderer
        const renderConstructorChaining = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <GitBranch className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                <div className="mt-4">
                    <div className="bg-gray-800/70 p-4 rounded-lg border-l-4 border-cyan-500">
                        <div className="mb-3">
                            <h4 className="text-md font-semibold text-cyan-300 mb-2">
                                Constructor Chaining Pattern
                            </h4>
                            <p className="text-gray-300">
                                Constructor chaining allows for code reuse across constructors using this() calls:
                            </p>
                        </div>
                        <CodeBlock code={subsection.example}/>
                    </div>
                </div>
            </div>
        );

        // Render all subsections with specialized renderers
        return (
            <div className="space-y-6">
                {section.subsections[0] && renderConstructorTypes(section.subsections[0])}
                {section.subsections[1] && renderConstructorChaining(section.subsections[1])}
            </div>
        );
    };

    const renderKeywords = () => {
        const section = content.sections[5];
        if (!section) return null;

        // Specialized renderer for 'this' keyword subsection
        const renderThisKeyword = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Code className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                {subsection.uses && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {'Common Uses:'}
                        </h4>
                        <ul className="list-disc list-inside space-y-2 bg-gray-800/70 p-3 rounded-lg">
                            {subsection.uses.map((use, idx) => (
                                <li key={idx} className="text-gray-300">{use}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {subsection.example && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {'Example:'}
                        </h4>
                        <CodeBlock code={subsection.example}/>
                    </div>
                )}
            </div>
        );

        // Specialized renderer for 'super' keyword subsection
        const renderSuperKeyword = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Server className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                {subsection.uses && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {'Primary Uses:'}
                        </h4>
                        <ul className="list-disc list-inside space-y-2 bg-gray-800/70 p-3 rounded-lg">
                            {subsection.uses.map((use, idx) => (
                                <li key={idx} className="text-gray-300">{use}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {subsection.example && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {'Example:'}
                        </h4>
                        <CodeBlock code={subsection.example}/>
                    </div>
                )}
            </div>
        );

        // Specialized renderer for 'final' keyword subsection
        const renderFinalKeyword = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Shield className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                {subsection.applications && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {'Applications:'}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {subsection.applications.map((app, idx) => (
                                <div key={idx} className="bg-gray-800/70 p-3 rounded-lg">
                                    <h5 className="text-purple-300 font-medium mb-1">{app.type}</h5>
                                    <p className="text-gray-300 text-sm">{app.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {subsection.example && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {'Examples:'}
                        </h4>
                        <CodeBlock code={subsection.example}/>
                    </div>
                )}
            </div>
        );

        // Specialized renderer for 'static' keyword subsection
        const renderStaticKeyword = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Layout className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                {subsection.applications && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {'Applications:'}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {subsection.applications.map((app, idx) => (
                                <div key={idx} className="bg-gray-800/70 p-3 rounded-lg">
                                    <h5 className="text-purple-300 font-medium mb-1">{app.type}</h5>
                                    <p className="text-gray-300 text-sm">{app.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {subsection.example && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {'Example:'}
                        </h4>
                        <CodeBlock code={subsection.example}/>
                    </div>
                )}
            </div>
        );

        // Map of specialized renderers by subsection index
        const specializedRenderers = [
            renderThisKeyword,
            renderSuperKeyword,
            renderFinalKeyword,
            renderStaticKeyword
        ];

        // Render section using specialized renderers when available
        return (
            <div className="space-y-6">
                {section.subsections?.map((subsection, idx) => {
                    // Use specialized renderer if available, otherwise fall back to generic
                    const renderer = idx < specializedRenderers.length
                        ? specializedRenderers[idx]
                        : (s) => renderSubsection(s, sectionIcons[section.title]);

                    return <React.Fragment key={idx}>{renderer(subsection)}</React.Fragment>;
                })}
            </div>
        );
    };

    const renderClassesAndInterfaces = () => {
        const section = content.sections[6];
        if (!section) return null;

        // Class Types renderer - optimized for performance with direct array access
        const renderClassTypes = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Server className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                <div className="space-y-4 mt-4">
                    {subsection.types?.map((type, idx) => (
                        <div key={idx} className="bg-gray-800/70 p-4 rounded-lg">
                            <h4 className="text-lg font-medium text-purple-300 mb-2">{type.type}</h4>
                            <p className="text-gray-300 mb-2">{type.description}</p>
                            {type.notes && <p className="text-gray-400 italic text-sm">{type.notes}</p>}
                        </div>
                    ))}
                </div>

                {subsection.example && (
                    <div className="mt-6">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {'Example'}
                        </h4>
                        <CodeBlock code={subsection.example}/>
                    </div>
                )}
            </div>
        );

        // Interfaces renderer - reusing DOM structure with different content
        const renderInterfaces = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Code className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                {subsection.notes && (
                    <div className="bg-gray-800/70 p-4 rounded-lg mb-4">
                        <ul className="list-disc list-inside space-y-1">
                            {subsection.notes.map((note, idx) => (
                                <li key={idx} className="text-gray-300">{note}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {subsection.example && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {'Example'}
                        </h4>
                        <CodeBlock code={subsection.example}/>
                    </div>
                )}
            </div>
        );

        // Enum Types renderer - optimized DOM structure
        const renderEnumTypes = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Box className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                {subsection.example && (
                    <div className="mt-4">
                        <CodeBlock code={subsection.example}/>
                    </div>
                )}
            </div>
        );

        // Enum with Fields renderer - same structure with different content
        const renderEnumWithFields = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Database className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                {subsection.example && (
                    <div className="mt-4">
                        <CodeBlock code={subsection.example}/>
                    </div>
                )}
            </div>
        );

        // Enum Methods renderer
        const renderEnumMethods = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Code className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                {subsection.methods && (
                    <div className="mt-4 space-y-3">
                        {subsection.methods.map((method, idx) => (
                            <div key={idx} className="bg-gray-800/70 p-3 rounded-lg">
                                <code className="text-pink-300 font-mono">{method.method}</code>
                                <p className="text-gray-300 text-sm mt-1">{method.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {subsection.example && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {'Example'}
                        </h4>
                        <CodeBlock code={subsection.example}/>
                    </div>
                )}
            </div>
        );

        // Using direct array access for performance instead of find/filter
        return (
            <div className="space-y-6">
                {section.subsections[0] && renderClassTypes(section.subsections[0])}
                {section.subsections[1] && renderInterfaces(section.subsections[1])}
                {section.subsections[2] && renderEnumTypes(section.subsections[2])}
                {section.subsections[3] && renderEnumWithFields(section.subsections[3])}
                {section.subsections[4] && renderEnumMethods(section.subsections[4])}
            </div>
        );
    };

    const renderStringHandling = () => {
        const section = content.sections[7]; // Direct array access is O(1)
        if (!section) return null;

        // Specialized renderer for String immutability subsection
        const renderImmutability = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Book className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                {subsection.example && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {'Example'}
                        </h4>

                        {/* String immutability visualization */}
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className="flex-1 bg-gray-800/70 p-4 rounded-lg">
                                <CodeBlock code={subsection.example}/>
                            </div>

                            <div className="flex-1 bg-gray-800/70 p-4 rounded-lg flex items-center">
                                <div className="w-full">
                                    <div className="text-center mb-4 text-gray-300">
                                        {'Result Visualization'}
                                    </div>
                                    <div className="flex items-center justify-center gap-3 mb-3">
                                        <div
                                            className="px-4 py-2 bg-gray-900 rounded border border-gray-700 text-cyan-300 font-mono whitespace-nowrap">
                                            s = "Hello"
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div className="text-2xl text-gray-500 mr-3">→</div>
                                        <div
                                            className="text-gray-400 font-mono p-2 border border-dashed border-gray-700 rounded">
                                            {'Output: "Hello"'}
                                        </div>
                                    </div>
                                    <div className="mt-4 text-center text-gray-400 text-sm">
                                        String object remains unchanged
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );

        // Specialized renderer for String pool subsection
        const renderStringPool = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Database className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                {subsection.example && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {'Example'}
                        </h4>

                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="flex-1">
                                <CodeBlock code={subsection.example}/>
                            </div>

                            <div className="flex-1">
                                {/* String Pool Visualization */}
                                <div className="bg-gray-800/70 p-4 rounded-lg">
                                    <h5 className="text-center text-gray-300 mb-3">
                                        {'String Pool Visualization'}
                                    </h5>

                                    <div className="relative bg-gray-900 p-4 rounded-lg border border-gray-700">
                                        <div className="text-gray-400 text-sm mb-4 border-b border-gray-700 pb-2">
                                            {'Heap Memory'}
                                        </div>

                                        {/* String Pool */}
                                        <div className="absolute right-2 top-2 text-xs text-cyan-400">
                                            {'String Pool'}
                                        </div>
                                        <div
                                            className="border border-dashed border-cyan-600/40 rounded-lg p-3 mb-3 bg-cyan-900/10">
                                            <div className="px-3 py-2 bg-gray-800 rounded mb-2 text-center">
                                                <div
                                                    className="text-xs text-gray-500 mb-1">{'Reference'}</div>
                                                <div className="font-mono text-gray-300">s1, s2 → "Hello"</div>
                                            </div>
                                        </div>

                                        {/* Outside pool */}
                                        <div className="px-3 py-2 bg-gray-800 rounded text-center">
                                            <div
                                                className="text-xs text-gray-500 mb-1">{'Outside Pool'}</div>
                                            <div className="font-mono text-gray-300">s3 → new String("Hello")</div>
                                        </div>
                                    </div>

                                    <div className="mt-4 text-center">
                                        <div className="mb-2 text-purple-300 font-mono">s1 == s2 → true</div>
                                        <div className="mb-2 text-red-300 font-mono">s1 == s3 → false</div>
                                        <div className="text-green-300 font-mono">s1.equals(s3) → true</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );

        // Specialized renderer for comparing String implementations
        const renderStringComparison = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <GitBranch className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                {/* Comparison table */}
                {subsection.comparison && (
                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full bg-gray-800/50 rounded-lg">
                            <thead>
                            <tr className="border-b border-gray-700">
                                <th className="py-2 px-3 text-left text-sm text-gray-400">
                                    {'Class'}
                                </th>
                                <th className="py-2 px-3 text-center text-sm text-gray-400">
                                    {'Thread Safe'}
                                </th>
                                <th className="py-2 px-3 text-center text-sm text-gray-400">
                                    {'Mutable'}
                                </th>
                                <th className="py-2 px-3 text-left text-sm text-gray-400">
                                    {'Performance'}
                                </th>
                                <th className="py-2 px-3 text-left text-sm text-gray-400">
                                    Use Case
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {subsection.comparison.map((item, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}>
                                    <td className="py-2 px-3 font-mono text-purple-300 font-medium">
                                        {item.class}
                                    </td>
                                    <td className="py-2 px-3 text-center">
                                        {item.threadSafe ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto"/>
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-400 mx-auto"/>
                                        )}
                                    </td>
                                    <td className="py-2 px-3 text-center">
                                        {item.mutable ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto"/>
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-400 mx-auto"/>
                                        )}
                                    </td>
                                    <td className="py-2 px-3 text-gray-300">
                                        {item.performance}
                                    </td>
                                    <td className="py-2 px-3 text-gray-300">
                                        {item.useCase}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Code example */}
                {subsection.example && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-cyan-300 mb-3">
                            {'Example'}
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <h5 className="text-pink-300 mb-2">
                                    {'Inefficient String Concatenation'}
                                </h5>
                                <CodeBlock code={subsection.example.split("// StringBuilder")[0]}/>
                            </div>
                            <div>
                                <h5 className="text-green-300 mb-2">
                                    {'Efficient with StringBuilder'}
                                </h5>
                                <CodeBlock code={"// StringBuilder" + subsection.example.split("// StringBuilder")[1]}/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );

        // Render the appropriate subsection based on the content
        const getSubsectionRenderer = (subsection, idx) => {
            if (subsection.title.includes('Immutability') || subsection.title.includes('Immutabilité')) {
                return renderImmutability(subsection);
            } else if (subsection.title.includes('Pool')) {
                return renderStringPool(subsection);
            } else if (
                subsection.title.includes('StringBuilder') ||
                subsection.title.includes('StringBuffer')
            ) {
                return renderStringComparison(subsection);
            }
            // Fallback to generic renderer
            return renderSubsection(subsection, sectionIcons[section.title]);
        };

        return (
            <div className="space-y-6">
                {section.subsections?.map((subsection, idx) => (
                    <React.Fragment key={idx}>
                        {getSubsectionRenderer(subsection, idx)}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    const renderPackagesAndAccess = () => {
        const section = content.sections[8];
        if (!section) return null;

        // Specialized renderer for Package Declaration
        const renderPackageDeclaration = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <GitBranch className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                {subsection.example && (
                    <div className="mt-4">
                        <div className="bg-gray-800/70 p-4 rounded-lg border-l-4 border-cyan-500">
                            <code className="text-gray-300 font-mono">
                                {subsection.example}
                            </code>
                        </div>
                        <p className="text-gray-400 text-sm mt-2">
                            Package declaration must be the first statement in a Java file (excluding comments).
                        </p>
                    </div>
                )}
            </div>
        );

        // Optimized renderer for Import Statements with categorization
        const renderImportStatements = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Database className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                {subsection.examples && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {subsection.examples.map((example, idx) => (
                            <div key={idx} className="bg-gray-800/70 p-4 rounded-lg border-l-4 border-pink-500">
                                <h4 className="text-sm font-medium text-cyan-300 mb-2">{example.description}</h4>
                                <div className="bg-gray-900/50 p-2 rounded">
                                    <code className="text-pink-300 font-mono text-sm">
                                        {example.code}
                                    </code>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="bg-gray-700/30 p-3 rounded-lg mt-4">
                    <h4 className="text-sm font-medium text-cyan-300 mb-2">
                        {'Best Practices'}
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                        <li>Avoid using wildcard imports (import java.util.*) in production code</li>
                        <li>Organize imports to improve code readability</li>
                        <li>Use static imports sparingly to avoid confusion</li>
                    </ul>
                </div>
            </div>
        );

        // Efficient renderer for Package Visibility with visual table
        const renderPackageVisibility = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Shield className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                {subsection.rules && (
                    <div className="space-y-3 mt-4">
                        {subsection.rules.map((rule, idx) => (
                            <div key={idx}
                                 className="bg-gray-800/70 p-3 rounded-lg border-l-4 border-yellow-500 flex items-start">
                                <div className="bg-yellow-500/20 p-1 rounded-full mr-3 mt-1">
                                    <span className="text-yellow-300 font-bold text-xs">{idx + 1}</span>
                                </div>
                                <p className="text-gray-300">{rule}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="overflow-x-auto mt-6">
                    <table className="min-w-full bg-gray-800/50 rounded-lg">
                        <thead>
                        <tr className="border-b border-gray-700">
                            <th className="py-2 px-3 text-left text-sm text-gray-400">
                                {'Access Level'}
                            </th>
                            <th className="py-2 px-3 text-center text-sm text-gray-400">
                                {'Same Class'}
                            </th>
                            <th className="py-2 px-3 text-center text-sm text-gray-400">
                                {'Same Package'}
                            </th>
                            <th className="py-2 px-3 text-center text-sm text-gray-400">
                                {'Subclass'}
                            </th>
                            <th className="py-2 px-3 text-center text-sm text-gray-400">
                                {'World'}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="bg-gray-800/30">
                            <td className="py-2 px-3 text-pink-300 font-medium">public</td>
                            <td className="py-2 px-3 text-center"><CheckCircle2
                                className="w-5 h-5 text-green-400 mx-auto"/></td>
                            <td className="py-2 px-3 text-center"><CheckCircle2
                                className="w-5 h-5 text-green-400 mx-auto"/></td>
                            <td className="py-2 px-3 text-center"><CheckCircle2
                                className="w-5 h-5 text-green-400 mx-auto"/></td>
                            <td className="py-2 px-3 text-center"><CheckCircle2
                                className="w-5 h-5 text-green-400 mx-auto"/></td>
                        </tr>
                        <tr className="bg-gray-800/10">
                            <td className="py-2 px-3 text-pink-300 font-medium">protected</td>
                            <td className="py-2 px-3 text-center"><CheckCircle2
                                className="w-5 h-5 text-green-400 mx-auto"/></td>
                            <td className="py-2 px-3 text-center"><CheckCircle2
                                className="w-5 h-5 text-green-400 mx-auto"/></td>
                            <td className="py-2 px-3 text-center"><CheckCircle2
                                className="w-5 h-5 text-green-400 mx-auto"/></td>
                            <td className="py-2 px-3 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto"/>
                            </td>
                        </tr>
                        <tr className="bg-gray-800/30">
                            <td className="py-2 px-3 text-pink-300 font-medium">default (no modifier)</td>
                            <td className="py-2 px-3 text-center"><CheckCircle2
                                className="w-5 h-5 text-green-400 mx-auto"/></td>
                            <td className="py-2 px-3 text-center"><CheckCircle2
                                className="w-5 h-5 text-green-400 mx-auto"/></td>
                            <td className="py-2 px-3 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto"/>
                            </td>
                            <td className="py-2 px-3 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto"/>
                            </td>
                        </tr>
                        <tr className="bg-gray-800/10">
                            <td className="py-2 px-3 text-pink-300 font-medium">private</td>
                            <td className="py-2 px-3 text-center"><CheckCircle2
                                className="w-5 h-5 text-green-400 mx-auto"/></td>
                            <td className="py-2 px-3 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto"/>
                            </td>
                            <td className="py-2 px-3 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto"/>
                            </td>
                            <td className="py-2 px-3 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );

        // Clear renderer for Default Package with warning callout
        const renderDefaultPackage = (subsection) => (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Code className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{subsection.title}</h3>
                </div>

                {subsection.content && (
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                            <AlertTriangle className="w-5 h-5 text-yellow-400"/>
                        </div>
                        <p className="text-gray-300 mb-4">{subsection.content}</p>
                    </div>
                )}

                {subsection.reasons && (
                    <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30 mt-4">
                        <h4 className="text-md font-semibold text-yellow-300 mb-3">
                            Why Avoid the Default Package?
                        </h4>
                        <ul className="list-disc list-inside space-y-2">
                            {subsection.reasons.map((reason, idx) => (
                                <li key={idx} className="text-gray-300">{reason}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="bg-gray-700/30 p-3 rounded-lg mt-5">
                    <div className="flex items-center gap-2 mb-2">
                        <Code className="w-4 h-4 text-cyan-400"/>
                        <h4 className="text-sm font-medium text-cyan-300">
                            Example of a Default Package Class:
                        </h4>
                    </div>
                    <div className="bg-gray-900/50 p-3 rounded">
                        <code
                            className="text-gray-300 font-mono text-sm"> No package declaration<br/>
                            <br/>
                            public class DefaultPackageClass &#123;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;// Class implementation<br/>
                            &#125;
                        </code>
                    </div>
                </div>
            </div>
        );

        // Render each subsection with the specialized renderer
        return (
            <div className="space-y-6">
                {section.subsections[0] && renderPackageDeclaration(section.subsections[0])}
                {section.subsections[1] && renderImportStatements(section.subsections[1])}
                {section.subsections[2] && renderPackageVisibility(section.subsections[2])}
                {section.subsections[3] && renderDefaultPackage(section.subsections[3])}
            </div>
        );
    };

    const renderBestPractices = () => {
        const section = content.sections[9];
        if (!section) return null;

        return (
            <div className="space-y-6">
                {section.practices?.map((practice, idx) => (
                    <React.Fragment key={idx}>
                        <RenderPracticeCategory
                            key={idx}
                            category={practice.category}
                            conventions={practice.conventions}
                            practices={practice.practices}
                            principles={practice.principles}
                        />
                    </React.Fragment>
                ))}
            </div>
        );
    };

    const renderInterviewFocus = () => {
        const section = content.sections[10]; // Direct index access instead of find
        if (!section) return null;

        // Destructure for performance and cleaner code
        const {content: sectionContent, areas} = section;

        if (!areas?.length) return null;

        return (
            <div className="space-y-6">
                {/* Header Card with Rich Styling */}
                <div
                    className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 rounded-lg p-6 border border-purple-500/30 shadow-lg">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 mb-3">
                        {section.title}
                    </h2>
                    {sectionContent && <p className="text-gray-300">{sectionContent}</p>}
                </div>

                {/* Areas Grid - Optimized with React.memo for list rendering */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {areas.map((item, idx) => (
                        <FocusAreaCard key={idx} area={item}/>
                    ))}
                </div>
            </div>
        );
    };
    const FocusAreaCard = React.memo(({area}) => (
        <div
            className="bg-gray-800/60 hover:bg-gray-800/80 transition-colors rounded-lg p-5 border border-gray-700/40 shadow-md">
            <div className="flex items-start gap-4">
                <div className="bg-cyan-500/20 rounded-full p-2 mt-1">
                    <Box className="w-5 h-5 text-cyan-400"/>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{area.area}</h3>
                    <p className="text-gray-300 text-sm">{area.description}</p>
                </div>
            </div>
        </div>
    ));
    const renderInterviewFAQs = () => {
        const section = content.sections[11]; // FAQ section
        if (!section || !section.categories) return null;

        return <EnhancedInterviewFAQs section={section}/>;
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="mb-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-purple-500/30 shadow-md">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{content.title}</h1>
                <p className="text-gray-300">
                    Comprehensive guide to Java programming fundamentals
                </p>
            </div>

            {/* Navigation */}
            <TabNavigation/>

            {/* Content - Each section with its specific renderer */}
            <div className="space-y-8">
                {renderContent()}
            </div>
        </div>
    );
};

export default JavaFundamentalsPage;
