import React, { useState } from 'react';
import { Book, Code, Database, Server, Layout, Box, Cpu, MemoryStick, Clock, GitBranch } from 'lucide-react';
import javaFundamentalsJson from '../../../data/java/java-fundamentals.json';
import CodeBlock from '../../../components/CodeBlock';

const JavaFundamentalsPage = () => {
    // State for active section
    const [activeSection, setActiveSection] = useState(0);

    // Icons mapping for sections
    const sectionIcons = {
        'Core Concepts': <Cpu className="w-5 h-5" />,
        'Data Types and Variables': <Database className="w-5 h-5" />,
        'Object-Oriented Programming Concepts': <Box className="w-5 h-5" />,
        'Memory Management': <MemoryStick className="w-5 h-5" />,
        'Constructors': <Layout className="w-5 h-5" />,
        'Keywords and Modifiers': <Code className="w-5 h-5" />,
        'Classes and Interfaces': <Server className="w-5 h-5" />,
        'String Handling': <Book className="w-5 h-5" />,
        'Packages and Access Control': <GitBranch className="w-5 h-5" />,
        'Best Practices': <Clock className="w-5 h-5" />,
        'Interview Focus Areas': <Box className="w-5 h-5" />,
        'Interview FAQs': <Book className="w-5 h-5" />
    };

    // TabNavigation component
    const TabNavigation = () => (
        <div className="relative overflow-x-auto mb-8">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

            <div className="flex space-x-2 py-2 px-8 overflow-x-auto custom-scrollbar">
                {javaFundamentalsJson.sections.map((section, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveSection(index)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors shadow-lg ${
                            activeSection === index
                                ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-gray-900 shadow-cyan-500/50'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 shadow-gray-900/50'
                        }`}
                    >
                        {sectionIcons[section.title] || <Box className="w-5 h-5" />}
                        {section.title}
                    </button>
                ))}
            </div>
        </div>
    );

    // Render Core Concepts section
    const renderCoreConceptsSection = (section) => {
        if (!section?.subsections?.length) return null;

        // Use a Map for O(1) lookup of specialized renderers (faster than object literals)
        const rendererMap = new Map([
            ["What is Java?", renderJavaOverview],
            ["Java Platform Components", renderPlatformComponents],
            ["JVM Architecture", renderJVMArchitecture],
            ["Compilation and Execution Process", renderCompilationProcess],
            ["Main Method", renderMainMethod]
        ]);

        return (
            <div className="space-y-8">
                {section.subsections.map((subsection, idx) => (
                    <Card
                        key={idx}
                        title={subsection.title}
                        icon={<Cpu className="w-5 h-5 text-cyan-400" />}
                        className="mb-6"
                    >
                        {/* Always render content if available */}
                        {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                        {/* Execute the specialized renderer or empty fragment */}
                        {(rendererMap.get(subsection.title)?.(subsection) || <></>)}
                    </Card>
                ))}
            </div>
        );
    };

    const renderJavaOverview = ({keyFeatures}) => (
        keyFeatures?.length && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {keyFeatures.map(({feature, description}, i) => (
                    <div key={i} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                        <h4 className="text-md font-medium text-cyan-400 mb-1">{feature}</h4>
                        <p className="text-gray-300 text-sm">{description}</p>
                    </div>
                ))}
            </div>
        )
    );

    const renderPlatformComponents = ({components, diagram}) => (
        <>
            {components?.length && (
                <div className="space-y-4 mt-4">
                    {components.map((component, i) => (
                        <div key={i} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                            <h4 className="text-md font-medium text-cyan-400 mb-2">{component.name}</h4>
                            <p className="text-gray-300 mb-3">{component.description}</p>

                            {/* Component properties - use short circuit operators for minimal rendering logic */}
                            {component.tools?.length && <List title="Tools" items={component.tools} />}
                            {component.includes?.length && <List title="Includes" items={component.includes} />}
                            {component.features?.length && <List title="Features" items={component.features} />}

                            {/* Optimize complex renderings with conditional fragments */}
                            {component.stages?.length && (
                                <div className="mt-3">
                                    <h5 className="text-sm font-medium text-gray-400 mb-2">Stages:</h5>
                                    {component.stages.map(({name, description}, j) => (
                                        <div key={j} className="ml-4 mb-2">
                                            <h6 className="text-cyan-400 text-sm font-medium">{name}</h6>
                                            <p className="text-gray-300 text-sm">{description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Use map transformations for derived data */}
                            {component.areas?.length && (
                                <List
                                    title="Areas"
                                    items={component.areas.map(area => `${area.name}: ${area.description}`)}
                                />
                            )}

                            {/* Use inline rendering for single component arrays */}
                            {component.components?.length && (
                                <div className="mt-3">
                                    <h5 className="text-sm font-medium text-gray-400 mb-2">Components:</h5>
                                    {component.components.map(({name, description}, j) => (
                                        <div key={j} className="ml-4 mb-2">
                                            <h6 className="text-cyan-400 text-sm font-medium">{name}</h6>
                                            <p className="text-gray-300 text-sm">{description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Diagram rendering */}
            {diagram && (
                <div className="mt-4 bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Diagram:</h4>
                    <pre className="text-gray-300 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                    {diagram}
                </pre>
                </div>
            )}
        </>
    );

    const renderJVMArchitecture = renderPlatformComponents;

    const renderCompilationProcess = ({steps}) => (
        steps?.length && (
            <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Process Steps:</h4>
                <div className="space-y-2">
                    {steps.map(({step, description}, i) => (
                        <div key={i} className="flex gap-3 items-center">
                            <div className="flex-none w-8 h-8 flex items-center justify-center bg-cyan-500/20 text-cyan-400 rounded-full font-medium">
                                {step}
                            </div>
                            <p className="text-gray-300">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    );

    const renderMainMethod = ({code, keywords}) => (
        <>
            {/* Use logical AND for conditional rendering - more efficient than ternary */}
            {code && <CodeExample code={code} title="Main Method" />}

            {keywords?.length && (
                <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Keywords:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {keywords.map(({keyword, description}, i) => (
                            <div key={i} className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                                <code className="text-cyan-400 font-mono">{keyword}</code>
                                <p className="text-gray-300 text-sm mt-1">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );

    // Render Data Types and Variables section
    const renderDataTypesSection = (section) => {
        if (!section?.subsections?.length) return null;

        // Map renderer functions by subsection title for O(1) lookup
        // Each renderer is optimized for its specific data structure
        const renderers = {
            "Primitive Data Types": ({types}) => types?.length && (
                <div className="overflow-x-auto mt-4">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-800">
                            <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">Type</th>
                            <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">Size</th>
                            <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">Range</th>
                            <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">Default</th>
                            <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">Usage</th>
                        </tr>
                        </thead>
                        <tbody>
                        {types.map((type, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-gray-900/50" : "bg-gray-800/50"}>
                                <td className="border border-gray-700 px-4 py-2 text-cyan-400 font-mono">{type.dataType}</td>
                                <td className="border border-gray-700 px-4 py-2 text-gray-300">{type.size}</td>
                                <td className="border border-gray-700 px-4 py-2 text-gray-300">{type.range}</td>
                                <td className="border border-gray-700 px-4 py-2 text-pink-400 font-mono">{type.defaultValue}</td>
                                <td className="border border-gray-700 px-4 py-2 text-gray-300">{type.usage}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ),

            // Grid layout for reference types
            "Reference Data Types": ({types}) => types?.length && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {types.map((type, i) => (
                        <div key={i} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                            <h4 className="text-md font-medium text-cyan-400 mb-1">{type.type}</h4>
                            <p className="text-gray-300 text-sm">{type.description}</p>
                        </div>
                    ))}
                </div>
            ),

            // Vertical stack for variable types
            "Variable Types": ({types}) => types?.length && (
                <div className="space-y-4 mt-4">
                    {types.map((type, i) => (
                        <div key={i} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                            <h4 className="text-md font-medium text-cyan-400 mb-1">{type.type}</h4>
                            <p className="text-gray-300">{type.description}</p>
                        </div>
                    ))}
                </div>
            ),

            // Code examples for type conversions
            "Type Conversion": ({conversions}) => conversions?.length && (
                <div className="space-y-4 mt-4">
                    {conversions.map((conv, i) => (
                        <div key={i} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                            <h4 className="text-md font-medium text-cyan-400 mb-2">{conv.type}</h4>
                            <p className="text-gray-300 mb-3">{conv.description}</p>
                            {conv.example && <CodeBlock code={conv.example} />}
                        </div>
                    ))}
                </div>
            ),

            // Simple code examples for constants
            "Constants": ({examples}) => examples?.length && (
                <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Examples:</h4>
                    <div className="space-y-2">
                        {examples.map((example, i) => (
                            <div key={i} className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                                <code className="text-pink-400 font-mono">{example}</code>
                            </div>
                        ))}
                    </div>
                </div>
            )
        };

        return (
            <div className="space-y-8">
                {section.subsections.map((subsection, idx) => (
                    <Card
                        key={idx}
                        title={subsection.title}
                        icon={<Database className="w-5 h-5 text-cyan-400" />}
                        className="mb-6"
                    >
                        {/* Always render content if available */}
                        {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                        {/* Use specialized renderer via hash map lookup (O(1) operation) */}
                        {renderers[subsection.title]?.(subsection) || (
                            // Fallback renderer for any unhandled subsection types
                            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50 mt-4">
                            <pre className="text-gray-300 text-xs overflow-auto">
                                {JSON.stringify(subsection, null, 2)}
                            </pre>
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        );
    };

    // Render Object-Oriented Programming section
    const renderOOPSection = (section) => {
        if (!section?.subsections?.length) return null;

        // Specialized renderers mapped by subsection title for O(1) lookup
        const renderers = {
            'Classes and Objects': renderClassesObjects,
            'The Four Pillars of OOP': renderPillars,
            'Access Modifiers': renderAccessModifiers,
            'Non-Access Modifiers': renderNonAccessModifiers
        };

        return (
            <div className="space-y-8">
                {section.subsections.map((subsection, idx) => (
                    <Card
                        key={idx}
                        title={subsection.title}
                        icon={<Box className="w-5 h-5 text-cyan-400" />}
                        className="mb-6"
                    >
                        {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                        {/* Use specialized renderer if available, otherwise use default */}
                        {renderers[subsection.title]
                            ? renderers[subsection.title](subsection)
                            : renderDefault(subsection)}
                    </Card>
                ))}
            </div>
        );
    };

    const renderClassesObjects = (subsection) => {
        if (!subsection.concepts?.length) return null;

        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {subsection.concepts.map((concept, idx) => (
                        <div key={idx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                            <h4 className="text-md font-medium text-cyan-400 mb-1">{concept.concept}</h4>
                            <p className="text-gray-300 text-sm">{concept.description}</p>
                        </div>
                    ))}
                </div>
                {subsection.example && <CodeExample code={subsection.example} title="Example" />}
            </>
        );
    };

    const renderPillars = (subsection) => {
        if (!subsection.pillars?.length) return null;

        return (
            <div className="space-y-6 mt-4">
                {subsection.pillars.map((pillar, idx) => (
                    <div key={idx} className="bg-gray-800/50 rounded-lg p-5 border border-gray-700/50">
                        <h4 className="text-xl font-semibold text-cyan-400 mb-3">{pillar.name}</h4>
                        <p className="text-gray-300 mb-4">{pillar.description}</p>

                        {pillar.definition && (
                            <div className="bg-gray-900/30 rounded-lg p-4 border-l-4 border-cyan-500 mb-4">
                                <p className="text-gray-300 italic">{pillar.definition}</p>
                            </div>
                        )}

                        {renderPillarSections(pillar)}
                    </div>
                ))}
            </div>
        );
    };

    const renderPillarSections = (pillar) => {
        // Special handling for Abstraction pillar which has a different structure
        if (pillar.name === "Abstraction" && pillar.implementation) {
            return (
                <>
                    {/* Render definition and other common elements */}
                    {pillar.implementation && (
                        <div className="mt-4">
                            <h5 className="text-md font-medium text-gray-300 mb-2">Implementation:</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {pillar.implementation.map((impl, idx) => (
                                    <div key={idx} className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                                        <h6 className="text-cyan-400 font-medium">{impl.type}</h6>
                                        <p className="text-gray-300 text-sm">{impl.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {renderListSection(pillar.benefits, "Benefits")}

                    {pillar.types && (
                        <div className="mt-4">
                            <h5 className="text-md font-medium text-gray-300 mb-2">Types:</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {pillar.types.map((type, idx) => (
                                    <div key={idx} className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                                        <h6 className="text-cyan-400 font-medium">{type.type}</h6>
                                        <p className="text-gray-300 text-sm">{type.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {pillar.example && <CodeExample code={pillar.example} title="Example" />}
                </>
            );
        }

        // Standard handling for other pillars
        return (
            <>
                {renderListSection(pillar.implementation, "Implementation")}
                {renderListSection(pillar.benefits, "Benefits")}

                {pillar.types && (
                    <div className="mt-4">
                        <h5 className="text-md font-medium text-gray-300 mb-2">Types:</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {pillar.types.map((type, idx) => (
                                <div key={idx} className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                                    <h6 className="text-cyan-400 font-medium">{type.type}</h6>
                                    <p className="text-gray-300 text-sm">{type.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {pillar.example && <CodeExample code={pillar.example} title="Example" />}

                {pillar.comparison && (
                    <div className="mt-4 overflow-x-auto">
                        <h5 className="text-md font-medium text-gray-300 mb-2">Comparison:</h5>
                        <table className="w-full border-collapse">
                            <thead>
                            <tr className="bg-gray-800">
                                <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">Aspect</th>
                                <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">Method Overloading</th>
                                <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">Method Overriding</th>
                            </tr>
                            </thead>
                            <tbody>
                            {pillar.comparison.map((comp, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? "bg-gray-900/50" : "bg-gray-800/50"}>
                                    <td className="border border-gray-700 px-4 py-2 text-gray-300">{comp.aspect}</td>
                                    <td className="border border-gray-700 px-4 py-2 text-gray-300">{comp.methodOverloading}</td>
                                    <td className="border border-gray-700 px-4 py-2 text-gray-300">{comp.methodOverriding}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </>
        );
    };

    const renderListSection = (items, title) => {
        if (!items?.length) return null;

        // Check if items contains objects with type/description or simple strings
        const hasObjectItems = items.some(item => typeof item === 'object' && item !== null);

        return (
            <div className="mt-4">
                <h5 className="text-md font-medium text-gray-300 mb-2">{title}:</h5>
                <ul className="list-disc list-inside space-y-1">
                    {hasObjectItems ?
                        // Handle structured objects (like in Abstraction's implementation)
                        items.map((item, idx) => (
                            <li key={idx} className="text-gray-300">
                                <span className="text-cyan-400 font-medium">{item.type}: </span>
                                {item.description}
                            </li>
                        )) :
                        // Handle regular string items
                        items.map((item, idx) => (
                            <li key={idx} className="text-gray-300">{item}</li>
                        ))
                    }
                </ul>
            </div>
        );
    };

    const renderAccessModifiers = (subsection) => {
        if (!subsection.modifiers?.length) return null;

        return (
            <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-gray-800">
                        <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">Modifier</th>
                        <th className="border border-gray-700 px-4 py-2 text-center text-gray-300">Class</th>
                        <th className="border border-gray-700 px-4 py-2 text-center text-gray-300">Package</th>
                        <th className="border border-gray-700 px-4 py-2 text-center text-gray-300">Subclass</th>
                        <th className="border border-gray-700 px-4 py-2 text-center text-gray-300">World</th>
                    </tr>
                    </thead>
                    <tbody>
                    {subsection.modifiers.map((mod, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-gray-900/50" : "bg-gray-800/50"}>
                            <td className="border border-gray-700 px-4 py-2 text-cyan-400 font-mono">{mod.modifier}</td>
                            {/* Use ternary for all boolean renders instead of nested expressions */}
                            <td className="border border-gray-700 px-4 py-2 text-center">
                                <span className={mod.class ? "text-green-400" : "text-red-400"}>
                                    {mod.class ? "✓" : "✗"}
                                </span>
                            </td>
                            <td className="border border-gray-700 px-4 py-2 text-center">
                                <span className={mod.package ? "text-green-400" : "text-red-400"}>
                                    {mod.package ? "✓" : "✗"}
                                </span>
                            </td>
                            <td className="border border-gray-700 px-4 py-2 text-center">
                                <span className={mod.subclass ? "text-green-400" : "text-red-400"}>
                                    {mod.subclass ? "✓" : "✗"}
                                </span>
                            </td>
                            <td className="border border-gray-700 px-4 py-2 text-center">
                                <span className={mod.world ? "text-green-400" : "text-red-400"}>
                                    {mod.world ? "✓" : "✗"}
                                </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderNonAccessModifiers = (subsection) => {
        if (!subsection.modifiers?.length) return null;

        return (
            <div className="space-y-4 mt-4">
                {subsection.modifiers.map((mod, idx) => (
                    <div key={idx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                        <h4 className="text-md font-medium text-cyan-400 mb-2">{mod.modifier}</h4>
                        {mod.description && <p className="text-gray-300 mb-2">{mod.description}</p>}
                        {mod.useCases?.length > 0 && (
                            <div className="ml-4">
                                <ul className="list-disc list-inside space-y-1">
                                    {mod.useCases.map((useCase, idx) => (
                                        <li key={idx} className="text-gray-300">{useCase}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const renderDefault = (subsection) => (
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50 mt-4">
            <p className="text-gray-300 italic">Content details available in interactive mode</p>
        </div>
    );

    // Render Memory Management section
    const renderMemoryManagementSection = (section) => {
        if (!section.subsections) return null;

        return (
            <div className="space-y-8">
                {section.subsections.map((subsection, idx) => (
                    <Card
                        key={idx}
                        title={subsection.title}
                        icon={<MemoryStick className="w-5 h-5 text-cyan-400" />}
                        className="mb-6"
                    >
                        {subsection.content && (
                            <p className="text-gray-300 mb-4">{subsection.content}</p>
                        )}

                        {/* Stack vs Heap Memory */}
                        {subsection.memory && (
                            <div className="space-y-6 mt-4">
                                {subsection.memory.map((memType, memIdx) => (
                                    <div key={memIdx} className="bg-gray-800/50 rounded-lg overflow-hidden">
                                        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-5 py-3 border-b border-gray-700">
                                            <h4 className="text-lg font-medium text-cyan-400">{memType.type}</h4>
                                        </div>
                                        <div className="p-5">
                                            <div className="mb-4">
                                                <h5 className="text-md font-medium text-gray-300 mb-2">Characteristics:</h5>
                                                <ul className="list-disc list-inside space-y-1">
                                                    {memType.characteristics.map((char, charIdx) => (
                                                        <li key={charIdx} className="text-gray-300">{char}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {memType.example && (
                                                <CodeExample code={memType.example} title="Example" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Memory Diagram */}
                        {subsection.diagram && (
                            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                                <h4 className="text-md font-medium text-gray-300 mb-3">Memory Diagram:</h4>
                                <pre className="text-gray-300 text-sm font-mono overflow-x-auto whitespace-pre">
                                    {subsection.diagram}
                                </pre>
                            </div>
                        )}

                        {/* Variable Storage */}
                        {subsection.variables && (
                            <div className="mt-6">
                                <h4 className="text-md font-medium text-gray-300 mb-3">Variable Storage:</h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                        <tr className="bg-gray-800">
                                            <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">Type</th>
                                            <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">Storage</th>
                                            <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">Lifecycle</th>
                                            <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">Scope</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {subsection.variables.map((variable, varIdx) => (
                                            <tr key={varIdx} className={varIdx % 2 === 0 ? "bg-gray-900/50" : "bg-gray-800/50"}>
                                                <td className="border border-gray-700 px-4 py-2 text-cyan-400">{variable.type}</td>
                                                <td className="border border-gray-700 px-4 py-2 text-gray-300">{variable.storage}</td>
                                                <td className="border border-gray-700 px-4 py-2 text-gray-300">{variable.lifecycle}</td>
                                                <td className="border border-gray-700 px-4 py-2 text-gray-300">{variable.scope}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Garbage Collection */}
                        {subsection.details && subsection.title === "Garbage Collection" && (
                            <div className="space-y-4 mt-4">
                                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                                    <ul className="list-disc list-inside space-y-1">
                                        {subsection.details.map((detail, detailIdx) => (
                                            <li key={detailIdx} className="text-gray-300">{detail}</li>
                                        ))}
                                    </ul>
                                </div>

                                {subsection.process && (
                                    <div className="mt-4">
                                        <h4 className="text-md font-medium text-gray-300 mb-2">Garbage Collection Process:</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {subsection.process.map((proc, procIdx) => (
                                                <div key={procIdx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-medium">
                                                            {procIdx + 1}
                                                        </div>
                                                        <h5 className="text-cyan-400 font-medium">{proc.step}</h5>
                                                    </div>
                                                    <p className="text-gray-300 text-sm">{proc.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {subsection.collectors && (
                                    <div className="mt-6">
                                        <h4 className="text-md font-medium text-gray-300 mb-3">Garbage Collectors:</h4>
                                        <div className="space-y-3">
                                            {subsection.collectors.map((collector, collIdx) => (
                                                <div key={collIdx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                                    <h5 className="text-cyan-400 font-medium mb-1">{collector.name}</h5>
                                                    <p className="text-gray-300 text-sm mb-2">{collector.description}</p>
                                                    {collector.flag && (
                                                        <code className="text-xs font-mono bg-gray-800 px-2 py-1 rounded text-pink-400">
                                                            {collector.flag}
                                                        </code>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {subsection.tuning && (
                                    <div className="mt-6">
                                        <h4 className="text-md font-medium text-gray-300 mb-2">Tuning Tips:</h4>
                                        <ul className="list-disc list-inside space-y-1">
                                            {subsection.tuning.map((tip, tipIdx) => (
                                                <li key={tipIdx} className="text-gray-300">{tip}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        );
    };

    const renderConstructorsSection = (section) => (
        <div className="space-y-8">
            <p className="text-gray-300">This section will render constructors information</p>
        </div>
    );

    const renderKeywordsModifiersSection = (section) => (
        <div className="space-y-8">
            <p className="text-gray-300">This section will render keywords and modifiers</p>
        </div>
    );

    const renderClassesInterfacesSection = (section) => (
        <div className="space-y-8">
            <p className="text-gray-300">This section will render classes and interfaces information</p>
        </div>
    );

    const renderStringHandlingSection = (section) => (
        <div className="space-y-8">
            <p className="text-gray-300">This section will render string handling information</p>
        </div>
    );

    const renderPackagesAccessSection = (section) => (
        <div className="space-y-8">
            <p className="text-gray-300">This section will render packages and access control information</p>
        </div>
    );

    const renderBestPracticesSection = (section) => (
        <div className="space-y-8">
            <p className="text-gray-300">This section will render best practices</p>
        </div>
    );

    const renderInterviewFocusSection = (section) => (
        <div className="space-y-8">
            <p className="text-gray-300">This section will render interview focus areas</p>
        </div>
    );

    const renderInterviewFAQsSection = (section) => (
        <div className="space-y-8">
            <p className="text-gray-300">This section will render interview FAQs</p>
        </div>
    );

    // Helper function to render a subsection
    const renderSubsection = (subsection) => (
        <div key={subsection.title} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">{subsection.title}</h3>
            {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

            {/* We'll implement rendering for specific subsection types later */}
            <p className="text-gray-400 italic">Content rendering to be implemented</p>
        </div>
    );

    // Render the current active section
    const renderActiveSection = () => {
        const section = javaFundamentalsJson.sections[activeSection];

        // Choose the appropriate rendering function based on section title
        switch (section.title) {
            case 'Core Concepts':
                return renderCoreConceptsSection(section);
            case 'Data Types and Variables':
                return renderDataTypesSection(section);
            case 'Object-Oriented Programming Concepts':
                return renderOOPSection(section);
            case 'Memory Management':
                return renderMemoryManagementSection(section);
            case 'Constructors':
                return renderConstructorsSection(section);
            case 'Keywords and Modifiers':
                return renderKeywordsModifiersSection(section);
            case 'Classes and Interfaces':
                return renderClassesInterfacesSection(section);
            case 'String Handling':
                return renderStringHandlingSection(section);
            case 'Packages and Access Control':
                return renderPackagesAccessSection(section);
            case 'Best Practices':
                return renderBestPracticesSection(section);
            case 'Interview Focus Areas':
                return renderInterviewFocusSection(section);
            case 'Interview FAQs':
                return renderInterviewFAQsSection(section);
            default:
                // Simple fallback rendering
                return (
                    <div className="space-y-6">
                        {section.subsections && section.subsections.map(renderSubsection)}
                    </div>
                );
        }
    };

    // Reusable card component for consistent styling
    const Card = ({ title, children, icon, className = "" }) => (
        <div className={`bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 ${className}`}>
            {title && (
                <div className="flex items-center gap-3 mb-4">
                    {icon && <div className="p-2 bg-gray-700/50 rounded-lg">{icon}</div>}
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                </div>
            )}
            {children}
        </div>
    );

    // Helper components for rendering common patterns
    const CodeExample = ({ code, title }) => (
        <div className="mt-4 mb-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">{title || "Example"}:</h4>
            <CodeBlock code={code} />
        </div>
    );

    const List = ({ items, title, className = "" }) => (
        <div className="mt-4">
            {title && <h4 className="text-sm font-medium text-gray-400 mb-2">{title}:</h4>}
            <ul className={`list-disc list-inside space-y-1 ${className}`}>
                {items.map((item, idx) => (
                    <li key={idx} className="text-gray-300">{item}</li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{javaFundamentalsJson.title}</h1>
                <p className="text-gray-300">
                    Comprehensive guide to Java programming fundamentals
                </p>
            </div>

            {/* Navigation */}
            <TabNavigation />

            {/* Content */}
            <div className="space-y-8">
                {renderActiveSection()}
            </div>
        </div>
    );
};

export default JavaFundamentalsPage;
