import React, { useState, memo } from 'react';
import concurrencyJsonEn from '../../../data/java/concurrency.json';
import {
    ArrowDownUp, Lock, Database, GitBranch,
    Info, Cpu, Zap, HelpCircle, ChevronDown, Code, AlertTriangle, Box, Target
} from 'lucide-react';
import CodeBlock from '../../../components/CodeBlock';

const ConcurrencyPage = () => {
    const content = concurrencyJsonEn;

    // Define tab structure based on the sections in the JSON
    const tabs = [
        { id: 'overview', title: 'Overview', icon: <Info className="w-4 h-4"/> },
        { id: 'threads', title: 'Thread Basics', icon: <ArrowDownUp className="w-4 h-4"/> },
        { id: 'synchronization', title: 'Synchronization', icon: <Lock className="w-4 h-4"/> },
        { id: 'coordination', title: 'Thread Coordination', icon: <GitBranch className="w-4 h-4"/> },
        { id: 'executors', title: 'Executors', icon: <Cpu className="w-4 h-4"/> },
        { id: 'futures', title: 'CompletableFuture', icon: <Zap className="w-4 h-4"/> },
        { id: 'collections', title: 'Concurrent Collections', icon: <Database className="w-4 h-4"/> },
        { id: 'patterns', title: 'Patterns', icon: <Box className="w-4 h-4"/> },
        { id: 'issues', title: 'Issues & Solutions', icon: <AlertTriangle className="w-4 h-4"/> },
        { id: 'advanced', title: 'Advanced Topics', icon: <Code className="w-4 h-4"/> },
        { id: 'interview', title: 'Interview Q&A', icon: <HelpCircle className="w-4 h-4"/> },
        { id: 'best-practices', title: 'Best Practices', icon: <Target className="w-4 h-4"/> },
    ];

    // Active tab state
    const [activeTab, setActiveTab] = useState('overview');

    // Tab navigation component
    const TabNavigation = () => (
        <div className="mb-8 flex flex-wrap gap-4 overflow-x-auto py-2">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
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

    // Render overview section
    const renderOverview = () => {
        const section = content.sections.find(section => section.id === 'core-concepts');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
                    <p className="text-gray-300 mb-6">{section.content}</p>

                    {section.table && (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-800/70 rounded-lg">
                                <thead>
                                <tr className="border-b border-gray-700">
                                    {section.table.headers.map((header, idx) => (
                                        <th key={idx} className="py-3 px-4 text-left text-sm text-gray-400">{header}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {section.table.rows.map((row, rowIdx) => (
                                    <tr
                                        key={rowIdx}
                                        className={rowIdx % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}
                                    >
                                        {row.map((cell, cellIdx) => (
                                            <td
                                                key={cellIdx}
                                                className={`py-3 px-4 ${cellIdx === 0 ? 'text-purple-300 font-medium' : cellIdx === 2 ? 'text-yellow-300' : 'text-gray-300'}`}
                                            >
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Render thread fundamentals
    const renderThreadBasics = () => {
        // Get both sections related to threads
        const lifecycleSection = content.sections.find(section => section.id === 'thread-fundamentals');
        const creationSection = content.sections.find(section => section.id === 'thread-creation');
        const vsProcessSection = content.sections.find(section => section.id === 'thread-vs-process');

        if (!lifecycleSection && !creationSection) return null;

        return (
            <div className="space-y-6">
                {/* Thread Lifecycle */}
                {lifecycleSection && (
                    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                        <h3 className="text-xl font-semibold text-white mb-4">{lifecycleSection.title}</h3>
                        <p className="text-gray-300 mb-6">{lifecycleSection.content}</p>

                        {lifecycleSection.subsections && lifecycleSection.subsections.map((subsection, idx) => (
                            <div key={idx} className="mt-4">
                                <h4 className="text-lg font-medium text-cyan-300 mb-3">{subsection.title}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {subsection.states && subsection.states.map((state, stateIdx) => (
                                        <div key={stateIdx} className="bg-gray-800/70 p-4 rounded-lg">
                                            <h5 className="text-purple-300 font-medium mb-1">{state.state}</h5>
                                            <p className="text-gray-300 text-sm">{state.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Thread Creation */}
                {creationSection && (
                    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                        <h3 className="text-xl font-semibold text-white mb-4">{creationSection.title}</h3>
                        <p className="text-gray-300 mb-6">{creationSection.content}</p>

                        <div className="space-y-6">
                            {creationSection.methods && creationSection.methods.map((method, idx) => (
                                <div key={idx} className="bg-gray-800/70 p-5 rounded-lg">
                                    <h4 className="text-lg font-medium text-purple-300 mb-3">{method.method}</h4>

                                    <div className="mb-4">
                                        <CodeBlock code={method.example} />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h5 className="text-sm font-medium text-green-400 mb-2">
                                        Pros
                                    </h5>
                                            <ul className="list-disc list-inside space-y-1">
                                                {method.pros.map((pro, proIdx) => (
                                                    <li key={proIdx} className="text-gray-300 text-sm">{pro}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-medium text-red-400 mb-2">
                                        Cons
                                    </h5>
                                            <ul className="list-disc list-inside space-y-1">
                                                {method.cons.map((con, conIdx) => (
                                                    <li key={conIdx} className="text-gray-300 text-sm">{con}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {creationSection.note && (
                            <div className="mt-6 bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                                <p className="text-gray-300">{creationSection.note}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Thread vs Process */}
                {vsProcessSection && (
                    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                        <h3 className="text-xl font-semibold text-white mb-4">{vsProcessSection.title}</h3>

                        {vsProcessSection.table && (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-gray-800/70 rounded-lg">
                                    <thead>
                                    <tr className="border-b border-gray-700">
                                        {vsProcessSection.table.headers.map((header, idx) => (
                                            <th key={idx} className="py-3 px-4 text-left text-sm text-gray-400">{header}</th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {vsProcessSection.table.rows.map((row, rowIdx) => (
                                        <tr
                                            key={rowIdx}
                                            className={rowIdx % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}
                                        >
                                            {row.map((cell, cellIdx) => (
                                                <td key={cellIdx} className="py-3 px-4 text-gray-300">
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    // Render synchronization mechanisms
    const renderSynchronization = () => {
        const section = content.sections.find(section => section.id === 'thread-safety');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
                    <p className="text-gray-300 mb-6">{section.content}</p>

                    {section.mechanisms && section.mechanisms.map((mechanism, idx) => (
                        <div key={idx} className="bg-gray-800/70 p-5 rounded-lg mb-6 border border-gray-700/30">
                            <h4 className="text-xl font-semibold text-purple-300 mb-3">{mechanism.type}</h4>
                            <p className="text-gray-300 mb-4">{mechanism.content}</p>

                            {mechanism.methods && (
                                <div className="mt-4 space-y-4">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        Methods
                                    </h5>
                                    {mechanism.methods.map((method, methodIdx) => (
                                        <div key={methodIdx} className="bg-gray-800/50 p-4 rounded-lg">
                                            <h6 className="text-md font-medium text-pink-300 mb-2">{method.name}</h6>
                                            <p className="text-gray-300 mb-2">{method.usage}</p>
                                            <CodeBlock code={method.example} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {mechanism.example && !mechanism.methods && (
                                <div className="mt-4">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        Example
                                    </h5>
                                    <CodeBlock code={mechanism.example} />
                                </div>
                            )}

                            {mechanism.properties && (
                                <div className="mt-4">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        Properties
                                    </h5>
                                    <ul className="list-disc list-inside space-y-1">
                                        {mechanism.properties.map((prop, propIdx) => (
                                            <li key={propIdx} className="text-gray-300">{prop}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {mechanism.classes && (
                                <div className="mt-4">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        Available Classes
                                    </h5>
                                    <ul className="list-disc list-inside space-y-1">
                                        {mechanism.classes.map((cls, clsIdx) => (
                                            <li key={clsIdx} className="text-gray-300">{cls}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {mechanism.lockTypes && (
                                <div className="mt-4">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        Lock Types
                                    </h5>
                                    <ul className="list-disc list-inside space-y-1">
                                        {mechanism.lockTypes.map((lock, lockIdx) => (
                                            <li key={lockIdx} className="text-gray-300">{lock}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {mechanism.whenToUse && (
                                <div className="mt-4 bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        When to Use
                                    </h5>
                                    <ul className="list-disc list-inside space-y-1">
                                        {mechanism.whenToUse.map((use, useIdx) => (
                                            <li key={useIdx} className="text-gray-300">{use}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Render thread coordination
    const renderThreadCoordination = () => {
        const section = content.sections.find(section => section.id === 'thread-coordination');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>

                    {section.subsections && section.subsections.map((subsection, idx) => (
                        <div key={idx} className="bg-gray-800/70 p-5 rounded-lg mb-6 border border-gray-700/30">
                            <h4 className="text-xl font-semibold text-purple-300 mb-3">{subsection.title}</h4>
                            {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

                            {subsection.example && (
                                <div className="mt-4">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        Example
                                    </h5>
                                    <CodeBlock code={subsection.example} />
                                </div>
                            )}

                            {subsection.important && (
                                <div className="mt-4 bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
                                    <p className="text-yellow-300 font-medium">⚠️ Important</p>
                                    <p className="text-gray-300">{subsection.important}</p>
                                </div>
                            )}

                            {subsection.useCases && (
                                <div className="mt-4">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        Use Cases
                                    </h5>
                                    <ul className="list-disc list-inside space-y-1">
                                        {subsection.useCases.map((useCase, useCaseIdx) => (
                                            <li key={useCaseIdx} className="text-gray-300">{useCase}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {subsection.differences && (
                                <div className="mt-4">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        Key Differences
                                    </h5>
                                    <ul className="list-disc list-inside space-y-1">
                                        {subsection.differences.map((diff, diffIdx) => (
                                            <li key={diffIdx} className="text-gray-300">{diff}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Render executor framework
    const renderExecutors = () => {
        const section = content.sections.find(section => section.id === 'executors');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
                    <p className="text-gray-300 mb-6">{section.content}</p>

                    {section.subsections && section.subsections.map((subsection, idx) => (
                        <div key={idx} className="bg-gray-800/70 p-5 rounded-lg mb-6 border border-gray-700/30">
                            <h4 className="text-xl font-semibold text-purple-300 mb-3">{subsection.title}</h4>

                            {subsection.example && (
                                <div className="mb-6">
                                    <CodeBlock code={subsection.example} />
                                </div>
                            )}

                            {subsection.types && (
                                <div className="space-y-4">
                                    {subsection.types.map((type, typeIdx) => (
                                        <div key={typeIdx} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30">
                                            <h5 className="text-lg font-medium text-cyan-300 mb-2">{type.type}</h5>
                                            <p className="text-sm text-pink-300 font-mono mb-3">{type.creation}</p>

                                            {type.description && (
                                                <div className="mb-3">
                                                    <h6 className="text-sm font-medium text-gray-400 mb-1">
                                                        Description
                                                    </h6>
                                                    <ul className="list-disc list-inside space-y-1">
                                                        {type.description.map((desc, descIdx) => (
                                                            <li key={descIdx} className="text-gray-300">{desc}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {type.bestPractices && (
                                                <div>
                                                    <h6 className="text-sm font-medium text-gray-400 mb-1">
                                        Best Practices
                                    </h6>
                                                    <ul className="list-disc list-inside space-y-1">
                                                        {type.bestPractices.map((practice, practiceIdx) => (
                                                            <li key={practiceIdx} className="text-gray-300">{practice}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {subsection.table && (
                                <div className="mt-6">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-3">
                                        Comparison
                                    </h5>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-gray-800/50 rounded-lg">
                                            <thead>
                                            <tr className="border-b border-gray-700">
                                                {subsection.table.headers.map((header, headerIdx) => (
                                                    <th key={headerIdx} className="py-2 px-4 text-left text-sm text-gray-400">{header}</th>
                                                ))}
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {subsection.table.rows.map((row, rowIdx) => (
                                                <tr
                                                    key={rowIdx}
                                                    className={rowIdx % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}
                                                >
                                                    {row.map((cell, cellIdx) => (
                                                        <td key={cellIdx} className="py-2 px-4 text-gray-300">{cell}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Render CompletableFuture
    const renderCompletableFuture = () => {
        const section = content.sections.find(section => section.id === 'completable-future');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
                    <p className="text-gray-300 mb-6">{section.content}</p>

                    <div className="bg-gray-800/70 p-5 rounded-lg mb-6 border border-gray-700/30">
                        <h4 className="text-lg font-medium text-cyan-300 mb-3">
                                        Example
                                    </h4>
                        <CodeBlock code={section.example} />
                    </div>

                    {section.features && (
                        <div className="mt-6">
                            <h4 className="text-lg font-medium text-cyan-300 mb-3">
                                        Key Features
                                    </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {section.features.map((feature, featureIdx) => (
                                    <div key={featureIdx} className="bg-gray-800/70 p-3 rounded-lg border border-gray-700/30">
                                        <span className="text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Render concurrent collections
    const renderConcurrentCollections = () => {
        const section = content.sections.find(section => section.id === 'concurrent-collections');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
                    <p className="text-gray-300 mb-6">{section.content}</p>

                    {section.collections && section.collections.map((collection, idx) => (
                        <div key={idx} className="bg-gray-800/70 p-5 rounded-lg mb-6 border border-gray-700/30">
                            <h4 className="text-xl font-semibold text-purple-300 mb-3">{collection.name}</h4>
                            <p className="text-gray-300 mb-4">{collection.content}</p>

                            <div className="mb-6">
                                <CodeBlock code={collection.example} />
                            </div>

                            {collection.characteristics && (
                                <div className="mt-4">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        Characteristics
                                    </h5>
                                    <ul className="list-disc list-inside space-y-1">
                                        {collection.characteristics.map((char, charIdx) => (
                                            <li key={charIdx} className="text-gray-300">{char}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {collection.implementations && (
                                <div className="mt-4">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        Implementations
                                    </h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {collection.implementations.map((impl, implIdx) => (
                                            <div key={implIdx} className="bg-gray-800/50 p-3 rounded-lg">
                                                <h6 className="text-pink-300 font-medium">{impl.name}</h6>
                                                <p className="text-gray-300 text-sm">{impl.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {collection.applications && (
                                <div className="mt-4 bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        Applications
                                    </h5>
                                    <ul className="list-disc list-inside space-y-1">
                                        {collection.applications.map((app, appIdx) => (
                                            <li key={appIdx} className="text-gray-300">{app}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Render concurrency patterns
    const renderConcurrencyPatterns = () => {
        const section = content.sections.find(section => section.id === 'concurrency-patterns');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>

                    {section.patterns && section.patterns.map((pattern, idx) => (
                        <div key={idx} className="bg-gray-800/70 p-5 rounded-lg mb-6 border border-gray-700/30">
                            <h4 className="text-xl font-semibold text-purple-300 mb-3">{pattern.name}</h4>
                            <p className="text-gray-300 mb-4">{pattern.description}</p>

                            {pattern.example && (
                                <div className="mb-6">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        Implementation
                                    </h5>
                                    <CodeBlock code={pattern.example} />
                                </div>
                            )}

                            {pattern.implementation && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        Using
                                    </h5>
                                        <div className="bg-gray-800/50 p-3 rounded-lg">
                                            <p className="text-gray-300 font-medium">{pattern.implementation.using}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        Advantages
                                    </h5>
                                        <ul className="list-disc list-inside space-y-1">
                                            {pattern.implementation.advantages.map((adv, advIdx) => (
                                                <li key={advIdx} className="text-gray-300">{adv}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {pattern.useCases && (
                                <div className="mt-4">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        Use Cases
                                    </h5>
                                    <ul className="list-disc list-inside space-y-1">
                                        {pattern.useCases.map((useCase, useCaseIdx) => (
                                            <li key={useCaseIdx} className="text-gray-300">{useCase}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {pattern.warning && (
                                <div className="mt-4 bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
                                    <p className="text-yellow-300 font-medium">⚠️ Warning</p>
                                    <p className="text-gray-300">{pattern.warning}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Render concurrency issues and solutions
    const renderConcurrencyIssues = () => {
        const section = content.sections.find(section => section.id === 'concurrency-problems');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>

                    {section.subsections && section.subsections.map((subsection, idx) => (
                        <div key={idx} className="bg-gray-800/70 p-5 rounded-lg mb-6 border border-gray-700/30">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                <h4 className="text-xl font-semibold text-purple-300">{subsection.title}</h4>
                            </div>
                            <p className="text-gray-300 mb-4">{subsection.content}</p>

                            {subsection.example && (
                                <div className="mb-6">
                                    <h5 className="text-lg font-medium text-red-400 mb-2">
                                        Problematic Code
                                    </h5>
                                    <CodeBlock code={subsection.example} />
                                </div>
                            )}

                            {subsection.solutions && (
                                <div className="mt-4">
                                    <h5 className="text-lg font-medium text-green-400 mb-2">
                                        Solutions
                                    </h5>
                                    <div className="space-y-3">
                                        {subsection.solutions.map((solution, solIdx) => (
                                            <div key={solIdx}>
                                                {typeof solution === 'string' ? (
                                                    <p className="text-gray-300">{solution}</p>
                                                ) : solution.code ? (
                                                    <div className="bg-gray-800/50 p-4 rounded-lg mt-2">
                                                        <CodeBlock code={solution.code} />
                                                    </div>
                                                ) : solution.title ? (
                                                    <div className="bg-gray-800/50 p-4 rounded-lg">
                                                        <h6 className="text-cyan-300 font-medium mb-2">{solution.title}</h6>
                                                        <CodeBlock code={solution.code} />
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Render advanced topics
    const renderAdvancedTopics = () => {
        const section = content.sections.find(section => section.id === 'advanced-topics');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>

                    {section.subsections && section.subsections.map((subsection, idx) => (
                        <div key={idx} className="bg-gray-800/70 p-5 rounded-lg mb-6 border border-gray-700/30">
                            <h4 className="text-xl font-semibold text-purple-300 mb-3">{subsection.title}</h4>
                            <p className="text-gray-300 mb-4">{subsection.content}</p>

                            {subsection.example && (
                                <div className="mb-6">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        Example
                                    </h5>
                                    <CodeBlock code={subsection.example} />
                                </div>
                            )}

                            {subsection.considerations && (
                                <div className="mt-4">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        Considerations
                                    </h5>
                                    <ul className="list-disc list-inside space-y-1">
                                        {subsection.considerations.map((item, itemIdx) => (
                                            <li key={itemIdx} className="text-gray-300">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {subsection.advantages && (
                                <div className="mt-4">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        Advantages
                                    </h5>
                                    <ul className="list-disc list-inside space-y-1">
                                        {subsection.advantages.map((item, itemIdx) => (
                                            <li key={itemIdx} className="text-gray-300">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Render interview questions
    const renderInterviewQuestions = () => {
        const section = content.sections.find(section => section.id === 'interview-questions');
        if (!section) return null;

        // Question card component
        const QuestionCard = memo(({ question, answer }) => {
            const [isExpanded, setIsExpanded] = useState(false);

            return (
                <div className={`bg-gray-800/60 rounded-xl overflow-hidden transition-all duration-300 border border-gray-700/50 ${
                    isExpanded ? 'shadow-lg border-cyan-500/30' : 'hover:border-gray-600'
                }`}>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full text-left p-5 flex justify-between items-start"
                    >
                        <h4 className="text-md font-medium text-cyan-300 pr-6">{question}</h4>
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            isExpanded ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300'
                        }`}>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />
                        </div>
                    </button>

                    {isExpanded && (
                        <div className="p-5 pt-1 border-t border-gray-700/30 bg-gray-800/80">
                            <div className="prose prose-dark">
                                {answer.includes('```') ? (
                                    <div className="space-y-3">
                                        {answer.split(/(```[\s\S]*?```)/g).map((part, idx) => {
                                            if (part.startsWith('```')) {
                                                // Extract clean code without backticks
                                                const code = part.replace(/```(?:\w+)?\n|```/g, '');
                                                return (
                                                    <div key={idx} className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                                                        {code}
                                                    </div>
                                                );
                                            }

                                            // Format plain text with possible inline code and markdown
                                            return (
                                                <div key={idx}
                                                     className="text-gray-300 whitespace-pre-line"
                                                     dangerouslySetInnerHTML={{
                                                         __html: part.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                                                             .replace(/\n- /g, '<br/>• ')
                                                     }}
                                                />
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div
                                        className="text-gray-300 whitespace-pre-line"
                                        dangerouslySetInnerHTML={{
                                            __html: answer.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                                                .replace(/\n- /g, '<br/>• ')
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            );
        });

        QuestionCard.displayName = 'QuestionCard';

        return (
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-6 border border-cyan-500/20 shadow-lg">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 mb-3">
                        Interview Questions & Answers
                    </h3>
                    <p className="text-gray-300">
                        Common Java concurrency questions you might encounter in technical interviews.
                    </p>
                </div>

                <div className="space-y-4">
                    {section.questions && section.questions.map((qa, idx) => (
                        <QuestionCard
                            key={idx}
                            question={qa.question}
                            answer={qa.answer}
                        />
                    ))}
                </div>
            </div>
        );
    };

    // Render best practices
    const renderBestPractices = () => {
        const section = content.sections.find(section => section.id === 'best-practices');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.practices && section.practices.map((practice, idx) => (
                            <div key={idx} className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/30">
                                <h4 className="text-lg font-medium text-purple-300 mb-3">{practice.title}</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    {practice.items.map((item, itemIdx) => (
                                        <li key={itemIdx} className="text-gray-300">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // Render content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return renderOverview();
            case 'threads':
                return renderThreadBasics();
            case 'synchronization':
                return renderSynchronization();
            case 'coordination':
                return renderThreadCoordination();
            case 'executors':
                return renderExecutors();
            case 'futures':
                return renderCompletableFuture();
            case 'collections':
                return renderConcurrentCollections();
            case 'patterns':
                return renderConcurrencyPatterns();
            case 'issues':
                return renderConcurrencyIssues();
            case 'advanced':
                return renderAdvancedTopics();
            case 'interview':
                return renderInterviewQuestions();
            case 'best-practices':
                return renderBestPractices();
            default:
                return renderOverview();
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{content.title}</h1>
                <p className="text-gray-300">
                    A comprehensive guide to Java Concurrency and Multithreading
                </p>
            </div>

            {/* Tab Navigation */}
            <TabNavigation />

            {/* Content */}
            <div className="space-y-8">
                {renderContent()}
            </div>
        </div>
    );
};

export default ConcurrencyPage;
