import React, {useState} from 'react';
import {Book, Code, Database, Server, Layout, Box, Cpu, MemoryStick, Clock, GitBranch} from 'lucide-react';
import javaFundamentalsJson from '../../../data/java/java-fundamentals.json';
import CodeBlock from '../../../components/CodeBlock';

const JavaFundamentalsPage = () => {
    // State for active section
    const [activeSection, setActiveSection] = useState(0);

    // Icons mapping for sections
    const sectionIcons = {
        'Core Concepts': <Cpu className="w-5 h-5"/>,
        'Data Types and Variables': <Database className="w-5 h-5"/>,
        'Object-Oriented Programming Concepts': <Box className="w-5 h-5"/>,
        'Memory Management': <MemoryStick className="w-5 h-5"/>,
        'Constructors': <Layout className="w-5 h-5"/>,
        'Keywords and Modifiers': <Code className="w-5 h-5"/>,
        'Classes and Interfaces': <Server className="w-5 h-5"/>,
        'String Handling': <Book className="w-5 h-5"/>,
        'Packages and Access Control': <GitBranch className="w-5 h-5"/>,
        'Best Practices': <Clock className="w-5 h-5"/>,
        'Interview Focus Areas': <Box className="w-5 h-5"/>,
        'Interview FAQs': <Book className="w-5 h-5"/>
    };

    // TabNavigation component
    const TabNavigation = () => (
        <div className="mb-8 flex flex-wrap gap-4">
            {javaFundamentalsJson.sections.map((section, index) => (
                <button
                    key={index}
                    onClick={() => setActiveSection(index)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeSection === index
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                    }`}
                >
                    {sectionIcons[section.title] || <Box className="w-5 h-5"/>}
                    {section.title}
                </button>
            ))}
        </div>
    );

    //==========================================================================================================

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
                        icon={<Cpu className="w-5 h-5 text-cyan-400"/>}
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
                            {component.tools?.length && <List title="Tools" items={component.tools}/>}
                            {component.includes?.length && <List title="Includes" items={component.includes}/>}
                            {component.features?.length && <List title="Features" items={component.features}/>}

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
                            <div
                                className="flex-none w-8 h-8 flex items-center justify-center bg-cyan-500/20 text-cyan-400 rounded-full font-medium">
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
            {code && <CodeExample code={code} title="Main Method"/>}

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
                            {conv.example && <CodeBlock code={conv.example}/>}
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
                        icon={<Database className="w-5 h-5 text-cyan-400"/>}
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
                        icon={<Box className="w-5 h-5 text-cyan-400"/>}
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
                {subsection.example && <CodeExample code={subsection.example} title="Example"/>}
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

                    {pillar.example && <CodeExample code={pillar.example} title="Example"/>}
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

                {pillar.example && <CodeExample code={pillar.example} title="Example"/>}

                {pillar.comparison && (
                    <div className="mt-4 overflow-x-auto">
                        <h5 className="text-md font-medium text-gray-300 mb-2">Comparison:</h5>
                        <table className="w-full border-collapse">
                            <thead>
                            <tr className="bg-gray-800">
                                <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">Aspect</th>
                                <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">Method
                                    Overloading
                                </th>
                                <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">Method
                                    Overriding
                                </th>
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
        if (!section?.subsections?.length) return null;

        // High-performance dispatcher using Map (faster than object property lookup)
        const renderers = new Map([
            ["Stack vs Heap Memory", renderStackHeapMemory],
            ["Variable Storage", renderVariableStorage],
            ["Garbage Collection", renderGarbageCollection]
        ]);

        return (
            <div className="space-y-8">
                {section.subsections.map((subsection, idx) => (
                    <Card
                        key={idx}
                        title={subsection.title}
                        icon={<MemoryStick className="w-5 h-5 text-cyan-400"/>}
                        className="mb-6"
                    >
                        {/* Content is rendered directly without conditional */}
                        {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                        {/* Call specialized renderer with direct lookup - faster than conditionals */}
                        {renderers.get(subsection.title)?.(subsection)}
                    </Card>
                ))}
            </div>
        );
    };

    const renderStackHeapMemory = ({memory, diagram}) => (
        <>
            {memory?.length && (
                <div className="space-y-6 mt-4">
                    {memory.map(({type, characteristics, example}, i) => (
                        <div key={i} className="bg-gray-800/50 rounded-lg overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-5 py-3 border-b border-gray-700">
                                <h4 className="text-lg font-medium text-cyan-400">{type}</h4>
                            </div>
                            <div className="p-5">
                                {characteristics?.length && (
                                    <div className="mb-4">
                                        <h5 className="text-md font-medium text-gray-300 mb-2">Characteristics:</h5>
                                        <ul className="list-disc list-inside space-y-1">
                                            {characteristics.map((char, j) => (
                                                <li key={j} className="text-gray-300">{char}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {example && <CodeExample code={example} title="Example"/>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {diagram && (
                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <h4 className="text-md font-medium text-gray-300 mb-3">Memory Diagram:</h4>
                    <pre className="text-gray-300 text-sm font-mono overflow-x-auto whitespace-pre">
                    {diagram}
                </pre>
                </div>
            )}
        </>
    );

    const renderVariableStorage = ({variables}) => (
        variables?.length && (
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
                        {variables.map((variable, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-gray-900/50" : "bg-gray-800/50"}>
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
        )
    );

    const renderGarbageCollection = ({details, process, collectors, tuning}) => (
        <div className="space-y-4 mt-4">
            {/* Details list */}
            {details?.length && (
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                    <ul className="list-disc list-inside space-y-1">
                        {details.map((detail, i) => (
                            <li key={i} className="text-gray-300">{detail}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Process grid */}
            {process?.length && (
                <div className="mt-4">
                    <h4 className="text-md font-medium text-gray-300 mb-2">Garbage Collection Process:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {process.map(({step, description}, i) => (
                            <div key={i} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                <div className="flex items-center gap-2 mb-2">
                                    <div
                                        className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-medium">
                                        {i + 1}
                                    </div>
                                    <h5 className="text-cyan-400 font-medium">{step}</h5>
                                </div>
                                <p className="text-gray-300 text-sm">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Collectors section */}
            {collectors?.length && (
                <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-300 mb-3">Garbage Collectors:</h4>
                    <div className="space-y-3">
                        {collectors.map(({name, description, flag}, i) => (
                            <div key={i} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                <h5 className="text-cyan-400 font-medium mb-1">{name}</h5>
                                <p className="text-gray-300 text-sm mb-2">{description}</p>
                                {flag && (
                                    <code className="text-xs font-mono bg-gray-800 px-2 py-1 rounded text-pink-400">
                                        {flag}
                                    </code>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tuning tips */}
            {tuning?.length && (
                <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-300 mb-2">Tuning Tips:</h4>
                    <ul className="list-disc list-inside space-y-1">
                        {tuning.map((tip, i) => (
                            <li key={i} className="text-gray-300">{tip}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

    // Render Constructors section
    const renderConstructorsSection = (section) => {
        if (!section?.subsections?.length) return null;

        // Map-based lookup for O(1) access performance
        const renderers = new Map([
            ["Types of Constructors", renderTypesOfConstructors],
            ["Constructor Chaining", renderConstructorChaining]
        ]);

        return (
            <div className="space-y-8">
                {section.subsections.map((subsection, idx) => (
                    <Card
                        key={idx}
                        title={subsection.title}
                        icon={<Layout className="w-5 h-5 text-cyan-400"/>}
                        className="mb-6"
                    >
                        {/* Content text */}
                        {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                        {/* Call specialized renderer via constant-time lookup */}
                        {renderers.get(subsection.title)?.(subsection)}
                    </Card>
                ))}
            </div>
        );
    };

    const renderTypesOfConstructors = ({types, example}) => (
        <>
            {/* Constructor types grid */}
            {types?.length && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-6">
                    {types.map(({type, description, notes}, i) => (
                        <div key={i} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                            <h4 className="text-md font-medium text-cyan-400 mb-1">{type}</h4>
                            <p className="text-gray-300 text-sm">{description}</p>
                            {notes && <p className="text-gray-400 text-xs mt-2 italic">{notes}</p>}
                        </div>
                    ))}
                </div>
            )}

            {/* Code example */}
            {example && <CodeExample code={example} title="Constructor Examples"/>}
        </>
    );

    const renderConstructorChaining = ({example}) => (
        example && <CodeExample code={example} title="Constructor Chaining Example"/>
    );

    // Render Keywords and Modifiers section
    const renderKeywordsModifiersSection = (section) => {
        if (!section?.subsections?.length) return null;

        // Single function for 'this' and 'super' keywords (identical structure)
        const renderSimpleKeyword = ({title, content, uses, example}) => (
            <>
                {content && <p className="text-gray-300 mb-3">{content}</p>}

                {uses?.length > 0 && (
                    <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-gray-700/50">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Uses:</h4>
                        <ul className="list-disc list-inside space-y-1">
                            {uses.map((use, i) => <li key={i} className="text-gray-300">{use}</li>)}
                        </ul>
                    </div>
                )}

                {example && <CodeExample code={example} title={`${title} Example`}/>}
            </>
        );

        // Function for 'final' and 'static' keywords (which have applications array with type/description objects)
        const renderComplexKeyword = ({title, content, applications, example}) => (
            <>
                {content && <p className="text-gray-300 mb-3">{content}</p>}

                {applications?.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                        {applications.map(({type, description}, i) => (
                            <div key={i} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                                <code className="text-cyan-400 font-mono block mb-1">{type}</code>
                                <p className="text-gray-300 text-sm">{description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {example && <CodeExample code={example} title={`${title} Example`}/>}
            </>
        );

        // Map-based dispatcher for O(1) lookup
        const renderers = {
            "this Keyword": renderSimpleKeyword,
            "super Keyword": renderSimpleKeyword,
            "final Keyword": renderComplexKeyword,
            "static Keyword": renderComplexKeyword
        };

        return (
            <div className="space-y-6">
                {section.subsections.map((subsection, i) => (
                    <Card
                        key={i}
                        title={subsection.title}
                        icon={<Code className="w-5 h-5 text-cyan-400"/>}
                        className="mb-6"
                    >
                        {renderers[subsection.title]?.(subsection)}
                    </Card>
                ))}
            </div>
        );
    };

    // Render Classes and Interfaces section
    const renderClassesInterfacesSection = (section) => {
        if (!section?.subsections?.length) return null;

        // Performance-optimized lookup table with mapped renderers
        const renderers = new Map([
            ["Class Types", renderClassTypes],
            ["Interfaces", renderInterfaces],
            ["Enum Types", renderEnum],
            ["Enums with Fields and Methods", renderEnum],
            ["Enum Methods", renderEnumMethods]
        ]);

        return (
            <div className="space-y-6">
                {section.subsections.map((subsection, i) => (
                    <Card
                        key={i}
                        title={subsection.title}
                        icon={<Server className="w-5 h-5 text-cyan-400"/>}
                        className="mb-6"
                    >
                        {renderers.get(subsection.title)?.(subsection)}
                    </Card>
                ))}
            </div>
        );
    };

    const renderClassTypes = ({content, types, example}) => (
        <>
            {content && <p className="text-gray-300 mb-4">{content}</p>}

            {types?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {types.map(({type, description, notes}, i) => (
                        <div key={i} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                            <h4 className="text-md font-medium text-cyan-400 mb-1">{type}</h4>
                            <p className="text-gray-300 text-sm">{description}</p>
                            {notes && <p className="text-gray-400 italic text-xs mt-2">{notes}</p>}
                        </div>
                    ))}
                </div>
            )}

            {example && <CodeExample code={example} title="Class Types Examples"/>}
        </>
    );

    const renderInterfaces = ({content, notes, example}) => (
        <>
            {content && <p className="text-gray-300 mb-4">{content}</p>}

            {notes?.length > 0 && (
                <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-700/50">
                    <ul className="list-disc list-inside space-y-1">
                        {notes.map((note, i) => <li key={i} className="text-gray-300">{note}</li>)}
                    </ul>
                </div>
            )}

            {example && <CodeExample code={example} title="Interface Example"/>}
        </>
    );

    const renderEnum = ({content, example}) => (
        <>
            {content && <p className="text-gray-300 mb-4">{content}</p>}
            {example && <CodeExample code={example} title="Enum Example"/>}
        </>
    );

    const renderEnumMethods = ({content, methods, example}) => (
        <>
            {content && <p className="text-gray-300 mb-4">{content}</p>}

            {methods?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {methods.map(({method, description}, i) => (
                        <div key={i} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                            <code className="text-cyan-400 font-mono block mb-1">{method}</code>
                            <p className="text-gray-300 text-sm">{description}</p>
                        </div>
                    ))}
                </div>
            )}

            {example && <CodeExample code={example} title="Enum Methods Example"/>}
        </>
    );

    // Render String Handling section
    const renderStringHandlingSection = (section) => {
        if (!section?.subsections?.length) return null;

        // Fast renderer lookup - O(1) operation with Map
        const renderers = new Map([
            ["String Immutability", renderBasicExample],
            ["String Pool", renderBasicExample],
            ["String vs StringBuilder vs StringBuffer", renderComparisonSection]
        ]);

        return (
            <div className="space-y-6">
                {section.subsections.map((subsection, i) => (
                    <Card
                        key={i}
                        title={subsection.title}
                        icon={<Book className="w-5 h-5 text-cyan-400"/>}
                        className="mb-6"
                    >
                        {renderers.get(subsection.title)?.(subsection)}
                    </Card>
                ))}
            </div>
        );
    };

    const renderBasicExample = ({content, example}) => (
        <>
            {content && <p className="text-gray-300 mb-4">{content}</p>}
            {example && <CodeExample code={example} title="Example"/>}
        </>
    );

    const renderComparisonSection = ({content, comparison, example}) => (
        <>
            {content && <p className="text-gray-300 mb-4">{content}</p>}

            {comparison?.length > 0 && (
                <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-800">
                        <tr>
                            <th className="border border-gray-700 px-3 py-2 text-left text-gray-300">Class</th>
                            <th className="border border-gray-700 px-3 py-2 text-center text-gray-300">Thread Safe</th>
                            <th className="border border-gray-700 px-3 py-2 text-center text-gray-300">Mutable</th>
                            <th className="border border-gray-700 px-3 py-2 text-left text-gray-300">Performance</th>
                            <th className="border border-gray-700 px-3 py-2 text-left text-gray-300">Use Case</th>
                        </tr>
                        </thead>
                        <tbody>
                        {comparison.map(({class: className, threadSafe, mutable, performance, useCase}, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-gray-900/50" : "bg-gray-800/50"}>
                                <td className="border border-gray-700 px-3 py-2 font-mono text-cyan-400">{className}</td>
                                <td className="border border-gray-700 px-3 py-2 text-center">
                                    <span className={threadSafe ? "text-green-400" : "text-red-400"}>
                                        {threadSafe ? "✓" : "✗"}
                                    </span>
                                </td>
                                <td className="border border-gray-700 px-3 py-2 text-center">
                                    <span className={mutable ? "text-green-400" : "text-red-400"}>
                                        {mutable ? "✓" : "✗"}
                                    </span>
                                </td>
                                <td className="border border-gray-700 px-3 py-2 text-gray-300">{performance}</td>
                                <td className="border border-gray-700 px-3 py-2 text-gray-300">{useCase}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {example && <CodeExample code={example} title="Example"/>}
        </>
    );

    // Render Packages and Access Control section
    const renderPackagesAccessSection = (section) => {
        if (!section?.subsections?.length) return null;

        // Map for O(1) renderer lookup
        const renderers = new Map([
            ["Package Declaration", renderSimpleExample],
            ["Import Statement", renderMultipleExamples],
            ["Package Visibility", renderPackageRules],
            ["Default Package", renderPackageRules]
        ]);

        return (
            <div className="space-y-6">
                {section.subsections.map((subsection, i) => (
                    <Card
                        key={i}
                        title={subsection.title}
                        icon={<GitBranch className="w-5 h-5 text-cyan-400"/>}
                        className="mb-6"
                    >
                        {renderers.get(subsection.title)?.(subsection)}
                    </Card>
                ))}
            </div>
        );
    };

    const renderSimpleExample = ({content, example}) => (
        <>
            {content && <p className="text-gray-300 mb-4">{content}</p>}
            {example && <CodeExample code={example} title="Example"/>}
        </>
    );

    const renderMultipleExamples = ({content, examples}) => (
        <>
            {content && <p className="text-gray-300 mb-4">{content}</p>}

            {examples?.length > 0 && (
                <div className="space-y-4 mt-4">
                    {examples.map(({description, code}, i) => (
                        <div key={i} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700/50">
                            <div className="bg-gray-700/50 px-4 py-2 border-b border-gray-700">
                                <h4 className="text-sm font-medium text-gray-300">{description}</h4>
                            </div>
                            <div className="p-4">
                                <code className="text-sm font-mono text-pink-400 block whitespace-pre">{code}</code>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );

    const renderPackageRules = ({content, rules, reasons}) => {
        // Determine which list to use (rules or reasons) with direct property access
        const items = rules || reasons;
        const title = rules ? "Rules" : "Reasons";

        return (
            <>
                {content && <p className="text-gray-300 mb-4">{content}</p>}

                {items?.length > 0 && (
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                        {rules && reasons && <h4 className="text-sm font-medium text-gray-300 mb-2">{title}:</h4>}
                        <ul className="list-disc list-inside space-y-1">
                            {items.map((item, i) => <li key={i} className="text-gray-300">{item}</li>)}
                        </ul>
                    </div>
                )}
            </>
        );
    };

    // Render Best Practices section
    const renderBestPracticesSection = (section) => {
        if (!section?.practices?.length) return null;

        // Optimized renderer for simple string arrays (closures created once)
        const renderSimpleList = (items) => (
            <ul className="list-disc list-inside space-y-1">
                {items.map((item, i) => <li key={i} className="text-gray-300">{item}</li>)}
            </ul>
        );

        // Optimized renderer for object arrays with name/description
        const renderDetailedList = (items) => (
            <div className="space-y-3">
                {items.map(({name, description}, i) => (
                    <div key={i} className="bg-gray-800/50 rounded p-3 border border-gray-700/50">
                        <h4 className="text-cyan-400 font-medium text-sm">{name}</h4>
                        <p className="text-gray-300 text-sm">{description}</p>
                    </div>
                ))}
            </div>
        );

        return (
            <div className="space-y-6">
                {section.content && <p className="text-gray-300 mb-4">{section.content}</p>}

                {section.practices.map(({category, conventions, practices, principles}, i) => {
                    // Determine which array to use (constant-time property access)
                    const items = conventions || practices || principles;
                    // Fast check for rendering method (boolean operation instead of conditional)
                    const isObjectArray = principles && principles[0] && typeof principles[0] === 'object';

                    return (
                        <Card
                            key={i}
                            title={category}
                            icon={<Clock className="w-5 h-5 text-cyan-400"/>}
                            className="mb-4"
                        >
                            {/* Short-circuit conditional rendering for performance */}
                            {items?.length > 0 && (
                                isObjectArray ? renderDetailedList(items) : renderSimpleList(items)
                            )}
                        </Card>
                    );
                })}
            </div>
        );
    };

    // Render Interview Focus Areas section
    const renderInterviewFocusSection = (section) => {
        // Early return for invalid data
        if (!section?.areas?.length) return null;

        return (
            <div className="space-y-6">
                {/* Render content once with no conditional */}
                {section.content && <p className="text-gray-300 mb-6">{section.content}</p>}

                {/* Grid layout for better screen utilization */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.areas.map(({area, description}, i) => (
                        <div
                            key={i}
                            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
                        >
                            <h3 className="text-lg font-medium text-cyan-400 mb-1">{area}</h3>
                            <p className="text-gray-300 text-sm">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Render Interview FAQs section
    const renderInterviewFAQsSection = (section) => {
        if (!section?.categories?.length) return null;

        return (
            <div className="space-y-8">
                {section.description && (
                    <div
                        className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-6 border border-cyan-500/20 shadow-lg">
                        <h2 className="text-xl font-bold text-white mb-3">Interview Roadmap 🗺️</h2>
                        <p className="text-gray-300">{section.description}</p>
                    </div>
                )}

                <EnhancedFAQExperience categories={section.categories}/>
            </div>
        );
    };

    const EnhancedFAQExperience = React.memo(({categories}) => {
        const [searchText, setSearchText] = React.useState('');
        const [activeCategory, setActiveCategory] = React.useState(0);
        const [expandedId, setExpandedId] = React.useState(null);

        // Fast search filter
        const searchFilter = React.useCallback((q, a) => {
            if (!searchText) return true;
            const text = searchText.toLowerCase();
            return q.toLowerCase().includes(text) || a.toLowerCase().includes(text);
        }, [searchText]);

        // Toggle question expansion
        const toggleQuestion = React.useCallback(id => {
            setExpandedId(current => current === id ? null : id);
        }, []);

        // Category icons to make navigation more visual and intuitive
        const categoryIcons = ["💡", "🧠", "🔑", "⚡", "📦", "🔮", "🛠️", "🔄", "🏗️", "📝"];

        // Filter all questions across categories for search results view
        const hasSearchResults = categories.some(c =>
            c.questions.some(q => searchFilter(q.question, q.answer))
        );

        return (
            <>
                {/* Engaging search bar */}
                <div className="relative mb-8">
                    <div
                        className="flex items-center bg-gray-800/70 rounded-full border border-gray-700 focus-within:border-cyan-500 transition-all shadow-md overflow-hidden">
                        <div className="pl-5 text-xl">🔍</div>
                        <input
                            type="text"
                            placeholder="What Java concept are you curious about?"
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                            className="w-full px-4 py-3 bg-transparent text-white focus:outline-none placeholder-gray-400"
                        />
                        {searchText && (
                            <button
                                className="pr-5 text-gray-400 hover:text-white transition-colors"
                                onClick={() => setSearchText('')}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {!searchText ? (
                    // Standard category view when not searching
                    <>
                        {/* Visual category tabs */}
                        {!searchText && (
                            <CategoryTabs
                                categories={categories}
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                                categoryIcons={categoryIcons}
                            />
                        )}

                        {/* Questions for the active category */}
                        <div className="space-y-4">
                            {categories[activeCategory].questions.map((qa, j) => {
                                const questionId = `q-${activeCategory}-${j}`;
                                const isExpanded = expandedId === questionId;

                                return (
                                    <div
                                        key={j}
                                        className={`bg-gray-800/60 rounded-xl overflow-hidden transition-all duration-300 border border-gray-700/50 ${
                                            isExpanded ? 'shadow-lg border-cyan-500/30' : 'hover:border-gray-600'
                                        }`}
                                    >
                                        <button
                                            onClick={() => toggleQuestion(questionId)}
                                            className="w-full text-left p-5 flex justify-between items-start"
                                        >
                                            <h4 className="text-md font-medium text-cyan-300 pr-6">{qa.question}</h4>
                                            <span
                                                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                                    isExpanded ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300'
                                                }`}>
                                            {isExpanded ? "−" : "+"}
                                        </span>
                                        </button>

                                        {isExpanded && (
                                            <div className="p-5 pt-1 border-t border-gray-700/30 bg-gray-800/80">
                                                <p className="text-gray-300 whitespace-pre-line leading-relaxed">{qa.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    // Search results view
                    <>
                        <div className="mb-4 px-1">
                            <h3 className="text-lg font-medium text-white">
                                {hasSearchResults ? 'Search Results' : 'No results found'}
                            </h3>
                        </div>

                        {hasSearchResults ? (
                            <div className="space-y-6">
                                {categories.map((category, i) => {
                                    const filteredQuestions = category.questions.filter(q =>
                                        searchFilter(q.question, q.answer)
                                    );

                                    if (filteredQuestions.length === 0) return null;

                                    return (
                                        <div key={i} className="space-y-3">
                                            <div className="flex items-center mb-2">
                                                <span
                                                    className="text-xl mr-2">{categoryIcons[i % categoryIcons.length]}</span>
                                                <h3 className="text-md font-medium text-cyan-300">{category.category}</h3>
                                            </div>

                                            {filteredQuestions.map((qa, j) => {
                                                const questionId = `sq-${i}-${j}`;
                                                const isExpanded = expandedId === questionId;

                                                return (
                                                    <div
                                                        key={j}
                                                        className={`bg-gray-800/60 rounded-xl overflow-hidden transition-all border border-gray-700/50 ${
                                                            isExpanded ? 'shadow-lg border-cyan-500/30' : 'hover:border-gray-600'
                                                        }`}
                                                    >
                                                        <button
                                                            onClick={() => toggleQuestion(questionId)}
                                                            className="w-full text-left p-4 flex justify-between items-start"
                                                        >
                                                            <h4 className="text-md font-medium text-cyan-300 pr-6">
                                                                {highlightSearchTerm(qa.question, searchText)}
                                                            </h4>
                                                            <span
                                                                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                                                                    isExpanded ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300'
                                                                }`}>
                                                            {isExpanded ? "−" : "+"}
                                                        </span>
                                                        </button>

                                                        {isExpanded && (
                                                            <div
                                                                className="p-5 pt-1 border-t border-gray-700/30 bg-gray-800/80">
                                                                <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                                                                    {highlightSearchTerm(qa.answer, searchText)}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="bg-gray-800/40 rounded-xl p-8 text-center border border-gray-700/50">
                                <span className="text-4xl mb-4 block">🔍</span>
                                <p className="text-gray-300 mb-2">No matching questions found</p>
                                <p className="text-gray-400 text-sm">Try different keywords or browse by category</p>
                            </div>
                        )}
                    </>
                )}
            </>
        );
    });

    const highlightSearchTerm = (text, searchTerm) => {
        if (!searchTerm) return text;

        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return (
            <>
                {parts.map((part, i) =>
                    part.toLowerCase() === searchTerm.toLowerCase() ?
                        <span key={i} className="bg-cyan-500/20 text-cyan-300 px-1 rounded">{part}</span> :
                        part
                )}
            </>
        );
    };

    EnhancedFAQExperience.displayName = 'EnhancedFAQExperience';

    const CategoryTabs = React.memo(({categories, activeCategory, setActiveCategory, categoryIcons}) => {
        const scrollRef = React.useRef(null);
        const [scrollState, setScrollState] = React.useState({canScrollLeft: false, canScrollRight: false});

        // Update scroll shadows based on scroll position
        const updateScrollShadows = React.useCallback(() => {
            if (!scrollRef.current) return;

            const {scrollLeft, scrollWidth, clientWidth} = scrollRef.current;
            setScrollState({
                canScrollLeft: scrollLeft > 10,
                canScrollRight: scrollLeft < scrollWidth - clientWidth - 10
            });
        }, []);

        // Initialize and attach scroll event listener
        React.useEffect(() => {
            const scrollElement = scrollRef.current;
            if (scrollElement) {
                updateScrollShadows();
                scrollElement.addEventListener('scroll', updateScrollShadows);
                window.addEventListener('resize', updateScrollShadows);

                return () => {
                    scrollElement.removeEventListener('scroll', updateScrollShadows);
                    window.addEventListener('resize', updateScrollShadows);
                };
            }
        }, [updateScrollShadows]);

        // Scroll category into view when selected
        React.useEffect(() => {
            if (scrollRef.current) {
                const container = scrollRef.current;
                const activeButton = container.children[0].children[activeCategory];

                if (activeButton) {
                    const containerRect = container.getBoundingClientRect();
                    const buttonRect = activeButton.getBoundingClientRect();

                    // Calculate scroll position to center the button
                    const scrollLeftTarget =
                        (buttonRect.left + buttonRect.width / 2) -
                        (containerRect.left + containerRect.width / 2) +
                        container.scrollLeft;

                    container.scrollTo({
                        left: scrollLeftTarget,
                        behavior: 'smooth'
                    });
                }
            }
        }, [activeCategory]);

        // Scroll handlers for navigation buttons
        const scrollLeft = () => {
            if (scrollRef.current) {
                scrollRef.current.scrollBy({left: -200, behavior: 'smooth'});
            }
        };

        const scrollRight = () => {
            if (scrollRef.current) {
                scrollRef.current.scrollBy({left: 200, behavior: 'smooth'});
            }
        };

        return (
            <div className="relative mb-8">
                <style>{scrollbarStyles}</style>

                {/* Navigation buttons */}
                {scrollState.canScrollLeft && (
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-gray-800/80 rounded-full flex items-center justify-center text-cyan-300 shadow-lg hover:bg-gray-700 transition-all"
                        aria-label="Scroll categories left"
                    >
                        ←
                    </button>
                )}

                {scrollState.canScrollRight && (
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-gray-800/80 rounded-full flex items-center justify-center text-cyan-300 shadow-lg hover:bg-gray-700 transition-all"
                        aria-label="Scroll categories right"
                    >
                        →
                    </button>
                )}

                {/* Scroll container with gradient indicators */}
                <div
                    className={`scroll-shadow-container ${scrollState.canScrollLeft ? 'can-scroll-left' : ''} ${scrollState.canScrollRight ? 'can-scroll-right' : ''}`}>
                    <div className="scroll-shadow-left"></div>
                    <div className="scroll-shadow-right"></div>

                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto py-2 px-2 elegant-scrollbar"
                        aria-label="Category navigation"
                    >
                        <div className="flex space-x-3 px-6">
                            {categories.map((category, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveCategory(i)}
                                    className={`px-4 py-2.5 rounded-full transition-all whitespace-nowrap flex items-center ${
                                        activeCategory === i
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg scale-105 font-medium'
                                            : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                                    aria-selected={activeCategory === i}
                                >
                                    <span className="mr-2">{categoryIcons[i % categoryIcons.length]}</span>
                                    {category.category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    const scrollbarStyles = `
  .elegant-scrollbar::-webkit-scrollbar {
    height: 6px;
    background: transparent;
  }
  
  .elegant-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(103, 232, 249, 0.3);
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  
  .elegant-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(103, 232, 249, 0.5);
  }
  
  .scroll-shadow-container {
    position: relative;
  }
  
  .scroll-shadow-left,
  .scroll-shadow-right {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40px;
    pointer-events: none;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .scroll-shadow-left {
    left: 0;
    background: linear-gradient(to right, rgba(17, 24, 39, 0.9), transparent);
  }
  
  .scroll-shadow-right {
    right: 0;
    background: linear-gradient(to left, rgba(17, 24, 39, 0.9), transparent);
  }
  
  .can-scroll-left .scroll-shadow-left,
  .can-scroll-right .scroll-shadow-right {
    opacity: 1;
  }
`;

    //==========================================================================================================

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
    const Card = ({title, children, icon, className = ""}) => (
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
    const CodeExample = ({code, title}) => (
        <div className="mt-4 mb-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">{title || "Example"}:</h4>
            <CodeBlock code={code}/>
        </div>
    );

    const List = ({items, title, className = ""}) => (
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
            <TabNavigation/>

            {/* Content */}
            <div className="space-y-8">
                {renderActiveSection()}
            </div>
        </div>
    );
};

export default JavaFundamentalsPage;
